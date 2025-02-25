import React from "react";
import { Link } from "react-router-dom";

const NavbarAdmin = () => { 
    return(
        <div className="flex justify-between items-center p-4 font-sans bg-[#134074] text-white">
            <Link to={"/admin/dashboard"}><h1 className="text-3xl font-bold px-14">Admin</h1></Link>
            <ul className="list-none flex gap-9 px-10">
                <li>
                    <Link to={"/admin/dashboard/buku"}>Buku</Link>
                </li>
                <li className="size-8">
                    <Link to="/admin/getUsers"> <img src="https://img.icons8.com/?size=100&id=eJvXJFMTOzvJ&format=png&color=ffffff" alt="" /> </Link>
                </li>
            </ul>
        </div>
    )
}

export default NavbarAdmin;