import { React, useState } from "react";
import "./index.css";
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

  const register = async () => {
    const formData = new FormData();
    formData.append("name", signupData.name);
    formData.append("email", signupData.email);
    formData.append("password", signupData.password);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        body: JSON.stringify(signupData),
      });
      if (response.ok) {
        console.log("User registed successfully");
        console.log(response);
      } else {
        console.log("Registration failed");
      }
    } catch (error) {
      console.log("Error occured during registration", "error");
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <div className="instagram-logo">Instagram</div>
        {isLogin ? (
          <SigninForm />
        ) : (
          <SignupForm
            signupData={signupData}
            setSignupData={setSignupData}
            register={register}
          />
        )}
      </div>
    </div>
  );
}

export default Authentication;
