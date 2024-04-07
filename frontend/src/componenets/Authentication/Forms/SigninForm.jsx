import React from "react";

function SigninForm() {
  return (
    <div className="signup-wrapper">
      <input placeholder="Email"></input>
      <input placeholder="Password" type="password"></input>

      <div className="buttons-wrapper">
        <button>Signin</button>
      </div>
    </div>
  );
}

export default SigninForm;
