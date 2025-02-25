import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";

const BukuDetail = () => {
  const { id } = useParams(); // Ambil ID dari URL
  const [buku, setBuku] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBuku = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/buku/${id}`);
        setBuku(response.data);
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBuku();
  }, [id]); // Dependency array harus berisi 'id'

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (!buku) return <p className="text-center text-red-500">Buku tidak ditemukan</p>;

  return (
    <div className="bg-[#eef4ed] pb-24">
      <Navbar/>
    <div className="flex flex-col md:flex-row items-center gap-20 p-6 ml-40">
      {/* Gambar Buku */}
      <img src={buku.gambar} alt={buku.judul} className="w-85 h-100 rounded-lg shadow-md" />

      {/* Detail Buku */}
      <div className="max-w-lg">
        <h1 className="text-3xl font-bold">{buku.judul}</h1>
        <p className="text-gray-500">By {buku.penulis}</p>
        
        {/* Harga */}
        <div className="mt-2 flex items-center gap-3">
          <span className="text-xl font-semibold text-red-600">Rp {buku.harga.toLocaleString()}</span>
          {buku.tipe === "baru" && <span className="bg-red-200 text-red-600 text-sm px-2 py-1 rounded">Baru</span>}
        </div>

        {/* Deskripsi */}
        <p className="mt-4 text-gray-700">{buku.deskripsi}</p>

        {/* Genre */}
        <div className="mt-3 flex gap-2">
          {buku.genre.map((genre, index) => (
            <span key={index} className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm">
              {genre}
            </span>
          ))}
        </div>

        {/* Stok */}
        <p className="mt-3 text-green-600 font-semibold">Stok: {buku.stok} pcs</p>

        {/* Tombol Beli */}
       <Link to={`/user/dashboard/buku/${id}/keranjang`}> <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Beli Sekarang
        </button> </Link>
      </div>
    </div>
    </div>
  );
};

export default BukuDetail;
