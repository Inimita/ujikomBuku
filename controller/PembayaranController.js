import Pembayaran from "../model/Pembayaran.js";
import Pesanan from "../model/Pesanan.js";
import User from "../model/User.js";
import Keranjang from "../model/Keranjang.js";
import Buku from "../model/Buku.js";

export const createPembayaran = async (req, res) => {
    try {
        const {PesananId, metode_pembayaran, status_pembayaran, tanggal_pembayaran} = req.body
        const tanggal_bayar = tanggal_pembayaran || new Date()

        const pembayaran = await Pembayaran.create(
            {
                PesananId: PesananId,
                metode_pembayaran,
                status_pembayaran,
                tanggal_pembayaran: tanggal_bayar
            }
        )
        res.status(201).json(pembayaran)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const getPembayaran = async (req, res) => {
    try {
        const pembayaran = await Pembayaran.findAll({
            include:{
                model: Pesanan,
                as: "Pesanan",
                attributes: ["total_harga"],
                required: true,
                include:{
                    model: User,
                    as: "User",
                    attributes: ["nama", "email"],
                    required: true
                },
                include:{
                    model: Keranjang,
                    as: "Keranjang",
                    attributes: ["jumlah_buku"],
                    required: true,
                    include:{
                        model: Buku,
                        as: "Buku",
                        attributes: ["gambar", "judul", "harga"],
                        required: true
                    }
                }
            }
        })
        res.status(200).json(pembayaran)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const getPembayaranById = async (req, res) => {
    try {
        const {id} = req.params
        const pembayaran = await Pembayaran.findByPk(id, {
            include:{
                model: Pesanan,
                as: "Pesanan",
                attributes: ["total_harga"],
                required: true,
                include:{
                    model: User,
                    as: "User",
                    attributes: ["nama", "email"],
                    required: true
                },
                include:{
                    model: Keranjang,
                    as: "Keranjang",
                    attributes: ["jumlah_buku"],
                    required: true,
                    include:{
                        model: Buku,
                        as: "Buku",
                        attributes: ["gambar", "judul", "harga"],
                        required: true
                    }
                }
            }
        })
        res.status(200).json(pembayaran)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}