import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FooterBlack from '../components/footerAdmin';
import loadjs from 'loadjs';
import axios from 'axios';
import MobileNav from '../components/mobilenav';
import HeaderBrta from '../components/headerBrta';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Define custom icons
const blueIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const greenIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const orangeIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

class AlertAdmin extends React.Component {
  state = {
    rides: [], 
    loading: true, 
    error: null, 
    selectedRideId: null, 
    alerts: [], 
    rideDetails: null, 
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

    axios
      .get("https://api.holoapp.tech:3000/api/getAllRideID") 
      .then((response) => {
        this.setState({
          rides: response.data, 
          loading: false, 
        });
      })
      .catch((error) => {
        this.setState({
          error: "Failed to fetch ride IDs", 
          loading: false, 
        });
      });
  }

  handleRideClick = (rideId) => {
    this.setState({ selectedRideId: rideId, alerts: [], rideDetails: null });

    axios
      .get(`https://api.holoapp.tech:3000/api/getAllAlert/${rideId}`)
      .then((response) => {
        this.setState({ alerts: response.data[0] || {} });
      })
      .catch((error) => {
        console.error("Error fetching alerts:", error);
        this.setState({ alerts: {} });
      });
  };

  render() {
    const { rides, loading, error, selectedRideId, alerts, rideDetails } = this.state;

    const sortedRides = [...rides].sort((a, b) => b - a);

    return (
      <>
        <HeaderBrta />
        <MobileNav />
        <div className="ltn__breadcrumb-area bg-overlay-theme-black-90 bg-image admin-header-height">
          <div className="container"></div>
        </div>

        <div className="ltn__page-details-area mb-120">
          <div className="container">
            <h1 className="text-center mb-4">Alert List</h1>
            {loading ? (
              <div className="text-center">Loading...</div>
            ) : error ? (
              <div className="text-center text-danger">{error}</div>
            ) : (
              <div className="row">
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

                <div className="col-md-10">
                  {selectedRideId ? (
                    <div>
                      <h3>Alerts for Ride ID: {selectedRideId}</h3>
                      {this.renderAlerts()}
                      {this.renderMap()}
                    </div>
                  ) : (
                    <div className="text-center">Select a ride ID to view alerts.</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <FooterBlack />
      </>
    );
  }

  renderAlerts() {
    const { alerts, rideDetails } = this.state;
    return (
      <>
        {alerts.jatriCallPolice && alerts?.jatriName && (
          <p>
            <b>Passenger ({alerts.jatriName}) called police against ({alerts.chalokName}) (Blue Icon):</b>
            {alerts.jatriCallPolice.length > 0 && (
              <ul>
                {alerts.jatriCallPolice.map((call, index) => (
                  <li key={index}>
                    Location: {call.latitude}, {call.longitude} - Time: {new Date(call.timestamp).toLocaleString()}
                  </li>
                ))}
              </ul>
            )}
          </p>
        )}
        {alerts.chalokCallPolice && alerts?.chalokName && (
          <p>
            <b>Driver ({alerts.chalokName}) called police against ({alerts.jatriName}) (Red Icon):</b>
            {alerts.chalokCallPolice.length > 0 && (
              <ul>
                {alerts.chalokCallPolice.map((call, index) => (
                  <li key={index}>
                    Location: {call.latitude}, {call.longitude} - Time: {new Date(call.timestamp).toLocaleString()}
                  </li>
                ))}
              </ul>
            )}
          </p>
        )}
        {alerts.jatriDiscomfort && alerts?.jatriName && (
          <p>
            <b>Passenger ({alerts.jatriName}) reported discomfort against ({alerts.chalokName}) (Green Icon):</b>
            {alerts.jatriDiscomfort.length > 0 && (
              <ul>
                {alerts.jatriDiscomfort.map((discomfort, index) => (
                  <li key={index}>
                    Location: {discomfort.latitude}, {discomfort.longitude} - Time: {new Date(discomfort.timestamp).toLocaleString()}
                  </li>
                ))}
              </ul>
            )}
          </p>
        )}
        {alerts.chalokDiscomfort && alerts?.chalokName && (
          <p>
            <b>Driver ({alerts.chalokName}) reported discomfort against ({alerts.jatriName}) (Orange Icon):</b>
            {alerts.chalokDiscomfort.length > 0 && (
              <ul>
                {alerts.chalokDiscomfort.map((discomfort, index) => (
                  <li key={index}>
                    Location: {discomfort.latitude}, {discomfort.longitude} - Time: {new Date(discomfort.timestamp).toLocaleString()}
                  </li>
                ))}
              </ul>
            )}
          </p>
        )}
      </>
    );
  }

  renderMap() {
    const { alerts } = this.state;

    const positions = [];

    if (alerts.jatriCallPolice) {
      alerts.jatriCallPolice.forEach(call => {
        positions.push({ lat: call.latitude, lng: call.longitude, name: 'Passenger Call', icon: blueIcon });
      });
    }

    if (alerts.chalokCallPolice) {
      alerts.chalokCallPolice.forEach(call => {
        positions.push({ lat: call.latitude, lng: call.longitude, name: 'Driver Call', icon: redIcon });
      });
    }

    if (alerts.jatriDiscomfort) {
      alerts.jatriDiscomfort.forEach(discomfort => {
        positions.push({ lat: discomfort.latitude, lng: discomfort.longitude, name: 'Passenger Discomfort', icon: greenIcon });
      });
    }

    if (alerts.chalokDiscomfort) {
      alerts.chalokDiscomfort.forEach(discomfort => {
        positions.push({ lat: discomfort.latitude, lng: discomfort.longitude, name: 'Driver Discomfort', icon: orangeIcon });
      });
    }

    if (positions.length === 0) return <p>No alert locations available.</p>;

    return (
      <MapContainer center={[23.7613335, 90.3558568]} zoom={13} style={{ height: '400px' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        {positions.map((position, index) => (
          <Marker key={index} position={[position.lat, position.lng]} icon={position.icon}>
            <Popup>{position.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    );
  }
}

export default AlertAdmin;