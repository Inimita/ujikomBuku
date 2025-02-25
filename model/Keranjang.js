import { DataTypes } from "sequelize";
import db from "../utils/connection.js";

const Keranjang = db.define(
    "Keranjang",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull: false,
        },
        jumlah_buku: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {tableName: "Keranjang"}
)

// // Hook setelah update Keranjang
Keranjang.afterUpdate(async (keranjang, options) => {
    try {
        // Cari pesanan yang terkait dengan keranjang ini
        const pesanan = await Pesanan.findOne({ where: { KeranjangId: keranjang.id } });

        if (pesanan) {
            // Ambil harga buku terkait untuk menghitung total_harga baru
            const buku = await keranjang.getBuku();

            if (buku && buku.harga) {
                const total_harga_baru = keranjang.jumlah_buku * buku.harga;
                
                // Update total_harga di Pesanan
                await pesanan.update({
                    total_harga: total_harga_baru
                });

                console.log("Total harga pesanan diperbarui:", total_harga_baru); // Cek log
            } else {
                console.error("Harga buku tidak ditemukan"); // Pastikan harga ada
            }
        } else {
            console.error("Pesanan tidak ditemukan"); // Pastikan pesanan terkait ada
        }
    } catch (error) {
        console.error("Error memperbarui pesanan:", error);
    }
});

export default Keranjang