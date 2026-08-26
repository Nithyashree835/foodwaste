import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Donations.css";

function Donations() {

  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const userId = Number(
    localStorage.getItem("userId")
  );

  const userRole =
    localStorage.getItem("userRole");


  // ==========================================
  // FETCH AVAILABLE DONATIONS
  // ==========================================

  const fetchDonations = async () => {

    try {

      setLoading(true);

      const response = await fetch(
        "https://foodrescue-backend.onrender.com/api/donations"
      );

      if (!response.ok) {
        throw new Error(
          "Failed to fetch donations"
        );
      }

      const data = await response.json();

      const availableDonations =
        data.filter(
          donation =>
            Number(donation.donorId) !== userId &&
            donation.status === "AVAILABLE"
        );

      setDonations(
        availableDonations
      );

    } catch (error) {

      console.error(
        "Fetch donations error:",
        error
      );

      alert(
        "Cannot load available donations"
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    fetchDonations();

  }, []);


  // ==========================================
  // OPEN DONATION DETAILS
  // ==========================================

  const openDonationDetails = (donationId) => {

    navigate(`/donation/${donationId}`);

  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="donations-loading">

        <div className="donations-spinner"></div>

        <p>
          Finding available food...
        </p>

      </div>

    );

  }


  // ==========================================
  // PAGE
  // ==========================================

  return (

    <div className="donations-page">

      <div className="container">


        {/* ======================================
            HEADER
        ====================================== */}

        <div className="donations-header">

          <div>

            <h1>
              Available Food
            </h1>

            <p>
              Discover surplus food available
              for your NGO.
            </p>

          </div>

          <div className="donations-icon">
            🍲
          </div>

        </div>


        {/* ======================================
            STATS
        ====================================== */}

        <div className="donations-stats">


          <div className="donations-stat">

            <div className="donations-stat-icon">
              🍱
            </div>

            <div>

              <div className="donations-stat-value">
                {donations.length}
              </div>

              <div className="donations-stat-label">
                Available Donations
              </div>

            </div>

          </div>


          <div className="donations-stat">

            <div className="donations-stat-icon">
              🏢
            </div>

            <div>

              <div className="donations-stat-value">
                NGO
              </div>

              <div className="donations-stat-label">
                Request food for your organization
              </div>

            </div>

          </div>


          <div className="donations-stat">

            <div className="donations-stat-icon">
              🌱
            </div>

            <div>

              <div className="donations-stat-value">
                Food Rescue
              </div>

              <div className="donations-stat-label">
                Reduce food waste
              </div>

            </div>

          </div>

        </div>


        {/* ======================================
            NGO MESSAGE
        ====================================== */}

        {userRole !== "NGO" && (

          <div className="donations-warning">

            🔒 Only registered NGO accounts can
            request food donations.

          </div>

        )}


        {/* ======================================
            EMPTY STATE
        ====================================== */}

        {donations.length === 0 ? (

          <div className="donations-empty">

            <div className="donations-empty-icon">
              🍱
            </div>

            <h3>
              No food available right now
            </h3>

            <p>
              New food donations will appear here
              when donors share them.
            </p>

          </div>

        ) : (


          /* ======================================
             DONATION GRID
          ====================================== */

          <div className="donations-grid">

            {donations.map(
              (donation) => (

                <div
                  className="donations-card"
                  key={donation.id}
                  onClick={() =>
                    openDonationDetails(
                      donation.id
                    )
                  }
                  style={{
                    cursor: "pointer"
                  }}
                >


                  {/* =================================
                      FOOD VISUAL
                  ================================= */}

                  <div className="donations-visual">

                    <span className="donations-emoji">
                      🍲
                    </span>

                    <span className="donations-status donations-status-available">
                      AVAILABLE
                    </span>

                  </div>


                  {/* =================================
                      CARD BODY
                  ================================= */}

                  <div className="donations-card-body">


                    {/* TITLE */}

                    <h3 className="donations-title">

                      {donation.foodName}

                    </h3>


                    {/* CATEGORY */}

                    <div className="donations-category">

                      {donation.category}

                    </div>


                    {/* =================================
                        DETAILS
                    ================================= */}

                    <div className="donations-details">


                      {/* DONOR */}

                      <div className="donations-detail">

                        <span className="donations-detail-icon">
                          👤
                        </span>

                        <span>

                          <strong>
                            Donor:
                          </strong>{" "}

                          {donation.donorName}

                        </span>

                      </div>


                      {/* QUANTITY */}

                      <div className="donations-detail">

                        <span className="donations-detail-icon">
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


                      {/* PREPARED */}

                      <div className="donations-detail">

                        <span className="donations-detail-icon">
                          🗓
                        </span>

                        <span>

                          <strong>
                            Prepared:
                          </strong>{" "}

                          {donation.preparedDate}

                        </span>

                      </div>


                      {/* EXPIRY */}

                      <div className="donations-detail">

                        <span className="donations-detail-icon">
                          ⏰
                        </span>

                        <span>

                          <strong>
                            Expires:
                          </strong>{" "}

                          {donation.expiryDate}

                        </span>

                      </div>


                      {/* PICKUP */}

                      <div className="donations-detail">

                        <span className="donations-detail-icon">
                          📍
                        </span>

                        <span>

                          <strong>
                            Pickup:
                          </strong>{" "}

                          {donation.pickupLocation}

                        </span>

                      </div>


                    </div>


                    {/* DESCRIPTION */}

                    {donation.description && (

                      <div className="donations-description">

                        💬 {donation.description}

                      </div>

                    )}


                    {/* =================================
                        VIEW DETAILS
                    ================================= */}

                    <button
                      type="button"
                      className="donations-button"
                      onClick={(event) => {

                        event.stopPropagation();

                        openDonationDetails(
                          donation.id
                        );

                      }}
                    >

                      🔍 View Full Details →

                    </button>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </div>

  );

}

export default Donations;