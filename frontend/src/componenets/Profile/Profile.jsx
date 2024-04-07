import React from "react";
import Header from "../Elements/Header/Header";
import "./Profile.css";
import profileImage from "../../assets/profile-picture.jpeg";

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
      <div className="personal-posts">test</div>
    </div>
  );
}

export default Profile;
