import InputField from "components/fields/InputField";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie"; // Import react-cookie

export default function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [cookies, setCookie] = useCookies(["token", "user"]); // useCookies to manage token

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/login", {
        email: formData.email,
        password: formData.password,
      });

      const { token, user } = response.data;

      // Store the token and user info in cookies
      setCookie("token", token, { path: "/", maxAge: 86400 }); // Cookie expires in 1 day
      setCookie("user", user, { path: "/", maxAge: 86400 });

      // Redirect to admin dashboard after successful login
      navigate("/admin");
    } catch (error) {
      setErrors({ form: "Invalid email or password" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-16 mt-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign In
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your email and password to sign in!
        </p>

        {errors.form && <p className="text-red-500">{errors.form}</p>}

        <form onSubmit={handleSubmit}>
          <InputField
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="mail@example.com"
            label="Email*"
            error={errors.email}
          />

          <InputField
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Min. 8 characters"
            label="Password*"
            error={errors.password}
          />

          <button
            type="submit"
            className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <div className="mt-4">
          <span className="text-sm font-medium text-navy-700 dark:text-gray-600">
            if don't have an account!
          </span>
          <Link
            to="/auth/register"
            className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
