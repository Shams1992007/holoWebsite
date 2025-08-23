import React from "react";
import { Link } from "react-router-dom";
import FooterBlack from "../components/footerAdmin";
import loadjs from "loadjs";
import axios from "axios"; // Import axios for API calls
import MobileNav from "../components/mobilenav";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet"; // Import Polyline
import L from "leaflet"; // Import Leaflet library
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import HeaderBrta from "../components/headerBrta";

// Custom marker icons
const greenIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Function to calculate distance between two points using Haversine formula
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRadians = (degrees) => (degrees * Math.PI) / 180;
  const R = 6371; // Radius of the Earth in km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

class CompletedRideAdmin extends React.Component {
  state = {
    rides: [], // To hold the fetched ride data
    loading: true, // To handle loading state
    error: null, // To handle error state
    selectedRideId: null, // To track the selected ride ID
    rideDetails: null, // To hold details of the selected ride
  };

  componentDidMount() {
    // Check if the user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"; 

    if (!isAuthenticated) {
      this.setState({ 
        loading: false, 
        error: "You are not authenticated. Please Logout." 
      }); 
      return; 
    }

    loadjs("./js/main.js");
    loadjs("./js/plugins.js");

    // Fetch completed rides data using axios
    axios
      .get("https://api.holoapp.tech:3000/api/getAllRideID") // Replace with your API endpoint
      .then((response) => {
        this.setState({
          rides: response.data, // Populate rides data
          loading: false, // Set loading to false when data is fetched
        });
      })
      .catch((error) => {
        this.setState({
          error: "Failed to fetch completed rides data", // Set error if the request fails
          loading: false, // Set loading to false even on error
        });
      });
  }

  // Function to handle ride ID click
  handleRideClick = (rideId) => {
    this.setState({ selectedRideId: rideId });

    // Fetch details of the selected ride
    axios
      .get(`https://api.holoapp.tech:3000/api/getCompletedRides/${rideId}`) // Replace with your API endpoint
      .then((response) => {
        this.setState({ rideDetails: response.data });
      })
      .catch((error) => {
        console.error("Error fetching ride details:", error);
        this.setState({ rideDetails: null });
      });
  };

  // Function to format datetime to dd/mm/yyyy
  formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Function to calculate total distance from chalokData
  calculateTotalDistance = (chalokData) => {
    if (!chalokData || chalokData.length < 2) return 0;

    let totalDistance = 0;
    for (let i = 1; i < chalokData.length; i++) {
      const prevPoint = chalokData[i - 1];
      const currPoint = chalokData[i];
      totalDistance += calculateDistance(
        prevPoint.latitude,
        prevPoint.longitude,
        currPoint.latitude,
        currPoint.longitude
      );
    }
    return totalDistance.toFixed(2); // Return distance rounded to 2 decimal places
  };

