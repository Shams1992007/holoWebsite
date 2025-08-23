import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import HeaderAdmin from "../../components/headerAdmin.jsx";
import MobileNav from "../../components/mobilenav.jsx";
import FooterAdmin from "../../components/footerAdmin.jsx";
import "../userDetails.css";

const EditChalokInfo = () => {
  const { userID } = useParams();
  const navigate = useNavigate();
  const [chalokInfo, setChalokInfo] = useState({
    drivingLicenseNumber: "",
    drivingLicenseExpiryDate: "",
    nationalIDNumber: "",
    ownerChalokFlag: false,
    ownerPhoneNumber: "",
  });
  const [editField, setEditField] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [images, setImages] = useState({
    licenseFront: null,
    licenseBack: null,
    nidPhoto: null,
    utilityBillPhoto: null,
    ownerNidPhoto: null,
  });

  // Map upload types to API endpoints
  const uploadEndpoints = {
    licenseFront: "/api/upload/licenseFront",
    licenseBack: "/api/upload/licenseBack",
    nidPhoto: "/api/upload/nidPhoto",
    utilityBillPhoto: "/api/upload/utilityBill",
    ownerNidPhoto: "/api/upload/ownerNid",
  };

  useEffect(() => {
    let isMounted = true;
    const API_BASE_URL = "https://api.holoapp.tech:3000";

    const fetchChalokInfo = async () => {
      try {
        console.log("Fetching chalok info for userID:", userID);
        const response = await axios.get(
          `${API_BASE_URL}/api/get-chalok/${userID}`,
          { withCredentials: true }
        );
        console.log("Chalok API response:", response.data);

        if (isMounted) {
          if (Array.isArray(response.data) && response.data.length > 0) {
            setChalokInfo({
              drivingLicenseNumber: response.data[0].DLnumber || "",
              drivingLicenseExpiryDate: response.data[0].DLdate || "",
              nationalIDNumber: response.data[0].NIDnumber || "",
              ownerChalokFlag: response.data[0].ownerChalokFlag || false,
              ownerPhoneNumber: response.data[0].ownerContact || "",
            });
            setImages({
              licenseFront: response.data[0].DLFrontURL || null,
              licenseBack: response.data[0].DLBackURL || null,
              nidPhoto: response.data[0].nidURL || null,
              utilityBillPhoto: response.data[0].utilityURL || null,
              ownerNidPhoto: response.data[0].ownerNIDURL || null,
            });
          }
          setError("");
        }
      } catch (error) {
        console.error("Chalok request error:", error.response?.status, error.response?.data);
        if (isMounted && error.response?.status === 403) {
          await handleTokenRefresh(fetchChalokInfo);
        } else if (isMounted) {
          setError(`Failed to fetch chalok information: ${error.response?.data?.error || error.message}`);
        }
      }
    };

    const handleTokenRefresh = async (retryFunction) => {
      try {
        console.log("Attempting token refresh...");
        await axios.post(
          `${API_BASE_URL}/api/refresh-token`,
          {},
          { withCredentials: true }
        );
        console.log("Retrying request...");
        if (isMounted) {
          await retryFunction();
        }
      } catch (refreshError) {
        console.error("Refresh error:", refreshError.response?.status, refreshError.message);
        if (isMounted) {
          setError("Session expired. Please sign in again.");
          navigate("/signin");
        }
      }
    };

    if (userID) {
      fetchChalokInfo();
    }

    return () => {
      isMounted = false;
    };
  }, [userID, navigate]);

  const startEdit = (field, value) => {
    setEditField(field);
    setTempValue(value);
  };

  const cancelEdit = () => {
    setEditField(null);
    setTempValue("");
    setError("");
  };

  const saveEdit = async (field) => {
    if (field === "drivingLicenseExpiryDate") {
      const today = new Date();
      const selected = new Date(tempValue);
      if (selected < today) {
        setError("Driving license expiry date cannot be in the past.");
        return;
      }
    }

    if (field === "ownerPhoneNumber" && tempValue.length < 11) {
      setError("Owner phone number must be at least 11 characters long.");
      return;
    }

    if (!tempValue && field !== "drivingLicenseExpiryDate" && field !== "ownerChalokFlag") {
      setError("Field cannot be empty.");
      return;
    }

    const updatedInfo = { ...chalokInfo, [field]: tempValue };

    try {
      const response = await axios.post(
        "https://api.holoapp.tech:3000/api/edit-chalok-info",
        { userID, ...updatedInfo },
        { withCredentials: true }
      );

      if (response.status === 201) {
        setChalokInfo(updatedInfo);
        setSuccess(`${field} updated successfully!`);
        setError("");
        setEditField(null);
        setTempValue("");
      } else {
        setError("Failed to update information. Please try again.");
      }
    } catch (error) {
      console.error("Update error:", error.response?.status, error.response?.data);
      setError(`Failed to update ${field}: ${error.response?.data?.error || error.message}`);
    }
  };

  const handleInputChange = (e) => {
    setTempValue(e.target.value);
  };

  const handleDateChange = (e) => {
    setTempValue(e.target.value);
  };

  const handleImageUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (!['jpg', 'jpeg', 'png'].includes(fileExtension)) {
      setError("Please upload a valid image file (.jpg, .jpeg, .png).");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('userName', userID);

    try {
      const endpoint = uploadEndpoints[type];
      console.log(`Uploading ${endpoint}...`);
      const response = await axios.post(
        `https://api.holoapp.tech:3000${endpoint}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        setImages((prev) => ({
          ...prev,
          [type]: response.data.filePath,
        }));
        setSuccess(`Image ${type} uploaded successfully!`);
        setError("");
      }
    } catch (error) {
      console.error("Image upload error:", error.response?.data);
      setError(`Failed to upload ${type}: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleImageError = (type) => {
    setError(`Failed to load ${type} image. Please try uploading again.`);
    setImages((prev) => ({ ...prev, [type]: null }));
  };

  if (!userID) {
    return (
      <>
        <HeaderAdmin />
        <MobileNav />
        <div className="user-details-container">
          <div className="error">User data not found. Please select a valid user from the list.</div>
        </div>
        <FooterAdmin />
      </>
    );
  }

  return (
    <>
      <style>
        {`
          .image-container {
            width: 100%;
            margin-top: 8px;
          }
          .contained-image {
            max-width: 100%;
            max-height: 192px;
            object-fit: contain;
            border-radius: 4px;
            display: block;
          }
        `}
      </style>
      <HeaderAdmin />
      <MobileNav />
      <div className="user-details-container" style={{ maxWidth: '64rem', margin: '0 auto', padding: '1.5rem' }}>
        <h1 className="user-details-title" style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
          Edit Chalok Information: {userID}
        </h1>
        <div className="profile-card" style={{ backgroundColor: '#fff', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', borderRadius: '0.5rem', padding: '1.5rem' }}>
          {error && <div className="error" style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</div>}
          {success && <div style={{ color: '#22c55e', marginBottom: '1rem' }}>{success}</div>}
          <div className="info-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
            <div className="info-item">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <p className="text-item" style={{ fontWeight: 'bold' }}>
                  Driving License Number: {chalokInfo.drivingLicenseNumber || "Not provided"}
                </p>
                <button
                  onClick={() => startEdit("drivingLicenseNumber", chalokInfo.drivingLicenseNumber)}
                  style={{ backgroundColor: '#3b82f6', color: '#fff', padding: '0.25rem 0.75rem', borderRadius: '0.25rem', cursor: 'pointer' }}
                >
                  Edit
                </button>
              </div>
              {editField === "drivingLicenseNumber" && (
                <div style={{ marginTop: '0.5rem' }}>
                  <input
                    type="text"
                    value={tempValue}
                    onChange={handleInputChange}
                    placeholder="DK**************"
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }}
                  />
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <button
                      onClick={() => saveEdit("drivingLicenseNumber")}
                      style={{ backgroundColor: '#22c55e', color: '#fff', padding: '0.25rem 0.75rem', borderRadius: '0.25rem', cursor: 'pointer' }}
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      style={{ backgroundColor: '#6b7280', color: '#fff', padding: '0.25rem 0.75rem', borderRadius: '0.25rem', cursor: 'pointer' }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="info-item">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <p className="text-item" style={{ fontWeight: 'bold' }}>
                  Driving License Expiry: {chalokInfo.drivingLicenseExpiryDate || "Not provided"}
                </p>
                <button
                  onClick={() => startEdit("drivingLicenseExpiryDate", chalokInfo.drivingLicenseExpiryDate)}
                  style={{ backgroundColor: '#3b82f6', color: '#fff', padding: '0.25rem 0.75rem', borderRadius: '0.25rem', cursor: 'pointer' }}
                >
                  Edit
                </button>
              </div>
              {editField === "drivingLicenseExpiryDate" && (
                <div style={{ marginTop: '0.5rem' }}>
                  <input
                    type="date"
                    value={tempValue}
                    onChange={handleDateChange}
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }}
                  />
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <button
                      onClick={() => saveEdit("drivingLicenseExpiryDate")}
                      style={{ backgroundColor: '#22c55e', color: '#fff', padding: '0.25rem 0.75rem', borderRadius: '0.25rem', cursor: 'pointer' }}
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      style={{ backgroundColor: '#6b7280', color: '#fff', padding: '0.25rem 0.75rem', borderRadius: '0.25rem', cursor: 'pointer' }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="info-item">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <p className="text-item" style={{ fontWeight: 'bold' }}>
                  National ID Number: {chalokInfo.nationalIDNumber || "Not provided"}
                </p>
                <button
                  onClick={() => startEdit("nationalIDNumber", chalokInfo.nationalIDNumber)}
                  style={{ backgroundColor: '#3b82f6', color: '#fff', padding: '0.25rem 0.75rem', borderRadius: '0.25rem', cursor: 'pointer' }}
                >
                  Edit
                </button>
              </div>
              {editField === "nationalIDNumber" && (
                <div style={{ marginTop: '0.5rem' }}>
                  <input
                    type="text"
                    value={tempValue}
                    onChange={handleInputChange}
                    placeholder="**********"
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }}
                  />
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <button
                      onClick={() => saveEdit("nationalIDNumber")}
                      style={{ backgroundColor: '#22c55e', color: '#fff', padding: '0.25rem 0.75rem', borderRadius: '0.25rem', cursor: 'pointer' }}
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      style={{ backgroundColor: '#6b7280', color: '#fff', padding: '0.25rem 0.75rem', borderRadius: '0.25rem', cursor: 'pointer' }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="info-item">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <p className="text-item" style={{ fontWeight: 'bold' }}>
                  Ownership Status: {chalokInfo.ownerChalokFlag ? "Chalok Only" : "Owner & Chalok"}
                </p>
                <button
                  onClick={() => startEdit("ownerChalokFlag", chalokInfo.ownerChalokFlag)}
                  style={{ backgroundColor: '#3b82f6', color: '#fff', padding: '0.25rem 0.75rem', borderRadius: '0.25rem', cursor: 'pointer' }}
                >
                  Edit
                </button>
              </div>
              {editField === "ownerChalokFlag" && (
                <div style={{ marginTop: '0.5rem' }}>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center' }}>
                      <input
                        type="radio"
                        name="ownerChalokFlag"
                        value="true"
                        checked={tempValue === true || tempValue === "true"}
                        onChange={() => setTempValue(true)}
                        style={{ marginRight: '0.5rem' }}
                      />
                      Chalok Only
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center' }}>
                      <input
                        type="radio"
                        name="ownerChalokFlag"
                        value="false"
                        checked={tempValue === false || tempValue === "false"}
                        onChange={() => setTempValue(false)}
                        style={{ marginRight: '0.5rem' }}
                      />
                      Owner & Chalok
                    </label>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <button
                      onClick={() => saveEdit("ownerChalokFlag")}
                      style={{ backgroundColor: '#22c55e', color: '#fff', padding: '0.25rem 0.75rem', borderRadius: '0.25rem', cursor: 'pointer' }}
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      style={{ backgroundColor: '#6b7280', color: '#fff', padding: '0.25rem 0.75rem', borderRadius: '0.25rem', cursor: 'pointer' }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
            {chalokInfo.ownerChalokFlag && (
              <div className="info-item">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <p className="text-item" style={{ fontWeight: 'bold' }}>
                    Owner Phone Number: {chalokInfo.ownerPhoneNumber || "Not provided"}
                  </p>
                  <button
                    onClick={() => startEdit("ownerPhoneNumber", chalokInfo.ownerPhoneNumber)}
                    style={{ backgroundColor: '#3b82f6', color: '#fff', padding: '0.25rem 0.75rem', borderRadius: '0.25rem', cursor: 'pointer' }}
                  >
                    Edit
                  </button>
                </div>
                {editField === "ownerPhoneNumber" && (
                  <div style={{ marginTop: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ marginRight: '0.5rem' }}>+88</span>
                      <input
                        type="text"
                        value={tempValue}
                        onChange={handleInputChange}
                        placeholder="01xxxxxxxxx"
                        style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }}
                      />
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                      <button
                        onClick={() => saveEdit("ownerPhoneNumber")}
                        style={{ backgroundColor: '#22c55e', color: '#fff', padding: '0.25rem 0.75rem', borderRadius: '0.25rem', cursor: 'pointer' }}
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        style={{ backgroundColor: '#6b7280', color: '#fff', padding: '0.25rem 0.75rem', borderRadius: '0.25rem', cursor: 'pointer' }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            {["licenseFront", "licenseBack", "nidPhoto", "utilityBillPhoto", "ownerNidPhoto"].map(
              (type) => (
                <div key={type} className="info-item">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <p className="text-item" style={{ fontWeight: 'bold' }}>
                      {type === "licenseFront" && "Driving License Front"}
                      {type === "licenseBack" && "Driving License Back"}
                      {type === "nidPhoto" && "National ID"}
                      {type === "utilityBillPhoto" && "Utility Bill"}
                      {type === "ownerNidPhoto" && "Owner National ID"}: {images[type] ? "Uploaded" : "Not provided"}
                    </p>
                    <label style={{ backgroundColor: '#3b82f6', color: '#fff', padding: '0.25rem 0.75rem', borderRadius: '0.25rem', cursor: 'pointer' }}>
                      Upload
                      <input
                        type="file"
                        accept="image/jpeg,image/png"
                        onChange={(e) => handleImageUpload(e, type)}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                  {images[type] && (
                    <div className="image-container">
                      <img
                        src={images[type]}
                        alt={type}
                        className="contained-image"
                        onError={() => handleImageError(type)}
                      />
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <FooterAdmin />
    </>
  );
};

export default EditChalokInfo;
