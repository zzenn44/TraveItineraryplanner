import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import everestbaseImg from "../assets/everestbase.jpeg";
import annapurnabaseImg from "../assets/annapurnabase.jpeg";
import saipalbasecampImg from "../assets/saipal.jpeg"; 
import mardibasecampImg from "../assets/mardi.jpeg"; 
import kanchenjungabasecampImg from "../assets/kangchenjungabase.jpeg";
import dhaulagiricircuitImg from "../assets/dhaulagiribase.jpeg";
import apibasecampImg from "../assets/api.jpeg";
import makalubarunnationalparkImg from "../assets/makalubase.jpeg";



const baseCampImageMap = {
  "Everest Base Camp Trek": everestbaseImg,
  "Annapurna Base Camp Trek": annapurnabaseImg,
  "Makalu Barun National Park Trek":makalubarunnationalparkImg ,
  "Kanchenjunga Base Camp Trek": kanchenjungabasecampImg,
  "Dhaulagiri Circuit Trek": dhaulagiricircuitImg,
  "Mardi Base Camp Trek": mardibasecampImg,
  "Api Base Camp Trek": apibasecampImg,
  "Saipal Base Camp Trek": saipalbasecampImg
};

const BaseCamp = () => {
  const [baseCamps, setBaseCamps] = useState([]);
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBaseCamps = async () => {
      try {
        const response = await fetch('http://localhost:8000/category/basecamp');
        if (!response.ok) {
          throw new Error('Failed to fetch base camp treks');
        }
        const data = await response.json();
        setBaseCamps(data);
        setLoading(false);
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to load base camp treks');
        setLoading(false);
      }
    };

    fetchBaseCamps();
  }, []);

  const openModal = (camp) => {
    setSelectedCamp(camp);
  };

  const closeModal = () => {
    setSelectedCamp(null);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
          <div className="text-2xl text-[#4c6444]">Loading base camp treks...</div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
          <div className="text-xl text-red-600">{error}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f5f5f5] px-6 py-12">
        <h1 className="text-3xl font-bold text-center text-[#4c6444] mb-10">Base Camps of Nepal</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
          {baseCamps.map((camp) => (
            <div key={camp.id} onClick={() => openModal(camp)} className="cursor-pointer">
              <Card
                name={camp.title}
                description={`${camp.duration_days} days trek - ${camp.difficulty}`}
                image={baseCampImageMap[camp.title] || 'api.jpeg'}
              />
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedCamp && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={closeModal}
          >
            <div
              className="bg-white max-w-3xl w-[90vw] max-h-[90vh] overflow-y-auto rounded-3xl p-8 shadow-lg relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-[#4c6444] font-bold text-2xl hover:text-[#3e5338]"
                aria-label="Close"
              >
                &times;
              </button>
              <h2 className="text-4xl font-bold text-[#4c6444] mb-6">{selectedCamp.title}</h2>

              <div className="bg-[#e9ebd5] rounded-2xl p-6 space-y-4">
                <p><strong>Duration:</strong> {selectedCamp.duration_days} days</p>
                <p><strong>Difficulty level:</strong> {selectedCamp.difficulty}</p>
                <p><strong>Maximum elevation:</strong> {selectedCamp.max_elevation_m}m</p>
                <p><strong>Estimated Budget:</strong> NPR {selectedCamp.budget_estimate}</p>

                {selectedCamp.days && (
                  <>
                    <h3 className="font-semibold text-[#4c6444] text-lg">Trek Route:</h3>
                    <div className="space-y-2">
                      {selectedCamp.days.map((day, idx) => (
                        <div key={idx} className="border-l-2 border-[#4c6444] pl-4">
                          <p className="font-medium">Day {day.day}</p>
                          <p className="text-gray-700">
                            {day.destinations.join(" → ")}
                          </p>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {selectedCamp.permit_required_nepali !== undefined && (
                  <div>
                    <p>
                      <strong>Permit Required for Nepalese:</strong> {selectedCamp.permit_required_nepali ? 'Yes' : 'No'}
                    </p>
                    {selectedCamp.permit_fee_npr && (
                      <p><strong>Permit Fee:</strong> NPR {selectedCamp.permit_fee_npr}</p>
                    )}
                  </div>
                )}

                {selectedCamp.emergency_contacts && (
                  <>
                    <h3 className="font-semibold text-[#4c6444] text-lg">Emergency Contacts:</h3>
                    <ul className="list-none space-y-1">
                      {Object.entries(selectedCamp.emergency_contacts).map(([name, contact]) => (
                        <li key={name}>
                          <strong>{name}:</strong> Tel: {contact.tel}, Email: {contact.email}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {selectedCamp.rating && (
                  <p><strong>Trek Rating:</strong> {selectedCamp.rating}/5</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BaseCamp;