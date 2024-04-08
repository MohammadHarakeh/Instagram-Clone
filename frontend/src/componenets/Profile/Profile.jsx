import React, { useEffect, useState } from "react";
import Header from "../Elements/Header/Header";
import "./Profile.css";
import profileImage from "../../assets/profile-picture.jpeg";

function Profile() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    bio: "",
    profilePicture: "",
  });
  const [followers, setFollowers] = useState("");
  const [following, setFollowing] = useState("");
  const [postsCount, setPostsCount] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState();
  const [imageData, setImageData] = useState();

  const { name, email, bio } = userInfo;

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

  const updateUserInfo = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("bio", bio);
      formData.append("profile_picture", imageData);

      const response = await fetch("http://127.0.0.1:8000/api/update-user", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: formData,
      });
      if (!response.ok) {
        console.log("Failed to update user:", response.data.message);
      }
      console.log("User updated successfully");
      getUserInfo();
      setIsEditing(false);
    } catch (error) {
      console.log("Error updating user:", error.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageData(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

  function editUser() {
    setIsEditing(true);
  }

  function closeEditUser() {
    setIsEditing(false);
  }

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
        {isEditing && <div className="blurred"></div>}
        {isEditing && (
          <div className="is-editing">
            {image && <img src={`${image}`} alt="User" />}
            <label htmlFor="choose-image" className="choose-image-label">
              Choose Image
            </label>
            <input
              className="image-input"
              id="choose-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <input
              placeholder="Name"
              value={name}
              onChange={(e) =>
                setUserInfo({ ...userInfo, name: e.target.value })
              }
            />
            <input
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
            />
            <input
              placeholder="Bio"
              value={bio}
              onChange={(e) =>
                setUserInfo({ ...userInfo, bio: e.target.value })
              }
            />
            <button onClick={updateUserInfo}>Save Changes</button>
            <button onClick={closeEditUser}>Cancel</button>
          </div>
        )}

        <div className="profile-image">
          <img src={profileImage}></img>
        </div>

        <div className="profile-container">
          <div className="profile-name-follow">
            <p>{userInfo ? userInfo.name : "Loading..."}</p>
            <button onClick={editUser}>Edit Profile</button>
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
