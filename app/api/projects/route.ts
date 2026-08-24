import { NextRequest, NextResponse } from "next/server";
import { listProjects, database, ensureSiteData } from "../../../lib/site-data";
import { requireAdminApi } from "../../../lib/api-auth";

export async function GET(request: NextRequest) {
  const includeDrafts = request.nextUrl.searchParams.get("admin") === "1";
  if (includeDrafts) { const denied = await requireAdminApi(request); if (denied) return denied; }
  try { return NextResponse.json({ projects: await listProjects(includeDrafts) }); }
  catch { return NextResponse.json({ error: "Content is temporarily unavailable." }, { status: 503 }); }
}

export async function POST(request: NextRequest) {
  const denied = await requireAdminApi(request); if (denied) return denied;
  const body = await request.json() as Record<string, unknown>;
  const title = String(body.title ?? "").trim(); const image = String(body.image ?? "").trim();
  if (title.length < 2 || !image.startsWith("/")) return NextResponse.json({ error: "Add a title and uploaded image." }, { status: 400 });
  await ensureSiteData();
  const slugBase = title.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const slug = `${slugBase}-${crypto.randomUUID().slice(0, 6)}`;
  const now = new Date().toISOString(); const id = crypto.randomUUID();
  await database().prepare("INSERT INTO projects (id, slug, title, category, label, year, location, image, layout, summary, deliverables, published, position, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 999, ?, ?)").bind(id, slug, title, String(body.category ?? "Photography"), String(body.category ?? "Photography"), String(body.year ?? new Date().getFullYear()), String(body.location ?? "Harare, Zimbabwe"), image, "wide", String(body.summary ?? ""), String(body.deliverables ?? ""), now, now).run();
  return NextResponse.json({ ok: true, id, slug }, { status: 201 });
}
