import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import NotificationBell from "./NotificationBell";
import "./Layout.css";

function Layout({ children }) {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const userRole =
    localStorage.getItem("userRole") || "";

  const userName =
    localStorage.getItem("userName") || "User";

  const location = useLocation();

  // ==========================================
  // USER ROLE CHECKS
  // ==========================================

  const isDonor = userRole === "DONOR";

  const isDonorDashboard =
    isDonor && location.pathname === "/dashboard";


  // ==========================================
  // LOCK SCROLL
  // ==========================================

  useEffect(() => {

    if (
      sidebarOpen &&
      window.innerWidth <= 768
    ) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };

  }, [sidebarOpen]);


  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {

    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");

    window.location.href = "/login";
  };


  // ==========================================
  // NAVIGATION ITEMS
  // ==========================================

  const getNavigationItems = () => {

    // ==========================================
    // ADMIN
    // ==========================================

    if (userRole === "ADMIN") {

      return [
        {
          path: "/admin",
          icon: "🛡️",
          label: "Dashboard"
        },
        {
          path: "/admin/users",
          icon: "👥",
          label: "Users"
        },
        {
          path: "/admin/donations",
          icon: "🍱",
          label: "Donations"
        },
        {
          path: "/admin/requests",
          icon: "📩",
          label: "Requests"
        },
        {
          path: "/admin/messages",
          icon: "💬",
          label: "Messages"
        }
      ];
    }


    // ==========================================
    // NGO
    // ==========================================

    if (userRole === "NGO") {

      return [
        {
          path: "/ngo-dashboard",
          icon: "🏠",
          label: "Home"
        },
        {
          path: "/donations",
          icon: "🍱",
          label: "Food"
        },
        {
          path: "/my-claims",
          icon: "❤️",
          label: "Claims"
        },
        {
          path: "/my-requests",
          icon: "📩",
          label: "Requests"
        },
        {
          path: "/contact-donor",
          icon: "🤝",
          label: "Contact"
        },
        {
          path: "/profile",
          icon: "👤",
          label: "Profile"
        }
      ];
    }


    // ==========================================
    // DONOR
    // ==========================================

    return [
      {
        path: "/dashboard",
        icon: "🏠",
        label: "Home"
      },
      {
        path: "/donations",
        icon: "🍱",
        label: "Food"
      },
      {
        path: "/add-donation",
        icon: "➕",
        label: "Donate"
      },
      {
        path: "/my-donations",
        icon: "📦",
        label: "My Food"
      },
      {
        path: "/donation-requests",
        icon: "📩",
        label: "Requests"
      },
      {
        path: "/profile",
        icon: "👤",
        label: "Profile"
      }
    ];
  };


  const navigationItems =
    getNavigationItems();


  // ==========================================
  // RENDER
  // ==========================================

  return (

    <div className="app-layout">


      {/* ======================================
          SIDEBAR
      ====================================== */}

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />


      {/* ======================================
          MOBILE TOP NAVBAR
      ====================================== */}

      <header className="mobile-navbar">

        {/* BRAND */}

        <div className="mobile-navbar-brand">

          <div className="mobile-logo">
            🍃
          </div>

          <div className="mobile-brand-text">

            <strong>
              FoodRescue
            </strong>

            <span>
              {userName}
            </span>

          </div>

        </div>


        {/* RIGHT SIDE */}

        <div className="mobile-navbar-right">


          {/* ==================================
              NOTIFICATION
              DONOR DASHBOARD ONLY
          ================================== */}

          {isDonorDashboard && (
            <NotificationBell />
          )}


          {/* ==================================
              LOGOUT
          ================================== */}

          <button
            type="button"
            className="mobile-logout-button"
            onClick={handleLogout}
            title="Logout"
          >
            ⇥
          </button>

        </div>

      </header>


      {/* ======================================
          MAIN CONTENT
      ====================================== */}

      <main
        className={
          isDonorDashboard
            ? "main-content donor-dashboard-layout"
            : "main-content no-topbar-layout"
        }
      >


        {/* ====================================
            DESKTOP NOTIFICATION BAR
            DONOR DASHBOARD ONLY
        ==================================== */}

        {isDonorDashboard && (

          <div className="top-bar">

            <NotificationBell />

          </div>

        )}


        {/* ====================================
            PAGE CONTENT
        ==================================== */}

        <div className="page-content">

          {children}

        </div>

      </main>


      {/* ======================================
          MOBILE BOTTOM NAVIGATION
      ====================================== */}

      <nav className="mobile-bottom-nav">

        {navigationItems.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? "mobile-nav-item mobile-nav-active"
                : "mobile-nav-item"
            }
          >

            <span className="mobile-nav-icon">
              {item.icon}
            </span>

            <span className="mobile-nav-label">
              {item.label}
            </span>

          </NavLink>

        ))}

      </nav>

    </div>
  );
}

export default Layout;