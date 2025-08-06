import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function FirstPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="text-center p-8 bg-white rounded-xl shadow-2xl max-w-md w-full">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Welcome to TripPal</h1>
        
        <p className="text-gray-600 mb-8">
          Discover and plan your perfect travel adventures with ease.
        </p>
        
        <div className="space-y-4">
          <button 
            onClick={() => navigate('/login')}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
          
          <button 
            onClick={() => navigate('/register')}
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition duration-300"
          >
            Register
          </button>
        </div>
        
        <div className="mt-6 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} TripPal. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
