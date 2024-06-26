import React, { useEffect, useState } from "react";
import Header from "../Elements/Header/Header";
import "./Profile.css";
import profileImage from "../../assets/profile-picture.jpeg";
import { ToastContainer, toast } from "react-toastify";

function Profile() {
  const [userInfo, setUserInfo] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [followers, setFollowers] = useState("");
  const [following, setFollowing] = useState("");
  const [postsCount, setPostsCount] = useState("");
  const [isEditingProfile, setIsEditingProfile] = useState(false); // Renamed
  const [image, setImage] = useState();
  const [imageData, setImageData] = useState();
  const [posts, setPosts] = useState([]);

  const getUserInfo = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/get-user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      if (!response.ok) {
        console.log(`Failed to fetch user data. Status: ${response.status}`);
      }
      const data = await response.json();
      setUserInfo(data.user);
      setName(data.user.name);
      setEmail(data.user.email);
      setBio(data.user.bio);
      setImage(data.user.profile_picture);
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
        throw new Error(
          `Failed to fetch user data. Status: ${response.status}`
        );
      }
      const data = await response.json();
      setFollowers(data.followers_count);
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
        throw new Error(
          `Failed to fetch user data. Status: ${response.status}`
        );
      }
      const data = await response.json();
      setFollowing(data.following_count);
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
        throw new Error(
          `Failed to fetch posts count. Status: ${response.status}`
        );
      }
      const data = await response.json();
      setPostsCount(data.post_count);
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
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to update user. Status: ${response.status}`);
      }

      const responseData = await response.json();
      setUserInfo(responseData.user);
      getUserInfo();
      toast.success("Updated successfully.");
      setIsEditingProfile(false);
    } catch (error) {
      console.log("Error updating user:", error.message);
    }
  };

  const getUserPosts = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/posts/getUserPost",
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
        console.log(`Failed to fetch user posts. Status: ${response.status}`);
      }
      const data = await response.json();
      setPosts(data.posts);
    } catch (error) {
      console.log("Error fetching data:", error.message);
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

  function editUserProfile() {
    setIsEditingProfile(true);
  }

  function closeEditUser() {
    setIsEditingProfile(false);
  }

  useEffect(() => {
    getUserInfo();
    getUserfollowers();
    getUserFollowing();
    getPostCount();
    getUserPosts();
  }, []);

  return (
    <div className="main-wrapper">
      <Header editUserProfile={editUserProfile}></Header>
      <ToastContainer />

      <div className="profile-wrapper">
        {isEditingProfile && <div className="blurred"></div>}
        {isEditingProfile && (
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
              onChange={(e) => setName(e.target.value)}
            />
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              placeholder="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <div className="button-wrapper">
              <button onClick={updateUserInfo}>Save Changes</button>
              <button onClick={closeEditUser}>Cancel</button>
            </div>
          </div>
        )}

        <div className="profile-image">
          <img
            src={`http://127.0.0.1:8000/profile_pictures/${image}`}
            alt="user-profile"
          ></img>
        </div>

        <div className="profile-container">
          <div className="profile-name-follow">
            <p>{userInfo ? userInfo.name : "Loading..."}</p>
            <button onClick={editUserProfile}>Edit Profile</button>
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
            <p>{bio}</p>
          </div>
        </div>
      </div>
      <div className="personal-posts">
        {posts.map((post) => (
          <div key={post.id}>
            <img
              src={`http://127.0.0.1:8000/post_images/${post.image}`}
              alt={`post`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
