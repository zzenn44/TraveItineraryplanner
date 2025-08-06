// import React, { useEffect, useState } from 'react';
// import { useAuth } from '../context/AuthContext';
// import axios from 'axios';

// const SavedItinerariesPage = () => {
//   const { user } = useAuth(); 
//   const [savedItineraries, setSavedItineraries] = useState([]);
//   const [destinationsMap, setDestinationsMap] = useState({});

//   useEffect(() => {
//     const fetchSaved = async () => {
//       try {
//         const res = await axios.get(`http://localhost:8000/saved/${user.id}`);
//         setSavedItineraries(res.data.itineraries);  
//       } catch (err) {
//         console.error("Failed to fetch saved itineraries", err);
//       }
//     };

//     if (user) fetchSaved();
//   }, [user]);
//   useEffect(() => {
//     const fetchDestinations = async () => {
//       try {
//         const res = await axios.get("http://localhost:8000/destinations");
//         const map = {};
//         res.data.destinations.forEach(dest => {
//           map[dest.name] = dest;
//         });
//         setDestinationsMap(map);
//       } catch (err) {
//         console.error("Failed to fetch destinations", err);
//       }
//     };

//     fetchDestinations();
//   }, []);

//   const removeItinerary = async (id) => {
//     try {
//       console.log("Attempting to remove itinerary:", id); 
//       await axios.delete(`http://localhost:8000/saved/remove/${user.id}/${id}`);
//       setSavedItineraries(prev => prev.filter(item => item._id !== id));
//     } catch (err) {
//       console.error("Failed to remove itinerary:", err.response?.data || err.message);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">Saved Itineraries</h2>
//       {savedItineraries.length === 0 ? (
//         <p>No itineraries saved yet.</p>
//       ) : (
//         savedItineraries.map(itinerary => (
//           <div key={itinerary._id} className="mb-4 p-4 border rounded shadow">
//             <h3 className="text-lg font-semibold">{itinerary.title}</h3>

//             <p><strong>Duration:</strong> {itinerary.duration_days || "N/A"} days</p>
//             <p><strong>Max Elevation:</strong> {itinerary.max_elevation_m || "N/A"} meters</p>
//             <p><strong>Difficulty:</strong> {itinerary.difficulty || "N/A"}</p>
//             <p><strong>Rating:</strong> {itinerary.rating || "N/A"}</p>
//             <p><strong>Budget Estimate:</strong> {itinerary.budget_estimate || "N/A"}</p>
//             <p>
//       <strong>Permit Required (Nepali):</strong>{" "}
//       {itinerary.permit_required_nepali ? "Yes" : "No"}
//     </p>
//     <p><strong>Days:</strong> {itinerary.days_count || 0}</p>

//     <div className="mt-4">
//               <h4 className="font-semibold text-gray-700">Destinations:</h4>
//               {itinerary.days && itinerary.days.length > 0 ? (
//                 itinerary.days.map((day, index) => (
//                   <div key={index} className="ml-4 mt-2">
//                     <p className="font-medium">Day {day.day}: {day.label}</p>
//                     {day.destinations.map((city) => {
//                       const dest = destinationsMap[city];
//                       return (
//                         <div key={city} className="pl-4 mt-1 border-l-2 border-green-600">
//                           <p><strong>{city}</strong>: {dest?.description || "No description available."}</p>
//                           {dest?.photos?.[0] && (
//                             <img src={dest.photos[0]} alt={city} className="w-48 h-32 object-cover mt-1 rounded shadow" />
//                           )}
//                         </div>
//                       );
//                     })}
//                   </div>
//                 ))
//               ) : (
//                 <p>No daily breakdown available.</p>
//               )}
//             </div>

         






//     <button
        
//               className="mt-2 text-red-600"
//               onClick={() => {
//                 console.log("Attempting to remove itinerary ID:", itinerary._id); 
//                 removeItinerary(itinerary._id);
//               }}  
//             >
//               Remove
//             </button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default SavedItinerariesPage;



