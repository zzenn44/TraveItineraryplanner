import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import rolwalingvalleyImg from "../assets/rolwaling.jpeg"
import tsumvalleyImg from "../assets/tsum.jpeg"
import narphuvalleyImg from "../assets/narphu.jpeg"
import gokyovalleyImg from "../assets/gokyo.jpeg"
import upperdolpovalleyImg from "../assets/dolpo.jpeg"
import tamangheritagetrailImg from "../assets/tamang.jpeg"
import dhorpatanhuntingImg from "../assets/dhorpatan.jpeg"
import khaptadnationalparkImg from "../assets/khaptad.jpeg"
import helambuImg from "../assets/hekambu.jpeg"


const valleyImageMap = {
  
  "Rolwaling Valley Trek": rolwalingvalleyImg,
  "Tsum Valley Trek": tsumvalleyImg,
  "Nar Phu Valley Trek": narphuvalleyImg,
  "Gokyo Valley Trek": gokyovalleyImg,
  "Upper Dolpo Trek": upperdolpovalleyImg,
 "Tamang Heritage Trail" :tamangheritagetrailImg,
  "Dhorpatan Hunting Reserve Trek": dhorpatanhuntingImg,
  "Khaptad National Park Trek":khaptadnationalparkImg ,
  "Helambu Trek": helambuImg

};

const Valley = () => {
  const [valleys, setValleys] = useState([]);
  const [selectedValley, setSelectedValley] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchValleys = async () => {
      try {
        const response = await fetch('http://localhost:8000/category/valley');
        if (!response.ok) {
          throw new Error('Failed to fetch valley treks');
        }
        const data = await response.json();
        setValleys(data);
        setLoading(false);
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to load valley treks');
        setLoading(false);
      }
    };

    fetchValleys();
  }, []);

  const openModal = (valley) => {
    setSelectedValley(valley);
  };

  const closeModal = () => {
    setSelectedValley(null);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
          <div className="text-2xl text-[#4c6444]">Loading valley treks...</div>
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
        <h1 className="text-3xl font-bold text-center text-[#4c6444] mb-10">Valley Treks in Nepal</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
          {valleys.map((valley) => (
            <div key={valley.id} onClick={() => openModal(valley)} className="cursor-pointer">
              <Card
                name={valley.title}
                description={`${valley.duration_days} days trek - ${valley.difficulty}`}
                image={valleyImageMap[valley.title] || 'ruby.jpeg'}
              />
            </div>
          ))}
        </div>

        {/* Modal for detailed view */}
        {selectedValley && (
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
              <h2 className="text-4xl font-bold text-[#4c6444] mb-6">{selectedValley.title}</h2>

              <div className="bg-[#e9ebd5] rounded-2xl p-6 space-y-4">
                <p><strong>Duration:</strong> {selectedValley.duration_days} days</p>
                <p><strong>Difficulty level:</strong> {selectedValley.difficulty}</p>
                <p><strong>Maximum elevation:</strong> {selectedValley.max_elevation_m}m</p>
                <p><strong>Estimated Budget:</strong> NPR {selectedValley.budget_estimate}</p>

                {selectedValley.days && (
                  <>
                    <h3 className="font-semibold text-[#4c6444] text-lg">Valley Route:</h3>
                    <div className="space-y-2">
                      {selectedValley.days.map((day, idx) => (
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

                {selectedValley.permit_required_nepali !== undefined && (
                  <div>
                    <p>
                      <strong>Permit Required:</strong> {selectedValley.permit_required_nepali ? 'Yes' : 'No'}
                    </p>
                    {selectedValley.permit_fee_npr && (
                      <p><strong>Permit Fee:</strong> NPR {selectedValley.permit_fee_npr}</p>
                    )}
                  </div>
                )}

                {selectedValley.emergency_contacts && (
                  <>
                    <h3 className="font-semibold text-[#4c6444] text-lg">Emergency Contacts:</h3>
                    <ul className="list-none space-y-1">
                      {Object.entries(selectedValley.emergency_contacts).map(([name, contact]) => (
                        <li key={name}>
                          <strong>{name}:</strong> Tel: {contact.tel}, Email: {contact.email}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {selectedValley.rating && (
                  <p><strong>Trek Rating:</strong> {selectedValley.rating}/5</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Valley;