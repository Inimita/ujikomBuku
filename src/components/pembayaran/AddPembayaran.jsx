import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";

const AddPembayaran = ({ onAdd }) => {
    const { id: pesananId } = useParams(); // Ambil PesananId dari URL
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);
    const [metodePembayaran, setMetodePembayaran] = useState();
    const [statusPembayaran, setStatusPembayaran] = useState();
    const [tanggalPembayaran, setTanggalPembayaran] = useState(new Date().toISOString().slice(0, 10));
    const [error, setError] = useState(null);

    // Ambil token & userId dari backend
    useEffect(() => {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        if (!token) {
            setError("Anda belum login. Silakan login terlebih dahulu.");
            return;
        }

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
    

    const handleAdd = () => {
        if (!pesananId) {
            setError("Pesanan tidak valid.");
            return;
        }
    
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        if (!token) {
            setError("Anda belum login. Silakan login terlebih dahulu.");
            return;
        }
    
        axios.post("http://localhost:3000/pembayaran/post", {
            PesananId: pesananId,
            metode_pembayaran: metodePembayaran,
            status_pembayaran: statusPembayaran,
            tanggal_pembayaran: tanggalPembayaran
        }, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
            // Setelah pembayaran sukses, hapus isi keranjang
            return axios.delete(`http://localhost:3000/keranjang/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
        })
        .then(() => {
            if (onAdd) onAdd();
            navigate("/user/dashboard/pembayaran");
        })
        .catch(() => {
            setError("Gagal memproses pembayaran.");
        });
    };
    
    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="bg-[#eef4ed]">
            <Navbar />
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
                <h2 className="text-xl font-semibold mb-4">Tambah Pembayaran</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Metode Pembayaran</label>
                    <select 
                        value={metodePembayaran} 
                        onChange={(e) => setMetodePembayaran(e.target.value)}
                        className="w-full border p-2 rounded"
                    >
                        <option value="Transfer Bank">Transfer Bank</option>
                        <option value="E-Wallet">E-Wallet</option>
                        <option value="Kartu Kredit">Kartu Kredit</option>
                        <option value="Cash">Cash</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Tanggal Pembayaran</label>
                    <input 
                        type="date" 
                        value={tanggalPembayaran} 
                        onChange={(e) => setTanggalPembayaran(e.target.value)} 
                        className="w-full border p-2 rounded"
                    />
                </div>
           <Link to={"/user/dashboard"}>  <button onClick={handleAdd} 
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
                    Konfirmasi Pembayaran
                </button></Link>
            </div>
        </div>
    );
};

export default AddPembayaran;
