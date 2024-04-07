import React from "react";
import "./Header.css";
import { FaInstagram } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdOutlineExplore } from "react-icons/md";
import { CiHeart } from "react-icons/ci";

function Header() {
  return (
    <div className="header-wrapper">
      <div className="header-left">
        <FaInstagram />
        <p className="instagram-logo header-logo">Instagram</p>
      </div>

      <div className="header-right">
        <span>
          <MdOutlineExplore />
        </span>

        <span>
          <CiHeart />
        </span>

        <span>
          <CgProfile />
        </span>
      </div>
    </div>
  );
}

export default Header;
