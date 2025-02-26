import React from "react";
import "./Home.css"; // Updated import

const Card = ({ icon, title, description }) => {
  return (
    <div className="card-item">
      <div className="icon">{icon}</div>
      <h2>{title}</h2>
      <p>{description}</p>
      <button className="message-button">More Info</button>
    </div>
  );
};

export default Card;
