import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import annapurnaImg from "../assets/annapurnabase.jpeg";
import manasluImg from "../assets/manaslubase.jpeg";
import threePassesImg from "../assets/three.jpeg";
import dhaulagiriImg from "../assets/dhaulagiribase.jpeg";
import rolwalingImg from "../assets/rolwaling.jpeg";
import langtanggosainkundaImg from "../assets/gosainkunda.jpeg";
import makaluImg from "../assets/makalubase.jpeg";
import jomsongmuktinathImg from "../assets/yala.jpeg";
import guerillaImg from "../assets/guerilla.jpeg"



const normalize = (title = "") => 
  title
     .trim()
    .toLowerCase()
    .replace(/\s+/g, '')     
    .replace(/trek$/i, '')   
    .trim();



const circuitImageMap = {
  "Annapurna Circuit Trek": annapurnaImg,
  "Manaslu Circuit Trek": manasluImg,
  "Three Passes Trek": threePassesImg,
  "Langtang Gosaikunda Trek": langtanggosainkundaImg,
  "Dhaulagiri Circuit Trek": dhaulagiriImg,
  "Rolwaling Valley Trek": rolwalingImg,
  "Makalu Barun Trek": makaluImg,
  "Jomsom Muktinath Trek": jomsongmuktinathImg,
  "Guerilla Trek": guerillaImg
};

const Circuit = () => {
  const [circuits, setCircuits] = useState([]);
  const [selectedCircuit, setSelectedCircuit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCircuits = async () => {
      try {
        const response = await fetch('http://localhost:8000/category/circuit');
        if (!response.ok) {
          throw new Error('Failed to fetch circuit treks');
        }
        const data = await response.json();
        setCircuits(data);
        setLoading(false);
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to load circuit treks');
        setLoading(false);
      }
    };

    fetchCircuits();
  }, []);

  const openModal = (circuit) => {
    setSelectedCircuit(circuit);
  };

  const closeModal = () => {
    setSelectedCircuit(null);
  };

  
  const getCircuitImage = (title) => {
  if (!title) return annapurnaImg;
  
  const normalizedTitle = normalize(title);
  
  // Direct match
  if (circuitImageMap[title]) return circuitImageMap[title];
  
  // Normalized match
  for (const [mapKey, image] of Object.entries(circuitImageMap)) {
    if (normalize(mapKey) === normalizedTitle) {
      return image;
    }
  }
  
  // Partial match
  for (const [mapKey, image] of Object.entries(circuitImageMap)) {
    if (normalizedTitle.includes(normalize(mapKey)) || 
        normalize(mapKey).includes(normalizedTitle)) {
      return image;
    }
  }
  
  return annapurnaImg;
};


  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
          <div className="text-2xl text-[#4c6444]">Loading circuit treks...</div>
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
        <h1 className="text-3xl font-bold text-center text-[#4c6444] mb-10">Trekking Circuits in Nepal</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
          {circuits.map((circuit) => {
            const imageUrl = getCircuitImage(circuit.title);
            console.log(`Circuit: ${circuit.title}, Image URL:`, imageUrl); // Debug log
            
            return (
              <div 
                key={circuit.id} 
                onClick={() => openModal(circuit)} 
                className="cursor-pointer w-full max-w-sm"
              >
                <Card
                  name={circuit.title}
                  description={`${circuit.duration_days} days trek - ${circuit.difficulty}`}
                  image={imageUrl}
                />
              </div>
            );
          })}
        </div>

        {/* Modal */}
        {selectedCircuit && (
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
              <h2 className="text-4xl font-bold text-[#4c6444] mb-6">{selectedCircuit.title}</h2>

              <div className="bg-[#e9ebd5] rounded-2xl p-6 space-y-4">
                <p><strong>Duration:</strong> {selectedCircuit.duration_days} days</p>
                <p><strong>Difficulty level:</strong> {selectedCircuit.difficulty}</p>
                <p><strong>Maximum elevation:</strong> {selectedCircuit.max_elevation_m}m</p>
                <p><strong>Estimated Budget:</strong> NPR {selectedCircuit.budget_estimate}</p>

                {selectedCircuit.days && (
                  <>
                    <h3 className="font-semibold text-[#4c6444] text-lg">Circuit Route:</h3>
                    <div className="space-y-2">
                      {selectedCircuit.days.map((day, idx) => (
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

                {selectedCircuit.permit_required_nepali !== undefined && (
                  <div>
                    <p>
                      <strong>Permit Required for Nepalese:</strong> {selectedCircuit.permit_required_nepali ? 'Yes' : 'No'}
                    </p>
                    {selectedCircuit.permit_fee_npr && (
                      <p><strong>Permit Fee:</strong> NPR {selectedCircuit.permit_fee_npr}</p>
                    )}
                  </div>
                )}

                {selectedCircuit.emergency_contacts && (
                  <>
                    <h3 className="font-semibold text-[#4c6444] text-lg">Emergency Contacts:</h3>
                    <ul className="list-none space-y-1">
                      {Object.entries(selectedCircuit.emergency_contacts).map(([name, contact]) => (
                        <li key={name}>
                          <strong>{name}:</strong> Tel: {contact.tel}, Email: {contact.email}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {selectedCircuit.rating && (
                  <p><strong>Trek Rating:</strong> {selectedCircuit.rating}/5</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Circuit;