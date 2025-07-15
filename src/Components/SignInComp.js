import { useState } from "react";
import axios from "axios";
export default function SignInComp(props) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== password) {
      setMessage("Passwords do not match!");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:3001/create-user",
        formData
      );
      if (res.status === 201) {
        setMessage("");
        console.log("User created successfully!");
        props.setIsLogin(true);
      }
    } catch (error) {
      if (
        error.response.data?.details.includes(
          "E11000 duplicate key error collection"
        )
      ) {
        setMessage("Username already exists. Please choose a different one.");
      } else {
        setMessage(
          `Error: ${error.response?.data?.error || "Something went wrong"}`
        );
      }
    }
  };

  return (
    <div class=" flex justify-center xl:absolute xl:top-24 xl:left-[950px]">
      <form class="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 h-[480px] w-[350px] md:h-[530px]  min-[320px]:h-[450px] min-[320px]:w-[300px] md:w-[450px]">
        <h2 className="font-bold self-center text-center md:text-2xl text-lg  mb-9">
          Join us to discover a wide range of books!
        </h2>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="username"
          >
            Create New Username
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div class="mb-6">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            Create Password
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name="passwordog"
            placeholder="******************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <a
                    class="inline-block align-baseline font-bold text-gray-500 hover:text-blue-800 mt-4 text-xs"
                    href="#"
                  >
                    Forgot Password?
                  </a> */}
          <label
            class="block text-gray-700 text-sm font-bold mb-2 mt-6"
            for="password"
          >
            Confirm Password
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name="password"
            placeholder="******************"
            value={formData.password}
            onChange={handleChange}
          />
          <p className="text-red-400 font-medium text-[14px] mt-2">{message}</p>
        </div>
        <div class="flex flex-col items-center justify-between">
          <button
            class="bg-[#FFD666] hover:bg-[#DE971E] hover:text-white text-black  border-[#DE971E] w-full border-1 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>

        <br />
        <button
          class=" align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 "
          onClick={() => props.setIsLogin(true)}
        >
          Existing User? Click here to Sign In
        </button>
      </form>
    </div>
  );
}
