import React, { useState } from "react";
import { Link } from "react-router-dom";


function Login() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleForm = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (data.success) {
        alert("Login Success");
      } else {
        alert(data.message || "Login Failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center  flex-col bg-black">
      <h1 className="text-3xl font-bold mb-5 text-sky-500">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center border-4 p-5 rounded-2xl  w-[450px] aspect-square justify-center bg-sky-50"
      >
        <input
          type="text"
          name="name"
          placeholder="your name please"
          value={formData.name}
          onChange={handleForm}
          className="bg-black text-2xl text-white rounded-2xl p-3 mt-5 "
        />

        <input
          type="email"
          name="email"
          placeholder="your email please"
          value={formData.email}
          onChange={handleForm}
          className="bg-black text-2xl text-white rounded-2xl p-3 mt-5"
        />

        <input
          type="password"
          name="password"
          placeholder="your password please"
          value={formData.password}
          onChange={handleForm}
          className="bg-black text-2xl text-white rounded-2xl p-3 mt-5"
        />

        <button
          type="submit"
          disabled={loading}
          className={`px-30 w-100% py-3 m-5 rounded-xl text-white ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Logging..." : "Submit"}
        </button>

        <span>
         
          <Link to="/forgotPassword"> ForgotPassword</Link>
        </span>
      </form>
    </div>
  );
}

export default Login;
