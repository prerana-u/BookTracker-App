import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Resources/Context/AuthContext";

export default function LoginComp(props) {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/login", formData);
      login(res.data.token);
      setMessage("Login successful");
      navigate("/dashboard"); // Redirect to dashboard after successful login
    } catch (err) {
      setMessage("Error: " + (err.response?.data?.error || err.message));
    }
  };
  return (
    <div className=" flex justify-center ">
      <form className="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 h-[400px] sm:w-[380px] md:h-[430px] min-[320px]:w-[300px] md:w-[450px]">
        <h2 className="font-bold self-center text-center md:text-2xl text-lg  mb-9">
          Welcome Back! Sign in to continue
        </h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder="******************"
          />
          <p className="text-red-400 font-medium text-[14px] mt-2">{message}</p>
          <button className="inline-block align-baseline font-bold text-gray-500 hover:text-blue-800 mt-4 text-xs">
            Forgot Password?
          </button>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-gradient-to-r from-[#2663B3] to-[#57ADD5] text-white  border-[#2663B3] w-full border-1 font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSubmit}
          >
            Sign In
          </button>
        </div>

        <button
          className=" align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 mt-4"
          // eslint-disable-next-line react/prop-types
          onClick={() => props.setIsLogin(false)}
        >
          New User? Create Account
        </button>
      </form>
    </div>
  );
}
