
import React from "react";

function Card({ value, suit, isPicked, onClick }) {
  return (
    <div
      className={`card ${isPicked ? "picked" : ""}`}
      onClick={onClick}
    >
      {value} {suit}
    </div>
  );
}

export default Card;
