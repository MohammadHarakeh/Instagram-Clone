import React from "react";

function SigninForm({ setSigninData, handleSignin, signinData }) {
  return (
    <div className="signup-wrapper">
      <input
        placeholder="Email"
        onChange={(e) => {
          setSigninData({ ...signinData, email: e.target.value });
        }}
      ></input>
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => {
          setSigninData({ ...signinData, password: e.target.value });
        }}
      ></input>

      <div className="buttons-wrapper">
        <button onClick={handleSignin}>Signin</button>
      </div>
    </div>
  );
}

export default SigninForm;
