import { NextRequest, NextResponse } from "next/server";
import { database, ensureSiteData } from "../../../lib/site-data";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
async function hashIp(value: string) { const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)); return Array.from(new Uint8Array(bytes)).map(byte => byte.toString(16).padStart(2, "0")).join(""); }

export async function POST(request: NextRequest) {
  const body = await request.json() as Record<string, unknown>;
  if (String(body.company ?? "")) return NextResponse.json({ ok: true });
  const name = String(body.name ?? "").trim(); const email = String(body.email ?? "").trim().toLowerCase(); const message = String(body.message ?? "").trim();
  if (name.length < 2 || !emailPattern.test(email) || message.length < 20) return NextResponse.json({ error: "Please complete every field and include a little more project detail." }, { status: 400 });
  if (name.length > 100 || email.length > 200 || message.length > 5000) return NextResponse.json({ error: "That enquiry is too long." }, { status: 400 });
  await ensureSiteData();
  const ipHash = await hashIp(request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for") ?? "unknown");
  const recent = await database().prepare("SELECT id FROM enquiries WHERE ip_hash = ? AND created_at > ? LIMIT 1").bind(ipHash, new Date(Date.now() - 120000).toISOString()).all();
  if (recent.results?.length) return NextResponse.json({ error: "Please wait a moment before sending another enquiry." }, { status: 429 });
  const now = new Date().toISOString();
  await database().prepare("INSERT INTO enquiries (id, name, email, message, status, ip_hash, created_at, updated_at) VALUES (?, ?, ?, ?, 'new', ?, ?, ?)").bind(crypto.randomUUID(), name, email, message, ipHash, now, now).run();
  return NextResponse.json({ ok: true }, { status: 201 });
}
