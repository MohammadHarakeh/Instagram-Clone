import React from "react";
import Header from "../Elements/Header/Header";
import "./Profile.css";
import profileImage from "../../assets/profile-picture.jpeg";

const getUserInfo = async () => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/get-user", {
      method: "GET",
      // body: JSON.stringify()
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status !== 200) {
      throw new Error(`Failed to fetch user data. Status: ${response.status}`);
    }
    const data = response.data;
    if (data) {
      setUser(data.user);
      setFirstName(data.user.first_name);
      setLastName(data.user.last_name);
      setEmail(data.user.email);
      setImage(data.user.profile_picture);
    } else {
      console.error("Empty response data");
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

function Profile() {
  return (
    <div>
      <Header></Header>

      <div className="profile-wrapper">
        <div className="profile-image">
          <img src={profileImage}></img>
        </div>

        <div className="profile-container">
          <div className="profile-name-follow">
            <p>name</p>
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
