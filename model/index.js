import db from "../utils/connection.js";
import User from "./User.js";
import Buku from "./Buku.js";
import Pesanan from "./Pesanan.js";
import Keranjang from "./Keranjang.js";
import Pembayaran from "./Pembayaran.js";
import Ulasan from "./Ulasan.js";

await db.sync({alter : true});

