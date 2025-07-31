import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
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

export default pool;
