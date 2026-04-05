import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export function ProtectedRoute({ children }) {
  const { user, token, loading } = useContext(AuthContext);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Set ready after initial loading completes
    if (!loading) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsReady(true);
    }
  }, [loading]);

  // While still loading initial auth state, show spinner
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

  // Once loading is complete, check authentication
  if (!isReady) {
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

  // Check if authenticated - use context values, with localStorage as fallback
  const hasToken = token || localStorage.getItem("token");
  const hasUser = user || localStorage.getItem("user");

  if (!hasToken || !hasUser) {
    if (!user && !token && !hasToken && !hasUser) {
      console.warn("ProtectedRoute: No auth data found. Redirecting to login.");
    }
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
