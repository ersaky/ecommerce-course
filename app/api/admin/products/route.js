import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getProducts, createProduct } from "@/db/product";

// GET - Tüm ürünleri getir
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
    }

    const products = await getProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Products GET error:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

// POST - Yeni ürün oluştur
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
    }

    const { name, description, price, category_id, stock, image_url } =
      await request.json();

    if (!name || !price || !category_id) {
      return NextResponse.json(
        { error: "Ürün adı, fiyat ve kategori gereklidir" },
        { status: 400 }
      );
    }

    const product = await createProduct(
      name,
      description || "",
      parseFloat(price),
      parseInt(category_id),
      parseInt(stock) || 0,
      image_url || ""
    );

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Products POST error:", error);
    return NextResponse.json(
      { error: "Sunucu hatası", error },
      { status: 500 }
    );
  }
}
