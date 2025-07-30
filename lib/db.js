import { Pool } from "pg";

const pool = new Pool({
  connectionString:
    "postgresql://postgres.sspvoabaxculrdsxdagt:x9tMzYpbiXRNxs2O@aws-0-eu-central-1.pooler.supabase.com:5432/postgres",
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function testConnection() {
  try {
    const client = await pool.connect();
    console.log("Veritabanı bağlatısı kurulumu başarılı");
    client.release();
    return true;
  } catch (error) {
    console.log("Bağlantı hatası :", error);
    return false;
  }
}
