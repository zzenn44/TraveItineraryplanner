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