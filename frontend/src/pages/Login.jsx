import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../Api";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Logo from "../assets/styles/Fish Ai logo.png";
import "./Login.css";

const LoginPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const toggleMode = () => setIsLoginMode((prev) => !prev);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleAuth = async (e) => {
    e.preventDefault();

    try {
      if (isLoginMode) {
        const response = await loginUser({ email, password });
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }
        navigate("/home");
      } else {
        if (password !== confirmPassword) {
          alert("Passwords do not match!");
          return;
        }
        const response = await registerUser({ username, email, password });
        navigate("/home");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong.");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google"; // Adjust to your backend Google OAuth route
  };

  return (
    <div className="login-page">
      {/* Logo */}
      <div className="logo-container">
        <img src={Logo} alt="Logo" />
        <span>marketFish</span>
      </div>

      {/* Auth Box */}
      <div className="auth-container">
        <h1>{isLoginMode ? "Sign In" : "Register"}</h1>

        <button className="google-login-btn" onClick={handleGoogleLogin}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
            alt="Google"
            width="18"
          />
          Continue with Google
        </button>

        <div className="divider" style={{ margin: "1rem 0", color: "#ccc" }}>
          or
        </div>

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
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="toggle-eye" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {!isLoginMode && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}

          <button type="submit">
            {isLoginMode ? "Login" : "Register"}
          </button>
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
