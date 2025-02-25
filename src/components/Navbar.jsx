import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => { 
    return(
        <div className="flex justify-between items-center p-4 font-sans bg-[#134074] text-white">
            <Link to={"/user/dashboard"}><h1 className="text-3xl font-bold px-14">LIBRO</h1></Link>
            <div className="relative w-1/3">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 text-black bg-white border rounded-2xl focus:outline-none  focus:ring-white"
        />
        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white">
          <img
            src="https://img.icons8.com/?size=100&id=59878&format=png&color=000000"
            alt="Search"
            className="w-5 h-5"
          />
        </button>
      </div>
            <ul className="list-none flex gap-9 px-10">
                <li className="size-9">
                    <Link to="/user/dashboard/keranjang"> <img src="https://img.icons8.com/?size=100&id=15893&format=png&color=ffffff" alt="" /> </Link>
                </li>
                <li className="size-8">
                    <Link to="/user/getMe"> <img src="https://img.icons8.com/?size=100&id=eJvXJFMTOzvJ&format=png&color=ffffff" alt="" /> </Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar;