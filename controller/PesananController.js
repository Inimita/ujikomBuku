import { DATE } from "sequelize";
import Pesanan from "../model/Pesanan.js";
import Keranjang from "../model/Keranjang.js"; // Pastikan Anda punya model Keranjang
import Buku from "../model/Buku.js";
import User from "../model/User.js";

export const createPesanan = async (req, res) => {
    try {
        const { UserId, KeranjangId, tanggal_pemesanan } = req.body;
        const tanggal_pesan = tanggal_pemesanan || new Date();

        // Ambil semua item dalam keranjang
        const keranjangItems = await Keranjang.findAll({
            where: { id: KeranjangId },
            include: [{ model: Buku }] // Pastikan ada relasi dengan Produk
        });

        // Hitung total harga
        const total_harga = keranjangItems.reduce((total, item) => {
            return total + (item.Buku.harga * item.jumlah_buku); // Harga * jumlah produk
        }, 0);

        // Buat pesanan dengan total harga yang dihitung
        const pesanan = await Pesanan.create({
            UserId,
            KeranjangId,
            total_harga,
            tanggal_pemesanan: tanggal_pesan
        });

        res.status(201).json(pesanan);
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan", error });
    }
};


export const getPesanan = async (req, res) =>{
    try {
        const pesanan = await Pesanan.findAll({
            include: [
                { model: User, 
                   as: "User",
                   attributes: ["nama", "email"],
                   required: true 
                },
                { model: Keranjang, 
                  as: "Keranjang",
                  attributes: ["jumlah_buku"],
                  required: true,
                  include: [
                      { model: Buku,
                        as: "Buku",
                        attributes: ["gambar", "judul", "harga"],
                        required: true
                      }
                  ]
                }
            ]
        });
        res.status(200).json(pesanan)
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan", error });
    }
}

export const getPesananById = async (req, res) => {
    try {
        const {id} = req.params
        const pesanan = await Pesanan.findByPk(id, {
            include: [
                { model: User, 
                   as: "User",
                   attributes: ["nama", "email"],
                   required: true 
                },
                { model: Keranjang, 
                  as: "Keranjang",
                  attributes: ["jumlah_buku"],
                  required: true,
                  include: [
                      { model: Buku,
                        as: "Buku",
                        attributes: ["gambar", "judul", "harga"],
                        required: true
                      }
                  ]
                }
            ]
        })
        res.status(200).json(pesanan)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}