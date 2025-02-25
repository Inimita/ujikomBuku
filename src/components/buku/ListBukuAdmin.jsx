import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavbarAdmin from '../NavbarAdmin';

const ListBukuAdmin = () => {
    const [buku, setBuku] = useState([])
    const [filteredBuku, setFilteredBuku] = useState([]);
        const [genre, setGenre] = useState("");
    
        useEffect(() => {
            getBuku();
        }, []);

    const getBuku = async () =>{
        try {
            const response = await axios.get("http://localhost:3000/buku")
        setBuku(response.data)
        console.log(response.data)
        } catch (error) {
            console.log(error)

        }
    }

    const deleteBuku = async (id) => {
        try {
          await axios.delete(`http://localhost:3000/buku/delete/${id}`);
          getBuku();
        } catch (error) {
          console.log(error);
        }
      };

        const filterBuku = (selectedGenre) => {
            setGenre(selectedGenre);
            if (selectedGenre === "") {
                setFilteredBuku(buku); // Jika tidak ada filter, tampilkan semua
            } else {
                setFilteredBuku(buku.filter(b => b.genre.includes(selectedGenre)));
            }
        };

  return (
    <div className="">
        <NavbarAdmin/>
    <div className="container mx-auto px-4 pt-10 bg-[#eef4ed]">
        <div className="mb-3 pl-6 mt-15">
                <label className="text-gray-700 font-semibold">Filter Genre:</label>
                <select 
                    className="ml-2 border px-2 py-1 rounded"
                    value={genre}
                    onChange={(e) => filterBuku(e.target.value)}
                >
                    <option value="">Semua</option>
                    <option value="Fiksi">Fiksi</option>
                    <option value="Fantasi">Fantasi</option>
                    <option value="Sejarah">Sejarah</option>
                    <option value="Misteri">Misteri</option>
                    <option value="Sastra">Sastra</option>
                    <option value="Filosofis">Filosofis</option>
                    <option value="Psikologis">Psikologis</option>
                    <option value="Romantis">Romansa</option>
                    <option value="Pengembangan Diri">Pengembangan Diri</option>
                </select>
            </div>

            <div className="pb-10">
            <h2 className="text-left text-2xl font-bold mb-3 pl-6">DAFTAR BUKU</h2>
            <div className="w-full px-[1px] bg-black py-[1px] opacity-40 ml-[24px] mb-5"></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mr-18">
                {filteredBuku.map((buku, index) => (
                    <div key={index}>
                        <img 
                            src={buku.gambar} 
                            alt={buku.judul}
                            className="w-38 h-48 object-cover mx-auto rounded-md transition delay-180 duration-150 ease-in-out hover:-translate-y-1 hover:scale-110"
                        />
                        <h3 className="mt-5 font-semibold pl-1">{buku.judul}</h3>
                        <p className="text-sm text-gray-600 pl-1">{buku.penulis}</p>
                        <p className="text-gray-500 text-sm pl-1">{buku.harga}</p>
                        <button
                    onClick={() => deleteBuku(buku.id)}
                    className="w-15 mt-2 text-center rounded-lg bg-red-700 text-white  py-2 items-center gap-12">Delete</button>  
                    </div> 
                ))}
            </div>
        </div>
        <div className="pl-4">
        <Link to={"/admin/dashboard/addBuku"}>
   
   <button  className=" w-30 mt-4 text-center bg-[#0B2545] text-white py-2 rounded-md hover:bg-[#134074] transition">
       tambah</button>
   </Link>
        </div>
        
    </div>
    
    </div>
  )
}

export default ListBukuAdmin