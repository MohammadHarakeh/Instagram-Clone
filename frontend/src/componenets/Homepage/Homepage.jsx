import { React, useEffect, useState } from "react";
import Header from "../Elements/Header/Header";
import "./Homepage.css";
import Posts from "./Posts/Posts";
import Suggested from "./SuggestedUsers/Suggested";
import CreatePosts from "../Elements/CreatePosts/CreatePosts";
import { ToastContainer, toast } from "react-toastify";

function Homepage() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState();
  const [posts, setPosts] = useState();
  const [isEditing, setIsEditing] = useState(false);

  const createPost = async () => {
    try {
      if (!caption.trim()) {
        toast.error("Caption cannot be empty.");
        return;
      }

      if (!image) {
        toast.error("Please select an image.");
        return;
      }

      const formData = new FormData();
      formData.append("image", image);
      formData.append("caption", caption);

      const response = await fetch("http://127.0.0.1:8000/api/posts/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: formData,
      });

      if (response.ok) {
        console.log("Post created successfully");
        setCaption("");
        setImage(null);
        setImagePreview(null);
        setIsEditing(false);
        getAllPosts();
        toast.success("Image Uploaded Successfully");
      } else {
        console.log("Error creating post", response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImagePreview(reader.result);
    };
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const getAllPosts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/posts/getAll", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        console.log(`Failed to fetch posts. Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setPosts(data.posts);
    } catch (error) {
      console.log("Error fetching data:", error.message);
    }
  };

  function editUser() {
    setIsEditing(true);
  }

  function closeEditUser() {
    setIsEditing(false);
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className="homepage-wrapper">
      <ToastContainer />
      {isEditing && <div className="blurred"></div>}
      {isEditing && (
        <div className="is-editing">
          <CreatePosts
            caption={caption}
            handleCaptionChange={handleCaptionChange}
            handleImageChange={handleImageChange}
            createPost={createPost}
            imagePreview={imagePreview}
          />
          <div className="button-wrapper">
            <button onClick={createPost}>Upload Image</button>
            <button onClick={closeEditUser}>Cancel</button>
          </div>
        </div>
      )}
      <Header editUser={editUser} />

      <div>
        <Posts
          caption={caption}
          handleCaptionChange={handleCaptionChange}
          handleImageChange={handleImageChange}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
          posts={posts}
        />
        <Suggested />
      </div>
    </div>
  );
}
export default Homepage;
