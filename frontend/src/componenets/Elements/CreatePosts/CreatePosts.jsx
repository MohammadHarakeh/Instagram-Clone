import React from "react";
import "./CreatePosts.css";

function CreatePosts({
  caption,
  handleCaptionChange,
  handleImageChange,
  imagePreview,
}) {
  return (
    <div>
      <div className="create-post-form">
        <div className="post-inputs">
          <input
            type="file"
            onChange={handleImageChange}
            id="imageInput"
            accept="image/*"
            className="post-image-input"
            required
          />

          <textarea
            placeholder="Write a caption..."
            value={caption}
            onChange={handleCaptionChange}
            required
          ></textarea>
        </div>

        <div className="button-wrapper post-choose-btn">
          <label
            htmlFor="imageInput"
            className="image-input-label submit-post-btn"
          >
            Choose Image
          </label>
        </div>

        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="preview"></img>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreatePosts;
