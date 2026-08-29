
import "./PublicPages.css";

function Services() {

  const services = [

    {
      icon: "🍱",
      title: "Food Donation",
      description:
        "Donors can list surplus food with details such as quantity, category, expiry date and pickup location.",
    },

    {
      icon: "🔎",
      title: "Food Discovery",
      description:
        "Registered organizations can discover available food donations and identify food suitable for their needs.",
    },

    {
      icon: "🤝",
      title: "NGO Requests",
      description:
        "NGOs can request available donations and coordinate with donors through the platform.",
    },

    {
      icon: "📦",
      title: "Food Collection",
      description:
        "Approved donations can be coordinated for collection and distribution to the communities that need them.",
    },

    {
      icon: "🔔",
      title: "Real-Time Updates",
      description:
        "Donors can receive notifications and updates about requests made for their food donations.",
    },

    {
      icon: "🌱",
      title: "Waste Reduction",
      description:
        "Every successful donation helps keep usable food away from unnecessary waste and supports a more sustainable community.",
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
            🛠️
          </div>

          <h1>
            Our <span>Services</span>
          </h1>

          <p>
            Technology that helps turn surplus food
            into meaningful community support.
          </p>

        </div>

      </section>


      {/* SERVICES */}

      <section className="services-public section-padding">

        <div className="container">

          <div className="section-title-center">

            <span className="section-label">
              WHAT WE DO
            </span>

            <h2>
              One Platform. Multiple Ways to Help.
            </h2>

            <p>
              FoodRescue provides simple tools that make
              food donation and redistribution easier.
            </p>

          </div>


          <div className="row g-4">

            {services.map((service, index) => (

              <div
                className="col-md-6 col-lg-4"
                key={index}
              >

                <div className="service-public-card">

                  <div className="service-number">
                    0{index + 1}
                  </div>

                  <div className="service-public-icon">
                    {service.icon}
                  </div>

                  <h3>
                    {service.title}
                  </h3>

                  <p>
                    {service.description}
                  </p>

                  <div className="service-arrow">
                    →
                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* IMPACT */}

      <section className="service-impact">

        <div className="container">

          <div className="service-impact-box">

            <div className="impact-big-icon">
              🌍
            </div>

            <div>

              <span className="section-label">
                OUR IMPACT
              </span>

              <h2>
                Small Donations Can Create
                Big Change.
              </h2>

              <p>
                When surplus food is redirected instead
                of wasted, everyone benefits — donors,
                organizations, communities and the
                environment.
              </p>

            </div>

          </div>

        </div>

      </section>

    </div>

  );

}

export default Services;