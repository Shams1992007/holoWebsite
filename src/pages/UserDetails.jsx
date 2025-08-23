import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderAdmin from "../components/headerAdmin";
import MobileNav from "../components/mobilenav";
import FooterAdmin from "../components/footerAdmin";
import "./userDetails.css";

const UserDetails = () => {
  const { state } = useLocation();
  const user = state?.user;
  const navigate = useNavigate();
  const [personalInfo, setPersonalInfo] = useState(null);
  const [chalokInfo, setChalokInfo] = useState(null);
  const [vehicleInfo, setVehicleInfo] = useState(null);
  const [referralInfo, setReferralInfo] = useState(null);
  const [personalError, setPersonalError] = useState("");
  const [chalokError, setChalokError] = useState("");
  const [vehicleError, setVehicleError] = useState("");
  const [referralError, setReferralError] = useState("");
  const [chalokStatus, setChalokStatus] = useState(null);
  const [jatriStatus, setJatriStatus] = useState(null);
  const [chalokStatusError, setChalokStatusError] = useState("");
  const [jatriStatusError, setJatriStatusError] = useState("");

  useEffect(() => {
    let isMounted = true;
    const API_BASE_URL = "https://api.holoapp.tech:3000";

    const fetchPersonalInfo = async () => {
      try {
        console.log("Fetching personal info for userID:", user.userID);
        const response = await axios.get(
          `${API_BASE_URL}/api/get-personal/${user.userID}`,
          { withCredentials: true }
        );
        console.log("Personal API response:", response.data);

        if (isMounted) {
          if (Array.isArray(response.data) && response.data.length > 0) {
            setPersonalInfo({
              address: response.data[0].address || null,
              bloodGroup: response.data[0].blood_group || null,
              dateOfBirth: response.data[0].date_of_birth || null,
              gender: response.data[0].gender || null,
              emergencyContact: response.data[0].emergency_contact || null,
              relationship: response.data[0].relationship || null,
            });
            setPersonalError("");
          } else {
            setPersonalError("No personal information available.");
          }
        }
      } catch (error) {
        console.error("Personal request error:", error.response?.status, error.response?.data);
        if (isMounted) {
          if (error.response?.status === 403) {
            await handleTokenRefresh("personal", fetchPersonalInfo, API_BASE_URL);
          } else if (error.response?.status === 401) {
            navigate("/signin");
          } else {
            setPersonalError(`Failed to fetch personal information: ${error.response?.data?.error || error.message}`);
          }
        }        
      }
    };

    const fetchChalokInfo = async () => {
      try {
        console.log("Fetching chalok info for userID:", user.userID);
        const response = await axios.get(
          `${API_BASE_URL}/api/get-chalok/${user.userID}`,
          { withCredentials: true }
        );
        console.log("Chalok API response:", response.data);

        if (isMounted) {
          if (Array.isArray(response.data) && response.data.length > 0) {
            setChalokInfo({
              nidNumber: response.data[0].NIDnumber || null,
              nidURL: response.data[0].nidURL || null,
              dlNumber: response.data[0].DLnumber || null,
              dlExpiryDate: response.data[0].DLdate || null,
              dlFrontURL: response.data[0].DLFrontURL || null,
              dlBackURL: response.data[0].DLBackURL || null,
              utilityURL: response.data[0].utilityURL || null,
              ownerContact: response.data[0].ownerContact || null,
              ownerNIDURL: response.data[0].ownerNIDURL || null,
            });
            setChalokError("");
          } else {
            setChalokError("No chalok information available.");
          }
        }
      } catch (error) {
        console.error("Chalok request error:", error.response?.status, error.response?.data);
        if (isMounted) {
          if (error.response?.status === 403) {
            await handleTokenRefresh("chalok", fetchChalokInfo, API_BASE_URL);
          } else if (error.response?.status === 401) {
            navigate("/signin");
          } else {
            setChalokError(`Failed to fetch chalok information: ${error.response?.data?.error || error.message}`);
          }
        }        
      }
    };

    const fetchVehicleInfo = async () => {
      try {
        console.log("Fetching vehicle info for userID:", user.userID);
        const response = await axios.get(
          `${API_BASE_URL}/api/get-vehicle/${user.userID}`,
          { withCredentials: true }
        );
        console.log("Vehicle API response:", response.data);

        if (isMounted) {
          if (Array.isArray(response.data) && response.data.length > 0) {
            setVehicleInfo({
              vehicle: response.data[0].vehicle || null,
              modelName: response.data[0].model_name || null,
              modelYear: response.data[0].model_year || null,
              engineCapacity: response.data[0].engine_capacity || null,
              color: response.data[0].color || null,
              registrationDate: response.data[0].registration_date || null,
              registrationNumber: response.data[0].registration_number || null,
              registrationFrontUrl: response.data[0].registrationFrontUrl || null,
              registrationBackUrl: response.data[0].registrationBackUrl || null,
              fitnessStartDate: response.data[0].fitness_start_date || null,
              fitnessEndDate: response.data[0].fitness_end_date || null,
              fitnessPaperUrl: response.data[0].fitnessPaperUrl || null,
              taxTokenStartDate: response.data[0].tax_token_start_date || null,
              taxTokenEndDate: response.data[0].tax_token_end_date || null,
              taxTokenUrl: response.data[0].taxTokenUrl || null,
              insuranceStartDate: response.data[0].insurance_start_date || null,
              insuranceEndDate: response.data[0].insurance_end_date || null,
              insurancePaperUrl: response.data[0].insurancePaperUrl || null,
            });
            setVehicleError("");
          } else {
            setVehicleError("No vehicle information available.");
          }
        }
      } catch (error) {
        console.error("Vehicle request error:", error.response?.status, error.response?.data);
        if (isMounted) {
          if (error.response?.status === 403) {
            await handleTokenRefresh("vehicle", fetchVehicleInfo, API_BASE_URL);
          } else if (error.response?.status === 401) {
            navigate("/signin");
          } else {
            setVehicleError(`Failed to fetch vehicle information: ${error.response?.data?.error || error.message}`);
          }
        }        
      }
    };

    const fetchReferralInfo = async () => {
      try {
        console.log("Fetching referral info for userID:", user.userID);
        const response = await axios.get(
          `${API_BASE_URL}/api/get-refer/${user.userID}`,
          { withCredentials: true }
        );
        console.log("Referral API response:", response.data);

        if (isMounted) {
          setReferralInfo({
            referrerResults: response.data.referrerResults || [],
            refereeResults: response.data.refereeResults || [],
          });
          setReferralError("");
        }
      } catch (error) {
        console.error("Referral request error:", error.response?.status, error.response?.data);
        if (isMounted) {
          if (error.response?.status === 403) {
            await handleTokenRefresh("referral", fetchReferralInfo, API_BASE_URL);
          } else if (error.response?.status === 401) {
            navigate("/signin");
          } else {
            setReferralError(`Failed to fetch referral information: ${error.response?.data?.error || error.message}`);
          }
        }        
      }
    };

    const handleTokenRefresh = async (type, retryFunction, baseUrl) => {
      try {
        console.log("Attempting token refresh...");
        await axios.post(
          `${baseUrl}/api/refresh-token`,
          {},
          { withCredentials: true }
        );
        console.log("Retrying", type, "request...");
        if (isMounted) {
          await retryFunction();
        }
      } catch (refreshError) {
        console.error("Refresh error:", refreshError.response?.status, refreshError.message);
        if (isMounted) {
          if (type === "personal") setPersonalError("Session expired. Please sign in again.");
          if (type === "chalok") setChalokError("Session expired. Please sign in again.");
          if (type === "vehicle") setVehicleError("Session expired. Please sign in again.");
          if (type === "referral") setReferralError("Session expired. Please sign in again.");
          if (type === "chalokStatus") setChalokStatusError("Session expired. Please sign in again.");
          if (type === "jatriStatus") setJatriStatusError("Session expired. Please sign in again.");          
          navigate("/signin");
        }
      }
    };

    const fetchChalokStatus = async () => {
      try {
        console.log("Fetching chalok status for userID:", user.userID);
        const response = await axios.get(
          `${API_BASE_URL}/api/get-chalokStatus/${user.userID}`,
          { withCredentials: true }
        );
        console.log("Chalok Status API response:", response.data);
    
        if (isMounted) {
          if (Array.isArray(response.data.data) && response.data.data.length > 0) {
            setChalokStatus(response.data.data[0]);
            setChalokStatusError("");
          } else {
            setChalokStatusError("No chalok status available.");
          }
        }        
      } catch (error) {
        console.error("Chalok Status request error:", error.response?.status, error.response?.data);
        if (isMounted) {
          if (error.response?.status === 403) {
            await handleTokenRefresh("chalokStatus", fetchChalokStatus, API_BASE_URL);
          } else if (error.response?.status === 401) {
            navigate("/signin");
          } else {
            setChalokStatusError(`Failed to fetch chalok status: ${error.response?.data?.error || error.message}`);
          }
        }        
      }
    };
    
    const fetchJatriStatus = async () => {
      try {
        console.log("Fetching jatri status for userID:", user.userID);
        const response = await axios.get(
          `${API_BASE_URL}/api/get-jatriStatus/${user.userID}`,
          { withCredentials: true }
        );
        console.log("Jatri Status API response:", response.data);
    
        if (isMounted) {
          if (Array.isArray(response.data.data) && response.data.data.length > 0) {
            setJatriStatus(response.data.data[0]);
            setJatriStatusError("");
          } else {
            setJatriStatusError("No jatri status available.");
          }
        }        
      } catch (error) {
        console.error("Jatri Status request error:", error.response?.status, error.response?.data);
        if (isMounted) {
          if (error.response?.status === 403) {
            await handleTokenRefresh("jatriStatus", fetchJatriStatus, API_BASE_URL);
          } else if (error.response?.status === 401) {
            navigate("/signin");
          } else {
            setJatriStatusError(`Failed to fetch jatri status: ${error.response?.data?.error || error.message}`);
          }
        }        
      }
    };

        
/*
    
    const handleBlockChalok = async () => {
      try {
        await axios.post(
          `${API_BASE_URL}/api/block-chalok/${user.userID}`,
          {},
          { withCredentials: true }
        );
        setChalokStatus({ ...chalokStatus, blocked: 1 });
      } catch (error) {
        console.error("Block chalok error:", error.response?.status, error.response?.data);
        setChalokStatusError(`Failed to block chalok: ${error.response?.data?.error || error.message}`);
      }
    };
    
    const handleUnblockChalok = async () => {
      try {
        await axios.post(
          `${API_BASE_URL}/api/unblock-chalok/${user.userID}`,
          {},
          { withCredentials: true }
        );
        setChalokStatus({ ...chalokStatus, blocked: 0 });
      } catch (error) {
        console.error("Unblock chalok error:", error.response?.status, error.response?.data);
        setChalokStatusError(`Failed to unblock chalok: ${error.response?.data?.error || error.message}`);
      }
    };
*/
    if (user?.userID) {
// Fetch Personal Info only if user.completeUser is "Yes" or equivalent
if (user.completeUser === 1) {
  fetchPersonalInfo();
} else {
  setPersonalError("No personal information available.");
}

// Fetch Chalok Info only if user.completeDriver is "Yes" or equivalent
if (user.completeDriver === 1) {
  fetchChalokInfo();
} else {
  setChalokError("No chalok information available.");
}

// Fetch Vehicle Info only if user.completeDriver is "Yes" or equivalent
if (user.completeVehicle === 1) {
  fetchVehicleInfo();
} else {
  setVehicleError("No vehicle information available.");
}      
      fetchReferralInfo();
      fetchChalokStatus();
      fetchJatriStatus();     
/*      
      handleBlockChalok();
      handleUnblockChalok(); 
*/      
    }

    return () => {
      isMounted = false;
    };
  }, [user?.userID, navigate]);

  const handleApproveChalok = async () => {    
    try {
      console.log("Approving chalok for userID:", user.userID);
      await axios.post(
        `https://api.holoapp.tech:3000/api/approveChalok`,
        { userID: user.userID }, // ✅ correct body
        { withCredentials: true } // ✅ config
      );      
      // Optional: Update state before refreshing, or skip this
      setChalokStatus({ ...chalokStatus, approved: 1 });
  
      // Refresh the page
      window.location.reload();
    } catch (error) {
      console.error("Approve chalok error:", error.response?.status, error.response?.data);
      setChalokStatusError(`Failed to approve chalok: ${error.response?.data?.error || error.message}`);
    }
  };

  if (!user) {
    return (
      <>
        <HeaderAdmin />
        <MobileNav />
        <div className="user-details-container">
          <div className="error">User data not found. Please select a user from the list.</div>
        </div>
        <FooterAdmin />
      </>
    );
  }

  return (
    <>
      <HeaderAdmin />
      <MobileNav />
      <div className="user-details-container">
        <h1 className="user-details-title">User Profile: {user.userID}</h1>
        <div className="profile-card">
          {user.photoUrl && (
            <img src={user.photoUrl} alt={`${user.name}'s photo`} className="profile-photo" />
          )}
          <h2 className="section-title">User Information</h2>
          <div className="info-grid">
            <div className="text-item"><strong>ID:</strong> {user.userID}</div>
            <div className="text-item"><strong>User Name:</strong> {user.name}</div>
            <div className="text-item"><strong>Email:</strong> {user.email || "N/A"}</div>
            <div className="text-item"><strong>Phone:</strong> {user.contact}</div>
            <div className="text-item"><strong>Signup Method:</strong> {user.auth}</div>
            <div className="text-item"><strong>Registered:</strong> {user.register}</div>
            <div className="text-item"><strong>Registered At:</strong> {user.created_at || "N/A"}</div>
            <div className="text-item"><strong>User Completed:</strong> {user.completeUser}</div>
            <div className="text-item"><strong>User Completed At:</strong> {user.user_created_at || "N/A"}</div>
            <div className="text-item"><strong>Driver Completed:</strong> {user.completeDriver}</div>
            <div className="text-item"><strong>Driver Completed At:</strong> {user.driver_created_at || "N/A"}</div>
            <div className="text-item"><strong>Vehicle Completed:</strong> {user.completeVehicle}</div>
            <div className="text-item"><strong>Signup App:</strong> {user.app}</div>
          </div>

          <h2 className="section-title">Personal Information</h2>
          <div className="info-grid">
          {personalError || !personalInfo ? (
  <button
    onClick={() => navigate(`/insert-personal/${user.userID}`)}
    style={{
      marginBottom: "10px",
      padding: "5px 10px",
      background: "#10b981",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      width: "100px",
      height: "30px",
    }}
  >
    Insert
  </button>
) : (
  <button
    onClick={() => navigate(`/edit-personal/${user.userID}`)}
    style={{
      marginBottom: "10px",
      padding: "5px 10px",
      background: "#3b82f6",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      width: "100px",
      height: "30px",
    }}
  >
    Edit
  </button>
)}          
            {personalError ? (
              <div className="info-item">{personalError}</div>
            ) : personalInfo ? (
              <>
                <div className="text-item"><strong>Address:</strong> {personalInfo.address || "N/A"}</div>
                <div className="text-item"><strong>Blood Group:</strong> {personalInfo.bloodGroup || "N/A"}</div>
                <div className="text-item"><strong>Date of Birth:</strong> {personalInfo.dateOfBirth || "N/A"}</div>
                <div className="text-item"><strong>Gender:</strong> {personalInfo.gender || "N/A"}</div>
                <div className="text-item"><strong>Emergency Contact:</strong> {personalInfo.emergencyContact || "N/A"}</div>
                <div className="text-item"><strong>Relationship:</strong> {personalInfo.relationship || "N/A"}</div>
              </>
            ) : (
              <div className="info-item">Loading...</div>
            )}
          </div>

          <h2 className="section-title">Chalok (Driver) Information</h2>
          <div className="info-grid">
          {chalokError || !chalokInfo ? (
  <button
    onClick={() => navigate(`/insert-chalok/${user.userID}`)}
    style={{
      marginBottom: "10px",
      padding: "5px 10px",
      background: "#10b981",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      width: "100px",
      height: "30px",
    }}
  >
    Insert
  </button>
) : (
  <button
    onClick={() => navigate(`/edit-chalok/${user.userID}`)}
    style={{
      marginBottom: "10px",
      padding: "5px 10px",
      background: "#3b82f6",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      width: "100px",
      height: "30px",
    }}
  >
    Edit
  </button>
)}
            {chalokError ? (
              <div className="info-item">{chalokError}</div>
            ) : chalokInfo ? (
              <>
                <div className="text-item"><strong>NID Number:</strong> {chalokInfo.nidNumber || "N/A"}</div>
                <div className="info-item">
                  <strong>NID Image:</strong>
                  <div className="image-container">
                    {chalokInfo.nidURL ? (
                      <div>
                        <a href={chalokInfo.nidURL} target="_blank" rel="noopener noreferrer">
                          <img src={chalokInfo.nidURL} alt="NID" className="info-image" />
                        </a>
                        <div className="image-label">NID</div>
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </div>
                </div>
                <div className="text-item"><strong>Driving License Number:</strong> {chalokInfo.dlNumber || "N/A"}</div>
                <div className="text-item"><strong>Driving License Expiry Date:</strong> {chalokInfo.dlExpiryDate || "N/A"}</div>
                <div className="info-item">
                  <strong>Driving License Front:</strong>
                  <div className="image-container">
                    {chalokInfo.dlFrontURL ? (
                      <div>
                        <a href={chalokInfo.dlFrontURL} target="_blank" rel="noopener noreferrer">
                          <img src={chalokInfo.dlFrontURL} alt="License Front" className="info-image" />
                        </a>
                        <div className="image-label">Front</div>
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </div>
                </div>
                <div className="info-item">
                  <strong>Driving License Back:</strong>
                  <div className="image-container">
                    {chalokInfo.dlBackURL ? (
                      <div>
                        <a href={chalokInfo.dlBackURL} target="_blank" rel="noopener noreferrer">
                          <img src={chalokInfo.dlBackURL} alt="License Back" className="info-image" />
                        </a>
                        <div className="image-label">Back</div>
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </div>
                </div>
                <div className="info-item">
                  <strong>Utility Image:</strong>
                  <div className="image-container">
                    {chalokInfo.utilityURL ? (
                      <div>
                        <a href={chalokInfo.utilityURL} target="_blank" rel="noopener noreferrer">
                          <img src={chalokInfo.utilityURL} alt="Utility" className="info-image" />
                        </a>
                        <div className="image-label">Utility</div>
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </div>
                </div>
                <div className="text-item"><strong>Owner Contact:</strong> {chalokInfo.ownerContact || "N/A"}</div>
                <div className="info-item">
                  <strong>Owner NID Number:</strong>
                  <div className="image-container">
                    {chalokInfo.ownerNIDURL ? (
                      <div>
                        <a href={chalokInfo.ownerNIDURL} target="_blank" rel="noopener noreferrer">
                          <img src={chalokInfo.ownerNIDURL} alt="Owner NID" className="info-image" />
                        </a>
                        <div className="image-label">Owner NID</div>
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="info-item">Loading...</div>
            )}
          </div>

          <h2 className="section-title">Vehicle Information</h2>
          <div className="info-grid">
          {vehicleError || !vehicleInfo ? (
  <button
    onClick={() => navigate(`/insert-vehicle/${user.userID}`)}
    style={{
      marginBottom: "10px",
      padding: "5px 10px",
      background: "#10b981",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      width: "100px",
      height: "30px",
    }}
  >
    Insert
  </button>
) : (
  <button
    onClick={() => navigate(`/edit-vehicle/${user.userID}`)}
    style={{
      marginBottom: "10px",
      padding: "5px 10px",
      background: "#3b82f6",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      width: "100px",
      height: "30px",
    }}
  >
    Edit
  </button>
)}
            {vehicleError ? (
              <div className="info-item">{vehicleError}</div>
            ) : vehicleInfo ? (
              <>
                <div className="text-item"><strong>Vehicle:</strong> {vehicleInfo.vehicle || "N/A"}</div>
                <div className="text-item"><strong>Model Name:</strong> {vehicleInfo.modelName || "N/A"}</div>
                <div className="text-item"><strong>Model Year:</strong> {vehicleInfo.modelYear || "N/A"}</div>
                <div className="text-item"><strong>Engine Capacity:</strong> {vehicleInfo.engineCapacity || "N/A"} cc</div>
                <div className="text-item"><strong>Color:</strong> {vehicleInfo.color || "N/A"}</div>
                <div className="text-item"><strong>Registration Date:</strong> {vehicleInfo.registrationDate || "N/A"}</div>
                <div className="text-item"><strong>Registration Number:</strong> {vehicleInfo.registrationNumber || "N/A"}</div>
                <div className="info-item">
                  <strong>Registration Image Front:</strong>
                  <div className="image-container">
                    {vehicleInfo.registrationFrontUrl ? (
                      <div>
                        <a href={vehicleInfo.registrationFrontUrl} target="_blank" rel="noopener noreferrer">
                          <img src={vehicleInfo.registrationFrontUrl} alt="Registration Front" className="info-image" />
                        </a>
                        <div className="image-label">Front</div>
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </div>
                </div>
                <div className="info-item">
                  <strong>Registration Image Back:</strong>
                  <div className="image-container">
                    {vehicleInfo.registrationBackUrl ? (
                      <div>
                        <a href={vehicleInfo.registrationBackUrl} target="_blank" rel="noopener noreferrer">
                          <img src={vehicleInfo.registrationBackUrl} alt="Registration Back" className="info-image" />
                        </a>
                        <div className="image-label">Back</div>
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </div>
                </div>
                <div className="text-item"><strong>Fitness Start Date:</strong> {vehicleInfo.fitnessStartDate || "N/A"}</div>
                <div className="text-item"><strong>Fitness End Date:</strong> {vehicleInfo.fitnessEndDate || "N/A"}</div>
                <div className="info-item">
                  <strong>Fitness Image:</strong>
                  <div className="image-container">
                    {vehicleInfo.fitnessPaperUrl ? (
                      <div>
                        <a href={vehicleInfo.fitnessPaperUrl} target="_blank" rel="noopener noreferrer">
                          <img src={vehicleInfo.fitnessPaperUrl} alt="Fitness Paper" className="info-image" />
                        </a>
                        <div className="image-label">Fitness</div>
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </div>
                </div>
                <div className="text-item"><strong>Tax Token Start Date:</strong> {vehicleInfo.taxTokenStartDate || "N/A"}</div>
                <div className="text-item"><strong>Tax Token End Date:</strong> {vehicleInfo.taxTokenEndDate || "N/A"}</div>
                <div className="info-item">
                  <strong>Tax Token Image:</strong>
                  <div className="image-container">
                    {vehicleInfo.taxTokenUrl ? (
                      <div>
                        <a href={vehicleInfo.taxTokenUrl} target="_blank" rel="noopener noreferrer">
                          <img src={vehicleInfo.taxTokenUrl} alt="Tax Token" className="info-image" />
                        </a>
                        <div className="image-label">Tax Token</div>
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </div>
                </div>
                <div className="text-item"><strong>Insurance Start Date:</strong> {vehicleInfo.insuranceStartDate || "N/A"}</div>
                <div className="text-item"><strong>Insurance End Date:</strong> {vehicleInfo.insuranceEndDate || "N/A"}</div>
                <div className="info-item">
                  <strong>Insurance Image:</strong>
                  <div className="image-container">
                    {vehicleInfo.insurancePaperUrl ? (
                      <div>
                        <a href={vehicleInfo.insurancePaperUrl} target="_blank" rel="noopener noreferrer">
                          <img src={vehicleInfo.insurancePaperUrl} alt="Insurance Paper" className="info-image" />
                        </a>
                        <div className="image-label">Insurance</div>
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="info-item">Loading...</div>
            )}
          </div>

          <h2 className="section-title">Referral Information</h2>
{referralError ? (
  <div className="info-item">{referralError}</div>
) : referralInfo ? (
  <div className="referral-container">
    <div className="referral-section">
      <div className="referral-subtitle">You were referred by:</div>
      {referralInfo.refereeResults.length > 0 ? (
        <table className="referral-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>App Type</th>
            </tr>
          </thead>
          <tbody>
            {referralInfo.refereeResults.map((referee) => (
              <tr key={referee.id}>
                <td>{referee.referrerID || "N/A"}</td>
                <td>{referee.appType || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="info-item">No referee information available.</div>
      )}
    </div>
    <div className="referral-section">
      <div className="referral-subtitle">Users you referred:</div>
      {referralInfo.referrerResults.length > 0 ? (
        <table className="referral-table">
          <thead>
            <tr>
              <th>Serial No</th>
              <th>Referee ID</th>
              <th>Referred At</th>
              <th>First Ride</th>
              <th>First Ride At</th>
            </tr>
          </thead>
          <tbody>
            {referralInfo.referrerResults
              .slice()
              .reverse()
              .map((referrer, index, arr) => (
                <tr key={referrer.id}>
                  <td>{arr.length - index}</td>
                  <td>{referrer.refereeID || "N/A"}</td>
                  <td>{new Date(referrer.createdAt).toLocaleString() || "N/A"}</td>
                  <td>
                    {referrer.firstRide === 1 ? (
                      <svg fill="green" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg fill="red" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </td>
                  <td>{referrer.firstRideAt ? new Date(referrer.firstRideAt).toLocaleString() : "N/A"}</td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <div className="info-item">No referrer information available.</div>
      )}
    </div>
  </div>
) : (
  <div className="info-item">Loading...</div>
)}           

<h2 className="section-title">Chalok Status</h2>
<div className="info-grid">
  {chalokStatusError ? (
    <div className="info-item">{chalokStatusError}</div>
  ) : chalokStatus ? (
    <>
      <div className="text-item">
        <strong>Chalok Approved:</strong>
        {chalokStatus.approved === 1 ? (
          <svg fill="green" viewBox="0 0 20 20" style={{ width: "20px", height: "20px", verticalAlign: "middle", marginLeft: "8px" }}>
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <>
            <svg fill="red" viewBox="0 0 20 20" style={{ width: "20px", height: "20px", verticalAlign: "middle", marginLeft: "8px" }}>
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <button
             onClick={handleApproveChalok}
              style={{
                marginLeft: "10px",
                padding: "5px 10px",
                background: "#3b82f6",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Approve
            </button>
          </>
        )}
      </div>
      <div className="text-item">
        <strong>Chalok Blocked:</strong>
        {chalokStatus.blocked === 1 ? (
          <>
            <svg fill="red" viewBox="0 0 20 20" style={{ width: "20px", height: "20px", verticalAlign: "middle", marginLeft: "8px" }}>
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <button
//              onClick={handleUnblockChalok}
              style={{
                marginLeft: "10px",
                padding: "5px 10px",
                background: "#3b82f6",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Unblock
            </button>
          </>
        ) : (
          <>
            <svg fill="green" viewBox="0 0 20 20" style={{ width: "20px", height: "20px", verticalAlign: "middle", marginLeft: "8px" }}>
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <button
//              onClick={handleBlockChalok}
              style={{
                marginLeft: "10px",
                padding: "5px 10px",
                background: "#b91c1c",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Block
            </button>
          </>
        )}
      </div>
      <div className="text-item"><strong>Complained Against:</strong> {chalokStatus.complaintAgainst || "0"}</div>
      <div className="text-item"><strong>Issue Raised:</strong> {chalokStatus.issueRaised || "0"}</div>
      <div className="text-item"><strong>Total Ride Shared:</strong> {chalokStatus.rides || "0"}</div>
      <div className="text-item"><strong>Total Earned from Ride Share:</strong> {chalokStatus.totalEarned || "0"} BDT</div>
      <div className="text-item"><strong>Ride Share Rating:</strong> {chalokStatus.rating || "N/A"}</div>
      <div className="text-item"><strong>Total Rental Ride:</strong> {chalokStatus.rentalRides || "0"}</div>
      <div className="text-item"><strong>Total Earned from Rental Ride:</strong> {chalokStatus.totalRentalEarned || "0"} BDT</div>
      <div className="text-item"><strong>Rental Rating:</strong> {chalokStatus.rentalRating || "N/A"}</div>
    </>
  ) : (
    <div className="info-item">Loading...</div>
  )}
</div>

<h2 className="section-title">Jatri Status</h2>
<div className="info-grid">
  {jatriStatusError ? (
    <div className="info-item">{jatriStatusError}</div>
  ) : jatriStatus ? (
    <>
      <div className="text-item"><strong>Complained Against:</strong> {jatriStatus.complaintAgainst || "0"}</div>
      <div className="text-item"><strong>Issue Raised:</strong> {jatriStatus.issueRaised || "0"}</div>
      <div className="text-item"><strong>Total Ride Taken:</strong> {jatriStatus.rides || "0"}</div>
      <div className="text-item"><strong>Total Spent on Ride Share:</strong> {jatriStatus.totalSpent || "0"} BDT</div>
      <div className="text-item"><strong>Ride Share Rating:</strong> {jatriStatus.rating || "N/A"}</div>
      <div className="text-item"><strong>Total Rental Taken:</strong> {jatriStatus.rentalRides || "0"}</div>
      <div className="text-item"><strong>Total Spent on Rental:</strong> {jatriStatus.totalRentalSpent || "0"} BDT</div>
      <div className="text-item"><strong>Rental Rating:</strong> {jatriStatus.rentalRating || "N/A"}</div>
    </>
  ) : (
    <div className="info-item">Loading...</div>
  )}
</div>
          </div>
        </div>
      <FooterAdmin />
    </>
  );
};

export default UserDetails;