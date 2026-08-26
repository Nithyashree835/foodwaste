import { useEffect, useState } from "react";
import "./Donations.css";

function Donations() {

  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requestingId, setRequestingId] = useState(null);

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
        "https://foodwaste-backend-btuy.onrender.com/api/donations"
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
  // REQUEST DONATION
  // ==========================================

  const requestDonation = async (
    donationId,
    quantity
  ) => {

    if (!userId || userId <= 0) {

      alert(
        "Please login first"
      );

      return;

    }


    if (userRole !== "NGO") {

      alert(
        "Only NGO users can request food donations."
      );

      return;

    }


    if (!donationId) {

      alert(
        "Invalid donation"
      );

      return;

    }


    if (!quantity || quantity <= 0) {

      alert(
        "Invalid donation quantity"
      );

      return;

    }


    try {

      setRequestingId(
        donationId
      );


      const requestData = {

        donationId: Number(
          donationId
        ),

        ngoId: Number(
          userId
        ),

        requestedQuantity: Number(
          quantity
        )

      };


      console.log(
        "Sending request:",
        requestData
      );


      const response = await fetch(
        "https://foodwaste-backend-btuy.onrender.com/api/requests",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify(
            requestData
          )
        }
      );


      const result =
        await response.text();


      console.log(
        "Backend response:",
        result
      );


      if (response.ok) {

        alert(
          result ||
          "Donation request submitted successfully"
        );

        fetchDonations();

      } else {

        alert(
          result ||
          "Failed to submit donation request"
        );

      }

    } catch (error) {

      console.error(
        "Request donation error:",
        error
      );

      alert(
        "Cannot connect to Spring Boot backend"
      );

    } finally {

      setRequestingId(
        null
      );

    }

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
              Discover surplus food available for your NGO.
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


          {/* AVAILABLE */}

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


          {/* NGO */}

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


          {/* FOOD RESCUE */}

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

            🔒 Only registered NGO accounts can request
            food donations.

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
              New food donations will appear here when
              donors share them.
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


                      {/* PREPARED DATE */}

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


                      {/* EXPIRY DATE */}

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


                      {/* PICKUP LOCATION */}

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


                    {/* =================================
                        DESCRIPTION
                    ================================= */}

                    {donation.description && (

                      <div className="donations-description">

                        💬 {donation.description}

                      </div>

                    )}


 {/* =================================
    REQUEST QUANTITY
================================= */}

{userRole === "NGO" && (

  <div className="donations-request-box">

    <label>
      Request Quantity
    </label>

    <input
      type="number"
      min="1"
      max={donation.quantity}
      defaultValue={donation.quantity}
      id={`quantity-${donation.id}`}
      className="donations-quantity-input"
    />

    <small>
      Maximum: {donation.quantity} {donation.unit}
    </small>


    <button
      className="donations-button"

      disabled={
        requestingId === donation.id
      }

      onClick={() => {

        const input =
          document.getElementById(
            `quantity-${donation.id}`
          );

        const quantity =
          Number(input.value);

        if (
          !quantity ||
          quantity <= 0 ||
          quantity > donation.quantity
        ) {

          alert(
            `Please enter a quantity between 1 and ${donation.quantity}`
          );

          return;
        }

        requestDonation(
          donation.id,
          quantity
        );

      }}
    >

      {requestingId === donation.id
        ? "⏳ Sending Request..."
        : "📩 Request This Food"}

    </button>

  </div>



                    )}

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