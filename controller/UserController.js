import User from "../model/User.js";
import bcrypt from "bcrypt";

// 🔹 GET Semua User (Hanya Admin)
export const getUser = async (req, res) => {
    try {
        // Hanya admin yang boleh melihat semua user
        if (req.user.role !== "admin") {
            return res.status(403).json({ msg: "Access denied. Only admin can view all users." });
        }

        const users = await User.findAll({
            attributes: ["id", "nama", "email", "role"] // Hindari mengembalikan password
        });

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 🔹 GET User by ID (Admin bisa lihat siapa saja, User hanya bisa lihat dirinya sendiri)
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        // Admin bisa akses semua user, tapi user biasa hanya bisa akses dirinya sendiri
        if (req.user.role !== "admin" && req.user.id !== parseInt(id)) {
            return res.status(403).json({ msg: "Access denied. You can only view your own profile." });
        }

        const user = await User.findByPk(id, {
            attributes: ["id", "nama", "email", "role"] // Hindari mengembalikan password
        });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 🔹 CREATE User (Hanya untuk Admin Menambahkan User Baru)
export const createUser = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ msg: "Access denied. Only admin can create users." });
        }

        const { nama, email, password, role } = req.body;

        if (!["admin", "client"].includes(role)) {
            return res.status(400).json({ msg: "Invalid role. Allowed roles: admin, client" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ nama, email, password: hashedPassword, role });

        res.status(201).json({ msg: "User created successfully", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 🔹 UPDATE User (Admin bisa update siapa saja, User hanya bisa update dirinya sendiri)
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama, email, password, role } = req.body;

        // Admin bisa update siapa saja, tapi user hanya bisa update dirinya sendiri
        if (req.user.role !== "admin" && req.user.id !== parseInt(id)) {
            return res.status(403).json({ msg: "Access denied. You can only update your own profile." });
        }

        let hashedPassword = undefined;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const updateData = {
            nama,
            email,
            ...(hashedPassword && { password: hashedPassword }), // Hanya update password jika diberikan
            ...(req.user.role === "admin" && role ? { role } : {}), // Hanya admin yang bisa ubah role
        };

        const updated = await User.update(updateData, { where: { id } });

        if (updated[0] === 0) {
            return res.status(404).json({ msg: "User not found or no changes made." });
        }

        res.status(200).json({ msg: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 🔹 DELETE User (Admin bisa hapus siapa saja, User hanya bisa hapus akunnya sendiri)
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Admin bisa hapus siapa saja, tapi user hanya bisa hapus dirinya sendiri
        if (req.user.role !== "admin" && req.user.id !== parseInt(id)) {
            return res.status(403).json({ msg: "Access denied. You can only delete your own account." });
        }

        const deleted = await User.destroy({ where: { id } });

        if (!deleted) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.status(200).json({ msg: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
