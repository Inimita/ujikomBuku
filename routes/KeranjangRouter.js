import express from 'express'
import { authenticateUser, verifyToken } from '../middleware/auth.js'
import { createKeranjang, deleteKeranjang, getKeranjang, getKeranjangById, getKeranjangByUser, updateKeranjang } from '../controller/KeranjangController.js'

const KeranjangRouter = express.Router()

KeranjangRouter.post("/keranjang/post", createKeranjang)
KeranjangRouter.get("/keranjang", getKeranjang)
KeranjangRouter.get("/keranjang/user/:userId", getKeranjangByUser)
KeranjangRouter.get("/keranjang/:id", getKeranjangById)
KeranjangRouter.put("/keranjang/update/:id", updateKeranjang)
KeranjangRouter.delete("/keranjang/:id", deleteKeranjang)
KeranjangRouter.get("/keranjang/user", authenticateUser, getKeranjangByUser);
KeranjangRouter.get("/keranjang/user",verifyToken,  getKeranjangByUser);

export default KeranjangRouter