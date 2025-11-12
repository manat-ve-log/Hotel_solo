// src/services/authService.ts
import axios from "axios";

const API_URL = "http://localhost:3000"; // เปลี่ยนตาม backend ของคุณ

export const authService = {
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

  // ฟังก์ชัน Register (ถ้าต้องการ)
  register: async (username: string, password: string, role = "staff") => {
    try {
      const res = await axios.post(`${API_URL}/register`, { username, password, role });
      return res.data;
    } catch (err: any) {
      throw err.response?.data || { message: "Register failed" };
    }
  },

  // ดึง token จาก localStorage
  getToken: () => {
    return localStorage.getItem("token");
  },

  // logout
  logout: () => {
    localStorage.removeItem("token");
  },
};
