import { NextRequest, NextResponse } from "next/server";
import { listEnquiries } from "../../../../lib/site-data";
import { requireAdminApi } from "../../../../lib/api-auth";
export async function GET(request: NextRequest) { const denied = await requireAdminApi(request); if (denied) return denied; return NextResponse.json({ enquiries: await listEnquiries() }); }
