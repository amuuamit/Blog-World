import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await handleLogin(formData);
      console.log("Login successful:", response);

      if (response) {
        navigate("/home");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h1>Login</h1>
        <form onSubmit={handleLoginSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <button>Sign In</button>
        </form>
        <p>
          You don't have an account?{" "}
          <button onClick={() => navigate("/register")}>Register</button>
        </p>
      </div>
    </div>
  );
};

export default Login;
