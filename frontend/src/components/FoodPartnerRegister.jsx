

import { Link , useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const FoodPartnerRegister = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post("http://localhost:3000/api/auth/foodpartner/register", {
        name,
        email,
        password,
      },{ withCredentials: true });
      // Optionally store user/token here
      navigate("/foodpartner/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please check your details."
      );
    }
  };

  return (
    <div className="form-container">
      <h2>Food Partner Registration</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" placeholder="Enter your name" required />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Enter your email" required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Enter your password" required />

        <button type="submit">Register</button>
      </form>
      {error && <div style={{ color: "#ff6b6b", marginTop: "1rem", textAlign: "center" }}>{error}</div>}
      <div className="form-links">
        <span>Already registered? <Link to="/foodpartner/login">Login</Link></span>
        <span>Or <Link to="/user/register">Register as User</Link></span>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;
