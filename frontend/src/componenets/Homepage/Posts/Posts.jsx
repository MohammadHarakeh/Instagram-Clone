import React from "react";
import "./Posts.css";
import UserProfile from "../../../assets/profile-picture.jpeg";
import { CiHeart } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";

function Posts({
  posts,
  caption,
  handleCaptionChange,
  handleImageChange,
  createPost,
  imagePreview,
}) {
  return (
    <div className="posts-wrapper">
      {posts &&
        posts.map((post) => (
          <div className="posts-card" key={post.id}>
            <div className="user-post-info">
              <img
                src={`http://127.0.0.1:8000/profile_pictures/${post.user.profile_picture}`}
                alt="User Profile"
              ></img>
              <p>
                <b>{post.user.name}</b>
              </p>
            </div>

            <div className="post-container">
              <img
                src={`http://127.0.0.1:8000/post_images/${post.image}`}
                alt={`Photo ${post.id + 1}`}
              />
              <div className="user-interaction-section">
                <CiHeart className="interaction-btn" />
                <FaRegComment className="interaction-btn" />
              </div>
              <div className="post-likes-caption">
                <p>
                  <b>{post.likes} likes</b>
                </p>
                <p>
                  <b>{post.user.name}</b> {post.caption}
                </p>
              </div>
              <div className="comment-section">
                <textarea placeholder="Add a comment..."></textarea>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Posts;
