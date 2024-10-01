import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

// InputField Component (Reusable Input Field with Validation)
function InputField({
  name,
  label,
  value,
  onChange,
  type,
  placeholder,
  error,
}) {
  return (
    <div className="mb-3">
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded border p-2 focus:border-blue-500 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone:"",
    confirmPassword: "",
    profileImage : null,
    type: "user", // default to user
  });

  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); // Loading state for form submission
  const navigate = useNavigate();

  // Handle input changes and validate the field
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear the error for this field
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  // Handle file input changes for image upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    // Validate file type (allowing only image extensions)
    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (file && !validImageTypes.includes(file.type)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        profileImage: "Please upload a valid image file (jpg, png).",
      }));
      return;
    }

    setFormData({
      ...formData,
      profileImage: file,  // Store the selected image file
    });

    // Clear the error if the image is valid
    setErrors((prevErrors) => ({
      ...prevErrors,
      profileImage: "",
    }));
  };


  // Handle checkbox change
  const handleCheckboxChange = () => {
    setIsTermsChecked(!isTermsChecked);

    if (errors.terms) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        terms: "",
      }));
    }
  };

  // Full form validation
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Password validation
    if (!formData.phone) {
      newErrors.phone = "Password is required";
    } else if (formData.phone.length < 9) {
      newErrors.phone = "phone must be at least 9 characters";
    }
    // Password validation
    if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      }
    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    // Image validation
    if (!formData.profileImage) {
        newErrors.profileImage = "Profile image is required";
      }

    // Checkbox validation
    if (!isTermsChecked) {
      newErrors.terms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields before submission
    if (!validateForm()) {
      return;
    }

    setIsLoading(true); // Start loading state

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("type", formData.type);
      formDataToSend.append("imageurl", formData.profileImage);  // Append the image file

      const response = await axios.post("http://localhost:5000/customer", formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',  // Important for file uploads
        },
      });

      if (response.status === 200) {
        toast.success("User registered successfully!", {
          position: toast.POSITION,
        });
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone:"",
          password: "",
          confirmPassword: "",
          profileImage: null,
         
        });
        setIsTermsChecked(false); // Reset the checkbox
        setTimeout(() => {
          navigate("/login"); // Redirect to sign-in page after success
        }, 2000);
      }
    } catch (err) {
      toast.error(
        err.response?.data?.error || "Registration failed. Please try again.",
        {
          position: toast.POSITION,
        }
      );
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white shadow-md  rounded-lg p-10">
        <h4 className="mb-2.5 text-4xl font-bold text-black ">
          Create Account
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Fill the form below to register
        </p>

        <form onSubmit={handleSubmit} className=" grid grid-cols-2 gap-5">
          <InputField
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            label="Full Name*"
            error={errors.name}
          />

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
            name="phone"
            type="text"
            value={formData.phone}
            onChange={handleChange}
            placeholder="612910628"
            label="phone*"
            error={errors.phone}
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

          <InputField
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-type your password"
            label="Confirm Password*"
            error={errors.confirmPassword}
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-black dark:text-white">
              Profile Image*
            </label>
            <input
              type="file"
              accept="image/*" // Only accept image files
              onChange={handleFileChange}
              className="w-full rounded border p-2 focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.profileImage && (
              <p className="text-sm text-red-500">{errors.profileImage}</p>
            )}
          </div>

          {/* <div className="mb-4">
            <label className="block text-sm font-medium text-black ">
              User Type*
            </label>
            <div className="relative mt-1">
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-700 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-pink-500 0 dark:bg-navy-900  sm:text-sm"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div> */}

          <div className="mb-4 flex items-center px-2">
            <input
              type="checkbox"
              checked={isTermsChecked}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            <p className="text-sm font-medium text-black">
              I agree to the terms and conditions
            </p>
          </div>
          {errors.terms && (
            <p className="text-sm text-red-500">{errors.terms}</p>
          )}

          <button
            className="linear mt-2 w-full rounded-xl bg-pink-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
            type="submit"
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-4">
          <span className="text-sm font-medium text-black dark:text-gray-600">
            Already have an account?
          </span>
          <Link
            to="/auth/sign-in"
            className="ml-1 text-sm font-medium text-pink-500 hover:text-pink-600 "
          >
            Sign In
          </Link>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
}
