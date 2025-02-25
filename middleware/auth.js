// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config();

// export const verifyToken = (req, res, next) => {
//   const authHeader = req.headers["authorization"];

//   if (!authHeader) {
//     return res.status(403).json({ msg: "No token provided." });
//   }

//   const token = authHeader.startsWith("Bearer ")
//     ? authHeader.substring(7, authHeader.length)
//     : authHeader;

//   if (!token) {
//     return res.status(403).json({ msg: "Token missing." });
//   }
//   console.log("Token received in Backend:", token); // Debugging token
//   try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET || "apaaja");
//       console.log("Decoded Token:", decoded); // Debugging hasil decode
//       req.user = decoded;
//       next();
//   } catch (error) {
//       console.error("Token verification failed:", error.message);
//       return res.status(401).json({ msg: "Unauthorized or invalid token" });
//   }
  
// };

// Middleware untuk membatasi akses hanya ke role tertentu
// export const checkRole = (roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({ msg: "Access denied. Insufficient permissions." });
//     }
//     next();
//   };
// };



import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    console.log("Tidak ada token di request");
    return res.status(403).json({ msg: "No token provided." });
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.substring(7, authHeader.length)
    : authHeader;

  console.log("Token diterima di Backend:", token);
  console.log("JWT_SECRET dari .env:", process.env.JWT_SECRET);

  if (!token) {
    return res.status(403).json({ msg: "Token missing." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "rahasianegara");
    req.user = decoded;
    console.log("Token valid! User:", decoded);
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(401).json({ msg: "Unauthorized or invalid token" });
  }
};


export const checkAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Hanya admin yang bisa melakukan ini!" });
  }
  next();
};


export const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
      return res.status(401).json({ message: "Token tidak tersedia" });
  }

  try {
      const decoded = jwt.verify(token, "SECRET_KEY");
      req.user = decoded; // Simpan user ke req
      next();
  } catch (error) {
      res.status(403).json({ message: "Token tidak valid" });
  }
};
