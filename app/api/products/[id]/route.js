import { NextResponse } from "next/server";

import { getProductById } from "@/db/product";

// GET - Belirli ürünü getir
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const product = await getProductById(id);

    if (!product) {
      return NextResponse.json({ error: "Ürün bulunamadı" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Product GET error:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
