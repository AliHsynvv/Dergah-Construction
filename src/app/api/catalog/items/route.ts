import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function GET(request: NextRequest) {
  try {
    const search = request.nextUrl.searchParams.get("q") || undefined;
    let query = supabaseServer
      .from("catalog_items")
      .select("id, image_url, created_at, design_type:catalog_design_types(id, name), room_type:catalog_room_types(id, name), images:catalog_item_images(image_url, position)")
      .order("created_at", { ascending: false });

    if (search) {
      // Example: if you add text columns later
      query = query.ilike("image_url", `%${search}%`);
    }

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json({ success: true, items: data });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { design_type_id?: string; room_type_id?: string; image_url?: string; image_urls?: string[] };
    const { design_type_id, room_type_id } = body;
    let { image_url } = body;
    const image_urls = body.image_urls;
    if (!design_type_id || !room_type_id) {
      return NextResponse.json({ success: false, error: "Missing design_type_id or room_type_id" }, { status: 400 });
    }
    if ((!image_url || image_url.length === 0) && Array.isArray(image_urls) && image_urls.length > 0) {
      image_url = image_urls[0]; // use first image as cover
    }
    if (!image_url) {
      return NextResponse.json({ success: false, error: "Missing image_url (or image_urls)" }, { status: 400 });
    }

    // If an item with the same cover and type already exists, append images instead of creating duplicate
    const { data: existingSameCover, error: existingCoverErr } = await supabaseServer
      .from("catalog_items")
      .select("id")
      .eq("design_type_id", design_type_id)
      .eq("room_type_id", room_type_id)
      .eq("image_url", image_url)
      .limit(1);
    if (existingCoverErr) {
      // eslint-disable-next-line no-console
      console.warn("catalog_items duplicate check warning", existingCoverErr);
    }

    const existingId = existingSameCover && existingSameCover.length > 0 ? existingSameCover[0].id : null;

    if (existingId) {
      // Deduplicate and append gallery images if provided
      if (Array.isArray(image_urls) && image_urls.length > 0) {
        const { data: existingImages, error: existingImgsErr } = await supabaseServer
          .from("catalog_item_images")
          .select("image_url, position")
          .eq("item_id", existingId)
          .order("position", { ascending: true });
        if (existingImgsErr) {
          // eslint-disable-next-line no-console
          console.warn("catalog_item_images select warning", existingImgsErr);
        }

        const existingUrls = new Set<string>();
        for (const img of existingImages || []) existingUrls.add(img.image_url);
        existingUrls.add(image_url);

        const urlsToInsert = image_urls.filter((u: string) => !!u && !existingUrls.has(u));
        if (urlsToInsert.length > 0) {
          const nextPosition = (existingImages && existingImages.length > 0)
            ? Math.max(...existingImages.map((i) => (i.position as number) || 0)) + 1
            : 0;
          const rows = urlsToInsert.map((url: string, idx: number) => ({ item_id: existingId, image_url: url, position: nextPosition + idx }));
          const { error: imgsError } = await supabaseServer
            .from("catalog_item_images")
            .insert(rows);
          if (imgsError) {
            // eslint-disable-next-line no-console
            console.warn("catalog_item_images append warning", imgsError);
          }
        }
      }

      const { data: withEmbedExisting, error: embedExistingErr } = await supabaseServer
        .from("catalog_items")
        .select("id, image_url, created_at, design_type:catalog_design_types(id, name), room_type:catalog_room_types(id, name), images:catalog_item_images(image_url, position)")
        .eq("id", existingId)
        .single();

      if (!embedExistingErr && withEmbedExisting) {
        return NextResponse.json({ success: true, item: withEmbedExisting, merged: true });
      }

      return NextResponse.json({ success: true, item: { id: existingId, image_url, design_type_id, room_type_id } });
    }

    // First insert and get the new id
    const { data: inserted, error: insertError } = await supabaseServer
      .from("catalog_items")
      .insert({ design_type_id, room_type_id, image_url })
      .select("id")
      .single();
    if (insertError) {
      // eslint-disable-next-line no-console
      console.error("catalog_items insert error", { error: insertError, body });
      throw insertError;
    }

    // If multiple images provided, insert into catalog_item_images
    if (Array.isArray(image_urls) && image_urls.length > 0) {
      const rows = image_urls.map((url: string, idx: number) => ({ item_id: inserted.id, image_url: url, position: idx }));
      const { error: imgsError } = await supabaseServer
        .from("catalog_item_images")
        .insert(rows);
      if (imgsError) {
        // eslint-disable-next-line no-console
        console.warn("catalog_item_images insert warning", imgsError);
      }
    }

    // Try to fetch with embedded relations
    const { data: withEmbed, error: embedError } = await supabaseServer
      .from("catalog_items")
      .select("id, image_url, created_at, design_type:catalog_design_types(id, name), room_type:catalog_room_types(id, name), images:catalog_item_images(image_url, position)")
      .eq("id", inserted.id)
      .single();

    if (!embedError && withEmbed) {
      return NextResponse.json({ success: true, item: withEmbed });
    }

    // Fallback: return plain columns if FK relationship is not yet present in DB
    // eslint-disable-next-line no-console
    console.warn("Falling back to plain item select due to embed error", embedError);
    const { data: plain } = await supabaseServer
      .from("catalog_items")
      .select("id, image_url, created_at, design_type_id, room_type_id")
      .eq("id", inserted.id)
      .single();
    return NextResponse.json({ success: true, item: plain });
  } catch (error: unknown) {
    // eslint-disable-next-line no-console
    console.error("/api/catalog/items POST failed", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}


export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { item_id, image_urls } = body as { item_id?: string; image_urls?: string[] };

    if (!item_id) {
      return NextResponse.json({ success: false, error: "Missing item_id" }, { status: 400 });
    }
    if (!Array.isArray(image_urls) || image_urls.length === 0) {
      return NextResponse.json({ success: false, error: "image_urls must be a non-empty array" }, { status: 400 });
    }

    // Fetch existing images for this item (to deduplicate and find next position)
    const { data: existingImages, error: existingErr } = await supabaseServer
      .from("catalog_item_images")
      .select("image_url, position")
      .eq("item_id", item_id)
      .order("position", { ascending: true });
    if (existingErr) throw existingErr;

    // Fetch cover image to avoid inserting duplicate of cover
    const { data: itemRow, error: itemErr } = await supabaseServer
      .from("catalog_items")
      .select("image_url")
      .eq("id", item_id)
      .single();
    if (itemErr) throw itemErr;

    const existingUrls = new Set<string>();
    for (const img of existingImages || []) existingUrls.add(img.image_url);
    if (itemRow?.image_url) existingUrls.add(itemRow.image_url);

    const urlsToInsert = image_urls.filter((u) => !!u && !existingUrls.has(u));

    if (urlsToInsert.length > 0) {
      const nextPosition = (existingImages && existingImages.length > 0)
        ? Math.max(...existingImages.map((i) => i.position || 0)) + 1
        : 0;

      const rows = urlsToInsert.map((url, idx) => ({
        item_id,
        image_url: url,
        position: nextPosition + idx,
      }));

      const { error: insertErr } = await supabaseServer
        .from("catalog_item_images")
        .insert(rows);
      if (insertErr) throw insertErr;
    }

    // Return the updated item with relations
    const { data: withEmbed, error: embedError } = await supabaseServer
      .from("catalog_items")
      .select("id, image_url, created_at, design_type:catalog_design_types(id, name), room_type:catalog_room_types(id, name), images:catalog_item_images(image_url, position)")
      .eq("id", item_id)
      .single();
    if (embedError) throw embedError;

    return NextResponse.json({ success: true, item: withEmbed });
  } catch (error: unknown) {
    // eslint-disable-next-line no-console
    console.error("/api/catalog/items PATCH failed", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing id" }, { status: 400 });
    }

    // Delete gallery images first (if you have FK with cascade, this may be optional)
    const { error: imgsErr } = await supabaseServer
      .from("catalog_item_images")
      .delete()
      .eq("item_id", id);
    if (imgsErr) {
      // eslint-disable-next-line no-console
      console.warn("catalog_item_images delete warning", imgsErr);
    }

    // Delete the catalog item
    const { error: itemErr } = await supabaseServer
      .from("catalog_items")
      .delete()
      .eq("id", id);
    if (itemErr) throw itemErr;

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    // eslint-disable-next-line no-console
    console.error("/api/catalog/items DELETE failed", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}


