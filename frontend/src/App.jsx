import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import AuthProvider from "./context/AuthProvider";
import { ThemeProvider } from "./context/ThemeProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import FileDetail from "./Pages/FileDetail";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import Upload from "./Pages/Upload";
import CreatorProfile from "./Pages/CreatorProfile";
import Search from "./Pages/Search";
import Settings from "./Pages/Settings";
import UserProfile from "./Pages/UserProfile";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Toaster position="top-right" reverseOrder={false} />

        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/search" element={<Search />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/upload"
              element={
                <ProtectedRoute>
                  <Upload />
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/creator-profile/:id"
              element={
                <ProtectedRoute>
                  <CreatorProfile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/file/:id"
              element={
                <ProtectedRoute>
                  <FileDetail />
                </ProtectedRoute>
              }
            />

            <Route
              path="*"
              element={
                <div className="flex items-center justify-center h-screen text-xl">
                  404 - Page Not Found
                </div>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
