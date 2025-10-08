import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { CartProvider } from './context/CartContext'; // 👈 Import the Cart context

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <CartProvider> {/* 👈 Wrap your app in CartProvider */}
      <App />
    </CartProvider>
  </BrowserRouter>
);

