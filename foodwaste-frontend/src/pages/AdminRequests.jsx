import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminRequests() {

  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const userRole = localStorage.getItem("userRole");


  // ==========================================
  // SECURITY + FETCH
  // ==========================================

  useEffect(() => {

    if (userRole !== "ADMIN") {
      navigate("/login");
      return;
    }

    fetchRequests();

  }, [userRole, navigate]);


  const fetchRequests = async () => {

    try {

      setLoading(true);

      const response = await fetch(
        "http://localhost:8080/api/admin/requests"
      );

      if (!response.ok) {
        throw new Error(
          "Failed to load requests"
        );
      }

      const data =
        await response.json();

      setRequests(data);

    } catch (error) {

      console.error(
        "Fetch requests error:",
        error
      );

    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // FILTER
  // ==========================================

  const filteredRequests =
    requests.filter((request) => {

      const searchText =
        search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||

        request.foodName
          ?.toLowerCase()
          .includes(searchText) ||

        request.category
          ?.toLowerCase()
          .includes(searchText) ||

        request.donorName
          ?.toLowerCase()
          .includes(searchText) ||

        request.ngoName
          ?.toLowerCase()
          .includes(searchText);

      const matchesStatus =
        statusFilter === "ALL" ||
        request.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );

    });


  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {

    if (!date) {
      return "N/A";
    }

    const d = new Date(date);

    if (isNaN(d.getTime())) {
      return date;
    }

    return d.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }
    );

  };


  if (userRole !== "ADMIN") {
    return null;
  }


  return (

    <div className="admin-page">

      <header className="admin-header">

        <div>

          <h1>
            📩 Donation Requests
          </h1>

          <p>
            Manage all NGO donation requests
          </p>

        </div>

      </header>


      <main className="admin-content">

        <section className="admin-section">

          <div className="admin-section-header">

            <div>

              <h2>
                All Requests
              </h2>

              <p>
                View NGO requests for donated food
              </p>

            </div>

          </div>


          {/* FILTERS */}

          <div className="admin-filters">

            <input
              type="text"
              placeholder="🔍 Search food, donor or NGO..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >

              <option value="ALL">
                All Status
              </option>

              <option value="PENDING">
                Pending
              </option>

              <option value="APPROVED">
                Approved
              </option>

              <option value="REJECTED">
                Rejected
              </option>

            </select>

          </div>


          {/* TABLE */}

          {loading ? (

            <div className="admin-loading">
              Loading requests...
            </div>

          ) : filteredRequests.length === 0 ? (

            <div className="admin-empty">

              <div>
                📭
              </div>

              <p>
                No donation requests found.
              </p>

            </div>

          ) : (

            <div className="admin-table-wrapper">

              <table className="admin-table">

                <thead>

                  <tr>

                    <th>
                      Request ID
                    </th>

                    <th>
                      Food
                    </th>

                    <th>
                      Donor
                    </th>

                    <th>
                      NGO
                    </th>

                    <th>
                      Requested
                    </th>

                    <th>
                      Available
                    </th>

                    <th>
                      Request Date
                    </th>

                    <th>
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredRequests.map(
                    (request) => (

                      <tr
                        key={request.id}
                      >

                        <td>
                          #{request.id}
                        </td>

                        <td>

                          <strong>
                            {request.foodName}
                          </strong>

                          <br />

                          <small>
                            {request.category}
                          </small>

                        </td>

                        <td>
                          {request.donorName ||
                            "N/A"}
                        </td>

                        <td>
                          {request.ngoName ||
                            "N/A"}
                        </td>

                        <td>

                          {request.requestedQuantity}{" "}

                          {request.unit}

                        </td>

                        <td>

                          {request.quantity}{" "}

                          {request.unit}

                        </td>

                        <td>

                          {formatDate(
                            request.requestDate
                          )}

                        </td>

                        <td>

                          <span
                            className={
                              `admin-status ${
                                request.status
                                  ?.toLowerCase()
                              }`
                            }
                          >
                            {request.status}
                          </span>

                        </td>

                      </tr>

                    )
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

export default AdminRequests;