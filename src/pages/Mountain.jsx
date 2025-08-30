
import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import chuluwestpeakclimbImg from "../assets/chulu.jpeg";
import islandpeakclimbImg from "../assets/island.jpeg";
import lobuchepeakclimbImg from "../assets/lobuche.jpeg";
import merapeaktrekclimbImg from "../assets/mera.jpeg";
import nayakangapeakclimbImg from "../assets/nayakanga.jpeg";
import pikeypeaktrekImg from "../assets/pikeypeak.jpeg";
import pisangpeakclimbImg from "../assets/pisang.jpeg";
import yalapeakclimbImg from "../assets/yala.jpeg";




const mountainImageMap = {
  "Chulu West Peak Climb": chuluwestpeakclimbImg,
  "Island Peak Climb": islandpeakclimbImg,
  "Lobuche Peak Climb": lobuchepeakclimbImg,
  "Mera Peak Trek & Climb":  merapeaktrekclimbImg,
  "Naya Kanga Peak Climb": nayakangapeakclimbImg,
  "Pikey Peak Trek": pikeypeaktrekImg,
  "Pisang Peak Climb": pisangpeakclimbImg,
  "Yala Peak Climb": yalapeakclimbImg,
};

const Mountain = () => {
  const [mountains, setMountains] = useState([]);
  const [selectedMountain, setSelectedMountain] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMountains = async () => {
      try {
        const response = await fetch('http://localhost:8000/category/peak');
        if (!response.ok) {
          throw new Error('Failed to fetch mountain treks');
        }
        const data = await response.json();
        setMountains(data);
        setLoading(false);
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to load mountain treks');
        setLoading(false);
      }
    };

    fetchMountains();
  }, []);

  const openModal = (mountain) => {
    setSelectedMountain(mountain);
  };

  const closeModal = () => {
    setSelectedMountain(null);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
          <div className="text-2xl text-[#4c6444]">Loading mountain treks...</div>
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
        <h1 className="text-3xl font-bold text-center text-[#4c6444] mb-10">Mountain Peak Climbs in Nepal</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
          {mountains.map((mountain) => (
            <div key={mountain.id} onClick={() => openModal(mountain)} className="cursor-pointer">
              <Card
                name={mountain.title}
                description={`${mountain.duration_days} days trek - ${mountain.difficulty}`}
                image={mountainImageMap[mountain.title] || 'chulu.jpeg'}
              />
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedMountain && (
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
              <h2 className="text-4xl font-bold text-[#4c6444] mb-6">{selectedMountain.title}</h2>

              <div className="bg-[#e9ebd5] rounded-2xl p-6 space-y-4">
                <p><strong>Duration:</strong> {selectedMountain.duration_days} days</p>
                <p><strong>Difficulty level:</strong> {selectedMountain.difficulty}</p>
                <p><strong>Maximum elevation:</strong> {selectedMountain.max_elevation_m}m</p>
                <p><strong>Estimated Budget:</strong> NPR {selectedMountain.budget_estimate}</p>

                {selectedMountain.days && (
                  <>
                    <h3 className="font-semibold text-[#4c6444] text-lg">Climbing Route:</h3>
                    <div className="space-y-2">
                      {selectedMountain.days.map((day, idx) => (
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

                {selectedMountain.permit_required_nepali !== undefined && (
                  <div>
                    <p>
                      <strong>Climbing Permit Required:</strong> {selectedMountain.permit_required_nepali ? 'Yes' : 'No'}
                    </p>
                    {selectedMountain.permit_fee_npr && (
                      <p><strong>Permit Fee:</strong> NPR {selectedMountain.permit_fee_npr}</p>
                    )}
                  </div>
                )}

                {selectedMountain.emergency_contacts && (
                  <>
                    <h3 className="font-semibold text-[#4c6444] text-lg">Emergency Contacts:</h3>
                    <ul className="list-none space-y-1">
                      {Object.entries(selectedMountain.emergency_contacts).map(([name, contact]) => (
                        <li key={name}>
                          <strong>{name}:</strong> Tel: {contact.tel}, Email: {contact.email}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {selectedMountain.rating && (
                  <p><strong>Peak Rating:</strong> {selectedMountain.rating}/5</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Mountain;
