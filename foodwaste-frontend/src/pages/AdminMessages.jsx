import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminMessages() {

  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");

  const userRole = localStorage.getItem("userRole");


  // ==========================================
  // SECURITY + FETCH
  // ==========================================

  useEffect(() => {

    if (userRole !== "ADMIN") {
      navigate("/login");
      return;
    }

    fetchMessages();

  }, [userRole, navigate]);


  // ==========================================
  // FETCH ALL MESSAGES
  // ==========================================

  const fetchMessages = async () => {

    try {

      setLoading(true);

      const response = await fetch(
        "https://foodwaste-backend-btuy.onrender.com/api/contact/admin"
      );

      if (!response.ok) {
        throw new Error("Failed to load messages");
      }

      const data = await response.json();

      setMessages(data);

    } catch (error) {

      console.error(
        "Fetch messages error:",
        error
      );

    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // FILTER
  // ==========================================

  const filteredMessages = messages.filter(
    (message) => {

      const searchText =
        search.toLowerCase().trim();

      const sender =
        message.name || "";

      const email =
        message.email || "";

      const subject =
        message.subject || "";

      const messageText =
        message.message || "";

      const type =
        message.type || "CONTACT";


      const matchesSearch =
        !searchText ||
        sender.toLowerCase().includes(searchText) ||
        email.toLowerCase().includes(searchText) ||
        subject.toLowerCase().includes(searchText) ||
        messageText.toLowerCase().includes(searchText);


      const matchesType =
        typeFilter === "ALL" ||
        type === typeFilter;


      return (
        matchesSearch &&
        matchesType
      );

    }
  );


  // ==========================================
  // SECURITY
  // ==========================================

  if (userRole !== "ADMIN") {
    return null;
  }


  // ==========================================
  // PAGE
  // ==========================================

  return (

    <div className="admin-page">

      {/* HEADER */}

      <header className="admin-header">

        <div>

          <h1>
            🔔 Messages
          </h1>

          <p>
            Contact and feedback messages
            from donors and NGOs
          </p>

        </div>

        <button
          className="admin-refresh-button"
          onClick={fetchMessages}
        >
          🔄 Refresh
        </button>

      </header>


      <main className="admin-content">

        <section className="admin-section">

          <div className="admin-section-header">

            <div>

              <h2>
                📩 Messages
              </h2>

              <p>
                Messages submitted through FoodRescue
              </p>

            </div>

          </div>


          {/* ==================================
              FILTERS
          ================================== */}

          <div className="admin-filters">

            <input
              type="text"
              placeholder="🔍 Search name, email or message..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />


            <select
              value={typeFilter}
              onChange={(e) =>
                setTypeFilter(e.target.value)
              }
            >

              <option value="ALL">
                All Messages
              </option>

              <option value="CONTACT">
                📞 Contact
              </option>

              <option value="FEEDBACK">
                ⭐ Feedback
              </option>

            </select>

          </div>


          {/* ==================================
              CONTENT
          ================================== */}

          {loading ? (

            <div className="admin-loading">
              Loading messages...
            </div>

          ) : filteredMessages.length === 0 ? (

            <div className="admin-empty">

              <div>
                📭
              </div>

              <p>
                No messages found.
              </p>

            </div>

          ) : (

            <div className="admin-table-wrapper">

              <table className="admin-table">

                <thead>

                  <tr>

                    <th>ID</th>

                    <th>From</th>

                    <th>Email</th>

                    <th>Role</th>

                    <th>Type</th>

                    <th>Subject</th>

                    <th>Message</th>

                    <th>Date</th>

                  </tr>

                </thead>


                <tbody>

                  {filteredMessages.map(
                    (message) => {

                      const type =
                        message.type || "CONTACT";

                      return (

                        <tr
                          key={message.id}
                        >

                          <td>
                            #{message.id}
                          </td>


                          <td>
                            {message.name || "Unknown"}
                          </td>


                          <td>
                            {message.email || "N/A"}
                          </td>


                          <td>

                            <span className="admin-role">

                              {message.senderRole ||
                                "USER"}

                            </span>

                          </td>


                          <td>

                            <span
                              className={
                                type === "FEEDBACK"
                                  ? "admin-status feedback"
                                  : "admin-status contact"
                              }
                            >

                              {type === "FEEDBACK"
                                ? "⭐ Feedback"
                                : "📞 Contact"}

                            </span>

                          </td>


                          <td>
                            {message.subject ||
                              "No Subject"}
                          </td>


                          <td>

                            <div
                              style={{
                                maxWidth: "300px",
                                whiteSpace: "normal"
                              }}
                            >
                              {message.message}
                            </div>

                          </td>


                          <td>

                            {message.createdAt
                              ? new Date(
                                  message.createdAt
                                ).toLocaleString(
                                  "en-IN"
                                )
                              : "N/A"}

                          </td>

                        </tr>

                      );

                    }
                  )}

                </tbody>

              </table>

            </div>

          )}

        </section>

      </main>

    </div>

  );

}

export default AdminMessages;