import pool from "./connection";

export async function getCategories(email) {
  try {
    const result = await pool.query(
      "SELECT * FROM categories ORDER BY name ASC"
    );
    return result.rows;
  } catch (error) {
    console.error("Hata : ", error);
    throw error;
  }
}

export async function getCategoryById(id) {
  try {
    const result = await pool.query("SELECT * FROM categories WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error getting category by id:", error);
    throw error;
  }
}

export async function createCategory(name, description) {
  try {
    const result = await pool.query(
      "INSERT INTO categories (name, description, created_at, updated_at) VALUES ($1, $2, NOW(), NOW()) RETURNING *",
      [name, description]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
}

export async function updateCategory(id, name, description) {
  try {
    const result = await pool.query(
      "UPDATE categories SET name = $1, description = $2, updated_at = NOW() WHERE id = $3 RETURNING *",
      [name, description, id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
}

export async function deleteCategory(id) {
  try {
    const result = await pool.query(
      "DELETE FROM categories WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
}
