import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import AddProduct from "./pages/AddProduct";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { CartProvider } from "./context/CartContext";

function Protected({ user, roles, children }) {
  if (!user) return <div>Please login</div>;
  if (roles && !roles.includes(user.role)) return <div>Access denied</div>;
  return children;
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  return (
    <CartProvider>
      <Navbar user={user} setUser={setUser} />
      <div style={{ padding: 20 }}>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route
            path="/add-product"
            element={
              <Protected user={user} roles={["ADMIN"]}>
                <AddProduct />
              </Protected>
            }
          />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </CartProvider>
  );
}



