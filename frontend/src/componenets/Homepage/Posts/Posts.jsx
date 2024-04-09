import React from "react";
import "./Posts.css";
import photo1 from "../../../assets/photo1.jpg";
import photo2 from "../../../assets/photo2.jpg";
import photo3 from "../../../assets/photo3.jpg";
import UserProfile from "../../../assets/profile-picture.jpeg";

function Posts() {
  return (
    <div className="posts-wrapper">
      <div className="posts-card">
        <div className="user-post-info">
          <img src={UserProfile}></img>
          <p>User Name</p>
        </div>

        <img src={photo1} alt="Photo 1" />
      </div>

      <div className="posts-card">
        <img src={photo2} alt="Photo 2" />
      </div>

      <div className="posts-card">
        <img src={photo3} alt="Photo 3" />
      </div>
    </div>
  );
}

export default Posts;
