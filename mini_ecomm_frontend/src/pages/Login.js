import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [msg, setMsg] = useState(null);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", form);
      const { token, username, role, success, message } = res.data;

      if (!success) {
        setMsg(message || "Invalid credentials");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ username, role }));

      setUser({ username, role });
      setMsg("✅ Login successful!");
      nav("/");
    } catch (err) {
      setMsg("❌ Invalid credentials");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto" }}>
      <h2>Login</h2>
      {msg && <p>{msg}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}



