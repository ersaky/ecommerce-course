import bcrypt from "bcryptjs";
import pool from "@/db/connection";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();
    if (!name || !email || !password) {
      return NextResponse.json(
        {
          error: "Tüm alanları doldurun!",
        },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await pool.query(
      "INSERT INTO users (name, email, password, role, created_at, updated_at) VALUES($1, $2, $3, $4, NOW(), NOW()) RETURNING id, name, email, role",
      [name, email, hashedPassword, "user"]
    );

    const user = result.rows[0];

    return NextResponse.json(
      {
        message: "Kullanıcı başarıyla oluşturuldu",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log("Hata : ", error);
    return NextResponse.json(
      {
        error: "Sunucu hatası",
      },
      {
        status: 500,
      }
    );
  }
}
