import React, { useEffect, useState } from "react";
import Header from "../Elements/Header/Header";
import "./Profile.css";
import profileImage from "../../assets/profile-picture.jpeg";

function Profile() {
  const [userInfo, setUserInfo] = useState(null);

  const getUserInfo = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/get-user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(
          `Failed to fetch user data. Status: ${response.status}`
        );
      }
      const data = await response.json();
      setUserInfo(data.user);
      console.log(data.user);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div>
      <Header></Header>

      <div className="profile-wrapper">
        <div className="profile-image">
          <img src={profileImage}></img>
        </div>

        <div className="profile-container">
          <div className="profile-name-follow">
            <p>{userInfo ? userInfo.name : "Loading..."}</p>
            <button>Edit Profile</button>
          </div>

          <div className="personal-counters">
            <p>
              <b>10</b> posts
            </p>
            <p>
              <b>500</b> followers
            </p>
            <p>
              <b>32</b> following
            </p>
          </div>

          <div className="profile-bio">
            <p>Enter your bio here</p>
          </div>
        </div>
      </div>
      <div className="personal-posts">
        <img src={profileImage}></img>
        <img src={profileImage}></img>
        <img src={profileImage}></img>
        <img src={profileImage}></img>
        <img src={profileImage}></img>
      </div>
    </div>
  );
}

export default Profile;
