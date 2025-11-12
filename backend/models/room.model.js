import dbPromise from "../dbconnect.js";


// ----------------------------------------------------------------------------------------------------------
class Status{
    static async createTable(){
        const db = await dbPromise;
        await db.run(`
            create table if not EXISTS status(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            room_status TEXT not null
            )
        `);
    }
    static async getAllStatus(){
        const db = await dbPromise;
        return await db.all(`
            SELECT * FROM status
            `)
    }
    static async fristCreate(){
        const db = await dbPromise;

        const statusA = "booking"
        const statusB = "cleaning"
        const statusC = "maintenance"

        const count = await db.get(`SELECT COUNT(*) as total FROM status`);
        if (count.total === 0) {
            await db.run(
                `INSERT INTO status (room_status) VALUES (?), (?), (?)`,
                [statusA, statusB, statusC]
            );
        }
    }
}
// ----------------------------------------------------------------------------------------------------------

class RoomType{
    static async createTable(){
        const db = await dbPromise;
        await db.run(`
            create table if not EXISTS room_types(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            room_type TEXT not null
            )
            `)
    }
    static async getAllRoomType(){
        const db = await dbPromise;
        return await db.all(`SELECT * FROM room_types`)
    }

    static async fristCreate(){
        const db = await dbPromise;
        
        const typeA = "Single Room"
        const typeB = "Twin Room"
        const typeC = "Triple Room"
        const typeD = "Quad Room"

        const count = await db.get(`SELECT COUNT(*) as total FROM room_types`);
        if (count.total === 0) {
            await db.run(
                `INSERT INTO room_types (room_type) VALUES (?), (?), (?), (?)`,
                [typeA, typeB ,typeC, typeD]
            );
        }
    }

}
// ----------------------------------------------------------------------------------------------------------

class Room{
    static async createTable(){
        const db = await dbPromise;
        await db.run(`
            CREATE TABLE IF NOT EXISTS rooms (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                room_number TEXT NOT NULL UNIQUE,
                room_price FLOAT,
                room_status_id INTEGER NOT NULL,
                room_type_id INTEGER NOT NULL,
                FOREIGN KEY (room_status_id) REFERENCES status(id),
                FOREIGN KEY (room_type_id) REFERENCES room_types(id)
            )
            `)
    }
    static async getAll(){
        const db = await dbPromise;
        return await db.all(`
            SELECT * FROM rooms
            `)
    }

    static async fristCreate(){
        const db = await dbPromise;
        
        const count = await db.get(`SELECT COUNT(*) as total FROM rooms`);
        if (count.total === 0) {
            await db.run(
                `INSERT INTO rooms (room_number, room_price, room_type_id, room_status_id) VALUES (?, ?, ?, ?)`,
                ["ABC", 400, 1, 2]
            );
        }
    }

    static async getRoomById(id) {
        const db = await dbPromise;
        return await db.get(`SELECT * FROM rooms WHERE id = ?`, [id]);
    }

    static async createRoom(room_number, room_price, room_status, room_type){

        const db = await dbPromise;
        const statusRow = await db.get(`SELECT id FROM status WHERE room_status = ?`, [room_status]);
        const typeRow = await db.get(`SELECT id FROM room_types WHERE room_type = ?`, [room_type]);
        console.log("Status ID:", statusRow.id, "Type ID:", typeRow.id);

        if (!statusRow || !typeRow) {
            throw new Error("Invalid room_status or room_type");
        }

        const room_status_id = statusRow.id;
        const room_type_id = typeRow.id;

        console.log("Status ID:", room_status_id, "Type ID:", room_type_id);
        await db.run(`
            INSERT INTO rooms (room_number, room_price, room_status_id, room_type_id) VALUES (?,?,?,?)
        `,[room_number,room_price, room_status_id, room_type_id])
    
    }

    static async updateRoom(room_number, room_price, room_status, room_type, id){
        const db = await dbPromise;
        
        const room_status_obj = await db.get(
            `SELECT id FROM status WHERE room_status = ?`,
            [room_status]
        );
        const room_type_obj = await db.get(
            `SELECT id FROM room_types WHERE room_type = ?`,
            [room_type]
        );
        if (!room_status_obj || !room_type_obj) {
            throw new Error("Invalid room status or room type");
        }
        await db.run(
            `UPDATE rooms SET room_number = ?,room_price = ?, room_status_id = ?, room_type_id = ? WHERE id = ?`,
            [room_number, room_price, room_status_obj.id, room_type_obj.id, id]
        );
    }


    static async deleteRoomById(id){
        const db = await dbPromise;

        await db.run(`
            delete from rooms where id = ?
            `,[id])
    }
    

    static async getRoomByNumber(number) {
        const db = await dbPromise;
        return await db.get(`
            SELECT * FROM rooms WHERE room_number = ?
        `, [number]);

        
    }
}


export {
    Room,
    Status,
    RoomType
}