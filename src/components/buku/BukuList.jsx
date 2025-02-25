import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BukuList = () => {
    const [buku, setBuku] = useState([]); // Semua buku
    const [bukuBaru, setBukuBaru] = useState([]); // Buku Baru (Tidak Terfilter)
    const [bukuLaris, setBukuLaris] = useState([])
    const [filteredBuku, setFilteredBuku] = useState([]); // Buku Terfilter
    const [genre, setGenre] = useState("");

    useEffect(() => {
        getBuku();
    }, []);

    const getBuku = async () => {
        try {
            const response = await axios.get("http://localhost:3000/buku");
            setBuku(response.data);

            // Filter otomatis berdasarkan tipe dari database
            setBukuBaru(response.data.filter(b => b.tipe === "baru"));  // Buku Baru
            setBukuLaris(response.data.filter(l => l.tipe === "laris"));
            setFilteredBuku(response.data); // Default: Semua buku
        } catch (error) {
            console.error("Error fetching books:", error);
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
        <div className="container mx-auto px-4 pt-10 bg-[#eef4ed]">
            {/* 🔹 BUKU BARU (Tidak Terfilter) */}
            <h2 className="text-left text-2xl font-bold mb-1 pl-6">BUKU BARU</h2>
            <div className="w-[1133px] px-[1px] bg-black py-[1px] opacity-40 ml-[27px]"></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mr-18 pt-4">
                {bukuBaru.map((buku, index) => (
                    <div key={index}>
                       <Link to={`buku/${buku.id}`}> <img 
                            src={buku.gambar} 
                            alt={buku.judul}
                            className="w-38 h-48 object-cover mx-auto rounded-md transition delay-180 duration-150 ease-in-out hover:-translate-y-1 hover:scale-110 "
                        />
                        <h3 className="mt-5 font-semibold pl-[16px]">{buku.judul}</h3>
                        <p className="text-sm text-gray-600 pl-[16px]">{buku.penulis}</p>
                        <p className="text-gray-500 text-sm pl-[16px]">{buku.harga}</p>
                        </Link>
                    </div>
                ))}
            </div>
                {/* TERLARIS */}
            <div className="container mx-auto px-4 pt-20">
        <h2 className="text-left text-2xl font-bold mb-2 pl-2">BEST SELLER</h2>
        <div className="w-[1120px] px-[1px] bg-black py-[1px] opacity-40 ml-[10px] mb-5"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mr-18">
            {bukuLaris.map((buku, index) => (
                <div key={index}>
                    <Link to={`buku/${buku.id}`}><img 
                    src={buku.gambar} 
                    alt={buku.judul}
                    className="w-38 h-48 object-cover mx-auto rounded-md transition delay-180 duration-150 ease-in-out hover:-translate-y-1 hover:scale-110"/>
                    <h3 className="mt-5 font-semibold pl-[16px]">{buku.judul}</h3>
                    <p className="text-sm text-gray-600 pl-[16px]">{buku.penulis}</p>
                    <p className=" text-gray-500 text-sm pl-[16px]">{buku.harga}</p>
                    </Link>
                </div>
            ))}
        </div>

            {/* 🔹 Dropdown Filter Genre */}
            <div className="mb-3 pl-6 mt-15">
                <label className="text-gray-700 font-semibold">Filter Genre:</label>
                <select 
                    className="ml-2 border px-2 py-1 rounded"
                    value={genre}
                    onChange={(e) => filterBuku(e.target.value)}
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

            {/* 🔹 SEMUA BUKU (Terfilter) */}
            <div className="pb-10">
            <h2 className="text-left text-2xl font-bold mb-3 pl-6">DAFTAR BUKU</h2>
            <div className="w-[1106px] px-[1px] bg-black py-[1px] opacity-40 ml-[25px] mb-5"></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mr-18">
                {filteredBuku.map((buku, index) => (
                    <div key={index}>
                        <Link  to={`buku/${buku.id}`}><img 
                            src={buku.gambar} 
                            alt={buku.judul}
                            className="w-38 h-48 object-cover mx-auto rounded-md transition delay-180 duration-150 ease-in-out hover:-translate-y-1 hover:scale-110"
                        />
                        <h3 className="mt-5 font-semibold pl-4">{buku.judul}</h3>
                        <p className="text-sm text-gray-600 pl-4">{buku.penulis}</p>
                        <p className="text-gray-500 text-sm pl-4">{buku.harga}</p>
                        </Link>
                    </div>
                ))}
            </div>
            </div>
        </div>
        </div>
    );
};

export default BukuList;
