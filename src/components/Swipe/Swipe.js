// src/components/Swipe/Swipe.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SwipeCard from "./SwipeCard";
import {
  fetchUsers,
  likeUser,
  dislikeUser,
} from "../../redux/slices/userSlice";
import "./Swipe.css";

const Swipe = () => {
  const dispatch = useDispatch();
  const { users, loading, error, matchMessage } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleSwipe = (direction, user) => {
    if (direction === "right") {
      dispatch(likeUser(user._id));
    } else if (direction === "left") {
      dispatch(dislikeUser(user._id));
    }
    // Pas besoin de gérer currentIndex manuellement
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const currentUser = users[0]; // Toujours prendre le premier utilisateur

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
