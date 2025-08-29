// import { Routes, Route, Navigate } from "react-router-dom";
// import { useAuth } from "./context/AuthContext";

// import Login from "./components/Login";
// import Register from "./components/Register";
// import AdminDashboard from "./admin/AdminDashboard";
// import ItineraryManager from "./admin/ItineraryManager";
// import DestinationManager from "./admin/DestinationManager";
// import LocationManager from "./admin/LocationManager";
// import UserManager from "./admin/UserManager";
// import LandingPage from "./components/Landingpage";
// import Analytics from "./components/Analytics";
// import PreferenceForm from "./components/Preferenceform";
// import AdminRoute from "./routes/AdminRoute";
// import UserRoute from "./routes/UserRoute";
// import SavedItineraryPage from "./components/SavedItineraryPage";
// import RecommendedItineraries from "./components/RecommendedItineraries";
// import RecommendationsPage from "./components/RecommendationsPage";
// import ItineraryPage from "./components/ItineraryPage";
// import Lake from "./pages/Lake";
// import Circuit from "./pages/Circuit";
// import BaseCamp from "./pages/BaseCamp";
// import Mountain from "./pages/Mountain";
// import Shorttrek from "./pages/ShortTrek";
// import Valley from "./pages/Valley";
// // import Navbar from "./components/Navbar";



// export default function App() {
//   const { user } = useAuth();

//   return (

//     <Routes>
//       {/* Main route */}
//       <Route
//         path="/register"
//         element={
//           user
//             ? user.role === "admin"
//               ? <Navigate to="/admin" replace />
//               : <Navigate to="/landingpage" replace />
//             : <Login />
//         }
//       />



//       <Route path="/lake" element={<Lake />} />
//       <Route path="/circuit" element={<Circuit />} />
//       <Route path="/basecamp" element={<BaseCamp />} />
//       <Route path="/mountain" element={<Mountain />} />
//       <Route path="/shorttrek" element={<Shorttrek />} />
//       <Route path="/valley" element={<Valley />} />



//       {/* <Route path="/register" element={<Register />} /> */}



//       {/* User Routes */}
//       <Route
//         path="/landingpage"
//         element={
//           <UserRoute> 
//           <LandingPage />
//           </UserRoute>
//         }
//       />
//       <Route
//         path="/preferences"
//         element={
//           <UserRoute>
//             <PreferenceForm />
//           </UserRoute>
//         }
//       />
//       <Route
//         path="/saved-itineraries"
//         element={
//           <UserRoute>
//             <SavedItineraryPage />
//           </UserRoute>
//         }
//       />
//       <Route
//         path="/recommended-itineraries"
//         element={
//           <UserRoute>
//             <RecommendedItineraries />
//           </UserRoute>
//         }
//       />
//       <Route
//         path="/recommendations"
//         element={
//           <UserRoute>
//             <RecommendationsPage />
//           </UserRoute>
//         }
//       />
//       <Route
//         path="/itinerary/:trekTitle"
//         element={
//           <UserRoute>
//             <ItineraryPage />
//           </UserRoute>
//         }
//       />



//       {/* Admin Routes */}
//       <Route
//         path="/admin"
//         element={
//           <AdminRoute>
//             <AdminDashboard />
//           </AdminRoute>
//         }
//       />
//       <Route
//         path="/admin/itineraries"
//         element={
//           <AdminRoute>
//             <ItineraryManager />
//           </AdminRoute>
//         }
//       />
//       <Route
//         path="/admin/destinations"
//         element={
//           <AdminRoute>
//             <DestinationManager />
//           </AdminRoute>
//         }
//       />
//       <Route
//         path="/admin/locations"
//         element={
//           <AdminRoute>
//             <LocationManager />
//           </AdminRoute>
//         }
//       />
//       <Route
//         path="/admin/users"
//         element={
//           <AdminRoute>
//             <UserManager />
//           </AdminRoute>
//         }
//       />
//       <Route
//         path="/admin/analytics"
//         element={
//           <AdminRoute>
//             <Analytics />
//           </AdminRoute>
//         }
//       />


//       {/* fallback */}
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// }
// import { Routes, Route, Navigate } from "react-router-dom";
// import { useAuth } from "./context/AuthContext";
// import FirstPage from "./components/Firstpage";
// import axios from "axios";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import AdminDashboard from "./admin/AdminDashboard";
// import ItineraryManager from "./admin/ItineraryManager";
// import DestinationManager from "./admin/DestinationManager";
// import LocationManager from "./admin/LocationManager";
// import UserManager from "./admin/UserManager";
// import LandingPage from "./components/LandingPage";
// import Analytics from "./components/Analytics";
// import PreferenceForm from "./components/Preferenceform";
// import AdminRoute from "./routes/AdminRoute";
// import UserRoute from "./routes/UserRoute";
// import SavedItineraryPage from "./components/SavedItineraryPage";
// import Category from "./components/Category";
// // import RecommendedItineraries from "./components/RecommendedItineraries";
// import RecommendationsPage from "./components/RecommendationsPage";
// import ItineraryPage from "./components/ItineraryPage";
// import Lake from "./pages/Lake";
// import Circuit from "./pages/Circuit";
// import BaseCamp from "./pages/BaseCamp";
// import Mountain from "./pages/Mountain";
// import Shorttrek from "./pages/ShortTrek";
// import Valley from "./pages/Valley";


