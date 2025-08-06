import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

export default function DestinationManager() {
  const [destinations, setDestinations] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    tags: [],
    region: "",
    photos: [],
    coordinates: { lat: "", lng: "" }
  });
  const [editId, setEditId] = useState(null);

  const fetchDestinations = async () => {
    const res = await fetch("http://localhost:8000/destinations");
    const data = await res.json();
    setDestinations(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //  Highlight: Determines if this is an Update (PUT) or Create (POST)
    const url = editId
      ? `http://localhost:8000/destinations/${editId}`   //  Sends PUT request to update
      : "http://localhost:8000/destinations";

    const method = editId ? "PUT" : "POST";   // Chooses PUT for update, POST for create

    //  Highlight: Sends request to backend to update or create
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({
      name: "",
      description: "",
      tags: [],
      region: "",
      photos: [],
      coordinates: { lat: "", lng: "" },
    });
    setEditId(null);
    fetchDestinations();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8000/destinations/${id}`, { method: "DELETE" });
    fetchDestinations();
  };

  const handleEdit = (destination) => {
    // 🔥 Highlight: Pre-fills form with selected destination and sets editId for PUT request
    setForm({
      name: destination.name,
      description: destination.description || "",
      tags: destination.tags || [],
      region: destination.region || "",
      photos: destination.photos || [],
      coordinates: destination.coordinates || { lat: "", lng: "" },
    });
    setEditId(destination.id);   // Stores ID for use in PUT request
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8 bg-[#f5f5f5]">
        <h1 className="text-2xl font-bold text-[#4c6444] mb-4">Destination Manager</h1>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow max-w-xl mb-8">
          <input
            className="w-full border p-2 rounded"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            className="w-full border p-2 rounded"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <input
            className="w-full border p-2 rounded"
            placeholder="Tags "
            value={form.tags.join(", ")}
            onChange={(e) =>
              setForm({ ...form, tags: e.target.value.split(",").map((tag) => tag.trim()) })
            }
          />
          <input
            className="w-full border p-2 rounded"
            placeholder="Region"
            value={form.region}
            onChange={(e) => setForm({ ...form, region: e.target.value })}
          />
          <input
            className="w-full border p-2 rounded"
            placeholder="Photo URLs (comma-separated)"
            value={form.photos.join(", ")}
            onChange={(e) =>
              setForm({ ...form, photos: e.target.value.split(",").map((url) => url.trim()) })
            }
          />
          <div className="flex gap-4">
            <input
              className="w-1/2 border p-2 rounded"
              placeholder="Latitude"
              type="number"
              value={form.coordinates.lat}
              onChange={(e) =>
                setForm({
                  ...form,
                  coordinates: { ...form.coordinates, lat: parseFloat(e.target.value) },
                })
              }
            />
            <input
              className="w-1/2 border p-2 rounded"
              placeholder="Longitude"
              type="number"
              value={form.coordinates.lng}
              onChange={(e) =>
                setForm({
                  ...form,
                  coordinates: { ...form.coordinates, lng: parseFloat(e.target.value) },
                })
              }
            />
          </div>

          <button className="bg-[#4c6444] text-white px-4 py-2 rounded">
            {editId ? "Update" : "Add"} Destination
          </button>
        </form>

        <div className="space-y-4">
          {destinations.map((dest) => (
            <div key={dest.id} className="bg-[#CABA9C] p-4 rounded shadow flex justify-between items-center">
              <div>
                <h2 className="font-bold">{dest.name}</h2>
                <p>{dest.description}</p>
                <p className="text-sm italic">Region: {dest.region}</p>
                <p className="text-sm">Tags: {dest.tags.join(", ")}</p>
                {dest.coordinates && (
                  <p className="text-sm">Lat: {dest.coordinates.lat}, Lng: {dest.coordinates.lng}</p>
                )}
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(dest)}
                  className="text-blue-700 underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(dest.id)}
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
