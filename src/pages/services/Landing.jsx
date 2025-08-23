import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderWhite from '../../components/headerwhite';
import MobileNav from '../../components/mobilenav';
import FooterWhite from '../../components/footerwhite';
import styles from './Landing.module.css';

const Landing = () => {
  const navigate = useNavigate();
  const [isBangla, setIsBangla] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = React.useRef();

  const translations = {
    en: {
      rent: 'Rent Vehicle',
      logoutTitle: 'Confirm Logout',
      logoutMessage: 'Are you sure you want to log out?',
      cancel: 'Cancel',
      ok: 'OK',
    },
    bn: {
      rent: 'বাহন ভাড়া',
      logoutTitle: 'লগ আউট নিশ্চিত করুন',
      logoutMessage: 'আপনি কি নিশ্চিত যে আপনি লগ আউট করতে চান?',
      cancel: 'বাতিল করুন',
      ok: 'ঠিক আছে',
    },
  };

  const lang = isBangla ? translations.bn : translations.en;

  const handleRentPress = () => {
    navigate('/rent-type');
  };

  const handleLogout = () => {
    const confirmed = window.confirm(`${lang.logoutTitle}\n${lang.logoutMessage}`);
    if (confirmed) {
      navigate('/signin');
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleOutsideClick = (event) => {
    if (isMobileMenuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isMobileMenuOpen]);

  return (
    <div className={styles.pageWrapper}>
      <HeaderWhite
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />
      <div ref={menuRef}>
        <MobileNav isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />
      </div>
      <div className={`${styles.utilizeOverlay} ${isMobileMenuOpen ? '' : styles.hidden}`} />

      {/* LANDING AREA START */}
      <div className={styles.landingArea}>
        <div className={styles.container}>
          <div className={styles.buttonContainer}>
            <button
              className={styles.button}
              onClick={handleRentPress}
            >
              <span className={styles.buttonText}>{lang.rent}</span>
            </button>
          </div>
        </div>
      </div>
      {/* LANDING AREA END */}

      <FooterWhite />
    </div>
  );
};

export default Landing;