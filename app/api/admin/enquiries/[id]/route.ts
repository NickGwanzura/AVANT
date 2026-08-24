import { NextRequest, NextResponse } from "next/server";
import { database, ensureSiteData } from "../../../../../lib/site-data";
import { requireAdminApi } from "../../../../../lib/api-auth";
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) { const denied = await requireAdminApi(request); if (denied) return denied; const { id } = await params; const body = await request.json() as { status?: string }; const status = body.status === "replied" ? "replied" : "new"; await ensureSiteData(); await database().prepare("UPDATE enquiries SET status = ?, updated_at = ? WHERE id = ?").bind(status, new Date().toISOString(), id).run(); return NextResponse.json({ ok: true }); }
