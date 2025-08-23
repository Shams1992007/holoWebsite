import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderFleet from "../../components/headerFleet";
import MobileNav from "../../components/mobilenav";
import FooterAdmin from "../../components/footerAdmin";
import "../userDetails.css";

// Reusable component for status icons
const StatusIcon = ({ isActive, styles }) => (
  <svg fill={isActive ? "green" : "red"} viewBox="0 0 20 20" style={styles}>
    <path
      fillRule="evenodd"
      d={isActive
        ? "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        : "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"}
      clipRule="evenodd"
    />
  </svg>
);

const FleetUserDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userID = location.state?.userID || "";
  const fleetName = location.state?.fleetName || "";
  const API_BASE_URL = "https://api.holoapp.tech:3000";

  // Combine related states into a single object for better management
  const [state, setState] = useState({
    user: null,
    personalInfo: null,
    chalokInfo: null,
    vehicleInfo: null,
    referralInfo: null,
    chalokStatus: null,
    jatriStatus: null,
    errors: {
      personal: "",
      chalok: "",
      vehicle: "",
      referral: "",
      chalokStatus: "",
      jatriStatus: "",
    },
  });

  // Track mount status
  let isMounted = true;

  // Centralized error handler
  const handleApiError = useCallback((type, error, setError) => {
    console.error(`${type} request error:`, error.response?.status, error.response?.data);
    if (isMounted) {
      if (error.response?.status === 403) {
        handleTokenRefresh(type, () => fetchData(type), API_BASE_URL);
      } else if (error.response?.status === 401) {
        navigate("/fleet-signin");
      } else {
        setError(`Failed to fetch ${type} information: ${error.response?.data?.error || error.message}`);
      }
    }
  }, [navigate]);

  // Token refresh handler
  const handleTokenRefresh = useCallback(async (type, retryFunction, baseUrl) => {
    try {
      console.log("Attempting token refresh...");
      await axios.post(`${baseUrl}/api/refresh-token`, {}, { withCredentials: true });
      console.log("Retrying", type, "request...");
      if (isMounted) await retryFunction();
    } catch (refreshError) {
      console.error("Refresh error:", refreshError.response?.status, refreshError.message);
      if (isMounted) {
        setState(prev => ({
          ...prev,
          errors: { ...prev.errors, [type]: "Session expired. Please sign in again." },
        }));
        navigate("/fleet-signin");
      }
    }
  }, [navigate]);

  // Generic fetch function
  const fetchData = useCallback(async (type) => {
    const endpoints = {
      userStatus: `/api/get-user/${userID}`,
      personal: `/api/get-personal/${userID}`,
      chalok: `/api/get-chalok/${userID}`,
      vehicle: `/api/get-vehicle/${userID}`,
      referral: `/api/get-refer/${userID}`,
      chalokStatus: `/api/get-chalokStatus/${userID}`,
      jatriStatus: `/api/get-jatriStatus/${userID}`,
    };

    try {
      console.log(`Fetching ${type} for userID:`, userID);
      const response = await axios.get(`${API_BASE_URL}${endpoints[type]}`, { withCredentials: true });
      console.log(`${type} API response:`, response.data);

      if (!isMounted) return;

      switch (type) {
        case "userStatus":
          setState(prev => ({
            ...prev,
            user: { userID, ...response.data },
          }));
          break;
        case "personal":
          setState(prev => ({
            ...prev,
            personalInfo: Array.isArray(response.data) && response.data.length > 0
              ? {
                  address: response.data[0].address || null,
                  bloodGroup: response.data[0].blood_group || null,
                  dateOfBirth: response.data[0].date_of_birth || null,
                  gender: response.data[0].gender || null,
                  emergencyContact: response.data[0].emergency_contact || null,
                  relationship: response.data[0].relationship || null,
                }
              : null,
            errors: { ...prev.errors, personal: response.data.length ? "" : "No personal information available." },
          }));
          break;
        case "chalok":
          setState(prev => ({
            ...prev,
            chalokInfo: Array.isArray(response.data) && response.data.length > 0
              ? {
                  nidNumber: response.data[0].NIDnumber || null,
                  nidURL: response.data[0].nidURL || null,
                  dlNumber: response.data[0].DLnumber || null,
                  dlExpiryDate: response.data[0].DLdate || null,
                  dlFrontURL: response.data[0].DLFrontURL || null,
                  dlBackURL: response.data[0].DLBackURL || null,
                  utilityURL: response.data[0].utilityURL || null,
                  ownerContact: response.data[0].ownerContact || null,
                  ownerNIDURL: response.data[0].ownerNIDURL || null,
                }
              : null,
            errors: { ...prev.errors, chalok: response.data.length ? "" : "No chalok information available." },
          }));
          break;
        case "vehicle":
          setState(prev => ({
            ...prev,
            vehicleInfo: Array.isArray(response.data) && response.data.length > 0
              ? {
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
                }
              : null,
            errors: { ...prev.errors, vehicle: response.data.length ? "" : "No vehicle information available." },
          }));
          break;
        case "referral":
          setState(prev => ({
            ...prev,
            referralInfo: {
              referrerResults: response.data.referrerResults || [],
              refereeResults: response.data.refereeResults || [],
            },
            errors: { ...prev.errors, referral: "" },
          }));
          break;
        case "chalokStatus":
          setState(prev => ({
            ...prev,
            chalokStatus: Array.isArray(response.data.data) && response.data.data.length > 0
              ? response.data.data[0]
              : null,
            errors: { ...prev.errors, chalokStatus: response.data.data.length ? "" : "No chalok status available." },
          }));
          break;
        case "jatriStatus":
          setState(prev => ({
            ...prev,
            jatriStatus: Array.isArray(response.data.data) && response.data.data.length > 0
              ? response.data.data[0]
              : null,
            errors: { ...prev.errors, jatriStatus: response.data.data.length ? "" : "No jatri status available." },
          }));
          break;
        default:
          break;
      }
    } catch (error) {
      handleApiError(type, error, (msg) => setState(prev => ({
        ...prev,
        errors: { ...prev.errors, [type]: msg },
      })));
    }
  }, [userID, handleApiError]);

  // Approve chalok handler
  const handleApproveChalok = useCallback(async () => {
    try {
      console.log("Approving chalok for userID:", userID);
      await axios.post(
        `${API_BASE_URL}/api/approveChalok`,
        { userID },
        { withCredentials: true }
      );
      setState(prev => ({
        ...prev,
        chalokStatus: { ...prev.chalokStatus, approved: 1 },
      }));
      window.location.reload();
    } catch (error) {
      console.error("Approve chalok error:", error.response?.status, error.response?.data);
      setState(prev => ({
        ...prev,
        errors: { ...prev.errors, chalokStatus: `Failed to approve chalok: ${error.response?.data?.error || error.message}` },
      }));
    }
  }, [userID]);

  // Approve fleet join handler
  const handleApproveFleetJoin = useCallback(async () => {
    try {
      console.log("Approving fleet join for userID:", userID, "fleet:", fleetName);
      await axios.post(
        `${API_BASE_URL}/api/acceptFleetJoinRequest`,
        { fleetName, memberID: userID },
        { withCredentials: true }
      );
      setState(prev => ({
        ...prev,
        chalokStatus: { ...prev.chalokStatus, rentalPaymentStatus: fleetName },
      }));
      window.location.reload();
    } catch (error) {
      handleApiError("fleetJoin", error, (msg) => setState(prev => ({
        ...prev,
        errors: { ...prev.errors, chalokStatus: msg },
      })));
    }
  }, [userID, fleetName, handleApiError]);

  // Fetch data on mount and when userID changes
  useEffect(() => {
    fetchData("userStatus");

    if (state.user?.userID) {
      if (state.user.completeUser === 1) fetchData("personal");
      else setState(prev => ({ ...prev, errors: { ...prev.errors, personal: "No personal information available." } }));

      if (state.user.completeDriver === 1) fetchData("chalok");
      else setState(prev => ({ ...prev, errors: { ...prev.errors, chalok: "No chalok information available." } }));

      if (state.user.completeVehicle === 1) fetchData("vehicle");
      else setState(prev => ({ ...prev, errors: { ...prev.errors, vehicle: "No vehicle information available." } }));

      fetchData("referral");
      fetchData("chalokStatus");
      fetchData("jatriStatus");
    }

    return () => {
      isMounted = false;
    };
  }, [state.user?.userID, fetchData]);

  if (!state.user) {
    return (
      <>
        <HeaderFleet />
        <MobileNav />
        <div className="user-details-container">
          <div className="error">User data not found. Please select a user from the list.</div>
        </div>
        <FooterAdmin />
      </>
    );
  }

  const { user, personalInfo, chalokInfo, vehicleInfo, referralInfo, chalokStatus, jatriStatus, errors } = state;

  return (
    <>
      <HeaderFleet />
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
            {errors.personal || !personalInfo ? (
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
            ) : null}
            {errors.personal ? (
              <div className="info-item">{errors.personal}</div>
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
            {errors.chalok || !chalokInfo ? (
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
            ) : null}
            {errors.chalok ? (
              <div className="info-item">{errors.chalok}</div>
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
            {errors.vehicle || !vehicleInfo ? (
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
            ) : null}
            {errors.vehicle ? (
              <div className="info-item">{errors.vehicle}</div>
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
          {errors.referral ? (
            <div className="info-item">{errors.referral}</div>
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
                              <StatusIcon isActive={referrer.firstRide === 1} />
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
            {errors.chalokStatus ? (
              <div className="info-item">{errors.chalokStatus}</div>
            ) : chalokStatus ? (
              <>
                <div className="text-item">
                  <strong>Chalok Approved:</strong>
                  <StatusIcon isActive={chalokStatus.approved === 1} styles={{ width: "20px", height: "20px", verticalAlign: "middle", marginLeft: "8px" }} />
                  {chalokStatus.approved !== 1 && (
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
                  )}
                </div>
                <div className="text-item">
                  <strong>Chalok Blocked:</strong>
                  <StatusIcon isActive={chalokStatus.blocked !== 1} styles={{ width: "20px", height: "20px", verticalAlign: "middle", marginLeft: "8px" }} />
                </div>
                <div className="text-item"><strong>Complained Against:</strong> {chalokStatus.complaintAgainst || "0"}</div>
                <div className="text-item"><strong>Issue Raised:</strong> {chalokStatus.issueRaised || "0"}</div>
                <div className="text-item"><strong>Total Ride Shared:</strong> {chalokStatus.rides || "0"}</div>
                <div className="text-item"><strong>Total Earned from Ride Share:</strong> {chalokStatus.totalEarned || "0"} BDT</div>
                <div className="text-item"><strong>Ride Share Rating:</strong> {chalokStatus.rating || "N/A"}</div>
                <div className="text-item"><strong>Total Rental Ride:</strong> {chalokStatus.rentalRides || "0"}</div>
                <div className="text-item"><strong>Total Earned from Rental Ride:</strong> {chalokStatus.totalRentalEarned || "0"} BDT</div>
                <div className="text-item"><strong>Rental Rating:</strong> {chalokStatus.rentalRating || "N/A"}</div>
                <div className="text-item">
                  <strong>Fleet Membership Status:</strong>
                  {chalokStatus.rentalPaymentStatus === fleetName ? (
                    <StatusIcon isActive={true} styles={{ width: "20px", height: "20px", verticalAlign: "middle", marginLeft: "8px" }} />
                  ) : chalokStatus.rentalPaymentStatus === "requested" ? (
                    <>
                      <span style={{ marginLeft: "8px" }}>Requested</span>
                      <button
                        onClick={handleApproveFleetJoin}
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
                        Approve in Fleet
                      </button>
                    </>
                  ) : (
                    <span style={{ marginLeft: "8px" }}>N/A</span>
                  )}
                </div>
              </>
            ) : (
              <div className="info-item">Loading...</div>
            )}
          </div>

          <h2 className="section-title">Jatri Status</h2>
          <div className="info-grid">
            {errors.jatriStatus ? (
              <div className="info-item">{errors.jatriStatus}</div>
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

export default FleetUserDetails;
