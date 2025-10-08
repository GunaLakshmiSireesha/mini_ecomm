E-Commerce Web Application:
A full-stack e-commerce platform built with Spring Boot (backend) and React (frontend).
It includes role-based authentication (Admin & User), JWT security, and RESTful APIs for managing users, products, and cart operations.

#*Features*#
 # Authentication & Authorization
  *User registration and login using JWT tokens
  *Role-based access control:
    -Admin: Can add and delete products
    -User: Can view products and add them to cart

# Product Management
  *Admin can manage product inventory:
   -Add new products (name, description, stock, price)
  *Products stored in MySQL database

# Shopping Cart
  *Users can view available products
  *Add products to cart
  *View items in cart with name, price, and quantity
  *Remove items or clear cart

# Frontend (React)
 *Built using React + React Router
 *Separate pages for:
  -Login / Register
  -Products (User)
  -Add Product (Admin)
  -Cart
 *Global state management using Context API

 # Backend (Spring Boot)
 *Spring Boot 3 with RESTful APIs
 *Spring Security + JWT for authentication
 *JPA + Hibernate + MySQL for persistence
 *Global CORS configuration for frontend integration

 Layer                   Technologies Used                         
 
Frontend       -    React, Axios, React Router, Context API   
Backend        -    Spring Boot, Spring Security, JWT, Lombok 
Database       -    MySQL                                     
Build Tools    -    Maven                                     
Testing Tool   -    Postman (API Testing)                     
