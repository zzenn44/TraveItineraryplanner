import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import gorepanipoonhillImg from "../assets/poonhill.jpeg";
import ghalegaunImg from "../assets/ghalegaun.jpeg";
import balthalivillageImg from "../assets/balthali.jpeg";
import amayangriImg from "../assets/amayangri.jpeg";
import khumaidandaImg from "../assets/khumai.jpeg";
import pikeypeaktrekImg from "../assets/pikeypeak.jpeg";
import panchaseImg from "../assets/panchase.jpeg";
import chepanghillImg from "../assets/chepang.jpeg";
import pathibharatempletaplejungImg from "../assets/pathibhara.jpeg";
import siklesImg from "../assets/sikles.jpeg";
import chisapaninagarkotImg from "../assets/chisapani.webp";
import sailungImg from "../assets/sailung.jpeg";



const shortTrekImageMap = {
  "Ghorepani Poon Hill Trek": gorepanipoonhillImg,
  "Ghalegaun Trek":ghalegaunImg ,
  "Balthali Village Trek": balthalivillageImg,
  "Ama Yangri Trek": amayangriImg,
  "Khumai Danda Trek": khumaidandaImg,
  "Panchase Trek": panchaseImg,
  "Chepang Hill Trek": chepanghillImg,
  "Pathibhara Temple Trek, Taplejung": pathibharatempletaplejungImg,
 "Pikey Peak Trek": pikeypeaktrekImg,
  "Sikles Trek": siklesImg,
  "Chisapani–Nagarkot Trek": chisapaninagarkotImg,
  "Sailung Trek": sailungImg
};

const Shorttrek = () => {
  const [shortTreks, setShortTreks] = useState([]);
  const [selectedTrek, setSelectedTrek] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShortTreks = async () => {
      try {
        const response = await fetch('http://localhost:8000/category/Short Trek');
        if (!response.ok) {
          throw new Error('Failed to fetch short treks');
        }
        const data = await response.json();
        setShortTreks(data);
        setLoading(false);
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to load short treks');
        setLoading(false);
      }
    };

    fetchShortTreks();
  }, []);

  const openModal = (trek) => {
    setSelectedTrek(trek);
  };

  const closeModal = () => {
    setSelectedTrek(null);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
          <div className="text-2xl text-[#4c6444]">Loading short treks...</div>
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
        <h1 className="text-3xl font-bold text-center text-[#4c6444] mb-10">Short Treks in Nepal</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
          {shortTreks.map((trek) => (
            <div key={trek.id} onClick={() => openModal(trek)} className="cursor-pointer">
              <Card
                name={trek.title}
                description={`${trek.duration_days} days trek - ${trek.difficulty}`}
                image={shortTrekImageMap[trek.title] || 'poonhill.jpeg'}
              />
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedTrek && (
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
              <h2 className="text-4xl font-bold text-[#4c6444] mb-6">{selectedTrek.title}</h2>

              <div className="bg-[#e9ebd5] rounded-2xl p-6 space-y-4">
                <p><strong>Duration:</strong> {selectedTrek.duration_days} days</p>
                <p><strong>Difficulty level:</strong> {selectedTrek.difficulty}</p>
                <p><strong>Maximum elevation:</strong> {selectedTrek.max_elevation_m}m</p>
                <p><strong>Estimated Budget:</strong> NPR {selectedTrek.budget_estimate}</p>

                {selectedTrek.days && (
                  <>
                    <h3 className="font-semibold text-[#4c6444] text-lg">Trek Route:</h3>
                    <div className="space-y-2">
                      {selectedTrek.days.map((day, idx) => (
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

                {selectedTrek.permit_required_nepali !== undefined && (
                  <div>
                    <p>
                      <strong>Permit Required:</strong> {selectedTrek.permit_required_nepali ? 'Yes' : 'No'}
                    </p>
                    {selectedTrek.permit_fee_npr && (
                      <p><strong>Permit Fee:</strong> NPR {selectedTrek.permit_fee_npr}</p>
                    )}
                  </div>
                )}

                {selectedTrek.emergency_contacts && (
                  <>
                    <h3 className="font-semibold text-[#4c6444] text-lg">Emergency Contacts:</h3>
                    <ul className="list-none space-y-1">
                      {Object.entries(selectedTrek.emergency_contacts).map(([name, contact]) => (
                        <li key={name}>
                          <strong>{name}:</strong> Tel: {contact.tel}, Email: {contact.email}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {selectedTrek.rating && (
                  <p><strong>Trek Rating:</strong> {selectedTrek.rating}/5</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Shorttrek;