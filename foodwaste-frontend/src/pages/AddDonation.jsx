import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AddDonation.css";

function AddDonation() {

  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  // ==========================================
  // GET LOCAL DATE
  // ==========================================

  const getLocalDate = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const todayDate = getLocalDate();


  // ==========================================
  // FORM DATA
  // ==========================================

  const [formData, setFormData] = useState({

    donorName: "",

    foodName: "",

    category: "",

    quantity: "",

    unit: "",

    preparedDate: "",

    expiryDate: "",

    pickupLocation: "",

    description: ""

  });


  const [message, setMessage] = useState("");

  const [messageType, setMessageType] = useState("");

  const [loading, setLoading] = useState(false);


  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((previousData) => ({

      ...previousData,

      [name]: value

    }));

    if (messageType === "error") {

      setMessage("");

      setMessageType("");

    }
  };


  // ==========================================
  // VALIDATE FORM
  // ==========================================

  const validateForm = () => {

    const donorName =
      formData.donorName.trim();

    const foodName =
      formData.foodName.trim();

    const pickupLocation =
      formData.pickupLocation.trim();

    const description =
      formData.description.trim();

    const quantity =
      Number(formData.quantity);


    // ==========================================
    // DONOR NAME
    // ==========================================

    if (!donorName) {

      return "Please enter the donor name.";

    }

    if (donorName.length < 2) {

      return "Donor name must contain at least 2 characters.";

    }

    if (donorName.length > 50) {

      return "Donor name cannot exceed 50 characters.";

    }

    if (!/^[A-Za-z\s.]+$/.test(donorName)) {

      return "Donor name can contain only letters, spaces and dots.";

    }


    // ==========================================
    // FOOD NAME
    // ==========================================

    if (!foodName) {

      return "Please enter the food name.";

    }

    if (foodName.length < 2) {

      return "Food name must contain at least 2 characters.";

    }

    if (foodName.length > 100) {

      return "Food name cannot exceed 100 characters.";

    }


    // ==========================================
    // CATEGORY
    // ==========================================

    if (!formData.category) {

      return "Please select a food category.";

    }


    // ==========================================
    // UNIT
    // ==========================================

    if (!formData.unit) {

      return "Please select a unit.";

    }


    // ==========================================
    // QUANTITY
    // ==========================================

    if (!formData.quantity) {

      return "Please enter the food quantity.";

    }

    if (!Number.isFinite(quantity)) {

      return "Please enter a valid quantity.";

    }

    if (quantity <= 0) {

      return "Quantity must be greater than 0.";

    }

    if (quantity > 100000) {

      return "Quantity cannot exceed 100000.";

    }

    if (!/^\d+(\.\d{1,2})?$/.test(formData.quantity)) {

      return "Quantity can contain only numbers with up to 2 decimal places.";

    }


    // ==========================================
    // PREPARED DATE
    // ==========================================

    if (!formData.preparedDate) {

      return "Please select the prepared date.";

    }


    // ==========================================
    // EXPIRY DATE
    // ==========================================

    if (!formData.expiryDate) {

      return "Please select the expiry date.";

    }


    // ==========================================
    // DATE VALIDATION
    // ==========================================

    /*
       IMPORTANT:

       Do NOT use:

       new Date(formData.preparedDate)

       or:

       new Date().toISOString()

       for date-only comparisons.

       We compare YYYY-MM-DD strings instead.
    */


    // Prepared date cannot be future

    if (formData.preparedDate > todayDate) {

      return "Prepared date cannot be in the future.";

    }


    // Expiry cannot be before prepared date

    if (formData.expiryDate < formData.preparedDate) {

      return "Expiry date cannot be before prepared date.";

    }


    // Expiry cannot be in the past

    if (formData.expiryDate < todayDate) {

      return "Expiry date cannot be in the past.";

    }


    // ==========================================
    // PICKUP LOCATION
    // ==========================================

    if (!pickupLocation) {

      return "Please enter the pickup location.";

    }

    if (pickupLocation.length < 3) {

      return "Pickup location must contain at least 3 characters.";

    }

    if (pickupLocation.length > 200) {

      return "Pickup location cannot exceed 200 characters.";

    }


    // ==========================================
    // DESCRIPTION
    // ==========================================

    if (description.length > 500) {

      return "Description cannot exceed 500 characters.";

    }


    // ==========================================
    // VALID
    // ==========================================

    return null;
  };


  // ==========================================
  // HANDLE SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setMessage("");

    setMessageType("");


    // ==========================================
    // LOGIN CHECK
    // ==========================================

    if (!userId || Number(userId) <= 0) {

      setMessage(
        "Please login before donating food."
      );

      setMessageType("error");

      return;
    }


    // ==========================================
    // FORM VALIDATION
    // ==========================================

    const validationError =
      validateForm();

    if (validationError) {

      setMessage(validationError);

      setMessageType("error");

      return;
    }


    try {

      setLoading(true);


      // ==========================================
      // DONATION DATA
      // ==========================================

      const donationData = {

        donorId: Number(userId),

        donorName:
          formData.donorName.trim(),

        foodName:
          formData.foodName.trim(),

        category:
          formData.category,

        quantity:
          Number(formData.quantity),

        unit:
          formData.unit,

        preparedDate:
          formData.preparedDate,

        expiryDate:
          formData.expiryDate,

        pickupLocation:
          formData.pickupLocation.trim(),

        description:
          formData.description.trim()

      };


      console.log(
        "Sending donation:",
        donationData
      );


      // ==========================================
      // POST REQUEST
      // ==========================================

      const response = await fetch(
        "http://localhost:8080/api/donations",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(
            donationData
          )
        }
      );


      const result =
        await response.text();


      console.log(
        "Backend response:",
        result
      );


      // ==========================================
      // SUCCESS
      // ==========================================

      if (response.ok) {

        setMessage(
          result ||
          "Donation added successfully!"
        );

        setMessageType("success");


        // ==========================================
        // CLEAR FORM
        // ==========================================

        setFormData({

          donorName: "",

          foodName: "",

          category: "",

          quantity: "",

          unit: "",

          preparedDate: "",

          expiryDate: "",

          pickupLocation: "",

          description: ""

        });


        // ==========================================
        // NAVIGATE
        // ==========================================

        setTimeout(() => {

          navigate("/my-donations");

        }, 1200);

      } else {

        setMessage(
          result ||
          "Failed to add donation."
        );

        setMessageType("error");

      }

    } catch (error) {

      console.error(
        "Add donation error:",
        error
      );

      setMessage(
        "Cannot connect to Spring Boot backend."
      );

      setMessageType("error");

    } finally {

      setLoading(false);

    }
  };


  // ==========================================
  // PAGE
  // ==========================================

  return (

    <div className="add-donation-page">

      <div className="container py-5">


        {/* HEADER */}

        <div className="add-donation-header">

          <div className="add-donation-icon">
            🍱
          </div>

          <div>

            <h1>
              Donate Food
            </h1>

            <p>
              Share surplus food and help reduce food waste.
            </p>

          </div>

        </div>


        {/* FORM CARD */}

        <div className="add-donation-card">


          {/* CARD HEADER */}

          <div className="form-card-header">

            <div>

              <h3>
                Food Donation Details
              </h3>

              <p>
                Provide information about the food you want to donate.
              </p>

            </div>

            <span>
              🌱
            </span>

          </div>


          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="donation-form"
          >


            {/* DONOR INFORMATION */}

            <div className="form-section">

              <div className="section-title">

                <span>
                  👤
                </span>

                <div>

                  <h5>
                    Donor Information
                  </h5>

                  <small>
                    Tell us who is donating the food.
                  </small>

                </div>

              </div>


              <label className="custom-label">
                Donor Name
              </label>

              <input
                type="text"
                name="donorName"
                className="custom-input"
                placeholder="Enter your name"
                value={formData.donorName}
                onChange={handleChange}
                maxLength="50"
                required
              />

            </div>


            {/* FOOD INFORMATION */}

            <div className="form-section">

              <div className="section-title">

                <span>
                  🍲
                </span>

                <div>

                  <h5>
                    Food Information
                  </h5>

                  <small>
                    Provide details about the food.
                  </small>

                </div>

              </div>


              {/* FOOD NAME */}

              <label className="custom-label">
                Food Name
              </label>

              <input
                type="text"
                name="foodName"
                className="custom-input"
                placeholder="Example: Rice, Idli, Bread"
                value={formData.foodName}
                onChange={handleChange}
                maxLength="100"
                required
              />


              {/* CATEGORY + UNIT */}

              <div className="row">

                <div className="col-md-6">

                  <label className="custom-label">
                    Category
                  </label>

                  <select
                    name="category"
                    className="custom-input"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Select category
                    </option>

                    <option value="Cooked Food">
                      Cooked Food
                    </option>

                    <option value="Raw Food">
                      Raw Food
                    </option>

                    <option value="Packaged Food">
                      Packaged Food
                    </option>

                    <option value="Bakery">
                      Bakery
                    </option>

                    <option value="Fruits">
                      Fruits
                    </option>

                    <option value="Vegetables">
                      Vegetables
                    </option>

                  </select>

                </div>


                <div className="col-md-6">

                  <label className="custom-label">
                    Unit
                  </label>

                  <select
                    name="unit"
                    className="custom-input"
                    value={formData.unit}
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Select unit
                    </option>

                    <option value="kg">
                      Kilogram (kg)
                    </option>

                    <option value="litre">
                      Litre
                    </option>

                    <option value="pieces">
                      Pieces
                    </option>

                    <option value="packets">
                      Packets
                    </option>

                  </select>

                </div>

              </div>


              {/* QUANTITY */}

              <label className="custom-label">
                Quantity
              </label>

              <div className="quantity-input">

                <span>
                  📦
                </span>

                <input
                  type="number"
                  name="quantity"
                  min="0.01"
                  max="100000"
                  step="0.01"
                  className="custom-input"
                  placeholder="Enter quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            {/* DATE INFORMATION */}

            <div className="form-section">

              <div className="section-title">

                <span>
                  📅
                </span>

                <div>

                  <h5>
                    Food Dates
                  </h5>

                  <small>
                    Help NGOs know how fresh the food is.
                  </small>

                </div>

              </div>


              <div className="row">


                {/* PREPARED */}

                <div className="col-md-6">

                  <label className="custom-label">
                    Prepared Date
                  </label>

                  <input
                    type="date"
                    name="preparedDate"
                    className="custom-input"
                    value={formData.preparedDate}
                    onChange={handleChange}
                    max={todayDate}
                    required
                  />

                </div>


                {/* EXPIRY */}

                <div className="col-md-6">

                  <label className="custom-label">
                    Expiry Date
                  </label>

                  <input
                    type="date"
                    name="expiryDate"
                    className="custom-input"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    min={
                      formData.preparedDate ||
                      todayDate
                    }
                    required
                  />

                </div>

              </div>

            </div>


            {/* PICKUP */}

            <div className="form-section">

              <div className="section-title">

                <span>
                  📍
                </span>

                <div>

                  <h5>
                    Pickup Information
                  </h5>

                  <small>
                    Tell the NGO where the food can be collected.
                  </small>

                </div>

              </div>


              <label className="custom-label">
                Pickup Location
              </label>

              <input
                type="text"
                name="pickupLocation"
                className="custom-input"
                placeholder="Example: Chennai"
                value={formData.pickupLocation}
                onChange={handleChange}
                maxLength="200"
                required
              />

            </div>


            {/* DESCRIPTION */}

            <div className="form-section">

              <div className="section-title">

                <span>
                  💬
                </span>

                <div>

                  <h5>
                    Additional Information
                  </h5>

                  <small>
                    Add anything important about the food.
                  </small>

                </div>

              </div>


              <label className="custom-label">
                Description
              </label>

              <textarea
                name="description"
                className="custom-input custom-textarea"
                rows="4"
                maxLength="500"
                placeholder="Example: Vegetarian food, freshly prepared..."
                value={formData.description}
                onChange={handleChange}
              />

              <small className="description-counter">
                {formData.description.length}/500 characters
              </small>

            </div>


            {/* MESSAGE */}

            {message && (

              <div
                className={
                  messageType === "success"
                    ? "form-message success-message"
                    : "form-message error-message"
                }
              >

                <span>

                  {messageType === "success"
                    ? "✓"
                    : "⚠️"
                  }

                </span>

                {message}

              </div>

            )}


            {/* BUTTONS */}

            <div className="form-buttons">

              <Link
                to="/dashboard"
                className="cancel-button"
              >
                Cancel
              </Link>


              <button
                type="submit"
                className="submit-donation-button"
                disabled={loading}
              >

                {loading ? (

                  <>

                    <span className="button-spinner"></span>

                    Adding Donation...

                  </>

                ) : (

                  <>

                    🍱 Add Donation

                  </>

                )}

              </button>

            </div>

          </form>

        </div>


        {/* FOOTER MESSAGE */}

        <div className="donation-footer-message">

          <span>
            🌱
          </span>

          <div>

            <strong>
              Every donation matters.
            </strong>

            <p>
              Your surplus food can become someone's next meal.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AddDonation;