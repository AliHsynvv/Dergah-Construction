import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ success: false, error: "file is required" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);

    const fileExt = file.name.split(".").pop();
    const filePath = `catalog/${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

    const { data, error } = await supabaseServer.storage
      .from("images")
      .upload(filePath, bytes, {
        contentType: file.type || "image/png",
        upsert: false,
      });
    if (error) throw error;

    const { data: publicUrlData } = supabaseServer.storage.from("images").getPublicUrl(data.path);

    return NextResponse.json({ success: true, path: data.path, url: publicUrlData.publicUrl });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}


