import { DataTypes } from "sequelize";
import db from "../utils/connection.js";

const Buku = db.define("Buku",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull: false,
        },
        gambar: {
            type: DataTypes.STRING,
            allowNull: false
        },
        judul: {
            type: DataTypes.STRING,
            allowNull: false
        },
        penulis: {
            type: DataTypes.STRING,
            allowNull: false
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                const rawValue = this.getDataValue("genre");
                return rawValue ? JSON.parse(rawValue) : [];
            },
            set(value) {
                this.setDataValue("genre", JSON.stringify(value));
            }
        },
        deskripsi: {
            type: DataTypes.STRING,
            allowNull: false
        },
        harga: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        stok: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tipe: {
            type: DataTypes.STRING,
            allowNull: false
        }
        
    }, {
        tableName: "Buku"
    }
)

export default Buku