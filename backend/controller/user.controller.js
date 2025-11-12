import User from "../models/user.model.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = "YOUR_SECRET_KEY"; // ควรเก็บใน .env

const userController = {
  register: async (req, res) => {
    const { username, password, role } = req.body;
    try {
      const existing = await User.getUserByUsername(username);
      if (existing) return res.status(400).json({ message: "Username already exists" });

      await User.createUser(username, password, role);
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating user" });
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.getUserByUsername(username);
      if (!user) return res.status(404).json({ message: "User not found" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: "Invalid password" });

      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        SECRET,
        { expiresIn: "2h" }
      );

      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error logging in" });
    }
  }
};


export default userController;