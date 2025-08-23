import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderWhite from "../../components/headerwhite";
import MobileNav from "../../components/mobilenav";
import FooterWhite from "../../components/footerwhite";
import styles from "../SignIn.module.css";

const FleetWelcome = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isBangla, setIsBangla] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Language translations
  const translations = {
    en: {
      loading: "Loading...",
      signIn: "Login",
      phoneNumberPlaceholder: "Phone Number",
      passwordPlaceholder: "Password",
      errorEmpty: "Phone number and password cannot be empty!",
      errorPhoneNotFound: "Phone number does not exist.",
      errorPasswordIncorrect: "Password is incorrect.",
      errorDatabase: "A database error occurred. Please try again later.",
      errorUnknown: "An unknown error occurred.",
      errorCookiesDisabled: "Cookies are disabled. Please enable cookies in your browser settings to sign in.",
      errorNetwork: "Unable to connect to the server. Please check your internet connection or try again later.",
    },
    bn: {
      loading: "লোড হচ্ছে...",
      signIn: "সাইন ইন",
      phoneNumberPlaceholder: "ফোন নম্বর",
      passwordPlaceholder: "পাসওয়ার্ড",
      errorEmpty: "ফোন নম্বর এবং পাসওয়ার্ড খালি রাখা যাবে না!",
      errorPhoneNotFound: "ফোন নম্বরটির অস্তিত্ব নেই।",
      errorPasswordIncorrect: "পাসওয়ার্ড সঠিক নয়।",
      errorDatabase: "ডেটাবেস ত্রুটি ঘটেছে। দয়া করে পরে আবার চেষ্টা করুন।",
      errorUnknown: "অজ্ঞাত ত্রুটি ঘটেছে।",
      errorCookiesDisabled: "কুকিজ অক্ষম করা আছে। সাইন ইন করতে আপনার ব্রাউজার সেটিংসে কুকিজ সক্ষম করুন।",
      errorNetwork: "সার্ভারে সংযোগ করতে অক্ষম। দয়া করে আপনার ইন্টারনেট সংযোগ পরীক্ষা করুন বা পরে আবার চেষ্টা করুন।",
    },
  };

  const lang = isBangla ? translations.bn : translations.en;

  // Function to check if cookies are enabled
  const areCookiesEnabled = () => {
    if (!navigator.cookieEnabled) return false;
    document.cookie = "testcookie=1; SameSite=Strict; Secure";
    const cookieSet = document.cookie.indexOf("testcookie=1") !== -1;
    document.cookie = "testcookie=; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure";
    return cookieSet;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!areCookiesEnabled()) {
      setError(lang.errorCookiesDisabled);
      setLoading(false);
      return;
    }

    if (!phoneNumber || !password) {
      setError(lang.errorEmpty);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://api.holoapp.tech:3000/api/fleetSignIn",
        { phone: phoneNumber, password },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      const { data } = response;
      console.log(data);

      if (data.success) {
        localStorage.clear();
        const userData = {
          userID: data.user.userID,
          name: data.user.name,
          email: data.user.email,
          phoneNumber: data.user.phoneNumber,
          photo: data.user.photo,
        };
        localStorage.setItem("user", JSON.stringify(userData));
        console.log(userData);

        setError("");
        navigate("/fleet-homepage");
      } else {
        setError(lang.errorUnknown);
      }
    } catch (error) {
      if (error.response) {
        handleSignInError(error.response.status, error.response.data.error);
      } else {
        setError(lang.errorNetwork);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignInError = (statusCode, error) => {
    switch (statusCode) {
      case 400:
        setError(error === "Phone number and password are required." ? lang.errorEmpty : lang.errorUnknown);
        break;
      case 404:
        setError(lang.errorPhoneNotFound);
        break;
      case 401:
        setError(lang.errorPasswordIncorrect);
        break;
      case 500:
        setError(lang.errorDatabase);
        break;
      default:
        setError(lang.errorUnknown);
    }
  };

  const handleLanguageToggle = () => {
    setIsBangla(!isBangla);
  };

  return (
    <>
      {loading ? (
        <div className={styles.loaderContainer}>
          <div className={styles.loader}></div>
          <p className={styles.loaderText}>{lang.loading}</p>
        </div>
      ) : (
        <>
          <HeaderWhite />
          <MobileNav />
          <div className={styles.signInContainer}>
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

            <h1 className={styles.title}>{lang.signIn}</h1>

            <div className={styles.signInCard}>
              <form onSubmit={handleSignIn}>
                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.label}>
                    {lang.phoneNumberPlaceholder}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder={lang.phoneNumberPlaceholder}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="password" className={styles.label}>
                    {lang.passwordPlaceholder}
                  </label>
                  <div className={styles.passwordContainer}>
                    <input
                      type={passwordVisible ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={lang.passwordPlaceholder}
                      className={styles.input}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      className={styles.eyeButton}
                    >
                      <img
                        src={passwordVisible ? "/img/eye-open.png" : "/img/eye-closed.png"}
                        alt={passwordVisible ? "Hide password" : "Show password"}
                        className={styles.eyeIcon}
                      />
                    </button>
                  </div>
                </div>

                {error && <div className={styles.error}>{error}</div>}

                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={loading}
                >
                  {lang.signIn}
                </button>
              </form>
            </div>
          </div>
          <FooterWhite />
        </>
      )}
    </>
  );
};

export default FleetWelcome;