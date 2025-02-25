import express from 'express';
import "dotenv/config";
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import "./model/index.js"
import UserRouter from './routes/UserRouter.js';
import BukuRouter from './routes/BukuRouter.js';
import UlasanRouter from './routes/UlasanRouter.js';
import KeranjangRouter from './routes/KeranjangRouter.js'
import PesananRouter from './routes/PesananRouter.js';
import PembayaranRouter from './routes/PembayaranRouter.js';
import AuthRoute from './routes/AuthRoute.js';

dotenv.config()
const app = express()
const port = process.env.PORT || 3000
app.use(bodyParser.json())
app.use(cors())
app.use(UserRouter)
app.use(BukuRouter)
app.use(UlasanRouter)
app.use(KeranjangRouter)
app.use(PesananRouter)
app.use(PembayaranRouter)
app.use(AuthRoute)
app.listen(port, () => {
    console.log('server running at http://localhost:' + port)
})