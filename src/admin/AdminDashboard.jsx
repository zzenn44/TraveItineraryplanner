
import React, { useEffect, useState } from "react";
import { 
  FaUsers, 
  FaMapMarkedAlt, 
  FaRoute, 
  FaPlus, 
  FaEdit, 
  FaTrash 
} from "react-icons/fa";
import Sidebar from "./Sidebar";
import api from "../api/apiclient.js";


const AdminOperationCard = ({ title, description, icon, actions }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 group">
      <div className="text-4xl mb-4 text-[#4c6444] group-hover:text-[#3a5033] transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-[#4c6444] mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="space-y-2">
        {actions.map((action, index) => (
          <div 
            key={index} 
            className="flex items-center text-gray-700 hover:text-[#4c6444] transition-colors"
          >
            <FaPlus className="mr-2 text-green-500" />
            {action}
          </div>
        ))}
      </div>
    </div>
  );
};

// Statistics Card Component
const StatisticsCard = ({ label, value, bgColor, textColor }) => {
  return (
    <div className={`${bgColor} p-4 rounded-md shadow-sm`}>
      <h3 className={`font-bold ${textColor}`}>{label}</h3>
      <p className={`text-2xl ${textColor}`}>{value}</p>
    </div>
  );
};

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const getStats = async () => {
    try {
      const res = await api.get("/admin/stats");
      setStats(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch stats", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  const adminOperations = [
    {
      title: "Destination Management",
      description: "Comprehensive destination control",
      icon: <FaMapMarkedAlt />,
      actions: [
        "Add new destinations",
        "Edit destination details",
        "Remove destinations"
      ]
    },
    {
      title: "Location Management",
      description: "Manage location information",
      icon: <FaRoute />,
      actions: [
        "Create new locations",
        "Update location details",
        "Delete locations"
      ]
    },

    {
      title: "Itinerary Management",
      description: "Create and manage itineraries",
      icon: <FaEdit />,
      actions: [
        "Create new itinerary",
        "Edit itinerary details",
        "Delete itineraries"
      ]
    }
  ];

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8 bg-[#f5f5f5] min-h-screen">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-[#4c6444] mb-6">
            Admin Dashboard
          </h1>

          {/* Welcome and Stats Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-[#4c6444] mb-2">
              Welcome back, Admin
            </h2>
            <p className="text-gray-600 mb-6">
              Here’s a quick overview of your platform. Use the cards below to navigate and manage content efficiently.
            </p>

            {/* Stats Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-gray-100 h-24 rounded-md" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatisticsCard
                  label="Users"
                  value={stats?.users ?? 0}
                  bgColor="bg-[#e8f0e6]"
                  textColor="text-[#3a5033]"
                />
                <StatisticsCard
                  label="Destinations"
                  value={stats?.destinations ?? 0}
                  bgColor="bg-[#e8f0e6]"
                  textColor="text-[#3a5033]"
                />
                <StatisticsCard
                  label="Locations"
                  value={stats?.locations ?? 0}
                  bgColor="bg-[#e8f0e6]"
                  textColor="text-[#3a5033]"
                />
                <StatisticsCard
                  label="Itineraries"
                  value={stats?.itineraries ?? 0}
                  bgColor="bg-[#e8f0e6]"
                  textColor="text-[#3a5033]"
                />
              </div>
            )}
          </div>

          {/* Admin Operations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {adminOperations.map((op, idx) => (
              <AdminOperationCard
                key={idx}
                title={op.title}
                description={op.description}
                icon={op.icon}
                actions={op.actions}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
