import React from "react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  if (cart.length === 0)
    return <h3 style={{ textAlign: "center" }}>🛒 Your cart is empty</h3>;

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div style={{ padding: 20 }}>
      <h2>Your Cart</h2>
      {cart.map((item) => (
        <div key={item.id} style={{ marginBottom: 10, borderBottom: "1px solid #ccc" }}>
          <h4>{item.name}</h4>
          <p>Quantity: {item.qty}</p>
          <p>Price: ₹{item.price * item.qty}</p>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
      <h3>Total: ₹{total}</h3>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
}

