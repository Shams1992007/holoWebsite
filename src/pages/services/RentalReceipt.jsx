import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HeaderWhite from '../../components/headerwhite';
import MobileNav from '../../components/mobilenav';
import FooterWhite from '../../components/footerwhite';
import styles from './RequestDetails.module.css';

const translations = {
  en: {
    loading: 'Loading details...',
    userIdMissing: 'User ID is missing. Please log in again.',
    rentalReceipt: 'Rental Receipt',
    requestID: 'Request ID:',
    startLocation: 'Start Location:',
    endLocation: 'End Location:',
    vehicleType: 'Vehicle Type:',
    passengers: 'Passengers:',
    rentType: 'Rent Type:',
    duration: 'Duration:',
    startRide: 'Start Ride:',
    finishRide: 'Finish Ride:',
    jatriName: 'Jatri Name:',
    fare: 'Fare:',
    rateYourRental: 'Rate Your Rental:',
    goHome: 'Go Home',
    error: 'Error',
    networkIssue: 'Unable to fetch rental data. Please try again.',
    noRentalData: 'No rental data found for the latest completed rental.',
    noCompletedRentals: 'No completed rentals found in history.',
    rateBeforeProceeding: 'Please rate your rental before proceeding.',
    confirm: 'Are you sure?',
    confirmMessage: 'You have rated the rental. Do you want to go home?',
    yes: 'Yes',
    no: 'No',
    failedToComplete: 'Could not complete the rental process.',
  },
  bn: {
    loading: 'বিবরণ লোড হচ্ছে...',
    userIdMissing: 'ব্যবহারকারীর আইডি অনুপস্থিত। দয়া করে আবার লগ ইন করুন।',
    rentalReceipt: 'ভাড়ার রসিদ',
    requestID: 'অনুরোধ আইডি:',
    startLocation: 'যাত্রা শুরুর স্থান:',
    endLocation: 'গন্তব্য:',
    vehicleType: 'পছন্দের গাড়ি:',
    passengers: 'যাত্রী সংখ্যা:',
    rentType: 'ভাড়ার ধরন:',
    duration: 'সময়কাল:',
    startRide: 'যাত্রা শুরু:',
    finishRide: 'যাত্রা শেষ:',
    jatriName: 'যাত্রীর নাম:',
    fare: 'ভাড়া:',
    rateYourRental: 'আপনার ভাড়া রেট করুন:',
    goHome: 'হোমে যান',
    error: 'ত্রুটি',
    networkIssue: 'ভাড়ার তথ্য পাওয়া যায়নি। আবার চেষ্টা করুন।',
    noRentalData: 'সর্বশেষ সম্পন্ন ভাড়ার জন্য কোনো তথ্য পাওয়া যায়নি।',
    noCompletedRentals: 'ইতিহাসে কোনো সম্পন্ন ভাড়া পাওয়া যায়নি।',
    rateBeforeProceeding: 'অনুগ্রহ করে আপনার ভাড়া রেট করুন এবং তারপর এগিয়ে যান।',
    confirm: 'নিশ্চিত করুন?',
    confirmMessage: 'আপনি ভাড়া রেট করেছেন। আপনি কি হোমে যেতে চান?',
    yes: 'হ্যাঁ',
    no: 'না',
    failedToComplete: 'ভাড়ার প্রক্রিয়া সম্পন্ন করা যায়নি।',
  },
};

// Star Rating Component
const StarRating = ({ maxStars = 5, rating, onRatingChange }) => {
  return (
    <div className="flex justify-center space-x-2" style={{ marginBottom: '20px' }}>
      {Array.from({ length: maxStars }).map((_, index) => (
        <button
          key={index}
          onClick={() => onRatingChange(index + 1)}
          className="text-3xl focus:outline-none"
        >
          <span style={{ color: index < rating ? '#2ECC71' : '#ccc' }}>
            {index < rating ? '★' : '☆'}
          </span>
        </button>
      ))}
    </div>
  );
};

