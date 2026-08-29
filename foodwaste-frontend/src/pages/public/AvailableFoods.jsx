
import { useEffect, useState } from "react";

function AvailableFoods() {

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // ==========================================
  // FETCH AVAILABLE FOOD
  // ==========================================

  useEffect(() => {

    const fetchFoods = async () => {

      try {

        setLoading(true);

        const response = await fetch(
          "https://foodwaste-backend-btuy.onrender.com/api/donations"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch donations");
        }

        const data = await response.json();

        // Show only AVAILABLE donations
        const availableFoods = data.filter(
          (donation) =>
            donation.status === "AVAILABLE"
        );

        setFoods(availableFoods);

      } catch (err) {

        console.error(
          "Error loading available foods:",
          err
        );

        setError(
          "Unable to load available foods."
        );

      } finally {

        setLoading(false);

      }

    };

    fetchFoods();

  }, []);


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="container py-5 text-center">

        <div
          className="spinner-border text-success"
          role="status"
        ></div>

        <p className="mt-3 text-secondary">
          Loading available foods...
        </p>

      </div>

    );

  }


  // ==========================================
  // ERROR
  // ==========================================

  if (error) {

    return (

      <div className="container py-5">

        <div className="alert alert-danger text-center">
          {error}
        </div>

      </div>

    );

  }


  // ==========================================
  // PAGE
  // ==========================================

  return (

    <div>

      {/* ======================================
          HEADER
      ====================================== */}

      <section className="bg-success text-white py-5">

        <div className="container text-center">

          <h1 className="fw-bold">
            Available Foods
          </h1>

          <p className="lead mb-0">
            Surplus food currently available
            for donation.
          </p>

        </div>

      </section>


      {/* ======================================
          FOOD DONATIONS
      ====================================== */}

      <section className="py-5">

        <div className="container">

          <div className="mb-4">

            <h2 className="fw-bold">
              Available Donations
            </h2>

            <p className="text-secondary">

              {foods.length} food donation
              {foods.length !== 1 ? "s" : ""} available

            </p>

          </div>


          {/* ==================================
              NO FOOD
          ================================== */}

          {foods.length === 0 ? (

            <div className="text-center py-5">

              <div
                style={{
                  fontSize: "60px"
                }}
              >
                🍱
              </div>

              <h3 className="fw-bold mt-3">
                No Food Available
              </h3>

              <p className="text-secondary">

                There are currently no available
                food donations.

              </p>

            </div>

          ) : (


            /* ==================================
               DONATION GRID
            ================================== */

            <div className="row g-4">

              {foods.map((food) => (

                <div
                  className="col-md-6 col-lg-4"
                  key={food.id}
                >

                  <div className="card h-100 border-0 shadow-sm">


                    {/* FOOD IMAGE */}

                    <div
                      className="bg-light text-center py-4"
                      style={{
                        fontSize: "55px"
                      }}
                    >
                      🍲
                    </div>


                    {/* FOOD INFORMATION */}

                    <div className="card-body">


                      {/* FOOD NAME */}

                      <h4 className="fw-bold mb-2">

                        {food.foodName}

                      </h4>


                      {/* CATEGORY */}

                      <p className="text-success fw-semibold mb-3">

                        {food.category}

                      </p>


                      {/* STATUS */}

                      <span className="badge bg-success mb-3">

                        AVAILABLE

                      </span>


                      {/* DETAILS */}

                      <div className="text-secondary">

                        <p className="mb-2">

                          <strong>
                            Quantity:
                          </strong>{" "}

                          {food.quantity} {food.unit}

                        </p>


                        <p className="mb-2">

                          <strong>
                            Prepared:
                          </strong>{" "}

                          {food.preparedDate}

                        </p>


                        <p className="mb-2">

                          <strong>
                            Expires:
                          </strong>{" "}

                          {food.expiryDate}

                        </p>


                        <p className="mb-0">

                          <strong>
                            Pickup:
                          </strong>{" "}

                          {food.pickupLocation}

                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </section>

    </div>

  );

}

export default AvailableFoods;