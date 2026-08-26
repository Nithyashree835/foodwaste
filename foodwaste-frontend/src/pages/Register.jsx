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

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    // Phone: allow digits only
    if (name === "phone") {

      const onlyNumbers = value
        .replace(/\D/g, "")
        .slice(0, 10);

      setFormData({
        ...formData,
        [name]: onlyNumbers
      });

    } else {

      setFormData({
        ...formData,
        [name]: value
      });

    }

    // Remove field error while typing
    setErrors({
      ...errors,
      [name]: ""
    });

    setMessage("");
  };


  // ==========================================
  // CHANGE ROLE
  // ==========================================

  const changeRole = (role) => {

    setFormData({
      ...formData,
      role: role
    });

    setErrors({});
    setMessage("");
  };


  // ==========================================
  // VALIDATE FORM
  // ==========================================

  const validateForm = () => {

    const newErrors = {};

    // ------------------------------------------
    // NAME
    // ------------------------------------------

    const name = formData.name.trim();

    if (!name) {

      newErrors.name = "Name is required";

    } else if (name.length < 2) {

      newErrors.name = "Name must contain at least 2 characters";

    } else if (name.length > 50) {

      newErrors.name = "Name must not exceed 50 characters";

    } else if (!/^[A-Za-z ]+$/.test(name)) {

      newErrors.name =
        "Name can contain only letters and spaces";

    }


    // ------------------------------------------
    // EMAIL
    // ------------------------------------------

    const email = formData.email.trim();

    if (!email) {

      newErrors.email = "Email address is required";

    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
    ) {

      newErrors.email =
        "Enter a valid email address";

    }


    // ------------------------------------------
    // PASSWORD
    // ------------------------------------------

    const password = formData.password;

    if (!password) {

      newErrors.password = "Password is required";

    } else if (password.length < 8) {

      newErrors.password =
        "Password must contain at least 8 characters";

    } else if (!/[A-Z]/.test(password)) {

      newErrors.password =
        "Password must contain at least one uppercase letter";

    } else if (!/[a-z]/.test(password)) {

      newErrors.password =
        "Password must contain at least one lowercase letter";

    } else if (!/[0-9]/.test(password)) {

      newErrors.password =
        "Password must contain at least one number";

    } else if (!/[!@#$%^&*(),.?":{}|<>_\-]/.test(password)) {

      newErrors.password =
        "Password must contain at least one special character";

    }


    // ------------------------------------------
    // PHONE
    // ------------------------------------------

    const phone = formData.phone.trim();

    if (!phone) {

      newErrors.phone =
        "Phone number is required";

    } else if (!/^[6-9][0-9]{9}$/.test(phone)) {

      newErrors.phone =
        "Enter a valid 10-digit Indian mobile number";

    }


    // ------------------------------------------
    // ADDRESS
    // ------------------------------------------

    const address = formData.address.trim();

    if (!address) {

      newErrors.address =
        "Address is required";

    } else if (address.length < 10) {

      newErrors.address =
        "Address must contain at least 10 characters";

    } else if (address.length > 200) {

      newErrors.address =
        "Address must not exceed 200 characters";

    }


    // ------------------------------------------
    // NGO VALIDATION
    // ------------------------------------------

    if (formData.role === "NGO") {

      const organizationName =
        formData.organizationName.trim();

      if (!organizationName) {

        newErrors.organizationName =
          "Organization name is required";

      } else if (organizationName.length < 2) {

        newErrors.organizationName =
          "Organization name must contain at least 2 characters";

      } else if (organizationName.length > 100) {

        newErrors.organizationName =
          "Organization name must not exceed 100 characters";

      }


      if (!formData.organizationType) {

        newErrors.organizationType =
          "Please select an organization type";

      }

    }


    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };


  // ==========================================
  // REGISTER
  // ==========================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setMessage("");

    // Stop if validation fails
    if (!validateForm()) {

      setMessage(
        "Please correct the highlighted fields"
      );

      return;
    }

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

        setErrors({});

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


        {/* =================================
            BRAND PANEL
        ================================= */}

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


        {/* =================================
            FORM PANEL
        ================================= */}

        <div className="auth-form-panel">

          <div className="auth-form-wrapper">


            {/* MOBILE LOGO */}

            <div className="auth-mobile-logo">

              <div className="auth-logo small">
                🍃
              </div>

              <span>
                FoodRescue
              </span>

            </div>


            {/* HEADING */}

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


            <form onSubmit={handleSubmit} noValidate>


              {/* =================================
                  NAME
              ================================= */}

              <div className="auth-input-group">

                <label>
                  {formData.role === "NGO"
                    ? "Contact Person Name"
                    : "Full Name"}
                </label>

                <div
                  className={`auth-input-wrapper ${
                    errors.name ? "input-error" : ""
                  }`}
                >

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
                    maxLength="50"
                    autoComplete="name"
                  />

                </div>

                {errors.name && (
                  <small className="field-error">
                    ⚠ {errors.name}
                  </small>
                )}

              </div>


              {/* =================================
                  EMAIL
              ================================= */}

              <div className="auth-input-group">

                <label>
                  Email Address
                </label>

                <div
                  className={`auth-input-wrapper ${
                    errors.email ? "input-error" : ""
                  }`}
                >

                  <span className="auth-input-icon">
                    ✉️
                  </span>

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />

                </div>

                {errors.email && (
                  <small className="field-error">
                    ⚠ {errors.email}
                  </small>
                )}

              </div>


              {/* =================================
                  PASSWORD
              ================================= */}

              <div className="auth-input-group">

                <label>
                  Password
                </label>

                <div
                  className={`auth-input-wrapper ${
                    errors.password ? "input-error" : ""
                  }`}
                >

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
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    maxLength="50"
                    autoComplete="new-password"
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
                  8+ characters • uppercase • lowercase • number • special character
                </small>

                {errors.password && (
                  <small className="field-error">
                    ⚠ {errors.password}
                  </small>
                )}

              </div>


              {/* =================================
                  ROLE
              ================================= */}

              <div className="auth-input-group">

                <label>
                  I want to join as
                </label>

                <div className="role-selection">


                  {/* DONOR */}

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


                  {/* NGO */}

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


              {/* =================================
                  DONOR INFORMATION
              ================================= */}

              {formData.role === "DONOR" && (

                <>

                  {/* PHONE */}

                  <div className="auth-input-group">

                    <label>
                      Phone Number
                    </label>

                    <div
                      className={`auth-input-wrapper ${
                        errors.phone ? "input-error" : ""
                      }`}
                    >

                      <span className="auth-input-icon">
                        📞
                      </span>

                      <input
                        type="tel"
                        name="phone"
                        placeholder="10-digit mobile number"
                        value={formData.phone}
                        onChange={handleChange}
                        inputMode="numeric"
                        maxLength="10"
                        autoComplete="tel"
                      />

                    </div>

                    {errors.phone && (
                      <small className="field-error">
                        ⚠ {errors.phone}
                      </small>
                    )}

                  </div>


                  {/* ADDRESS */}

                  <div className="auth-input-group">

                    <label>
                      Address
                    </label>

                    <div
                      className={`auth-input-wrapper ${
                        errors.address ? "input-error" : ""
                      }`}
                    >

                      <span className="auth-input-icon">
                        📍
                      </span>

                      <input
                        type="text"
                        name="address"
                        placeholder="Enter your address"
                        value={formData.address}
                        onChange={handleChange}
                        maxLength="200"
                        autoComplete="street-address"
                      />

                    </div>

                    {errors.address && (
                      <small className="field-error">
                        ⚠ {errors.address}
                      </small>
                    )}

                  </div>

                </>

              )}


              {/* =================================
                  NGO INFORMATION
              ================================= */}

              {formData.role === "NGO" && (

                <>

                  {/* ORGANIZATION NAME */}

                  <div className="auth-input-group">

                    <label>
                      Organization Name
                    </label>

                    <div
                      className={`auth-input-wrapper ${
                        errors.organizationName
                          ? "input-error"
                          : ""
                      }`}
                    >

                      <span className="auth-input-icon">
                        🏢
                      </span>

                      <input
                        type="text"
                        name="organizationName"
                        placeholder="Enter organization name"
                        value={formData.organizationName}
                        onChange={handleChange}
                        maxLength="100"
                      />

                    </div>

                    {errors.organizationName && (
                      <small className="field-error">
                        ⚠ {errors.organizationName}
                      </small>
                    )}

                  </div>


                  {/* ORGANIZATION TYPE */}

                  <div className="auth-input-group">

                    <label>
                      Organization Type
                    </label>

                    <div
                      className={`auth-input-wrapper ${
                        errors.organizationType
                          ? "input-error"
                          : ""
                      }`}
                    >

                      <span className="auth-input-icon">
                        🏛️
                      </span>

                      <select
                        name="organizationType"
                        value={formData.organizationType}
                        onChange={handleChange}
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

                    {errors.organizationType && (
                      <small className="field-error">
                        ⚠ {errors.organizationType}
                      </small>
                    )}

                  </div>


                  {/* NGO PHONE */}

                  <div className="auth-input-group">

                    <label>
                      Organization Phone Number
                    </label>

                    <div
                      className={`auth-input-wrapper ${
                        errors.phone ? "input-error" : ""
                      }`}
                    >

                      <span className="auth-input-icon">
                        📞
                      </span>

                      <input
                        type="tel"
                        name="phone"
                        placeholder="10-digit mobile number"
                        value={formData.phone}
                        onChange={handleChange}
                        inputMode="numeric"
                        maxLength="10"
                        autoComplete="tel"
                      />

                    </div>

                    {errors.phone && (
                      <small className="field-error">
                        ⚠ {errors.phone}
                      </small>
                    )}

                  </div>


                  {/* NGO ADDRESS */}

                  <div className="auth-input-group">

                    <label>
                      Organization Address
                    </label>

                    <div
                      className={`auth-input-wrapper ${
                        errors.address ? "input-error" : ""
                      }`}
                    >

                      <span className="auth-input-icon">
                        📍
                      </span>

                      <input
                        type="text"
                        name="address"
                        placeholder="Enter organization address"
                        value={formData.address}
                        onChange={handleChange}
                        maxLength="200"
                      />

                    </div>

                    {errors.address && (
                      <small className="field-error">
                        ⚠ {errors.address}
                      </small>
                    )}

                  </div>

                </>

              )}


              {/* =================================
                  MESSAGE
              ================================= */}

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


              {/* =================================
                  SUBMIT
              ================================= */}

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


            {/* LOGIN */}

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