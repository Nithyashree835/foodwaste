
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
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
  // LOGIN
  // ==============================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {

      const response = await fetch(
  "https://foodwaste-backend-btuy.onrender.com/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(formData)
        }
      );

      const text = await response.text();

      if (!response.ok) {

        setMessage(
          text || "Invalid email or password"
        );

        return;
      }

      if (!text) {

        setMessage(
          "Invalid email or password"
        );

        return;
      }

      const user = JSON.parse(text);

      if (!user || !user.id) {

        setMessage(
          "Invalid login response"
        );

        return;
      }


      // ==============================
      // SAVE USER
      // ==============================

      localStorage.setItem(
        "userId",
        user.id
      );

      localStorage.setItem(
        "userName",
        user.name
      );

      localStorage.setItem(
        "userEmail",
        user.email
      );

      localStorage.setItem(
        "userRole",
        user.role
      );


      setMessage("Login successful!");


      // ==============================
      // REDIRECT
      // ==============================

      setTimeout(() => {

       if (user.role === "ADMIN") {

  navigate("/admin-dashboard");

} else if (user.role === "NGO") {

  navigate("/ngo-dashboard");

} else {

  navigate("/dashboard");

}

      }, 700);


    } catch (error) {

      console.error(
        "Login error:",
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
              🍲
            </div>

            <p className="auth-description">
              Connect surplus food with people
              and organizations that need it.
              Together, we can reduce food waste.
            </p>

            <div className="auth-features">

              <div>
                <span>✓</span>
                Reduce food waste
              </div>

              <div>
                <span>✓</span>
                Help your community
              </div>

              <div>
                <span>✓</span>
                Make every meal count
              </div>

            </div>

          </div>

        </div>


        {/* =========================
            LOGIN PANEL
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
                Welcome back 👋
              </span>

              <h2>
                Sign in to your account
              </h2>

              <p>
                Continue making a difference today.
              </p>

            </div>


            <form onSubmit={handleSubmit}>


              {/* EMAIL */}

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
                    autoComplete="email"
                    required
                  />

                </div>

              </div>


              {/* PASSWORD */}

              <div className="auth-input-group">

                <div className="auth-label-row">

                  <label>
                    Password
                  </label>

                </div>

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
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword
                      ? "🙈"
                      : "👁️"}
                  </button>

                </div>

              </div>


              {/* MESSAGE */}

              {message && (

                <div
                  className={
                    message === "Login successful!"
                      ? "auth-message success"
                      : "auth-message error"
                  }
                >
                  {message}
                </div>

              )}


              {/* BUTTON */}

              <button
                type="submit"
                className="auth-submit"
                disabled={loading}
              >

                {loading ? (
                  <>
                    <span className="auth-spinner"></span>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <span>→</span>
                  </>
                )}

              </button>

            </form>


            {/* REGISTER */}

            <div className="auth-switch">

              <span>
                Don't have an account?
              </span>

              <Link to="/register">
                Create Account
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

export default Login;
