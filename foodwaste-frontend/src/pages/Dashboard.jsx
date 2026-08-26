import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {

  const userName =
    localStorage.getItem("userName") || "User";

  const userId =
    Number(localStorage.getItem("userId"));

  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // LOAD DONATIONS
  // ==========================================

  useEffect(() => {

    const fetchDonations = async () => {

      try {

        const response = await fetch(
          "http://foodwaste-backend-btuy.onrender.com/api/donations"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch donations");
        }

        const data = await response.json();

        setDonations(data);

      } catch (error) {

        console.error(
          "Dashboard error:",
          error
        );

      } finally {

        setLoading(false);

      }

    };

    fetchDonations();

  }, []);


  // ==========================================
  // STATISTICS
  // ==========================================

  const totalDonations =
    donations.length;

  const availableFood =
    donations.filter(
      donation =>
        donation.status === "AVAILABLE"
    ).length;

  const claimedFood =
    donations.filter(
      donation =>
        donation.status === "CLAIMED"
    ).length;


  // ==========================================
  // MY DONATIONS
  // ==========================================

  const myDonations =
    donations.filter(
      donation =>
        Number(donation.donorId) === userId
    );

  const myTotalDonations =
    myDonations.length;

  const myAvailableDonations =
    myDonations.filter(
      donation =>
        donation.status === "AVAILABLE"
    ).length;

  const myClaimedDonations =
    myDonations.filter(
      donation =>
        donation.status === "CLAIMED"
    ).length;


  // ==========================================
  // RECENT DONATIONS
  // ==========================================

  const recentDonations =
    myDonations.slice(0, 3);


  return (

    <div className="dashboard-page">

      {/* ======================================
          HERO
      ====================================== */}

      <div className="dashboard-hero">

        <div className="hero-content">

          <span className="hero-badge">
            🌱 FoodRescue
          </span>

          <h1>
            Welcome back, {userName}! 👋
          </h1>

          <p>
            Every meal you donate is one less meal
            wasted. Let's make an impact today.
          </p>

          <div className="hero-buttons">

            <Link
              to="/add-donation"
              className="hero-primary-btn"
            >
              🍱 Donate Food
            </Link>

            <Link
              to="/donations"
              className="hero-secondary-btn"
            >
              🔍 Find Food
            </Link>

          </div>

        </div>


        <div className="hero-decoration">

          <div className="hero-circle">
            🍃
          </div>

          <span className="floating-food food-one">
            🍎
          </span>

          <span className="floating-food food-two">
            🥗
          </span>

          <span className="floating-food food-three">
            🍞
          </span>

        </div>

      </div>


      {/* ======================================
          STATISTICS
      ====================================== */}

      <div className="dashboard-section-heading">

        <div>
          <h2>
            Your Impact
          </h2>

          <p>
            See how your donations are making a difference.
          </p>
        </div>

      </div>


      <div className="dashboard-stats">

        {/* TOTAL */}

        <div className="dashboard-stat-card">

          <div className="stat-card-top">

            <div className="dashboard-stat-icon total-icon">
              🍱
            </div>

            <span className="stat-label">
              TOTAL
            </span>

          </div>

          <h2>
            {loading ? "..." : myTotalDonations}
          </h2>

          <p>
            Food donations
          </p>

        </div>


        {/* AVAILABLE */}

        <div className="dashboard-stat-card">

          <div className="stat-card-top">

            <div className="dashboard-stat-icon available-icon">
              🥗
            </div>

            <span className="stat-label">
              AVAILABLE
            </span>

          </div>

          <h2>
            {loading ? "..." : myAvailableDonations}
          </h2>

          <p>
            Waiting for NGOs
          </p>

        </div>


        {/* CLAIMED */}

        <div className="dashboard-stat-card">

          <div className="stat-card-top">

            <div className="dashboard-stat-icon claimed-icon">
              ❤️
            </div>

            <span className="stat-label">
              CLAIMED
            </span>

          </div>

          <h2>
            {loading ? "..." : myClaimedDonations}
          </h2>

          <p>
            Successfully claimed
          </p>

        </div>


        {/* TOTAL PLATFORM */}

        <div className="dashboard-stat-card">

          <div className="stat-card-top">

            <div className="dashboard-stat-icon community-icon">
              🌍
            </div>

            <span className="stat-label">
              COMMUNITY
            </span>

          </div>

          <h2>
            {loading ? "..." : totalDonations}
          </h2>

          <p>
            Total platform donations
          </p>

        </div>

      </div>


      {/* ======================================
          QUICK ACTIONS
      ====================================== */}

      <div className="dashboard-section-heading">

        <div>

          <h2>
            What would you like to do?
          </h2>

          <p>
            Choose an action and make a difference.
          </p>

        </div>

      </div>


      <div className="dashboard-actions">

        {/* DONATE */}

        <div className="dashboard-action-card donate-action">

          <div className="action-icon">
            🍱
          </div>

          <div className="action-content">

            <h3>
              Donate Food
            </h3>

            <p>
              Have extra food? Share it with people
              who need it instead of letting it go to waste.
            </p>

            <Link
              to="/add-donation"
              className="action-link"
            >
              Donate Now →
            </Link>

          </div>

        </div>


        {/* FIND */}

        <div className="dashboard-action-card find-action">

          <div className="action-icon">
            🔍
          </div>

          <div className="action-content">

            <h3>
              Find Available Food
            </h3>

            <p>
              Browse food donations shared by other
              donors and discover what's available.
            </p>

            <Link
              to="/donations"
              className="action-link"
            >
              Browse Food →
            </Link>

          </div>

        </div>


        {/* REQUESTS */}

        <div className="dashboard-action-card request-action">

          <div className="action-icon">
            📩
          </div>

          <div className="action-content">

            <h3>
              Donation Requests
            </h3>

            <p>
              Check requests from NGOs for your
              donated food and manage them.
            </p>

            <Link
              to="/donation-requests"
              className="action-link"
            >
              View Requests →
            </Link>

          </div>

        </div>

      </div>


      {/* ======================================
          RECENT DONATIONS
      ====================================== */}

      <div className="dashboard-section-heading recent-heading">

        <div>

          <h2>
            Your Recent Donations
          </h2>

          <p>
            Keep track of your latest food donations.
          </p>

        </div>

        <Link
          to="/my-donations"
          className="view-all-link"
        >
          View All →
        </Link>

      </div>


      {recentDonations.length === 0 ? (

        <div className="empty-dashboard-card">

          <div className="empty-icon">
            🍽️
          </div>

          <h3>
            No donations yet
          </h3>

          <p>
            Your food donations will appear here.
          </p>

          <Link
            to="/add-donation"
            className="green-button"
          >
            Donate Your First Food
          </Link>

        </div>

      ) : (

        <div className="recent-donations-grid">

          {recentDonations.map(
            (donation) => (

              <div
                className="recent-donation-card"
                key={donation.id}
              >

                <div className="recent-food-icon">
                  🍲
                </div>

                <div className="recent-food-info">

                  <h3>
                    {donation.foodName}
                  </h3>

                  <p>
                    {donation.category}
                  </p>

                  <span>
                    {donation.quantity}{" "}
                    {donation.unit}
                  </span>

                </div>

                <div>

                  <span
                    className={
                      donation.status === "CLAIMED"
                        ? "recent-status claimed"
                        : "recent-status available"
                    }
                  >
                    {donation.status}
                  </span>

                </div>

              </div>

            )
          )}

        </div>

      )}


      {/* ======================================
          IMPACT BANNER
      ====================================== */}

      <div className="impact-banner">

        <div className="impact-icon">
          🌍
        </div>

        <div>

          <h2>
            Small actions. Big impact.
          </h2>

          <p>
            By sharing surplus food, you're helping
            reduce food waste and support your community.
          </p>

        </div>

        <div className="impact-leaves">
          🌿
        </div>

      </div>

    </div>

  );

}

export default Dashboard;