import express from "express";
import { 
    createUser, 
    deleteUser, 
    getUser, 
    getUserById, 
    updateUser 
} from "../controller/UserController.js";

import { verifyToken } from "../middleware/auth.js";

const UserRouter = express.Router();

// 🔹 Hanya admin yang boleh melihat semua user
UserRouter.get("/user", verifyToken, getUser);

// 🔹 User bisa melihat datanya sendiri atau admin bisa melihat siapa saja
UserRouter.get("/user/:id", verifyToken, getUserById);

// 🔹 Hanya admin yang bisa menambahkan user baru
UserRouter.post("/user", verifyToken, createUser);

// 🔹 User hanya bisa mengupdate dirinya sendiri, admin bisa mengupdate siapa saja
UserRouter.put("/user/:id", verifyToken, updateUser);

// 🔹 User hanya bisa menghapus dirinya sendiri, admin bisa menghapus siapa saja
UserRouter.delete("/user/:id", verifyToken, deleteUser);

export default UserRouter;
