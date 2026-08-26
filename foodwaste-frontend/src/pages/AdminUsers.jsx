import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminUsers() {

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");

  const userRole = localStorage.getItem("userRole");


  // ==========================================
  // SECURITY + FETCH
  // ==========================================

  useEffect(() => {

    if (userRole !== "ADMIN") {
      navigate("/login");
      return;
    }

    fetchUsers();

  }, [userRole, navigate]);


  const fetchUsers = async () => {

    try {

      setLoading(true);

     const response = await fetch(
  "https://foodwaste-backend-btuy.onrender.com/api/admin/users"
);

      if (!response.ok) {
        throw new Error("Failed to load users");
      }

      const data = await response.json();

      setUsers(data);

    } catch (error) {

      console.error(
        "Fetch users error:",
        error
      );

    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // DELETE USER
  // ==========================================

  const handleDeleteUser = async (userId) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      const response = await fetch(
        `https://foodwaste-backend-btuy.onrender.com/api/admin/users/${userId}`,
        {
          method: "DELETE"
        }
      );

      const result = await response.text();

      if (response.ok) {

        alert(result);

        fetchUsers();

      } else {

        alert(
          result || "Failed to delete user"
        );

      }

    } catch (error) {

      console.error(
        "Delete user error:",
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

  const filteredUsers = users.filter((user) => {

    const searchText =
      search.toLowerCase().trim();

    const matchesSearch =
      !searchText ||
      user.name?.toLowerCase().includes(searchText) ||
      user.email?.toLowerCase().includes(searchText);

    const matchesRole =
      roleFilter === "ALL" ||
      user.role === roleFilter;

    return (
      matchesSearch &&
      matchesRole
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
            👥 Users
          </h1>

          <p>
            Manage FoodRescue users
          </p>

        </div>

      </header>


      <main className="admin-content">

        <section className="admin-section">

          <div className="admin-section-header">

            <div>

              <h2>
                Registered Users
              </h2>

              <p>
                View and manage all users
              </p>

            </div>

          </div>


          {/* FILTERS */}

          <div className="admin-filters">

            <input
              type="text"
              placeholder="🔍 Search name or email..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            <select
              value={roleFilter}
              onChange={(e) =>
                setRoleFilter(e.target.value)
              }
            >

              <option value="ALL">
                All Roles
              </option>

              <option value="ADMIN">
                Admin
              </option>

              <option value="DONOR">
                Donor
              </option>

              <option value="NGO">
                NGO
              </option>

            </select>

          </div>


          {/* TABLE */}

          {loading ? (

            <div className="admin-loading">
              Loading users...
            </div>

          ) : filteredUsers.length === 0 ? (

            <div className="admin-empty">
              No users found.
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
                      Name
                    </th>

                    <th>
                      Email
                    </th>

                    <th>
                      Role
                    </th>

                    <th>
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredUsers.map(
                    (user) => (

                      <tr
                        key={user.id}
                      >

                        <td>
                          #{user.id}
                        </td>

                        <td>
                          {user.name}
                        </td>

                        <td>
                          {user.email}
                        </td>

                        <td>

                          <span
                            className={
                              `admin-role ${
                                user.role?.toLowerCase()
                              }`
                            }
                          >
                            {user.role}
                          </span>

                        </td>

                        <td>

                          {user.role === "ADMIN" ? (

                            <span className="admin-protected">
                              🔒 Protected
                            </span>

                          ) : (

                            <button
                              className="admin-delete-button"
                              onClick={() =>
                                handleDeleteUser(
                                  user.id
                                )
                              }
                            >
                              🗑️ Delete
                            </button>

                          )}

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

export default AdminUsers;