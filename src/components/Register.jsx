import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import maybe4 from "../assets/maybe4.jpg"; 

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    nationality: "",
    travelStyle: "",
    preferences: "" 
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          age: Number(formData.age),
          nationality: formData.nationality,
          travelStyle: formData.travelStyle,
          preferences: formData.preferences.split(",").map((p) => p.trim())
        })
      });

      if (res.ok) {
        alert("Registration successful!");
        navigate("/");
      } else {
        const errData = await res.json();

        if (Array.isArray(errData.detail)) {
          const message = errData.detail
            .map((err) => {
              const field = err.loc?.[1] || "field";
              return `${field}: ${err.msg}`;
            })
            .join("\n");
          alert("Registration failed:\n" + message);
        } else if (typeof errData.detail === "string") {
          alert("Registration failed: " + errData.detail);
        } else {
          alert("Registration failed.");
        }
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e9ebd5] p-8">
      <div className="flex w-full max-w-6xl h-[80vh] shadow-lg rounded-2xl overflow-hidden">
        {/* Left side with image + overlay */}
        <div className="relative w-1/2 h-full hidden md:block">
          <img
            src={maybe4}
            alt="Register Background"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
          <div className="absolute  z-10 flex items-center justify-center px-6 text-center">
            <h2 className="text-white text-3xl font-bold leading-snug z-20 max-w-[80%]">
              TRAVEL IS THE ONLY THING YOU BUY THAT MAKES YOU RICHER
            </h2>
          </div>
        </div>

        {/* Right side form */}
        <form
          onSubmit={handleRegister}
          className="w-full md:w-1/2 bg-white p-8 flex flex-col justify-center gap-6"
        >
          <h2 className="text-[#2f3c25] text-3xl font-extrabold font-baloo drop-shadow-2xl tracking-wide text-center">
            TripPal
          </h2>

          <input name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Full Name" className="px-4 py-2 border rounded" />
          <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email" className="px-4 py-2 border rounded" />
          <input name="password" value={formData.password} onChange={handleChange} type="password" placeholder="Password" className="px-4 py-2 border rounded" />
          <input name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} type="password" placeholder="Confirm Password" className="px-4 py-2 border rounded" />

          <input name="age" value={formData.age} onChange={handleChange} type="number" placeholder="Age" className="px-4 py-2 border rounded" />
          <input name="nationality" value={formData.nationality} onChange={handleChange} type="text" placeholder="Nationality" className="px-4 py-2 border rounded" />
          <input name="travelStyle" value={formData.travelStyle} onChange={handleChange} type="text" placeholder="Travel Style (e.g. Adventure, Luxury)" className="px-4 py-2 border rounded" />
          <input name="preferences" value={formData.preferences} onChange={handleChange} type="text" placeholder="Preferences (comma-separated)" className="px-4 py-2 border rounded" />

          <button type="submit" className="bg-[#4c6444] text-white py-2 rounded hover:bg-[#3e5338] transition">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
