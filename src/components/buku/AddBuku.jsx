import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const AddBuku = () => {
    const [gambar, setGambar] = useState("")
    const [judul, setJudul] = useState("")
    const [penulis, setPenulis] = useState("")
    const [genre, setGenre] = useState("")
    const [deskripsi, setDeskripsi] = useState("")
    const [harga, setHarga] = useState("")
    const [stok, setStock] = useState("")
    const [tipe, setTipe] = useState("")
  const navigate = useNavigate();


    // const saveBuku = async (e) =>{
    //     e.preventDefault();
    // try {
    //   await axios.post("http://localhost:3000/buku/post", {
    //     gambar: gambar,
    //     judul: judul,
    //     penulis: penulis,
    //     genre: genre,
    //     deskripsi: deskripsi,
    //     harga: harga,
    //     stok: stok,
    //     tipe: tipe
        
    //   });
    //   alert("Menu berhasil ditambahkan");
    //   navigate("/menu");
    // } catch (error) {
    //   console.log(error);
    // }
        
    // }

    const saveBuku = async (e) => {
        e.preventDefault();
        try {
          await axios.post("http://localhost:3000/buku/post", {
            gambar: gambar,
        judul: judul,
        penulis: penulis,
        genre: [genre],
        deskripsi: deskripsi,
        harga: harga,
        stok: stok,
        tipe: tipe,
          });
          alert("Menu berhasil ditambahkan");
          navigate("admin/dashboard/buku");
        } catch (error) {
          console.log(error);
        }
      };

    
  return (
    <div className="bg-[#8da9c4]">
      <Link to={"/admin/dashboard/buku"}> 
               <img src="https://img.icons8.com/?size=100&id=39944&format=png&color=000000" alt="" 
               className="w-10 bg-[#8da9c4] ml-25 mt-19"/>
               </Link>

    <div className="flex justify-center items-center h-screen bg-[#8da9c4] -mt-30">
       <div className="w-full max-w-md bg-[#eef4ed] p-6 rounded-lg shadow-md">
       <h2 className="text-xl font-semibold mb-4">Tambah Buku</h2>
       <form onSubmit={saveBuku} className="mt-4">
        <div>
            <label className="block text-sm font-medium text-gray-600">gambar</label>
            <input
              type='url'
              placeholder='Masukan url'
              className="w-full p-2 mt-1 border rounded-md"
              value={gambar}
              onChange={(e) => setGambar(e.target.value)}
              required
            />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-600">judul</label>
            <input
              type='text'
              placeholder='Masukan url'
              className="w-full p-2 mt-1 border rounded-md"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              required
            />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-600">penulis</label>
            <input
              type='text'
              placeholder='Masukan url'
              className="w-full p-2 mt-1 border rounded-md"
              value={penulis}
              onChange={(e) => setPenulis(e.target.value)}
              required
            />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-600">genre</label>
            <select
                placeholder='Masukan url'
                className="w-full p-2 mt-1 border rounded-md"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                required
            >
                <option value="">Semua</option>
                    <option value="Fiksi">Fiksi</option>
                    <option value="Sejarah">Sejarah</option>
                    <option value="Misteri">Misteri</option>
                    <option value="Sastra">Sastra</option>
                    <option value="Filosofis">Filosofis</option>
                    <option value="Psikologis">Psikologis</option>
                    <option value="Romantis">Romansa</option>
                    <option value="Pengembangan Diri">Pengembangan Diri</option>
            </select>
            
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-600">deskripsi</label>
            <input
              type='text'
              placeholder='Masukan url'
              className="w-full p-2 mt-1 border rounded-md"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              required
            />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-600">harga</label>
            <input
              type='text'
              placeholder='Masukan url'
              className="w-full p-2 mt-1 border rounded-md"
              value={harga}
              onChange={(e) => setHarga(e.target.value)}
              required
            />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-600">stock</label>
            <input
              type='text'
              placeholder='Masukan url'
              className="w-full p-2 mt-1 border rounded-md"
              value={stok}
              onChange={(e) => setStock(e.target.value)}
              required
            />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-600">tipe</label>
            < input
            type='text'
              value={tipe}
               onChange={(e) => setTipe(e.target.value)}
                className="w-full border p-2 rounded"
            />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition mt-8">
        Save Buku
       </button>
        
       </form>
       
       </div>
    </div>
    </div>
  )
}

export default AddBuku