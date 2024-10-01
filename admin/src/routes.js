import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";

import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";
import RTLDefault from "views/rtl/default";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
  MdBook,
  MdLogout
} from "react-icons/md";
import Books from "views/admin/books";
import Register from "views/auth/Register";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Books",
    layout: "/admin",
    path: "books",
    icon: <MdBook className="h-6 w-6" />,
    component: <Books />,
    secondary: true,
  },
  {
    name: "Report",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "report",
    component: <DataTables />,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "LogOut",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLogout className="h-6 w-6" />,
    component: <SignIn />,
    hiddenInSidebar: true,
  },
  {
    name: "Register", // Add this route
    layout: "/auth",
    path: "register",
    icon: <MdLock className="h-6 w-6" />,
    component: <Register />,
    hiddenInSidebar: true,
  },
  // {
  //   name: "RTL Admin",
  //   layout: "/rtl",
  //   path: "rtl",
  //   icon: <MdHome className="h-6 w-6" />,
  //   component: <RTLDefault />,
  // },
];
export default routes;
