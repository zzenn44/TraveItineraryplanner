// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function AdminRoute({ children }) {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user) {
//       if (user.role !== "admin") {
//         navigate("/landingpage", { replace: true });
//       }
//     } else if (user === null) {
//       // Still null → probably still decoding → do nothing yet
//     } else {
//       navigate("/", { replace: true });
//     }
//   }, [user, navigate]);

//   if (!user || user.role !== "admin") {
//     return null; // Render nothing while waiting or redirecting
//   }

//   return children;
// }
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminRoute({ children }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      // Still loading/decoding - wait
      return;
    }
    
    if (!user) {
      // User is not authenticated - redirect to login
      navigate("/login", { replace: true });
      return;
    }
    
    if (user.role !== "admin") {
      // User is not admin - redirect to landing page
      navigate("/landingpage", { replace: true });
      return;
    }
    
    // User is admin - allow access
  }, [user, navigate]);

  // Show nothing while loading or if user is not admin
  if (user === null || !user || user.role !== "admin") {
    return null;
  }

  return children;
}

export default AdminRoute;