import { DataTypes } from "sequelize";
import db from "../utils/connection.js";

const Pesanan = db.define(
    "Pesanan",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        total_harga: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tanggal_pemesanan: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {tableName: "Pesanan"}
)

export default Pesanan