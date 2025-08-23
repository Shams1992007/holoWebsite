import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderFleet from "../../components/headerFleet";
import MobileNav from "../../components/mobilenav";
import FooterAdmin from "../../components/footerAdmin";
import "../rentalRequestsAdmin.css";

const FleetRentalRequest = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    requests: [],
    offeredDataMap: new Map(),
    rideStatusMap: new Map(),
    vehicles: [],
    loading: true,
    error: null,
    activeFilter: "all",
    searchQuery: "",
    selectedMemberIDs: new Map(),
    fareInputs: new Map(),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch vehicles from localStorage or API
        const storedVehicles = localStorage.getItem("fleetVehicles");
        let vehicleData = [];
        if (storedVehicles) {
          const parsedVehicles = JSON.parse(storedVehicles);
          console.log("Vehicles Response (localStorage):", JSON.stringify(parsedVehicles, null, 2));
          const { data, timestamp } = parsedVehicles;
          if (Date.now() - timestamp < 3600000) {
            vehicleData = Array.isArray(data) ? data : [];
          } else {
            localStorage.removeItem("fleetVehicles");
          }
        }

        if (!vehicleData.length) {
          const vehiclesResponse = await axios.get(
            "https://api.holoapp.tech:3000/api/seeFleetVehicles",
            { headers: { "Content-Type": "application/json" }, withCredentials: true }
          );
          console.log("Vehicles Response (API):", JSON.stringify(vehiclesResponse.data, null, 2));
          vehicleData = Array.isArray(vehiclesResponse.data.data) ? vehiclesResponse.data.data : [];
          localStorage.setItem(
            "fleetVehicles",
            JSON.stringify({ data: vehicleData, timestamp: Date.now() })
          );
        }

        // Fetch rental requests
        const response = await axios.get(
          "https://api.holoapp.tech:3000/api/adminSeeRentalRequest",
          { withCredentials: true }
        );
        const requestData = Array.isArray(response.data) ? response.data : [];
        console.log("Rental Requests:", JSON.stringify(requestData, null, 2));

        // Fetch offered data
        const user = localStorage.getItem("user");
        let name;
        if (user) {
          const userObj = JSON.parse(user);
          name = userObj.name;
          console.log("User name:", name);
        } else {
          throw new Error("No user found in localStorage.");
        }

        const offerResponse = await axios.get(
          `https://api.holoapp.tech:3000/api/offeredRentalData/${name}`,
          { withCredentials: true }
        );
        const offeredData = Array.isArray(offerResponse.data) ? offerResponse.data : [];
        console.log("Offered Rental Data:", JSON.stringify(offeredData, null, 2));

        // Current date for comparison
        const currentDate = new Date();

        // Initialize selectedMemberIDs with the first accepted vehicle's memberID
        const acceptedVehicles = vehicleData.filter((v) => v.status === "accepted");
        const initialSelectedMemberIDs = new Map(
          requestData.map((req) => [
            req.rentRequestID,
            acceptedVehicles.length > 0 ? acceptedVehicles[0].memberID : "",
          ])
        );

        setState((prev) => ({
          ...prev,
          vehicles: vehicleData,
          requests: requestData,
          offeredDataMap: new Map(
            offeredData.map((data) => [data.rentID, { status: data.status, fare: data.fare, memberID: data.memberID, chalokID: data.chalokID }])
          ),
          rideStatusMap: new Map(
            requestData.map((req) => {
              const offered = offeredData.find((data) => data.rentID === req.rentRequestID);
              const offeredStatus = offered ? offered.status : null;
              console.log(`req.rentRequestID: ${req.rentRequestID}, req.status: ${req.status}, offeredStatus: ${offeredStatus}`);
              let rideStatus;

              if (req.status === 1 && offeredStatus === 0) {
                rideStatus = "Missed"; // Set to "Missed" when req.status === 1 and offeredStatus === 0
              } else if (req.status === 1 && !offeredStatus) {
                const startDateTime = new Date(req.startDateTime);
                rideStatus = startDateTime < currentDate ? "Expired" : "Available";
              } else if (req.status === 0 && offeredStatus === 0) {
                rideStatus = "Missed";
              } else {
                const status = offeredStatus;
                switch (status) {
                  case 0: rideStatus = "Missed"; break;
                  case 1: rideStatus = "Success"; break;
                  case 2: rideStatus = "Offered"; break;
                  case 3: rideStatus = "Cancel"; break;
                  case 4: rideStatus = "Selected"; break;
                  case 5: rideStatus = "Rejected"; break;
                  case 6: rideStatus = "Accepted"; break;
                  case 7: rideStatus = "Ongoing"; break;
                  default: rideStatus = "Didn't Bid";
                }
              }
              console.log(`rideStatus: ${rideStatus}`);
              return [req.rentRequestID, rideStatus];
            })
          ),
          selectedMemberIDs: initialSelectedMemberIDs,
          loading: false,
        }));
      } catch (error) {
        console.error("Error fetching data:", error.response ? error.response.data : error.message);
        if (error.response?.status === 401) {
          localStorage.removeItem("user");
          navigate("/fleet-signin");
        } else {
          setState((prev) => ({
            ...prev,
            error: "An error occurred: " + (error.response?.data?.message || error.message),
            loading: false,
          }));
        }
      }
    };

    fetchData();
  }, [navigate]);

  const handleOfferFare = useCallback(async (rentRequestID) => {
    const fare = state.fareInputs.get(rentRequestID);
    const user = localStorage.getItem("user");
    let fleetName;

    if (user) {
      const userObj = JSON.parse(user);
      fleetName = userObj.name;
    } else {
      setState((prev) => ({
        ...prev,
        error: "No user found in localStorage.",
      }));
      return;
    }

    if (!fare || isNaN(fare) || fare <= 0) {
      setState((prev) => ({
        ...prev,
        error: "Please enter a valid fare amount.",
      }));
      return;
    }

    try {
      const response = await axios.post(
        "https://api.holoapp.tech:3000/api/fleetOfferRentalFare",
        {
          rentRequestID: rentRequestID,
          offerFare: parseFloat(fare),
          fleetName: fleetName,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log("Offer Fare Response:", JSON.stringify(response.data, null, 2));
      window.location.reload();
    } catch (error) {
      console.error("Error offering fare:", error.response ? error.response.data : error.message);
      if (error.response?.status === 401) {
        localStorage.removeItem("user");
        navigate("/fleet-signin");
      } else {
        setState((prev) => ({
          ...prev,
          error: "Failed to offer fare: " + (error.response?.data?.message || error.message),
        }));
      }
    }
  }, [state.fareInputs, navigate]);

  const handleFareInputChange = useCallback((rentRequestID, value) => {
    setState((prev) => ({
      ...prev,
      fareInputs: new Map(prev.fareInputs).set(rentRequestID, value),
    }));
  }, []);

  const renderOfferFare = useCallback(
    (rentRequestID, rideStatus) => {
      if (rideStatus === "Available") {
        return (
          <div>
            <input
              type="number"
              value={state.fareInputs.get(rentRequestID) || ""}
              onChange={(e) => handleFareInputChange(rentRequestID, e.target.value)}
              placeholder="Enter fare"
              className="fare-input"
              min="0"
            />
            <button
              onClick={() => handleOfferFare(rentRequestID)}
              className="offer-fare-button"
            >
              Offer Fare
            </button>
          </div>
        );
      }
      return state.offeredDataMap.get(rentRequestID)?.fare ?? "N/A";
    },
    [state.fareInputs, state.offeredDataMap, handleFareInputChange, handleOfferFare]
  );

  const handleMemberIDChange = useCallback((rentRequestID, memberID) => {
    setState((prev) => ({
      ...prev,
      selectedMemberIDs: new Map(prev.selectedMemberIDs).set(rentRequestID, memberID),
    }));
  }, []);

  const handleAssignChalok = useCallback(async (rentRequestID) => {
    const selectedMemberID = state.selectedMemberIDs.get(rentRequestID);
    const user = localStorage.getItem("user");
    let fleetName;

    if (user) {
      const userObj = JSON.parse(user);
      fleetName = userObj.name;
    } else {
      setState((prev) => ({
        ...prev,
        error: "No user found in localStorage.",
      }));
      return;
    }

    if (!selectedMemberID) {
      setState((prev) => ({
        ...prev,
        error: "Please select a vehicle before assigning.",
      }));
      return;
    }

    try {
      const response = await axios.post(
        "https://api.holoapp.tech:3000/api/fleetAssignChalok",
        {
          chalokID: selectedMemberID,
          fleetName: fleetName,
          rentID: rentRequestID,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log("Assign Chalok Response:", JSON.stringify(response.data, null, 2));
      window.location.reload();
    } catch (error) {
      console.error("Error assigning chalok:", error.response ? error.response.data : error.message);
      if (error.response?.status === 401) {
        localStorage.removeItem("user");
        navigate("/fleet-signin");
      } else {
        setState((prev) => ({
          ...prev,
          error: "Failed to assign chalok: " + (error.response?.data?.message || error.message),
        }));
      }
    }
  }, [state.selectedMemberIDs, navigate]);

  const renderChalokIDs = useCallback((chalokID) => {
    if (!chalokID) return "N/A";
    if (Array.isArray(chalokID)) {
      if (chalokID.length === 0) return "N/A";
      return chalokID
        .filter((id) => id)
        .map((id, index) => (
          <div key={`${id?.userID || id?.fleetName || index}-${index}`}>
            id -{index + 1} {id.userID || id.fleetName || "Unknown"}
          </div>
        ));
    }
    return <div>id -1 {chalokID || "Unknown"}</div>;
  }, []);

  const renderAssignedVehicle = useCallback(
    (rentRequestID, rideStatus) => {
      if (rideStatus === "Selected") {
        return (
          <div>
            <select
              value={state.selectedMemberIDs.get(rentRequestID) || ""}
              onChange={(e) => handleMemberIDChange(rentRequestID, e.target.value)}
              className="assign-vehicle-dropdown"
            >
              <option value="" disabled>
                Select a vehicle
              </option>
              {state.vehicles
                .filter((vehicle) => vehicle.status === "accepted")
                .map((vehicle) => (
                  <option key={vehicle.memberID} value={vehicle.memberID}>
                    {`${vehicle.memberID} (${vehicle.vehicle})`}
                  </option>
                ))}
            </select>
            <button
              onClick={() => handleAssignChalok(rentRequestID)}
              className="assign-chalok-button"
            >
              Assign Chalok
            </button>
          </div>
        );
      } else if (["Accepted", "Rejected", "Ongoing", "Success"].includes(rideStatus)) {
        const assignedChalok = state.offeredDataMap.get(rentRequestID)?.chalokID || "N/A";
        console.log("Assigned Chalok ID:", assignedChalok);
        return assignedChalok;
      }
      return "N/A";
    },
    [state.vehicles, state.offeredDataMap, state.selectedMemberIDs, handleMemberIDChange, handleAssignChalok]
  );

  const handleFilterClick = useCallback((filter) => {
    setState((prev) => ({ ...prev, activeFilter: filter }));
  }, []);

  return (
    <>
      <HeaderFleet />
      <MobileNav />
      <div className="rental-requests-container">
        <h1 className="rental-requests-title">Rental Requests</h1>
        {state.loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        ) : state.error ? (
          <div className="error">{state.error}</div>
        ) : (
          <>
            <div className="filter-status">
              <p>Currently viewing: {state.activeFilter === "all" ? "All Rental Requests" : state.activeFilter}</p>
            </div>
            <div className="filter-grid">
              {[
                { filter: "all", label: `Total Requests: ${state.requests.length}` },
                { filter: "Available", label: `Available: ${state.requests.filter((req) => state.rideStatusMap.get(req.rentRequestID) === "Available").length}` },
                { filter: "Offered", label: `Offered: ${state.requests.filter((req) => state.rideStatusMap.get(req.rentRequestID) === "Offered").length}` },
                { filter: "Selected", label: `Selected: ${state.requests.filter((req) => state.rideStatusMap.get(req.rentRequestID) === "Selected").length}` },
                { filter: "Accepted", label: `Accepted: ${state.requests.filter((req) => state.rideStatusMap.get(req.rentRequestID) === "Accepted").length}` },
                { filter: "Ongoing", label: `Ongoing: ${state.requests.filter((req) => state.rideStatusMap.get(req.rentRequestID) === "Ongoing").length}` },
                { filter: "Success", label: `Success: ${state.requests.filter((req) => state.rideStatusMap.get(req.rentRequestID) === "Success").length}` },
                { filter: "Expired", label: `Expired: ${state.requests.filter((req) => state.rideStatusMap.get(req.rentRequestID) === "Expired").length}` },
                { filter: "Canceled", label: `Canceled: ${state.requests.filter((req) => state.rideStatusMap.get(req.rentRequestID) === "Cancel").length}` },
                { filter: "Rejected", label: `Rejected: ${state.requests.filter((req) => state.rideStatusMap.get(req.rentRequestID) === "Rejected").length}` },
                { filter: "Missed", label: `Missed: ${state.requests.filter((req) => state.rideStatusMap.get(req.rentRequestID) === "Missed").length}` },
              ].map(({ filter, label }) => (
                <button
                  key={filter}
                  className={`filter-button ${state.activeFilter === filter ? "active" : ""}`}
                  onClick={() => handleFilterClick(filter)}
                >
                  {state.activeFilter === filter && (
                    <svg className="check-icon" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  <span>{label}</span>
                  {state.activeFilter === filter && (
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
                value={state.searchQuery}
                readOnly
              />
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
                      { key: "rideStatus", label: "Ride Status" },
                      { key: "offerFare", label: "Offer Fare" },
                      { key: "chalokID", label: "Chalok ID" },
                      { key: "assignedVehicle", label: "Assigned Vehicle" },
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
                      <th key={column.key} className="table-header">
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {state.requests
                    .filter((request) =>
                      state.rideStatusMap.get(request.rentRequestID) !== "Didn't Bid" &&
                      (state.activeFilter === "all"
                        ? true
                        : state.rideStatusMap.get(request.rentRequestID) === state.activeFilter)
                    )
                    .sort((a, b) => b.id - a.id)
                    .map((request) => (
                      <tr key={request.rentRequestID} className="table-row">
                        <td className="table-cell">{request.id}</td>
                        <td className="table-cell">{request.rentRequestID}</td>
                        <td className="table-cell">{request.numberOfPassengers}</td>
                        <td className="table-cell">{request.startLocation}</td>
                        <td className="table-cell">{request.endLocation}</td>
                        <td className="table-cell">{request.startDateTime}</td>
                        <td className="table-cell">{request.favouredVehicle}</td>
                        <td className="table-cell">{request.created_at}</td>
                        <td className="table-cell">{request.jatriID}</td>
                        <td className="table-cell">{request.status}</td>
                        <td className="table-cell">{state.rideStatusMap.get(request.rentRequestID) || "Unknown"}</td>
                        <td className="table-cell">
                          {renderOfferFare(
                            request.rentRequestID,
                            state.rideStatusMap.get(request.rentRequestID)
                          )}
                        </td>
                        <td className="table-cell">{renderChalokIDs(request.chalokID)}</td>
                        <td className="table-cell">
                          {renderAssignedVehicle(
                            request.rentRequestID,
                            state.rideStatusMap.get(request.rentRequestID)
                          )}
                        </td>
                        <td className="table-cell">{request.rentType}</td>
                        <td className="table-cell-">{request.returnDateTime || "N/A"}</td>
                        <td className="table-cell">{request.tripDuration || "N/A"}</td>
                        <td className="table-cell">{request.startRide || "N/A"}</td>
                        <td className="table-cell">{request.finishRide || "N/A"}</td>
                        <td className="table-cell">{request.jatriRating || "N/A"}</td>
                        <td className="table-cell">{request.chalokRating || "N/A"}</td>
                        <td className="table-cell">{request.jatri_name}</td>
                        <td className="table-cell">{request.jatri_contact}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
      <FooterAdmin />
    </>
  );
};

export default FleetRentalRequest;