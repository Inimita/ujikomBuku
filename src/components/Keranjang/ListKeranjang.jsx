import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ListKeranjang = ({ refresh }) => {
    const [keranjang, setKeranjang] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Ambil data keranjang dari backend
    const fetchKeranjang = () => {
        axios.get("http://localhost:3000/keranjang")
            .then(response => {
                setKeranjang(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError("Gagal mengambil data keranjang");
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchKeranjang();
    }, [refresh]);

    // Update jumlah buku di keranjang
    const updateJumlahBuku = (id, newJumlah) => {
        if (newJumlah < 1) return; // Tidak bisa kurang dari 1

        axios.put(`http://localhost:3000/keranjang/update/${id}`, { jumlah_buku: newJumlah })
            .then(() => {
                fetchKeranjang(); // Refresh daftar keranjang setelah update
            })
            .catch(() => {
                setError("Gagal memperbarui jumlah buku.");
            });
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/keranjang/${id}`)
            .then(() => {
                fetchKeranjang(); // Refresh list keranjang setelah dihapus
            })
            .catch(() => {
                setError("Gagal menghapus item dari keranjang.");
            });
    };

    if (loading) {
        return <p className="text-center text-gray-500">Memuat data keranjang...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="bg-[#eef4ed] w-full h-full pb-47">
            <div className="flex flex-row items-center w-full gap-6 pt-9">
                <Link to={"/user/dashboard"}>
                    <img src="https://img.icons8.com/?size=100&id=39944&format=png&color=000000" 
                         alt="" className="w-10 bg-[#eef4ed] ml-30"/>
                </Link> 
                <h2 className="text-xl font-semibold mb-4 pt-[15px]">Keranjang</h2>
            </div>

            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
                {keranjang.length === 0 ? (
                    <p className="text-center text-gray-500">Keranjang kosong</p>
                ) : (
                    <ul>
                        {keranjang.map((item) => (
                            <li key={item.id} className="mb-4 pb-3 flex items-center gap-6">
                                <img 
                                    src={item.Buku?.gambar || "https://via.placeholder.com/150"} 
                                    alt={item.Buku?.judul || "Gambar Tidak Tersedia"} 
                                    className="w-40 h-60 object-cover rounded-lg"
                                />
                                <div>
                                    <h3 className="text-lg font-bold">{item.Buku?.judul || "Judul Tidak Diketahui"}</h3>
                                    <div className="flex items-center gap-2 mt-2">
                                        <button 
                                            onClick={() => updateJumlahBuku(item.id, item.jumlah_buku - 1)}
                                            className="px-3 py-2 bg-gray-300 rounded-lg">-</button>
                                        <span className="text-lg font-medium">{item.jumlah_buku}</span>
                                        <button 
                                            onClick={() => updateJumlahBuku(item.id, item.jumlah_buku + 1)}
                                            className="px-3 py-2 bg-gray-300 rounded-lg">+</button>
                                    </div>
                                    <p className="text-gray-700 mt-2">Harga: Rp {item.Buku?.harga?.toLocaleString() || "Data tidak tersedia"}</p>
                                    <Link to={"/user/dashboard/pesanan"}>
                                        <button className="w-45 bg-[#134074] rounded-lg h-9 text-white mt-2">
                                            Pesan
                                        </button>
                                    </Link>
                                    <button onClick={() => handleDelete(item.id)} 
                                    className="w-45 rounded-lg h-9 hover:bg-red-400 mt-2">Hapus</button>
                                </div> 
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ListKeranjang;
