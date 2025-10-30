import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Dashboard from "./components/dashboard/Dashboard";
import AdminDashboard from "./components/admin/AdminDashboard";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import NotFound from "./components/common/NotFound";
import { getCurrentUser } from "./lib/auth";

// Private route wrapper
function PrivateRoute({ children, allowedRoles }) {
  const user = getCurrentUser();

  if (!user) return <Navigate to="/login" />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If user is logged in but not allowed
    return <Navigate to="/" />;
  }

  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
              <h1 className="text-6xl">Admin Dashboard</h1>
              <AdminDashboard />
              <h1 className="text-6xl">User Dashboard</h1>
              <UserDashboard />
            </PrivateRoute>
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        {/* User Dashboard */}
        <Route
          path="/user"
          element={
            <PrivateRoute>
              <UserDashboard />
            </PrivateRoute>
          }
        />

        {/* Catch-all 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
