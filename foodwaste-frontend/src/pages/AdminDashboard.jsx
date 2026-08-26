import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]);

  const [loading, setLoading] = useState(true);

  const userRole = localStorage.getItem("userRole");

  // ==========================================
  // ADMIN SECURITY + FETCH
  // ==========================================

  useEffect(() => {

    if (userRole !== "ADMIN") {
      navigate("/login");
      return;
    }

    fetchAdminData();

  }, [userRole, navigate]);


  const fetchAdminData = async () => {

    try {

      setLoading(true);

      const [usersResponse, donationsResponse, requestsResponse] =
  await Promise.all([
    fetch("https://foodwaste-backend-btuy.onrender.com/api/admin/users"),
    fetch("https://foodwaste-backend-btuy.onrender.com/api/donations"),
    fetch("https://foodwaste-backend-btuy.onrender.com/api/admin/requests")
  ]);


      if (usersResponse.ok) {
        const usersData = await usersResponse.json();
        setUsers(usersData);
      }


      if (donationsResponse.ok) {
        const donationsData = await donationsResponse.json();
        setDonations(donationsData);
      }


      if (requestsResponse.ok) {
        const requestsData = await requestsResponse.json();
        setRequests(requestsData);
      }

    } catch (error) {

      console.error(
        "Admin dashboard error:",
        error
      );

    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {

    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");

    navigate("/login");

  };


  // ==========================================
  // STATISTICS
  // ==========================================

  const totalUsers = users.length;

  const totalDonations = donations.length;

  const totalRequests = requests.length;

  const totalDonors = users.filter(
    user => user.role === "DONOR"
  ).length;

  const totalNGOs = users.filter(
    user => user.role === "NGO"
  ).length;

  const availableDonations = donations.filter(
    donation => donation.status === "AVAILABLE"
  ).length;

  const pendingRequests = requests.filter(
    request => request.status === "PENDING"
  ).length;

  const approvedRequests = requests.filter(
    request => request.status === "APPROVED"
  ).length;

  const rejectedRequests = requests.filter(
    request => request.status === "REJECTED"
  ).length;


  // ==========================================
  // RECENT USERS
  // ==========================================

  const recentUsers = [...users]
    .slice(-5)
    .reverse();


  // ==========================================
  // RECENT DONATIONS
  // ==========================================

  const recentDonations = [...donations]
    .slice(-5)
    .reverse();


  // ==========================================
  // DATE FORMAT
  // ==========================================

  const formatDate = (date) => {

    if (!date) {
      return "N/A";
    }

    const d = new Date(date);

    if (isNaN(d.getTime())) {
      return date;
    }

    return d.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }
    );

  };


  // ==========================================
  // SECURITY
  // ==========================================

  if (userRole !== "ADMIN") {
    return null;
  }


  // ==========================================
  // PAGE
  // ==========================================

  return (

    <div className="admin-page">

      {/* ======================================
          HEADER
      ====================================== */}

      <header className="admin-header">

        <div className="admin-header-left">

          <div className="admin-shield">
            🛡️
          </div>

          <div>

            <h1>
              Admin Dashboard
            </h1>

            <p>
              Welcome back, Admin 👋
            </p>

          </div>

        </div>


        <button
          className="admin-logout"
          onClick={handleLogout}
          title="Logout"
        >
          <span>↪</span>
          Logout
        </button>

      </header>


      <main className="admin-content">

        {/* ====================================
            INTRO
        ==================================== */}

        <section className="admin-welcome">

          <div>

            <h2>
              Platform Overview
            </h2>

            <p>
              Monitor your FoodRescue platform from one place.
            </p>

          </div>

          <div className="admin-live">

            <span></span>
            Live Data

          </div>

        </section>


        {/* ====================================
            STATISTICS
        ==================================== */}

        {loading ? (

          <div className="admin-loading">
            Loading dashboard...
          </div>

        ) : (

          <div className="admin-stats">

            <div className="admin-stat-card">

              <div className="stat-icon users-icon">
                👥
              </div>

              <div>
                <h3>{totalUsers}</h3>
                <p>Total Users</p>
              </div>

            </div>


            <div className="admin-stat-card">

              <div className="stat-icon donations-icon">
                🍱
              </div>

              <div>
                <h3>{totalDonations}</h3>
                <p>Total Donations</p>
              </div>

            </div>


            <div className="admin-stat-card">

              <div className="stat-icon available-icon">
                🟢
              </div>

              <div>
                <h3>{availableDonations}</h3>
                <p>Available Food</p>
              </div>

            </div>


            <div className="admin-stat-card">

              <div className="stat-icon ngo-icon">
                🤝
              </div>

              <div>
                <h3>{totalNGOs}</h3>
                <p>NGOs</p>
              </div>

            </div>


            <div className="admin-stat-card">

              <div className="stat-icon donor-icon">
                ❤️
              </div>

              <div>
                <h3>{totalDonors}</h3>
                <p>Donors</p>
              </div>

            </div>


            <div className="admin-stat-card">

              <div className="stat-icon pending-icon">
                ⏳
              </div>

              <div>
                <h3>{pendingRequests}</h3>
                <p>Pending Requests</p>
              </div>

            </div>

          </div>

        )}


        {/* ====================================
            REQUEST OVERVIEW
        ==================================== */}

        <section className="admin-section">

          <div className="admin-section-header">

            <div>

              <h2>
                Request Overview
              </h2>

              <p>
                Current donation request status
              </p>

            </div>

            <button
              className="view-all-button"
              onClick={() => navigate("/admin/requests")}
            >
              View Requests →
            </button>

          </div>


          <div className="admin-request-summary">

            <div className="admin-summary-card pending-card">

              <div className="summary-icon">
                ⏳
              </div>

              <div>

                <strong>
                  {pendingRequests}
                </strong>

                <p>
                  Pending
                </p>

              </div>

            </div>


            <div className="admin-summary-card approved-card">

              <div className="summary-icon">
                ✅
              </div>

              <div>

                <strong>
                  {approvedRequests}
                </strong>

                <p>
                  Approved
                </p>

              </div>

            </div>


            <div className="admin-summary-card rejected-card">

              <div className="summary-icon">
                ❌
              </div>

              <div>

                <strong>
                  {rejectedRequests}
                </strong>

                <p>
                  Rejected
                </p>

              </div>

            </div>


            <div className="admin-summary-card total-request-card">

              <div className="summary-icon">
                📩
              </div>

              <div>

                <strong>
                  {totalRequests}
                </strong>

                <p>
                  Total Requests
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* ====================================
            RECENT ACTIVITY
        ==================================== */}

        <div className="admin-recent-grid">


          {/* ==================================
              RECENT USERS
          ================================== */}

          <section className="admin-section recent-section">

            <div className="admin-section-header">

              <div>

                <h2>
                  👥 Recent Users
                </h2>

                <p>
                  Latest registered users
                </p>

              </div>

              <button
                className="view-all-button"
                onClick={() => navigate("/admin/users")}
              >
                View All →
              </button>

            </div>


            <div className="recent-list">

              {recentUsers.length === 0 ? (

                <div className="recent-empty">
                  No users found.
                </div>

              ) : (

                recentUsers.map(user => (

                  <div
                    className="recent-item"
                    key={user.id}
                  >

                    <div className="recent-avatar">
                      {user.name
                        ?.charAt(0)
                        ?.toUpperCase() || "U"}
                    </div>


                    <div className="recent-info">

                      <strong>
                        {user.name || "Unknown User"}
                      </strong>

                      <span>
                        {user.email || "No email"}
                      </span>

                    </div>


                    <span
                      className={`admin-role ${
                        user.role?.toLowerCase()
                      }`}
                    >
                      {user.role}
                    </span>

                  </div>

                ))

              )}

            </div>

          </section>


          {/* ==================================
              RECENT DONATIONS
          ================================== */}

          <section className="admin-section recent-section">

            <div className="admin-section-header">

              <div>

                <h2>
                  🍱 Recent Donations
                </h2>

                <p>
                  Latest food donations
                </p>

              </div>

              <button
                className="view-all-button"
                onClick={() => navigate("/admin/donations")}
              >
                View All →
              </button>

            </div>


            <div className="recent-list">

              {recentDonations.length === 0 ? (

                <div className="recent-empty">
                  No donations found.
                </div>

              ) : (

                recentDonations.map(donation => (

                  <div
                    className="recent-item"
                    key={donation.id}
                  >

                    <div className="recent-food-icon">
                      🍱
                    </div>


                    <div className="recent-info">

                      <strong>
                        {donation.foodName || "Food Donation"}
                      </strong>

                      <span>
                        {donation.donorName || "Unknown donor"}
                        {" • "}
                        {donation.quantity || 0}{" "}
                        {donation.unit || ""}
                      </span>

                    </div>


                    <span
                      className={`admin-status ${
                        donation.status?.toLowerCase()
                      }`}
                    >
                      {donation.status}
                    </span>

                  </div>

                ))

              )}

            </div>

          </section>

        </div>


        {/* ====================================
            QUICK ACTIONS
        ==================================== */}

        <section className="admin-section quick-actions-section">

          <div className="admin-section-header">

            <div>

              <h2>
                Quick Management
              </h2>

              <p>
                Access detailed management pages
              </p>

            </div>

          </div>


          <div className="quick-actions">

            <button
              onClick={() => navigate("/admin/users")}
              className="quick-action"
            >
              <span>👥</span>
              <div>
                <strong>Manage Users</strong>
                <small>View and manage users</small>
              </div>
              <b>→</b>
            </button>


            <button
              onClick={() => navigate("/admin/donations")}
              className="quick-action"
            >
              <span>🍱</span>
              <div>
                <strong>Manage Donations</strong>
                <small>View all food donations</small>
              </div>
              <b>→</b>
            </button>


            <button
              onClick={() => navigate("/admin/requests")}
              className="quick-action"
            >
              <span>📩</span>
              <div>
                <strong>Manage Requests</strong>
                <small>Review NGO requests</small>
              </div>
              <b>→</b>
            </button>

          </div>

        </section>


      </main>

    </div>

  );

}

export default AdminDashboard;