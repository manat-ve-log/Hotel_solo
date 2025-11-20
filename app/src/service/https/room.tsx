
import axios from "axios";

const API_URL = "http://localhost:3000"; // เปลี่ยนตาม backend ของคุณ

export const RoomService = {

    getRooms: async () => {
        try {
            const res = await axios.get(`${API_URL}/room`);
            console.log("HTTP STATUS:", res.status);      
            return { success: true, data: res.data };
        } catch (err: any) {
            console.log("HTTP STATUS:", err.response?.status);
            return { success: false, error: err.response?.data || "failed" };
        }
    },

    getRoomByID: async (id:any) =>{
        try{
            const res = await axios.get(`${API_URL}/room/${id}`);
            return {success:true, data: res.data};
        }catch (err:any){
            return {success: false, error: err.response?.data || "failed" };
        }
    },

    createRoom: async (floor:any, room_bumer:string, room_type:string, room_status:string) =>{
        
        try{
            const res = await axios.post(`${API_URL}/room/create`, {floor, room_bumer, room_type, room_status});
            return {success:true, data: res.data};
        }catch (err:any){
            return {success: false, error: err.response?.data || "failed" };
        }
    },
    updateRoomById: async (id:any, floor:any, room_bumer:string, room_type:string, room_status:string) =>{
        
        try{
            const res = await axios.post(`${API_URL}/room/update`, {id, floor, room_bumer, room_type, room_status});
            return {success:true, data: res.data};
        }catch (err:any){
            return {success: false, error: err.response?.data || "failed" };
        }
    },

    deleteRoomById: async (id:any) =>{
        
        try{
            const res = await axios.delete(`${API_URL}/room/${id}`);
            return {success:true, data: res.data};
        }catch (err:any){
            return {success: false, error: err.response?.data || "failed" };
        }
    },
    
};

export const StatusService = {

    getStatus: async () => {
        try{
            const res = await axios.get(`${API_URL}/status`)
            return { success:true, data: res.data }

        }
        catch(err:any){
            return { success:false, error: err.response?.data||"failed"}
        }
    }
}

export const RoomTypeService = {

    getRoomType: async () => {
        try{
            const res = await axios.get(`${API_URL}/roomType`)
            return { success:true, data: res.data }

        }
        catch(err:any){
            return { success:false, error: err.response?.data||"failed"}
        }
    }
}
