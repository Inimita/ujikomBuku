import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
const Register = () => {
    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
    
        try {
            const response = await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nama, email, password }), // Tidak perlu mengirim role
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.msg || "Registration failed");
            }
    
            alert("Akun berhasil dibuat!");
            navigate("/login");
        } catch (err) {
            setError(err.message);
        }
    };
    
    

    return (
        <div className="flex justify-center items-center h-screen bg-[#8da9c4]">
            <div className="w-full max-w-md bg-[#eef4ed] p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center text-gray-700 font-poppins">Register</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleRegister} className="mt-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Nama</label>
                        <input
                            type="text"
                            className="w-full p-2 mt-1 border rounded-md"
                            placeholder="Masukkan Nama"
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-600">Email</label>
                        <input
                            type="email"
                            className="w-full p-2 mt-1 border rounded-md"
                            placeholder="Masukkan Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-600">Password</label>
                        <input
                            type="password"
                            className="w-full p-2 mt-1 border rounded-md"
                            placeholder="Masukkan Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                    >
                        Register
                    </button>
                </form>
                <p className="mt-4 text-sm text-center">
                    Sudah punya akun?
                    <Link to="/login" className="text-blue-500">Login</Link>
                </p>
            </div>
        </div>
    );
};
3
export default Register;
