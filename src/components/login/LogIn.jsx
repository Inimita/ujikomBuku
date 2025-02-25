import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
    
        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
            console.log("Response dari backend:", data); // Debugging
    
            if (!response.ok) {
                throw new Error(data.msg || "Login failed");
            }
    
            if (!data.user) {
                throw new Error("User data tidak ditemukan!");
            }
    
            console.log("Role:", data.user.role);
    
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.user.role);
    
            if (data.user.role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/user/dashboard");
            }
        } catch (err) {
            console.error("Error login:", err);
            setError(err.message);
        }
    };
    
    

    return (
        <div className="flex justify-center items-center h-screen bg-[#8da9c4]">
            <div className="w-full max-w-md bg-[#eef4ed] p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center text-gray-700">Login</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleLogin} className="mt-4">
                    <div>
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
                        Login
                    </button>
                </form>
                <p className="mt-4 text-sm text-center">
                    Belum punya akun? 
                    <Link to="/" className="text-blue-500">Register</Link>

                </p>
            </div>
        </div>
    );
};

export default Login;
