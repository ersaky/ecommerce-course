import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUsersWithPagination, createUser } from "@/db/user";
import bcrypt from "bcryptjs";

// GET - Kullanıcıları getir (pagination ile)
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const offset = (page - 1) * limit;

    const result = await getUsersWithPagination(limit, offset);

    // Şifreleri response'dan çıkar
    const safeUsers = result.users.map((user) => {
      const { password, ...safeUser } = user;
      return safeUser;
    });

    return NextResponse.json({
      users: safeUsers,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(result.total / limit),
        totalUsers: result.total,
        limit: limit,
      },
    });
  } catch (error) {
    console.error("Users GET error:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

// POST - Yeni kullanıcı oluştur
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
    }

    const { name, email, password, role } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Ad, email ve şifre gereklidir" },
        { status: 400 }
      );
    }

    // Email formatını kontrol et
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Geçerli bir email adresi giriniz" },
        { status: 400 }
      );
    }

    // Şifreyi hash'le
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await createUser(name, email, hashedPassword, role || "user");

    // Şifreyi response'dan çıkar
    const { password: _, ...safeUser } = user;

    return NextResponse.json(safeUser, { status: 201 });
  } catch (error) {
    console.error("Users POST error:", error);

    // Unique constraint hatası kontrolü
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "Bu email adresi zaten kullanılıyor" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Sunucu hatası", error },
      { status: 500 }
    );
  }
}
