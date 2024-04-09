import React from "react";
import "./Posts.css";
import photo1 from "../../../assets/photo1.jpg";
import photo2 from "../../../assets/photo2.jpg";
import photo3 from "../../../assets/photo3.jpg";
import UserProfile from "../../../assets/profile-picture.jpeg";
import { CiHeart } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";

function Posts() {
  return (
    <div className="posts-wrapper">
      <div className="posts-card">
        <div className="user-post-info">
          <img src={UserProfile}></img>
          <p>
            <b>User Name</b>
          </p>
        </div>

        <div className="post-container">
          <img src={photo1} alt="Photo 1" />

          <div className="user-interaction-section">
            <CiHeart className="interaction-btn" />
            <FaRegComment className="interaction-btn" />
          </div>

          <div className="post-likes-caption">
            <p>
              <b>2,037 likes</b>
            </p>
            <p>
              <b>User Name</b> This is a test caption
            </p>
          </div>

          <div className="comment-section">
            <textarea placeholder="Add a comment..."></textarea>
          </div>
        </div>
      </div>

      <div className="posts-card">
        <div className="user-post-info">
          <img src={UserProfile}></img>
          <p>
            <b>User Name</b>
          </p>
        </div>

        <div className="post-container">
          <img src={photo2} alt="Photo 2" />

          <div className="user-interaction-section">
            <CiHeart className="interaction-btn" />
            <FaRegComment className="interaction-btn" />
          </div>

          <div className="post-likes-caption">
            <p>
              <b>2,037 likes</b>
            </p>
            <p>
              <b>User Name</b> This is a test caption
            </p>
          </div>

          <div className="comment-section">
            <textarea placeholder="Add a comment..."></textarea>
          </div>
        </div>
      </div>

      <div className="posts-card">
        <div className="user-post-info">
          <img src={UserProfile}></img>
          <p>
            <b>User Name</b>
          </p>
        </div>

        <div className="post-container">
          <img src={photo3} alt="Photo 3" />

          <div className="user-interaction-section">
            <CiHeart className="interaction-btn" />
            <FaRegComment className="interaction-btn" />
          </div>

          <div className="post-likes-caption">
            <p>
              <b>2,037 likes</b>
            </p>
            <p>
              <b>User Name</b> This is a test caption
            </p>
          </div>

          <div className="comment-section">
            <textarea placeholder="Add a comment..."></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
