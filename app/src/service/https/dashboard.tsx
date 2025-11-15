// src/services/authService.ts
import axios from "axios";

const API_URL = "http://localhost:3000"; // เปลี่ยนตาม backend ของคุณ

export const DashboardSevice = {
  // ฟังก์ชัน Login
  login: async (username: string, password: string) => {
    try {
      const res = await axios.post(`${API_URL}/login`, { username, password });
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      return res.data;
    } catch (err: any) {
      throw err.response?.data || { message: "Login failed" };
    }
  },
  

};
