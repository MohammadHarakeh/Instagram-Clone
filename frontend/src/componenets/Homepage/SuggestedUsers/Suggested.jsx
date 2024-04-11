import React, { useState, useEffect } from "react";
import "./Suggested.css";
import userProfile from "../../../assets/profile-picture.jpeg";

function Suggested() {
  const [users, setUsers] = useState([]);

  const toggleFollow = async (userId, isFollowing) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/toggleFollow/${userId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );

      if (!response.ok) {
        console.log(`Error following user. Status: ${response.status}`);
        return;
      }

      const updatedUsers = users.map((user) =>
        user.id === userId ? { ...user, isFollowing: !isFollowing } : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.log("Error toggling follow:", error.message);
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/get-all-users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });

      if (!response.ok) {
        console.error("Error getting all users. Status: ", response.status);
        return;
      }

      const data = await response.json();
      setUsers(data.users);
      console.log(data);
    } catch (error) {
      console.error("Error getting all users:", error.message);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="suggested-wrapper">
      <p className="suggested">Suggested for you</p>
      {users.map((user) => (
        <div key={user.id} className="suggested-info">
          <img
            src={`http://127.0.0.1:8000/profile_pictures/${user.profile_picture}`}
            alt="User Profile"
          />
          <p>{user.name}</p>
          <div className="suggested-follow-btn">
            <button onClick={() => toggleFollow(user.id, user.isFollowing)}>
              {user.isFollowing ? "Unfollow" : "Follow"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Suggested;
