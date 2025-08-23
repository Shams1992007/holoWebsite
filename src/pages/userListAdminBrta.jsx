import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import HeaderAdmin from "../components/headerAdmin";
import MobileNav from "../components/mobilenav";
import FooterAdmin from "../components/footerAdmin";
import "./userListAdmin.css";

const UserListAdminBrta = () => {
  const [users, setUsers] = useState([]);
  const [unApprovedChalokIds, setUnApprovedChalokIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "userID", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all users
        const usersResponse = await axios.get("https://api.holoapp.tech:3000/api/get-users", {
          headers: { "Content-Type": "application/json" },
        });
        setUsers(Array.isArray(usersResponse.data) ? usersResponse.data : []);

        // Fetch unapproved Chalok user IDs
        const unApprovedResponse = await axios.get("https://api.holoapp.tech:3000/api/unApprovedChalok", {
          headers: { "Content-Type": "application/json" },
        });
        // Extract userIDs from unapproved Chalok response
        setUnApprovedChalokIds(
          Array.isArray(unApprovedResponse.data)
            ? unApprovedResponse.data.map(user => user.userID)
            : []
        );

        setLoading(false);
      } catch (error) {
        setError("An error occurred: " + error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc",
    });
  };

  const getFilteredUsers = () => {
    let filteredUsers = [...users];

    switch (activeFilter) {
      case "all":
        break;
      case "jatri":
        filteredUsers = filteredUsers.filter((user) => user.user_created_at);
        break;
      case "chalok":
        filteredUsers = filteredUsers.filter((user) => user.driver_created_at);
        break;
      case "jatriApp":
        filteredUsers = filteredUsers.filter((user) => user.app === "jatri");
        break;
      case "chalokApp":
        filteredUsers = filteredUsers.filter((user) => user.app === "chalok");
        break;
      case "incompleteJatri":
        filteredUsers = filteredUsers.filter(
          (user) => user.app === "jatri" && !user.user_created_at
        );
        break;
      case "incompleteChalok":
        filteredUsers = filteredUsers.filter(
          (user) => user.app === "chalok" && !user.driver_created_at
        );
        break;
      case "chalokConverted":
        filteredUsers = filteredUsers.filter(
          (user) => user.app === "jatri" && user.driver_created_at
        );
        break;
      case "unApprovedChalok":
        filteredUsers = filteredUsers.filter((user) =>
          unApprovedChalokIds.includes(user.userID)
        );
        break;
      default:
        break;
    }

    if (searchQuery) {
      filteredUsers = filteredUsers.filter((user) =>
        user.contact?.includes(searchQuery)
      );
    }

    filteredUsers.sort((a, b) => {
      const aValue = a[sortConfig.key] || "";
      const bValue = b[sortConfig.key] || "";
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return filteredUsers;
  };

  const getFilterLabel = () => {
    switch (activeFilter) {
      case "all": return "All Users";
      case "jatri": return "Jatri Users";
      case "chalok": return "Chalok Users";
      case "jatriApp": return "Registered Jatri";
      case "chalokApp": return "Registered Chalok";
      case "incompleteJatri": return "Incomplete Jatri";
      case "incompleteChalok": return "Incomplete Chalok";
      case "chalokConverted": return "Chalok Converted from Jatri";
      case "unApprovedChalok": return "UnApproved Chalok";
      default: return "All Users";
    }
  };

  const totalUsers = users.length;
  const totalJatri = users.filter((user) => user.user_created_at).length;
  const totalChalok = users.filter((user) => user.driver_created_at).length;
  const totalJatriAppUsers = users.filter((user) => user.app === "jatri").length;
  const totalChalokAppUsers = users.filter((user) => user.app === "chalok").length;
  const incompleteJatri = users.filter(
    (user) => user.app === "jatri" && !user.user_created_at
  ).length;
  const incompleteChalok = users.filter(
    (user) => user.app === "chalok" && !user.driver_created_at
  ).length;
  const chalokConverted = users.filter(
    (user) => user.app === "jatri" && user.driver_created_at
  ).length;
  const totalUnApprovedChalok = unApprovedChalokIds.length;

  const filteredUsers = getFilteredUsers();
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <HeaderAdmin />
      <MobileNav />
      <div className="user-list-container">
        <h1 className="user-list-title">User List</h1>
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <>
            <div className="filter-status">
              <p>Currently viewing: {getFilterLabel()}</p>
            </div>
            <div className="filter-grid">
              {[
                { filter: "all", label: `Total Users: ${totalUsers}` },
                { filter: "jatri", label: `Total Jatri: ${totalJatri}` },
                { filter: "chalok", label: `Total Chalok: ${totalChalok}` },
                { filter: "jatriApp", label: `Registered Jatri: ${totalJatriAppUsers}` },
                { filter: "chalokApp", label: `Registered Chalok: ${totalChalokAppUsers}` },
                { filter: "incompleteJatri", label: `Incomplete Jatri: ${incompleteJatri}` },
                { filter: "incompleteChalok", label: `Incomplete Chalok: ${incompleteChalok}` },
                { filter: "chalokConverted", label: `Chalok Converted from Jatri: ${chalokConverted}` },
                { filter: "unApprovedChalok", label: `UnApproved Chalok: ${totalUnApprovedChalok}` },
              ].map(({ filter, label }) => (
                <button
                  key={filter}
                  onClick={() => handleFilterClick(filter)}
                  className={`filter-button ${activeFilter === filter ? "active" : ""}`}
                >
                  {activeFilter === filter && (
                    <svg className="check-icon" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  <span>{label}</span>
                  {activeFilter === filter && (
                    <span className="active-badge">Active</span>
                  )}
                </button>
              ))}
            </div>
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Search by contact"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="clear-search"
                >
                  ✕
                </button>
              )}
            </div>
            <div className="table-container">
              <table className="user-table">
                <thead>
                  <tr>
                    {[
                      { key: "userID", label: "ID" },
                      { key: "name", label: "User Name" },
                      { key: "email", label: "Email" },
                      { key: "contact", label: "Phone" },
                      { key: "auth", label: "Signup Method" },
                      { key: "register", label: "Registered" },
                      { key: "created_at", label: "Registered At" },
                      { key: "completeUser", label: "User Completed" },
                      { key: "user_created_at", label: "User Completed At" },
                      { key: "completeDriver", label: "Driver Completed" },
                      { key: "driver_created_at", label: "Driver Completed At" },
                      { key: "completeVehicle", label: "Vehicle Completed" },
                      { key: "app", label: "Signup App" },
                    ].map((column) => (
                      <th
                        key={column.key}
                        onClick={() => handleSort(column.key)}
                        className="table-header"
                      >
                        {column.label}
                        {sortConfig.key === column.key && (
                          <span className="sort-icon">
                            {sortConfig.direction === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(Array.isArray(currentUsers) && currentUsers.length > 0) ? (
                    currentUsers.map((user) => (
                      <tr key={user.userID} className="table-row">
                        <td className="table-cell">
                          <Link
                            to={`/users/${user.userID}`}
                            state={{ user }}
                            className="user-id-link"
                          >
                            {user.userID}
                          </Link>
                        </td>
                        <td className="table-cell">{user.name}</td>
                        <td className="table-cell">{user.email || "N/A"}</td>
                        <td className="table-cell">{user.contact || "N/A"}</td>
                        <td className="table-cell">{user.auth || "N/A"}</td>
                        <td className="table-cell">{user.register || "N/A"}</td>
                        <td className="table-cell">{user.created_at || "N/A"}</td>
                        <td className="table-cell">{user.completeUser || "N/A"}</td>
                        <td className="table-cell">{user.user_created_at || "N/A"}</td>
                        <td className="table-cell">{user.completeDriver || "N/A"}</td>
                        <td className="table-cell">{user.driver_created_at || "N/A"}</td>
                        <td className="table-cell">{user.completeVehicle || "N/A"}</td>
                        <td className="table-cell">{user.app || "N/A"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="12" className="table-cell-empty">No users found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="pagination-btn"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`pagination-btn ${currentPage === i + 1 ? "active" : ""}`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="pagination-btn"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <FooterAdmin />
    </>
  );
};

export default UserListAdminBrta;