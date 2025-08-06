import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-[#e9ebd5]  p-4 shadow-md flex justify-between items-center">
      <div
        className="text-[#4c6444] font-bold text-2xl cursor-pointer"
        onClick={() => navigate("/")}
      >
        TripPal
      </div>

      <div className="space-x-6 text-[#4c6444] font-medium flex items-center">
        <a href="#features" className="hover:underline">
          Features
        </a>
        <a href="#categories" className="hover:underline">
          Categories
        </a>
        <a href="#explore" className="hover:underline">
          Explore
        </a>

        {user ? (
          <>
            <span className="text-sm">Hi, {user.name || user.email}</span>
            <button
              onClick={logout}
              className="bg-[#4c6444] text-white px-3 py-1 rounded hover:bg-[#3e5338]"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-[#4c6444] text-white px-4 py-1 rounded hover:bg-[#3e5338]"
          >
            Log Out
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
