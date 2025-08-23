import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FooterBlack from '../components/footerAdmin';
import loadjs from 'loadjs';
import axios from 'axios';
import MobileNav from '../components/mobilenav';
import HeaderBrta from '../components/headerBrta';

class ComplainAdmin extends React.Component {
  state = {
    rides: [], // List of ride IDs
    loading: true, // Loading state
    error: null, // Error state
    selectedRideId: null, // Selected ride ID
    complaints: [], // Complaints data
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

    // Fetch all ride IDs
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
    this.setState({ selectedRideId: rideId, complaints: [] });

    // Fetch complaints for the selected ride ID
    axios
      .get(`https://api.holoapp.tech:3000/api/getAllComplain/${rideId}/details`)
      .then((response) => {
        this.setState({ complaints: response.data });
      })
      .catch((error) => {
        console.error("Error fetching complaints:", error);
        this.setState({ complaints: [] });
      });
  };

  render() {
    const { rides, loading, error, selectedRideId, complaints } = this.state;

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
            <h1 className="text-center mb-4">Complaint List</h1>
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
                      <h3>Complaints for Ride ID: {selectedRideId}</h3>
                      {this.renderComplaints()}
                    </div>
                  ) : (
                    <div className="text-center">Select a ride ID to view complaints.</div>
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

  renderComplaints() {
    const { complaints } = this.state;

    if (complaints.length === 0) {
      return <div className="text-center">No complaints found for this ride.</div>;
    }

    return (
      <div>
        {complaints.map((complaint, index) => (
          <div key={index} className="mb-4">
            <h4>Passenger: {complaint.jatriName}</h4>
            <h4>Driver: {complaint.chalokName}</h4>

            {complaint.jatriComplain && (
              <div className="mb-3">
                <h5>Passenger Complaints:</h5>
                <ul>
                  {complaint.jatriComplain.map((item, idx) => {
                    if (typeof item === "string") {
                      return <li key={idx}>{item}</li>;
                    } else if (item.reply) {
                      return (
                        <li key={idx}>
                          <b>Admin Reply:</b> {item.reply} (by {item.adminName})
                        </li>
                      );
                    }
                    return null;
                  })}
                </ul>
              </div>
            )}

            {complaint.chalokComplain && (
              <div className="mb-3">
                <h5>Driver Complaints:</h5>
                <ul>
                  {complaint.chalokComplain.map((item, idx) => {
                    if (typeof item === "string") {
                      return <li key={idx}>{item}</li>;
                    } else if (item.reply) {
                      return (
                        <li key={idx}>
                          <b>Admin Reply:</b> {item.reply} (by {item.adminName})
                        </li>
                      );
                    }
                    return null;
                  })}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
}

export default ComplainAdmin;