import { useState } from "react";
import "./Contact.css";

function Contact() {

  const userName = localStorage.getItem("userName") || "";
  const userEmail = localStorage.getItem("userEmail") || "";
  const userRole = localStorage.getItem("userRole") || "";
  const userId = localStorage.getItem("userId");

  // ADMIN ID FROM MYSQL
  const ADMIN_ID = 11;

  const [type, setType] = useState("CONTACT");

  const [formData, setFormData] = useState({
    name: userName,
    email: userEmail,
    subject: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);


  // ==========================================
  // INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };


  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!formData.message.trim()) {

      alert("Please enter your message.");

      return;
    }

    if (!userId) {

      alert("User ID not found. Please login again.");

      return;
    }

    setLoading(true);

    try {

      const contactData = {

        name: formData.name,

        email: formData.email,

        subject:
          formData.subject ||
          (
            type === "FEEDBACK"
              ? "Feedback"
              : "Contact Admin"
          ),

        message: formData.message,

        senderRole: userRole,

        senderId: Number(userId),

        // ADMIN ID FROM USERS TABLE
        receiverId: ADMIN_ID,

        donorId: null,

        type: type

      };


      console.log(
        "Contact data:",
        contactData
      );


      const response = await fetch(
        "http://localhost:8080/api/contact",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(contactData)
        }
      );


      const result =
        await response.text();


      console.log(
        "Backend response:",
        response.status,
        result
      );


      if (response.ok) {

        alert(
          type === "FEEDBACK"
            ? "Feedback submitted successfully!"
            : "Message sent to admin successfully!"
        );


        setFormData({

          name: userName,
          email: userEmail,
          subject: "",
          message: ""

        });

      } else {

        alert(
          result ||
          "Failed to send message"
        );

      }

    } catch (error) {

      console.error(
        "Contact error:",
        error
      );

      alert(
        "Cannot connect to Spring Boot backend"
      );

    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // UI
  // ==========================================

  return (

    <div className="contact-page">

      <div className="contact-container">


        {/* =====================================
            CONTACT INFORMATION
        ===================================== */}

        <div className="contact-info">

          <h1>
            📞 Contact & Feedback
          </h1>

          <p>
            Contact the FoodRescue admin team
            or share your feedback with us.
          </p>


          <div className="contact-item">

            <h3>
              👤 Your Role
            </h3>

            <p>
              {userRole}
            </p>

          </div>


          <div className="contact-item">

            <h3>
              📧 Email
            </h3>

            <p>
              foodwaste@gmail.com
            </p>

          </div>


          <div className="contact-item">

            <h3>
              📞 Phone
            </h3>

            <p>
              +91 98765 43210
            </p>

          </div>


          <div className="contact-item">

            <h3>
              📍 Location
            </h3>

            <p>
              Chennai, Tamil Nadu
            </p>

          </div>

        </div>



        {/* =====================================
            FORM
        ===================================== */}

        <div className="contact-form">

          <h2>

            {type === "FEEDBACK"
              ? "⭐ Share Your Feedback"
              : "📩 Contact Admin"}

          </h2>


          <p>

            {type === "FEEDBACK"
              ? "Tell us what you think about FoodRescue."
              : "Have a question or need help? Send a message to the FoodRescue admin."}

          </p>


          {/* ==================================
              TYPE BUTTONS
          ================================== */}

          <div className="contact-type-buttons">

            <button
              type="button"
              className={
                type === "CONTACT"
                  ? "contact-type active"
                  : "contact-type"
              }
              onClick={() =>
                setType("CONTACT")
              }
            >
              📩 Contact Admin
            </button>


            <button
              type="button"
              className={
                type === "FEEDBACK"
                  ? "contact-type active"
                  : "contact-type"
              }
              onClick={() =>
                setType("FEEDBACK")
              }
            >
              ⭐ Feedback
            </button>

          </div>


          <form onSubmit={handleSubmit}>


            {/* NAME */}

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />


            {/* EMAIL */}

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />


            {/* SUBJECT */}

            <input
              type="text"
              name="subject"
              placeholder={
                type === "FEEDBACK"
                  ? "Feedback Subject"
                  : "Subject"
              }
              value={formData.subject}
              onChange={handleChange}
            />


            {/* MESSAGE */}

            <textarea
              name="message"
              placeholder={
                type === "FEEDBACK"
                  ? "Write your feedback..."
                  : "Write your message..."
              }
              value={formData.message}
              onChange={handleChange}
              rows="6"
              required
            />


            {/* SEND */}

            <button
              type="submit"
              disabled={loading}
            >

              {loading
                ? "Sending..."
                : type === "FEEDBACK"
                ? "⭐ Submit Feedback"
                : "📩 Send to Admin"}

            </button>

          </form>

        </div>

      </div>

    </div>

  );
}

export default Contact;