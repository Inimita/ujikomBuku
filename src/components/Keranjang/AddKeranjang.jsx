import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";

const AddKeranjang = ({ onAdd }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [jumlahBuku, setJumlahBuku] = useState(1);
    const [userId, setUserId] = useState(null);
    const [buku, setBuku] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Ambil token dari localStorage
    useEffect(() => {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        if (!token) {
            setError("Anda belum login. Silakan login terlebih dahulu.");
            return;
        }

        // Ambil userId dari backend menggunakan token
        axios.get("http://localhost:3000/me", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            setUserId(response.data.userId);
        })
        .catch(() => {
            setError("Gagal mengambil data user. Silakan login ulang.");
        });
    }, []);

    // Ambil data buku berdasarkan ID dari API
    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:3000/buku/${id}`)
                .then(response => {
                    setBuku(response.data);
                    setLoading(false);
                })
                .catch(() => {
                    setError("Gagal mengambil data buku");
                    setLoading(false);
                });
        }
    }, [id]);

    const handleIncrease = () => setJumlahBuku(prev => prev + 1);
    const handleDecrease = () => setJumlahBuku(prev => (prev > 1 ? prev - 1 : 1));

    const handleAdd = () => {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        if (!token) {
            setError("Anda belum login. Silakan login terlebih dahulu.");
            return;
        }

        if (!buku || !buku.id) {
            setError("Data tidak lengkap: Buku tidak tersedia.");
            return;
        }

        axios.post("http://localhost:3000/keranjang/post", {
            BukuId: buku.id,
            jumlah_buku: jumlahBuku
        }, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
            if (onAdd) onAdd();
            navigate("/user/dashboard/keranjang");
        })
        .catch((error) => {
            setError("Gagal menambahkan ke keranjang");
        });
    };

    if (loading) {
        return <p className="text-center text-gray-500">Memuat data buku...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="bg-[#eef4ed] ">
            <Navbar/>
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
                <h2 className="text-xl font-semibold mb-4">Tambah ke Keranjang</h2>
                <div className="mb-4 flex flex-col items-center">
                    <img 
                        src={buku?.gambar || "/default-book.jpg"} 
                        alt={buku?.judul || "Buku"} 
                        className="w-32 h-40 object-cover rounded-lg" 
                    />
                    <h3 className="text-lg font-bold mt-2">{buku?.judul || "Nama Buku"}</h3>
                    <p className="text-gray-700">Harga: Rp {buku?.harga?.toLocaleString() || "0"}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Jumlah Buku</label>
                    <div className="flex items-center gap-2">
                        <button onClick={handleDecrease} className="px-3 py-2 bg-gray-300 rounded-lg">-</button>
                        <span className="text-lg font-medium">{jumlahBuku}</span>
                        <button onClick={handleIncrease} className="px-3 py-2 bg-gray-300 rounded-lg">+</button>
                    </div>
                </div>
                <Link to={"/user/dashboard/keranjang"}><button onClick={handleAdd} 
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
                    Tambah ke Keranjang
                </button> </Link>
            </div>
        </div>
    );
};

export default AddKeranjang;
