import express from 'express'
import { getMe, login, register } from "../controller/AuthController.js";
import { getUser, getUserById, createUser, updateUser, deleteUser } from "../controller/UserController.js";
import { checkAdmin, verifyToken } from "../middleware/auth.js";

const authRoute = express.Router();

// 🔹 Autentikasi
authRoute.post("/register", register);
authRoute.post("/login", login);
authRoute.get("/me", verifyToken, getMe, (req, res) => {
    res.json({ userId: req.user.id });
}); // Hanya user login bisa akses dirinya sendiri

// 🔹 Manajemen User (Admin Only)
authRoute.get("/users", verifyToken, checkAdmin, getUser); // Admin lihat semua user
authRoute.get("/users/:id", verifyToken, getUserById); // User lihat dirinya sendiri, Admin bisa lihat siapa saja
authRoute.post("/users", verifyToken, checkAdmin, createUser); // Admin buat user baru
authRoute.put("/users/:id", verifyToken, updateUser); // User bisa update dirinya sendiri, Admin bisa update siapa saja
authRoute.delete("/users/:id", verifyToken, deleteUser); // User bisa hapus akunnya, Admin bisa hapus siapa saja

export default authRoute;
