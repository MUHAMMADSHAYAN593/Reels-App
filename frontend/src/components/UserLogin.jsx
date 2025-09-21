import { Link, useNavigate } from "react-router-dom";
import "../theme.css";
import "../App.css";
import axios from "axios";
import { useState } from "react";

const UserLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post("http://localhost:3000/api/auth/user/login", {
        email,
        password,
      },{ withCredentials: true });
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <div className="form-container">
      <h2>User Login</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Enter your email" required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Enter your password" required />

        <button type="submit">Login</button>
      </form>
      {error && <div style={{ color: "#ff6b6b", marginTop: "1rem", textAlign: "center" }}>{error}</div>}
      <div className="form-links">
        <span>Don't have an account? <Link to="/user/register">Register</Link></span>
        <span>Or <Link to="/foodpartner/login">Login as Food Partner</Link></span>
      </div>
    </div>
  );
};

export default UserLogin;