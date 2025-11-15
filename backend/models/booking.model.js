import dbPromise from "../dbconnect.js";

class Booking{
    static async createTable(){
        const db = await dbPromise;
        await db.run(`
            CREATE TABLE IF NOT EXISTS bookings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                booking_people INTEGER NOT NULL,
                booking_check_in DATETIME,
                booking_check_out DATETIME,
                booking_total_price FLOAT,
                booking_status BOOLEAN NOT NULL,
                booking_room_id INTEGER NOT NULL,
                booking_customer_id INTEGER NOT NULL,
                FOREIGN KEY (booking_room_id) REFERENCES rooms(id),
                FOREIGN KEY (booking_customer_id) REFERENCES customers(id)
            )
        `);

        const count = await db.get(`SELECT COUNT(*) as count FROM bookings`);
        if (count.count === 0) {
            await db.run(`
                INSERT INTO bookings (
                    booking_people,
                    booking_check_in,
                    booking_check_out,
                    booking_total_price,
                    booking_status,
                    booking_room_id,
                    booking_customer_id
                ) VALUES (?, ?, ?, ?, ?, ?, ?)
            `, [
                2, // booking_people
                '2025-11-10 14:00:00', // check-in
                '2025-11-11 12:00:00', // check-out
                1500.00, // total price
                1, // booking_status (1 = active)
                1, // room_id
                1  // customer_id
            ]);

            console.log('✅ bookings table created and sample data inserted.');
        } else {
            console.log('ℹ️ bookings table already exists and has data.');
        }
    }

    static async getAllBooking(){
        const db = await dbPromise;
        return await db.all(`
            SELECT 
                b.booking_people,
                b.booking_check_in,
                b.booking_check_out,
                b.booking_total_price,
                b.booking_status,
                b.booking_room_id,
                r.room_number,
                r.room_price,
                b.booking_customer_id,
                c.name,
                c.phone,
                c.email
            FROM bookings b
            LEFT JOIN rooms r ON b.booking_room_id = r.id
            LEFT JOIN customers c ON b.booking_customer_id = c.id`)
    }

    static async getBookingById(id){
        const db = await dbPromise;
        return await db.get(`
            SELECT 
                b.booking_people,
                b.booking_check_in,
                b.booking_check_out,
                b.booking_total_price,
                b.booking_status,
                b.booking_room_id,
                r.room_number,
                r.room_price,
                b.booking_customer_id,
                c.name,
                c.phone,
                c.email
            FROM bookings b
            LEFT JOIN rooms r ON b.booking_room_id = r.id
            LEFT JOIN customers c ON b.booking_customer_id = c.id
            WHERE b.id = ?`,[id])
    }

    static async createBooking(booking_people, booking_check_in, booking_check_out, booking_status,booking_room_id, booking_customer_id){
        const db = await dbPromise;
        const price = await db.get(
            `SELECT room_price FROM rooms WHERE id = ?`,
            [booking_room_id]
        );

        const dayResult = await db.get(
            `SELECT julianday(?) - julianday(?) AS days `,
            [booking_check_out, booking_check_in]
        );

        const totalDays = dayResult?.days || 0;
        const totalPrice = totalDays * price.room_price;

        return await db.run(`
            INSERT INTO bookings (booking_people, booking_check_in, booking_check_out, booking_total_price, booking_status, booking_room_id, booking_customer_id)
            VALUES (?,?,?,?,?,?,?)
            `,[
                booking_people, 
                booking_check_in, 
                booking_check_out, 
                totalPrice, 
                booking_status,
                booking_room_id, 
                booking_customer_id
            ])
    }
    
    static async updateBooking(id, booking_people, booking_check_in, booking_check_out, booking_total_price, booking_status, booking_room_id, booking_customer_id) {
        const db = await dbPromise;
        await db.run(`
            UPDATE bookings 
            SET booking_people = ?, booking_check_in = ?, booking_check_out = ?, booking_total_price = ?, booking_status = ?, booking_room_id = ?, booking_customer_id = ?
            WHERE id = ?
        `, [
            booking_people,
            booking_check_in,
            booking_check_out,
            booking_total_price,
            booking_status,
            booking_room_id,
            booking_customer_id,
            id
        ]);

    }


    static async deleteBookingById(id) {
        const db = await dbPromise;
        await db.run(`DELETE FROM bookings WHERE id = ?`, [id]);
        
    }

}

export default Booking;