import React, { useEffect, useState } from "react";
import "./Posts.css";
import UserProfile from "../../../assets/profile-picture.jpeg";
import { FaRegComment, FaHeart, FaRegHeart } from "react-icons/fa";

function Posts({ posts, handleToggleLike, handleAddComment, setComment }) {
  const [comments, setComments] = useState({});

  const getComment = async (postId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/get/comment/${postId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );

      if (!response.ok) {
        console.log("Error getting comments");
      }

      const data = await response.json();
      setComments((prevComments) => ({
        ...prevComments,
        [postId]: data.comments,
      }));
      console.log(data);
    } catch (error) {
      console.log("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    posts.forEach((post) => {
      getComment(post.id);
    });
  }, [posts]);

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
                {post.liked_by_user ? (
                  <FaHeart
                    className="interaction-btn is-liked"
                    onClick={() => {
                      handleToggleLike(post.id);
                    }}
                  />
                ) : (
                  <FaRegHeart
                    className="interaction-btn not-liked"
                    onClick={() => {
                      handleToggleLike(post.id);
                    }}
                  />
                )}
                <FaRegComment className="interaction-btn" />
              </div>
              <div className="post-likes-caption">
                <p>
                  <b>{post.likes.length} likes</b>
                </p>
                <p>
                  <b>{post.user.name}</b> {post.caption}
                </p>
              </div>

              <div className="all-comments">
                <h3>Comments:</h3>
                {comments[post.id] &&
                  comments[post.id].map((comment) => (
                    <div key={comment.id} className="comment">
                      <p>
                        <b>{comment.user.name}</b>: {comment.comment_text}
                      </p>
                    </div>
                  ))}
              </div>

              <div className="comment-section">
                <textarea
                  placeholder="Add a comment..."
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                ></textarea>
                <button onClick={() => handleAddComment(post.id)}>
                  submit
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Posts;
