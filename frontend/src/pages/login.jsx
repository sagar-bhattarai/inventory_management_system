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
        await login(response.data.data.user, response.data.data.accessToken);
        if (response.data.data.user.role == "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/customer/dashboard");
        }
      } else {
        alert(response.data?.error);
      }
    } catch (error) {
      if(error.response){
        setError(error.response?.data?.errors);
      }
      // console.log("error",error.response);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container flex flex-col justify-center items-center bg-[#f3f3f3] w-full h-[100vh]">
      <h1 className="font-bold text-md mb-5 text-green-600">
        Inventory management system
      </h1>
      <div className="form-container flex flex-col justify-center items-center p-5 rounded border border-gray-50  shadow-lg shadow-black-500/50">
        <h3 className="font-bold text-sm mb-5">login</h3>
        <form
          onSubmit={handleSubmit}
          className="login-form flex flex-col justify-center items-center"
        >
          <div className="form-group pb-3 flex flex-col justify-between w-full">
            <label htmlFor="email">Email</label>
            <input
              className="rounded border py-[2px] px-3"
              type="text"
              name="email"
              id="email"
              placeholder="Enter email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group pb-3 flex flex-col justify-between w-full">
            <label htmlFor="password">Password</label>
            <input
              className="rounded border py-[2px] px-3"
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="rounded border border-orange-300 py-[2px] px-3 w-full cursor-pointer bg-orange-300 hover:bg-orange-500 duration-300 shadow-lg shadow-orange-300/50"
            type="submit"
          >
            {loading ? "Loading ... " : "Login"}
          </button>
        </form>
      </div>
      {error && (
        <div className="bg-red-200 py-2 px-4 my-4 rounded">{error}</div>
      )}
    </div>
  );
};

export default Login;
