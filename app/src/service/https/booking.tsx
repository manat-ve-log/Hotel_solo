
import axios from "axios";

const API_URL = "http://localhost:3000"; 

export const BookingService = {

    getBookings: async () => {
        try {
            const res = await axios.get(`${API_URL}/booking`);
            console.log("HTTP STATUS:", res.status);      
            return { success: true, data: res.data };
        } catch (err: any) {
            console.log("HTTP STATUS:", err.response?.status);
            return { success: false, error: err.response?.data || "failed" };
        }
    },

    getBookingByID: async (id:any) =>{
        try{
            const res = await axios.get(`${API_URL}/booking/${id}`);
            return {success:true, data: res.data};
        }catch (err:any){
            return {success: false, error: err.response?.data || "failed" };
        }
    },

    createBooking: async (data:any) => {
        try{
            const res = await axios.post(`${API_URL}/booking/create`, data);
            return {success:true, data: res.data};
        }catch (err:any){
            return {success:false, error: err.response?.data || "failed" };
        }
    },

    updateBookingById: async (data:any) =>{
        
        try{
            const res = await axios.put(`${API_URL}/booking/update`, data);
            return {success:true, data: res.data};
        }catch (err:any){
            return {success: false, error: err.response?.data || "failed" };
        }
    },

    deleteBookingById: async (id:any) =>{
        
        try{
            const res = await axios.delete(`${API_URL}/booking/${id}`);
            return {success:true, data: res.data};
        }catch (err:any){
            return {success: false, error: err.response?.data || "failed" };
        }
    },
    
};
