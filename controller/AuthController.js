import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../model/User.js";
dotenv.config();

// LOGIN
// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ where: { email } });

//     if (!user) {
//       return res.status(404).json({ msg: "User not found!" });
//     }   

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ msg: "Invalid Password" });
//     }

//     // Tambahkan role ke dalam token JWT
//     const token = jwt.sign(
//       { id: user.id, email: user.email, role: user.role }, // Tambahkan role
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     return res.status(200).json({ msg: "Login successfully", token });
//   } catch (error) {
//     return res.status(500).json({ msg: "Login failed", error: error.message });
//   }
// };

export const login = async (req, res) => {
  try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ msg: "Password salah" });

      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });


      res.json({
          msg: "Login sukses",
          token,
          user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role, // Pastikan role dikirim
          },
      });
  } catch (error) {
      res.status(500).json({ msg: "Server error", error });
  }
};

// GET ME
export const getMe = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
      attributes: ["id", "nama", "email", "role"], // Pilih atribut yang ingin ditampilkan
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found!" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Failed to get user data", error: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const { nama, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Menentukan role berdasarkan email
    const role = email.includes("@admin.com") ? "admin" : "client";

    const newUser = await User.create({
      nama,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({ msg: "User registered successfully", newUser });
  } catch (error) {
    return res.status(500).json({ msg: "Registration failed", error: error.message });
  }
};


// REGISTER CLIENT (User biasa)
// export const register = async (req, res) => {
//   try {
//     const { nama, email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = await User.create({
//       nama,
//       email,
//       password: hashedPassword,
//       role: "client", // Role default sebagai client
//     });

//     return res.status(201).json({ msg: "User registered successfully", newUser });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ msg: "Registration failed", error: error.message });
//   }
// };

// //REGISTER ADMIN (Hanya Bisa Dilakukan oleh Admin)
// export const registerAdmin = async (req, res) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ msg: "Only admin can create an admin account" });
//     }

//     const { nama, email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newAdmin = await User.create({
//       nama,
//       email,
//       password: hashedPassword,
//       role: "admin",
//     });

//     return res.status(201).json({ msg: "Admin registered successfully", newAdmin });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ msg: "Admin registration failed", error: error.message });
//   }
// };

// export const registerAdmin = async (req, res) => {
//   try {
//       const { nama, email, password } = req.body;
//       const hashedPassword = await bcrypt.hash(password, 10);

//       const newAdmin = await User.create({
//           nama,
//           email,
//           password: hashedPassword,
//           role: "admin", // Admin otomatis
//       });

//       return res.status(201).json({ msg: "Admin berhasil dibuat!", newAdmin });
//   } catch (error) {
//       return res.status(500).json({ msg: "Registration failed", error: error.message });
//   }
// };

