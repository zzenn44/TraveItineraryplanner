import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PropTypes from 'prop-types';

const ItineraryPage = ({ user, onSave }) => {
  const { trekId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itinerary, setItinerary] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  const trekDetails = location.state?.trekDetails;

  ItineraryPage.propTypes = {
    user: PropTypes.shape({
      id: PropTypes.string.isRequired
    }),
    onSave: PropTypes.func.isRequired
  };

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
    };

    if (trekId) fetchItinerary();
    else {
      setError("No itinerary ID provided.");
      setLoading(false);
    }
  }, [trekId]);

  const handleSaveItinerary = async () => {
    try {
      if (!user) {
        toast.warn("Please log in to save itineraries");
        return;
      }

      // Extract all unique destinations from all days' routes
      const allDestinations = new Set();
      itinerary.days?.forEach(day => {
        if (day.destinations && Array.isArray(day.destinations)) {
          day.destinations.forEach(dest => allDestinations.add(dest));
        }
      });

      const mappedItinerary = {
        ...itinerary,
        duration_days: itinerary.duration,
        max_elevation_m: itinerary.elevation,
        budget_estimate: itinerary.cost,
        days_count: itinerary.days?.length || 0,
        permit_required_nepali: itinerary.permit_required_nepali || false,
        destinations: Array.from(allDestinations),
        days: itinerary.days?.map(day => ({
          ...day,
          destinations: day.destinations || []
        })) || []
      };

      await onSave({
        userId: user.id,
        itineraryId: trekId,
        itineraryDetails: mappedItinerary,
      });

      setIsSaved(true);
      toast.success("Itinerary saved successfully!");
    } catch (error) {
      console.error("Error saving itinerary:", error);
      toast.error("Failed to save itinerary. Please try again.");
    }
  };

  const getAlternativeRecommendations = () => {
    toast.info("Similar treks feature coming soon!");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#CABA9C] flex items-center justify-center">
        <p className="text-2xl text-[#4c6444]">Loading itinerary...</p>
      </div>
    );
  }

  if (error || !itinerary) {
    return (
      <div className="min-h-screen bg-[#CABA9C] flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-4">{error || "Itinerary not found."}</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-[#4c6444] text-white px-6 py-2 rounded hover:bg-[#3e5338]"
          >
            Back to Recommendations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#CABA9C] px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-[#4c6444] mb-4">{itinerary.title}</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <InfoBlock label="Duration" value={`${itinerary.duration} Days`} />
            <InfoBlock label="Difficulty" value={itinerary.difficulty} />
            <InfoBlock label="Elevation" value={`${itinerary.elevation}m`} />
            <InfoBlock label="Cost" value={itinerary.cost} />
          </div>
          <p className="text-gray-700 leading-relaxed">{itinerary.overview}</p>
        </div>

        {/* Tips */}
        {itinerary.personalizedTips?.length > 0 && (
          <Section title="💡 Personalized Tips" color="blue">
            <ul className="space-y-2">
              {itinerary.personalizedTips.map((tip, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span className="text-blue-700">{tip}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Daily Plan */}
        {itinerary.days?.length > 0 && (
          <Section title="Daily Itinerary">
            <div className="space-y-6">
              {itinerary.days.map((day, index) => (
                <div key={index} className="border-l-4 border-[#4c6444] pl-6 relative">
                  <div className="absolute -left-3 top-0 bg-[#4c6444] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    {day.day}
                  </div>
                  <h3 className="text-lg font-semibold text-[#4c6444] mb-2">
                    Day {day.day}: {day.label}
                  </h3>

                  {/* Route/Destinations */}
                  {day.destinations?.length > 0 && (
                    <div className="mb-3">
                      <h4 className="font-medium text-gray-800 mb-2">Route:</h4>
                      <div className="flex items-center space-x-2 text-gray-700">
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
                    </div>
                  )}

                  {/* Legacy support for existing structure */}
                  {day.description && (
                    <p className="text-gray-700 mb-3">{day.description}</p>
                  )}

                  {day.activities?.length > 0 && (
                    <>
                      <h4 className="font-medium text-gray-800 mb-2">Activities:</h4>
                      <ul className="space-y-1 mb-3">
                        {day.activities.map((activity, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-[#4c6444] mr-2">•</span>
                            <span className="text-gray-700">{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  {day.accommodationRecommendation && (
                    <div className="bg-gray-50 p-3 rounded-md">
                      <span className="text-sm text-gray-600">
                        🏠 <strong>Accommodation:</strong> {day.accommodationRecommendation}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        

        {/* Footer Buttons */}
        <div className="text-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
          >
            ← Back to Recommendations
          </button>

          <button
            onClick={handleSaveItinerary}
            disabled={isSaved}
            className={`mt-3 px-6 py-3 rounded-lg transition-colors ${
              isSaved
                ? "bg-green-700 text-white cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            {isSaved ? "Saved ✓" : "Save Itinerary"}
          </button>

          <button
            onClick={() => navigate("/preferences")}
            className="bg-[#4c6444] text-white px-6 py-3 rounded-lg hover:bg-[#3e5338] transition-colors"
          >
            🔄 New Search
          </button>
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, children, color = "green" }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
    <h2 className="text-2xl font-bold text-[#4c6444] mb-4">{title}</h2>
    {children}
  </div>
);

const InfoBlock = ({ label, value }) => (
  <div className="text-center">
    <div className="text-sm text-gray-600">{label}</div>
    <div className="font-semibold text-[#4c6444]">{value || "N/A"}</div>
  </div>
);

export default ItineraryPage;