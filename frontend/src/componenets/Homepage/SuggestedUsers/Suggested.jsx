import React, { useState } from "react";
import "./Suggested.css";
import userProfile from "../../../assets/profile-picture.jpeg";

function Suggested() {
  const [users, setUsers] = useState([]);

  const toggleFollow = async (userId) => {
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
      }

      const data = await response.json();
      console.log(data);
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
        },
      });

      if (!response.ok) {
        console.log("Error getting all users. Status: ", response.status);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("Error getting all users:", error.message);
    }
  };

  useState(() => {
    getAllUsers();
  }, []);

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
