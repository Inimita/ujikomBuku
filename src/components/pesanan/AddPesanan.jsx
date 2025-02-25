import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";

const AddPesanan = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState([]);
    const [keranjang, setKeranjang] = useState([]);
    const [totalHarga, setTotalHarga] = useState(0);
    const [tanggalPemesanan, setTanggalPemesanan] = useState(new Date().toISOString().slice(0,10));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Ambil token dari localStorage
    useEffect(() => {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        if (!token) {
            setError("Anda belum login. Silakan login terlebih dahulu.");
            setLoading(false);
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
            setLoading(false);
        });
    }, []);

    const fetchKeranjang = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:3000/keranjang/user/${userId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            if (response.data.length > 0) {
                setKeranjang(response.data);
                hitungTotalHarga(response.data);
            } else {
                setError("Keranjang kosong. Tambahkan item terlebih dahulu.");
            }
        } catch (error) {
            setError("Gagal mengambil data keranjang");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) {  // Cek apakah userId sudah tersedia sebelum fetch
            fetchKeranjang(userId);
        }
    }, [userId]); 
    

    const hitungTotalHarga = (items) => {
        const total = items.reduce((sum, item) => sum + (item.Buku.harga * item.jumlah_buku), 0);
        setTotalHarga(total);
    };

    const handlePesan = () => {
        if (!userId || keranjang.length === 0) {
            setError("Data tidak lengkap: User atau Keranjang tidak tersedia.");
            return;
        }

        const pesananData = {
            UserId: userId,
            KeranjangId: keranjang.map(item => item.id),
            tanggal_pemesanan: tanggalPemesanan,
        };

        axios.post("http://localhost:3000/pesanan/post", pesananData, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
            .then(() => {
                console.log("Pesanan berhasil dibuat");
                navigate("/user/dashboard/pesanan");
            })
            .catch((error) => {
                console.error("Gagal membuat pesanan:", error.response?.data || error.message);
                setError("Gagal membuat pesanan");
            });
    };

    if (loading) {
        return <p className="text-center text-gray-500">Memuat data pesanan...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="bg-[#eef4ed] pb-50">
            <Navbar />
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
                <h2 className="text-xl font-semibold mb-4">Pesanan</h2>
                {/* <p className="text-gray-700">Pesanan akan diproses dengan status: <strong>Menunggu Konfirmasi</strong></p> */}
                <p className="text-gray-700">Total Harga: <strong>Rp {totalHarga.toLocaleString()}</strong></p>
                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Detail Pesanan</h3>
                    {keranjang.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 p-2 border-b">
                            <img src={item.Buku?.gambar || "https://via.placeholder.com/150"} 
                            alt={item.Buku.judul || "Gambar Tidak Tersedia" } className="w-25 h-33 object-cover rounded-lg" />
                            <div>
                                <p className="font-medium">{item.Buku?.judul || "Judul Tidak Diketahui" }</p>
                                <p className="text-gray-700">Harga: Rp {item.Buku.harga.toLocaleString()}</p>
                                <p className="text-gray-700">Jumlah Buku: {item.jumlah_buku}</p>
                            </div>
                        </div>
                    ))}
                    <div className="">
                        <label >Tanggal Pemesanan</label>
                        <input type="date"
                          value={tanggalPemesanan} 
                          onChange={(e) => setTanggalPemesanan(e.target.value)
                          }
                        />
                    </div>
                </div>
                <Link to={"/user/dashboard/pembayaran"}><button onClick={handlePesan} 
                    className="w-full bg-[#0B2545] text-white py-2 px-4 rounded-lg hover:bg-[#134074] transition mt-4">
                    Buat Pesanan
                </button></Link>
            </div>
        </div>
    );
};

export default AddPesanan;
