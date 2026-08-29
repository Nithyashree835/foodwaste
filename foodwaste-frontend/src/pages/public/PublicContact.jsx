
import "./PublicContact.css";

function Contact() {

  return (

    <div className="public-contact-page">

      {/* =========================================
          HERO
      ========================================= */}

      <section className="contact-hero">

        <div className="contact-hero-content">

          <div className="contact-hero-icon">
            💚
          </div>

          <h1>
            Contact Us
          </h1>

          <p>
            Have a question or want to work with us?
            We'd love to hear from you.
          </p>

        </div>

      </section>


      {/* =========================================
          CONTACT INFORMATION
      ========================================= */}

      <section className="contact-section">

        <div className="contact-container">

          {/* LEFT */}

          <div className="contact-info">

            <span className="contact-small-title">
              GET IN TOUCH
            </span>

            <h2>
              Let's make a difference together.
            </h2>

            <p className="contact-description">
              Whether you want to donate surplus food,
              partner with FoodRescue, or learn more about
              our platform, we're here to help.
            </p>


            {/* EMAIL */}

            <div className="contact-info-card">

              <div className="contact-info-icon">
                📧
              </div>

              <div>

                <h4>
                  Email
                </h4>

                <p>
                  support@FoodRescue.com
                </p>

              </div>

            </div>


            {/* PHONE */}

            <div className="contact-info-card">

              <div className="contact-info-icon">
                📞
              </div>

              <div>

                <h4>
                  Phone
                </h4>

                <p>
                  +91 XXXXX XXXXX
                </p>

              </div>

            </div>


            {/* LOCATION */}

            <div className="contact-info-card">

              <div className="contact-info-icon">
                📍
              </div>

              <div>

                <h4>
                  Location
                </h4>

                <p>
                  Chennai, Tamil Nadu, India
                </p>

              </div>

            </div>

          </div>


          {/* RIGHT SIDE */}

          <div className="contact-right">

            <div className="contact-card-main">

              <div className="contact-card-icon">
                🌱
              </div>

              <h2>
                Be Part of the Change
              </h2>

              <p>
                FoodRescue connects surplus food with
                organizations that can distribute it to
                people who need it.
              </p>

              <div className="contact-highlight">

                <div>
                  🍱
                </div>

                <span>
                  Reduce Food Waste
                </span>

              </div>

              <div className="contact-highlight">

                <div>
                  🤝
                </div>

                <span>
                  Support Communities
                </span>

              </div>

              <div className="contact-highlight">

                <div>
                  🌍
                </div>

                <span>
                  Build a Sustainable Future
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          BOTTOM CTA
      ========================================= */}

      <section className="contact-bottom">

        <div>

          <span>
            ❤️
          </span>

          <h2>
            Together, We Can Make Every Meal Matter.
          </h2>

          <p>
            Join FoodRescue in turning surplus food into
            meaningful support for communities.
          </p>

        </div>

      </section>

    </div>

  );

}

export default Contact;
