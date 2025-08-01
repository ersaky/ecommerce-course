import pool from "./connection";

// Products operations
export async function getProducts() {
  try {
    const result = await pool.query(
      `SELECT p.*, c.name as category_name 
             FROM products p 
             LEFT JOIN categories c ON p.category_id = c.id 
             ORDER BY p.created_at DESC`
    );
    return result.rows;
  } catch (error) {
    console.error("Error getting products:", error);
    throw error;
  }
}

export async function getProductById(id) {
  try {
    const result = await pool.query(
      `SELECT p.*, c.name as category_name 
             FROM products p 
             LEFT JOIN categories c ON p.category_id = c.id 
             WHERE p.id = $1`,
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error getting product by id:", error);
    throw error;
  }
}

export async function createProduct(
  name,
  description,
  price,
  category_id,
  stock,
  image_url
) {
  try {
    const result = await pool.query(
      `INSERT INTO products (name, description, price, category_id, stock, image_url, created_at, updated_at) 
             VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW()) RETURNING *`,
      [name, description, price, category_id, stock, image_url]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}

export async function updateProduct(
  id,
  name,
  description,
  price,
  category_id,
  stock,
  image_url
) {
  try {
    const result = await pool.query(
      `UPDATE products SET name = $1, description = $2, price = $3, category_id = $4, stock = $5, image_url = $6, updated_at = NOW() 
             WHERE id = $7 RETURNING *`,
      [name, description, price, category_id, stock, image_url, id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

export async function deleteProduct(id) {
  try {
    const result = await pool.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

export async function getFilteredProducts(filters = {}) {
  try {
    const {
      category,
      search,
      sortBy = "created_at",
      sortOrder = "desc",
    } = filters;

    let query = `
            SELECT p.*, c.name as category_name 
            FROM products p 
            LEFT JOIN categories c ON p.category_id = c.id
        `;

    const conditions = [];
    const values = [];
    let paramCount = 0;

    // Kategori filtresi
    if (category && category !== "Tümü") {
      paramCount++;
      conditions.push(`c.name = $${paramCount}`);
      values.push(category);
    }

    // Arama filtresi
    if (search && search.trim()) {
      paramCount++;
      conditions.push(
        `(LOWER(p.name) LIKE $${paramCount} OR LOWER(p.description) LIKE $${paramCount})`
      );
      values.push(`%${search.toLowerCase()}%`);
    }

    // WHERE koşullarını ekle
    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(" AND ")}`;
    }

    // Sıralama
    const validSortFields = {
      name: "p.name",
      price: "p.price",
      created_at: "p.created_at",
    };

    const sortField = validSortFields[sortBy] || "p.created_at";
    const order = sortOrder.toLowerCase() === "asc" ? "ASC" : "DESC";

    query += ` ORDER BY ${sortField} ${order}`;

    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    console.error("Error getting products:", error);
    throw error;
  }
}

export async function getFeaturedProducts(limit = 4) {
  try {
    const result = await pool.query(
      `SELECT p.*, c.name as category_name 
             FROM products p 
             LEFT JOIN categories c ON p.category_id = c.id 
             WHERE p.stock > 0 AND p.is_featured = true
             ORDER BY p.created_at DESC
             LIMIT $1
             `,
      [limit]
    );
    return result.rows;
  } catch (error) {
    console.error("Error getting products:", error);
    throw error;
  }
}
