import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDonations() {

  const navigate = useNavigate();

  const [donations, setDonations] = useState([]);
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

    fetchDonations();

  }, [userRole, navigate]);


  const fetchDonations = async () => {

    try {

      setLoading(true);

      const response = await fetch(
        "http://foodwaste-backend-btuy.onrender.com/api/donations"
      );

      if (!response.ok) {
        throw new Error(
          "Failed to load donations"
        );
      }

      const data =
        await response.json();

      setDonations(data);

    } catch (error) {

      console.error(
        "Fetch donations error:",
        error
      );

    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // DELETE DONATION
  // ==========================================

  const handleDeleteDonation =
    async (donationId) => {

      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete this donation?"
        );

      if (!confirmDelete) {
        return;
      }

      try {

        const response =
          await fetch(
            `http://foodwaste-backend-btuy.onrender.com/api/admin/donations/${donationId}`,
            {
              method: "DELETE"
            }
          );

        const result =
          await response.text();

        if (response.ok) {

          alert(result);

          fetchDonations();

        } else {

          alert(
            result ||
            "Failed to delete donation"
          );

        }

      } catch (error) {

        console.error(
          "Delete donation error:",
          error
        );

        alert(
          "Cannot connect to Spring Boot backend"
        );

      }

    };


  // ==========================================
  // FILTER
  // ==========================================

  const filteredDonations =
    donations.filter((donation) => {

      const searchText =
        search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        donation.foodName
          ?.toLowerCase()
          .includes(searchText) ||

        donation.category
          ?.toLowerCase()
          .includes(searchText) ||

        donation.donorName
          ?.toLowerCase()
          .includes(searchText);

      const matchesStatus =
        statusFilter === "ALL" ||
        donation.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );

    });


  if (userRole !== "ADMIN") {
    return null;
  }


  return (

    <div className="admin-page">

      <header className="admin-header">

        <div>

          <h1>
            🍱 Donations
          </h1>

          <p>
            Manage all food donations
          </p>

        </div>

      </header>


      <main className="admin-content">

        <section className="admin-section">

          <div className="admin-section-header">

            <div>

              <h2>
                All Donations
              </h2>

              <p>
                View and manage donated food
              </p>

            </div>

          </div>


          {/* FILTERS */}

          <div className="admin-filters">

            <input
              type="text"
              placeholder="🔍 Search food, category or donor..."
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

              <option value="AVAILABLE">
                Available
              </option>

              <option value="CLAIMED">
                Claimed
              </option>

            </select>

          </div>


          {/* TABLE */}

          {loading ? (

            <div className="admin-loading">
              Loading donations...
            </div>

          ) : filteredDonations.length === 0 ? (

            <div className="admin-empty">
              No donations found.
            </div>

          ) : (

            <div className="admin-table-wrapper">

              <table className="admin-table">

                <thead>

                  <tr>

                    <th>
                      ID
                    </th>

                    <th>
                      Food
                    </th>

                    <th>
                      Category
                    </th>

                    <th>
                      Donor
                    </th>

                    <th>
                      Quantity
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredDonations.map(
                    (donation) => (

                      <tr
                        key={donation.id}
                      >

                        <td>
                          #{donation.id}
                        </td>

                        <td>
                          {donation.foodName}
                        </td>

                        <td>
                          {donation.category}
                        </td>

                        <td>
                          {donation.donorName ||
                            "N/A"}
                        </td>

                        <td>

                          {donation.quantity}{" "}

                          {donation.unit}

                        </td>

                        <td>

                          <span
                            className={
                              `admin-status ${
                                donation.status
                                  ?.toLowerCase()
                              }`
                            }
                          >
                            {donation.status}
                          </span>

                        </td>

                        <td>

                          <button
                            className="admin-delete-button"
                            onClick={() =>
                              handleDeleteDonation(
                                donation.id
                              )
                            }
                          >
                            🗑️ Delete
                          </button>

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

export default AdminDonations;