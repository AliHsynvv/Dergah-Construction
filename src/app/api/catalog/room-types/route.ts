import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from("catalog_room_types")
      .select("id, name")
      .order("name");
    if (error) throw error;
    return NextResponse.json({ success: true, roomTypes: data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}


