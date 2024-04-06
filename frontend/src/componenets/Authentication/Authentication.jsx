import { React, useState } from "react";
import "./index.css";
import SignupForm from "./Forms/SignupForm";
import SigninForm from "./Forms/SigninForm";

function Authentication() {
  const [isLogin, setIsLogin] = useState("");
  return (
    <div className="form-wrapper">
      <div className="form-container">
        <div className="instagram-logo">Instagram</div>
        {isLogin ? <SigninForm /> : <SignupForm />}
      </div>
    </div>
  );
}

export default Authentication;
