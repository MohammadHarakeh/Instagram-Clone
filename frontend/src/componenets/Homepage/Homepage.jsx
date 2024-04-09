import React from "react";
import Header from "../Elements/Header/Header";
import "./Homepage.css";
import Posts from "./Posts/Posts";
import Suggested from "./SuggestedUsers/Suggested";

function Homepage() {
  return (
    <div className="homepage-wrapper">
      <Header />

      <div>
        <Posts />
        <Suggested />
      </div>
    </div>
  );
}

export default Homepage;
