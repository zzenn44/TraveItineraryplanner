// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const RecommendationsPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const recommendations = location.state?.recommendations;

//   console.log("Recommendations data:", recommendations);

//   // If no recommendations data, redirect back to form
//   if (!recommendations) {
//     console.log("No recommendations found, redirecting to preferences");
//     navigate("/preferences");
//     return null;
//   }

//   let trekList = [];

//   // Handle different response formats from the API
//   if (Array.isArray(recommendations)) {
//     // If recommendations is an array of objects
//     trekList = recommendations.map((trek, index) => ({
//       id: index,
//       name: trek.poi_name || trek.name || "Unknown Trek",
//       difficulty: trek.difficulty || "N/A",
//       elevation: trek.elevation || "N/A", 
//       duration: trek.duration || "N/A",
//       cost: trek.cost || "N/A",
//       similarity_score: trek.similarity_score || 0
//     }));
//   } else if (recommendations && typeof recommendations === 'object') {
//     // Handle pandas DataFrame-like structure (your current format)
//     if (recommendations.poi_name && typeof recommendations.poi_name === 'object') {
//       trekList = Object.keys(recommendations.poi_name).map((id) => ({
//         id,
//         name: recommendations.poi_name[id],
//         difficulty: recommendations.difficulty?.[id] || "N/A",
//         elevation: recommendations.elevation?.[id] || "N/A",
//         duration: recommendations.duration?.[id] || "N/A",
//         cost: recommendations.cost?.[id] || "N/A",
//         similarity_score: recommendations.similarity_score?.[id] || 0
//       }));
//     } else {
//       // Handle single recommendation object
//       trekList = [{
//         id: 0,
//         name: recommendations.poi_name || recommendations.name || "Unknown Trek",
//         difficulty: recommendations.difficulty || "N/A",
//         elevation: recommendations.elevation || "N/A",
//         duration: recommendations.duration || "N/A", 
//         cost: recommendations.cost || "N/A",
//         similarity_score: recommendations.similarity_score || 0
//       }];
//     }
//   }

//   console.log("Processed trek list:", trekList);

//   // If no valid trek data found
//   if (trekList.length === 0) {
//     console.error("No valid trek data found in recommendations:", recommendations);
//     return (
//       <div className="min-h-screen bg-[#CABA9C] flex items-center justify-center">
//         <div className="bg-white p-8 rounded-lg shadow-lg text-center">
//           <h2 className="text-2xl text-red-600 mb-4">No Recommendations Found</h2>
//           <p className="text-gray-700 mb-4">
//             We couldn't find any treks matching your preferences. Try adjusting your criteria.
//           </p>
//           <button
//             onClick={() => navigate("/preferences")}
//             className="bg-[#4c6444] text-white px-6 py-2 rounded hover:bg-[#3e5338]"
//           >
//             Back to Preferences
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Sort by similarity score (highest first)
//   trekList.sort((a, b) => b.similarity_score - a.similarity_score);

//   // const handleTrekClick = (trek) => {
//   //   navigate(`/itinerary/${trek.id}`, {
//   //     state: { trekDetails: trek }
//   //   });
//   // };
//   // const handleTrekClick = (trek) => {
//   //   navigate(`/itinerary/${trek._id}`, {
//   //     state: { trekDetails: trek }
//   //   });
    
//   // };
//   const handleTrekClick = (trek) => {
//     console.log("Clicked trek:", trek); // 👈 check if _id exists
//     navigate(`/itinerary/${trek._id}`, {
//       state: { trekDetails: trek }
//     });
//   };

//   const formatSimilarityScore = (score) => {
//     if (score && score > 0) {
//       return Math.round(score * 100);
//     }
//     return 0;
//   };

