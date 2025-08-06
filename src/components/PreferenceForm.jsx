import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PreferenceForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    elevation: "",
    difficulty: "",
    duration: "",
    cost: "",
    tags: []
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTagsChange = (e) => {
    const selectedTags = Array.from(e.target.selectedOptions, option => option.value);
    setFormData({ ...formData, tags: selectedTags });
  };

  // Function to normalize difficulty to match model expectations
  const normalizeDifficulty = (difficulty) => {
    const difficultyMap = {
      'Beginner': 'beginner',
      'Moderate': 'moderate', 
      'Advanced': 'advanced'
    };
    return difficultyMap[difficulty] || 'moderate';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Convert form data to the format expected by the API
      const apiData = {
        difficulty: normalizeDifficulty(formData.difficulty),
        // Fixed: Match the API parameter names from your backend
        elevation: parseInt(formData.elevation) || 4000,
        duration: parseInt(formData.duration) || 7,
        cost: parseInt(formData.cost) || 15000,
        tags: formData.tags
      };
      
      console.log("Original form data:", formData);
      console.log("Converted API data:", apiData);
      
      const response = await fetch("http://localhost:8000/recommend-poi", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(apiData),
      });
      
      console.log("Response status:", response.status);
      
      // Get response text first to see what we're getting
      const responseText = await response.text();
      console.log("Raw response:", responseText);
      
      if (response.ok) {
        try {
          const data = JSON.parse(responseText);
          console.log("Parsed response data:", data);
          
          // Check if data has the expected structure
          if (data && data.recommendations) {
            navigate("/recommendations", {
              state: { recommendations: data.recommendations }
            });
          } else if (data && Array.isArray(data)) {
            // Handle case where recommendations are returned as array directly
            navigate("/recommendations", {
              state: { recommendations: data }
            });
          } else if (data) {
            // Handle case where the response is the recommendations object directly
            navigate("/recommendations", {
              state: { recommendations: data }
            });
          } else {
            console.error("Unexpected response structure:", data);
            alert("Unexpected response from server. Please try again.");
          }
        } catch (parseError) {
          console.error("JSON parse error:", parseError);
          alert("Invalid response format from server.");
        }
      } else {
        // Try to parse error response
        try {
          const errorData = JSON.parse(responseText);
          console.error("Error response:", errorData);
          const errorMessage = errorData.detail || errorData.message || `Server error: ${response.status}`;
          alert(errorMessage);
        } catch (parseError) {
          console.error("Could not parse error response:", responseText);
          alert(`Server error: ${response.status} - ${responseText}`);
        }
      }
    } catch (error) {
      console.error("Request error:", error);
      alert("Network error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#CABA9C] flex items-center justify-center px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl space-y-6 border border-[#e9ebd5]"
      >
        <h2 className="text-3xl font-bold text-[#4c6444] text-center mb-2">
          Your Trek Preferences
        </h2>

        {/* Elevation */}
        <div>
          <label className="block mb-1 text-[#4c6444] font-medium">
            Maximum Elevation (meters)
          </label>
          <input
            type="number"
            name="elevation"
            value={formData.elevation}
            onChange={handleChange}
            placeholder="Enter max elevation in meters (e.g., 4000)"
            className="w-full border border-[#e9ebd5] p-2 rounded focus:outline-[#e9ebd5]"
            min="1000"
            max="9000"
            required
          />
        </div>

        {/* Difficulty */}
        <div>
          <label className="block mb-1 text-[#4c6444] font-medium">
            Difficulty Level
          </label>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="w-full border border-[#CABA9C] p-2 rounded focus:outline-[#4c6444]"
            required
          >
            <option value="">Select difficulty</option>
            <option value="Beginner">Beginner</option>
            <option value="Moderate">Moderate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {/* Duration */}
        <div>
          <label className="block mb-1 text-[#4c6444] font-medium">
            Maximum Trip Duration (in days)
          </label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full border border-[#CABA9C] p-2 rounded focus:outline-[#4c6444]"
            placeholder="e.g., 7"
            min="1"
            max="30"
            required
          />
        </div>

        {/* Cost */}
        <div>
          <label className="block mb-1 text-[#4c6444] font-medium">
            Maximum Cost (NPR)
          </label>
          <input
            type="number"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            className="w-full border border-[#CABA9C] p-2 rounded focus:outline-[#4c6444]"
            placeholder="e.g., 15000"
            min="1000"
            max="100000"
            required
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block mb-1 text-[#4c6444] font-medium">
            Trek Features (Select all that apply)
          </label>
          <select
            multiple
            name="tags"
            value={formData.tags}
            onChange={handleTagsChange}
            className="w-full border border-[#CABA9C] p-2 rounded focus:outline-[#4c6444] h-32"
            size="6"
          >
            <option value="mountain">Mountain Views</option>
            <option value="lake">Lakes</option>
            <option value="forest">Forest Trail</option>
            <option value="cultural">Cultural Sites</option>
            <option value="wildlife">Wildlife</option>
            <option value="glacier">Glaciers</option>
            <option value="village">Local Villages</option>
            <option value="photography">Photography</option>
            <option value="camping">Camping</option>
            <option value="basecamp">Base Camp</option>
          </select>
          

        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#4c6444] text-white py-2 rounded hover:bg-[#3e5338] transition duration-300 disabled:opacity-50"
        >
          {isLoading ? "Getting Recommendations..." : "Get Recommendations"}
        </button>
      </form>
    </div>
  );
};

export default PreferenceForm;