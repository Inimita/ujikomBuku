import Buku from "../model/Buku.js";

export const createBuku = async (req, res) => {
    try {
        const {gambar, judul, penulis, genre, deskripsi, harga, stok, tipe} = req.body
        // Validasi: Pastikan `genre` berbentuk array sebelum disimpan
        if (!Array.isArray(genre)) {
            return res.status(400).json({ message: "Genre harus berbentuk array" });
        }

        const buku = await Buku.create({gambar, judul, penulis, genre, deskripsi, harga, stok, tipe })
        res.status(200).json(buku)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const getBuku = async (req, res) => {
    try {
        const buku = await Buku.findAll()
        res.status(200).json(buku)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const getBukuById = async (req, res) => {
    try {
        const {id} = req.params
        const buku = await Buku.findByPk(id)
        if (!buku) {
            return res.status(404).json({ message: "Buku tidak ditemukan" });
        }
         // Atur ulang urutan properti
         const orderedBuku = {
            id: buku.id,
            gambar: buku.gambar,
            judul: buku.judul,
            genre: buku.genre,
            penulis: buku.penulis,
            deskripsi: buku.deskripsi,
            harga: buku.harga,
            stok: buku.stok,
            tipe: buku.tipe,
            }
        res.status(200).json(orderedBuku)
    } catch (error) {
        res.status(500).json({error: message.error})
    }
}

// export const getBukuById = async (req, res) => {
//     try {
//         const { id } = req.params; // Ambil ID dari parameter URL
//         const { genre, penulis } = req.query; // Ambil filter dari query params

//         let filterConditions = { id }; // Mulai dengan filter berdasarkan ID

//         // Tambahkan filter opsional jika diberikan dalam query params
//         if (genre) {
//             filterConditions.genre = { [Op.like]: `%${genre}%` };
//         }
//         if (penulis) {
//             filterConditions.penulis = { [Op.like]: `%${penulis}%` };
//         }

//         // Cari buku dengan ID dan filter tambahan
//         const buku = await Buku.findOne({
//             where: filterConditions,
//         });

//         if (!buku) {
//             return res.status(404).json({ message: "Buku tidak ditemukan" });
//         }
//         res.status(200).json(buku);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };


export const updateBuku = async (req, res) => {
    try {
        const { id } = req.params;
        const { gambar, judul, penulis, genre, deskripsi, harga, stok, tipe } = req.body;
        if (!Array.isArray(genre)) {
            return res.status(400).json({ message: "Genre harus berbentuk array" });
        }

        const [updatedRows] = await Buku.update(
            { gambar, judul, penulis, genre, deskripsi, harga, stok, tipe },
            { where: { id } }
        );

        if (updatedRows === 0) {
            return res.status(404).json({ message: "Buku tidak ditemukan" });
        }

        res.status(200).json({ message: "Buku berhasil diperbarui" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const deleteBuku = async (req, res) =>{
    try {
        const {id} = req.params
        const deleted = await Buku.destroy({where: {id}})
        res.status(204).json(deleted)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const getBukuByGenre = async (req, res) => {
    try {
        const { genre } = req.query; // Ambil genre dari query parameter

        if (!genre) {
            return res.status(400).json({ message: "Genre harus diberikan dalam query parameter" });
        }

        // Cari buku dengan genre yang mengandung kata yang dicari
        const buku = await Buku.findAll({
            where: {
                genre: {
                    [Op.like]: `%${genre}%`
                }
            }
        });

        res.status(200).json(buku);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
