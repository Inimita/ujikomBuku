import { DataTypes } from "sequelize";
import db from "../utils/connection.js";

const Pembayaran = db.define(
    "Pembayaran",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull: false,
        },
        metode_pembayaran: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status_pembayaran: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tanggal_pembayaran: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {tableName: "Pembayaran"}
)

export default Pembayaran