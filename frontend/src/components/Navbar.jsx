import React, { useState } from "react";
import { Link } from "react-router-dom";
import User from "../../public/user.jpg";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center m-2 p-3 bg-sky-400 text-white rounded-xl">

      {/* Logo */}
      <span className="font-bold text-2xl">Resare</span>

      {/* Links */}
      <div className="flex gap-4">
        <Link to="/" className="text-lg">Home</Link>
        <Link to="/Login" className="text-lg">Login</Link>
        <Link to="/Register" className="text-lg">Register</Link>
        <Link to="/footer" className="text-lg">Contact</Link>
      </div>

      {/* Profile */}
      <div className="relative">

        <img
          src={User}
          alt="user"
          className="h-10 w-10 rounded-full cursor-pointer"
          onClick={() => setOpen(!open)}
        />

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg p-2 flex flex-col gap-2">

            <Link to="/Dashboard" onClick={() => setOpen(false)}>
              Dashboard
            </Link>

            <Link to="/ResetPassword" onClick={() => setOpen(false)}>
              Reset Password
            </Link>

            <Link to="/" onClick={() => setOpen(false)}>
              Logout
            </Link>

          </div>
        )}

      </div>

    </nav>
  );
}

export default Navbar;

