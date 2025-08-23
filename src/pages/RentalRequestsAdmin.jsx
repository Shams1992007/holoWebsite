import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import HeaderAdmin from "../components/headerAdmin";
import MobileNav from "../components/mobilenav";
import FooterAdmin from "../components/footerAdmin";
import "./rentalRequestsAdmin.css";

const RentalRequestsAdmin = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "desc" });
  const [currentPage, setCurrentPage] = useState(1);
  const requestsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.holoapp.tech:3000/api/adminSeeRentalRequest",
          { withCredentials: true }
        );
        setRequests(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      } catch (error) {
        setError("An error occurred: " + (error.response?.data?.message || error.message));
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

  const getFilteredRequests = () => {
    let filteredRequests = [...requests];

    switch (activeFilter) {
      case "all":
        break;
      case "oneWay":
        filteredRequests = filteredRequests.filter((req) => req.rentType === "One-Way");
        break;
      case "roundTrip":
        filteredRequests = filteredRequests.filter((req) => req.rentType === "Round-Trip");
        break;
      case "active":
        filteredRequests = filteredRequests.filter((req) => req.status === 1);
        break;
      case "completed":
        filteredRequests = filteredRequests.filter((req) => req.finishRide !== null);
        break;
      default:
        break;
    }

    if (searchQuery) {
      filteredRequests = filteredRequests.filter(
        (req) =>
          req.jatri_contact?.includes(searchQuery) ||
          req.rentRequestID?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    const getSortValue = (value) => {
      if (Array.isArray(value)) {
        return value.length > 0 ? value[0]?.userID || "" : "";
      }
      return value ?? "";
    };

    filteredRequests.sort((a, b) => {
      const aValue = getSortValue(a[sortConfig.key]);
      const bValue = getSortValue(b[sortConfig.key]);
      if (sortConfig.key === "id") {
        return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
      }
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return filteredRequests;
  };

  const getFilterLabel = () => {
    switch (activeFilter) {
      case "all": return "All Rental Requests";
      case "oneWay": return "One-Way Rentals";
      case "roundTrip": return "Round-Trip Rentals";
      case "active": return "Active Rentals";
      case "completed": return "Completed Rentals";
      default: return "All Rental Requests";
    }
  };

  const totalRequests = requests.length;
  const totalOneWay = requests.filter((req) => req.rentType === "One-Way").length;
  const totalRoundTrip = requests.filter((req) => req.rentType === "Round-Trip").length;
  const totalActive = requests.filter((req) => req.status === 1).length;
  const totalCompleted = requests.filter((req) => req.finishRide !== null).length;

  const filteredRequests = getFilteredRequests();
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirstRequest, indexOfLastRequest);
  const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderChalokIDs = (chalokID) => {
    if (!chalokID) return "N/A";
    if (Array.isArray(chalokID)) {
      if (chalokID.length === 0) return "N/A";
      return chalokID
        .filter((id) => id) // Remove null or undefined
        .map((id, index) => (
          <div key={`${id?.userID || index}-${index}`}>
            id -{index + 1} {id.userID || "Unknown"}
          </div>
        ));
    }
    return <div>id -1 {chalokID || "N/A"}</div>;
  };

  return (
    <>
      <HeaderAdmin />
      <MobileNav />
      <div className="rental-requests-container">
        <h1 className="rental-requests-title">Rental Requests</h1>
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
                { filter: "all", label: `Total Requests: ${totalRequests}` },
                { filter: "oneWay", label: `One-Way: ${totalOneWay}` },
                { filter: "roundTrip", label: `Round-Trip: ${totalRoundTrip}` },
                { filter: "active", label: `Active: ${totalActive}` },
                { filter: "completed", label: `Completed: ${totalCompleted}` },
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
                placeholder="Search by contact or request ID"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {searchQuery && (
                <button onClick={handleClearSearch} className="clear-search">
                  ✕
                </button>
              )}
            </div>
            <div className="table-container">
              <table className="rental-table">
                <thead>
                  <tr>
                    {[
                      { key: "id", label: "ID" },
                      { key: "rentRequestID", label: "Request ID" },
                      { key: "numberOfPassengers", label: "Passengers" },
                      { key: "startLocation", label: "Start Location" },
                      { key: "endLocation", label: "End Location" },
                      { key: "startDateTime", label: "Start DateTime" },
                      { key: "favouredVehicle", label: "Vehicle" },
                      { key: "created_at", label: "Created At" },
                      { key: "jatriID", label: "Jatri ID" },
                      { key: "status", label: "Status" },
                      { key: "chalokID", label: "Chalok ID" },
                      { key: "rentType", label: "Rent Type" },
                      { key: "returnDateTime", label: "Return DateTime" },
                      { key: "tripDuration", label: "Trip Duration" },
                      { key: "startRide", label: "Start Ride" },
                      { key: "finishRide", label: "Finish Ride" },
                      { key: "jatriRating", label: "Jatri Rating" },
                      { key: "chalokRating", label: "Chalok Rating" },
                      { key: "jatri_name", label: "Jatri Name" },
                      { key: "jatri_contact", label: "Jatri Contact" },
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
                  {(Array.isArray(currentRequests) && currentRequests.length > 0) ? (
                    currentRequests.map((request) => (
                      <tr key={request.id} className="table-row">
                        <td className="table-cell">
                          <Link
                            to={`/rental-requests/${request.id}`}
                            state={{ request }}
                            className="request-id-link"
                          >
                            {request.id}
                          </Link>
                        </td>
                        <td className="table-cell">{request.rentRequestID}</td>
                        <td className="table-cell">{request.numberOfPassengers}</td>
                        <td className="table-cell">{request.startLocation}</td>
                        <td className="table-cell">{request.endLocation}</td>
                        <td className="table-cell">{request.startDateTime}</td>
                        <td className="table-cell">{request.favouredVehicle}</td>
                        <td className="table-cell">{request.created_at}</td>
                        <td className="table-cell">{request.jatriID}</td>
                        <td className="table-cell">{request.status}</td>
                        <td className="table-cell">{renderChalokIDs(request.chalokID)}</td>
                        <td className="table-cell">{request.rentType}</td>
                        <td className="table-cell">{request.returnDateTime || "N/A"}</td>
                        <td className="table-cell">{request.tripDuration || "N/A"}</td>
                        <td className="table-cell">{request.startRide || "N/A"}</td>
                        <td className="table-cell">{request.finishRide || "N/A"}</td>
                        <td className="table-cell">{request.jatriRating || "N/A"}</td>
                        <td className="table-cell">{request.chalokRating || "N/A"}</td>
                        <td className="table-cell">{request.jatri_name}</td>
                        <td className="table-cell">{request.jatri_contact}</td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="20" className="table-cell-empty">No rental requests found</td></tr>
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

export default RentalRequestsAdmin;