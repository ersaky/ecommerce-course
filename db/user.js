import pool from "./connection";

// users
export async function getUsers() {
  try {
    const result = await pool.query("SELECT * FROM users ORDER BY name ASC");
    return result.rows;
  } catch (error) {
    console.error("Error getting users:", error);
    throw error;
  }
}

export async function getUsersWithPagination(limit, offset) {
  try {
    // Toplam kullanıcı sayısını al
    const countResult = await pool.query("SELECT COUNT(*) FROM users");
    const total = parseInt(countResult.rows[0].count);

    // Sayfalanmış kullanıcıları al
    const usersResult = await pool.query(
      "SELECT * FROM users ORDER BY created_at DESC LIMIT $1 OFFSET $2",
      [limit, offset]
    );

    return {
      users: usersResult.rows,
      total: total,
    };
  } catch (error) {
    console.error("Error getting users with pagination:", error);
    throw error;
  }
}

export async function getUserByEmail(email) {
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error getting user by email:", error);
    throw error;
  }
}

export async function getUserById(id) {
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
  } catch (error) {
    console.error("Error getting user by id:", error);
    throw error;
  }
}

export async function createUser(name, email, password, role = "user") {
  try {
    const result = await pool.query(
      "INSERT INTO users (name, email, password, role, created_at, updated_at) VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING *",
      [name, email, password, role]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function updateUser(id, name, email, role) {
  try {
    const result = await pool.query(
      "UPDATE users SET name = $1, email = $2, role = $3, updated_at = NOW() WHERE id = $4 RETURNING *",
      [name, email, role, id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

export async function deleteUser(id) {
  try {
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}