import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const SavedItinerariesPage = () => {
  const { user } = useAuth();
  const [savedItineraries, setSavedItineraries] = useState([]);
  const [destinationsMap, setDestinationsMap] = useState({});

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/saved/${user.id}`);
        setSavedItineraries(res.data.itineraries);  
      } catch (err) {
        console.error("Failed to fetch saved itineraries", err);
      }
    };

    if (user) fetchSaved();
  }, [user]);

  // useEffect(() => {
  //   const fetchDestinations = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:8000/destinations");
  //       const map = {};
  //       res.data.destinations.forEach(dest => {
  //         map[dest.name] = dest;
  //       });
  //       setDestinationsMap(map);
  //     } catch (err) {
  //       console.error("Failed to fetch destinations", err);
  //     }
  //   };

  //   fetchDestinations();
  // }, []);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await axios.get("http://localhost:8000/destinations");
        const map = {};
        
        // Add null check and provide a default empty array
        const destinations = res.data?.destinations || [];
        
        destinations.forEach(dest => {
          // Add additional null checks
          if (dest && dest.name) {
            map[dest.name] = dest;
          }
        });
        
        setDestinationsMap(map);
      } catch (err) {
        console.error("Failed to fetch destinations", err);
        // Optionally set an empty map or handle the error
        setDestinationsMap({});
      }
    };
  
    fetchDestinations();
  }, []);

  const removeItinerary = async (id) => {
    try {
      console.log("Attempting to remove itinerary:", id);
      await axios.delete(`http://localhost:8000/saved/remove/${user.id}/${id}`);
      setSavedItineraries(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      console.error("Failed to remove itinerary:", err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#CABA9C] p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-[#4c6444] mb-6">Saved Itineraries</h2>
        {savedItineraries.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <p className="text-gray-600 text-lg">No itineraries saved yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {savedItineraries.map(itinerary => (
              <div key={itinerary._id} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-2xl font-bold text-[#4c6444] mb-4">{itinerary.title}</h3>

                {/* Basic Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Duration</div>
                    <div className="font-semibold text-[#4c6444]">
                      {itinerary.duration_days || itinerary.duration || "N/A"} days
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Max Elevation</div>
                    <div className="font-semibold text-[#4c6444]">
                      {itinerary.max_elevation_m || itinerary.elevation || "N/A"}m
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Difficulty</div>
                    <div className="font-semibold text-[#4c6444]">{itinerary.difficulty || "N/A"}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Budget</div>
                    <div className="font-semibold text-[#4c6444]">
                      {itinerary.budget_estimate || itinerary.cost || "N/A"}
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="mb-4 flex flex-wrap gap-4 text-sm">
                  <span className="bg-gray-100 px-3 py-1 rounded-full">
                    <strong>Rating:</strong> {itinerary.rating || "N/A"}
                  </span>
                  <span className="bg-gray-100 px-3 py-1 rounded-full">
                    <strong>Permit Required:</strong> {itinerary.permit_required_nepali ? "Yes" : "No"}
                  </span>
                  <span className="bg-gray-100 px-3 py-1 rounded-full">
                    <strong>Days Count:</strong> {itinerary.days_count || itinerary.days?.length || 0}
                  </span>
                </div>

                {/* Destinations Overview */}
                {(itinerary.destinations && itinerary.destinations.length > 0) && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-700 mb-3">Trek Route:</h4>
                    <div className="flex flex-wrap items-center gap-2">
                      {itinerary.destinations.map((destination, i) => (
                        <React.Fragment key={i}>
                          <span className="bg-[#4c6444] text-white px-3 py-1 rounded-full text-sm font-medium">
                            {destination}
                          </span>
                          {i < itinerary.destinations.length - 1 && (
                            <span className="text-[#4c6444] font-bold text-lg">→</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                )}

                {/* Overview */}
                {itinerary.overview && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-700 mb-2">Overview:</h4>
                    <p className="text-gray-600 leading-relaxed">{itinerary.overview}</p>
                  </div>
                )}

                {/* Daily Breakdown */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 mb-4">Daily Itinerary:</h4>
                  {itinerary.days && itinerary.days.length > 0 ? (
                    <div className="space-y-4">
                      {itinerary.days.map((day, index) => (
                        <div key={index} className="border-l-4 border-[#4c6444] pl-6 relative">
                          <div className="absolute -left-3 top-0 bg-[#4c6444] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                            {day.day}
                          </div>
                         
                          <h5 className="font-medium text-[#4c6444] mb-2">
                            Day {day.day}: {day.label}
                          </h5>

                          {/* Route/Destinations */}
                          {day.destinations && day.destinations.length > 0 && (
                            <div className="mb-3">
                              <p className="text-sm font-medium text-gray-700 mb-2">Route:</p>
                              <div className="flex flex-wrap items-center gap-2 mb-3">
                                {day.destinations.map((destination, i) => (
                                  <React.Fragment key={i}>
                                    <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                                      {destination}
                                    </span>
                                    {i < day.destinations.length - 1 && (
                                      <span className="text-[#4c6444] font-bold">→</span>
                                    )}
                                  </React.Fragment>
                                ))}
                              </div>
                             
                              {/* Destination Details */}
                              <div className="grid gap-3">
                                {day.destinations.map((city) => {
                                  const dest = destinationsMap[city];
                                  return (
                                    <div key={city} className="bg-gray-50 p-3 rounded-lg">
                                      <h6 className="font-medium text-gray-800">{city}</h6>
                                      <p className="text-gray-600 text-sm">
                                        {dest?.description || "No description available."}
                                      </p>
                                      {dest?.photos?.[0] && (
                                        <img
                                          src={dest.photos[0]}
                                          alt={city}
                                          className="w-full h-32 object-cover mt-2 rounded shadow"
                                        />
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* Activities */}
                          {day.activities && day.activities.length > 0 && (
                            <div className="mb-3">
                              <p className="text-sm font-medium text-gray-700 mb-2">Activities:</p>
                              <ul className="space-y-1">
                                {day.activities.map((activity, i) => (
                                  <li key={i} className="flex items-start text-sm">
                                    <span className="text-[#4c6444] mr-2">•</span>
                                    <span className="text-gray-600">{activity}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Description */}
                          {day.description && (
                            <p className="text-gray-600 text-sm mb-3">{day.description}</p>
                          )}

                          {/* Accommodation */}
                          {day.accommodationRecommendation && (
                            <div className="bg-blue-50 p-2 rounded text-sm">
                              <span className="text-blue-700">
                                🏠 <strong>Accommodation:</strong> {day.accommodationRecommendation}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No daily breakdown available.</p>
                  )}
                </div>

                {/* Remove Button */}
                <div className="text-right">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                    onClick={() => {
                      console.log("Attempting to remove itinerary ID:", itinerary._id);
                      removeItinerary(itinerary._id);
                    }}  
                  >
                    Remove Itinerary
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedItinerariesPage;
