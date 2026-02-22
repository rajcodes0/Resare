import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import FileDetail from "./Pages/FileDetail.jsx";
import ForgotPassword from "./Pages/ForgotPassword.jsx";
import ResetPassword from "./Pages/ResetPassword.jsx";
import Upload from "./Pages/Upload.jsx";
import CreatorProfile from "./Pages/CreatorProfile.jsx";
import Home from "./Pages/Home.jsx";
import Navbar from './components/Navbar';

function App() {
  return <>
 < Navbar/>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/Register" element={<Register/>}/>
    <Route path="/ForgotPassword" element={<ForgotPassword/>}/>
    <Route path="/ResetPassword" element={<ResetPassword/>}/>
    <Route path="/Dashboard" element={<Dashboard/>}/>
    <Route path="/FileDetail" element={<FileDetail/>}/>
    <Route path="/Upload" element={<Upload/>}/>
    <Route path="/CreatorProfile" element={<CreatorProfile/>}/>
  </Routes>
  </>;
}

export default App;
