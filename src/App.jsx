import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

import { useAuth } from "./context/AuthContext";

import FirstPage from "./components/Firstpage";
import Login from "./components/login";
import Register from "./components/Register";
import LandingPage from "./components/LandingPage";
import PreferenceForm from "./components/PreferenceForm";
import SavedItineraryPage from "./components/SavedItineraryPage";
import Category from "./components/Category";
import RecommendationsPage from "./components/RecommendationsPage";
import ItineraryPage from "./components/ItineraryPage";

import AdminDashboard from "./admin/AdminDashboard";
import ItineraryManager from "./admin/ItineraryManager";
import DestinationManager from "./admin/DestinationManager";
import LocationManager from "./admin/LocationManager";


import Lake from "./pages/Lake";
import Circuit from "./pages/Circuit";
import BaseCamp from "./pages/BaseCamp";
import Mountain from "./pages/Mountain";
import Shorttrek from "./pages/ShortTrek";
import Valley from "./pages/Valley";


function RedirectIfAuthed({ children }) {
  const { user } = useAuth();
  if (user) {
    return <Navigate to={user.role === "admin" ? "/admin" : "/landingpage"} replace />;
  }
  return children;
}

function RequireAuth({ children, roles }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/landingpage" replace />;
  }
  return children;
}

export default function App() {

  const { user } = useAuth();

  const handleSaveItinerary = async ({ userId, itineraryId }) => {
    await axios.post(`http://localhost:8000/saved/add/${userId}/${itineraryId}`);
  };

  return (
    
    <Routes>
     
      <Route path="/" element={<FirstPage />} />

      
      <Route
        path="/login"
        element={
          <RedirectIfAuthed>
            <Login />
          </RedirectIfAuthed>
        }
      />
      <Route
        path="/register"
        element={
          <RedirectIfAuthed>
            <Register />
          </RedirectIfAuthed>
        }
      />

      {/* Public/General routes */}
      <Route path="/landingpage" element={<LandingPage />} />
      <Route path="/lake" element={<Lake />} />
      <Route path="/circuit" element={<Circuit />} />
      <Route path="/basecamp" element={<BaseCamp />} />
      <Route path="/mountain" element={<Mountain />} />
      <Route path="/shorttrek" element={<Shorttrek />} />
      <Route path="/valley" element={<Valley />} />
      <Route path="/category/:categoryName" element={<Category />} />
      <Route
        path="/itinerary/:trekId"
        element={<ItineraryPage user={user} onSave={handleSaveItinerary} />}
      />

      {/* User-only features */}
      <Route
        path="/preferences"
        element={
          <RequireAuth>
            <PreferenceForm />
          </RequireAuth>
        }
      />
      <Route
        path="/saved-itineraries"
        element={
          <RequireAuth>
            <SavedItineraryPage />
          </RequireAuth>
        }
      />
      <Route
        path="/recommendations"
        element={
          <RequireAuth>
            <RecommendationsPage />
          </RequireAuth>
        }
      />

      {/* Admin-only */}
      <Route
        path="/admin"
        element={
          <RequireAuth roles={["admin"]}>
            <AdminDashboard />
          </RequireAuth>
        }
      />
      <Route
        path="/admin/itineraries"
        element={
          <RequireAuth roles={["admin"]}>
            <ItineraryManager />
          </RequireAuth>
        }
      />
      <Route
        path="/admin/destinations"
        element={
          <RequireAuth roles={["admin"]}>
            <DestinationManager />
          </RequireAuth>
        }
      />
      <Route
        path="/admin/locations"
        element={
          <RequireAuth roles={["admin"]}>
            <LocationManager />
          </RequireAuth>
        }
      />
      {/* <Route
        path="/admin/users"
        element={
          <RequireAuth roles={["admin"]}>
            <UserManager />
          </RequireAuth>
        }
      /> */}
     

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
