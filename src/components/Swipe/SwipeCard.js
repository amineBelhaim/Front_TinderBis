// src/components/Swipe/SwipeCard.js
import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useDragControls } from "framer-motion";
import "./SwipeCard.css";

const SwipeCard = ({ user, onSwipe }) => {
  const controls = useAnimation();
  const dragControls = useDragControls();

  const handleDragEnd = (event, info) => {
    const threshold = 100; // Distance de swipe minimale pour déclencher l'action

    if (info.offset.x > threshold) {
      // Swiped Right
      controls.start({
        x: window.innerWidth,
        opacity: 0,
        transition: { duration: 0.3 },
      });
      onSwipe("right", user);
    } else if (info.offset.x < -threshold) {
      // Swiped Left
      controls.start({
        x: -window.innerWidth,
        opacity: 0,
        transition: { duration: 0.3 },
      });
      onSwipe("left", user);
    } else {
      // Retourner à la position initiale
      controls.start({ x: 0, opacity: 1, transition: { duration: 0.3 } });
    }
  };

  return (
    <motion.div
      className="swipe-card"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragControls={dragControls}
      onDragEnd={handleDragEnd}
      animate={controls}
      initial={{ x: 0, opacity: 1 }}
      whileTap={{ scale: 1.05 }}
    >
      <h3>
        {user.name}, {user.age}
      </h3>
      <p>{user.location}</p>
      <p>{user.bio}</p>
    </motion.div>
  );
};

export default SwipeCard;
