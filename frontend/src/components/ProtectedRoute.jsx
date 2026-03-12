import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import  AuthContext from "../context/AuthContext";

export function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        style={{
          background:
            "linear-gradient(135deg, #0f0c29 0%, #1a1a3e 45%, #24243e 100%)",
        }}
      >
        <div className="w-8 h-8 border-3 border-indigo-400/30 border-t-indigo-400 rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
