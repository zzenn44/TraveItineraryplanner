import React from "react";

export default function TripCard({ trip , onSave, user }) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-1">
      <div className="h-48 w-full">
        <img
          src={trip.image}
          alt={trip.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 text-center">
        <h3 className="text-xl font-semibold text-[#4c6444] mb-2">{trip.name}</h3>
        <p className="text-gray-600 mb-2">{trip.description}</p>
        <div className="text-[#7f4710]">{'🌟'.repeat(trip.rating)}</div>
        {user && (
          <button
            onClick={() => onSave(trip.id)}
            className="mt-3 bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
          >
            Save Itinerary
          </button>
        )}

      </div>
    </div>
  );
}
