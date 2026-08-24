import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE,
  createAdminSession,
  credentialsMatch,
  isAdminConfigured,
} from "../../../../lib/admin-auth";
import { database, ensureSiteData } from "../../../../lib/site-data";

async function requestFingerprint(request: NextRequest) {
  const value = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for") ?? "unknown";
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest)).map(byte => byte.toString(16).padStart(2, "0")).join("");
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!isAdminConfigured()) return NextResponse.redirect(new URL("/login?error=not-configured", request.url), 303);
  const fingerprint = await requestFingerprint(request);
  try {
    await ensureSiteData();
    const attempt = await database().prepare("SELECT failures, locked_until AS lockedUntil FROM login_attempts WHERE ip_hash = ? LIMIT 1").bind(fingerprint).all<{ failures: number; lockedUntil: string | null }>();
    const lockedUntil = attempt.results?.[0]?.lockedUntil;
    if (lockedUntil && new Date(lockedUntil).getTime() > Date.now()) return NextResponse.redirect(new URL("/login?error=locked", request.url), 303);
  } catch { /* Authentication remains available if rate-limit storage is temporarily unavailable. */ }
  if (!(await credentialsMatch(email, password))) {
    try {
      const current = await database().prepare("SELECT failures FROM login_attempts WHERE ip_hash = ? LIMIT 1").bind(fingerprint).all<{ failures: number }>();
      const failures = Number(current.results?.[0]?.failures ?? 0) + 1; const lockedUntil = failures >= 5 ? new Date(Date.now() + 15 * 60 * 1000).toISOString() : null;
      await database().prepare("INSERT INTO login_attempts (ip_hash, failures, locked_until, updated_at) VALUES (?, ?, ?, ?) ON CONFLICT(ip_hash) DO UPDATE SET failures = excluded.failures, locked_until = excluded.locked_until, updated_at = excluded.updated_at").bind(fingerprint, failures, lockedUntil, new Date().toISOString()).run();
    } catch { /* Do not expose storage failures to unauthenticated callers. */ }
    return NextResponse.redirect(new URL("/login?error=invalid", request.url), 303);
  }

  try { await database().prepare("DELETE FROM login_attempts WHERE ip_hash = ?").bind(fingerprint).run(); } catch { /* Best-effort cleanup. */ }

  const response = NextResponse.redirect(new URL("/admin", request.url), 303);
  response.cookies.set(ADMIN_SESSION_COOKIE, await createAdminSession(email), {
    httpOnly: true,
    maxAge: ADMIN_SESSION_MAX_AGE,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}
