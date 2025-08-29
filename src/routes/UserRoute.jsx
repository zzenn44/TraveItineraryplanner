
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function UserRoute({ children }) {
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
    
    if (user.role === "admin") {
      // User is admin - redirect to admin dashboard
      navigate("/admin", { replace: true });
      return;
    }
    
    // User is authenticated and not admin - allow access
  }, [user, navigate]);

  // Show nothing while loading or if user is not authenticated/is admin
  if (user === null || !user || user.role === "admin") {
    return null;
  }

  return children;
}

export default UserRoute;