//   return (
//     <div className="min-h-screen bg-[#CABA9C] px-4 py-12">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-4xl font-bold text-[#4c6444] text-center mb-8">
//           Recommended Treks for You
//         </h1>
        
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {trekList.map((trek) => (
//             <div
//               key={trek.id}
//               className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow duration-300 border border-[#e9ebd5]"
//               onClick={() => handleTrekClick(trek)}
//             >
//               <div className="flex justify-between items-start mb-4">
//                 <h2 className="text-xl font-semibold text-[#4c6444] flex-1 pr-2">
//                   {trek.name}
//                 </h2>
//                 <div className="bg-[#4c6444] text-white px-2 py-1 rounded text-sm whitespace-nowrap">
//                   {formatSimilarityScore(trek.similarity_score)}% Match
//                 </div>
//               </div>
              
//               <div className="space-y-3">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600 font-medium">Difficulty:</span>
//                   <span className="text-[#4c6444] capitalize">{trek.difficulty}</span>
//                 </div>
                
//                 <div className="flex justify-between">
//                   <span className="text-gray-600 font-medium">Elevation:</span>
//                   <span className="text-[#4c6444]">{trek.elevation}</span>
//                 </div>
                
//                 <div className="flex justify-between">
//                   <span className="text-gray-600 font-medium">Duration:</span>
//                   <span className="text-[#4c6444]">{trek.duration}</span>
//                 </div>
                
//                 <div className="flex justify-between">
//                   <span className="text-gray-600 font-medium">Cost:</span>
//                   <span className="text-[#4c6444] font-semibold">{trek.cost}</span>
//                 </div>
//               </div>
              
//               <button className="w-full mt-4 bg-[#4c6444] text-white py-2 rounded hover:bg-[#3e5338] transition duration-300">
//                 View Itinerary
//               </button>
//             </div>
//           ))}
//         </div>
        
//         <div className="text-center mt-8">
//           <button
//             onClick={() => navigate("/preferences")}
//             className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition duration-300"
//           >
//             Back to Preferences
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecommendationsPage;
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RecommendationsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const recommendations = location.state?.recommendations;

  console.log("Recommendations data:", recommendations);

  // If no recommendations data, redirect back to form
  if (!recommendations) {
    console.log("No recommendations found, redirecting to preferences");
    navigate("/preferences");
    return null;
  }

  let trekList = [];

  // Handle array of trek objects
  if (Array.isArray(recommendations)) {
    trekList = recommendations.map((trek) => ({
      _id: trek._id,
      title: trek.title,
      difficulty: trek.difficulty || "N/A",
      elevation: trek.elevation || "N/A",
      duration: trek.duration || "N/A",
      cost: trek.cost || "N/A",
      similarity_score: trek.similarity_score || 0
    }));
  }

  console.log("Processed trek list:", trekList);

  // If no valid trek data found
  if (trekList.length === 0) {
    console.error("No valid trek data found in recommendations:", recommendations);
    return (
      <div className="min-h-screen bg-[#CABA9C] flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl text-red-600 mb-4">No Recommendations Found</h2>
          <p className="text-gray-700 mb-4">
            We couldn't find any treks matching your preferences. Try adjusting your criteria.
          </p>
          <button
            onClick={() => navigate("/preferences")}
            className="bg-[#4c6444] text-white px-6 py-2 rounded hover:bg-[#3e5338]"
          >
            Back to Preferences
          </button>
        </div>
      </div>
    );
  }


  // Sort by similarity score (highest first)
  trekList.sort((a, b) => b.similarity_score - a.similarity_score);

  const handleTrekClick = (trek) => {
    console.log("Clicked trek:", trek);
    navigate(`/itinerary/${trek._id}`, {
      state: { trekDetails: trek }
    });
  };

  const formatSimilarityScore = (score) => {
    if (score && score > 0) {
      return Math.round(score * 100);
    }
    return 0;
  };

  return (
    <div className="min-h-screen bg-[#CABA9C] px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-[#4c6444] text-center mb-8">
          Recommended Treks for You
        </h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trekList.map((trek) => (
            <div
              key={trek._id}
              className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow duration-300 border border-[#e9ebd5]"
              onClick={() => handleTrekClick(trek)}
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-[#4c6444] flex-1 pr-2">
                  {trek.title}
                </h2>
                <div className="bg-[#4c6444] text-white px-2 py-1 rounded text-sm whitespace-nowrap">
                  {formatSimilarityScore(trek.similarity_score)}% Match
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Difficulty:</span>
                  <span className="text-[#4c6444] capitalize">{trek.difficulty}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Elevation:</span>
                  <span className="text-[#4c6444]">{trek.elevation}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Duration:</span>
                  <span className="text-[#4c6444]">{trek.duration}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Cost:</span>
                  <span className="text-[#4c6444] font-semibold">{trek.cost}</span>
                </div>
              </div>

              <button className="w-full mt-4 bg-[#4c6444] text-white py-2 rounded hover:bg-[#3e5338] transition duration-300">
                View Itinerary
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/preferences")}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition duration-300"
          >
            Back to Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsPage;
