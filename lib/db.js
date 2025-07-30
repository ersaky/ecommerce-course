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

export async function getUserByEmail(email) {
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Hata : ", error);
    throw error;
  }
}

export async function getCategories() {
  try {
    const result = await pool.query(
      "SELECT * FROM categories ORDER BY name ASC"
    );
    return result.rows;
  } catch (error) {
    console.error("Kategori Listesi Hata : ", error);
    throw error;
  }
}
export default pool;
