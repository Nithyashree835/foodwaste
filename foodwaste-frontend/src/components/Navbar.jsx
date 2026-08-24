import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");

  const logout = () => {
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container">

        <Link
          to="/"
          className="navbar-brand fw-bold"
        >
          FoodRescue
        </Link>

        <div className="d-flex gap-2">

          {userEmail ? (
            <>
              <Link
                to="/dashboard"
                className="btn btn-light"
              >
                Dashboard
              </Link>

              <button
                onClick={logout}
                className="btn btn-outline-light"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-light"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="btn btn-outline-light"
              >
                Register
              </Link>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;