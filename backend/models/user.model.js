import dbPromise from "../dbconnect.js";
import bcrypt from "bcryptjs";

class User {
  static async createTable() {
    const db = await dbPromise;
    await db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'staff'
      )
    `);

    // เพิ่ม user ตัวอย่างถ้ายังไม่มี
    const count = await db.get(`SELECT COUNT(*) as count FROM users`);
    if (count.count === 0) {
      const hash = await bcrypt.hash("1234", 10);
      await db.run(
        `INSERT INTO users (username, password, role) VALUES (?, ?, ?)`,
        ["admin", hash, "admin"]
      );
      console.log("Created default admin user: admin / admin123");
    }
  }

  static async getUserByUsername(username) {
    const db = await dbPromise;
    return await db.get(`SELECT * FROM users WHERE username = ?`, [username]);
  }

  static async createUser(username, password, role = "staff") {
    const db = await dbPromise;
    const hash = await bcrypt.hash(password, 10);
    await db.run(
      `INSERT INTO users (username, password, role) VALUES (?, ?, ?)`,
      [username, hash, role]
    );
  }
}

export default User;
