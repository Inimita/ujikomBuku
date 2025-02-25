import esxpress from 'express';
import { createUlasan, deleteUlasan, getUlasan, getUlasanById } from '../controller/UlasanController.js';

const UlasanRouter = esxpress.Router()

UlasanRouter.post("/ulasan/post", createUlasan)
UlasanRouter.get("/ulasan", getUlasan)
UlasanRouter.get("/ulasan/:id", getUlasanById)
UlasanRouter.delete("/ulasan/:id", deleteUlasan)

export default UlasanRouter