import React, { useEffect, useState } from "react";
import axios from "../api/axiosConfig"; 
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"

export default function Products() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    navigate("/cart"); // go to cart page immediately
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
      {products.map((p) => (
        <div key={p.id} style={{ border: "1px solid #ccc", padding: 10 }}>
          <h3>Name:{p.name}</h3>
          <p>Description: {p.description}</p>
          <p>Stock: {p.stock != null ? p.stock : "Not available"}</p>
          <p>Price: ₹{p.price}</p>
          <button onClick={() => handleAddToCart(p)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
