import React, { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignupForm from "./Forms/SignupForm";
import SigninForm from "./Forms/SigninForm";

function Authentication() {
  const [isLogin, setIsLogin] = useState(false);
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [signinData, setSigninData] = useState({
    name: "",
    password: "",
  });
  const navigate = useNavigate();

  const validateForm = () => {
    if (
      !signupData.name ||
      !signupData.email ||
      !signupData.password ||
      !signupData.confirmPassword
    ) {
      toast.error("Please fill in all fields");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (signupData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    if (signupData.password !== signupData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const validateSigninForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!signinData.email && !signinData.password) {
      toast.error("please fill in both fields");
      return false;
    } else if (!signinData.email) {
      toast.error("please enter your email");
      return false;
    } else if (!emailRegex.test(signinData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    } else if (!signinData.password) {
      toast.error("please enter your password");
      return false;
    }
    return true;
  };

  const register = async () => {
    if (!validateForm()) return;

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        body: JSON.stringify(signupData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("User registered successfully");
        toast.success("User registered successfully");
        setIsLogin(!isLogin);
      } else {
        console.log("Registration failed");
        toast.error("Registration failed");
      }
    } catch (error) {
      console.log("Error occurred during registration", error);
      toast.error("Error occurred during registration");
    }
  };

  const handleSignin = async () => {
    if (!validateSigninForm()) return;

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        body: JSON.stringify(signinData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", JSON.stringify(data.authorisation.token));
        console.log(data);
        toast.success("Login successful");
        navigate("/homepage");
      } else {
        console.log("Failed to login");
        toast.error("Failed to login");
      }
    } catch (error) {
      console.log("Error occured during registration", error);
      toast.error(error);
    }
  };

  return (
    <div className="form-wrapper">
      <ToastContainer />
      <div className="form-container">
        <div className="instagram-logo">Instagram</div>
        {isLogin ? (
          <SignupForm
            signupData={signupData}
            setSignupData={setSignupData}
            register={register}
          />
        ) : (
          <SigninForm
            handleSignin={handleSignin}
            setSigninData={setSigninData}
            signinData={signinData}
          />
        )}

        <div className="switcher">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span
              className="button-switcher"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? " Sign up" : "Sign in"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Authentication;
