
import "./PublicPages.css";

function HowItWorks() {

  const steps = [

    {
      number: "01",
      icon: "👨‍🍳",
      title: "Donor Registers",
      text: "A food donor creates an account and joins the FoodRescue community."
    },

    {
      number: "02",
      icon: "🍱",
      title: "Food Is Listed",
      text: "The donor adds information about surplus food, quantity, expiry and pickup location."
    },

    {
      number: "03",
      icon: "🔎",
      title: "NGO Finds Food",
      text: "Registered NGOs can browse available food donations on the platform."
    },

    {
      number: "04",
      icon: "📝",
      title: "Request Is Sent",
      text: "An NGO can request a suitable food donation for the community it supports."
    },

    {
      number: "05",
      icon: "✅",
      title: "Donor Approves",
      text: "The donor reviews the request and can approve or reject it."
    },

    {
      number: "06",
      icon: "❤️",
      title: "Food Is Distributed",
      text: "The approved donation can then be collected and distributed to people who need it."
    },

  ];


  return (

    <div className="public-page">


      {/* HERO */}

      <section className="inner-hero">

        <div className="hero-decoration decoration-1"></div>
        <div className="hero-decoration decoration-2"></div>

        <div className="container text-center">

          <div className="inner-hero-icon">
            🔄
          </div>

          <h1>
            How It <span>Works</span>
          </h1>

          <p>
            From surplus food to someone who needs it.
          </p>

        </div>

      </section>


      {/* STEPS */}

      <section className="how-section section-padding">

        <div className="container">

          <div className="section-title-center">

            <span className="section-label">
              SIMPLE PROCESS
            </span>

            <h2>
              From Donation to Distribution
            </h2>

            <p>
              FoodRescue makes the process simple for
              donors and organizations.
            </p>

          </div>


          <div className="timeline">

            {steps.map((step, index) => (

              <div
                className={`timeline-item ${
                  index % 2 === 0
                    ? "timeline-left"
                    : "timeline-right"
                }`}
                key={index}
              >

                <div className="timeline-content">

                  <div className="timeline-top">

                    <span className="timeline-number">
                      {step.number}
                    </span>

                    <span className="timeline-icon">
                      {step.icon}
                    </span>

                  </div>

                  <h3>
                    {step.title}
                  </h3>

                  <p>
                    {step.text}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* GOAL */}

      <section className="goal-section">

        <div className="container">

          <div className="goal-box">

            <div className="goal-icon">
              🌱
            </div>

            <span className="section-label">
              OUR GOAL
            </span>

            <h2>
              Make Every Donation Count.
            </h2>

            <p>
              Our aim is to make food donation simple,
              transparent and accessible while reducing
              unnecessary food waste in our communities.
            </p>

          </div>

        </div>

      </section>

    </div>

  );

}

export default HowItWorks;