import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeaderWhite from "../components/headerwhite";
import MobileNav from "../components/mobilenav";
import FooterWhite from "../components/footerwhite";
import styles from "./Welcome.module.css";

const AdminWelcome = () => {
  const [isBangla, setIsBangla] = useState(false);

  // Language translations
  const translations = {
    en: {
      title: "Holo",
      signUp: "Sign Up",
      signIn: "Sign In",
    },
    bn: {
      title: "Holo",
      signUp: "সাইন আপ",
      signIn: "সাইন ইন",
    },
  };

  const lang = isBangla ? translations.bn : translations.en;

  const handleLanguageToggle = () => {
    setIsBangla(!isBangla);
  };

  return (
    <>
      <HeaderWhite />
      <MobileNav />
      <div className={styles.welcomeContainer}>
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

        <div className={styles.buttonContainer}>
          <Link to="/phone-verification" className={styles.button}>
            {lang.signUp}
          </Link>
        </div>
        <div className={styles.buttonContainer}>
          <Link to="/enterHoloAdmin" className={styles.button}>
            {lang.signIn}
          </Link>
        </div>
      </div>
      <FooterWhite />
    </>
  );
};

export default AdminWelcome;