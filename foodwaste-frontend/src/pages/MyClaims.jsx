import { useEffect, useState } from "react";
import "./MyClaims.css";

function MyClaims() {

  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const userId = Number(
    localStorage.getItem("userId")
  );

  const userRole =
    localStorage.getItem("userRole");


  // ==========================================
  // FETCH MY CLAIMS
  // ==========================================

  const fetchClaims = async () => {

    try {

      setLoading(true);
      setMessage("");

      const response = await fetch(
        `http://localhost:8080/api/donations/claims/${userId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch claims");
      }

      const data = await response.json();

      setClaims(data);

    } catch (error) {

      console.error(
        "Fetch claims error:",
        error
      );

      setMessage(
        "Cannot load your claims."
      );

    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // LOAD CLAIMS
  // ==========================================

  useEffect(() => {

    if (!userId) {

      setMessage(
        "Please login first."
      );

      setLoading(false);

      return;

    }

    fetchClaims();

  }, [userId]);


  // ==========================================
  // UPDATE PICKUP STATUS
  // ==========================================

  const updatePickupStatus = async (
    donationId,
    pickupStatus
  ) => {

    try {

      const response = await fetch(
        `http://localhost:8080/api/donations/${donationId}/pickup-status?userId=${userId}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            pickupStatus: pickupStatus
          })
        }
      );

      const result =
        await response.text();


      if (!response.ok) {

        alert(
          result ||
          "Failed to update pickup status."
        );

        return;

      }


      alert(
        result ||
        "Pickup status updated successfully."
      );


      fetchClaims();

    } catch (error) {

      console.error(
        "Update pickup status error:",
        error
      );

      alert(
        "Cannot connect to Spring Boot backend."
      );

    }

  };


  // ==========================================
  // ROLE CHECK
  // ==========================================

  if (userRole !== "NGO") {

    return (

      <div className="claims-page">

        <div className="container">

          <div className="claims-info claims-info-warning">

            ⚠️ Only NGO users can view My Claims.

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

      <div className="claims-loading">

        <div className="claims-spinner"></div>

        <p>
          Loading your claims...
        </p>

      </div>

    );

  }


  // ==========================================
  // STATISTICS
  // ==========================================

  const awaitingPickupCount =
    claims.filter(
      claim =>
        claim.pickupStatus ===
        "PICKUP_PENDING"
    ).length;


  const completedCount =
    claims.filter(
      claim =>
        claim.pickupStatus ===
        "COMPLETED"
    ).length;


  // ==========================================
  // PAGE
  // ==========================================

  return (

    <div className="claims-page">

      <div className="container">


        {/* =====================================
            HEADER
        ===================================== */}

        <div className="claims-header">

          <div>

            <h1>
              My Claims
            </h1>

            <p>
              Track every food donation you have claimed.
            </p>

          </div>


          <div className="claims-icon">
            🤝
          </div>

        </div>


        {/* =====================================
            STATS
        ===================================== */}

        <div className="claims-stats">


          {/* TOTAL */}

          <div className="claims-stat">

            <div className="claims-stat-icon">
              📦
            </div>

            <div>

              <div className="claims-stat-value">
                {claims.length}
              </div>

              <div className="claims-stat-label">
                Total Claims
              </div>

            </div>

          </div>


          {/* AWAITING PICKUP */}

          <div className="claims-stat">

            <div className="claims-stat-icon">
              🚚
            </div>

            <div>

              <div className="claims-stat-value">
                {awaitingPickupCount}
              </div>

              <div className="claims-stat-label">
                Awaiting Pickup
              </div>

            </div>

          </div>


          {/* COMPLETED */}

          <div className="claims-stat">

            <div className="claims-stat-icon">
              ✅
            </div>

            <div>

              <div className="claims-stat-value">
                {completedCount}
              </div>

              <div className="claims-stat-label">
                Completed
              </div>

            </div>

          </div>

        </div>


        {/* =====================================
            MESSAGE
        ===================================== */}

        {message && (

          <div className="claims-info claims-info-warning">

            ⚠️ {message}

          </div>

        )}


        {/* =====================================
            EMPTY STATE
        ===================================== */}

        {claims.length === 0 ? (

          <div className="claims-empty">

            <div className="claims-empty-icon">
              🍲
            </div>

            <h3>
              No claims yet
            </h3>

            <p>
              Browse available donations and request
              food for your NGO.
            </p>

          </div>

        ) : (


          /* ===================================
             CLAIMS GRID
          =================================== */

          <div className="claims-grid">

            {claims.map((donation) => (

              <div
                className="claims-card"
                key={donation.id}
              >


                {/* =================================
                    FOOD VISUAL
                ================================= */}

                <div className="claims-visual">

                  <span className="claims-emoji">
                    🍲
                  </span>


                  <span className="claims-status">
                    CLAIMED
                  </span>

                </div>


                {/* =================================
                    CARD BODY
                ================================= */}

                <div className="claims-body">


                  {/* FOOD NAME */}

                  <h3 className="claims-title">
                    {donation.foodName}
                  </h3>


                  {/* CATEGORY */}

                  <div className="claims-category">
                    {donation.category}
                  </div>


                  {/* =================================
                      DETAILS
                  ================================= */}

                  <div className="claims-details">


                    {/* DONOR */}

                    <div className="claims-detail">

                      <span className="claims-detail-icon">
                        👤
                      </span>

                      <span>

                        <strong>
                          Donor:
                        </strong>{" "}

                        {donation.donorName ||
                          "Not available"}

                      </span>

                    </div>


                    {/* QUANTITY */}

                    <div className="claims-detail">

                      <span className="claims-detail-icon">
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


                    {/* PICKUP LOCATION */}

                    <div className="claims-detail">

                      <span className="claims-detail-icon">
                        📍
                      </span>

                      <span>

                        <strong>
                          Pickup:
                        </strong>{" "}

                        {donation.pickupLocation ||
                          "Not available"}

                      </span>

                    </div>


                    {/* EXPIRY */}

                    <div className="claims-detail">

                      <span className="claims-detail-icon">
                        ⏰
                      </span>

                      <span>

                        <strong>
                          Expiry:
                        </strong>{" "}

                        {donation.expiryDate ||
                          "Not available"}

                      </span>

                    </div>

                  </div>


                  {/* =================================
                      PICKUP STATUS
                  ================================= */}

                  <div className="claims-info claims-info-blue">

                    🚚 Pickup Status

                  </div>


                  <div className="claims-detail">

                    <span className="claims-detail-icon">
                      📌
                    </span>

                    <span>

                      <strong>
                        Current:
                      </strong>{" "}

                      {donation.pickupStatus ||
                        "NOT_STARTED"}

                    </span>

                  </div>


                  {/* =================================
                      PICKUP PENDING
                  ================================= */}

                  {donation.pickupStatus ===
                    "PICKUP_PENDING" && (

                    <>

                      <div className="claims-info claims-info-warning">

                        ⏳ Pickup is waiting to happen.

                      </div>


                      <button
                        className="claims-button claims-button-blue"
                        onClick={() =>
                          updatePickupStatus(
                            donation.id,
                            "PICKED_UP"
                          )
                        }
                      >

                        🚚 Mark as Picked Up

                      </button>

                    </>

                  )}


                  {/* =================================
                      PICKED UP
                  ================================= */}

                  {donation.pickupStatus ===
                    "PICKED_UP" && (

                    <>

                      <div className="claims-info claims-info-blue">

                        🚚 Food has been picked up.
                        Complete the donation after delivery.

                      </div>


                      <button
                        className="claims-button claims-button-green"
                        onClick={() =>
                          updatePickupStatus(
                            donation.id,
                            "COMPLETED"
                          )
                        }
                      >

                        ✓ Mark as Completed

                      </button>

                    </>

                  )}


                  {/* =================================
                      COMPLETED
                  ================================= */}

                  {donation.pickupStatus ===
                    "COMPLETED" && (

                    <div className="claims-info claims-info-success">

                      🎉 Donation completed successfully.

                    </div>

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

export default MyClaims;