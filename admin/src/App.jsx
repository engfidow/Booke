import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import { useAuth } from "utils/auth"; // Import the custom hook

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Use the custom hook
  if (!isAuthenticated()) {
    return <Navigate to="/auth/sign-in" replace />; // Redirect to login if not authenticated
  }
  return children;
};

const App = () => {
  return (
    <Routes>
      <Route path="auth/*" element={<AuthLayout />} />
      <Route
        path="admin/*"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default App;
