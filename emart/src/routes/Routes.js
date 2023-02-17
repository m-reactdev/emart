import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import AddProduct from "../screens/AddProduct";
import Cart from "../screens/Cart";
import Checkout from "../screens/Checkout";
import Home from "../screens/Home";
import Login from "../screens/Login";
import ProductDetail from "../screens/ProductDetail";
import Register from "../screens/Register";
import Shop from "../screens/Shop";
import Success from "../screens/Success";

const Navigator = () => {
  let authUser = useSelector(({ AuthState }) => {
    return AuthState.user;
  });

  console.log(authUser);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="product-detail/:id" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path={!authUser ? "/" : "checkout"} element={<Checkout />} />
          <Route path={!authUser ? "/" : "success"} element={<Success />} />
          <Route
            path={authUser?.role === "Customer" ? "/" : "add-product"}
            element={<AddProduct />}
          />
          <Route path={authUser ? "/" : "login"} element={<Login />} />
          <Route path={authUser ? "/" : "register"} element={<Register />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </Router>
      <ToastContainer />
    </>
  );
};

export default Navigator;
