import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import HeaderAdmin from "../../components/headerAdmin.jsx";
import MobileNav from "../../components/mobilenav.jsx";
import FooterAdmin from "../../components/footerAdmin.jsx";
import "../userDetails.css"; // Reuse the same CSS for consistent styling

const EditPersonalInfo = () => {
  const { userID } = useParams();
  const navigate = useNavigate();
  const [personalInfo, setPersonalInfo] = useState({
    address: "",
    gender: "",
    dateOfBirth: "",
    bloodGroup: "",
    emergencyContact: "",
    relationship: "",
  });
  const [editField, setEditField] = useState(null); // Tracks which field is being edited
  const [tempValue, setTempValue] = useState(""); // Temporary value during edit
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let isMounted = true;
    const API_BASE_URL = "https://api.holoapp.tech:3000";

    const fetchPersonalInfo = async () => {
      try {
        console.log("Fetching personal info for userID:", userID);
        const response = await axios.get(
          `${API_BASE_URL}/api/get-personal/${userID}`,
          { withCredentials: true }
        );
        console.log("Personal API response:", response.data);

        if (isMounted) {
          if (Array.isArray(response.data) && response.data.length > 0) {
            setPersonalInfo({
              address: response.data[0].address || "",
              bloodGroup: response.data[0].blood_group || "",
              dateOfBirth: response.data[0].date_of_birth || "",
              gender: response.data[0].gender || "",
              emergencyContact: response.data[0].emergency_contact || "",
              relationship: response.data[0].relationship || "",
            });
          }
          setError("");
        }
      } catch (error) {
        console.error("Personal request error:", error.response?.status, error.response?.data);
        if (isMounted && error.response?.status === 403) {
          await handleTokenRefresh(fetchPersonalInfo);
        } else if (isMounted) {
          setError(`Failed to fetch personal information: ${error.response?.data?.error || error.message}`);
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
      fetchPersonalInfo();
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
    // Validate specific field
    if (field === "dateOfBirth") {
      const today = new Date();
      const selected = new Date(tempValue);
      const age = today.getFullYear() - selected.getFullYear();
      const monthDiff = today.getMonth() - selected.getMonth();
      const dayDiff = today.getDate() - selected.getDate();
      const isValidAge =
        age > 12 ||
        (age === 12 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)));

      if (!isValidAge) {
        setError("You must be at least 12 years old.");
        return;
      }
    }

    if (field === "emergencyContact" && tempValue.length < 11) {
      setError("Emergency contact number must be at least 11 characters long.");
      return;
    }

    if (!tempValue && field !== "dateOfBirth") {
      setError("Field cannot be empty.");
      return;
    }

    const updatedInfo = { ...personalInfo, [field]: tempValue };

    try {
      const response = await axios.post(
        "https://api.holoapp.tech:3000/api/edit-personal-info",
        { userID, ...updatedInfo },
        { withCredentials: true }
      );

      if (response.status === 201) {
        setPersonalInfo(updatedInfo);
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

  if (!userID) {
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
        <h1 className="user-details-title">Edit Personal Information: {userID}</h1>
        <div className="profile-card">
          {error && <div className="error">{error}</div>}
          {success && <div className="text-green-500 mb-4">{success}</div>}
          <div className="info-grid">
            <div className="info-item">
              <div className="flex items-center justify-between">
                <p className="text-item font-bold">
                  Address: {personalInfo.address || "Not provided"}
                </p>
                <button
                  onClick={() => startEdit("address", personalInfo.address)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
              </div>
              {editField === "address" && (
                <div className="mt-2">
                  <input
                    type="text"
                    value={tempValue}
                    onChange={handleInputChange}
                    placeholder="52/1, Road - 3A, Dhanmondi, Dhaka, 1206"
                    className="w-full p-2 border rounded"
                  />
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => saveEdit("address")}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="info-item">
              <div className="flex items-center justify-between">
                <p className="text-item font-bold">
                  Gender: {personalInfo.gender || "Not provided"}
                </p>
                <button
                  onClick={() => startEdit("gender", personalInfo.gender)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
              </div>
              {editField === "gender" && (
                <div className="mt-2">
                  <div className="flex space-x-4">
                    {["Male", "Female", "Others"].map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          value={option}
                          checked={tempValue === option}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => saveEdit("gender")}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="info-item">
              <div className="flex items-center justify-between">
                <p className="text-item font-bold">
                  Date of Birth: {personalInfo.dateOfBirth || "Not provided"}
                </p>
                <button
                  onClick={() => startEdit("dateOfBirth", personalInfo.dateOfBirth)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
              </div>
              {editField === "dateOfBirth" && (
                <div className="mt-2">
                  <input
                    type="date"
                    value={tempValue}
                    onChange={handleDateChange}
                    className="w-full p-2 border rounded"
                  />
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => saveEdit("dateOfBirth")}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="info-item">
              <div className="flex items-center justify-between">
                <p className="text-item font-bold">
                  Blood Group: {personalInfo.bloodGroup || "Not provided"}
                </p>
                <button
                  onClick={() => startEdit("bloodGroup", personalInfo.bloodGroup)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
              </div>
              {editField === "bloodGroup" && (
                <div className="mt-2">
                  <select
                    value={tempValue}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select Blood Group</option>
                    {["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"].map((group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    ))}
                  </select>
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => saveEdit("bloodGroup")}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="info-item">
              <div className="flex items-center justify-between">
                <p className="text-item font-bold">
                  Emergency Contact: {personalInfo.emergencyContact || "Not provided"}
                </p>
                <button
                  onClick={() => startEdit("emergencyContact", personalInfo.emergencyContact)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
              </div>
              {editField === "emergencyContact" && (
                <div className="mt-2">
                  <div className="flex items-center">
                    <span className="mr-2">+88</span>
                    <input
                      type="text"
                      value={tempValue}
                      onChange={handleInputChange}
                      placeholder="01xxxxxxxxx"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => saveEdit("emergencyContact")}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="info-item">
              <div className="flex items-center justify-between">
                <p className="text-item font-bold">
                  Relationship: {personalInfo.relationship || "Not provided"}
                </p>
                <button
                  onClick={() => startEdit("relationship", personalInfo.relationship)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
              </div>
              {editField === "relationship" && (
                <div className="mt-2">
                  <input
                    type="text"
                    value={tempValue}
                    onChange={handleInputChange}
                    placeholder="Father/Mother"
                    className="w-full p-2 border rounded"
                  />
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => saveEdit("relationship")}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <FooterAdmin />
    </>
  );
};

export default EditPersonalInfo;