// export default function App() {
//   const { user } = useAuth();

//   // ✅ NEW: Define the save function to pass as a prop
//   const handleSaveItinerary = async ({ userId, itineraryId }) => {
//     await axios.post(`http://localhost:8000/saved/add/${userId}/${itineraryId}`);
//   };

//   return (
//     <Routes>

//      <Route 
//         path="/" 
//         element={<FirstPage />} 
//       />
//       {/* Root route - redirect based on authentication */}
//       {/* <Route
//         path="/"
//         element={
//           user
//             ? user.role === "admin"
//               ? <Navigate to="/admin" replace />
//               : <Navigate to="/landingpage" replace />
//             : <Navigate to="/login" replace />
//         }
//       />

//       {/* Authentication routes */}
//       <Route
//         path="/login"
//         element={
//           user
//             ? user.role === "admin"
//               ? <Navigate to="/admin" replace />
//               : <Navigate to="/landingpage" replace />
//             : <Login />
//         }
//       /> 
//        {/* <Route
//       path="/login"
//       element={
//         user
//           ? user.role === "admin"
//             ? <Navigate to="/admin" replace />
//             : <Navigate to="/landingpage" replace />
//           : <Login />
//       }
//     /> */}
    
//     <Route
//       path="/register"
//       element={
//         user
//           ? user.role === "admin"
//             ? <Navigate to="/admin" replace />
//             : <Navigate to="/landingpage" replace />
//           : <Register />
//       }
//     />
      
//       {/* <Route
//         path="/register"
//         element={
//           user
//             ? user.role === "admin"
//               ? <Navigate to="/admin" replace />
//               : <Navigate to="/landingpage" replace />
//             : <Register />
//         }
//       /> */}

//       {/* Public routes - accessible without authentication */}
//       <Route path="/lake" element={<Lake />} />
//       <Route path="/circuit" element={<Circuit />} />
//       <Route path="/basecamp" element={<BaseCamp />} />
//       <Route path="/mountain" element={<Mountain />} />
//       <Route path="/shorttrek" element={<Shorttrek />} />
//       <Route path="/valley" element={<Valley />} />

//       {/* User Routes */}
//       <Route
//         path="/landingpage"
//         element={
//           //<UserRoute> 
//             <LandingPage />
//           //</UserRoute>
//         }
//       />
// {/* the added part for category */}
//  <Route
//   path="/category/:categoryName"
//   element={
//     //<UserRoute>
//       <Category />
//     //</UserRoute>
//   }
// />


//       <Route
//         path="/preferences"
//         element={
//          // <UserRoute>
//             <PreferenceForm />
//           //</UserRoute>
//         }
//       />
//       <Route
//         path="/saved-itineraries"
//         element={
//          // <UserRoute>
//             <SavedItineraryPage />
//           //</UserRoute>
//         }
//       />
//       {/* <Route
//         path="/recommended-itineraries"
//         element={
//           <UserRoute>
//             <RecommendedItineraries />
//           </UserRoute>
//         }
//       /> */}
//       <Route
//         path="/recommendations"
//         element={
//          // <UserRoute>
//             <RecommendationsPage />
//           //</UserRoute>
//         }
//       />


//       {/* <Route
//         path="/itinerary/:trekId"
//         element={
//           <UserRoute>
//             <ItineraryPage />
//           </UserRoute>
//         }
//       /> */}

// <Route
//   path="/itinerary/:trekId"
//   element={
 
//       <ItineraryPage
//         user={user}
//         onSave={handleSaveItinerary}
//       />
//   }
// />


//       {/* Admin Routes */}
//       <Route
//         path="/admin"
//         element={
//           //<AdminRoute>
//             <AdminDashboard />
//           //</AdminRoute>
//         }
//       />
//       <Route
//         path="/admin/itineraries"
//         element={
//           //<AdminRoute>
//             <ItineraryManager />
//           //</AdminRoute>
//         }
//       />
//       <Route
//         path="/admin/destinations"
//         element={
//           // <AdminRoute>
//             <DestinationManager />
//           // </AdminRoute>
//         }
//       />
//       <Route
//         path="/admin/locations"
//         element={
//           // <AdminRoute>
//             <LocationManager />
//           // </AdminRoute>
//         }
//       />
//       <Route
//         path="/admin/users"
//         element={
//           // <AdminRoute>
//             <UserManager />
//           // </AdminRoute>
//         }
//       />
//       <Route
//         path="/admin/analytics"
//         element={
//           // <AdminRoute>
//             <Analytics />
//           // </AdminRoute>
//         }
//       />

//       {/* Fallback - redirect to login for unknown routes */}
//       <Route path="*" element={<Navigate to="/login" replace />} />
//     </Routes>
//   );
// }
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
