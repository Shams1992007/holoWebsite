import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import HeaderWhite from '../../components/headerwhite';
import MobileNav from '../../components/mobilenav';
import FooterWhite from '../../components/footerwhite';
import styles from './RentDetails.module.css';

const translations = {
  en: {
    tripDetails: 'Trip Details',
    rentType: 'Rent Type',
    numberOfPassengers: 'Number of Passengers',
    startingLocation: 'Starting Location',
    exactPickupPoint: 'Exact Pickup Point',
    endingLocation: 'Ending Location',
    exactDestinationPoint: 'Exact Destination Point',
    startDateTime: 'Start Date & Time',
    returnDateTime: 'Return Date & Time',
    tripDuration: 'Trip Duration',
    favouredVehicle: 'Favoured Vehicle',
    publishRequest: 'Publish Request',
    confirmation: 'Confirmation',
    confirmPublish: 'Are you sure you want to publish this request?',
    cancel: 'Cancel',
    yes: 'Yes',
    success: 'Success',
    tripPublished: 'Trip request published successfully',
    error: 'Error',
    somethingWrong: 'Something went wrong, please try again.',
    networkIssue: 'Network issue, please try again.',
    loading: 'Loading...',
    userIdMissing: 'User ID is missing. Please log in again.',
  },
  bn: {
    tripDetails: 'ট্রিপ বিস্তারিত',
    rentType: 'ভাড়ার ধরন',
    numberOfPassengers: 'যাত্রীর সংখ্যা',
    startingLocation: 'শুরু করার স্থান',
    exactPickupPoint: 'সঠিক পিকআপ স্থান',
    endingLocation: 'শেষ করার স্থান',
    exactDestinationPoint: 'সঠিক গন্তব্য',
    startDateTime: 'শুরুর তারিখ ও সময়',
    returnDateTime: 'ফিরতি তারিখ ও সময়',
    tripDuration: 'ভাড়ার সময়কাল',
    favouredVehicle: 'পছন্দের যানবাহন',
    publishRequest: 'অনুরোধ প্রকাশ করুন',
    confirmation: 'নিশ্চিতকরণ',
    confirmPublish: 'আপনি কি নিশ্চিত যে আপনি অনুরোধটি প্রকাশ করতে চান?',
    cancel: 'বাতিল',
    yes: 'হ্যাঁ',
    success: 'সফল',
    tripPublished: 'ট্রিপ অনুরোধ সফলভাবে প্রকাশিত হয়েছে',
    error: 'ত্রুটি',
    somethingWrong: 'কিছু ভুল হয়েছে, আবার চেষ্টা করুন।',
    networkIssue: 'নেটওয়ার্ক সমস্যা, আবার চেষ্টা করুন।',
    loading: 'লোড হচ্ছে...',
    userIdMissing: 'ব্যবহারকারীর আইডি অনুপস্থিত। দয়া করে আবার লগ ইন করুন।',
  },
};

const RentDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const tripData = state?.tripData || {};
  const [isBangla, setIsBangla] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const lang = translations[isBangla ? 'bn' : 'en'];

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const publishRequest = useCallback(async () => {
    if (window.confirm(lang.confirmPublish)) {
      console.log('Publishing trip request...', tripData);
      setLoading(true);

      try {
        const user = localStorage.getItem('user');
        const storedUserID = user ? JSON.parse(user).userID : null;
        if (!storedUserID) {
          window.alert(`${lang.error}: ${lang.userIdMissing}`);
          navigate('/signin');
          return;
        }

        const response = await axios.post(
          'https://api.holoapp.tech:3000/api/saveRentalRequest',
          {
            ...tripData,
            jatriID: storedUserID,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        );

        console.log('API response:', response.data);

        if (response.data.message === 'Trip request published successfully and rentRequest updated') {
          window.alert(lang.tripPublished);
          navigate('/request-details');
        } else {
          window.alert(lang.somethingWrong);
        }
      } catch (error) {
        console.error('Error publishing trip request:', error.response ? error.response.data : error.message);
        if (error.response?.status === 401) {
          localStorage.removeItem('user');
          navigate('/signin');
        } else {
          window.alert(lang.networkIssue);
        }
      } finally {
        setLoading(false);
      }
    }
  }, [tripData, navigate, lang]);

  useEffect(() => {
    if (!Object.keys(tripData).length) {
      navigate('/passenger-details');
    }
  }, [tripData, navigate]);

  return (
    <div className={styles.pageWrapper}>
      <HeaderWhite
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
        isBangla={isBangla}
        setIsBangla={setIsBangla}
      />
      <div className={`${styles.utilizeOverlay} ${isMobileMenuOpen ? '' : styles.hidden}`} />
      <MobileNav isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />
      <div className={styles.landingArea}>
        <div className={styles.container}>
          <h2 className={styles.title}>{lang.tripDetails}</h2>
          <div className={styles.detailsContainer}>
            {/* Rent Type */}
            <div className={styles.detailGroup}>
              <span className={styles.label}>{lang.rentType}:</span>
              <span className={styles.detailText}>
                {isBangla
                  ? tripData.rentType === 'One-Way'
                    ? 'একমুখী'
                    : tripData.rentType === 'Round Trip'
                    ? 'ফিরতি'
                    : 'ঘণ্টাভিত্তিক'
                  : tripData.rentType || 'N/A'}
              </span>
            </div>

            {/* Number of Passengers */}
            <div className={styles.detailGroup}>
              <span className={styles.label}>{lang.numberOfPassengers}:</span>
              <span className={styles.detailText}>{tripData.numberOfPassengers || 'N/A'}</span>
            </div>

            {/* Starting Location */}
            <div className={styles.detailGroup}>
              <span className={styles.label}>{lang.startingLocation}:</span>
              <span className={styles.detailText}>
                {tripData.startingSubdistrict
                  ? `${tripData.startingSubdistrict}, ${tripData.startingDistrict}, ${tripData.startingLocation}`
                  : 'N/A'}
              </span>
            </div>

            {/* Exact Pickup Point */}
            {tripData.exactPickupPoint && (
              <div className={styles.detailGroup}>
                <span className={styles.label}>{lang.exactPickupPoint}:</span>
                <span className={styles.detailText}>{tripData.exactPickupPoint}</span>
              </div>
            )}

            {/* Ending Location */}
            {tripData.rentType !== 'Hourly' && (
              <>
                <div className={styles.detailGroup}>
                  <span className={styles.label}>{lang.endingLocation}:</span>
                  <span className={styles.detailText}>
                    {tripData.endingSubdistrict
                      ? `${tripData.endingSubdistrict}, ${tripData.endingDistrict}, ${tripData.endingLocation}`
                      : 'N/A'}
                  </span>
                </div>
                {tripData.exactDestinationPoint && (
                  <div className={styles.detailGroup}>
                    <span className={styles.label}>{lang.exactDestinationPoint}:</span>
                    <span className={styles.detailText}>{tripData.exactDestinationPoint}</span>
                  </div>
                )}
              </>
            )}

            {/* Start Date and Time */}
            <div className={styles.detailGroup}>
              <span className={styles.label}>{lang.startDateTime}:</span>
              <span className={styles.detailText}>
                {tripData.startDay
                  ? `${tripData.startDay} ${tripData.startMonth} ${tripData.startYear}, ${tripData.startHour.split(' ')[0]}:${tripData.startMinute} ${tripData.startHour.split(' ')[1]}`
                  : 'N/A'}
              </span>
            </div>

            {/* Return Date and Time */}
            {tripData.rentType === 'Round Trip' && (
              <div className={styles.detailGroup}>
                <span className={styles.label}>{lang.returnDateTime}:</span>
                <span className={styles.detailText}>
                  {tripData.returnDay
                    ? `${tripData.returnDay} ${tripData.returnMonth} ${tripData.returnYear}, ${tripData.returnHour.split(' ')[0]}:${tripData.returnMinute} ${tripData.returnHour.split(' ')[1]}`
                    : 'N/A'}
                </span>
              </div>
            )}

            {/* Trip Duration */}
            {tripData.rentType === 'Hourly' && (
              <div className={styles.detailGroup}>
                <span className={styles.label}>{lang.tripDuration}:</span>
                <span className={styles.detailText}>
                  {tripData.tripDuration ? (isBangla ? `${tripData.tripDuration} ঘণ্টা` : `${tripData.tripDuration} hours`) : 'N/A'}
                </span>
              </div>
            )}

            {/* Favoured Vehicle */}
            <div className={styles.detailGroup}>
              <span className={styles.label}>{lang.favouredVehicle}:</span>
              <span className={styles.detailText}>{tripData.favouredVehicle || 'N/A'}</span>
            </div>

            {/* Loader or Button */}
            {loading ? (
              <div className={styles.loaderContainer}>
                <div className={styles.spinner}></div>
                <span className={styles.loaderText}>{lang.loading}</span>
              </div>
            ) : (
              <button className={styles.publishButton} onClick={publishRequest}>
                {lang.publishRequest}
              </button>
            )}
          </div>
        </div>
      </div>
      <FooterWhite isBangla={isBangla} />
    </div>
  );
};

export default RentDetails;