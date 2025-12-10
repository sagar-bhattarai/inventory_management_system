import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(!loading);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        {
          email,
          password,
        }
      );
      // console.log("response", response);
      if (response.data.statusCode === 200 && response.data.success) {
        const data = response.data.data;
        await login(data.user, data.accessToken, data.refreshToken);
        if (data.user.role == "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/customer-dashboard");
        }
      } else {
        alert(response.data?.error);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response?.data?.errors);
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login_container h-[100vh]-">
      <h1>
        Inventory management system
      </h1>
      <div className="form_container">
        <h3>login</h3>
        <form
          onSubmit={handleSubmit}
        >
          <div className="form_group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form_group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
          >
            {loading ? "Loading ... " : "Login"}
          </button>
        </form>
      </div>
      {error && (
        <div className="error">{error}</div>
      )}
    </div>
  );
};

export default Login;
