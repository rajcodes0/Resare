import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export function ProtectedRoute({ children }) {
  const { user, token, loading } = useContext(AuthContext);
  const [isReady, setIsReady] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    if (!loading) {
      setIsReady(true);
    }
  }, [loading]);

  if (loading || !isReady) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        style={{
          background: "linear-gradient(135deg, #0f0c29 0%, #1a1a3e 45%, #24243e 100%)",
        }}
      >
        <div className="w-8 h-8 border-3 border-indigo-400/30 border-t-indigo-400 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;