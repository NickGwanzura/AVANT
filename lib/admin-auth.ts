import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const ADMIN_SESSION_COOKIE = "avant-admin-session";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 8;

const encoder = new TextEncoder();

function toBase64Url(bytes: Uint8Array) {
  return btoa(String.fromCharCode(...bytes))
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replace(/=+$/u, "");
}

function fromBase64Url(value: string) {
  const padded = value.replaceAll("-", "+").replaceAll("_", "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  return Uint8Array.from(atob(padded), character => character.charCodeAt(0));
}

async function signingKey() {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret === "replace-with-a-long-random-secret") return null;
  return crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}

export function isAdminConfigured() {
  return Boolean(
    process.env.ADMIN_EMAIL &&
      process.env.ADMIN_PASSWORD &&
      process.env.AUTH_SECRET &&
      process.env.AUTH_SECRET !== "replace-with-a-long-random-secret",
  );
}

export async function credentialsMatch(email: string, password: string) {
  const expectedEmail = process.env.ADMIN_EMAIL;
  const expectedPassword = process.env.ADMIN_PASSWORD;
  if (!expectedEmail || !expectedPassword) return false;

  const expected = new Uint8Array(await crypto.subtle.digest("SHA-256", encoder.encode(`${expectedEmail.trim().toLowerCase()}\0${expectedPassword}`)));
  const actual = new Uint8Array(await crypto.subtle.digest("SHA-256", encoder.encode(`${email.trim().toLowerCase()}\0${password}`)));
  let difference = 0;
  for (let index = 0; index < expected.length; index += 1) difference |= expected[index] ^ actual[index];
  return difference === 0;
}

export async function createAdminSession(email: string) {
  const key = await signingKey();
  if (!key) throw new Error("Admin authentication is not configured.");
  const payload = encoder.encode(JSON.stringify({ email, expiresAt: Date.now() + ADMIN_SESSION_MAX_AGE * 1000 }));
  const signature = new Uint8Array(await crypto.subtle.sign("HMAC", key, payload));
  return `${toBase64Url(payload)}.${toBase64Url(signature)}`;
}

export async function verifyAdminSession(token?: string) {
  if (!token) return null;
  const key = await signingKey();
  if (!key) return null;

  try {
    const [payloadPart, signaturePart] = token.split(".");
    if (!payloadPart || !signaturePart) return null;
    const payload = fromBase64Url(payloadPart);
    const signature = fromBase64Url(signaturePart);
    const valid = await crypto.subtle.verify("HMAC", key, signature, payload);
    if (!valid) return null;
    const session = JSON.parse(new TextDecoder().decode(payload)) as { email: string; expiresAt: number };
    return session.expiresAt > Date.now() ? session : null;
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  return verifyAdminSession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
}

export async function requireAdminSession() {
  const session = await getAdminSession();
  if (!session) redirect("/login?next=/admin");
  return session;
}
