import express from 'express'
import { createPesanan, getPesanan, getPesananById } from '../controller/PesananController.js'

const PesananRouter = express.Router()

PesananRouter.post("/pesanan/post", createPesanan)
PesananRouter.get("/pesanan", getPesanan)
PesananRouter.get("/pesanan/:id", getPesananById)

export default PesananRouter