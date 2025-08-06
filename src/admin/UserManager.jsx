import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

export default function UserManager() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    nationality: "",
    travelStyle: "",
    preferences: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:8000/users");
    const data = await res.json();
    setUsers(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editId
      ? `http://localhost:8000/users/${editId}`
      : "http://localhost:8000/users";
    const method = editId ? "PUT" : "POST";

    const payload = {
      ...form,
      age: form.age ? parseInt(form.age) : undefined,
      preferences: form.preferences
        ? form.preferences.split(",").map((p) => p.trim())
        : [],
    };

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setForm({
      name: "",
      email: "",
      age: "",
      nationality: "",
      travelStyle: "",
      preferences: "",
    });
    setEditId(null);
    fetchUsers();
  };

  const handleEdit = (user) => {
    setForm({
      name: user.name,
      email: user.email,
      age: user.age || "",
      nationality: user.nationality || "",
      travelStyle: user.travelStyle || "",
      preferences: user.preferences ? user.preferences.join(", ") : "",
    });
    setEditId(user.id);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8000/users/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8 bg-[#f5f5f5]">
        <h1 className="text-2xl font-bold text-[#4c6444] mb-4">User Manager</h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-6 rounded shadow max-w-2xl mb-8"
        >
          <input
            className="w-full border p-2 rounded"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            className="w-full border p-2 rounded"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            className="w-full border p-2 rounded"
            placeholder="Age"
            type="number"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
          />
          <input
            className="w-full border p-2 rounded"
            placeholder="Nationality"
            value={form.nationality}
            onChange={(e) => setForm({ ...form, nationality: e.target.value })}
          />
          <input
            className="w-full border p-2 rounded"
            placeholder="Travel Style"
            value={form.travelStyle}
            onChange={(e) => setForm({ ...form, travelStyle: e.target.value })}
          />
          <input
            className="w-full border p-2 rounded"
            placeholder="Preferences (comma-separated)"
            value={form.preferences}
            onChange={(e) => setForm({ ...form, preferences: e.target.value })}
          />
          <button className="bg-[#4c6444] text-white px-4 py-2 rounded">
            {editId ? "Update" : "Add"} User
          </button>
        </form>

        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-[#CABA9C] p-4 rounded shadow flex justify-between items-start"
            >
              <div>
                <h3 className="font-semibold text-lg">{user.name}</h3>
                <p>Email: {user.email}</p>
                {user.age && <p>Age: {user.age}</p>}
                {user.nationality && <p>Nationality: {user.nationality}</p>}
                {user.travelStyle && <p>Style: {user.travelStyle}</p>}
                {user.preferences?.length > 0 && (
                  <p>Preferences: {user.preferences.join(", ")}</p>
                )}
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="text-blue-700 underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
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
