import express from "express"
import { createPembayaran, getPembayaran, getPembayaranById } from '../controller/PembayaranController.js'

const PembayaranRouter = express.Router()

PembayaranRouter.post("/pembayaran/post", createPembayaran)
PembayaranRouter.get("/pembayaran", getPembayaran)
PembayaranRouter.get("/pembayaran/:id", getPembayaranById)

export default PembayaranRouter