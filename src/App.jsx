import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './components/Dashboard'
import BukuDetail from './components/buku/BukuDetail'
import Register from './components/login/Register'
import Login from './components/login/LogIn'
import AdminDashboard from './components/AdminDashboard'
import GetMe from './components/login/GetMe'
import GetUsers from './components/login/GetUsers'
import AddKeranjang from './components/keranjang/AddKeranjang'
import ListKeranjang from './components/Keranjang/ListKeranjang'
import AddPesanan from './components/pesanan/AddPesanan'
import AddPembayaran from './components/pembayaran/AddPembayaran'
import AddBuku from './components/buku/AddBuku'
import ListBukuAdmin from './components/buku/ListBukuAdmin'

function App() {

  return (
    <>
    <BrowserRouter basename="/ujikomBuku/">
      <Routes>
        <Route path="/" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/user/dashboard" element={<Dashboard/>} />
        <Route path="/admin/dashboard" element={<AdminDashboard/>} />
        <Route path="/user/getMe" element={<GetMe/>}/>
        <Route path="/admin/getUsers" element={<GetUsers/>}/>
        <Route path="/admin/dashboard/addBuku" element={<AddBuku/>}/>
        <Route path="admin/dashboard/buku" element={<ListBukuAdmin/>}/>
        <Route path="/user/dashboard/buku/:id" element={<BukuDetail/>} />
        <Route path="/user/dashboard/buku/:id/keranjang" element={<AddKeranjang/>}/>
        <Route path="/user/dashboard/keranjang" element={<ListKeranjang/>}/>
        <Route path="/user/dashboard/pesanan" element={<AddPesanan/>}/>
        <Route path="/user/dashboard/pembayaran" element={<AddPembayaran/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
