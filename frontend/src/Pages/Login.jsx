import React, { useState } from "react";

function Login() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

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
  }
};

  return (
    <div>
      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="your name please"
          value={formData.name}
          onChange={handleForm}
        />

        <input
          type="email"
          name="email"
          placeholder="your email please"
          value={formData.email}
          onChange={handleForm}
        />

        <input
          type="password"
          name="password"
          placeholder="your password please"
          value={formData.password}
          onChange={handleForm}
        />

        <button type="submit">Submit</button>

      </form>
    </div>
  );
}

export default Login;