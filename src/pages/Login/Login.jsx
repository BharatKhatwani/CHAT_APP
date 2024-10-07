import React, { useState } from 'react';
import '../Login/Login.css';
import assets from '../../assets/assets.js';
import { signup, login } from '../../Config/firebase.js'; // Import the signup and login functions

const Login = () => {
  const [current, setCurrent] = useState("Sign up"); // State to toggle between Sign up and Login
  const [userName, setUserName] = useState(""); // Username state
  const [email, setEmail] = useState(""); // Email state
  const [password, setPassword] = useState(""); // Password state

  // Form submission handler
  const onSubmitHandler = async (event) => {
    event.preventDefault(); // Prevent page reload on form submission
    try {
      if (current === "Sign up") {
        // Call Firebase sign-up function
        await signup(userName, email, password);
        console.log("User signed up successfully");
      } else {
        // Call Firebase login function
        await login(email, password);
        console.log("User logged in successfully");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  return (
    <div className="login">
      <img src={assets.logo_big} alt="" className="logo" />
      <form onSubmit={onSubmitHandler} className="Login-form">
        <h2>{current}</h2>

        {/* Conditional rendering for Sign up */}
        {current === "Sign up" && (
          <input
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            type="text"
            placeholder="Username"
            className="Form-input"
            required
          />
        )}

        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Email address"
          className="Form-input"
          required
        />

        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Password"
          className="Form-input"
          required
        />

        <button type="submit">
          {current === "Sign up" ? "Create Account" : "Login Now"}
        </button>

        <div className="login-term">
          <input type="checkbox" required />
          <p>Agree to the terms of use & privacy policy</p>
        </div>

        <div className="login-forgot">
          {current === "Sign up" ? (
            <p className="login-toggle">
              Already have an Account?{" "}
              <span onClick={() => setCurrent("Login")}>
                Login here
              </span>
            </p>
          ) : (
            <p className="login-toggle">
              Create an Account{" "}
              <span onClick={() => setCurrent("Sign up")}>
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