  render() {
    const { rides, loading, error, selectedRideId, rideDetails } = this.state;

    // Sort the rides array in descending order
    const sortedRides = [...rides].sort((a, b) => b - a);

    // Extract the first element of rideDetails array (if it exists)
    const rideDetail = rideDetails && rideDetails.length > 0 ? rideDetails[0] : null;

    // Default center for the map (first coordinate in chalokData)
    const mapCenter =
      rideDetail && rideDetail.chalokData.length > 0
        ? [rideDetail.chalokData[0].latitude, rideDetail.chalokData[0].longitude]
        : [23.7613335, 90.3558568]; // Default to Dhaka coordinates

    // Convert chalokData to an array of [latitude, longitude] pairs for Polyline
    const polylinePositions =
      rideDetail && rideDetail.chalokData.length > 0
        ? rideDetail.chalokData.map((point) => [point.latitude, point.longitude])
        : [];

    // Extract the first and last points for markers
    const firstPoint =
      rideDetail && rideDetail.chalokData.length > 0 ? rideDetail.chalokData[0] : null;
    const lastPoint =
      rideDetail && rideDetail.chalokData.length > 0
        ? rideDetail.chalokData[rideDetail.chalokData.length - 1]
        : null;

    // Calculate total distance from chalokData
    const totalDistance =
      rideDetail && rideDetail.chalokData.length > 0
        ? this.calculateTotalDistance(rideDetail.chalokData)
        : 0;

    return (
      <>
        <HeaderBrta />
        <MobileNav />
        {/* BREADCRUMB AREA START */}
        <div
          className="ltn__breadcrumb-area ltn__breadcrumb-area-2 ltn__breadcrumb-color-white bg-overlay-theme-black-90 bg-image admin-header-height"
          data-bg="img/bg/dhaka.jpeg"
        >
          <div className="container"></div>
        </div>
        {/* BREADCRUMB AREA END */}

        {/* PAGE DETAILS AREA START */}
        <div className="ltn__page-details-area ltn__blog-details-area mb-120">
          <div className="container">
            <h1 className="text-center mb-4">Completed Rides</h1>
            {loading ? (
              <div className="text-center">Loading...</div>
            ) : error ? (
              <div className="text-center text-danger">{error}</div>
            ) : (
              <div className="row">
                {/* Left Side: Ride ID List */}
                <div className="col-md-2">
                  <div className="list-group">
                    {sortedRides.map((rideId) => (
                      <button
                        key={rideId}
                        className={`list-group-item list-group-item-action ${
                          selectedRideId === rideId ? "active" : ""
                        }`}
                        onClick={() => this.handleRideClick(rideId)}
                      >
                        Ride ID: {rideId}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Middle and Right Side: Ride Details */}
                <div className="col-md-10">
                  {rideDetail ? (
                    <div>
                      <h3>Ride Details</h3>
                      <table className="table table-striped table-bordered">
                        <thead>
                          <tr>
                            <th>Field</th>
                            <th>Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Jatri Name</td>
                            <td>{rideDetail.jatriName}</td>
                          </tr>
                          <tr>
                            <td>Chalok Name</td>
                            <td>{rideDetail.chalokName}</td>
                          </tr>
                          <tr>
                            <td>Ride Start</td>
                            <td>{rideDetail.startName}</td>
                          </tr>
                          <tr>
                            <td>Ride End</td>
                            <td>{rideDetail.destinationName}</td>
                          </tr>
                          <tr>
                            <td>Price</td>
                            <td>{rideDetail.price}</td>
                          </tr>
                          <tr>
                            <td>Sticker</td>
                            <td>{rideDetail.sticker === 1 ? "Yes" : "No"}</td>
                          </tr>
                          <tr>
                            <td>Total Distance</td>
                            <td>{totalDistance} km</td>
                          </tr>
                          <tr>
                            <td>Ride Start Time</td>
                            <td>{this.formatDate(rideDetail.acceptRide)}</td>
                          </tr>
                        </tbody>
                      </table>

                      {/* Leaflet Map */}
                      <h3>Ride Data on Map <small>(Green marker: Start, Red marker: Finish)</small></h3>
                      <div style={{ height: "400px", width: "100%" }}>
                        <MapContainer
                          center={mapCenter}
                          zoom={15}
                          style={{ height: "100%", width: "100%" }}
                        >
                          <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          />
                          {/* Render the first marker (green) */}
                          {firstPoint && (
                            <Marker
                              position={[firstPoint.latitude, firstPoint.longitude]}
                              icon={greenIcon}
                            >
                              <Popup>Start Point</Popup>
                            </Marker>
                          )}
                          {/* Render the last marker (red) */}
                          {lastPoint && (
                            <Marker
                              position={[lastPoint.latitude, lastPoint.longitude]}
                              icon={redIcon}
                            >
                              <Popup>End Point</Popup>
                            </Marker>
                          )}
                          {/* Render polyline to connect the points */}
                          <Polyline positions={polylinePositions} color="blue" />
                        </MapContainer>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      {selectedRideId
                        ? "Loading ride details..."
                        : "Select a ride to view details."}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        {/* PAGE DETAILS AREA END */}

        {/* FOOTER AREA START */}
        <FooterBlack />
        {/* FOOTER AREA END */}
      </>
    );
  }
}

export default CompletedRideAdmin;