import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import HeaderFleet from "../../components/headerFleet";
import MobileNav from "../../components/mobilenav";
import FooterAdmin from "../../components/footerAdmin";
import "../userListAdmin.css";

const FleetHomepage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const vehiclesPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vehiclesResponse = await axios.get("https://api.holoapp.tech:3000/api/seeFleetVehicles", {
          headers: { "Content-Type": "application/json" },
        });
        setVehicles(Array.isArray(vehiclesResponse.data.data) ? vehiclesResponse.data.data : []);
        setLoading(false);
        const vehicleData = Array.isArray(vehiclesResponse.data.data) ? vehiclesResponse.data.data : [];
        localStorage.setItem(
          "fleetVehicles",
          JSON.stringify({ data: vehicleData, timestamp: Date.now() })
        );

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

  const getFilteredVehicles = () => {
    let filteredVehicles = [...vehicles];

    switch (activeFilter) {
      case "all":
        break;
      case "applied":
        filteredVehicles = filteredVehicles.filter((vehicle) => vehicle.status === "applied");
        break;
      case "accepted":
        filteredVehicles = filteredVehicles.filter((vehicle) => vehicle.status === "accepted");
        break;
      case "rejected":
        filteredVehicles = filteredVehicles.filter((vehicle) => vehicle.status === "rejected");
        break;
      default:
        break;
    }

    if (searchQuery) {
      filteredVehicles = filteredVehicles.filter((vehicle) =>
        vehicle.memberID?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.fleet?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filteredVehicles.sort((a, b) => {
      const aValue = a[sortConfig.key] || "";
      const bValue = b[sortConfig.key] || "";
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return filteredVehicles;
  };

  const getFilterLabel = () => {
    switch (activeFilter) {
      case "all": return "All Vehicles";
      case "applied": return "Applied Vehicles";
      case "accepted": return "Accepted Vehicles";
      case "rejected": return "Rejected Vehicles";
      default: return "All Vehicles";
    }
  };

  const totalVehicles = vehicles.length;
  const totalApplied = vehicles.filter((vehicle) => vehicle.status === "applied").length;
  const totalAccepted = vehicles.filter((vehicle) => vehicle.status === "accepted").length;
  const totalRejected = vehicles.filter((vehicle) => vehicle.status === "rejected").length;

  const filteredVehicles = getFilteredVehicles();
  const indexOfLastVehicle = currentPage * vehiclesPerPage;
  const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage;
  const currentVehicles = filteredVehicles.slice(indexOfFirstVehicle, indexOfLastVehicle);
  const totalPages = Math.ceil(filteredVehicles.length / vehiclesPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="page-container">
      <HeaderFleet />
      <MobileNav />
      <div className="user-list-container">
        <h1 className="user-list-title">Vehicle List</h1>
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
                { filter: "all", label: `Total Vehicles: ${totalVehicles}` },
                { filter: "applied", label: `Applied: ${totalApplied}` },
                { filter: "accepted", label: `Accepted: ${totalAccepted}` },
                { filter: "rejected", label: `Rejected: ${totalRejected}` },
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
                placeholder="Search by Member ID or Fleet"
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
                      { key: "id", label: "ID" },
                      { key: "fleet", label: "Fleet" },
                      { key: "memberID", label: "Member ID" },
                      { key: "vehicle", label: "Vehicle Type" },
                      { key: "joined", label: "Joined Date" },
                      { key: "status", label: "Status" },
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
                  {(Array.isArray(currentVehicles) && currentVehicles.length > 0) ? (
                    currentVehicles.map((vehicle) => (
                      <tr key={vehicle.id} className="table-row">
                        <td className="table-cell">
                          <Link
                            to={`/vehicles/${vehicle.id}`}
                            state={{ vehicle }}
                            className="vehicle-id-link"
                          >
                            {vehicle.id}
                          </Link>
                        </td>
                        <td className="table-cell">{vehicle.fleet || "N/A"}</td>

                        <td className="table-cell">
                          {vehicle.memberID ? (
                            <Link
                              to={`/user-details-fleet/${vehicle.memberID}`}
                              state={{ userID: vehicle.memberID, fleetName: vehicle.fleet }}
                              className="member-id-link"
                            >
                              {vehicle.memberID}
                            </Link>
                          ) : (
                            "N/A"
                          )}
                        </td> 

                        <td className="table-cell">{vehicle.vehicle || "N/A"}</td>
                        <td className="table-cell">{vehicle.joined || "N/A"}</td>
                        <td className="table-cell">{vehicle.status || "N/A"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="6" className="table-cell-empty">No vehicles found</td></tr>
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
    </div>
  );
};

export default FleetHomepage;