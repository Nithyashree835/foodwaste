import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PublicHome.css";

function PublicHome() {
  const navigate = useNavigate();

  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://foodwaste-backend-btuy.onrender.com/api/donations"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch donations");
        }

        return response.json();
      })
      .then((data) => {
        const available = data.filter(
          (donation) => donation.status === "AVAILABLE"
        );

        setDonations(available);
      })
      .catch((error) => {
        console.error("Error loading donations:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="public-home">

      {/* HERO */}
      <section className="public-hero">

        <div className="hero-overlay"></div>

        <div className="container hero-content">

          <div className="hero-text">

            <span className="hero-badge">
              🌱 Together Against Food Waste
            </span>

            <h1>
              Share Food.
              <br />
              <span>Save Lives.</span>
            </h1>

            <p>
              Connecting surplus food with NGOs and communities
              that need it. Let's turn food waste into hope.
            </p>

            <div className="hero-buttons">

              <button
                className="hero-primary-btn"
                onClick={() => navigate("/available-foods")}
              >
                🍱 View Available Food
              </button>

              <button
                className="hero-secondary-btn"
                onClick={() => navigate("/how-it-works")}
              >
                How It Works →
              </button>

            </div>

          </div>

          <div className="hero-visual">

            <div className="floating-card card-one">
              🍱
              <span>Food Saved</span>
            </div>

            <div className="food-circle">
              🍲
            </div>

            <div className="floating-card card-two">
              ❤️
              <span>Helping Communities</span>
            </div>

          </div>

        </div>

      </section>


      {/* STATS */}
      <section className="public-stats">

        <div className="container">

          <div className="stats-grid">

            <div className="stat-card">
              <div className="stat-icon">🍱</div>
              <h2>{donations.length}</h2>
              <p>Available Foods</p>
            </div>

            <div className="stat-card">
              <div className="stat-icon">🤝</div>
              <h2>100%</h2>
              <p>Community Driven</p>
            </div>

            <div className="stat-card">
              <div className="stat-icon">🌱</div>
              <h2>24/7</h2>
              <p>Food Sharing</p>
            </div>

            <div className="stat-card">
              <div className="stat-icon">❤️</div>
              <h2>1</h2>
              <p>Mission: Zero Waste</p>
            </div>

          </div>

        </div>

      </section>


      {/* AVAILABLE FOOD PREVIEW */}
      <section className="food-preview">

        <div className="container">

          <div className="section-heading">

            <span>AVAILABLE NOW</span>

            <h2>
              Food Waiting to Be Shared
            </h2>

            <p>
              Explore surplus food currently available
              through our platform.
            </p>

          </div>


          {loading ? (

            <div className="food-loading">
              Loading available food...
            </div>

          ) : donations.length === 0 ? (

            <div className="no-food">
              <div>🍱</div>

              <h3>
                No food available right now
              </h3>

              <p>
                New donations will appear here when
                donors share surplus food.
              </p>
            </div>

          ) : (

            <div className="food-grid">

              {donations.slice(0, 6).map((donation) => (

                <div
                  className="public-food-card"
                  key={donation.id}
                >

                  <div className="food-image">
                    🍲

                    <span>
                      AVAILABLE
                    </span>
                  </div>

                  <div className="food-content">

                    <h3>
                      {donation.foodName}
                    </h3>

                    <p className="food-category">
                      {donation.category}
                    </p>

                    <div className="food-info">

                      <p>
                        📦
                        <strong> Quantity:</strong>{" "}
                        {donation.quantity}{" "}
                        {donation.unit}
                      </p>

                      <p>
                        📍
                        <strong> Pickup:</strong>{" "}
                        {donation.pickupLocation}
                      </p>

                      <p>
                        ⏰
                        <strong> Expires:</strong>{" "}
                        {donation.expiryDate}
                      </p>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}


          {donations.length > 6 && (

            <div className="center-button">

              <button
                onClick={() => navigate("/available-foods")}
              >
                View All Available Food →
              </button>

            </div>

          )}

        </div>

      </section>


      {/* ABOUT */}
      <section className="about-preview">

        <div className="container">

          <div className="about-grid">

            <div className="about-visual">

              <div className="about-circle">
                🌱
              </div>

              <div className="about-floating">
                ♻️
                <span>
                  Reduce Waste
                </span>
              </div>

            </div>


            <div className="about-content">

              <span className="section-label">
                ABOUT FOODRESCUE
              </span>

              <h2>
                Turning Surplus Food
                Into Meaningful Support
              </h2>

              <p>
                FoodRescue is a technology platform designed
                to connect food donors with NGOs and
                communities that need surplus food.
              </p>

              <p>
                Instead of allowing excess food to become
                waste, donors can share it through our
                platform while registered organizations
                can discover and request available food.
              </p>

              <button
                onClick={() => navigate("/about")}
              >
                Learn More →
              </button>

            </div>

          </div>

        </div>

      </section>


      {/* SERVICES */}
      <section className="services-preview">

        <div className="container">

          <div className="section-heading">

            <span>WHAT WE DO</span>

            <h2>
              Our Services
            </h2>

            <p>
              Simple technology for meaningful food
              redistribution.
            </p>

          </div>


          <div className="services-grid">

            <div className="service-card">
              <div>🍱</div>
              <h3>Food Donation</h3>
              <p>
                Donors can list their surplus food
                with important details.
              </p>
            </div>

            <div className="service-card">
              <div>🔎</div>
              <h3>Food Discovery</h3>
              <p>
                NGOs can find available food
                donations easily.
              </p>
            </div>

            <div className="service-card">
              <div>🤝</div>
              <h3>NGO Requests</h3>
              <p>
                Organizations can request food
                for their communities.
              </p>
            </div>

            <div className="service-card">
              <div>🔔</div>
              <h3>Notifications</h3>
              <p>
                Donors receive updates about
                donation requests.
              </p>
            </div>

          </div>


          <div className="center-button">

            <button
              onClick={() => navigate("/services")}
            >
              Explore All Services →
            </button>

          </div>

        </div>

      </section>


      {/* HOW IT WORKS */}
      <section className="how-preview">

        <div className="container">

          <div className="section-heading">

            <span>SIMPLE PROCESS</span>

            <h2>
              How FoodRescue Works
            </h2>

          </div>


          <div className="steps-grid">

            <div className="step-card">
              <div className="step-number">01</div>
              <div className="step-icon">👨‍🍳</div>
              <h3>Donate</h3>
              <p>
                Donor lists surplus food.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">02</div>
              <div className="step-icon">🔎</div>
              <h3>Discover</h3>
              <p>
                NGOs find available food.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">03</div>
              <div className="step-icon">📝</div>
              <h3>Request</h3>
              <p>
                NGO sends a request.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">04</div>
              <div className="step-icon">❤️</div>
              <h3>Share</h3>
              <p>
                Food reaches people in need.
              </p>
            </div>

          </div>


          <div className="center-button">

            <button
              onClick={() => navigate("/how-it-works")}
            >
              See Full Process →
            </button>

          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="public-cta">

        <div className="container">

          <div className="cta-content">

            <div>
              <span>
                MAKE A DIFFERENCE
              </span>

              <h2>
                Have Surplus Food?
              </h2>

              <p>
                Don't let good food go to waste.
                Join FoodRescue and help someone today.
              </p>
            </div>

            <button
              onClick={() => navigate("/register")}
            >
              Get Started →
            </button>

          </div>

        </div>

      </section>

    </div>
  );
}

export default PublicHome;