import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {

  const userId = localStorage.getItem("userId");
  const userRole = localStorage.getItem("userRole");

  // ==========================================
  // NOT LOGGED IN
  // ==========================================

  if (!userId) {
    return <Navigate to="/login" replace />;
  }


  // ==========================================
  // ADMIN
  // ==========================================

  if (userRole === "ADMIN") {

    if (role && role !== "ADMIN") {
      return <Navigate to="/admin-dashboard" replace />;
    }

    return children;
  }


  // ==========================================
  // NGO
  // ==========================================

  if (userRole === "NGO") {

    if (role && role !== "NGO") {
      return <Navigate to="/ngo-dashboard" replace />;
    }

    return children;
  }


  // ==========================================
  // DONOR
  // ==========================================

  if (userRole === "DONOR") {

    if (role && role !== "DONOR") {
      return <Navigate to="/dashboard" replace />;
    }

    return children;
  }


  // ==========================================
  // UNKNOWN ROLE
  // ==========================================

  localStorage.clear();

  return <Navigate to="/login" replace />;
}

export default ProtectedRoute;