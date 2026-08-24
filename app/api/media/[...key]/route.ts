import { env } from "cloudflare:workers";
import { NextResponse } from "next/server";
export async function GET(_request: Request, { params }: { params: Promise<{ key: string[] }> }) { const { key } = await params; const object = await (env as unknown as { MEDIA?: R2Bucket }).MEDIA?.get(key.join("/")); if (!object) return new NextResponse("Not found", { status: 404 }); const headers = new Headers(); object.writeHttpMetadata(headers); headers.set("cache-control", "public, max-age=31536000, immutable"); return new NextResponse(object.body, { headers }); }
