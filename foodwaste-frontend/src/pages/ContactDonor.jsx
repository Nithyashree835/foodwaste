import { useEffect, useState } from "react";
import "./Contact.css";

function ContactDonor() {

  const [donors, setDonors] = useState([]);
  const [loadingDonors, setLoadingDonors] = useState(true);
  const [sending, setSending] = useState(false);

  const [formData, setFormData] = useState({
    donorId: "",
    subject: "",
    message: ""
  });


  // ==========================================
  // GET ALL DONORS
  // ==========================================

  useEffect(() => {

    const loadDonors = async () => {

      try {

        const response = await fetch(
          "http://foodwaste-backend-btuy.onrender.com/api/admin/users"
        );

        if (!response.ok) {
          throw new Error("Failed to load donors");
        }

        const data = await response.json();

        console.log("ALL USERS:", data);

        const donorUsers = data.filter(
          user =>
            String(user.role).toUpperCase() === "DONOR"
        );

        console.log("DONORS:", donorUsers);

        setDonors(donorUsers);

      } catch (error) {

        console.error(
          "Error loading donors:",
          error
        );

      } finally {

        setLoadingDonors(false);

      }
    };

    loadDonors();

  }, []);


  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };


  // ==========================================
  // SEND MESSAGE
  // ==========================================

  const handleSubmit = async (e) => {

    e.preventDefault();


    // ==========================================
    // VALIDATE DONOR
    // ==========================================

    if (!formData.donorId) {

      alert("Please select a donor.");

      return;
    }


    // ==========================================
    // VALIDATE MESSAGE
    // ==========================================

    if (!formData.message.trim()) {

      alert("Please enter your message.");

      return;
    }


    // ==========================================
    // GET NGO DETAILS
    // ==========================================

    const ngoId =
      localStorage.getItem("userId");

    const ngoName =
      localStorage.getItem("userName");

    const ngoEmail =
      localStorage.getItem("userEmail");


    console.log(
      "NGO ID from localStorage:",
      ngoId
    );

    console.log(
      "NGO Name:",
      ngoName
    );

    console.log(
      "NGO Email:",
      ngoEmail
    );


    // ==========================================
    // VALIDATE NGO ID
    // ==========================================

    if (!ngoId || Number(ngoId) <= 0) {

      alert(
        "Invalid NGO user ID. Please logout and login again."
      );

      return;
    }


    // ==========================================
    // FIND DONOR
    // ==========================================

    const selectedDonor =
      donors.find(
        donor =>
          Number(donor.id) ===
          Number(formData.donorId)
      );


    console.log(
      "Selected donor:",
      selectedDonor
    );


    if (!selectedDonor) {

      alert("Donor not found.");

      return;
    }


    // ==========================================
    // DONOR ID
    // ==========================================

    const donorId =
      Number(selectedDonor.id);


    console.log(
      "Final NGO ID:",
      Number(ngoId)
    );

    console.log(
      "Final DONOR ID:",
      donorId
    );


    // ==========================================
    // CREATE CONTACT DATA
    // ==========================================

    const contactData = {

      name:
        ngoName || "NGO",

      email:
        ngoEmail || "",

      subject:
        formData.subject ||
        "NGO wants to contact you",

      message:
        formData.message.trim(),

      senderRole:
        "NGO",

      senderId:
        Number(ngoId),

      receiverId:
        donorId,

      donorId:
        donorId,

      type:
        "CONTACT"
    };


    console.log(
      "SENDING CONTACT DATA:",
      contactData
    );


    setSending(true);


    // ==========================================
    // SEND REQUEST
    // ==========================================

    try {

      const response = await fetch(
        "http://foodwaste-backend-btuy.onrender.com/api/contact",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body:
            JSON.stringify(contactData)
        }
      );


      const result =
        await response.text();


      console.log(
        "BACKEND STATUS:",
        response.status
      );

      console.log(
        "BACKEND RESPONSE:",
        result
      );


      // ==========================================
      // SUCCESS
      // ==========================================

      if (response.ok) {

        alert(
          `Message sent to ${selectedDonor.name} successfully!`
        );


        setFormData({

          donorId: "",
          subject: "",
          message: ""

        });

      }

      // ==========================================
      // ERROR
      // ==========================================

      else {

        alert(
          result ||
          "Failed to send message"
        );

      }

    } catch (error) {

      console.error(
        "Contact donor error:",
        error
      );

      alert(
        "Cannot connect to Spring Boot backend"
      );

    } finally {

      setSending(false);

    }

  };


  // ==========================================
  // UI
  // ==========================================

  return (

    <div className="contact-page">

      <div className="contact-container">


        {/* ======================================
            INFORMATION
        ====================================== */}

        <div className="contact-info">

          <h1>
            🤝 Contact Donor
          </h1>

          <p>
            Contact a donor directly regarding
            their donated food.
          </p>


          <div className="contact-item">

            <h3>
              👤 Who can use this?
            </h3>

            <p>
              NGOs can send messages to donors
              about food donations and pickup
              coordination.
            </p>

          </div>


          <div className="contact-item">

            <h3>
              📩 Message Flow
            </h3>

            <p>
              NGO → Donor
            </p>

          </div>


          <div className="contact-item">

            <h3>
              🔔 Notifications
            </h3>

            <p>
              The donor will receive a notification
              when the message is sent.
            </p>

          </div>

        </div>


        {/* ======================================
            FORM
        ====================================== */}

        <div className="contact-form">

          <h2>
            Contact a Donor
          </h2>


          <form onSubmit={handleSubmit}>


            {/* DONOR */}

            <label>
              Select Donor
            </label>


            {loadingDonors ? (

              <p>
                Loading donors...
              </p>

            ) : donors.length === 0 ? (

              <p>
                No donors available.
              </p>

            ) : (

              <select
                name="donorId"
                value={formData.donorId}
                onChange={handleChange}
                required
              >

                <option value="">
                  -- Select Donor --
                </option>


                {donors.map(
                  donor => (

                    <option
                      key={donor.id}
                      value={donor.id}
                    >

                      {donor.name} - {donor.email}

                    </option>

                  )
                )}

              </select>

            )}


            {/* SUBJECT */}

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
            />


            {/* MESSAGE */}

            <textarea
              name="message"
              placeholder="Write your message to the donor..."
              value={formData.message}
              onChange={handleChange}
              rows="6"
              required
            />


            {/* SEND */}

            <button
              type="submit"
              disabled={
                sending ||
                loadingDonors ||
                donors.length === 0
              }
            >

              {sending
                ? "Sending..."
                : "Send Message"}

            </button>

          </form>

        </div>

      </div>

    </div>

  );
}

export default ContactDonor;