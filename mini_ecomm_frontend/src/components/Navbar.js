import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

export default function Navbar({ user, setUser }){
  const nav = useNavigate();

  useEffect(()=>{
    const u = localStorage.getItem("user");
    if(u) setUser(JSON.parse(u));
  },[setUser]);

  const handleLogout = async ()=>{
    try{ await api.post("/api/auth/logout", {}); } catch(e){ }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    nav("/login");
  }

  return (
    <nav style={{display:'flex', justifyContent:'space-between', padding:12, background:'#1e88e5', color:'white'}}>
      <div><Link to="/" style={{color:'white', fontWeight:700}}>E-Store 🛒</Link></div>
      <div>
        {user ? (
          <>
            {user.role==='ADMIN' && <Link to="/add-product" style={{marginRight:12, color:'white'}}>Add Product</Link>}
            <Link to="/cart" style={{marginRight:12, color:'white'}}>Cart</Link>
            <span style={{marginRight:12}}>Hi, {user.username} ({user.role})</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{marginRight:12, color:'white'}}>Login</Link>
            <Link to="/register" style={{color:'white'}}>Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}
