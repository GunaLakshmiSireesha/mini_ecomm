import React, { useState } from "react";
import api from "../api/axiosConfig";
import { Link, useNavigate } from "react-router-dom";

export default function Register({ setUser }){
  const [form,setForm]=useState({username:'',email:'',password:'',role:'USER'});
  const [msg,setMsg]=useState(null);
  const nav=useNavigate();

  const handleSubmit=async e=>{
    e.preventDefault();
    try{
      const res = await api.post("/api/auth/register", form);
      setMsg(res.data.message);
      if(res.data.success){
        // go to login
        nav("/login");
      }
    }catch(err){
      setMsg(err.response?.data?.message || "Registration failed");
    }
  }

  return (
    <div style={{maxWidth:420, margin:'2rem auto'}}>
      <h2>Register</h2>
      {msg && <div>{msg}</div>}
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" value={form.username} onChange={e=>setForm({...form, username:e.target.value})} required/>
        <br/>
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required/>
        <br/>
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required/>
        <br/>
        <select value={form.role} onChange={e=>setForm({...form, role:e.target.value})}>
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>
        <br/>
        <button type="submit">Register</button>
      </form>
      <p>Already have account? <Link to="/login">Login</Link></p>
    </div>
  )
}




