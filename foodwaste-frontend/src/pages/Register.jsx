import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "DONOR",
    phone: "",
    address: "",
    organizationName: "",
    organizationType: ""
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  // ==============================
  // HANDLE INPUT
  // ==============================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };


  // ==============================
  // CHANGE ROLE
  // ==============================

  const changeRole = (role) => {

    setFormData({
      ...formData,
      role: role
    });

    setMessage("");

  };


  // ==============================
  // REGISTER
  // ==============================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setMessage("");
    setLoading(true);


    try {

      const response = await fetch(
        "https://foodwaste-backend-btuy.onrender.com/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(formData)
        }
      );


      const result = await response.text();


      if (response.ok) {

        setMessage(
          "Registration successful!"
        );


        setFormData({
          name: "",
          email: "",
          password: "",
          role: "DONOR",
          phone: "",
          address: "",
          organizationName: "",
          organizationType: ""
        });


        setTimeout(() => {

          navigate("/login");

        }, 1000);

      } else {

        setMessage(
          result || "Registration failed"
        );

      }


    } catch (error) {

      console.error(
        "Registration error:",
        error
      );

      setMessage(
        "Cannot connect to Spring Boot backend"
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="auth-page">

      <div className="auth-container">


        {/* =========================
            LEFT BRAND PANEL
        ========================= */}

        <div className="auth-brand-panel">

          <div className="auth-brand-content">

            <div className="auth-logo">
              🍃
            </div>

            <h1>
              FoodRescue
            </h1>

            <p className="auth-tagline">
              Save food. Help people.
            </p>

            <div className="auth-decoration">
              🌱
            </div>

            <p className="auth-description">
              Be part of a community that connects
              surplus food with people who need it.
            </p>

            <div className="auth-features">

              <div>
                <span>✓</span>
                Donate surplus food
              </div>

              <div>
                <span>✓</span>
                Support local NGOs
              </div>

              <div>
                <span>✓</span>
                Build a better community
              </div>

            </div>

          </div>

        </div>


        {/* =========================
            REGISTER PANEL
        ========================= */}

        <div className="auth-form-panel">

          <div className="auth-form-wrapper">


            <div className="auth-mobile-logo">

              <div className="auth-logo small">
                🍃
              </div>

              <span>
                FoodRescue
              </span>

            </div>


            <div className="auth-heading">

              <span className="auth-welcome">
                Get started 🌱
              </span>

              <h2>
                Create your account
              </h2>

              <p>
                Join FoodRescue and make an impact.
              </p>

            </div>


            <form onSubmit={handleSubmit}>


              {/* =========================
                  FULL NAME
              ========================= */}

              <div className="auth-input-group">

                <label>
                  {formData.role === "NGO"
                    ? "Contact Person Name"
                    : "Full Name"}
                </label>

                <div className="auth-input-wrapper">

                  <span className="auth-input-icon">
                    👤
                  </span>

                  <input
                    type="text"
                    name="name"
                    placeholder={
                      formData.role === "NGO"
                        ? "Enter contact person name"
                        : "Enter your full name"
                    }
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>


              {/* =========================
                  EMAIL
              ========================= */}

              <div className="auth-input-group">

                <label>
                  Email Address
                </label>

                <div className="auth-input-wrapper">

                  <span className="auth-input-icon">
                    ✉️
                  </span>

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>


              {/* =========================
                  PASSWORD
              ========================= */}

              <div className="auth-input-group">

                <label>
                  Password
                </label>

                <div className="auth-input-wrapper">

                  <span className="auth-input-icon">
                    🔒
                  </span>

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    placeholder="Create a password"
                    minLength="6"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                  >
                    {showPassword
                      ? "🙈"
                      : "👁️"}
                  </button>

                </div>

                <small className="password-hint">
                  Minimum 6 characters
                </small>

              </div>


              {/* =========================
                  ROLE
              ========================= */}

              <div className="auth-input-group">

                <label>
                  I want to join as
                </label>

                <div className="role-selection">


                  {/* =========================
                      DONOR
                  ========================= */}

                  <button
                    type="button"
                    className={
                      formData.role === "DONOR"
                        ? "role-card selected"
                        : "role-card"
                    }
                    onClick={() =>
                      changeRole("DONOR")
                    }
                  >

                    <span className="role-icon">
                      🍱
                    </span>

                    <span className="role-text">

                      <strong>
                        Food Donor
                      </strong>

                      <small>
                        Share surplus food
                      </small>

                    </span>

                    <span className="role-check">

                      {formData.role === "DONOR"
                        ? "✓"
                        : ""}

                    </span>

                  </button>


                  {/* =========================
                      NGO
                  ========================= */}

                  <button
                    type="button"
                    className={
                      formData.role === "NGO"
                        ? "role-card selected"
                        : "role-card"
                    }
                    onClick={() =>
                      changeRole("NGO")
                    }
                  >

                    <span className="role-icon">
                      ❤️
                    </span>

                    <span className="role-text">

                      <strong>
                        NGO / Organization
                      </strong>

                      <small>
                        Help people in need
                      </small>

                    </span>

                    <span className="role-check">

                      {formData.role === "NGO"
                        ? "✓"
                        : ""}

                    </span>

                  </button>

                </div>

              </div>


              {/* =================================================
                  DONOR INFORMATION
              ================================================= */}

              {formData.role === "DONOR" && (

                <>

                  {/* PHONE */}

                  <div className="auth-input-group">

                    <label>
                      Phone Number
                    </label>

                    <div className="auth-input-wrapper">

                      <span className="auth-input-icon">
                        📞
                      </span>

                      <input
                        type="tel"
                        name="phone"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />

                    </div>

                  </div>


                  {/* ADDRESS */}

                  <div className="auth-input-group">

                    <label>
                      Address
                    </label>

                    <div className="auth-input-wrapper">

                      <span className="auth-input-icon">
                        📍
                      </span>

                      <input
                        type="text"
                        name="address"
                        placeholder="Enter your address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />

                    </div>

                  </div>

                </>

              )}


              {/* =================================================
                  NGO INFORMATION
              ================================================= */}

              {formData.role === "NGO" && (

                <>

                  {/* ORGANIZATION NAME */}

                  <div className="auth-input-group">

                    <label>
                      Organization Name
                    </label>

                    <div className="auth-input-wrapper">

                      <span className="auth-input-icon">
                        🏢
                      </span>

                      <input
                        type="text"
                        name="organizationName"
                        placeholder="Enter organization name"
                        value={formData.organizationName}
                        onChange={handleChange}
                        required
                      />

                    </div>

                  </div>


                  {/* ORGANIZATION TYPE */}

                  <div className="auth-input-group">

                    <label>
                      Organization Type
                    </label>

                    <div className="auth-input-wrapper">

                      <span className="auth-input-icon">
                        🏛️
                      </span>

                      <select
                        name="organizationType"
                        value={formData.organizationType}
                        onChange={handleChange}
                        required
                      >

                        <option value="">
                          Select organization type
                        </option>

                        <option value="NGO">
                          NGO
                        </option>

                        <option value="Charitable Trust">
                          Charitable Trust
                        </option>

                        <option value="Community Organization">
                          Community Organization
                        </option>

                        <option value="Non-Profit Organization">
                          Non-Profit Organization
                        </option>

                        <option value="Orphanage">
                          Orphanage
                        </option>

                        <option value="Old Age Home">
                          Old Age Home
                        </option>

                        <option value="Food Bank">
                          Food Bank
                        </option>

                        <option value="Other">
                          Other
                        </option>

                      </select>

                    </div>

                  </div>


                  {/* PHONE */}

                  <div className="auth-input-group">

                    <label>
                      Organization Phone Number
                    </label>

                    <div className="auth-input-wrapper">

                      <span className="auth-input-icon">
                        📞
                      </span>

                      <input
                        type="tel"
                        name="phone"
                        placeholder="Enter organization phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />

                    </div>

                  </div>


                  {/* ADDRESS */}

                  <div className="auth-input-group">

                    <label>
                      Organization Address
                    </label>

                    <div className="auth-input-wrapper">

                      <span className="auth-input-icon">
                        📍
                      </span>

                      <input
                        type="text"
                        name="address"
                        placeholder="Enter organization address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />

                    </div>

                  </div>

                </>

              )}


              {/* =========================
                  MESSAGE
              ========================= */}

              {message && (

                <div
                  className={
                    message ===
                    "Registration successful!"
                      ? "auth-message success"
                      : "auth-message error"
                  }
                >
                  {message}
                </div>

              )}


              {/* =========================
                  SUBMIT
              ========================= */}

              <button
                type="submit"
                className="auth-submit"
                disabled={loading}
              >

                {loading ? (

                  <>
                    <span className="auth-spinner"></span>
                    Creating Account...
                  </>

                ) : (

                  <>
                    Create Account
                    <span>→</span>
                  </>

                )}

              </button>

            </form>


            {/* =========================
                LOGIN
            ========================= */}

            <div className="auth-switch">

              <span>
                Already have an account?
              </span>

              <Link to="/login">
                Sign In
              </Link>

            </div>


            <div className="auth-footer">
              © 2026 FoodRescue
            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Register;