import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MyDonations.css";

function MyDonations() {

  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const userId = localStorage.getItem("userId");


  // ==========================================
  // FETCH MY DONATIONS
  // ==========================================

  const fetchMyDonations = async () => {

    try {

      setLoading(true);
      setMessage("");

      const response = await fetch(
        `http://localhost:8080/api/donations/my/${userId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch donations");
      }

      const data = await response.json();

      setDonations(data);

    } catch (error) {

      console.error(
        "Fetch donations error:",
        error
      );

      setMessage(
        "Cannot load your donations."
      );

    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // LOAD DONATIONS
  // ==========================================

  useEffect(() => {

    if (userId) {

      fetchMyDonations();

    } else {

      setMessage(
        "Please login first."
      );

      setLoading(false);

    }

  }, [userId]);


  // ==========================================
  // DELETE DONATION
  // ==========================================

  const deleteDonation = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this donation?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      const response = await fetch(
        `http://localhost:8080/api/donations/${id}`,
        {
          method: "DELETE"
        }
      );

      const result = await response.text();

      if (!response.ok) {

        alert(
          result ||
          "Failed to delete donation."
        );

        return;
      }

      alert(
        result ||
        "Donation deleted successfully."
      );

      fetchMyDonations();

    } catch (error) {

      console.error(
        "Delete donation error:",
        error
      );

      alert(
        "Cannot connect to Spring Boot backend."
      );

    }

  };


  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (dateValue) => {

    if (!dateValue) {
      return "Not available";
    }

    const date = new Date(dateValue);

    if (isNaN(date.getTime())) {
      return dateValue;
    }

    return date.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }
    );

  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="my-donations-loading">

        <div className="my-donations-loading-circle"></div>

        <p className="mt-3">
          Loading your donations...
        </p>

      </div>

    );

  }


  // ==========================================
  // STATISTICS
  // ==========================================

  const availableCount =
    donations.filter(
      donation =>
        donation.status === "AVAILABLE"
    ).length;


  const claimedCount =
    donations.filter(
      donation =>
        donation.status === "CLAIMED"
    ).length;


  // ==========================================
  // PAGE
  // ==========================================

  return (

    <div className="my-donations-page">

      <div className="container">


        {/* =====================================
            HEADER
        ===================================== */}

        <div className="my-donations-header">

          <div>

            <h1>
              My Donations
            </h1>

            <p>
              Track and manage the food you have shared.
            </p>

          </div>


          <div className="my-donations-header-icon">
            🍱
          </div>

        </div>


        {/* =====================================
            STATS
        ===================================== */}

        <div className="my-donations-stats">


          {/* TOTAL */}

          <div className="my-donations-stat">

            <div className="my-donations-stat-icon">
              📦
            </div>

            <div>

              <div className="my-donations-stat-value">
                {donations.length}
              </div>

              <div className="my-donations-stat-label">
                Total Donations
              </div>

            </div>

          </div>


          {/* AVAILABLE */}

          <div className="my-donations-stat">

            <div className="my-donations-stat-icon">
              🟢
            </div>

            <div>

              <div className="my-donations-stat-value">
                {availableCount}
              </div>

              <div className="my-donations-stat-label">
                Available
              </div>

            </div>

          </div>


          {/* CLAIMED */}

          <div className="my-donations-stat">

            <div className="my-donations-stat-icon">
              🤝
            </div>

            <div>

              <div className="my-donations-stat-value">
                {claimedCount}
              </div>

              <div className="my-donations-stat-label">
                Claimed
              </div>

            </div>

          </div>

        </div>


        {/* =====================================
            MESSAGE
        ===================================== */}

        {message && (

          <div className="alert alert-danger mb-4">
            ⚠️ {message}
          </div>

        )}


        {/* =====================================
            SECTION HEADER
        ===================================== */}

        <div className="my-donations-section">

          <div>

            <h2>
              Your Food Contributions
            </h2>

            <p>
              Every donation can make a difference.
            </p>

          </div>


          <Link
            to="/add-donation"
            className="btn btn-success"
          >
            + Donate Food
          </Link>

        </div>


        {/* =====================================
            EMPTY STATE
        ===================================== */}

        {donations.length === 0 ? (

          <div className="my-donations-empty">

            <div className="my-donations-empty-icon">
              🍲
            </div>

            <h3>
              No donations yet
            </h3>

            <p>
              Start by sharing surplus food with people
              who need it.
            </p>


            <Link
              to="/add-donation"
              className="btn btn-success mt-2"
            >
              Donate Food
            </Link>

          </div>

        ) : (


          /* ===================================
             DONATION GRID
          =================================== */

          <div className="my-donations-grid">

            {donations.map((donation) => (

              <div
                className="my-donations-card"
                key={donation.id}
              >


                {/* =================================
                    FOOD VISUAL
                ================================= */}

                <div className="my-donations-visual">

                  <span className="my-donations-emoji">
                    🍲
                  </span>


                  <span
                    className={`my-donations-status ${
                      donation.status === "AVAILABLE"
                        ? "my-donations-status-available"
                        : donation.status === "CLAIMED"
                        ? "my-donations-status-claimed"
                        : ""
                    }`}
                  >
                    {donation.status}
                  </span>

                </div>


                {/* =================================
                    CARD BODY
                ================================= */}

                <div className="my-donations-card-body">


                  {/* TITLE */}

                  <h3 className="my-donations-title">
                    {donation.foodName}
                  </h3>


                  {/* CATEGORY */}

                  <div className="my-donations-category">
                    {donation.category}
                  </div>


                  {/* =================================
                      DETAILS
                  ================================= */}

                  <div className="my-donations-details">


                    {/* QUANTITY */}

                    <div className="my-donations-detail">

                      <span className="my-donations-detail-icon">
                        📦
                      </span>

                      <span>

                        <strong>
                          Quantity:
                        </strong>{" "}

                        {donation.quantity}{" "}
                        {donation.unit}

                      </span>

                    </div>


                    {/* PICKUP */}

                    <div className="my-donations-detail">

                      <span className="my-donations-detail-icon">
                        📍
                      </span>

                      <span>

                        <strong>
                          Pickup:
                        </strong>{" "}

                        {donation.pickupLocation}

                      </span>

                    </div>


                    {/* EXPIRY */}

                    <div className="my-donations-detail">

                      <span className="my-donations-detail-icon">
                        ⏰
                      </span>

                      <span>

                        <strong>
                          Expires:
                        </strong>{" "}

                        {formatDate(
                          donation.expiryDate
                        )}

                      </span>

                    </div>

                  </div>


                  {/* =================================
                      DESCRIPTION
                  ================================= */}

                  {donation.description && (

                    <div className="my-donations-description">

                      {donation.description}

                    </div>

                  )}


                  {/* =================================
                      AVAILABLE
                  ================================= */}

                  {donation.status === "AVAILABLE" && (

                    <>

                      <div className="my-donations-info my-donations-info-success">

                        🟢 Your donation is available
                        for NGOs to request.

                      </div>


                      <button
                        className="my-donations-action my-donations-action-danger"
                        onClick={() =>
                          deleteDonation(
                            donation.id
                          )
                        }
                      >

                        🗑 Delete Donation

                      </button>

                    </>

                  )}


                  {/* =================================
                      CLAIMED
                  ================================= */}

                  {donation.status === "CLAIMED" && (

                    <>

                      <div className="my-donations-info my-donations-info-warning">

                        🤝 Someone has claimed
                        this donation.

                      </div>


                      <div className="my-donations-detail mt-3">

                        <span className="my-donations-detail-icon">
                          🚚
                        </span>

                        <span>

                          <strong>
                            Pickup Status:
                          </strong>{" "}

                          {donation.pickupStatus ||
                            "NOT_STARTED"}

                        </span>

                      </div>


                      {donation.pickupStatus ===
                        "COMPLETED" && (

                        <div className="my-donations-info my-donations-info-success">

                          ✅ Donation successfully
                          completed.

                        </div>

                      )}

                    </>

                  )}

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

}

export default MyDonations;