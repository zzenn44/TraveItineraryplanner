// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// export default function RecommendedItineraries() {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [recommendations, setRecommendations] = useState([]);
//   const [savedIds, setSavedIds] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchRecommendations = async () => {
//       try {
//         const res = await axios.post(`http://localhost:8000/recommend/${user.id}`);
//         setRecommendations(res.data);
//       } catch (error) {
//         console.error("Error fetching recommendations:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (user) fetchRecommendations();
//   }, [user]);

//   const handleSave = async (itineraryId) => {
//     try {
//       await axios.post(`http://localhost:8000/saved/add/${user.id}/${itineraryId}`);
//       alert("Itinerary saved!");
//       navigate("/saved-itineraries"); // ✅ Redirect to saved list
//     } catch (err) {
//       console.error("Save failed:", err);
//       alert("Save failed.");
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Recommended Itineraries</h2>

//       {loading ? (
//         <p>Loading recommendations...</p>
//       ) : recommendations.length === 0 ? (
//         <p>No recommendations yet.</p>
//       ) : (
//         recommendations.map((trip) => (
//           <div key={trip._id} className="mb-4 p-4 border rounded shadow bg-white">
//             <h3 className="text-lg font-semibold">{trip.title}</h3>
//             <p><strong>Duration:</strong> {trip.duration_days} days</p>
//             <p><strong>Difficulty:</strong> {trip.difficulty}</p>
//             <p><strong>Rating:</strong> {trip.rating}</p>
//             <button
//               onClick={() => handleSave(trip._id)}
//               disabled={savedIds.includes(trip._id)}
//               className={`mt-2 px-4 py-2 rounded ${
//                 savedIds.includes(trip._id)
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-green-600 hover:bg-green-700 text-white"
//               }`}
//             >
//               {savedIds.includes(trip._id) ? "Saved ✅" : "Save"}
//             </button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }
