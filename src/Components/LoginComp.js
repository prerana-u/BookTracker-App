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
    <div class=" flex justify-center xl:absolute xl:top-36 xl:left-[950px]">
      <form class="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 h-[420px] w-[350px] md:h-[450px]  min-[320px]:h-[420px] min-[320px]:w-[300px] md:w-[450px]">
        <h2 className="font-bold self-center text-center md:text-2xl text-lg  mb-9">
          Welcome Back! Sign in to continue
        </h2>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="username"
          >
            Username
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
          />
        </div>
        <div class="mb-6">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder="******************"
          />
          <p className="text-red-400 font-medium text-[14px] mt-2">{message}</p>
          <button class="inline-block align-baseline font-bold text-gray-500 hover:text-blue-800 mt-4 text-xs">
            Forgot Password?
          </button>
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-[#FFD666] hover:bg-[#DE971E] hover:text-white text-black  border-[#DE971E] w-full border-1 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSubmit}
          >
            Sign In
          </button>
        </div>

        <br />
        <button
          class=" align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 "
          onClick={() => props.setIsLogin(false)}
        >
          New User? Create Account
        </button>
      </form>
    </div>
  );
}
