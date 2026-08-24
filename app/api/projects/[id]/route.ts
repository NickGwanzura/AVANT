import { NextRequest, NextResponse } from "next/server";
import { database, ensureSiteData } from "../../../../lib/site-data";
import { requireAdminApi } from "../../../../lib/api-auth";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdminApi(request); if (denied) return denied;
  const { id } = await params; const body = await request.json() as { published?: boolean; status?: string };
  await ensureSiteData();
  if (typeof body.published !== "boolean") return NextResponse.json({ error: "Nothing to update." }, { status: 400 });
  await database().prepare("UPDATE projects SET published = ?, updated_at = ? WHERE id = ?").bind(body.published ? 1 : 0, new Date().toISOString(), id).run();
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdminApi(request); if (denied) return denied;
  const { id } = await params; await ensureSiteData();
  await database().prepare("DELETE FROM projects WHERE id = ?").bind(id).run();
  return NextResponse.json({ ok: true });
}
