import React from "react";
import "./Suggested.css";
import userProfile from "../../../assets/profile-picture.jpeg";

function Suggested() {
  return (
    <div className="suggested-wrapper">
      <p className="suggested">Suggested for you</p>
      <div className="suggested-info">
        <img src={userProfile}></img>
        <p>Name</p>

        <div className="suggested-follow-btn">
          <button>Follow</button>
        </div>
      </div>
    </div>
  );
}

export default Suggested;
