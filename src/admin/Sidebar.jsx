import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="bg-[#4c6444] text-white w-64 min-h-screen p-6 font-baloo">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <nav className="space-y-4">
        <Link to="/admin/analytics" className="block hover:underline">Dashboard</Link>
        <Link to="/admin/itineraries" className="block hover:underline">Itineraries</Link>
        <Link to="/admin/destinations" className="block hover:underline">Destinations</Link>
        <Link to="/admin/locations" className="block hover:underline">Locations</Link>
        <Link to="/admin/users" className="block hover:underline">Users</Link>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </nav>
    </div>
  );
}
