import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {

  const userId = localStorage.getItem("userId");
  const userRole = localStorage.getItem("userRole");

  // Not logged in
  if (!userId) {
    return <Navigate to="/login" replace />;
  }

  // Wrong role
  if (role && userRole !== role) {

    if (userRole === "NGO") {
      return <Navigate to="/ngo-dashboard" replace />;
    }

    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;