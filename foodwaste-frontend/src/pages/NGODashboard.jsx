import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './NGODashboard.css'

function NGODashboard() {

  const [donations, setDonations] = useState([]);
  const [claims, setClaims] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userName =
    localStorage.getItem("userName") || "NGO";

  const userId =
    Number(localStorage.getItem("userId"));

  const userRole =
    localStorage.getItem("userRole");


  // ==========================================
  // LOAD NGO DASHBOARD DATA
  // ==========================================

  useEffect(() => {

    if (userRole !== "NGO") {
      setLoading(false);
      return;
    }

    const loadDashboard = async () => {

      try {

        setLoading(true);
        setError("");

        // Fetch all donations
        const donationsResponse = await fetch(
          "https://foodrescue-backend.onrender.com/api/donations"
        );

        if (!donationsResponse.ok) {
          throw new Error(
            "Failed to fetch donations"
          );
        }

        const allDonations =
          await donationsResponse.json();


        // Fetch NGO claims
        const claimsResponse = await fetch(
          `https://foodrescue-backend.onrender.com/api/donations/claims/${userId}`
        );

        if (!claimsResponse.ok) {
          throw new Error(
            "Failed to fetch claims"
          );
        }

        const myClaims =
          await claimsResponse.json();


        // Only available food from other donors
        const availableFood =
          allDonations.filter(
            (donation) =>
              Number(donation.donorId) !== userId &&
              donation.status === "AVAILABLE"
          );


        setDonations(availableFood);
        setClaims(myClaims);

      } catch (err) {

        console.error(
          "NGO Dashboard Error:",
          err
        );

        setError(
          "Cannot connect to Spring Boot backend."
        );

      } finally {

        setLoading(false);

      }

    };

    loadDashboard();

  }, [userId, userRole]);


  // ==========================================
  // ROLE CHECK
  // ==========================================

  if (userRole !== "NGO") {

    return (

      <div className="container py-5">

        <div className="card border-0 shadow-sm">

          <div className="card-body text-center py-5">

            <div
              style={{
                fontSize: "65px"
              }}
            >
              🔒
            </div>

            <h3 className="mt-3">
              NGO Access Required
            </h3>

            <p className="text-muted">
              Please login with an NGO account
              to access this dashboard.
            </p>

            <Link
              to="/login"
              className="btn btn-success"
            >
              Login as NGO
            </Link>

          </div>

        </div>

      </div>

    );

  }


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="container text-center py-5">

        <div className="spinner-border text-success">
        </div>

        <p className="mt-3 text-muted">
          Preparing your NGO dashboard...
        </p>

      </div>

    );

  }


  // ==========================================
  // STATISTICS
  // ==========================================

  const availableCount =
    donations.length;

  const claimsCount =
    claims.length;

  const pickedUpCount =
    claims.filter(
      (item) =>
        item.pickupStatus === "PICKED_UP"
    ).length;

  const completedCount =
    claims.filter(
      (item) =>
        item.pickupStatus === "COMPLETED"
    ).length;


  // ==========================================
  // PICKUP PROGRESS
  // ==========================================

  const totalClaims =
    claims.length;

  const progress =
    totalClaims > 0
      ? Math.round(
          (completedCount / totalClaims) * 100
        )
      : 0;


  // ==========================================
  // DASHBOARD
  // ==========================================

  return (

    <div className="ngo-dashboard">


      {/* =====================================
          WELCOME HEADER
      ===================================== */}

      <div className="ngo-welcome-card">

        <div className="ngo-welcome-content">

          <span className="ngo-small-label">
            NGO PARTNER
          </span>

          <h1>
            Welcome back, {userName} 👋
          </h1>

          <p>
            Find food, support your community,
            and help reduce food waste.
          </p>

          <div className="ngo-header-actions">

            <Link
              to="/donations"
              className="ngo-primary-button"
            >
              🍱 Browse Food
            </Link>

            <Link
              to="/my-claims"
              className="ngo-secondary-button"
            >
              ❤️ My Claims
            </Link>

          </div>

        </div>


        <div className="ngo-welcome-illustration">
          🌱
        </div>

      </div>


      {/* =====================================
          ERROR
      ===================================== */}

      {error && (

        <div className="alert alert-danger mt-4">
          {error}
        </div>

      )}


      {/* =====================================
          STATISTICS
      ===================================== */}

      <div className="ngo-stats-grid">


        {/* AVAILABLE */}

        <div className="ngo-stat-card">

          <div className="ngo-stat-icon available">
            🍱
          </div>

          <div className="ngo-stat-info">

            <span>
              Available Food
            </span>

            <strong>
              {availableCount}
            </strong>

            <small>
              Ready to claim
            </small>

          </div>

        </div>


        {/* CLAIMS */}

        <div className="ngo-stat-card">

          <div className="ngo-stat-icon claims">
            ❤️
          </div>

          <div className="ngo-stat-info">

            <span>
              My Claims
            </span>

            <strong>
              {claimsCount}
            </strong>

            <small>
              Total claimed
            </small>

          </div>

        </div>


        {/* PICKED UP */}

        <div className="ngo-stat-card">

          <div className="ngo-stat-icon pickup">
            🚚
          </div>

          <div className="ngo-stat-info">

            <span>
              Picked Up
            </span>

            <strong>
              {pickedUpCount}
            </strong>

            <small>
              Food collected
            </small>

          </div>

        </div>


        {/* COMPLETED */}

        <div className="ngo-stat-card">

          <div className="ngo-stat-icon completed">
            ✅
          </div>

          <div className="ngo-stat-info">

            <span>
              Completed
            </span>

            <strong>
              {completedCount}
            </strong>

            <small>
              Successfully received
            </small>

          </div>

        </div>

      </div>


      {/* =====================================
          QUICK ACTIONS
      ===================================== */}

      <div className="ngo-section-header">

        <div>

          <h2>
            Quick Actions
          </h2>

          <p>
            Manage your food rescue activities.
          </p>

        </div>

      </div>


      <div className="ngo-action-grid">


        <Link
          to="/donations"
          className="ngo-action-card"
        >

          <div className="ngo-action-icon">
            🔍
          </div>

          <div>

            <h3>
              Find Food
            </h3>

            <p>
              Browse food donations available
              near your NGO.
            </p>

          </div>

          <span className="ngo-action-arrow">
            →
          </span>

        </Link>


        <Link
          to="/my-claims"
          className="ngo-action-card"
        >

          <div className="ngo-action-icon">
            ❤️
          </div>

          <div>

            <h3>
              My Claims
            </h3>

            <p>
              Track your claimed food and
              pickup progress.
            </p>

          </div>

          <span className="ngo-action-arrow">
            →
          </span>

        </Link>


        <Link
          to="/my-requests"
          className="ngo-action-card"
        >

          <div className="ngo-action-icon">
            📩
          </div>

          <div>

            <h3>
              My Requests
            </h3>

            <p>
              Check the status of your
              donation requests.
            </p>

          </div>

          <span className="ngo-action-arrow">
            →
          </span>

        </Link>

      </div>


      {/* =====================================
          ACTIVITY + PROGRESS
      ===================================== */}

      <div className="ngo-bottom-grid">


        {/* PICKUP PROGRESS */}

        <div className="ngo-progress-card">

          <div className="ngo-card-heading">

            <div>

              <h3>
                Pickup Progress
              </h3>

              <p>
                Your food rescue progress
              </p>

            </div>

            <div className="ngo-progress-circle">
              {progress}%
            </div>

          </div>


          <div className="ngo-progress-bar">

            <div
              className="ngo-progress-fill"
              style={{
                width: `${progress}%`
              }}
            ></div>

          </div>


          <div className="ngo-progress-details">

            <div>
              <span className="progress-dot pending"></span>
              Pending
              <strong>
                {
                  claims.filter(
                    (item) =>
                      item.pickupStatus ===
                      "PICKUP_PENDING"
                  ).length
                }
              </strong>
            </div>

            <div>
              <span className="progress-dot pickup"></span>
              Picked Up
              <strong>
                {pickedUpCount}
              </strong>
            </div>

            <div>
              <span className="progress-dot done"></span>
              Completed
              <strong>
                {completedCount}
              </strong>
            </div>

          </div>

        </div>


        {/* IMPACT CARD */}

        <div className="ngo-impact-card">

          <div className="ngo-impact-icon">
            🌍
          </div>

          <div>

            <span>
              YOUR IMPACT
            </span>

            <h3>
              {completedCount}
            </h3>

            <p>
              food donations successfully
              rescued.
            </p>

          </div>

        </div>

      </div>


      {/* =====================================
          AVAILABLE FOOD
      ===================================== */}

      <div className="ngo-section-header">

        <div>

          <h2>
            Fresh Food Available 🍱
          </h2>

          <p>
            Recently donated food waiting
            to be rescued.
          </p>

        </div>

        <Link
          to="/donations"
          className="ngo-view-all"
        >
          View All →
        </Link>

      </div>


      {/* =====================================
          NO FOOD
      ===================================== */}

      {donations.length === 0 ? (

        <div className="ngo-empty-card">

          <div>
            🍃
          </div>

          <h3>
            No food available right now
          </h3>

          <p>
            New food donations will appear
            here when donors add them.
          </p>

          <Link
            to="/donations"
            className="ngo-primary-button"
          >
            Check Again
          </Link>

        </div>

      ) : (

        <div className="ngo-food-grid">

          {donations
            .slice(0, 6)
            .map((donation) => (

              <div
                className="ngo-food-card"
                key={donation.id}
              >

                <div className="ngo-food-icon">
                  🍲
                </div>


                <div className="ngo-food-content">

                  <div className="ngo-food-title">

                    <h3>
                      {donation.foodName}
                    </h3>

                    <span>
                      AVAILABLE
                    </span>

                  </div>


                  <p className="ngo-food-category">
                    {donation.category}
                  </p>


                  <div className="ngo-food-info">

                    <div>
                      📦
                      <span>
                        {donation.quantity}{" "}
                        {donation.unit}
                      </span>
                    </div>

                    <div>
                      📍
                      <span>
                        {donation.pickupLocation}
                      </span>
                    </div>

                    <div>
                      ⏰
                      <span>
                        Expires{" "}
                        {donation.expiryDate}
                      </span>
                    </div>

                  </div>


                  <Link
                    to="/donations"
                    className="ngo-claim-button"
                  >
                    View & Claim
                    <span>
                      →
                    </span>
                  </Link>

                </div>

              </div>

            ))}

        </div>

      )}


      {/* =====================================
          FOOTER MESSAGE
      ===================================== */}

      <div className="ngo-footer-message">

        <span>
          🌱
        </span>

        <div>

          <strong>
            Every meal rescued makes a difference.
          </strong>

          <p>
            Thank you for helping build a
            food-waste-free community.
          </p>

        </div>

      </div>

    </div>

  );

}

export default NGODashboard;