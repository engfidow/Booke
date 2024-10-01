import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie"; // Import useCookies for cookie handling
import { useNavigate } from "react-router-dom"; // Use to navigate after login

function Login() {
  const [logininfo, setlogininfo] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, seterrorMessage] = useState({});
  const [cookies, setCookie] = useCookies(["auth_token"]); // Initialize cookie management
  const navigate = useNavigate(); // For navigation after successful login

  const handalInputChanges = (e) => {
    const { name, value } = e.target;
    setlogininfo({ ...logininfo, [name]: value });

    // Remove the error message for the field being updated
    seterrorMessage((prevErrors) => ({
      ...prevErrors,
      [name]: null,
    }));
  };

  const validation = () => {
    let formErrors = {};
    if (!logininfo.email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(logininfo.email)) {
      formErrors.email = "Invalid email address";
    }
    if (!logininfo.password) {
      formErrors.password = "Password is required";
    }
    seterrorMessage(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handalLogin = async (e) => {
    e.preventDefault();
    if (!validation()) return;

    try {
      const response = await axios.post("http://localhost:5000/customer/login", logininfo); // Adjust your API endpoint
      const { token, checkUser } = response.data; // Assuming the response contains token and user info

      // Set the token in cookies (it will be stored for 1 hour)
      setCookie("auth_token", token, { path: "/", maxAge: 3600 });

      // Redirect to the homepage after successful login
      navigate("/");
    } catch (error) {
      seterrorMessage({ login: "Login failed. Please check your credentials." });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white shadow-md w-[400px] rounded-lg">
        <form onSubmit={handalLogin} className="flex flex-col gap-5 py-10 px-5">
          <h1 className="font-serif font-bold text-2xl text-center">Login</h1>
          <input
            type="email"
            name="email"
            placeholder="example@info.com"
            className="px-2 py-3 rounded-md border border-blue-300"
            onChange={handalInputChanges}
          />
          {errorMessage.email && (
            <p className="text-red-600 text-sm">{errorMessage.email}</p>
          )}
          <input
            type="password"
            name="password"
            placeholder="enter password"
            className="px-2 py-3 rounded-md border border-blue-300"
            onChange={handalInputChanges}
          />
          {errorMessage.password && (
            <p className="text-red-600 text-sm">{errorMessage.password}</p>
          )}
          {errorMessage.login && (
            <p className="text-red-600 text-sm">{errorMessage.login}</p>
          )}
          <div className="flex justify-center">
            <button
              type="submit"
              className="mb-10 bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
