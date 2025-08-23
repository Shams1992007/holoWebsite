import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import HeaderWhite from "../components/headerwhite";
import MobileNav from "../components/mobilenav";
import FooterWhite from "../components/footerwhite";
import styles from "./PhoneVerification.module.css";

const GoogleVerification = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isBangla, setIsBangla] = useState(false);
  const navigate = useNavigate();

  // Language translations
  const translations = {
    en: {
      title: "Sign Up",
      googleSignUp: "Sign Up with Google",
      phoneSignUp: "Sign Up with Phone",
      alreadyAccount: "Already have an account? Log in",
      signInCancelled: "Sign-in was cancelled",
      signInInProgress: "Sign-in is in progress",
      error: "Some error occurred",
      emailExists: "This email is already registered. Please log in instead.",
    },
    bn: {
      title: "সাইন আপ",
      googleSignUp: "গুগলের মাধ্যমে সাইন আপ করুন",
      phoneSignUp: "ফোনের মাধ্যমে সাইন আপ করুন",
      alreadyAccount: "অ্যাকাউন্ট রয়েছে? সাইন ইন করুন",
      signInCancelled: "সাইন-ইন বাতিল করা হয়েছে",
      signInInProgress: "সাইন-ইন প্রক্রিয়াধীন",
      error: "কিছু ত্রুটি ঘটেছে",
      emailExists: "এই ইমেইল ইতিমধ্যে নিবন্ধিত। অনুগ্রহ করে লগইন করুন।",
    },
  };

  const lang = isBangla ? translations.bn : translations.en;

  useEffect(() => {
    // Retrieve phone number from localStorage
    const storedPhoneNumber = localStorage.getItem("phone_number");
    if (storedPhoneNumber) {
      setPhoneNumber(storedPhoneNumber);
    }

    // Configure Google Sign-In
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    window.onGoogleLibraryLoad = () => {
      window.google.accounts.id.initialize({
        client_id: "822622481795-5quec0favqvomfhh0mlafb1oqmtmj1a2.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const mimeToExtension = (mimeType) => {
    const mimeMap = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/gif": "gif",
      "image/webp": "webp",
      "image/svg+xml": "svg",
      "image/bmp": "bmp",
    };
    return mimeMap[mimeType] || null;
  };

  const getImageContentType = async (imageUrl) => {
    try {
      const response = await axios.head(imageUrl, {
        timeout: 5000, // Prevent hanging on slow responses
      });      
      const contentType = response.headers["content-type"];
      const fileExtension = mimeToExtension(contentType);
      return { contentType, fileExtension };
    } catch (error) {
      console.log("Error fetching content-type:", error);
      return null;
    }
  };

  const handleCredentialResponse = async (response) => {
    try {
      const userInfo = JSON.parse(atob(response.credential.split(".")[1]));
      const mail = userInfo.email;

      console.log("Name:", userInfo.name);
    console.log("Email:", mail);
    console.log("Profile Image:", userInfo.picture);

      const emailCheckResponse = await axios.post(
        "https://api.holoapp.tech:3000/api/check-email",
        { email: mail }
      );

      if (emailCheckResponse.data.exists) {
        alert(lang.emailExists);
        setTimeout(() => navigate("/SignIn"), 3000);
      } else {
        const imageUrl = userInfo.picture;
        const { contentType, fileExtension } = await getImageContentType(imageUrl);

        localStorage.setItem(
          "user",
          JSON.stringify({
            name: userInfo.name,
            email: userInfo.email,
            phone_number: phoneNumber,
            photo: imageUrl,
            photoExtension: fileExtension,
            photoContentType: contentType,
          })
        );
        localStorage.setItem("password", "");
        navigate("/user-Profile");
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      alert(lang.error);
    }
  };

  const signUpWithGoogle = () => {
    try {
      window.google.accounts.id.prompt();
    } catch (error) {
      console.error("Google sign-in error:", error);
      alert(lang.error);
    }
  };

  const signUpWithPhone = () => {
    navigate("/SignUp");
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

        <h1 className={styles.title}>{lang.title}</h1>

        <div className={styles.verificationCard}>
          <button
            onClick={signUpWithGoogle}
            className={styles.submitButton}
          >
            {lang.googleSignUp}
          </button>
          <button
            onClick={signUpWithPhone}
            className={styles.submitButton}
          >
            {lang.phoneSignUp}
          </button>
          <p className={styles.signInLink}>
            {lang.alreadyAccount} <Link to="/signin">Log in</Link>
          </p>
        </div>
      </div>
      <FooterWhite />
    </>
  );
};

export default GoogleVerification;