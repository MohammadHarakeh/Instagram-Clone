import React from "react";
import Header from "../Elements/Header/Header";
import "./Homepage.css";
import Posts from "./Posts/Posts";

function Homepage() {
  return (
    <div className="homepage-wrapper">
      <Header />

      <div>
        <Posts />
      </div>
    </div>
  );
}

export default Homepage;
