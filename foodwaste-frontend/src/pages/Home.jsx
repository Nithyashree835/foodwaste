import { Link } from "react-router-dom";

function Home() {

  const userEmail = localStorage.getItem("userEmail");

  return (
    <div>

      {/* Hero Section */}
      <section className="bg-success text-white py-5">
        <div className="container py-5">

          <div className="row align-items-center">

            <div className="col-md-7">

              <h1 className="display-4 fw-bold">
                Reduce Food Waste.
                <br />
                Feed Those in Need.
              </h1>

              <p className="lead mt-3">
                FoodRescue connects people with surplus
                food to communities that need it.
              </p>

              <div className="mt-4">

                {userEmail ? (

                  <Link
                    to="/dashboard"
                    className="btn btn-light btn-lg me-2"
                  >
                    Go to Dashboard
                  </Link>

                ) : (

                  <>
                    <Link
                      to="/register"
                      className="btn btn-light btn-lg me-2"
                    >
                      Get Started
                    </Link>

                    <Link
                      to="/login"
                      className="btn btn-outline-light btn-lg"
                    >
                      Login
                    </Link>
                  </>

                )}

              </div>

            </div>

            <div className="col-md-5 text-center mt-4 mt-md-0">

              <div
                className="bg-white text-success rounded-circle
                           d-inline-flex align-items-center
                           justify-content-center shadow"
                style={{
                  width: "220px",
                  height: "220px"
                }}
              >
                <span
                  style={{
                    fontSize: "90px"
                  }}
                >
                  🍲
                </span>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* How It Works */}
      <section className="py-5">

        <div className="container">

          <div className="text-center mb-5">

            <h2 className="fw-bold">
              How FoodRescue Works
            </h2>

            <p className="text-muted">
              Three simple steps to reduce food waste.
            </p>

          </div>


          <div className="row g-4">

            <div className="col-md-4">

              <div className="card border-0 shadow-sm h-100">

                <div className="card-body text-center p-4">

                  <div className="fs-1 mb-3">
                    🍱
                  </div>

                  <h4>
                    Donate
                  </h4>

                  <p className="text-muted">
                    Share your extra food instead of
                    throwing it away.
                  </p>

                </div>

              </div>

            </div>


            <div className="col-md-4">

              <div className="card border-0 shadow-sm h-100">

                <div className="card-body text-center p-4">

                  <div className="fs-1 mb-3">
                    🔍
                  </div>

                  <h4>
                    Find
                  </h4>

                  <p className="text-muted">
                    Browse available food donations
                    near you.
                  </p>

                </div>

              </div>

            </div>


            <div className="col-md-4">

              <div className="card border-0 shadow-sm h-100">

                <div className="card-body text-center p-4">

                  <div className="fs-1 mb-3">
                    ❤️
                  </div>

                  <h4>
                    Share
                  </h4>

                  <p className="text-muted">
                    Claim available food and help
                    prevent unnecessary waste.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* Call To Action */}
      <section className="bg-light py-5">

        <div className="container text-center">

          <h2 className="fw-bold">
            Every Meal Matters
          </h2>

          <p className="text-muted">
            Be part of the solution to food waste.
          </p>

          {!userEmail && (

            <Link
              to="/register"
              className="btn btn-success btn-lg"
            >
              Join FoodRescue
            </Link>

          )}

        </div>

      </section>

    </div>
  );
}

export default Home;