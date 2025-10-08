import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    stock: '',
    price: ''
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // JWT saved at login

    try {
      const res = await axios.post("http://localhost:8080/api/products", product, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      alert("✅ Product added successfully!");
      console.log(res.data);

    } catch (err) {
      console.error("Add product error:", err);
      alert("❌ Failed to add product");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Product name" onChange={handleChange} />
      <input name="description" placeholder="Description" onChange={handleChange} />
      <input name="stock" placeholder="Stock" onChange={handleChange} />
      <input name="price" placeholder="Price" onChange={handleChange} />
      <button type="submit">Add Product</button>
    </form>
  );
}





