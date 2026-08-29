
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./PublicNavbar.css";

function PublicNavbar() {

  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();


  const closeMenu = () => {
    setMenuOpen(false);
  };


  const goToLogin = () => {
    closeMenu();
    navigate("/login");
  };


  return (

    <nav className="public-navbar">

      <div className="public-navbar-container">

        {/* ================================
            LOGO
        ================================= */}

        <NavLink
          to="/"
          className="public-logo"
          onClick={closeMenu}
        >

          <span className="public-logo-icon">
            🌱
          </span>

          <span className="public-logo-text">
            Food<span>Rescue</span>
          </span>

        </NavLink>


        {/* ================================
            DESKTOP MENU
        ================================= */}

        <div className="public-desktop-menu">

          <NavLink
            to="/"
            className={({ isActive }) =>
              `public-nav-link ${isActive ? "active" : ""}`
            }
          >
            Home
          </NavLink>


          <NavLink
            to="/available-foods"
            className={({ isActive }) =>
              `public-nav-link ${isActive ? "active" : ""}`
            }
          >
            Available Foods
          </NavLink>


          <NavLink
            to="/about"
            className={({ isActive }) =>
              `public-nav-link ${isActive ? "active" : ""}`
            }
          >
            About
          </NavLink>


          <NavLink
            to="/services"
            className={({ isActive }) =>
              `public-nav-link ${isActive ? "active" : ""}`
            }
          >
            Services
          </NavLink>


          <NavLink
            to="/how-it-works"
            className={({ isActive }) =>
              `public-nav-link ${isActive ? "active" : ""}`
            }
          >
            How It Works
          </NavLink>


          <NavLink
            to="/PublicContact"
            className={({ isActive }) =>
              `public-nav-link ${isActive ? "active" : ""}`
            }
          >
            Contact
          </NavLink>


          <button
            className="public-login-button"
            onClick={goToLogin}
          >
            Login
          </button>

        </div>


        {/* ================================
            MOBILE HAMBURGER
        ================================= */}

        <button
          type="button"
          className={`mobile-menu-button ${
            menuOpen ? "open" : ""
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >

          <span></span>
          <span></span>
          <span></span>

        </button>

      </div>


      {/* ================================
          MOBILE MENU
      ================================= */}

      <div
        className={`public-mobile-menu ${
          menuOpen ? "show" : ""
        }`}
      >

        <NavLink
          to="/"
          onClick={closeMenu}
          className={({ isActive }) =>
            `mobile-nav-link ${isActive ? "active" : ""}`
          }
        >
          <span>🏠</span>
          Home
        </NavLink>


        <NavLink
          to="/available-foods"
          onClick={closeMenu}
          className={({ isActive }) =>
            `mobile-nav-link ${isActive ? "active" : ""}`
          }
        >
          <span>🍱</span>
          Available Foods
        </NavLink>


        <NavLink
          to="/about"
          onClick={closeMenu}
          className={({ isActive }) =>
            `mobile-nav-link ${isActive ? "active" : ""}`
          }
        >
          <span>🌱</span>
          About
        </NavLink>


        <NavLink
          to="/services"
          onClick={closeMenu}
          className={({ isActive }) =>
            `mobile-nav-link ${isActive ? "active" : ""}`
          }
        >
          <span>🛠️</span>
          Services
        </NavLink>


        <NavLink
          to="/how-it-works"
          onClick={closeMenu}
          className={({ isActive }) =>
            `mobile-nav-link ${isActive ? "active" : ""}`
          }
        >
          <span>🔄</span>
          How It Works
        </NavLink>


        <NavLink
          to="/PublicContact"
          onClick={closeMenu}
          className={({ isActive }) =>
            `mobile-nav-link ${isActive ? "active" : ""}`
          }
        >
          <span>📞</span>
          Contact
        </NavLink>


        <button
          className="mobile-login-button"
          onClick={goToLogin}
        >
          Login
        </button>

      </div>

    </nav>

  );
}

export default PublicNavbar;
