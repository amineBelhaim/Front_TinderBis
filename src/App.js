// frontend/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Home from "./pages/Home";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import SwipePage from "./pages/SwipePage";
import MessagesPage from "./pages/MessagesPage";
import ProfilePage from "./pages/ProfilePage";
import MatchsPage from "./pages/MatchsPage"; // Importer la nouvelle page
import { useSelector } from "react-redux";

function App() {
  const { token } = useSelector((state) => state.auth);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/swipe" element={token ? <SwipePage /> : <LoginPage />} />
        <Route
          path="/messages"
          element={token ? <MessagesPage /> : <LoginPage />}
        />
        <Route
          path="/profile"
          element={token ? <ProfilePage /> : <LoginPage />}
        />
        <Route
          path="/matchs"
          element={token ? <MatchsPage /> : <LoginPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
