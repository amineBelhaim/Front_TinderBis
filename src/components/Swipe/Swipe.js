// src/components/Swipe/Swipe.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SwipeCard from "./SwipeCard";
import {
  fetchUsers,
  likeUser,
  dislikeUser,
} from "../../redux/slices/userSlice";
import "./Swipe.css"; // Assurez-vous que ce fichier existe dans le même dossier

const Swipe = () => {
  const dispatch = useDispatch();
  const { users, loading, error, matchMessage } = useSelector(
    (state) => state.user
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleSwipe = (direction, user) => {
    if (direction === "right") {
      dispatch(likeUser(user._id));
    } else if (direction === "left") {
      dispatch(dislikeUser(user._id));
    }
    setCurrentIndex((prev) => prev + 1);
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const currentUser = users[currentIndex];

  return (
    <div className="swipe-container">
      <h2>Swipe</h2>
      {matchMessage && <p>{matchMessage}</p>}
      <div className="card-container">
        {currentUser ? (
          <SwipeCard user={currentUser} onSwipe={handleSwipe} />
        ) : (
          <p>Aucun utilisateur à afficher.</p>
        )}
      </div>
    </div>
  );
};

export default Swipe;
