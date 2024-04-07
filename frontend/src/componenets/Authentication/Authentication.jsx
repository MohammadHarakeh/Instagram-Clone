import React, { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignupForm from "./Forms/SignupForm";
import SigninForm from "./Forms/SigninForm";

function Authentication() {
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState("");
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const validateForm = () => {
    if (
      !signupData.name ||
      !signupData.email ||
      !signupData.password ||
      !signupData.confirmPassword
    ) {
      setError("Please fill in all fields");
      toast.error("Please fill in all fields");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (signupData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    if (signupData.password !== signupData.confirmPassword) {
      setError("Passwords do not match");
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
        setError("");
        toast.success("User registered successfully");
      } else {
        console.log("Registration failed");
        setError("Registration failed");
      }
    } catch (error) {
      console.log("Error occurred during registration", error);
      setError("Error occurred during registration");
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <ToastContainer />
        <div className="instagram-logo">Instagram</div>
        {isLogin ? (
          <SigninForm />
        ) : (
          <SignupForm
            signupData={signupData}
            setSignupData={setSignupData}
            error={error}
            register={register}
          />
        )}
      </div>
    </div>
  );
}

export default Authentication;
