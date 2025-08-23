import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import HeaderWhite from "../components/headerwhite";
import MobileNav from "../components/mobilenav";
import FooterWhite from "../components/footerwhite";
import styles from "./PhoneVerification.module.css";

const PhoneVerification = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cleanedPhoneNumber, setCleanedPhoneNumber] = useState("");
  const [otp, setOtp] = useState(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showSignInLink, setShowSignInLink] = useState(true);
  const [isBangla, setIsBangla] = useState(false);
  const navigate = useNavigate();

  // Language translations
  const translations = {
    en: {
      phoneVerification: "Phone Verification",
      enterPhone: "Phone number (e.g., 01xxxxxxxxx)",
      sendOTP: "Send OTP",
      enterOTP: "Enter OTP",
      verifyOTP: "Verify OTP",
      alreadyAccount: "Already have an account? Log in",
      loading: "Loading...",
      error: "Please enter a valid 11-digit phone number",
      success: "OTP sent successfully!",
      errorOTP: "Please enter a valid OTP",
      errorInvalidOTP: "Invalid OTP, please try again.",
      successVerify: "Phone number verified!",
    },
    bn: {
      phoneVerification: "ফোন নম্বর যাচাইকরণ",
      enterPhone: "ফোন নম্বর (যেমন, ০১xxxxxxxxx)",
      sendOTP: "ওটিপি পাঠান",
      enterOTP: "ওটিপি লিখুন",
      verifyOTP: "ওটিপি যাচাই করুন",
      alreadyAccount: "অ্যাকাউন্ট রয়েছে? সাইন ইন করুন",
      loading: "লোড হচ্ছে...",
      error: "অনুগ্রহ করে একটি বৈধ ১১-অঙ্কের ফোন নম্বর লিখুন",
      success: "ওটিপি সফলভাবে পাঠানো হয়েছে!",
      errorOTP: "দয়া করে একটি বৈধ ওটিপি লিখুন",
      errorInvalidOTP: "অবৈধ ওটিপি, অনুগ্রহ করে আবার চেষ্টা করুন।",
      successVerify: "ফোন নম্বর যাচাই সম্পন্ন হয়েছে!",
    },
  };

  const lang = isBangla ? translations.bn : translations.en;

  // Reset verification state on mount
  const resetVerification = () => {
    setPhoneNumber("");
    setCleanedPhoneNumber("");
    setVerificationCode("");
    setOtp(null);
    setOtpSent(false);
    setLoading(false);
    setError("");
    setSuccess("");
    setShowSignInLink(true);
  };

  useEffect(() => {
    resetVerification();
  }, []);

  // Save phone number to localStorage
  const savePhoneNumber = async (number) => {
    try {
      localStorage.setItem("phone_number", number);
    } catch (error) {
      console.error("Error saving phone number:", error);
    }
  };

  // Generate a 6-digit OTP
  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Send OTP
  const sendOTP = async () => {
    const cleanedNumber = phoneNumber.replace(/\s/g, "");

    if (cleanedNumber.length !== 11 || !/^\d{11}$/.test(cleanedNumber)) {
      setError(lang.error);
      return;
    }

    setCleanedPhoneNumber(cleanedNumber);
    setShowSignInLink(false);
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Check if phone exists
      const response = await axios.post(
        "https://api.holoapp.tech:3000/api/check-phone",
        { phone: cleanedNumber },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response.data);

      if (!response.data.exists) {
        // Generate OTP
        const generatedOtp = generateOTP();
        setOtp(generatedOtp);
        console.log("Generated OTP:", generatedOtp);

        // Send OTP via SMS API
        try {
          const smsResponse = await axios.post(
            "https://api.holoapp.tech:3000/api/sms-send",
            {
              phone: cleanedNumber,
              otp: generatedOtp
            },
            { headers: { "Content-Type": "application/json" } }
          );

          console.log("SMS response:", smsResponse.data);          

          if (smsResponse.data.success) {
            setSuccess(lang.success);
            setOtpSent(true);
          } else {
            setError("Failed to send SMS: " + (smsResponse.data.message || "Unknown error"));
          }
        } catch (smsError) {
          console.error("SMS error:", smsError);
          setError("Failed to send SMS. Please try again.");
        }
      } else {
        setError(
          isBangla
            ? "এই ফোন নম্বরটি ইতিমধ্যে নিবন্ধিত। অনুগ্রহ করে লগইন করুন।"
            : "This phone number is already registered. Please log in."
        );
        setShowSignInLink(true);
        setTimeout(() => navigate("/signin"), 3000);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to check phone number.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const verifyOTP = () => {
    if (!otp || verificationCode.length < 6) {
      setError(lang.errorOTP);
      return;
    }

    if (verificationCode === otp) {
      setSuccess(lang.successVerify);
      savePhoneNumber(cleanedPhoneNumber);
      navigate("/google-verification");
    } else {
      setError(lang.errorInvalidOTP);
    }
  };

  const handleLanguageToggle = () => {
    setIsBangla(!isBangla);
  };

  return (
    <>
      <HeaderWhite />
      <MobileNav />
      <div className={styles.verificationContainer}>
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

        <h1 className={styles.title}>{lang.phoneVerification}</h1>

        <div className={styles.verificationCard}>
          {!otpSent ? (
            <div className={styles.formGroup}>
              <label htmlFor="phone" className={styles.label}>
                {lang.enterPhone}
              </label>
              <div className={styles.phoneInputWrapper}>
                <span className={styles.prefix}>+88</span>
                <input
                  type="tel"
                  id="phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder={lang.enterPhone}
                  className={styles.input}
                  disabled={loading}
                  required
                />
              </div>
              <button
                onClick={sendOTP}
                className={styles.submitButton}
                disabled={loading}
              >
                {loading ? lang.loading : lang.sendOTP}
              </button>
            </div>
          ) : (
            <div className={styles.formGroup}>
              <label htmlFor="otp" className={styles.label}>
                {lang.enterOTP}
              </label>
              <input
                type="text"
                id="otp"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder={lang.enterOTP}
                className={styles.input}
                required
              />
              <button
                onClick={verifyOTP}
                className={styles.submitButton}
              >
                {lang.verifyOTP}
              </button>
            </div>
          )}

          {error && <div className={styles.error}>{error}</div>}
          {success && <div className={styles.success}>{success}</div>}

          {showSignInLink && (
            <p className={styles.signInLink}>
              {lang.alreadyAccount} <Link to="/SignInPage">Log in</Link>
            </p>
          )}
        </div>
      </div>
      <FooterWhite />
    </>
  );
};

export default PhoneVerification;