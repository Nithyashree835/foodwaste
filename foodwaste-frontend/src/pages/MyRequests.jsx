import { useEffect, useState } from "react";
import "./MyRequests.css";

function MyRequests() {

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");


  // ==========================================
  // FETCH MY REQUESTS
  // ==========================================

  const fetchRequests = async () => {

    try {

      setLoading(true);

      const response = await fetch(
        `https://foodwaste-backend-btuy.onrender.com/api/requests/ngo/${userId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch requests");
      }

      const data = await response.json();

      setRequests(data);

    } catch (error) {

      console.error("Error fetching my requests:", error);

    } finally {

      setLoading(false);

    }
  };


  // ==========================================
  // LOAD REQUESTS
  // ==========================================

  useEffect(() => {

    if (userId) {
      fetchRequests();
    } else {
      setLoading(false);
    }

  }, [userId]);


  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {

    if (!date) return "N/A";

    const d = new Date(date);

    if (isNaN(d.getTime())) {
      return date;
    }

    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };


  // ==========================================
  // STATUS ICON
  // ==========================================

  const getStatusIcon = (status) => {

    if (status === "PENDING") return "⏳";

    if (status === "APPROVED") return "✓";

    if (status === "REJECTED") return "✕";

    return "📋";
  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="requests-loading">

        <div className="spinner-border text-success"></div>

        <h5>Loading your requests...</h5>

        <p>
          Please wait while we fetch your donation requests.
        </p>

      </div>

    );

  }


  // ==========================================
  // PAGE
  // ==========================================

  return (

    <div className="my-requests-page">

      <div className="container py-5">


        {/* =====================================
            HEADER
        ===================================== */}

        <div className="requests-header">

          <div>

            <div className="requests-title-row">

              <div className="title-icon">
                📋
              </div>

              <div>

                <h1>
                  My Requests
                </h1>

                <p>
                  Track all the food donations you have requested.
                </p>

              </div>

            </div>

          </div>


          <div className="total-request-box">

            <span>
              Total Requests
            </span>

            <strong>
              {requests.length}
            </strong>

          </div>

        </div>


        {/* =====================================
            SUMMARY
        ===================================== */}

        {requests.length > 0 && (

          <div className="request-summary">

            <div className="summary-card">

              <div className="summary-icon pending">
                ⏳
              </div>

              <div>

                <span>
                  Pending
                </span>

                <strong>
                  {
                    requests.filter(
                      r => r.status === "PENDING"
                    ).length
                  }
                </strong>

              </div>

            </div>


            <div className="summary-card">

              <div className="summary-icon approved">
                ✓
              </div>

              <div>

                <span>
                  Approved
                </span>

                <strong>
                  {
                    requests.filter(
                      r => r.status === "APPROVED"
                    ).length
                  }
                </strong>

              </div>

            </div>


            <div className="summary-card">

              <div className="summary-icon rejected">
                ✕
              </div>

              <div>

                <span>
                  Rejected
                </span>

                <strong>
                  {
                    requests.filter(
                      r => r.status === "REJECTED"
                    ).length
                  }
                </strong>

              </div>

            </div>

          </div>

        )}


        {/* =====================================
            NO REQUESTS
        ===================================== */}

        {requests.length === 0 ? (

          <div className="empty-requests">

            <div className="empty-icon">
              📋
            </div>

            <h2>
              No requests yet
            </h2>

            <p>
              You haven't requested any food donations yet.
            </p>

          </div>

        ) : (


          /* ===================================
             REQUEST CARDS
          =================================== */

          <div className="row g-4">

            {requests.map((request) => (

              <div
                className="col-md-6 col-xl-4"
                key={request.id}
              >

                <div className="request-card">


                  {/* CARD TOP */}

                  <div className="request-card-top">

                    <div className="food-icon">
                      🍱
                    </div>

                    <div className="request-number">

                      <span>
                        Request
                      </span>

                      <strong>
                        #{request.id}
                      </strong>

                    </div>


                    <div
                      className={`status-badge ${request.status?.toLowerCase()}`}
                    >

                      <span>
                        {getStatusIcon(request.status)}
                      </span>

                      {request.status}

                    </div>

                  </div>


                  {/* CARD BODY */}

                  <div className="request-card-body">


                    <span className="donation-label">
                      FOOD DONATION
                    </span>


                    <h3>
                      {request.foodName || "Food Donation"}
                    </h3>


                    {/* CATEGORY */}

                    {request.category && (

                      <span className="category-badge">
                        {request.category}
                      </span>

                    )}


                    {/* DETAILS */}

                    <div className="request-details">


                      <div className="detail-item">

                        <span className="detail-icon">
                          📦
                        </span>

                        <div>

                          <small>
                            Requested Quantity
                          </small>

                          <strong>
                            {request.requestedQuantity}{" "}
                            {request.unit || ""}
                          </strong>

                        </div>

                      </div>


                      <div className="detail-item">

                        <span className="detail-icon">
                          🗓️
                        </span>

                        <div>

                          <small>
                            Requested On
                          </small>

                          <strong>
                            {formatDate(request.requestDate)}
                          </strong>

                        </div>

                      </div>


                      <div className="detail-item">

                        <span className="detail-icon">
                          📍
                        </span>

                        <div>

                          <small>
                            Pickup Location
                          </small>

                          <strong>
                            {request.pickupLocation || "Not specified"}
                          </strong>

                        </div>

                      </div>


                      {request.expiryDate && (

                        <div className="detail-item">

                          <span className="detail-icon">
                            ⏰
                          </span>

                          <div>

                            <small>
                              Food Expires
                            </small>

                            <strong>
                              {formatDate(request.expiryDate)}
                            </strong>

                          </div>

                        </div>

                      )}

                    </div>


                    {/* STATUS MESSAGE */}

                    {request.status === "PENDING" && (

                      <div className="request-message pending-message">

                        <span>
                          ⏳
                        </span>

                        <div>

                          <strong>
                            Waiting for approval
                          </strong>

                          <p>
                            The donor hasn't responded to your request yet.
                          </p>

                        </div>

                      </div>

                    )}


                    {request.status === "APPROVED" && (

                      <div className="request-message approved-message">

                        <span>
                          ✓
                        </span>

                        <div>

                          <strong>
                            Request approved
                          </strong>

                          <p>
                            Your food request has been approved. Pickup can now be arranged.
                          </p>

                        </div>

                      </div>

                    )}


                    {request.status === "REJECTED" && (

                      <div className="request-message rejected-message">

                        <span>
                          ✕
                        </span>

                        <div>

                          <strong>
                            Request rejected
                          </strong>

                          <p>
                            The donor has rejected this request.
                          </p>

                        </div>

                      </div>

                    )}

                  </div>


                  {/* CARD FOOTER */}

                  <div className="request-card-footer">

                    <span>
                      Donation ID
                    </span>

                    <strong>
                      #{request.donationId}
                    </strong>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

}

export default MyRequests;