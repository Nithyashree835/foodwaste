
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function DonationDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [requesting, setRequesting] = useState(false);

  const userId = Number(
    localStorage.getItem("userId")
  );

  const userRole =
    localStorage.getItem("userRole");


  // =========================================================
  // FETCH DONATION
  // =========================================================

  const fetchDonation = async () => {

    try {

      setLoading(true);

      const response = await fetch(
        `https://foodwaste-backend-btuy.onrender.com/api/donations/${id}`
      );

      if (!response.ok) {
        throw new Error("Donation not found");
      }

      const data = await response.json();

      setDonation(data);

    } catch (error) {

      console.error(
        "Donation details error:",
        error
      );

      setMessage(
        "Cannot load donation details"
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {

    fetchDonation();

  }, [id]);


  // =========================================================
  // REQUEST DONATION
  // =========================================================

  const requestDonation = async () => {

    if (!userId || userId <= 0) {

      alert("Please login first");

      navigate("/login");

      return;
    }


    if (userRole !== "NGO") {

      alert(
        "Only NGO users can request food donations."
      );

      return;
    }


    if (!donation) {
      return;
    }


    try {

      setRequesting(true);


      const requestData = {

        donationId: Number(
          donation.id
        ),

        ngoId: Number(
          userId
        ),

        requestedQuantity: Number(
          donation.quantity
        )

      };


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


      if (response.ok) {

        alert(
          result ||
          "Donation request submitted successfully"
        );

        fetchDonation();

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

      setRequesting(false);

    }

  };


  // =========================================================
  // CONTACT DONOR
  // =========================================================

  const contactDonor = () => {

    if (!userId || userId <= 0) {

      alert("Please login first");

      navigate("/login");

      return;
    }


    if (userRole !== "NGO") {

      alert(
        "Only NGO users can contact donors."
      );

      return;
    }


    navigate(
      `/contact-donor?donationId=${donation.id}&donorId=${donation.donorId}`
    );

  };


  // =========================================================
  // PICKUP
  // =========================================================

  const markPickedUp = async () => {

    if (!userId) {

      alert("Please login first");

      return;
    }


    try {

      const response = await fetch(
        `https://foodwaste-backend-btuy.onrender.com/api/donations/${id}/pickup?userId=${userId}`,
        {
          method: "PUT"
        }
      );


      const result =
        await response.text();


      if (response.ok) {

        alert(result);

        fetchDonation();

      } else {

        alert(result);

      }

    } catch (error) {

      console.error(error);

      alert(
        "Cannot connect to Spring Boot backend"
      );

    }

  };


  // =========================================================
  // COMPLETE
  // =========================================================

  const markCompleted = async () => {

    if (!userId) {

      alert("Please login first");

      return;
    }


    try {

      const response = await fetch(
        `https://foodwaste-backend-btuy.onrender.com/api/donations/${id}/complete?userId=${userId}`,
        {
          method: "PUT"
        }
      );


      const result =
        await response.text();


      if (response.ok) {

        alert(result);

        fetchDonation();

      } else {

        alert(result);

      }

    } catch (error) {

      console.error(error);

      alert(
        "Cannot connect to Spring Boot backend"
      );

    }

  };


  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {

    return (

      <div className="container text-center py-5">

        <div className="spinner-border text-success"></div>

        <p className="mt-3">
          Loading donation...
        </p>

      </div>

    );

  }


  // =========================================================
  // ERROR
  // =========================================================

  if (!donation) {

    return (

      <div className="container text-center py-5">

        <h2>
          Donation not found
        </h2>

        <p className="text-muted">
          {message}
        </p>

        <Link
          to="/donations"
          className="btn btn-success"
        >
          Back to Donations
        </Link>

      </div>

    );

  }


  // =========================================================
  // STATUS
  // =========================================================

  const status =
    donation.status;


  // =========================================================
  // RENDER
  // =========================================================

  return (

    <div className="container py-5">

      <Link
        to="/donations"
        className="text-success text-decoration-none"
      >
        ← Back to Donations
      </Link>


      <div className="row justify-content-center mt-4">

        <div className="col-lg-8">

          <div className="card border-0 shadow-sm">

            <div
              className="bg-light text-center py-5"
              style={{
                fontSize: "90px"
              }}
            >
              🍲
            </div>


            <div className="card-body p-4">

              <div className="d-flex justify-content-between align-items-center mb-3">

                <h1 className="fw-bold mb-0">
                  {donation.foodName}
                </h1>


                <span
                  className={
                    status === "AVAILABLE"
                      ? "badge bg-success fs-6"
                      : status === "CLAIMED"
                      ? "badge bg-warning text-dark fs-6"
                      : status === "PICKED_UP"
                      ? "badge bg-primary fs-6"
                      : "badge bg-secondary fs-6"
                  }
                >
                  {status}
                </span>

              </div>


              <p className="text-muted">
                {donation.category}
              </p>


              <hr />


              <h4 className="fw-bold mb-3">
                Donation Information
              </h4>


              <div className="row">

                <div className="col-md-6 mb-3">

                  <strong>
                    👤 Donor
                  </strong>

                  <p className="text-muted mb-0">
                    {donation.donorName}
                  </p>

                </div>


                <div className="col-md-6 mb-3">

                  <strong>
                    📦 Quantity
                  </strong>

                  <p className="text-muted mb-0">
                    {donation.quantity}{" "}
                    {donation.unit}
                  </p>

                </div>


                <div className="col-md-6 mb-3">

                  <strong>
                    🗓 Prepared Date
                  </strong>

                  <p className="text-muted mb-0">
                    {donation.preparedDate}
                  </p>

                </div>


                <div className="col-md-6 mb-3">

                  <strong>
                    ⏰ Expiry Date
                  </strong>

                  <p className="text-muted mb-0">
                    {donation.expiryDate}
                  </p>

                </div>


                <div className="col-12 mb-3">

                  <strong>
                    📍 Pickup Location
                  </strong>

                  <p className="text-muted mb-0">
                    {donation.pickupLocation}
                  </p>

                </div>


                {donation.description && (

                  <div className="col-12 mb-3">

                    <strong>
                      💬 Description
                    </strong>

                    <p className="text-muted mb-0">
                      {donation.description}
                    </p>

                  </div>

                )}

              </div>


              {userRole === "NGO" &&
                donation.donorId !== userId && (

                <>

                  <hr />

                  <div className="p-3 bg-light rounded">

                    <h4 className="fw-bold">
                      🤝 Contact Donor
                    </h4>

                    <p className="text-muted mb-3">

                      Have questions about this
                      donation? Contact{" "}
                      <strong>
                        {donation.donorName}
                      </strong>{" "}
                      directly.

                    </p>


                    <button
                      type="button"
                      className="btn btn-outline-success w-100"
                      onClick={contactDonor}
                    >
                      🤝 Contact {donation.donorName}
                    </button>

                  </div>

                </>

              )}


              <hr />


              <h4 className="fw-bold mb-4">
                Donation Progress
              </h4>


              <div className="mb-4">

                <div className="d-flex justify-content-between">

                  <div className="text-center">

                    <div
                      className={
                        status === "AVAILABLE" ||
                        status === "CLAIMED" ||
                        status === "PICKED_UP" ||
                        status === "COMPLETED"
                          ? "bg-success text-white rounded-circle mx-auto"
                          : "bg-secondary text-white rounded-circle mx-auto"
                      }
                      style={{
                        width: "45px",
                        height: "45px",
                        lineHeight: "45px"
                      }}
                    >
                      ✓
                    </div>

                    <small>
                      Available
                    </small>

                  </div>


                  <div className="text-center">

                    <div
                      className={
                        status === "CLAIMED" ||
                        status === "PICKED_UP" ||
                        status === "COMPLETED"
                          ? "bg-success text-white rounded-circle mx-auto"
                          : "bg-secondary text-white rounded-circle mx-auto"
                      }
                      style={{
                        width: "45px",
                        height: "45px",
                        lineHeight: "45px"
                      }}
                    >
                      ✓
                    </div>

                    <small>
                      Claimed
                    </small>

                  </div>


                  <div className="text-center">

                    <div
                      className={
                        status === "PICKED_UP" ||
                        status === "COMPLETED"
                          ? "bg-success text-white rounded-circle mx-auto"
                          : "bg-secondary text-white rounded-circle mx-auto"
                      }
                      style={{
                        width: "45px",
                        height: "45px",
                        lineHeight: "45px"
                      }}
                    >
                      ✓
                    </div>

                    <small>
                      Picked Up
                    </small>

                  </div>


                  <div className="text-center">

                    <div
                      className={
                        status === "COMPLETED"
                          ? "bg-success text-white rounded-circle mx-auto"
                          : "bg-secondary text-white rounded-circle mx-auto"
                      }
                      style={{
                        width: "45px",
                        height: "45px",
                        lineHeight: "45px"
                      }}
                    >
                      ✓
                    </div>

                    <small>
                      Completed
                    </small>

                  </div>

                </div>

              </div>


              <div className="mt-4">

                {status === "AVAILABLE" &&
                  userRole === "NGO" &&
                  donation.donorId !== userId && (

                  <button
                    type="button"
                    className="btn btn-success w-100"
                    onClick={requestDonation}
                    disabled={requesting}
                  >

                    {requesting
                      ? "⏳ Sending Request..."
                      : "📩 Request This Food"}

                  </button>

                )}


                {status === "CLAIMED" &&
                  donation.claimedBy === userId && (

                  <button
                    type="button"
                    className="btn btn-primary w-100"
                    onClick={markPickedUp}
                  >
                    🚚 Mark as Picked Up
                  </button>

                )}


                {status === "PICKED_UP" &&
                  donation.donorId === userId && (

                  <button
                    type="button"
                    className="btn btn-success w-100"
                    onClick={markCompleted}
                  >
                    ✓ Mark as Completed
                  </button>

                )}


                {status === "COMPLETED" && (

                  <div className="alert alert-success text-center mb-0">

                    ❤️ This donation has been
                    successfully completed.

                  </div>

                )}


                {status === "CLAIMED" &&
                  donation.donorId === userId && (

                  <div className="alert alert-info mt-3 mb-0">

                    Someone has claimed your donation.
                    Waiting for pickup.

                  </div>

                )}


                {status === "PICKED_UP" &&
                  donation.claimedBy === userId && (

                  <div className="alert alert-info mt-3 mb-0">

                    You picked up this donation.
                    Waiting for the donor to complete it.

                  </div>

                )}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default DonationDetails;