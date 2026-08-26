import { NavLink, useNavigate } from "react-router-dom";

function Sidebar({ sidebarOpen, setSidebarOpen }) {

  const navigate = useNavigate();

  const userName = localStorage.getItem("userName");
  const userRole = localStorage.getItem("userRole");

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

  const navClass = ({ isActive }) =>
    isActive
      ? "nav-item active"
      : "nav-item";

  return (
    <aside
      className={
        sidebarOpen
          ? "sidebar sidebar-open"
          : "sidebar"
      }
    >

      {/* CLOSE BUTTON */}

      <button
        className="sidebar-close"
        onClick={() => setSidebarOpen(false)}
      >
        ✕
      </button>


      {/* LOGO */}

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


      {/* USER */}

      <div className="sidebar-user-card">

        <div className="user-avatar">

          {userName
            ? userName.charAt(0).toUpperCase()
            : "U"}

        </div>

        <div className="user-details">

          <div className="user-name">
            {userName || "User"}
          </div>

          <div className="user-role">

            <span className="online-dot"></span>

            {userRole === "ADMIN"
              ? "Administrator"
              : userRole === "NGO"
              ? "NGO Member"
              : "Donor"}

          </div>

        </div>

      </div>


      {/* ==========================================
          ADMIN SIDEBAR
      ========================================== */}

      {userRole === "ADMIN" ? (

        <nav className="sidebar-nav">

          <NavLink
            to="/admin"
            onClick={closeSidebar}
            className={navClass}
          >
            <span>🛡️</span>
            Dashboard
          </NavLink>


          <NavLink
            to="/admin/users"
            onClick={closeSidebar}
            className={navClass}
          >
            <span>👥</span>
            Users
          </NavLink>


          <NavLink
            to="/admin/donations"
            onClick={closeSidebar}
            className={navClass}
          >
            <span>🍱</span>
            Donations
          </NavLink>


          <NavLink
            to="/admin/requests"
            onClick={closeSidebar}
            className={navClass}
          >
            <span>📩</span>
            Requests
          </NavLink>


          <NavLink
            to="/admin/messages"
            onClick={closeSidebar}
            className={navClass}
          >
            <span>💬</span>
            Messages
          </NavLink>

        </nav>

      ) : (

        /* ==========================================
           DONOR / NGO SIDEBAR
        ========================================== */

        <nav className="sidebar-nav">

          <NavLink
            to={
              userRole === "NGO"
                ? "/ngo-dashboard"
                : "/dashboard"
            }
            onClick={closeSidebar}
            className={navClass}
          >
            <span>🏠</span>
            Dashboard
          </NavLink>


          <NavLink
            to="/donations"
            onClick={closeSidebar}
            className={navClass}
          >
            <span>🍱</span>
            Available Food
          </NavLink>


          {userRole !== "NGO" && (

            <NavLink
              to="/add-donation"
              onClick={closeSidebar}
              className={navClass}
            >
              <span>➕</span>
              Donate Food
            </NavLink>

          )}


          {userRole !== "NGO" && (

            <NavLink
              to="/my-donations"
              onClick={closeSidebar}
              className={navClass}
            >
              <span>📦</span>
              My Donations
            </NavLink>

          )}


          {userRole === "NGO" && (

            <NavLink
              to="/my-claims"
              onClick={closeSidebar}
              className={navClass}
            >
              <span>❤️</span>
              My Claims
            </NavLink>

          )}


          {userRole === "NGO" && (

            <NavLink
              to="/my-requests"
              onClick={closeSidebar}
              className={navClass}
            >
              <span>📩</span>
              My Requests
            </NavLink>

          )}


          {userRole !== "NGO" && (

            <NavLink
              to="/donation-requests"
              onClick={closeSidebar}
              className={navClass}
            >
              <span>📩</span>
              Donation Requests
            </NavLink>

          )}


          <NavLink
            to="/profile"
            onClick={closeSidebar}
            className={navClass}
          >
            <span>👤</span>
            Profile
          </NavLink>


          {/* ==========================================
    CONTACT
========================================== */}

{userRole === "NGO" ? (

  <>
    {/* Contact Donor */}

    <NavLink
      to="/contact-donor"
      onClick={closeSidebar}
      className={navClass}
    >
      <span>🤝</span>
      Contact Donor
    </NavLink>


    {/* Contact Admin + Feedback */}

    <NavLink
      to="/contact"
      onClick={closeSidebar}
      className={navClass}
    >
      <span>📞</span>
      Contact Admin & Feedback
    </NavLink>
  </>

) : (

  /* DONOR */

  <NavLink
    to="/contact"
    onClick={closeSidebar}
    className={navClass}
  >
    <span>📞</span>
    Contact & Feedback
  </NavLink>

)}
        </nav>

      )}


      {/* LOGOUT */}

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