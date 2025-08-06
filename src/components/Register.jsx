import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import registerBg from "../assets/loginpagepic.jpg";

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
    preferences: "" // comma-separated string
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    <div className="min-h-screen bg-[#f5f5f5] flex p-8 items-center justify-center">
      <div className="flex w-full h-full shadow-lg rounded-lg overflow-hidden">
        {/* Left side with image */}
        <div className="w-1/2 relative hidden md:block">
          <img src={registerBg} alt="Register" className="object-cover h-full w-full" />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-start pt-20 px-6 text-center">
            <h2 className="text-white text-2xl font-bold font-baloo drop-shadow-xl tracking-wide">
              ADVENTURE BEGINS WHERE PLANS END
            </h2>
          </div>
        </div>

        {/* Right side form */}
        <form
          onSubmit={handleRegister}
          className="w-full md:w-1/2 bg-[#CABA9C] p-8 flex flex-col justify-center gap-4"
        >
          <h2 className="text-[#2f3c25] text-3xl font-extrabold font-baloo text-center">
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
