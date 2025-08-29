
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LandingPage from "./LandingPage";

export default function FirstPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    setShowPopup(location.pathname === "/");
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen">
      <div className="brightness-110">
        <LandingPage />
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-2xl shadow-lg p-12 w-[500px] max-w-[90vw] text-center">
            <h1 className="text-4xl font-bold mb-8" style={{ color: "#4c6444" }}>
              Welcome to TripPal
            </h1>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="w-full mb-5 p-5 rounded-lg text-white font-semibold"
              style={{ backgroundColor: "#4c6444" }}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="w-full p-5 rounded-lg text-white font-semibold"
              style={{ backgroundColor: "#4c6444" }}
            >
              Register
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
