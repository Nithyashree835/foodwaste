import { useEffect, useState } from "react";
import "./MyDonationRequests.css";

function MyDonationRequests() {

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const donorId = Number(
    localStorage.getItem("userId")
  );


  // ==========================================
  // FETCH DONATION REQUESTS
  // ==========================================

  const fetchRequests = async () => {

    try {

      setLoading(true);
      setMessage("");

      const response = await fetch(
        `http://foodwaste-backend-btuy.onrender.com/api/requests/donor/${donorId}`
      );

      if (!response.ok) {
        throw new Error("Failed to load requests");
      }

      const data = await response.json();

      setRequests(data);

    } catch (error) {

      console.error(
        "Fetch requests error:",
        error
      );

      setMessage(
        "Cannot connect to Spring Boot backend"
      );

    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // LOAD REQUESTS
  // ==========================================

  useEffect(() => {

    if (donorId) {

      fetchRequests();

    } else {

      setMessage("Please login first.");
      setLoading(false);

    }

  }, [donorId]);


  // ==========================================
  // APPROVE REQUEST
  // ==========================================

  const approveRequest = async (
    requestId
  ) => {

    try {

      const response = await fetch(
        `http://foodwaste-backend-btuy.onrender.com/api/requests/${requestId}/approve`,
        {
          method: "PUT"
        }
      );

      const result =
        await response.text();


      if (response.ok) {

        alert(
          result ||
          "Request approved successfully."
        );

        fetchRequests();

      } else {

        alert(
          result ||
          "Failed to approve request."
        );

      }

    } catch (error) {

      console.error(
        "Approve request error:",
        error
      );

      alert(
        "Cannot connect to Spring Boot backend."
      );

    }

  };


  // ==========================================
  // REJECT REQUEST
  // ==========================================

  const rejectRequest = async (
    requestId
  ) => {

    try {

      const response = await fetch(
        `http://foodwaste-backend-btuy.onrender.com/api/requests/${requestId}/reject`,
        {
          method: "PUT"
        }
      );

      const result =
        await response.text();


      if (response.ok) {

        alert(
          result ||
          "Request rejected successfully."
        );

        fetchRequests();

      } else {

        alert(
          result ||
          "Failed to reject request."
        );

      }

    } catch (error) {

      console.error(
        "Reject request error:",
        error
      );

      alert(
        "Cannot connect to Spring Boot backend."
      );

    }

  };


  // ==========================================
  // COUNTS
  // ==========================================

  const pendingCount =
    requests.filter(
      request =>
        request.status === "PENDING"
    ).length;


  const approvedCount =
    requests.filter(
      request =>
        request.status === "APPROVED"
    ).length;


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="my-requests-loading">

        <div className="my-requests-loading-circle"></div>

        <p>
          Loading donation requests...
        </p>

      </div>

    );

  }


  // ==========================================
  // PAGE
  // ==========================================

  return (

    <div className="my-requests-page">

      <div className="container">


        {/* =====================================
            HEADER
        ===================================== */}

        <div className="my-requests-header">

          <div>

            <h1>
              Donation Requests
            </h1>

            <p>
              NGOs requesting the food you donated.
            </p>

          </div>


          <div className="my-requests-header-icon">
            📩
          </div>

        </div>


        {/* =====================================
            STATS
        ===================================== */}

        <div className="my-requests-stats">


          {/* TOTAL */}

          <div className="my-requests-stat">

            <div className="my-requests-stat-icon">
              📩
            </div>

            <div>

              <div className="my-requests-stat-value">
                {requests.length}
              </div>

              <div className="my-requests-stat-label">
                Total Requests
              </div>

            </div>

          </div>


          {/* PENDING */}

          <div className="my-requests-stat">

            <div className="my-requests-stat-icon">
              ⏳
            </div>

            <div>

              <div className="my-requests-stat-value">
                {pendingCount}
              </div>

              <div className="my-requests-stat-label">
                Waiting for Review
              </div>

            </div>

          </div>


          {/* APPROVED */}

          <div className="my-requests-stat">

            <div className="my-requests-stat-icon">
              ✅
            </div>

            <div>

              <div className="my-requests-stat-value">
                {approvedCount}
              </div>

              <div className="my-requests-stat-label">
                Approved
              </div>

            </div>

          </div>

        </div>


        {/* =====================================
            MESSAGE
        ===================================== */}

        {message && (

          <div className="my-requests-message">

            ⚠️ {message}

          </div>

        )}


        {/* =====================================
            EMPTY STATE
        ===================================== */}

        {requests.length === 0 ? (

          <div className="my-requests-empty">

            <div className="my-requests-empty-icon">
              📭
            </div>

            <h3>
              No requests yet
            </h3>

            <p>
              When an NGO requests your donated
              food, it will appear here.
            </p>

          </div>

        ) : (


          /* =====================================
             REQUEST GRID
          ===================================== */

          <div className="my-requests-grid">

            {requests.map((request) => (

              <div
                className="my-requests-card"
                key={request.id}
              >


                {/* =================================
                    FOOD VISUAL
                ================================= */}

                <div className="my-requests-visual">

                  <span className="my-requests-emoji">
                    🍲
                  </span>


                  <span
                    className={`my-requests-status ${
                      request.status === "PENDING"
                        ? "my-requests-status-pending"
                        : request.status === "APPROVED"
                        ? "my-requests-status-approved"
                        : "my-requests-status-rejected"
                    }`}
                  >
                    {request.status}
                  </span>

                </div>


                {/* =================================
                    CARD BODY
                ================================= */}

                <div className="my-requests-card-body">


                  {/* FOOD NAME */}

                  <h3 className="my-requests-title">

                    {request.foodName}

                  </h3>


                  {/* CATEGORY */}

                  <div className="my-requests-category">

                    {request.category}

                  </div>


                  {/* =================================
                      DETAILS
                  ================================= */}

                  <div className="my-requests-details">


                    {/* NGO */}

                    <div className="my-requests-detail">

                      <span className="my-requests-detail-icon">
                        🏢
                      </span>

                      <span>

                        <strong>
                          NGO:
                        </strong>{" "}

                        {request.ngoName}

                      </span>

                    </div>


                    {/* REQUESTED QUANTITY */}

                    <div className="my-requests-detail">

                      <span className="my-requests-detail-icon">
                        📦
                      </span>

                      <span>

                        <strong>
                          Requested:
                        </strong>{" "}

                        {request.requestedQuantity}{" "}

                        {request.unit}

                      </span>

                    </div>


                    {/* AVAILABLE QUANTITY */}

                    <div className="my-requests-detail">

                      <span className="my-requests-detail-icon">
                        📊
                      </span>

                      <span>

                        <strong>
                          Available:
                        </strong>{" "}

                        {request.quantity}{" "}

                        {request.unit}

                      </span>

                    </div>


                    {/* PICKUP */}

                    <div className="my-requests-detail">

                      <span className="my-requests-detail-icon">
                        📍
                      </span>

                      <span>

                        <strong>
                          Pickup:
                        </strong>{" "}

                        {request.pickupLocation}

                      </span>

                    </div>


                    {/* EXPIRY */}

                    <div className="my-requests-detail">

                      <span className="my-requests-detail-icon">
                        ⏰
                      </span>

                      <span>

                        <strong>
                          Expiry:
                        </strong>{" "}

                        {request.expiryDate}

                      </span>

                    </div>


                  </div>


                  {/* =================================
                      PENDING
                  ================================= */}

                  {request.status === "PENDING" && (

                    <div>

                      <div className="my-requests-info my-requests-info-warning">

                        ⏳ This NGO is waiting for your approval.

                      </div>


                      <div className="my-requests-actions">


                        <button
                          className="my-requests-accept-btn"
                          onClick={() =>
                            approveRequest(
                              request.id
                            )
                          }
                        >
                          ✓ Accept
                        </button>


                        <button
                          className="my-requests-reject-btn"
                          onClick={() =>
                            rejectRequest(
                              request.id
                            )
                          }
                        >
                          ✕ Reject
                        </button>


                      </div>

                    </div>

                  )}


                  {/* =================================
                      APPROVED
                  ================================= */}

                  {request.status === "APPROVED" && (

                    <div className="my-requests-info my-requests-info-success">

                      ✅ Request approved. The NGO can now
                      arrange pickup.

                    </div>

                  )}


                  {/* =================================
                      REJECTED
                  ================================= */}

                  {request.status === "REJECTED" && (

                    <div className="my-requests-info my-requests-info-danger">

                      ❌ This donation request was rejected.

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

export default MyDonationRequests;