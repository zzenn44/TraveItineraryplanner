
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const SavedItinerariesPage = () => {
  const { user } = useAuth();
  const [savedItineraries, setSavedItineraries] = useState([]);
  const [destinationsMap, setDestinationsMap] = useState({});

  const [itinerary, setItinerary] = useState(null);
  console.log(savedItineraries);

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/saved/${user.id}`);
        console.log("Fetched itineraries:", res.data.itineraries);
        setSavedItineraries(res.data.itineraries); 
      } catch (err) {
        console.error("Failed to fetch saved itineraries", err);
      }
    };

    console.log("Current user:", user);
    if (user) {
      fetchSaved();
    }
  }, [user]);

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const res = await fetch(`http://localhost:8000/itineraries/${trekId}`);
        if (!res.ok) throw new Error("Failed to fetch itinerary");
        const data = await res.json();
        setItinerary(data);
      } catch (err) {
        console.error("Error loading itinerary:", err);
        setError("Could not load itinerary from server.");
      } finally {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await axios.get("http://localhost:8000/destinations");
        const map = {};
        const destinations = res.data?.destinations || [];
        
        destinations.forEach(dest => {
          if (dest && dest.name) {
            map[dest.name] = dest;
          }
        });
        
        setDestinationsMap(map);
      } catch (err) {
        console.error("Failed to fetch destinations", err);
        setDestinationsMap({});
      }
    };
  
    fetchDestinations();
  }, []);

 
  const removeItinerary = async (id) => {
    if (!id || !user?.id) {
      console.error("No itinerary ID or user ID provided");
      return;
    }
  
    try {
      console.log("Removing itinerary with ID:", id);
      await axios.delete(`http://localhost:8000/saved/remove/${user.id}/${id}`);

      setSavedItineraries(prev =>
        prev.filter(item => (item._id || item.id) !== id)
      );
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
            {savedItineraries.map(itinerary => {
              const itineraryId = itinerary._id || itinerary.id;

              return (
                <div key={itineraryId} className="bg-white rounded-lg shadow-lg p-6">
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
                      onClick={() => removeItinerary(itineraryId)}
                    >
                      Remove Itinerary
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedItinerariesPage;

