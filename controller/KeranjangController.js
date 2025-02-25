import Buku from "../model/Buku.js";
import Pesanan from "../model/Pesanan.js";
import Keranjang from "../model/Keranjang.js";
import User from "../model/User.js"

export const createKeranjang = async (req, res) => {
    try {
        const {jumlah_buku, BukuId, UserId} = req.body
        const keranjang = await Keranjang.create({
            jumlah_buku, BukuId: BukuId, UserId: UserId
        })
        res.status(200).json(keranjang)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const getKeranjang = async (req, res) => {
    try {
        const keranjang = await Keranjang.findAll({
            include:{
                model: Buku,
                as: "Buku",
                attributes: ["gambar", "judul", "harga"],
                required: true
            }
        })
        res.status(200).json(keranjang)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const getKeranjangById = async (req, res) => {
    try {
        const {id} = req.params
        const keranjang = await Keranjang.findAll({
            include:{
                model: Buku,
                as: "Buku",
                attributes: ["gambar", "judul", "harga"],
                required: true
            }
        })
        res.status(200).json(keranjang)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const deleteKeranjang = async (req, res) => {
    try {
        const {id} = req.params
        const keranjang = await Keranjang.destroy({where: {id}})
        res.status(200).json(keranjang)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const updateKeranjang = async (req, res) => {
    try {
        const {id} = req.params
        const {jumlah_buku, BukuId} = req.body
        const [updated] = await Keranjang.update(
            {jumlah_buku, BukuId: BukuId}, {where: {id}}
        )
        if (updated) {
            const updateKeranjang = await Keranjang.findByPk(id);
            res.status(200).json(updateKeranjang);
          } else {
            res.status(404).json({ message: "Keranjang not found" });
          }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}


export const getKeranjangByUser = async (req, res) => {
    try {
        const userId = req.user.id; // Ambil dari token JWT yang sudah di-decode
        console.log("User ID dari token:", userId);

        if (!userId) {
            return res.status(400).json({ message: "User ID tidak valid" });
        }

        const keranjang = await Keranjang.findAll({
            where: { UserId: userId },
            include: [{ model: Buku }]
        });

        if (!keranjang.length) {
            return res.status(404).json({ message: "Keranjang kosong" });
        }

        res.json(keranjang);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data keranjang", error });
    }
};


// export const getKeranjangByUser = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const keranjang = await Keranjang.findAll({
//             where: { UserId: userId },
//             include: [{ model: Buku }]
//         });

//         if (!keranjang.length) {
//             return res.status(404).json({ message: "Keranjang kosong" });
//         }

//         res.json(keranjang);
//     } catch (error) {
//         res.status(500).json({ message: "Gagal mengambil data keranjang", error });
//     }
// };

// export const updateKeranjang = async (req, res) => {
//     const t = await sequelize.transaction(); // Mulai transaksi

//     try {
//         const { id } = req.params; // ID Keranjang
//         const { jumlah_buku, BukuId } = req.body;

//         // Validasi jumlah_buku
//         if (jumlah_buku <= 0) {
//             return res.status(400).json({ message: "Jumlah buku harus lebih dari 0" });
//         }

//         // Validasi User
//         // const user = await User.findByPk(UserId, { transaction: t });
//         // if (!user) {
//         //     return res.status(404).json({ message: "User tidak ditemukan" });
//         // }

//         // Cari Keranjang berdasarkan ID
//         const keranjang = await Keranjang.findByPk(id, { include: Buku, transaction: t });
//         if (!keranjang) {
//             return res.status(404).json({ message: "Keranjang tidak ditemukan" });
//         }

//         // Validasi Buku
//         const buku = await Buku.findByPk(BukuId, { transaction: t });
//         if (!buku) {
//             return res.status(404).json({ message: "Buku tidak ditemukan" });
//         }

//         // Update jumlah_buku, BukuId, dan UserId di Keranjang
//         keranjang.jumlah_buku = jumlah_buku;
//         keranjang.BukuId = BukuId;
//         await keranjang.save({ transaction: t });

//         // Cari Pesanan yang terkait dengan Keranjang ini
//         const pesanan = await Pesanan.findOne({ where: { KeranjangId: id, UserId }, transaction: t });

//         if (pesanan) {
//             // Hitung total harga baru
//             const total_harga_baru = jumlah_buku * buku.harga;

//             // Update total_harga dan jumlah_buku di Pesanan
//             await pesanan.update({ total_harga: total_harga_baru, jumlah_buku }, { transaction: t });
//         }

//         // Commit transaksi jika semua operasi sukses
//         await t.commit();

//         // Return data Keranjang yang telah diperbarui
//         res.status(200).json({ message: "Keranjang dan Pesanan diperbarui", keranjang });

//     } catch (error) {
//         await t.rollback(); // Rollback jika terjadi kesalahan
//         res.status(500).json({ message: "Terjadi kesalahan", error: error.message });
//     }
// };
