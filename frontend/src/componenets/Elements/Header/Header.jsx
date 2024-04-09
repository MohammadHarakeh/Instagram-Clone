import React from "react";
import "./Header.css";
import { FaInstagram } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdOutlineExplore } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const logoutRedirect = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  const homepageRedirect = () => {
    navigate("/homepage");
  };

  const profileRedirect = () => {
    navigate("/profile");
  };

  return (
    <div className="header-wrapper">
      <div className="header-left">
        <FaInstagram className="header-insta-logo" />
        <p className="instagram-logo header-logo" onClick={homepageRedirect}>
          Instagram
        </p>
      </div>

      <div className="header-right">
        <span>
          <MdOutlineExplore />
        </span>

        <span>
          <CiHeart />
        </span>

        <span>
          <CgProfile onClick={profileRedirect} />
        </span>

        <span className="logout-btn" onClick={logoutRedirect}>
          <IoIosLogOut />
        </span>
      </div>
    </div>
  );
}

export default Header;
