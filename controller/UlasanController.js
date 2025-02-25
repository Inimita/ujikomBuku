import Ulasan from "../model/Ulasan.js";
import User from "../model/User.js";

export const createUlasan = async (req, res) => {
    try {
        const {rating, komentar, tanggal_review, UserId} = req.body
        const ulasan = await Ulasan.create({rating, komentar, tanggal_review, UserId: UserId})
        res.status(200).json(ulasan)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const getUlasan = async (req, res) => {
    try {
        const ulasan = await Ulasan.findAll({
            include:{
                model: User,
                as: "User",
                required: true,
                attributes: ["nama"]
            }
        })
        res.status(200).json(ulasan)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const getUlasanById = async (req, res) => {
    try {
        const {id} = req.params
        const ulasan = await Ulasan.findAll(
            {
                include:{
                    model: User,
                    as: "User",
                    required: true
                }
            }
        )
        res.status(200).json(ulasan)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const deleteUlasan = async (req, res) => {
    try {
        const {id} = req.params
        const deleted = await Ulasan.destroy({where: {id}})
        if(deleted){
            res.status(204).json({message: "Ulasan deletetd"})
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}