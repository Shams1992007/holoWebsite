import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase";
import HeaderWhite from "../../components/headerwhite";
import MobileNav from "../../components/mobilenav";
import FooterWhite from "../../components/footerwhite";
import styles from "../SignIn.module.css";

const AdminSignIn = () => {
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
      signInWithGoogle: "Sign in with Google",
      forgotPassword: "Forgot Password?",
      signUpPrompt: "Don't have an account? Sign Up",
      phoneNumberPlaceholder: "Phone Number",
      passwordPlaceholder: "Password",
      errorEmpty: "Phone number and password cannot be empty!",
      errorPhoneNotFound: "Phone number does not exist.",
      errorPasswordEmpty: "Phone number exists, please try Google sign-in.",
      errorPasswordIncorrect: "Password is incorrect.",
      errorDatabase: "A database error occurred. Please try again later.",
      errorUnknown: "An unknown error occurred.",
      errorCookiesDisabled: "Cookies are disabled. Please enable cookies in your browser settings to sign in.",
      errorNetwork: "Unable to connect to the server. Please check your internet connection or try again later.",
      errorGoogleAuth: "Google sign-in failed. Please try again.",
      errorGoogleUserNotFound: "User not found. Please sign up first.",
      errorGoogleTokenInvalid: "Invalid Google token. Please try again.",
    },
    bn: {
      loading: "লোড হচ্ছে...",
      signIn: "সাইন ইন",
      signInWithGoogle: "গুগলের সাথে সাইন ইন করুন",
      forgotPassword: "পাসওয়ার্ড ভুলে গেছেন?",
      signUpPrompt: "অ্যাকাউন্ট নেই? সাইন আপ করুন",
      phoneNumberPlaceholder: "ফোন নম্বর",
      passwordPlaceholder: "পাসওয়ার্ড",
      errorEmpty: "ফোন নম্বর এবং পাসওয়ার্ড খালি রাখা যাবে না!",
      errorPhoneNotFound: "ফোন নম্বরটির অস্তিত্ব নেই।",
      errorPasswordEmpty: "ফোন নম্বর বিদ্যমান, দয়া করে গুগল সাইন-ইন চেষ্টা করুন।",
      errorPasswordIncorrect: "পাসওয়ার্ড সঠিক নয়।",
      errorDatabase: "ডেটাবেস ত্রুটি ঘটেছে। দয়া করে পরে আবার চেষ্টা করুন।",
      errorUnknown: "অজ্ঞাত ত্রুটি ঘটেছে।",
      errorCookiesDisabled: "কুকিজ অক্ষম করা আছে। সাইন ইন করতে আপনার ব্রাউজার সেটিংসে কুকিজ সক্ষম করুন।",
      errorNetwork: "সার্ভারে সংযোগ করতে অক্ষম। দয়া করে আপনার ইন্টারনেট সংযোগ পরীক্ষা করুন বা পরে আবার চেষ্টা করুন।",
      errorGoogleAuth: "গুগল সাইন-ইন ব্যর্থ হয়েছে। দয়া করে আবার চেষ্টা করুন।",
      errorGoogleUserNotFound: "ব্যবহারকারী পাওয়া যায়নি। দয়া করে প্রথমে সাইন আপ করুন।",
      errorGoogleTokenInvalid: "অবৈধ গুগল টোকেন। দয়া করে আবার চেষ্টা করুন।",
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
        "https://api.holoapp.tech:3000/api/website-signin",
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
          photo: data.user.photo
        };        
        localStorage.setItem("user", JSON.stringify(userData));
        console.log(userData);

        setError("");
        navigate("/userListAdmin");
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

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");

    if (!areCookiesEnabled()) {
      setError(lang.errorCookiesDisabled);
      setLoading(false);
      return;
    }

    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('email'); // Optional: add scopes if needed
      
      const result = await signInWithPopup(auth, provider);
      
      // ✅ Get Google OAuth2 ID Token from credential
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const idToken = credential.idToken; // <-- THIS is the Google ID token
      const user = result.user;

      console.log('Google OAuth2 ID Token:', idToken);

      // Send idToken to backend
      const response = await axios.post(
        "https://api.holoapp.tech:3000/api/website-google-signin",
        { idToken },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      const { data } = response;
      console.log(data);

      if (data.success) {
        // Store minimal user data in localStorage for Profile.jsx
        localStorage.clear();
        const userData = {
          userID: data.user.userID,
          name: data.user.name,
          email: data.user.email,
          phoneNumber: data.user.phoneNumber,
          photo: data.user.photo
        };        
        localStorage.setItem("user", JSON.stringify(userData));
        console.log(userData);

        setError("");
        navigate("/userListAdmin");
      } else {
        setError(lang.errorUnknown);
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
      if (error.response) {
        handleGoogleSignInError(error.response.status, error.response.data.error);
      } else {
        setError(lang.errorGoogleAuth);
      }
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
      case 403:
        setError(error === "password_empty" ? lang.errorPasswordEmpty : lang.errorUnknown);
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

  const handleGoogleSignInError = (statusCode, error) => {
    switch (statusCode) {
      case 400:
        setError(error === "idToken is required." ? lang.errorGoogleTokenInvalid : lang.errorUnknown);
        break;
      case 404:
        setError(lang.errorGoogleUserNotFound);
        navigate("/signin");
        break;
      case 500:
        setError(error === "Failed to verify token" ? lang.errorGoogleTokenInvalid : lang.errorDatabase);
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

              <button
                onClick={handleGoogleSignIn}
                className={styles.googleButton}
                disabled={loading}
              >
                <img
                  src="/img/google-icon.png"
                  alt="Google icon"
                  className={styles.googleIcon}
                />
                {lang.signInWithGoogle}
              </button>

              <p className={styles.link}>
                <Link to="/forgot-password">{lang.forgotPassword}</Link>
              </p>
              <p className={styles.link}>
                {lang.signUpPrompt.split("?")[0]}?{" "}
                <Link to="/phone-verification">{lang.signUpPrompt.split("?")[1]}</Link>
              </p>
            </div>
          </div>
          <FooterWhite />
        </>
      )}
    </>
  );
};

export default AdminSignIn;
