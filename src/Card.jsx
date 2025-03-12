import React from "react";
import "./Home.css";

const Card = ({ icon, title, description, link }) => {
  return (
    <div className="card-item">
      <div className="icon">{icon}</div>
      <h2>{title}</h2>
      <p>{description}</p>
      <button className="message-button" onClick={() => window.open(link, "_blank")}>
        More Info
      </button>
    </div>
  );
};

export default Card;
