import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import HeaderAdmin from "../../components/headerAdmin.jsx";
import MobileNav from "../../components/mobilenav.jsx";
import FooterAdmin from "../../components/footerAdmin.jsx";
import "../userDetails.css";

const EditVehicleInfo = () => {
  const { userID } = useParams();
  const navigate = useNavigate();
  const [vehicleInfo, setVehicleInfo] = useState({
    vehicle: "",
    registration_number: "",
    model_name: "",
    engine_capacity: "",
    color: "",
    model_year: "",
    registration_date: "",
    tax_token_start_date: "",
    tax_token_end_date: "",
    insurance_start_date: "",
    insurance_end_date: "",
    fitness_start_date: "",
    fitness_end_date: "",
  });
  const [images, setImages] = useState({
    registrationFront: null,
    registrationBack: null,
    taxToken: null,
    insurancePaper: null,
    fitnessPaper: null,
  });
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [editField, setEditField] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Map upload types to API endpoints
  const uploadEndpoints = {
    registrationFront: "/api/upload/registrationFront",
    registrationBack: "/api/upload/registrationBack",
    taxToken: "/api/upload/taxToken",
    insurancePaper: "/api/upload/insurancePaper",
    fitnessPaper: "/api/upload/fitnessPaper",
  };

  useEffect(() => {
    let isMounted = true;
    const API_BASE_URL = "https://api.holoapp.tech:3000";

    const fetchVehicleTypes = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/vehicle-types`, {
          withCredentials: true,
        });
        if (isMounted) {
          setVehicleTypes(response.data.map((item) => item.type));
        }
      } catch (error) {
        console.error("Vehicle types error:", error.response?.status, error.response?.data);
        if (isMounted) {
          setError("Failed to fetch vehicle types.");
        }
      }
    };

    const fetchVehicleInfo = async () => {
      try {
        console.log("Fetching vehicle info for userID:", userID);
        const response = await axios.get(
          `${API_BASE_URL}/api/get-vehicle/${userID}`,
          { withCredentials: true }
        );
        console.log("Vehicle API response:", response.data);

        if (isMounted) {
          if (Array.isArray(response.data) && response.data.length > 0) {
            setVehicleInfo({
              vehicle: response.data[0].vehicle || "",
              registration_number: response.data[0].registration_number || "",
              model_name: response.data[0].model_name || "",
              engine_capacity: response.data[0].engine_capacity || "",
              color: response.data[0].color || "",
              model_year: response.data[0].model_year || "",
              registration_date: response.data[0].registration_date || "",
              tax_token_start_date: response.data[0].tax_token_start_date || "",
              tax_token_end_date: response.data[0].tax_token_end_date || "",
              insurance_start_date: response.data[0].insurance_start_date || "",
              insurance_end_date: response.data[0].insurance_end_date || "",
              fitness_start_date: response.data[0].fitness_start_date || "",
              fitness_end_date: response.data[0].fitness_end_date || "",
            });
            setImages({
              registrationFront: response.data[0].registrationFrontUrl || null,
              registrationBack: response.data[0].registrationBackUrl || null,
              taxToken: response.data[0].taxTokenUrl || null,
              insurancePaper: response.data[0].insurancePaperUrl || null,
              fitnessPaper: response.data[0].fitnessPaperUrl || null,
            });
          }
          setError("");
        }
      } catch (error) {
        console.error("Vehicle request error:", error.response?.status, error.response?.data);
        if (isMounted && error.response?.status === 403) {
          await handleTokenRefresh(fetchVehicleInfo);
        } else if (isMounted) {
          setError(`Failed to fetch vehicle information: ${error.response?.data?.error || error.message}`);
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
      fetchVehicleTypes();
      fetchVehicleInfo();
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
    // Date validations
    if (["tax_token_end_date", "insurance_end_date", "fitness_end_date"].includes(field)) {
      const today = new Date();
      const selected = new Date(tempValue);
      if (selected < today) {
        setError(`${field.replace(/_/g, " ")} cannot be in the past.`);
        return;
      }
    }

    // Numeric validations
    if (field === "engine_capacity") {
      const value = parseFloat(tempValue);
      if (isNaN(value) || value <= 0) {
        setError("Engine capacity must be a positive number.");
        return;
      }
    }

    if (field === "model_year") {
      const year = parseInt(tempValue, 10);
      const currentYear = new Date().getFullYear();
      if (isNaN(year) || year < 1920 || year > currentYear) {
        setError(`Model year must be between 1920 and ${currentYear}.`);
        return;
      }
    }

    // Mandatory fields
    if (
      !tempValue &&
      ![
        "insurance_start_date",
        "insurance_end_date",
        "fitness_start_date",
        "fitness_end_date",
      ].includes(field)
    ) {
      setError("Field cannot be empty.");
      return;
    }

    const updatedInfo = { ...vehicleInfo, [field]: tempValue };

    try {
      const response = await axios.post(
        "https://api.holoapp.tech:3000/api/edit-vehicle-info",
        { userID, ...updatedInfo },
        { withCredentials: true }
      );

      if (response.status === 201) {
        setVehicleInfo(updatedInfo);
        setSuccess(`${field.replace(/_/g, " ")} updated successfully!`);
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

    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!["jpg", "jpeg", "png"].includes(fileExtension)) {
      setError("Please upload a valid image file (.jpg, .jpeg, .png).");
      return;
    }

    const MAX_SIZE = 10 * 1024 * 1024; // 10MB in bytes

    // Validate file size
    if (file.size > MAX_SIZE) {
      setError(`File size exceeds 10MB. Please select a smaller file for ${type}.`);
      return;
    }    

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userName", userID);

    try {
      const endpoint = uploadEndpoints[type];
      console.log(`Uploading ${endpoint}...`);
      const response = await axios.post(
        `https://api.holoapp.tech:3000${endpoint}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
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
      <div className="user-details-container" style={{ maxWidth: "64rem", margin: "0 auto", padding: "1.5rem" }}>
        <h1 className="user-details-title" style={{ fontSize: "1.875rem", fontWeight: "bold", marginBottom: "1.5rem" }}>
          Edit Vehicle Information: {userID}
        </h1>
        <div className="profile-card" style={{ backgroundColor: "#fff", boxShadow: "0 4px 15px rgba(0,0,0,0.1)", borderRadius: "0.5rem", padding: "1.5rem" }}>
          {error && <div className="error" style={{ color: "#ef4444", marginBottom: "1rem" }}>{error}</div>}
          {success && <div style={{ color: "#22c55e", marginBottom: "1rem" }}>{success}</div>}
          <div className="info-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }}>
            {/* Vehicle Type */}
            <div className="info-item">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <p className="text-item" style={{ fontWeight: "bold" }}>
                  Vehicle Type: {vehicleInfo.vehicle || "Not provided"}
                </p>
                <button
                  onClick={() => startEdit("vehicle", vehicleInfo.vehicle)}
                  style={{ backgroundColor: "#3b82f6", color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "0.25rem", cursor: "pointer" }}
                >
                  Edit
                </button>
              </div>
              {editField === "vehicle" && (
                <div style={{ marginTop: "0.5rem" }}>
                  <select
                    value={tempValue}
                    onChange={handleInputChange}
                    style={{ width: "100%", padding: "0.5rem", border: "1px solid #d1d5db", borderRadius: "0.25rem" }}
                  >
                    <option value="">Select Vehicle Type</option>
                    {vehicleTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                    <button
                      onClick={() => saveEdit("vehicle")}
                      style={{ backgroundColor: "#22c55e", color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "0.25rem", cursor: "pointer" }}
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      style={{ backgroundColor: "#6b7280", color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "0.25rem", cursor: "pointer" }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
            {/* Registration Number */}
            <div className="info-item">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <p className="text-item" style={{ fontWeight: "bold" }}>
                  Registration Number: {vehicleInfo.registration_number || "Not provided"}
                </p>
                <button
                  onClick={() => startEdit("registration_number", vehicleInfo.registration_number)}
                  style={{ backgroundColor: "#3b82f6", color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "0.25rem", cursor: "pointer" }}
                >
                  Edit
                </button>
              </div>
              {editField === "registration_number" && (
                <div style={{ marginTop: "0.5rem" }}>
                  <input
                    type="text"
                    value={tempValue}
                    onChange={handleInputChange}
                    placeholder="Dhaka Metro-GA-xx-xxxx"
                    style={{ width: "100%", padding: "0.5rem", border: "1px solid #d1d5db", borderRadius: "0.25rem" }}
                  />
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                    <button
                      onClick={() => saveEdit("registration_number")}
                      style={{ backgroundColor: "#22c55e", color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "0.25rem", cursor: "pointer" }}
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      style={{ backgroundColor: "#6b7280", color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "0.25rem", cursor: "pointer" }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
            {/* Model Name */}
            <div className="info-item">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <p className="text-item" style={{ fontWeight: "bold" }}>
                  Model Name: {vehicleInfo.model_name || "Not provided"}
                </p>
                <button
                  onClick={() => startEdit("model_name", vehicleInfo.model_name)}
                  style={{ backgroundColor: "#3b82f6", color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "0.25rem", cursor: "pointer" }}
                >
                  Edit
                </button>
              </div>
              {editField === "model_name" && (
                <div style={{ marginTop: "0.5rem" }}>
                  <input
                    type="text"
                    value={tempValue}
                    onChange={handleInputChange}
                    placeholder="Yamaha R15"
                    style={{ width: "100%", padding: "0.5rem", border: "1px solid #d1d5db", borderRadius: "0.25rem" }}
                  />
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                    <button
                      onClick={() => saveEdit("model_name")}
                      style={{ backgroundColor: "#22c55e", color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "0.25rem", cursor: "pointer" }}
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      style={{ backgroundColor: "#6b7280", color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "0.25rem", cursor: "pointer" }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
            {/* Engine Capacity */}
            <div className="info-item">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <p className="text-item" style={{ fontWeight: "bold" }}>
                  Engine Capacity: {vehicleInfo.engine_capacity || "Not provided"} CC
                </p>
                <button
                  onClick={() => startEdit("engine_capacity", vehicleInfo.engine_capacity)}
                  style={{ backgroundColor: "#3b82f6", color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "0.25rem", cursor: "pointer" }}
                >
                  Edit
                </button>
              </div>
              {editField === "engine_capacity" && (
                <div style={{ marginTop: "0.5rem" }}>
                  <input
                    type="number"
                    value={tempValue}
                    onChange={handleInputChange}
                    placeholder="150"
                    style={{ width: "100%", padding: "0.5rem", border: "1px solid #d1d5db", borderRadius: "0.25rem" }}
                  />
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                    <button
                      onClick={() => saveEdit("engine_capacity")}
                      style={{ backgroundColor: "#22c55e", color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "0.25rem", cursor: "pointer" }}
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      style={{ backgroundColor: "#6b7280", color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "0.25rem", cursor: "pointer" }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
            {/* Color */}
            <div className="info-item">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <p className="text-item" style={{ fontWeight: "bold" }}>
                  Color: {vehicleInfo.color || "Not provided"}
                </p>
                <button
                  onClick={() => startEdit("color", vehicleInfo.color)}
                  style={{ backgroundColor: "#3b82f6", color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "0.25rem", cursor: "pointer" }}
                >
                  Edit
                </button>
              </div>
              {editField === "color" && (
                <div style={{ marginTop: "0.5rem" }}>
                  <input
                    type="text"
                    value={tempValue}
                    onChange={handleInputChange}
                    placeholder="Black"
                    style={{ width: "100%", padding: "0.5rem", border: "1px solid #d1d5db", borderRadius: "0.25rem" }}
                  />
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                    <button
                      onClick={() => saveEdit("color")}
                      style={{ backgroundColor: "#22c55e", color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "0.25rem", cursor: "pointer" }}
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      style={{ backgroundColor: "#6b7280", color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "0.25rem", cursor: "pointer" }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
            {/* Model Year */}
            <div className="info-item">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <p className="text-item" style={{ fontWeight: "bold" }}>
                  Model Year: {vehicleInfo.model_year || "Not provided"}
                </p>
                <button
                  onClick={() => startEdit("model_year", vehicleInfo.model_year)}
                  style={{ backgroundColor: "#3b82f6", color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "0.25rem", cursor: "pointer" }}
                >
                  Edit
                </button>
              </div>
              {editField === "model_year" && (
                <div style={{ marginTop: "0.5rem" }}>
                  <input
                    type="number"
                    value={tempValue}
                    onChange={handleInputChange}
                    placeholder="2016"
                    style={{ width: "100%", padding: "0.5rem", border: "1px solid #d1d5db", borderRadius: "0.25rem" }}
                  />
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                    <button
                      onClick={() => saveEdit("model_year")}
                      style={{ backgroundColor: "#22c55e", color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "0.25rem", cursor: "pointer" }}
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      style={{ backgroundColor: "#6b7280", color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "0.25rem", cursor: "pointer" }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
            {/* Registration Date */}
            <div className="info-item">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <p className="text-item" style={{ fontWeight: "bold" }}>
                  Registration Date: {vehicleInfo.registration_date || "Not provided"}
                </p>
                <button
                  onClick={() => startEdit("registration_date", vehicleInfo.registration_date)}
                  style={{ backgroundColor: "#3b82f6", color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "0.25rem", cursor: "pointer" }}
                >
                  Edit
                </button>
              </div>
              {editField === "registration_date" && (
                <div style={{ marginTop: "0.5rem" }}>
                  <input
                    type="date"
                    value={tempValue}
                    onChange={handleDateChange}
                    style={{ width: "100%", padding: "0.5rem", border: "1px solid #d1d5db", borderRadius: "0.25rem" }}
                  />
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                    <button
                      onClick={() => saveEdit("registration_date")}
                      style={{ backgroundColor: "#22c55e", color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "0.25rem", cursor: "pointer" }}
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      style={{ backgroundColor: "#6b7280", color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "0.25rem", cursor: "pointer" }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
            {/* Tax Token Start Date */}
            <div className="info-item">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <p className="text-item" style={{ fontWeight: "bold" }}>
                  Tax Token Start Date: {vehicleInfo.tax_token_start_date || "Not provided"}
                </p>
                <button
                  onClick={() => startEdit("tax_token_start_date", vehicleInfo.tax_token_start_date)}
                  style={{ backgroundColor: "#3b82f6", color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "0.25rem", cursor: "pointer" }}
                >
                  Edit
                </button>
              </div>
              {editField === "tax_token_start_date" && (
                <div style={{ marginTop: "0.5rem" }}>
                  <input
                    type="date"
                    value={tempValue}
                    onChange={handleDateChange}
                    style={{ width: "100%", padding: "0.5rem", border: "1px solid #d1d5db", borderRadius: "0.25rem" }}
                  />
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                    <button
                      onClick={() => saveEdit("tax_token_start_date")}
                      style={{ backgroundColor: "#22c55e", color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "0.25rem", cursor: "pointer" }}
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      style={{ backgroundColor: "#6b7280", color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "0.25rem", cursor: "pointer" }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
            {/* Tax Token End Date */}
            <div className="info-item">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <p className="text-item" style={{ fontWeight: "bold" }}>
                  Tax Token End Date: {vehicleInfo.tax_token_end_date || "Not provided"}
                </p>
                <button
                  onClick={() => startEdit("tax_token_end_date", vehicleInfo.tax_token_end_date)}
                  style={{ backgroundColor: "#3b82f6", color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "0.25rem", cursor: "pointer" }}
                >
                  Edit
                </button>
              </div>
              {editField === "tax_token_end_date" && (
                <div style={{ marginTop: "0.5rem" }}>
                  <input
                    type="date"
                    value={tempValue}
                    onChange={handleDateChange}
                    style={{ width: "100%", padding: "0.5rem", border: "1px solid #d1d5db", borderRadius: "0.25rem" }}
                  />
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                    <button
                      onClick={() => saveEdit("tax_token_end_date")}
                      style={{ backgroundColor: "#22c55e", color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "0.25rem", cursor: "pointer" }}
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      style={{ backgroundColor: "#6b7280", color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "0.25rem", cursor: "pointer" }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
            {/* Insurance Start Date */}
            <div className="info-item">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <p className="text-item" style={{ fontWeight: "bold" }}>
                  Insurance Start Date: {vehicleInfo.insurance_start_date || "Not provided"}
                </p>
                <button
                  onClick={() => startEdit("insurance_start_date", vehicleInfo.insurance_start_date)}
                  style={{ backgroundColor: "#3b82f6", color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "0.25rem", cursor: "pointer" }}
                >
                  Edit
                </button>
              </div>
              {editField === "insurance_start_date" && (
                <div style={{ marginTop: "0.5rem" }}>
                  <input
                    type="date"
                    value={tempValue}
                    onChange={handleDateChange}
                    style={{ width: "100%", padding: "0.5rem", border: "1px solid #d1d5db", borderRadius: "0.25rem" }}
                  />
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                    <button
                      onClick={() => saveEdit("insurance_start_date")}
                      style={{ backgroundColor: "#22c55e", color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "0.25rem", cursor: "pointer" }}
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      style={{ backgroundColor: "#6b7280", color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "0.25rem", cursor: "pointer" }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
            {/* Insurance End Date */}
            <div className="info-item">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <p className="text-item" style={{ fontWeight: "bold" }}>
                  Insurance End Date: {vehicleInfo.insurance_end_date || "Not provided"}
                </p>
                <button
                  onClick={() => startEdit("insurance_end_date", vehicleInfo.insurance_end_date)}
                  style={{ backgroundColor: "#3b82f6", color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "0.25rem", cursor: "pointer" }}
                >
                  Edit
                </button>
              </div>
              {editField === "insurance_end_date" && (
                <div style={{ marginTop: "0.5rem" }}>
                  <input
                    type="date"
                    value={tempValue}
                    onChange={handleDateChange}
                    style={{ width: "100%", padding: "0.5rem", border: "1px solid #d1d5db", borderRadius: "0.25rem" }}
                  />
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                    <button
                      onClick={() => saveEdit("insurance_end_date")}
                      style={{ backgroundColor: "#22c55e", color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "0.25rem", cursor: "pointer" }}
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      style={{ backgroundColor: "#6b7280", color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "0.25rem", cursor: "pointer" }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
            {/* Fitness Start Date */}
            <div className="info-item">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <p className="text-item" style={{ fontWeight: "bold" }}>
                  Fitness Start Date: {vehicleInfo.fitness_start_date || "Not provided"}
                </p>
                <button
                  onClick={() => startEdit("fitness_start_date", vehicleInfo.fitness_start_date)}
                  style={{ backgroundColor: "#3b82f6", color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "0.25rem", cursor: "pointer" }}
                >
                  Edit
                </button>
              </div>
              {editField === "fitness_start_date" && (
                <div style={{ marginTop: "0.5rem" }}>
                  <input
                    type="date"
                    value={tempValue}
                    onChange={handleDateChange}
                    style={{ width: "100%", padding: "0.5rem", border: "1px solid #d1d5db", borderRadius: "0.25rem" }}
                  />
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                    <button
                      onClick={() => saveEdit("fitness_start_date")}
                      style={{ backgroundColor: "#22c55e", color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "0.25rem", cursor: "pointer" }}
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      style={{ backgroundColor: "#6b7280", color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "0.25rem", cursor: "pointer" }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
            {/* Fitness End Date */}
            <div className="info-item">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <p className="text-item" style={{ fontWeight: "bold" }}>
                  Fitness End Date: {vehicleInfo.fitness_end_date || "Not provided"}
                </p>
                <button
                  onClick={() => startEdit("fitness_end_date", vehicleInfo.fitness_end_date)}
                  style={{ backgroundColor: "#3b82f6", color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "0.25rem", cursor: "pointer" }}
                >
                  Edit
                </button>
              </div>
              {editField === "fitness_end_date" && (
                <div style={{ marginTop: "0.5rem" }}>
                  <input
                    type="date"
                    value={tempValue}
                    onChange={handleDateChange}
                    style={{ width: "100%", padding: "0.5rem", border: "1px solid #d1d5db", borderRadius: "0.25rem" }}
                  />
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                    <button
                      onClick={() => saveEdit("fitness_end_date")}
                      style={{ backgroundColor: "#22c55e", color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "0.25rem", cursor: "pointer" }}
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      style={{ backgroundColor: "#6b7280", color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "0.25rem", cursor: "pointer" }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
            {/* Image Uploads */}
            {["registrationFront", "registrationBack", "taxToken", "insurancePaper", "fitnessPaper"].map((type) => (
              <div key={type} className="info-item">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <p className="text-item" style={{ fontWeight: "bold" }}>
                    {type === "registrationFront" && "Registration Front"}
                    {type === "registrationBack" && "Registration Back"}
                    {type === "taxToken" && "Tax Token"}
                    {type === "insurancePaper" && "Insurance Paper"}
                    {type === "fitnessPaper" && "Fitness Paper"}: {images[type] ? "Uploaded" : "Not provided"}
                  </p>
                  <label style={{ backgroundColor: "#3b82f6", color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "0.25rem", cursor: "pointer" }}>
                    Upload
                    <input
                      type="file"
                      accept="image/jpeg,image/png"
                      onChange={(e) => handleImageUpload(e, type)}
                      style={{ display: "none" }}
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
            ))}
          </div>
        </div>
      </div>
      <FooterAdmin />
    </>
  );
};

export default EditVehicleInfo;
