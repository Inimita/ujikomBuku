import { useNavigate } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin";

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div className="">
            <NavbarAdmin/>
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-3xl font-bold text-gray-700">Admin Dashboard</h1>
            <p className="mt-2 text-gray-600">Selamat datang, Admin!</p>
            <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
        </div>
    );
};

export default AdminDashboard;