const RentalReceipt = () => {
  const navigate = useNavigate();
  const [isBangla, setIsBangla] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userID, setUserID] = useState(null);
  const [rentalData, setRentalData] = useState(null);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);

  const lang = translations[isBangla ? 'bn' : 'en'];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedUserID = storedUser ? JSON.parse(storedUser).userID : null;
        if (!storedUserID) {
          window.alert(lang.userIdMissing);
          navigate('/signin');
          return;
        }
        setUserID(storedUserID);

        setLoading(true);
        // Fetch the most recent completed rental
        const historyResponse = await axios.post(
          `https://api.holoapp.tech:3000/api/jatriLastSuccessfulRentalID`,
          { jatriID: storedUserID },
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        );

        console.log('History response:', historyResponse.data);

        if (historyResponse.data.rentID) {
          const latestRentID = historyResponse.data.rentID;
          const latestUserID = historyResponse.data.chalokID;

          // Fetch details for this rentID
          const rentalResponse = await axios.post(
            `https://api.holoapp.tech:3000/api/getRentalDataRentID`,
            { rentIDs: latestRentID, userID: latestUserID },
            {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true,
            }
          );

          console.log('Rental response:', rentalResponse.data);

          if (rentalResponse.data && rentalResponse.data.rentalRequests?.[0]) {
            setRentalData({
              ...rentalResponse.data.rentalRequests[0],
              fare: historyResponse.data.fare || 'N/A',
              chalokID: historyResponse.data.chalokID,
            });
          } else {
            window.alert(lang.noRentalData);
          }
        } else {
          window.alert(lang.noCompletedRentals);
        }
      } catch (error) {
        console.error('Error fetching rental data:', error.response ? error.response.data : error.message);
        if (error.response?.status === 401) {
          localStorage.removeItem('user');
          navigate('/signin');
        } else if (error.response?.status === 429) {
          window.alert('Too many requests. Please try again later.');
        } else {
          window.alert(lang.networkIssue);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, lang]);

  const goHome = async () => {
    if (rating === 0) {
      window.alert(lang.rateBeforeProceeding);
      return;
    }

    if (window.confirm(`${lang.confirm}\n${lang.confirmMessage}`)) {
      try {
        await axios.post(
          'https://api.holoapp.tech:3000/api/rentalRatingJatri',
          {
            jatriID: userID,
            chalokID: rentalData.chalokID,
            chalokRating: rating,
            rentID: rentalData.rentRequestID,
          },
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        );

        navigate('/signin');
      } catch (error) {
        console.error('Error finishing rental:', error.response ? error.response.data : error.message);
        window.alert(`${lang.error}: ${lang.failedToComplete}`);
      }
    }
  };

  if (loading) {
    return (
      <div className={styles.pageWrapper}>
        <HeaderWhite
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
          isBangla={isBangla}
          setIsBangla={setIsBangla}
        />
        <div className={styles.loaderContainer}>
          <div className={styles.spinner}></div>
          <span className={styles.loaderText}>{lang.loading}</span>
        </div>
        <FooterWhite isBangla={isBangla} />
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <HeaderWhite
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
        isBangla={isBangla}
        setIsBangla={setIsBangla}
      />
      <div className={`${styles.utilizeOverlay} ${isMobileMenuOpen ? styles.active : ''}`} />
      <MobileNav isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />
      <div className={styles.landingArea}>
        <div className={styles.container}>
          <h1 className={styles.title}>{lang.rentalReceipt}</h1>
          {rentalData ? (
            <>
              <div className={styles.tableContainer}>
                <div className={styles.tableRow}>
                  <span className={styles.tableLabel}>{lang.requestID}</span>
                  <span className={styles.tableDetail}>{rentalData.rentRequestID || 'N/A'}</span>
                </div>
                <div className={styles.tableRow}>
                  <span className={styles.tableLabel}>{lang.startLocation}</span>
                  <span className={styles.tableDetail}>{rentalData.startLocation || 'N/A'}</span>
                </div>
                <div className={styles.tableRow}>
                  <span className={styles.tableLabel}>{lang.endLocation}</span>
                  <span className={styles.tableDetail}>{rentalData.endLocation || 'N/A'}</span>
                </div>
                <div className={styles.tableRow}>
                  <span className={styles.tableLabel}>{lang.vehicleType}</span>
                  <span className={styles.tableDetail}>{rentalData.favouredVehicle || 'N/A'}</span>
                </div>
                <div className={styles.tableRow}>
                  <span className={styles.tableLabel}>{lang.passengers}</span>
                  <span className={styles.tableDetail}>{rentalData.numberOfPassengers || 'N/A'}</span>
                </div>
                <div className={styles.tableRow}>
                  <span className={styles.tableLabel}>{lang.rentType}</span>
                  <span className={styles.tableDetail}>
                    {isBangla
                      ? rentalData.rentType === 'One-Way'
                        ? 'একমুখী'
                        : rentalData.rentType === 'Round Trip'
                        ? 'ফিরতি'
                        : 'ঘণ্টাভিত্তিক'
                      : rentalData.rentType || 'N/A'}
                  </span>
                </div>
                {rentalData.tripDuration && (
                  <div className={styles.tableRow}>
                    <span className={styles.tableLabel}>{lang.duration}</span>
                    <span className={styles.tableDetail}>
                      {isBangla ? `${rentalData.tripDuration} ঘণ্টা` : `${rentalData.tripDuration} hours`}
                    </span>
                  </div>
                )}
                <div className={styles.tableRow}>
                  <span className={styles.tableLabel}>{lang.startRide}</span>
                  <span className={styles.tableDetail}>{rentalData.startRide || 'N/A'}</span>
                </div>
                <div className={styles.tableRow}>
                  <span className={styles.tableLabel}>{lang.finishRide}</span>
                  <span className={styles.tableDetail}>{rentalData.finishRide || 'N/A'}</span>
                </div>
                <div className={styles.tableRow}>
                  <span className={styles.tableLabel}>{lang.jatriName}</span>
                  <span className={styles.tableDetail}>{rentalData.name || 'N/A'}</span>
                </div>
                <div className={styles.tableRow}>
                  <span className={styles.tableLabel}>{lang.fare}</span>
                  <span className={styles.tableDetail}>
                    {rentalData.fare || 'N/A'} {isBangla ? 'টাকা' : 'Taka'}
                  </span>
                </div>
              </div>
              <div className="text-center my-4">
                <p className="text-lg font-semibold">{lang.rateYourRental}</p>
                <StarRating
                  maxStars={5}
                  rating={rating}
                  onRatingChange={(value) => setRating(value)}
                />
              </div>
              <div className="flex justify-center mt-8">
                <button className={styles.primaryButton} onClick={goHome}>
                  {lang.goHome}
                </button>
              </div>
            </>
          ) : (
            <div className={styles.errorContainer}>
              <span className={styles.errorIcon}>⚠️</span>
              <p className={styles.errorText}>{lang.noCompletedRentals}</p>
              <div className={styles.buttonGroup}>
                <button className={styles.primaryButton} onClick={() => navigate('/home')}>
                  {lang.goHome}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <FooterWhite isBangla={isBangla} />
    </div>
  );
};

export default RentalReceipt;
