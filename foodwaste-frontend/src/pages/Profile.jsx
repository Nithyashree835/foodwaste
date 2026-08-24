import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {

  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const userEmail = localStorage.getItem("userEmail");
  const userRole = localStorage.getItem("userRole");

  const handleLogout = () => {

    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");

    navigate("/login");
  };

  const firstLetter = userName
    ? userName.charAt(0).toUpperCase()
    : "U";

  const isNGO = userRole === "NGO";

  return (
    <div className="profile-page">

      {/* ================= HEADER ================= */}

      <div className="profile-heading">

        <div>
          <span className="profile-eyebrow">
            ACCOUNT
          </span>

          <h1>
            My Profile
          </h1>

          <p>
            Manage your FoodRescue account information.
          </p>
        </div>

        <div className="profile-leaf">
          🌱
        </div>

      </div>


      {/* ================= PROFILE HERO ================= */}

      <div className="profile-hero">

        <div className="profile-avatar-wrapper">

          <div className="profile-avatar">
            {firstLetter}
          </div>

          <span className="profile-online"></span>

        </div>


        <div className="profile-hero-info">

          <h2>
            {userName || "User"}
          </h2>

          <p>
            {userEmail || "Email not available"}
          </p>

          <div className="profile-role">

            <span className="role-dot"></span>

            {isNGO ? "NGO Member" : "Food Donor"}

          </div>

        </div>


        <div className="profile-status">

          <span className="status-icon">
            ✓
          </span>

          <div>
            <strong>Active</strong>
            <small>Account status</small>
          </div>

        </div>

      </div>


      {/* ================= INFORMATION ================= */}

      <div className="profile-grid">


        {/* PERSONAL INFORMATION */}

        <div className="profile-card">

          <div className="profile-card-header">

            <div className="profile-card-icon">
              👤
            </div>

            <div>
              <h3>Personal Information</h3>
              <p>Your registered account details</p>
            </div>

          </div>


          <div className="profile-info-list">

            <div className="profile-info-item">

              <div className="info-icon">
                👤
              </div>

              <div className="info-content">

                <span>Full Name</span>

                <strong>
                  {userName || "Not available"}
                </strong>

              </div>

            </div>


            <div className="profile-info-item">

              <div className="info-icon">
                ✉️
              </div>

              <div className="info-content">

                <span>Email Address</span>

                <strong>
                  {userEmail || "Not available"}
                </strong>

              </div>

            </div>


            <div className="profile-info-item">

              <div className="info-icon">
                🆔
              </div>

              <div className="info-content">

                <span>User ID</span>

                <strong>
                  {userId || "Not available"}
                </strong>

              </div>

            </div>


            <div className="profile-info-item">

              <div className="info-icon">
                🛡️
              </div>

              <div className="info-content">

                <span>Account Role</span>

                <strong>
                  {userRole || "DONOR"}
                </strong>

              </div>

            </div>

          </div>

        </div>


        {/* ACCOUNT SUMMARY */}

        <div className="profile-card account-card">

          <div className="profile-card-header">

            <div className="profile-card-icon">
              🌱
            </div>

            <div>
              <h3>FoodRescue</h3>
              <p>Your contribution matters</p>
            </div>

          </div>


          <div className="account-message">

            <div className="account-big-icon">
              🍃
            </div>

            <h3>
              Making food count
            </h3>

            <p>
              Every food donation helps reduce waste
              and supports people who need it.
            </p>

          </div>


          <div className="account-badge">

            <span>🌍</span>

            <div>
              <strong>
                Sustainable Community
              </strong>

              <small>
                Together we reduce food waste.
              </small>
            </div>

          </div>

        </div>

      </div>


      {/* ================= QUICK ACTIONS ================= */}

      <div className="profile-section-title">

        <div>
          <span>QUICK ACTIONS</span>

          <h2>
            Manage Your FoodRescue Activity
          </h2>
        </div>

      </div>


      <div className="profile-actions">


        {/* DONOR ACTION */}

        {!isNGO && (

          <Link
            to="/my-donations"
            className="profile-action-card"
          >

            <div className="action-icon green">
              📦
            </div>

            <div>
              <h3>My Donations</h3>

              <p>
                View and manage the food you have donated.
              </p>
            </div>

            <span className="action-arrow">
              →
            </span>

          </Link>

        )}


        {/* NGO ACTION */}

        {isNGO && (

          <Link
            to="/my-claims"
            className="profile-action-card"
          >

            <div className="action-icon pink">
              ❤️
            </div>

            <div>
              <h3>My Claims</h3>

              <p>
                View food donations claimed by your NGO.
              </p>
            </div>

            <span className="action-arrow">
              →
            </span>

          </Link>

        )}


        {/* BROWSE */}

        <Link
          to="/donations"
          className="profile-action-card"
        >

          <div className="action-icon orange">
            🍲
          </div>

          <div>
            <h3>Browse Donations</h3>

            <p>
              Explore available food donations.
            </p>
          </div>

          <span className="action-arrow">
            →
          </span>

        </Link>


        {/* DASHBOARD */}

        <Link
          to={
            isNGO
              ? "/ngo-dashboard"
              : "/dashboard"
          }
          className="profile-action-card"
        >

          <div className="action-icon blue">
            🏠
          </div>

          <div>
            <h3>Dashboard</h3>

            <p>
              Return to your FoodRescue dashboard.
            </p>
          </div>

          <span className="action-arrow">
            →
          </span>

        </Link>

      </div>


      {/* ================= LOGOUT ================= */}

      <div className="profile-logout-section">

        <div>

          <strong>
            Sign out of FoodRescue
          </strong>

          <p>
            You can login again anytime with your account.
          </p>

        </div>

        <button
          className="profile-logout-btn"
          onClick={handleLogout}
        >
          🚪 Logout
        </button>

      </div>

    </div>
  );
}

export default Profile;