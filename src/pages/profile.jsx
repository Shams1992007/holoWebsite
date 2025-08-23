import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderWhite from "../components/headerwhite";
import MobileNav from "../components/mobilenav";
import FooterWhite from "../components/footerwhite";
import styles from "./Profile.module.css";

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [password, setPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isBangla, setIsBangla] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const navigate = useNavigate();

  const translations = {
    en: {
      title: "Welcome",
      name: "Name",
      email: "Email",
      phoneNumber: "Phone Number",
      password: "Password",
      noPassword: "No password (user signed up with Google)",
      showPassword: "Show Password",
      hidePassword: "Hide Password",
      proceed: "Proceed",
      loading: "Processing. Please wait. Do not close the app until the process is finished.",
      confirm: "Confirm",
      confirmMessage: "Do you want to save the data and proceed?",
      error: "Error",
      errorMessage: "Failed to save user data. Please try again.",
      success: "You are successfully registered",
      chooseAction: "Choose Action",
      chooseActionMessage: "Would you like to change your mobile number or email?",
      changeMobile: "Change Mobile Number",
      changeEmail: "Change Email",
      cancel: "Cancel",
    },
    bn: {
      title: "স্বাগতম",
      name: "নাম",
      email: "ইমেইল",
      phoneNumber: "মোবাইল নম্বর",
      password: "পাসওয়ার্ড",
      noPassword: "পাসওয়ার্ড নেই (গুগলে সাইন আপ করেছেন)",
      showPassword: "পাসওয়ার্ড দেখান",
      hidePassword: "পাসওয়ার্ড লুকান",
      proceed: "অগ্রসর হোন",
      loading: "প্রসেসিং... দয়া করে অপেক্ষা করুন। প্রক্রিয়া শেষ না হওয়া পর্যন্ত অ্যাপটি বন্ধ করবেন না।",
      confirm: "নিশ্চিত করুন",
      confirmMessage: "আপনি কি ডেটা সংরক্ষণ করতে চান এবং পরবর্তী পদক্ষেপে যেতে চান?",
      error: "ত্রুটি",
      errorMessage: "ব্যবহারকারীর ডেটা সংরক্ষণে ব্যর্থ। আবার চেষ্টা করুন।",
      success: "আপনি সফলভাবে নিবন্ধিত হয়েছেন",
      chooseAction: "অ্যাকশন বেছে নিন",
      chooseActionMessage: "আপনি কি আপনার মোবাইল নম্বর বা ইমেইল পরিবর্তন করতে চান?",
      changeMobile: "মোবাইল নম্বর পরিবর্তন করুন",
      changeEmail: "ইমেইল পরিবর্তন করুন",
      cancel: "বাতিল করুন",
    },
  };

  const lang = isBangla ? translations.bn : translations.en;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userJsonValue = localStorage.getItem("user");
        const userData = userJsonValue ? JSON.parse(userJsonValue) : null;
        setUserInfo(userData);

        const storedPhoneNumber = localStorage.getItem("phone_number");
        setPhoneNumber(storedPhoneNumber);

        const storedPassword = localStorage.getItem("password");
        setPassword(storedPassword);
      } catch (e) {
        console.error("Failed to load data:", e);
      }
    };

    getUserData();
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const uploadPhoto = async (photoData, userName) => {
    try {
      const response = await fetch(photoData.data);
      const blob = await response.blob();

      const formData = new FormData();
      formData.append("file", {
        uri: photoData.data,
        name: `profile_photo.${photoData.extension}`,
        type: photoData.contentType,
      });
      formData.append("userName", userName);

      const uploadResponse = await axios.post(
        "https://api.holoapp.tech:3000/api/upload/photo",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Photo upload response:", uploadResponse.data);
    } catch (error) {
      console.error(
        "Error uploading photo:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const updatePhotoURL = async (photoUrl, userName) => {
    try {
      const data = {
        userID: userName,
        photoUrl: photoUrl,
      };

      const response = await axios.post(
        "https://api.holoapp.tech:3000/api/update-photo-url",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Photo URL update response:", response.data);
    } catch (error) {
      console.error(
        "Error updating photo URL:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const saveUserData = async () => {
    setLoading(true);
    try {
      const authType = password ? "phone" : "google";
      const appType = "chalok";

      const userData = {
        name: userInfo.name,
        email: userInfo.email,
        phone: phoneNumber,
        password: password || "",
        auth: authType,
        app: appType,
        photo: {
          data: userInfo.photo,
          extension: userInfo.photoExtension || "jpg",
          contentType: userInfo.photoContentType || "image/jpeg",
        },
      };

      const response = await axios.post(
        "https://api.holoapp.tech:3000/api/users",
        userData
      );

      if (response.status === 201) {
        localStorage.setItem("user_info", JSON.stringify(userInfo));
        alert(lang.success);
        const userID = response.data.userId;

        if (authType === "phone") {
          await uploadPhoto(userData.photo, userID);
        } else if (authType === "google") {
          const photoUrl = userData.photo.data;
          await updatePhotoURL(photoUrl, userID);
        }

        navigate("/SignIn");
      } else {
        setLoading(false);
        alert(lang.error, lang.errorMessage);
      }
    } catch (error) {
      console.error("Error saving user data:", error);
      setLoading(false);
      alert(lang.error, lang.errorMessage);
    }
  };

  const handleProceed = () => {
    setShowConfirmModal(true);
  };

  const handleNoProceed = () => {
    setShowConfirmModal(false);
    setShowActionModal(true);
  };

  const handleLanguageToggle = () => {
    setIsBangla(!isBangla);
  };

  const Modal = ({ isOpen, onClose, title, message, buttons }) => {
    if (!isOpen) return null;
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalCard}>
          <h2 className={styles.modalTitle}>{title}</h2>
          <p className={styles.modalMessage}>{message}</p>
          <div className={styles.modalButtons}>
            {buttons.map((button, index) => (
              <button
                key={index}
                onClick={() => {
                  button.onPress();
                  onClose();
                }}
                className={styles.modalButton}
              >
                {button.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <HeaderWhite />
      <MobileNav />
      <div className={styles.container}>
        {loading ? (
          <div className={styles.loadingOverlay}>
            <div className={styles.loadingCard}>
              <svg
                className={styles.spinner}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className={styles.spinnerCircle}
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className={styles.spinnerPath}
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <p className={styles.loadingText}>{lang.loading}</p>
            </div>
          </div>
        ) : (
          <div className={styles.card}>
            {userInfo ? (
              <>
                <div className={styles.languageSwitch}>
                  <button
                    onClick={handleLanguageToggle}
                    className={`${styles.languageButton} ${!isBangla ? styles.active : ""}`}
                  >
                    English
                  </button>
                  <button
                    onClick={handleLanguageToggle}
                    className={`${styles.languageButton} ${isBangla ? styles.active : ""}`}
                  >
                    বাংলা
                  </button>
                </div>

                <h1 className={styles.title}>{`${lang.title}, ${userInfo.name}!`}</h1>

                <div className={styles.profileImageContainer}>
                  <img
                    src={userInfo.photo}
                    alt="Profile"
                    className={styles.profileImage}
                  />
                </div>

                <div className={styles.infoContainer}>
                  <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>{lang.name}</span>
                    <span className={styles.infoColon}>:</span>
                    <span className={styles.infoValue}>{userInfo.name}</span>
                  </div>
                  <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>{lang.email}</span>
                    <span className={styles.infoColon}>:</span>
                    <span className={styles.infoValue}>{userInfo.email}</span>
                  </div>
                  <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>{lang.phoneNumber}</span>
                    <span className={styles.infoColon}>:</span>
                    <span className={styles.infoValue}>{phoneNumber || "N/A"}</span>
                  </div>
                  <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>{lang.password}</span>
                    <span className={styles.infoColon}>:</span>
                    <span className={styles.infoValue}>
                      {password
                        ? showPassword
                          ? password
                          : "••••••••"
                        : lang.noPassword}
                    </span>
                  </div>
                  {password && (
                    <button
                      onClick={togglePasswordVisibility}
                      className={styles.toggleButton}
                    >
                      {showPassword ? lang.hidePassword : lang.showPassword}
                    </button>
                  )}
                </div>

                <div className={styles.buttonContainer}>
                  <button
                    onClick={handleProceed}
                    className={styles.proceedButton}
                  >
                    <svg
                      className={styles.buttonIcon}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                    {lang.proceed}
                  </button>
                </div>
              </>
            ) : (
              <p className={styles.loadingMessage}>{lang.loading}</p>
            )}
          </div>
        )}
        <Modal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          title={lang.confirm}
          message={lang.confirmMessage}
          buttons={[
            { text: lang.cancel, onPress: handleNoProceed },
            { text: lang.proceed, onPress: saveUserData },
          ]}
        />
        <Modal
          isOpen={showActionModal}
          onClose={() => setShowActionModal(false)}
          title={lang.chooseAction}
          message={lang.chooseActionMessage}
          buttons={[
            { text: lang.changeMobile, onPress: () => navigate("/PhoneVerification") },
            { text: lang.changeEmail, onPress: () => navigate("/GoogleVerification") },
            { text: lang.cancel, onPress: () => {} },
          ]}
        />
      </div>
      <FooterWhite />
    </>
  );
};

export default Profile;
