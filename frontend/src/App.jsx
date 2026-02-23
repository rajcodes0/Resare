import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import FileDetail from "./Pages/FileDetail.jsx";
import ForgotPassword from "./Pages/ForgotPassword.jsx";
import ResetPassword from "./Pages/ResetPassword.jsx";
import Upload from "./Pages/Upload.jsx";
import CreatorProfile from "./Pages/CreatorProfile.jsx";
import Search from "./Pages/Search.jsx";

function App() {
  return (
    <Routes>
      {/* All routes share the Layout (Navbar + Footer) */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/FileDetail" element={<FileDetail />} />
        <Route path="/Upload" element={<Upload />} />
        <Route path="/CreatorProfile" element={<CreatorProfile />} />
        <Route path="/Search" element={<Search />} />
      </Route>
    </Routes>
  );
}

export default App;
