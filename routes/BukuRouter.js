import express from 'express'
import { createBuku, deleteBuku, getBuku, getBukuByGenre, getBukuById, updateBuku } from '../controller/BukuController.js'

const BukuRouter = express.Router()
BukuRouter.post("/buku/post", createBuku)
BukuRouter.get("/buku", getBuku)
BukuRouter.get("/buku/:id", getBukuById)
BukuRouter.get("/buku", getBukuByGenre)
BukuRouter.put("/buku/:id", updateBuku)
BukuRouter.delete("/buku/delete/:id", deleteBuku)


export default BukuRouter