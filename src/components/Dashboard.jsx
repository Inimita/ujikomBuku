import React from "react";
import BukuList from "./buku/BukuList";
import Navbar from "./Navbar";

const Dashboard = () => {
    return(
        <div className="bg-[#eef4ed]">
            <Navbar/>
            <BukuList/>
        </div>
    )
}

export default Dashboard;