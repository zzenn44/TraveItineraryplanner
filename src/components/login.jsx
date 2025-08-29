import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import maybe4 from "../assets/maybe4.jpg"; 



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
    <div className="min-h-screen flex items-center justify-center bg-[#e9ebd5] p-8">
      <div className="flex w-full max-w-6xl h-[80vh] shadow-lg rounded-lg overflow-hidden">
        {/* Left side with image + overlay */}
        <div className="relative w-1/2 h-full hidden md:block">
          <img
            src={maybe4}
            alt="Login Background"
            className="absolute  inset-0 w-full h-full object-cover z-0"
          />
          <div className="absolute   z-10 flex items-center justify-center px-6 text-center">
            <h2 className="text-white text-3xl font-bold leading-snug z-20 max-w-[80%]">
              TRAVEL IS THE ONLY THING YOU BUY THAT MAKES YOU RICHER
            </h2>
          </div>
        </div>

        <form
          onSubmit={handleLogin}
          className="w-full md:w-1/2 bg-white p-8 flex flex-col justify-center gap-6"
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

          <button
            type="submit"
            className="bg-[#4c6444] text-white py-2 rounded hover:bg-[#3e5338] transition"
          >
            Login
          </button>

          <p className="text-center text-sm">
            Don’t have an account?{" "}
            <span
              onClick={goToRegister}
              className="text-blue-700 hover:underline cursor-pointer"
            >
              Register here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
