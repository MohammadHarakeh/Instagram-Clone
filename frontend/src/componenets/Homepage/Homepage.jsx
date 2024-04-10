import { React, useState } from "react";
import Header from "../Elements/Header/Header";
import "./Homepage.css";
import Posts from "./Posts/Posts";
import Suggested from "./SuggestedUsers/Suggested";

function Homepage() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState();

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
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

  const createPost = async () => {
    try {
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
      } else {
        console.log("Error creating post");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="homepage-wrapper">
      <Header />

      <div>
        <Posts
          caption={caption}
          handleCaptionChange={handleCaptionChange}
          handleImageChange={handleImageChange}
          createPost={createPost}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
        />
        <Suggested />
      </div>
    </div>
  );
}
export default Homepage;
