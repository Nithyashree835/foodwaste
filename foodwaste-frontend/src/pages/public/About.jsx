
import "./PublicPages.css";

function About() {

  return (

    <div className="public-page">

      {/* HERO */}

      <section className="inner-hero">

        <div className="hero-decoration decoration-1"></div>
        <div className="hero-decoration decoration-2"></div>

        <div className="container text-center">

          <div className="inner-hero-icon">
            🌱
          </div>

          <h1>
            About <span>FoodRescue</span>
          </h1>

          <p>
            Turning surplus food into meaningful support.
          </p>

        </div>

      </section>


      {/* WHO WE ARE */}

      <section className="about-intro section-padding">

        <div className="container">

          <div className="row align-items-center g-5">

            <div className="col-lg-5">

              <div className="about-visual">

                <div className="about-circle"></div>

                <div className="about-main-icon">
                  🍲
                </div>

                <div className="about-floating about-floating-one">
                  ♻️
                </div>

                <div className="about-floating about-floating-two">
                  ❤️
                </div>

              </div>

            </div>


            <div className="col-lg-7">

              <span className="section-label">
                WHO WE ARE
              </span>

              <h2 className="page-heading">
                Connecting Surplus Food
                <span> With People Who Need It</span>
              </h2>

              <p className="page-text">

                FoodRescue is a food waste management
                platform designed to connect food donors
                with NGOs and communities that can make
                use of surplus food.

              </p>

              <p className="page-text">

                Instead of allowing excess food to become
                waste, donors can list available food while
                registered organizations can discover and
                request suitable donations.

              </p>

              <p className="page-text">

                Our goal is simple: use technology to make
                food donation easier, more organized and
                more transparent.

              </p>


              <div className="about-highlights">

                <div>
                  <strong>🌱</strong>
                  <span>Reduce Food Waste</span>
                </div>

                <div>
                  <strong>🤝</strong>
                  <span>Connect Communities</span>
                </div>

                <div>
                  <strong>❤️</strong>
                  <span>Create Social Impact</span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* MISSION + VISION */}

      <section className="mission-section section-padding">

        <div className="container">

          <div className="section-title-center">

            <span className="section-label">
              OUR PURPOSE
            </span>

            <h2>
              Why FoodRescue Exists
            </h2>

            <p>
              We believe technology can help create a
              better connection between surplus food
              and community needs.
            </p>

          </div>


          <div className="row g-4">

            <div className="col-lg-6">

              <div className="purpose-card mission-card">

                <div className="purpose-icon">
                  🎯
                </div>

                <div>

                  <h3>
                    Our Mission
                  </h3>

                  <p>

                    To reduce avoidable food waste by
                    creating an efficient connection between
                    food donors and organizations that can
                    distribute surplus food to people in need.

                  </p>

                </div>

              </div>

            </div>


            <div className="col-lg-6">

              <div className="purpose-card vision-card">

                <div className="purpose-icon">
                  🌍
                </div>

                <div>

                  <h3>
                    Our Vision
                  </h3>

                  <p>

                    To build a community where surplus food
                    is shared responsibly instead of being
                    wasted, creating a more sustainable
                    and caring society.

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* VALUES */}

      <section className="values-section section-padding">

        <div className="container">

          <div className="section-title-center">

            <span className="section-label">
              OUR VALUES
            </span>

            <h2>
              What We Stand For
            </h2>

          </div>


          <div className="row g-4">

            <div className="col-md-4">

              <div className="value-card">

                <div>♻️</div>

                <h3>
                  Sustainability
                </h3>

                <p>
                  Encouraging responsible use of food
                  and reducing unnecessary waste.
                </p>

              </div>

            </div>


            <div className="col-md-4">

              <div className="value-card">

                <div>🤝</div>

                <h3>
                  Community
                </h3>

                <p>
                  Bringing donors and organizations
                  together to support communities.
                </p>

              </div>

            </div>


            <div className="col-md-4">

              <div className="value-card">

                <div>🔍</div>

                <h3>
                  Transparency
                </h3>

                <p>
                  Making the donation process organized,
                  visible and easy to manage.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>

  );

}

export default About;
