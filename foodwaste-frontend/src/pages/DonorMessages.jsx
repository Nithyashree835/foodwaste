import { useEffect, useState } from "react";
import "./DonorMessages.css";

function DonorMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const donorId = localStorage.getItem("userId");

  // ==========================================
  // FETCH MESSAGES
  // ==========================================

  const fetchMessages = async () => {
    if (!donorId) {
      setMessages([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `https://foodwaste-backend-btuy.onrender.com/api/contact/donor/${donorId}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to load messages. Status: ${response.status}`
        );
      }

      const data = await response.json();

      console.log("Donor messages:", data);

      if (Array.isArray(data)) {
        setMessages(data);
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.error("Fetch donor messages error:", error);

      setError(
        "Unable to load messages. Please try again."
      );

      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD
  // ==========================================

  useEffect(() => {
    fetchMessages();
  }, [donorId]);

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (dateString) => {
    if (!dateString) {
      return "Unknown date";
    }

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return dateString;
    }

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="donor-messages-page">
        <div className="donor-messages-container">

          <div className="messages-loading">
            <div className="loading-spinner"></div>

            <h3>Loading messages...</h3>

            <p>
              Please wait while we load your messages.
            </p>
          </div>

        </div>
      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="donor-messages-page">

      <div className="donor-messages-container">

        {/* ======================================
            HEADER
        ====================================== */}

        <div className="messages-page-header">

          <div className="messages-header-left">

            <div className="messages-header-icon">
              💬
            </div>

            <div>
              <h1>Messages</h1>

              <p>
                Messages received from NGOs
              </p>
            </div>

          </div>

          <button
            className="refresh-message-button"
            onClick={fetchMessages}
          >
            🔄
            <span>Refresh</span>
          </button>

        </div>


        {/* ======================================
            MESSAGE COUNT
        ====================================== */}

        {!error && messages.length > 0 && (
          <div className="message-count-bar">

            <span>
              📩
            </span>

            <strong>
              {messages.length}
            </strong>

            <span>
              {messages.length === 1
                ? "message"
                : "messages"}{" "}
              received
            </span>

          </div>
        )}


        {/* ======================================
            ERROR
        ====================================== */}

        {error && (
          <div className="messages-error">

            <div className="error-icon">
              ⚠️
            </div>

            <div>
              <h3>
                Unable to load messages
              </h3>

              <p>
                {error}
              </p>

              <button
                onClick={fetchMessages}
              >
                Try Again
              </button>
            </div>

          </div>
        )}


        {/* ======================================
            EMPTY
        ====================================== */}

        {!error && messages.length === 0 && (
          <div className="messages-empty">

            <div className="empty-message-icon">
              📭
            </div>

            <h2>
              No messages yet
            </h2>

            <p>
              When an NGO contacts you,
              their message will appear here.
            </p>

          </div>
        )}


        {/* ======================================
            MESSAGE LIST
        ====================================== */}

        {!error && messages.length > 0 && (

          <div className="messages-list">

            {messages.map((message, index) => (

              <div
                className="message-card"
                key={message.id || index}
              >

                {/* TOP BORDER */}
                <div className="message-card-top-line"></div>


                {/* ==================================
                    CARD HEADER
                ================================== */}

                <div className="message-card-header">

                  <div className="sender-section">

                    <div className="sender-avatar">
                      {message.name
                        ? message.name
                            .charAt(0)
                            .toUpperCase()
                        : "N"}
                    </div>

                    <div className="sender-details">

                      <span className="from-label">
                        MESSAGE FROM
                      </span>

                      <h3>
                        {message.name || "Unknown NGO"}
                      </h3>

                      <p>
                        🤝 NGO
                      </p>

                    </div>

                  </div>


                  <div className="message-badge">
                    💬 Contact
                  </div>

                </div>


                {/* ==================================
                    SUBJECT
                ================================== */}

                <div className="message-subject">

                  <span className="subject-icon">
                    📌
                  </span>

                  <div>

                    <span className="subject-label">
                      SUBJECT
                    </span>

                    <h2>
                      {message.subject ||
                        "No subject"}
                    </h2>

                  </div>

                </div>


                {/* ==================================
                    MESSAGE BODY
                ================================== */}

                <div className="message-content-box">

                  <div className="message-content-title">
                    <span>💬</span>
                    <span>Message</span>
                  </div>

                  <p>
                    {message.message ||
                      "No message content"}
                  </p>

                </div>


                {/* ==================================
                    FOOTER
                ================================== */}

                <div className="message-card-footer">

                  <div className="message-info">

                    <div className="info-item">

                      <span className="info-icon">
                        📧
                      </span>

                      <div>
                        <small>
                          EMAIL
                        </small>

                        <strong>
                          {message.email ||
                            "Not available"}
                        </strong>
                      </div>

                    </div>


                    <div className="info-item">

                      <span className="info-icon">
                        🕒
                      </span>

                      <div>
                        <small>
                          RECEIVED
                        </small>

                        <strong>
                          {formatDate(
                            message.createdAt
                          )}
                        </strong>
                      </div>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default DonorMessages;