import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import HeaderAdmin from "../components/headerAdmin";
import MobileNav from "../components/mobilenav";
import FooterAdmin from "../components/footerAdmin";
import "./rideRequestsAdmin.css";

const RideRequestsAdmin = () => {
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
          "https://api.holoapp.tech:3000/api/rideHistory",
          { withCredentials: true }
        );
        console.log(response.data);

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
      case "active":
        filteredRequests = filteredRequests.filter((req) => req.status === 1);
        break;
      case "completed":
        filteredRequests = filteredRequests.filter((req) => req.endRide !== null);
        break;
      case "withComplaints":
        filteredRequests = filteredRequests.filter(
          (req) => req.jatriComplain !== null || req.chalokComplain !== null
        );
        break;
      case "withPolice":
        filteredRequests = filteredRequests.filter(
          (req) => req.jatriCallPolice !== null || req.chalokCallPolice !== null
        );
        break;
      default:
        break;
    }

    if (searchQuery) {
      filteredRequests = filteredRequests.filter(
        (req) =>
          req.rideRequestID?.toString().includes(searchQuery) ||
          req.jatriID?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          req.chalokID?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filteredRequests.sort((a, b) => {
      const aValue = a[sortConfig.key] || "";
      const bValue = b[sortConfig.key] || "";
      if (sortConfig.key === "id" || sortConfig.key === "price" || sortConfig.key === "duration") {
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
      case "all": return "All Ride Requests";
      case "active": return "Active Rides";
      case "completed": return "Completed Rides";
      case "withComplaints": return "Rides with Complaints";
      case "withPolice": return "Rides with Police Calls";
      default: return "All Ride Requests";
    }
  };

  // Helper function to format complaint objects
  const formatComplaint = (complaint) => {
    if (!complaint) return "None";
    if (typeof complaint === "string") return complaint;
    if (typeof complaint === "object" && complaint.reply) return complaint.reply;
    return "Complaint Exists";
  };

  // Helper function to format police call data
  const formatPoliceCall = (policeCall) => {
    if (!policeCall) return "No";
    if (Array.isArray(policeCall) && policeCall.length > 0) {
      return `Yes (${policeCall.length} call${policeCall.length > 1 ? "s" : ""})`;
    }
    return "Yes";
  };

  const totalRequests = requests.length;
  const totalActive = requests.filter((req) => req.status === 1).length;
  const totalCompleted = requests.filter((req) => req.endRide !== null).length;
  const totalWithComplaints = requests.filter(
    (req) => req.jatriComplain !== null || req.chalokComplain !== null
  ).length;
  const totalWithPolice = requests.filter(
    (req) => req.jatriCallPolice !== null || req.chalokCallPolice !== null
  ).length;

  const filteredRequests = getFilteredRequests();
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirstRequest, indexOfLastRequest);
  const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <HeaderAdmin />
      <MobileNav />
      <div className="ride-requests-container">
        <h1 className="ride-requests-title">Ride Requests</h1>
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
                { filter: "active", label: `Active: ${totalActive}` },
                { filter: "completed", label: `Completed: ${totalCompleted}` },
                { filter: "withComplaints", label: `With Complaints: ${totalWithComplaints}` },
                { filter: "withPolice", label: `With Police Calls: ${totalWithPolice}` },
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
                placeholder="Search by ride request ID, Jatri ID, or Chalok ID"
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
              <table className="ride-table">
                <thead>
                  <tr>
                    {[
                      { key: "id", label: "ID" },
                      { key: "rideRequestID", label: "Request ID" },
                      { key: "jatriID", label: "Jatri ID" },
                      { key: "chalokID", label: "Chalok ID" },
                      { key: "startName", label: "Start Location" },
                      { key: "destinationName", label: "Destination" },
                      { key: "price", label: "Price" },
                      { key: "distance", label: "Distance (km)" },
                      { key: "duration", label: "Duration (s)" },
                      { key: "acceptRide", label: "Accept Ride" },
                      { key: "startRide", label: "Start Ride" },
                      { key: "endRide", label: "End Ride" },
                      { key: "jatriRating", label: "Jatri Rating" },
                      { key: "chalokRating", label: "Chalok Rating" },
                      { key: "sticker", label: "Sticker" },
                      { key: "jatriComplain", label: "Jatri Complaint" },
                      { key: "chalokComplain", label: "Chalok Complaint" },
                      { key: "jatriCallPolice", label: "Jatri Police Call" },
                      { key: "chalokCallPolice", label: "Chalok Police Call" },
                      { key: "created_at", label: "Created At" },
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
                            to={`/ride-requests/${request.id}`}
                            state={{ request }}
                            className="request-id-link"
                          >
                            {request.id}
                          </Link>
                        </td>
                        <td className="table-cell">{request.rideRequestID}</td>
                        <td className="table-cell">{request.jatriID}</td>
                        <td className="table-cell">{request.chalokID || "N/A"}</td>
                        <td className="table-cell">{request.startName}</td>
                        <td className="table-cell">{request.destinationName}</td>
                        <td className="table-cell">{request.price}</td>
                        <td className="table-cell">{request.distance}</td>
                        <td className="table-cell">{request.duration}</td>
                        <td className="table-cell">{request.acceptRide || "N/A"}</td>
                        <td className="table-cell">{request.startRide || "N/A"}</td>
                        <td className="table-cell">{request.endRide || "N/A"}</td>
                        <td className="table-cell">{request.jatriRating || "N/A"}</td>
                        <td className="table-cell">{request.chalokRating || "N/A"}</td>
                        <td className="table-cell">{request.sticker ? "Yes" : "No"}</td>
                        <td className="table-cell">{formatComplaint(request.jatriComplain)}</td>
                        <td className="table-cell">{formatComplaint(request.chalokComplain)}</td>
                        <td className="table-cell">{formatPoliceCall(request.jatriCallPolice)}</td>
                        <td className="table-cell">{formatPoliceCall(request.chalokCallPolice)}</td>
                        <td className="table-cell">{request.created_at || "N/A"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="20" className="table-cell-empty">No ride requests found</td></tr>
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

export default RideRequestsAdmin;