import { Room } from "../models/room.model.js";

const roomController = {
    getAll: async (req, res) => {
        try{
            const rooms = await Room.getAll();
            res.status(200).json(rooms)
        }
        catch (error){
            console.error(error)
            res.status(500).json({message:" Error fetching rooms", error:error.message})
        }
    },

    getRoomById: async (req, res) => {
        const {id} = req.params;
        try{
            const rooms = await Room.getRoomById(id);
            res.status(200).json(rooms)
        }
        catch (error){
            console.error(error)
            res.status(500).json({message:" Error fetching rooms", error:error.message})
        }
    },

    createRoom: async (req, res) =>{
        const {room_number, room_price, room_type, room_status} = req.body;
        console.log(room_number, room_price, room_type, room_status);
        try{
            
            await Room.createRoom(room_number, room_price, room_status, room_type)
            res.status(201).json({message:"room created successfull"})
        }
        catch (error){
            console.error(error)
            res.status(500).json({message:"Error create room", error: error.message})
        }
    },
    updateRoom: async (req, res) =>{
        const {room_number, room_price, room_type, room_status, id} = req.body;
        const existingRoom = await Room.getRoomById(id);

        if (!existingRoom) return res.status(404).json({ message: "Room not found" });

        try{
            await Room.updateRoom(room_number, room_price, room_status, room_type, id)
            res.status(201).json({message:"Room updated successfull"})
        }
        catch (error){
            console.error(error)
            res.status(500).json({message:"Error update room"})

        }
    },
    deleteRoomById: async (req, res)=>{
        const {id} = req.params;
        const existingRoom = await Room.getRoomById(id);

        if (!existingRoom) return res.status(404).json({ message: "Room not found" });

        try{
            await Room.deleteRoomById(id);
            res.status(200).json({message:'Delete room successfull'})
        }catch (error){
            console.error(error)
            res.status(500).json({message: "Delete fail"})
        }

    }
}

export default roomController;