import React, { useEffect, useState } from "react";
import Header from "../Elements/Header/Header";
import "./Profile.css";
import profileImage from "../../assets/profile-picture.jpeg";

function Profile() {
  const [userInfo, setUserInfo] = useState("");
  const [followers, setFollowers] = useState("");
  const [following, setFollowing] = useState("");
  const [postsCount, setPostsCount] = useState("");

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

  const getUserfollowers = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/followers/count",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );

      if (!response.ok) {
        throw new error(
          `Failed to fetch user data. Status: ${response.status}`
        );
      }
      const data = await response.json();
      setFollowers(data.followers_count);
      console.log("followers count", data.followers_count);
    } catch (error) {
      console.log("Error fetching data:", error.message);
    }
  };

  const getUserFollowing = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/following/count",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )},`,
          },
        }
      );

      if (!response.ok) {
        throw new error(
          `Failed to fetch user data. Status: ${response.status}`
        );
      }
      const data = await response.json();
      setFollowing(data.following_count);
      console.log("following count: ", data.following_count);
    } catch (error) {
      console.log("Error fetching data:", error.message);
    }
  };

  const getPostCount = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/posts/count", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      if (!response.ok) {
        throw new error(
          `Failed to fetch posts count. Status: ${response.status}`
        );
      }
      const data = await response.json();
      setPostsCount(data.post_count);
      console.log("posts count:", data.post_count);
    } catch (error) {
      console.log("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    getUserInfo();
    getUserfollowers();
    getUserFollowing();
    getPostCount();
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
              <b>{postsCount}</b> posts
            </p>
            <p>
              <b>{followers}</b> followers
            </p>
            <p>
              <b>{following}</b> following
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
