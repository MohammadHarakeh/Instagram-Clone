import React from "react";

function SignupForm({ signupData, setSignupData, error, register }) {
  const handleSignup = () => {
    register();
  };

  return (
    <div className="signup-wrapper">
      <input
        placeholder="Name"
        onChange={(e) => {
          setSignupData({ ...signupData, name: e.target.value });
        }}
      ></input>
      <input
        placeholder="Email"
        onChange={(e) => {
          setSignupData({ ...signupData, email: e.target.value });
        }}
      ></input>
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => {
          setSignupData({ ...signupData, password: e.target.value });
        }}
      ></input>
      <input
        placeholder="Confirm Password"
        type="password"
        onChange={(e) => {
          setSignupData({ ...signupData, confirmPassword: e.target.value });
        }}
      ></input>

      <div className="error-message">
        <p>{error}</p>
      </div>

      <div className="buttons-wrapper">
        <button onClick={handleSignup}>Signup</button>
      </div>

      <div className="switcher">
        <p>Already have an account? Signin</p>
      </div>
    </div>
  );
}

export default SignupForm;
