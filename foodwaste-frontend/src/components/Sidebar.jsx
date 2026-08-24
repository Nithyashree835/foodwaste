import { NavLink, useNavigate } from "react-router-dom";

function Sidebar({ sidebarOpen, setSidebarOpen }) {

  const navigate = useNavigate();

  const userName =
    localStorage.getItem("userName");

  const userRole =
    localStorage.getItem("userRole");


  const handleLogout = () => {

    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");

    navigate("/login");
  };


  const closeSidebar = () => {

    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }

  };


  return (

    <aside
      className={
        sidebarOpen
          ? "sidebar sidebar-open"
          : "sidebar"
      }
    >

      {/* Mobile Close Button */}

      <button
        className="sidebar-close"
        onClick={() => setSidebarOpen(false)}
      >
        ✕
      </button>


      {/* Logo */}

      <div className="sidebar-logo">

        <div className="logo-icon">
          🍃
        </div>

        <div>
          <h2>FoodRescue</h2>

          <span>
            Save food. Help people.
          </span>
        </div>

      </div>


      {/* USER PROFILE */}

<div className="sidebar-user-card">

  {/* Avatar */}

  <div className="user-avatar">

    {userName
      ? userName.charAt(0).toUpperCase()
      : "U"}

  </div>


  {/* User Details */}

  <div className="user-details">

    <div className="user-name">
      {userName || "User"}
    </div>

    <div className="user-role">

      <span className="online-dot"></span>

      {userRole === "NGO"
        ? "NGO Member"
        : "Donor"}

    </div>

  </div>

</div>


      {/* Navigation */}

      <nav className="sidebar-nav">

        <NavLink
          to={
            userRole === "NGO"
              ? "/ngo-dashboard"
              : "/dashboard"
          }
          onClick={closeSidebar}
          className={({ isActive }) =>
            isActive
              ? "nav-item active"
              : "nav-item"
          }
        >
          <span>🏠</span>
          Dashboard
        </NavLink>


        <NavLink
          to="/donations"
          onClick={closeSidebar}
          className={({ isActive }) =>
            isActive
              ? "nav-item active"
              : "nav-item"
          }
        >
          <span>🍱</span>
          Available Food
        </NavLink>


        {/* Only DONOR */}

        {userRole !== "NGO" && (

          <NavLink
            to="/add-donation"
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive
                ? "nav-item active"
                : "nav-item"
            }
          >
            <span>➕</span>
            Donate Food
          </NavLink>

        )}


        {/* Only DONOR */}

        {userRole !== "NGO" && (

          <NavLink
            to="/my-donations"
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive
                ? "nav-item active"
                : "nav-item"
            }
          >
            <span>📦</span>
            My Donations
          </NavLink>

        )}


        {/* Only NGO */}

        {userRole === "NGO" && (

          <NavLink
            to="/my-claims"
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive
                ? "nav-item active"
                : "nav-item"
            }
          >
            <span>❤️</span>
            My Claims
          </NavLink>

        )}


        {/* Only NGO */}

        {userRole === "NGO" && (

          <NavLink
            to="/my-requests"
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive
                ? "nav-item active"
                : "nav-item"
            }
          >
            <span>📩</span>
            My Requests
          </NavLink>

        )}


        {/* Only DONOR */}

        {userRole !== "NGO" && (

          <NavLink
            to="/donation-requests"
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive
                ? "nav-item active"
                : "nav-item"
            }
          >
            <span>📩</span>
            Donation Requests
          </NavLink>

        )}


        <NavLink
          to="/profile"
          onClick={closeSidebar}
          className={({ isActive }) =>
            isActive
              ? "nav-item active"
              : "nav-item"
          }
        >
          <span>👤</span>
          Profile
        </NavLink>

      </nav>


      {/* Logout */}

      <div className="sidebar-bottom">

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          <span>🚪</span>
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;