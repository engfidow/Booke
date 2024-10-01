/* eslint-disable */
import { HiX } from "react-icons/hi";
import Links from "./components/Links";
import SidebarCard from "components/sidebar/componentsrtl/SidebarCard";
import routes from "routes.js";
import { useCookies } from "react-cookie"; // Import the useCookies hook
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const Sidebar = ({ open, onClose }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token", "user"]); // Use the cookie hook
  const navigate = useNavigate(); // Use navigate to redirect user

  // Function to handle logout
  const handleLogout = () => {
    // Remove the cookies (token and user data)
    removeCookie("token", { path: "/" });
    removeCookie("user", { path: "/" });

    // Redirect to login page
    navigate("/auth/sign-in");
    
  };

  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      <div className={`mx-[56px] mt-[50px] flex items-center`}>
        <div className="mt-1 ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
          Booke <span class="font-medium"></span>
        </div>
      </div>
      <div class="mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30" />

      {/* Nav items */}
      <ul className="mb-auto pt-1">
        <Links routes={routes} />
      </ul>

      {/* Logout Button */}
      <div className="px-8">
        <button
          onClick={handleLogout} // Call the handleLogout function when clicked
          className="w-full mt-4 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
