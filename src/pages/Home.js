// frontend/src/pages/Home.js
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Home = () => {
  const { token } = useSelector((state) => state.auth);

  return token ? <Navigate to="/swipe" /> : <Navigate to="/login" />;
};

export default Home;
