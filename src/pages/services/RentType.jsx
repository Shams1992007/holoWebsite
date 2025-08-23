import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HeaderWhite from '../../components/headerwhite';
import MobileNav from '../../components/mobilenav';
import FooterWhite from '../../components/footerwhite';
import styles from './RentType.module.css';
import { debounce } from 'lodash';

const RentType = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isBangla, setIsBangla] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = React.useRef();

  const translations = {
    en: {
      passenger: 'Passenger',
      adText: 'Your Ad',
      error: 'Error',
      userIdMissing: 'User ID is missing. Please log in again.',
      fetchFailed: 'Failed to fetch ride status.',
    },
    bn: {
      passenger: 'প্যাসেঞ্জার',
      adText: 'আপনার বিজ্ঞাপন',
      error: 'ত্রুটি',
      userIdMissing: 'ব্যবহারকারীর আইডি অনুপস্থিত। দয়া করে আবার লগ ইন করুন।',
      fetchFailed: 'রাইড স্ট্যাটাস ফেচ করতে ব্যর্থ হয়েছে।',
    },
  };

  const lang = isBangla ? translations.bn : translations.en;

  useEffect(() => {
    const checkJatriStatus = debounce(async () => {
      try {
        const cachedJatriStatus = localStorage.getItem('jatriStatus');
        if (cachedJatriStatus) {
          const jatriStatus = JSON.parse(cachedJatriStatus);
          console.log('Cached Jatri Status:', jatriStatus);
          if (jatriStatus.rentRequest === 1) {
            if (jatriStatus.isRentalRide === 1) {
              navigate('/selected-chalok');
            } else if (jatriStatus.isRentalRide === 0) {
              navigate('/request-details');
            }
            return;
          } else{
            if(jatriStatus.rentalRideEndNotification === 1){
              navigate('/rental-receipt');
            }
          }            
          setLoading(false);
          return;
        }
    
        const user = localStorage.getItem('user');
        const userID = user ? JSON.parse(user).userID : null;

        const signedIn = localStorage.getItem('isSignedIn');
        if (!signedIn) {
          window.alert(`${lang.error}: ${lang.userIdMissing}`);
          navigate('/signin');
          return;
        }
    
        const response = await axios.get(`https://api.holoapp.tech:3000/api/get-jatriStatus/${userID}`, {
          withCredentials: true,
        });
    
        const jatriStatus = response.data.data[0];
        console.log('Jatri Status:', jatriStatus);
        localStorage.setItem('jatriStatus', JSON.stringify(jatriStatus));
    
        if (jatriStatus.rentRequest === 1) {
          if (jatriStatus.isRentalRide === 1) {
            navigate('/selected-chalok');
          } else if (jatriStatus.isRentalRide === 0) {
            navigate('/request-details');
          }
          return;
        }else{
          if(jatriStatus.rentalRideEndNotification === 1){
            navigate('/rental-receipt');
          }
        }
      } catch (error) {
        localStorage.removeItem('user');
        navigate('/signin');
      }
      setLoading(false);
    }, 2000); // Wait 1 second between calls    

    checkJatriStatus();
  }, [navigate, lang]);

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

  if (loading) {
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
        <div className={styles.landingArea}>
          <div className={styles.container}>
            <div className={styles.center}>
              <div className={styles.spinner}></div>
            </div>
          </div>
        </div>
        <FooterWhite />
      </div>
    );
  }

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
          {/* <div className={styles.bannerContainer}>
            <h2 className={styles.bannerText}>{lang.adText}</h2>
          </div> */}
          <div className={styles.buttonContainer}>
            <button
              className={styles.button}
              onClick={() => navigate('/passenger-details')}
            >
              <span className={styles.buttonText}>{lang.passenger}</span>
            </button>
          </div>
        </div>
      </div>
      {/* LANDING AREA END */}

      <FooterWhite />
    </div>
  );
};

export default RentType;