import React, { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import api from "../utils/api";

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      }
    } catch (error) {
      console.error("Failed to parse stored auth data:", error);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (userData, accessToken) => {
    // Ensure _id is set for consistency
    const userWithId = {
      ...userData,
      _id: userData._id || userData.id,
    };
    setUser(userWithId);
    setToken(accessToken);
    localStorage.setItem("user", JSON.stringify(userWithId));
    localStorage.setItem("token", accessToken);
    console.log("User logged in:", userWithId);
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = async () => {
    // Clear state immediately to prevent flashing logged-in UI
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // Notify backend
    try {
      await api.post("/api/v1/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const isAuthenticated = () => !!user && !!token;

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser: updateUser,
        token,
        loading,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
