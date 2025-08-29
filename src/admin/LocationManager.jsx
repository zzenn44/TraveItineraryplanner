
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

export default function LocationManager() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    destination_id: "",
    altitude: "",
    climate: "",
    timezone: "",
    region: "",
    terrain_type: "",
  });
  const [editId, setEditId] = useState(null);

  const API_BASE_URL = "http://localhost:8000";

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/location_metadata/`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setLocations(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetching locations failed:", error);
      setError("Failed to load locations. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editId
        ? `${API_BASE_URL}/location_metadata/${editId}`
        : `${API_BASE_URL}/location_metadata/`;
      const method = editId ? "PUT" : "POST";

      const body = {
        ...form,
        altitude: form.altitude ? parseFloat(form.altitude) : null,
      };

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Reset form and refresh locations
      setForm({
        destination_id: "",
        altitude: "",
        climate: "",
        timezone: "",
        region: "",
        terrain_type: "",
      });
      setEditId(null);
      fetchLocations();
    } catch (error) {
      console.error("Operation failed:", error);
      setError("Failed to save location. Please try again.");
    }
  };

  const handleEdit = (loc) => {
    setForm({
      destination_name: loc.destination_id || "",
      altitude: loc.altitude || "",
      climate: loc.climate || "",
      timezone: loc.timezone || "",
      region: loc.region || "",
      terrain_type: loc.terrain_type || "",
    });
    setEditId(loc.id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/location_metadata/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      fetchLocations();
    } catch (error) {
      console.error("Delete failed:", error);
      setError("Failed to delete location. Please try again.");
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8 bg-[#f5f5f5]">
        <h1 className="text-2xl font-bold text-[#4c6444] mb-4">Location Manager</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-6 rounded shadow max-w-2xl mb-8"
        >
          {/* Your existing form inputs */}
          <input
            className="w-full border p-2 rounded"
            placeholder="Destination Name"
            value={form.destination_id}
            onChange={(e) => setForm({ ...form, destination_id: e.target.value })}
            required
          />
          <input
            className="w-full border p-2 rounded"
            placeholder="Altitude (meters)"
            type="number"
            value={form.altitude}
            onChange={(e) => setForm({ ...form, altitude: e.target.value })}
          />
          <input
            className="w-full border p-2 rounded"
            placeholder="Climate (e.g., temperate, alpine)"
            value={form.climate}
            onChange={(e) => setForm({ ...form, climate: e.target.value })}
          />
          <input
            className="w-full border p-2 rounded"
            placeholder="Timezone (e.g., Asia/Kathmandu)"
            value={form.timezone}
            onChange={(e) => setForm({ ...form, timezone: e.target.value })}
          />
          <input
            className="w-full border p-2 rounded"
            placeholder="Region (e.g., Bagmati)"
            value={form.region}
            onChange={(e) => setForm({ ...form, region: e.target.value })}
          />
          <input
            className="w-full border p-2 rounded"
            placeholder="Terrain Type (e.g., mountain, valley)"
            value={form.terrain_type}
            onChange={(e) => setForm({ ...form, terrain_type: e.target.value })}
          />

          <button className="bg-[#4c6444] text-white px-4 py-2 rounded">
            {editId ? "Update" : "Add"} Location
          </button>
        </form>

        {loading ? (
          <div className="text-center py-4">Loading locations...</div>
        ) : (
          <div className="space-y-4">
            {locations && locations.length > 0 ? (
              locations.map((loc) => (
                <div
                  key={loc.id}
                  className="bg-[#CABA9C] p-4 rounded shadow flex justify-between items-start"
                >
                  <div>
                    <h3 className="font-semibold text-lg">
                      Destination: {loc.destination_id}
                    </h3>
                    <p>Altitude: {loc.altitude} m</p>
                    <p>Climate: {loc.climate}</p>
                    <p>Timezone: {loc.timezone}</p>
                    <p>Region: {loc.region}</p>
                    <p>Terrain: {loc.terrain_type}</p>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEdit(loc)}
                      className="text-blue-700 underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(loc.id)}
                      className="text-red-700 underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4">No locations found</div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}