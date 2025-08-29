import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

export default function ItineraryManager() {
  const [itineraries, setItineraries] = useState([]);
  const [form, setForm] = useState({
    user_id: "",
    title: "",
    duration_days: 1,
    difficulty: "Moderate",
    days: [{ day: 1, destinations: [""] }],
    max_elevation_m: "",
    budget_estimate: "",
    permit_required_nepali: false,
    permit_fee_npr: "",
    rating: "",
    emergency_contacts: { rescue: { tel: "", email: "" } },
  });
  const [editId, setEditId] = useState(null);

  const fetchItineraries = async () => {
    const res = await fetch("http://localhost:8000/itineraries");
    const data = await res.json();
    setItineraries(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editId
      ? `http://localhost:8000/itineraries/${editId}`
      : "http://localhost:8000/itineraries";
    const method = editId ? "PUT" : "POST";

    const body = { ...form };
    body.duration_days = parseInt(body.duration_days);
    body.max_elevation_m = parseInt(body.max_elevation_m || 0);
    body.permit_fee_npr = parseInt(body.permit_fee_npr || 0);
    body.rating = parseFloat(body.rating || 0);

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setForm({
      user_id: "",
      title: "",
      duration_days: 1,
      difficulty: "Moderate",
      days: [{ day: 1, destinations: [""] }],
      max_elevation_m: "",
      budget_estimate: "",
      permit_required_nepali: false,
      permit_fee_npr: "",
      rating: "",
      emergency_contacts: { rescue: { tel: "", email: "" } },
    });
    setEditId(null);
    fetchItineraries();
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8000/itineraries/${id}`, { method: "DELETE" });
    fetchItineraries();
  };

  const updateDay = (index, field, value) => {
    const updated = [...form.days];
    if (field === "day") updated[index].day = parseInt(value);
    if (field === "destinations") updated[index].destinations = value.split(",").map((d) => d.trim());
    setForm({ ...form, days: updated });
  };

  useEffect(() => {
    fetchItineraries();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8 bg-[#f5f5f5]">
        <h1 className="text-2xl font-bold text-[#4c6444] mb-4">Itinerary Manager</h1>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow max-w-2xl mb-8">
          <input className="w-full border p-2 rounded" placeholder="Admin Name" value={form.user_id}
            onChange={(e) => setForm({ ...form, user_id: e.target.value })} />

          <input className="w-full border p-2 rounded" placeholder="Title" value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })} />

         
<input
  className="w-full border p-2 rounded"
  placeholder="Duration (days)"
  type="number"
  min="1"  
  value={form.duration_days}
  onChange={(e) => {
    let newDuration = parseInt(e.target.value || 0, 10);
    if (newDuration < 1) newDuration = 1;
  
    let newDays = [...form.days];
    if (newDuration > newDays.length) {
    
      for (let i = newDays.length; i < newDuration; i++) {
        newDays.push({ day: i + 1, destinations: [] });
      }
    } else if (newDuration < newDays.length) {
    
      newDays = newDays.slice(0, newDuration);
    }

    setForm({
      ...form,
      duration_days: newDuration,
      days: newDays,
    });
  }}
/>

          <select className="w-full border p-2 rounded" value={form.difficulty}
            onChange={(e) => setForm({ ...form, difficulty: e.target.value })}>
            <option value="Easy">Easy</option>
            <option value="Moderate">Moderate</option>
            <option value="Challenging">Challenging</option>
          </select>

          {/* <div className="space-y-2">
            <label className="font-bold">Days & Destinations</label>
            {form.days.map((entry, index) => (
              <div key={index} className="flex gap-2">
                <input type="number" className="w-1/3 border p-2 rounded" placeholder="Day"
                  value={entry.day}
                  onChange={(e) => updateDay(index, "day", e.target.value)} />
                <input className="w-2/3 border p-2 rounded" placeholder="Destination IDs (comma-separated)"
                  value={entry.destinations.join(", ")}
                  onChange={(e) => updateDay(index, "destinations", e.target.value)} />
              </div>
            ))}
            <button
              type="button"
              onClick={() => setForm({ ...form, days: [...form.days, { day: form.days.length + 1, destinations: [""] }] })}
              className="text-sm text-blue-600 underline"
            >
              + Add Day
            </button>
          </div> */}

          {/* Days & Destinations */}
<div className="space-y-2">
  <label className="font-bold">Days & Destinations</label>
  {form.days.map((entry, index) => (
    <div key={index} className="flex gap-2">
      <input
        type="number"
        className="w-1/3 border p-2 rounded"
        placeholder="Day"
        value={entry.day}
        disabled 
      />
      <input
        className="w-2/3 border p-2 rounded"
        placeholder="Destination names (comma-separated)"
        value={entry.destinations.join(", ")}
        onChange={(e) =>
          updateDay(index, "destinations", e.target.value)
        }
      />
    </div>
  ))}
</div>

          <input className="w-full border p-2 rounded" placeholder="Max Elevation (m)" type="number"
            value={form.max_elevation_m}
            onChange={(e) => setForm({ ...form, max_elevation_m: e.target.value })} />

          <input className="w-full border p-2 rounded" placeholder="Budget Estimate"
            value={form.budget_estimate}
            onChange={(e) => setForm({ ...form, budget_estimate: e.target.value })} />

          <div className="flex items-center gap-2">
            <input type="checkbox" checked={form.permit_required_nepali}
              onChange={(e) => setForm({ ...form, permit_required_nepali: e.target.checked })} />
            <label>Permit Required (Nepali)</label>
          </div>

          <input className="w-full border p-2 rounded" placeholder="Permit Fee (NPR)" type="number"
            value={form.permit_fee_npr}
            onChange={(e) => setForm({ ...form, permit_fee_npr: e.target.value })} />

          <input className="w-full border p-2 rounded" placeholder="Rating (1-5)" type="number"
            value={form.rating}
            onChange={(e) => setForm({ ...form, rating: e.target.value })} />

          <input className="w-full border p-2 rounded" placeholder="Emergency Contact Tel"
            value={form.emergency_contacts.rescue?.tel}
            onChange={(e) =>
              setForm({
                ...form,
                emergency_contacts: {
                  ...form.emergency_contacts,
                  rescue: {
                    ...form.emergency_contacts.rescue,
                    tel: e.target.value,
                  },
                },
              })
            } />
          <input className="w-full border p-2 rounded" placeholder="Emergency Contact Email"
            value={form.emergency_contacts.rescue?.email}
            onChange={(e) =>
              setForm({
                ...form,
                emergency_contacts: {
                  ...form.emergency_contacts,
                  rescue: {
                    ...form.emergency_contacts.rescue,
                    email: e.target.value,
                  },
                },
              })
            } />

          <button className="bg-[#4c6444] text-white px-4 py-2 rounded">
            {editId ? "Update" : "Add"} Itinerary
          </button>
        </form>

        <div className="space-y-4">
          {itineraries.map((item) => (
            <div key={item.id} className="bg-[#CABA9C] p-4 rounded shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-bold">{item.title}</h2>
                  <p>By: {item.user_id}</p>
                  <p>Days: {item.duration_days}, Difficulty: {item.difficulty}</p>
                </div>
                <div className="space-x-2">
                  <button onClick={() => handleEdit(item)} className="text-blue-700 underline">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-700 underline">Delete</button>
                </div>
              </div>
              <div className="mt-2 text-sm">
                <p>Rating: {item.rating} ⭐ | Budget: {item.budget_estimate}</p>
                <p>Permit: {item.permit_required_nepali ? "Yes" : "No"} | Fee: {item.permit_fee_npr}</p>
                <p>Max Elevation: {item.max_elevation_m} m</p>
                <p>Emergency: {item.emergency_contacts?.rescue?.tel}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
