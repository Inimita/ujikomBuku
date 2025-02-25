import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const GetMe = () => {
    const [user, setUser] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getMe = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem("token");
                console.log("Token from LocalStorage:", token);


                if (!token) {
                    throw new Error("Token tidak ditemukan, silakan login.");
                }

                const response = await fetch("http://localhost:3000/me", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json();
                console.log("User data:", data);

                if (!response.ok) {
                    throw new Error(data.msg || "Gagal mendapatkan data user");
                }

                setUser(data);
            } catch (err) {
                console.error("Error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getMe();
    }, []);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setKeranjang([]); // Reset data keranjang
        navigate("/login");
    };
    

    return (
        <div className="bg-gray-100">
            
               <Link to={"/user/dashboard"}> 
               <img src="https://img.icons8.com/?size=100&id=39944&format=png&color=000000" alt="" 
               className="w-10 bg-gray-100 ml-50 pt-10"/>
               </Link>
            
        <div className="flex justify-center items-center h-110 bg-gray-100">
            <div className="w-full max-w-md bg-white p-12 rounded-lg shadow-md">
                <h2 className="text-3xl font-semibold text-center text-gray-700">User Profile</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                {loading ? (
                    <p className="text-center text-gray-500">Memuat data...</p>
                ) : user ? (
                    <div className="mt-4">
                        <p className="text-gray-600 text-xl pt-5"><strong>Nama:</strong> {user.nama}</p>
                        <p className="text-gray-600 pb-12 text-xl"><strong>Email:</strong> {user.email}</p>
                        <div className="">
                        <button
                className="w-full mt-4 bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
                onClick={handleLogout}
            >
                Logout
            </button>
                        </div>
                    </div>
                ) : (
                    <p className=" text-center text-red-500">Data tidak ditemukan</p>
                )}
            </div>
        </div>
        </div>
    );
};

export default GetMe;
