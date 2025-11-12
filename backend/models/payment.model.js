import dbPromise from "../dbconnect.js";

class Payment {
  static async createTable() {
    const db = await dbPromise;
    await db.run(`
      CREATE TABLE IF NOT EXISTS payments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        payment_status BOOLEAN NOT NULL,
        payment_amount FLOAT NOT NULL,
        payment_method TEXT,
        payment_reference TEXT,
        date DATETIME NOT NULL,
        booking_id INTEGER NOT NULL,
        FOREIGN KEY (booking_id) REFERENCES bookings(id)
      )
    `);
  }

  static async createPayment(payment_status, payment_amount, payment_method, payment_reference, date, booking_id) {
    const db = await dbPromise;
    const result = await db.run(`
      INSERT INTO payments (payment_status, payment_amount, payment_method, payment_reference, date, booking_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [payment_status, payment_amount, payment_method, payment_reference, date, booking_id]);
    return result; // หรือ return lastID ถ้าต้องการ
  }

  static async getAllPayments() {
    const db = await dbPromise;
    return await db.all(`SELECT * FROM payments`);
  }

  static async getPaymentById(id) {
    const db = await dbPromise;
    return await db.get(`SELECT * FROM payments WHERE id = ?`, [id]);
  }

  static async updatePayment(id, payment_status, payment_amount, payment_method, payment_reference, date, booking_id) {
    const db = await dbPromise;
    await db.run(`
      UPDATE payments
      SET payment_status = ?, payment_amount = ?, payment_method = ?, payment_reference = ?, date = ?, booking_id = ?
      WHERE id = ?
    `, [payment_status, payment_amount, payment_method, payment_reference, date, booking_id, id]);
  }

  static async deletePaymentById(id) {
    const db = await dbPromise;
    await db.run(`DELETE FROM payments WHERE id = ?`, [id]);
  }
}

export default Payment;
