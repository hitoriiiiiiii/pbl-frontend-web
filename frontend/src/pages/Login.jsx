import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { registerUser, loginUser } from "../services/Api"; // Import API services
import "./Login.css";
import Logo from "../assets/styles/Fish Ai logo.png";

const LoginPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(true); // Toggle between login and register
  const [username, setUsername] = useState(""); // State for username
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password (register only)
  const navigate = useNavigate(); // For navigation

  const toggleMode = () => setIsLoginMode((prev) => !prev); // Toggle between Login and Register

  const handleAuth = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    try {
      if (isLoginMode) {
        // Login API call
        const response = await loginUser({ email, password });
        console.log("Login Successful:", response.data);

        // Store token in localStorage (if token is provided in backend response)
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }

        // Redirect to home page
        navigate("/home");
      } else {
        // Registration API call
        if (password !== confirmPassword) {
          alert("Passwords do not match!");
          return;
        }
        const response = await registerUser({ username, email, password });
        console.log("Registration Successful:", response.data);

        // Redirect to home page after successful registration
        navigate("/home");
      }
    } catch (error) {
      console.error("Authentication Error:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Something went wrong. Please try again!");
    }
  };

  return (
    <div className="login-page">
      {/* Header Section */}
      <div className="logo-container">
        <img src={Logo} alt="Logo" className="logo" />
        <span className="market-fish">marketFish</span>
      </div>

      {/* Authentication Form */}
      <div className="auth-container">
        <h1>{isLoginMode ? "Login" : "Register"}</h1>
        <form onSubmit={handleAuth}>
          {!isLoginMode && (
            <input
              type="text"
              placeholder="Full Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {!isLoginMode && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}
          <button type="submit">{isLoginMode ? "Login" : "Register"}</button>
        </form>
        <p>
          {isLoginMode
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <button className="toggle-btn" onClick={toggleMode}>
            {isLoginMode ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
