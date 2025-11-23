
import axios from "axios";

const API_URL = "http://localhost:3000"; 

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

    createRoom: async (data:any) => {
        try{
            const res = await axios.post(`${API_URL}/room/create`, data);
            return {success:true, data: res.data};
        }catch (err:any){
            return {success:false, error: err.response?.data || "failed" };
        }
    },

    updateRoomById: async (data:any) =>{
        
        try{
            const res = await axios.put(`${API_URL}/room/update`, data);
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
            const res = await axios.get(`${API_URL}/type`)
            return { success:true, data: res.data }

        }
        catch(err:any){
            return { success:false, error: err.response?.data||"failed"}
        }
    }
}
