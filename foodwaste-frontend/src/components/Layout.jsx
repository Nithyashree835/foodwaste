import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

function Layout({ children }) {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Lock background page scrolling when sidebar is open
  useEffect(() => {

    if (sidebarOpen && window.innerWidth <= 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };

  }, [sidebarOpen]);


  return (
    <div className="app-layout">

      {/* Mobile Menu Button */}

      {!sidebarOpen && (
        <button
          className="mobile-menu-button"
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>
      )}


      {/* Overlay */}

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}


      {/* Sidebar */}

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />


      {/* Main Content */}

      <main className="main-content">
        {children}
      </main>

    </div>
  );
}

export default Layout;