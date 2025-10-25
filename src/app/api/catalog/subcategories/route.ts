import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function GET(request: NextRequest) {
  try {
    const designTypeId = request.nextUrl.searchParams.get("design_type_id");
    let query = supabaseServer
      .from("catalog_subcategories")
      .select("id, name, design_type_id")
      .order("name");
    if (designTypeId) query = query.eq("design_type_id", designTypeId);

    const { data, error } = await query;
    if (error) throw error;
    return NextResponse.json({ success: true, subcategories: data });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}


