import { DataTypes } from "sequelize";
import db from "../utils/connection.js";
import Pesanan from "./Pesanan.js";
import Pembayaran from "./Pembayaran.js";
import Ulasan from "./Ulasan.js";
import Keranjang from "./Keranjang.js";
import Buku from "./Buku.js";

const User = db.define("User",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nama:{
            type: DataTypes.STRING,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false
        },
        password:{  
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: "User"
    }
);


//PESANAN
Keranjang.hasOne(Pesanan, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

Pesanan.belongsTo(Keranjang, {
    foreignKey: "KeranjangId",
    onDelete: "CASCADE",    
    onUpdate: "CASCADE" 
})

User.hasMany(Pesanan, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

Pesanan.belongsTo(User, {
    foreignKey: "UserId",
    onDelete: "CASCADE",    
    onUpdate: "CASCADE" 
})

//PEMBAYARAN
Pesanan.hasOne(Pembayaran, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

Pembayaran.belongsTo(Pesanan, {
    foreignKey: "PesananId",
    onDelete: "CASCADE",    
    onUpdate: "CASCADE" 
})


//ULASAN
User.hasMany(Ulasan, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

Ulasan.belongsTo(User, {
    foreignKey: "UserId",
    onDelete: "CASCADE",    
    onUpdate: "CASCADE" 
})


//KERANJANG
User.hasMany(Keranjang, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

Keranjang.belongsTo(User, {
    foreignKey: "UserId",
    onDelete: "CASCADE",    
    onUpdate: "CASCADE" 
})

Buku.hasMany(Keranjang, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

Keranjang.belongsTo(Buku, {
    foreignKey: "BukuId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

export default User

// User bisa memiliki banyak Pesanan (1:M)

// Pesanan memiliki satu Pembayaran (1:1)
// User bisa memiliki banyak Ulasan (1:M)
// Ulasan terkait dengan satu Buku (M:1)
// User bisa memiliki banyak Keranjang (1:M)
// Keranjang terkait dengan satu Buku (M:1)
// Admin bertanggung jawab untuk mengelola Buku