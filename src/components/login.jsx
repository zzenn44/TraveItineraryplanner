// login.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import loginBg from "../assets/loginpagepic.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = jwtDecode(token);
        if (payload.role === "admin") navigate("/admin");
        else navigate("/landingpage");
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.access_token);
        console.log(data.access_token);
        const payload = jwtDecode(data.access_token);
        localStorage.setItem("role", payload.role);

        if (payload.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/landingpage");
        }
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex p-8 items-center justify-center">
      <div className="flex w-full h-full shadow-lg rounded-lg overflow-hidden">
        <div className="w-1/2 relative hidden md:block">
          <img src={loginBg} alt="Login" className="object-cover h-full w-full" />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-start pt-20 px-6 text-center">
            <h2 className="text-white text-2xl font-bold drop-shadow-xl tracking-wide">
              TRAVEL IS THE ONLY THING YOU BUY THAT MAKES YOU RICHER
            </h2>
          </div>
        </div>

        <form
          onSubmit={handleLogin}
          className="w-full md:w-1/2 bg-[#CABA9C] p-8 flex flex-col justify-center gap-6"
        >
          <h2 className="text-[#2f3c25] text-3xl font-extrabold font-baloo drop-shadow-2xl tracking-wide text-center">
            TripPal
          </h2>

          <input
            type="email"
            placeholder="Email"
            className="px-4 py-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="bg-[#4c6444] text-white py-2 rounded hover:bg-[#3e5338] transition">
            Login
          </button>

          <p className="text-center text-sm">
            Don’t have an account? <span onClick={goToRegister} className="text-blue-700 hover:underline cursor-pointer">Register here</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
