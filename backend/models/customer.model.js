import dbPromise from '../dbconnect.js';

class Customer {
    static async createTable() {
    const db = await dbPromise;
    await db.run(`
      CREATE TABLE IF NOT EXISTS customers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT UNIQUE
      )
    `);
    const count = await db.get(`SELECT COUNT(*) as count FROM customers`);
    if (count.count === 0){
      
       await db.run(`
        INSERT INTO customers (name, phone, email) VALUES (?,?,?) `
        ,["name","0123456789","test@gmail.com"])
    }

   
  }

  static async getAllCustomer(){
    const db = await dbPromise;
    return await db.all('SELECT * FROM customers');
  }

  static async getCustomerById(  id ){
    const db = await dbPromise;
    return db.get("SELECT * FROM customers WHERE id = ?", [id])
  }

  static async createCustomer(name, email, phone){
    const db = await dbPromise;
    await db.run(`
        INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)`,[name, email, phone])
  }

  static async updateCustomer(name, email, phone, id){
    const db = await dbPromise;
    await db.run(`
        UPDATE customers
        set name = ? ,
            email = ?,
            phone = ?
            where id = ?
        `,[name, email, phone, id])
  }

  static async deleteCustomerById(id){
    const db = await dbPromise;
    await db.run(`
        Delete FROM customers where id = ?
        `,[id]
    )
  }

  static async getCustomerByEmail(email) {
        const db = await dbPromise;
        const customer = await db.get("SELECT * FROM customers WHERE Email = ?", [email]);
        return customer;
  }
}


export default Customer;

