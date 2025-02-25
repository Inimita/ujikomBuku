import { DataTypes } from "sequelize";
import db from "../utils/connection.js";

const Ulasan = db.define(
    "Ulasan", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    komentar: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tanggal_review: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
    }, {tableName: "Ulasan"}
)

export default Ulasan