import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const GetUsers = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    throw new Error("Token tidak ditemukan, silakan login.");
                }

                const response = await fetch("http://localhost:3000/User", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json();
                console.log("All users:", data); // Debugging

                if (!response.ok) {
                    throw new Error(data.msg || "Gagal mendapatkan data user");
                }

                setUsers(data);
            } catch (err) {
                console.error("Error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="bg-gray-100">
             <Link to={"/admin/dashboard"}> 
               <img src="https://img.icons8.com/?size=100&id=39944&format=png&color=000000" alt="" 
               className="w-10 bg-gray-100 ml-25 mt-10"/>
               </Link>
        <div className="flex justify-center items-center h-screen bg-gray-100 -mt-70">
            <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center text-gray-700">All User</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                {loading ? (
                    <p className="text-center text-gray-500">Memuat data...</p>
                ) : users.length > 0 ? (
                    <table className="w-full mt-4 border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border p-2">ID</th>
                                <th className="border p-2">Nama</th>
                                <th className="border p-2">Email</th>
                                <th className="border p-2">Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="text-center">
                                    <td className="border p-2">{user.id}</td>
                                    <td className="border p-2">{user.nama}</td>
                                    <td className="border p-2">{user.email}</td>
                                    <td className="border p-2">{user.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center text-gray-500">Tidak ada data pengguna</p>
                )}
            </div>
        </div>
        </div>
    );
};

export default GetUsers;
