import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

export default function LocationManager() {
  const [locations, setLocations] = useState([]);
  const [form, setForm] = useState({
    destination_id: "",
    altitude: "",
    climate: "",
    timezone: "",
    region: "",
    terrain_type: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchLocations = async () => {
    const res = await fetch("http://localhost:8000/location_metadata");
    const data = await res.json();
    setLocations(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editId
      ? `http://localhost:8000/location_metadata/${editId}`
      : "http://localhost:8000/location_metadata";
    const method = editId ? "PUT" : "POST";

    const body = {
      ...form,
      altitude: form.altitude ? parseFloat(form.altitude) : null,
    };

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

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
  };

  const handleEdit = (loc) => {
    setForm({ ...loc });
    setEditId(loc.id);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8000/location_metadata/${id}`, {
      method: "DELETE",
    });
    fetchLocations();
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8 bg-[#f5f5f5]">
        <h1 className="text-2xl font-bold text-[#4c6444] mb-4">Location Manager</h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-6 rounded shadow max-w-2xl mb-8"
        >
          <input
            className="w-full border p-2 rounded"
            placeholder="Destination ID"
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

        <div className="space-y-4">
          {locations.map((loc) => (
            <div
              key={loc.id}
              className="bg-[#CABA9C] p-4 rounded shadow flex justify-between items-start"
            >
              <div>
                <h3 className="font-semibold text-lg">Destination: {loc.destination_id}</h3>
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
          ))}
        </div>
      </main>
    </div>
  );
}
