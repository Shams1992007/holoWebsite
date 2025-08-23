import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HeaderWhite from '../../components/headerwhite';
import MobileNav from '../../components/mobilenav';
import FooterWhite from '../../components/footerwhite';
import styles from './RequestDetails.module.css';

const translations = {
  en: {
    loading: 'Loading...',
    userIdMissing: 'User ID is missing. Please log in again.',
    chalokDetails: 'Chalok Details',
    fleetDetails: 'Fleet Details',
    name: 'Name:',
    contact: 'Contact:',
    call: 'Call',
    vehicleType: 'Vehicle Type:',
    registrationNumber: 'Registration Number:',
    modelName: 'Model Name:',
    engineCapacity: 'Engine Capacity:',
    color: 'Color:',
    modelYear: 'Model Year:',
    fleetName: 'Fleet:',
    noVehicleAssigned: 'has not yet assigned any car',
    requestDetails: 'Rental Request Details',
    rentalRequestID: 'Rental Request ID:',
    rentType: 'Rent Type:',
    numberOfPassengers: 'Number of Passengers:',
    startingLocation: 'Starting Location:',
    endingLocation: 'Ending Location:',
    startDateTime: 'Start Date & Time:',
    returnDateTime: 'Return Date & Time:',
    tripDuration: 'Trip Duration:',
    favouredVehicle: 'Favoured Vehicle:',
    createDate: 'Create Date:',
    finalFare: 'Agreed Fare:',
    backToHome: 'Back to Home',
    error: 'Error',
    networkIssue: 'Network issue, please try again.',
  },
  bn: {
    loading: 'লোড হচ্ছে...',
    userIdMissing: 'ব্যবহারকারীর আইডি অনুপস্থিত। দয়া করে আবার লগ ইন করুন।',
    chalokDetails: 'চালকের বিস্তারিত',
    fleetDetails: 'ফ্লিট বিস্তারিত',
    name: 'নাম:',
    contact: 'যোগাযোগ:',
    call: 'কল করুন',
    vehicleType: 'যানের ধরন:',
    registrationNumber: 'রেজিস্ট্রেশন নম্বর:',
    modelName: 'মডেল নাম:',
    engineCapacity: 'ইঞ্জিন ক্যাপাসিটি:',
    color: 'রঙ:',
    modelYear: 'মডেল বছর:',
    fleetName: 'ফ্লিট:',
    noVehicleAssigned: 'এখনও কোনো গাড়ি নির্ধারণ করেনি',
    requestDetails: 'ভাড়ার অনুরোধের বিস্তারিত',
    rentalRequestID: 'ভাড়ার অনুরোধ আইডি:',
    rentType: 'ভাড়ার ধরন:',
    numberOfPassengers: 'যাত্রীর সংখ্যা:',
    startingLocation: 'শুরু করার স্থান:',
    endingLocation: 'শেষ করার স্থান:',
    startDateTime: 'শুরুর তারিখ ও সময়:',
    returnDateTime: 'ফিরতি তারিখ ও সময়:',
    tripDuration: 'ভাড়ার সময়কাল:',
    favouredVehicle: 'পছন্দের যানবাহন:',
    createDate: 'তৈরির তারিখ:',
    finalFare: 'চূড়ান্ত ভাড়া:',
    backToHome: 'হোমে ফিরে যান',
    error: 'ত্রুটি',
    networkIssue: 'নেটওয়ার্ক সমস্যা, আবার চেষ্টা করুন।',
  },
};

const SelectedChalok = () => {
  const navigate = useNavigate();
  const [isBangla, setIsBangla] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [tripData, setTripData] = useState(null);
  const [chalokData, setChalokData] = useState(null);
  const [finalFare, setFinalFare] = useState(null);
  const [chalokStatus, setChalokStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  const lang = translations[isBangla ? 'bn' : 'en'];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchActiveRentalRequest = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedUserID = storedUser ? JSON.parse(storedUser).userID : null;
        if (!storedUserID) {
          window.alert(lang.userIdMissing);
          navigate('/signin');
          return;
        }

        setLoading(true);
        // Step 1: Get active rental request
        const activeRequestResponse = await axios.get(
          `https://api.holoapp.tech:3000/api/activeRentalRequestJatri/${storedUserID}`,
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        );

        console.log('Active Rental Request Response:', activeRequestResponse.data);
        const { rentRequestID, chalokID, fleetName, finalFare: fetchedFare, chalokStatus } = activeRequestResponse.data;
        setFinalFare(fetchedFare);
        setChalokStatus(chalokStatus);

        // Step 2: Get rental request details
        const rentalRequestResponse = await axios.get(
          `https://api.holoapp.tech:3000/api/getRentalRequest/${storedUserID}`,
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        );
        console.log('Rental Request Details:', rentalRequestResponse.data);
        setTripData(rentalRequestResponse.data[0]);

        // Step 3: Handle chalok or fleet details
        if (fleetName && !chalokID) {
          const fleetResponse = await axios.get(
            `https://api.holoapp.tech:3000/api/rentalFleetDetails/${fleetName}`,
            {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true,
            }
          );
          console.log('Fleet Response:', fleetResponse.data);
          setChalokData({ ...fleetResponse.data, fleetName });
        } else if (chalokID) {
          const chalokResponse = await axios.get(
            `https://api.holoapp.tech:3000/api/rentalVehicleDetails/${chalokID}`,
            {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true,
            }
          );
          console.log('Chalok Vehicle Details:', chalokResponse.data);
          setChalokData({ ...chalokResponse.data, fleetName });
        } else {
          setChalokData({});
        }
      } catch (error) {
        console.error('Error fetching active rental request:', error.response ? error.response.data : error.message);
        if (error.response?.status === 401) {
          localStorage.removeItem('user');
          navigate('/signin');
        } else if (error.response?.status === 429) {
          window.alert('Too many requests. Please try again later.');
        } else {
          window.alert(lang.networkIssue);
          navigate('/signin');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchActiveRentalRequest();
  }, [navigate, lang]);

  const getStatusText = () => {
    if (chalokStatus === 6) return isBangla ? 'গৃহীত' : 'Accepted';
    if (chalokStatus === 7) return isBangla ? 'চলমান যাত্রা' : 'Ongoing Ride';
    if (chalokStatus === 4) return isBangla ? 'নির্বাচিত' : 'Selected';
    return isBangla ? 'নির্বাচিত' : 'Selected';
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

  if (!tripData || !chalokData || finalFare === null || chalokStatus === null) {
    return (
      <div className={styles.pageWrapper}>
        <HeaderWhite
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
          isBangla={isBangla}
          setIsBangla={setIsBangla}
        />
        <div className={styles.errorContainer}>
          <span className={styles.errorIcon}>⚠️</span>
          <p className={styles.errorText}>{lang.noRequestFound}</p>
          <div className={styles.buttonGroup}>
            <button className={styles.primaryButton} onClick={() => navigate(-1)}>
              {lang.goBack}
            </button>
            <button className={styles.secondaryButton} onClick={() => fetchActiveRentalRequest()}>
              {lang.retry}
            </button>
          </div>
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
          <h1 className={styles.title}>
            {isBangla
              ? `${getStatusText()} ${chalokData.fleetName ? lang.fleetDetails : lang.chalokDetails}`
              : `${getStatusText()} ${chalokData.fleetName ? 'Fleet' : 'Chalok'} Details`}
          </h1>

          {chalokData.fleetName && (
            <p className={`${styles.title} text-center font-semibold mb-4`}>
              {lang.fleetName} {chalokData.fleetName}
            </p>
          )}

          {chalokData.fleetName && !chalokData.user && !chalokData.vehicles ? (
            <>
              <p className={`${styles.warningText} text-red-600 font-bold text-center mb-4`}>
                {isBangla
                  ? `${chalokData.fleetName} ${lang.noVehicleAssigned}`
                  : `${chalokData.fleetName} ${lang.noVehicleAssigned}`}
              </p>
              <div className={styles.detailGroup}>
                <span className={styles.label}>{lang.contact}</span>
                <button
                  className={styles.successButton}
                  onClick={() => {
                    if (chalokData.contact) {
                      window.location.href = `tel:${chalokData.contact}`;
                    } else {
                      window.alert(`${lang.error}: ${isBangla ? 'যোগাযোগ নম্বর উপলব্ধ নয়' : 'Contact number not available'}`);
                    }
                  }}
                >
                  {isBangla ? `${lang.call} ${chalokData.fleetName}` : `${lang.call} ${chalokData.fleetName}`}
                </button>
              </div>
            </>
          ) : (
            <>
              {chalokData.user?.photoUrl && (
                <img
                  src={chalokData.user.photoUrl}
                  alt="Chalok"
                  className={styles.profileImage}
                />
              )}
              <div className={styles.tableContainer}>
                <div className={styles.tableRow}>
                  <span className={styles.tableLabel}>{lang.name}</span>
                  <span className={styles.tableDetail}>{chalokData.user?.name || 'N/A'}</span>
                </div>
                <div className={styles.tableRow}>
                  <span className={styles.tableLabel}>{lang.contact}</span>
                  <button
                    className={styles.successButton}
                    onClick={() => {
                      if (chalokData.user?.contact) {
                        window.location.href = `tel:${chalokData.user.contact}`;
                      } else {
                        window.alert(`${lang.error}: ${isBangla ? 'যোগাযোগ নম্বর উপলব্ধ নয়' : 'Contact number not available'}`);
                      }
                    }}
                  >
                    {lang.call}
                  </button>
                </div>
                {chalokData.vehicles && (
                  <>
                    <div className={styles.tableRow}>
                      <span className={styles.tableLabel}>{lang.vehicleType}</span>
                      <span className={styles.tableDetail}>{chalokData.vehicles.vehicle || 'N/A'}</span>
                    </div>
                    <div className={styles.tableRow}>
                      <span className={styles.tableLabel}>{lang.registrationNumber}</span>
                      <span className={styles.tableDetail}>{chalokData.vehicles.registration_number || 'N/A'}</span>
                    </div>
                    <div className={styles.tableRow}>
                      <span className={styles.tableLabel}>{lang.modelName}</span>
                      <span className={styles.tableDetail}>{chalokData.vehicles.model_name || 'N/A'}</span>
                    </div>
                    <div className={styles.tableRow}>
                      <span className={styles.tableLabel}>{lang.engineCapacity}</span>
                      <span className={styles.tableDetail}>
                        {chalokData.vehicles.engine_capacity ? `${chalokData.vehicles.engine_capacity} cc` : 'N/A'}
                      </span>
                    </div>
                    <div className={styles.tableRow}>
                      <span className={styles.tableLabel}>{lang.color}</span>
                      <span className={styles.tableDetail}>{chalokData.vehicles.color || 'N/A'}</span>
                    </div>
                    <div className={styles.tableRow}>
                      <span className={styles.tableLabel}>{lang.modelYear}</span>
                      <span className={styles.tableDetail}>{chalokData.vehicles.model_year || 'N/A'}</span>
                    </div>
                  </>
                )}
              </div>
            </>
          )}

          <h2 className={`${styles.title} ${styles.titleSection}`}>{lang.requestDetails}</h2>
          <div className={styles.detailsContainer}>
            <div>
              <div className={styles.detailGroup}>
                <span className={styles.label}>{lang.rentalRequestID}</span>
                <span className={styles.detailText}>{tripData.rentRequestID}</span>
              </div>
              <div className={styles.detailGroup}>
                <span className={styles.label}>{lang.rentType}</span>
                <span className={styles.detailText}>
                  {isBangla
                    ? tripData.rentType === 'One-Way'
                      ? 'একমুখী'
                      : tripData.rentType === 'Round Trip'
                      ? 'ফিরতি'
                      : 'ঘণ্টাভিত্তিক'
                    : tripData.rentType}
                </span>
              </div>
              <div className={styles.detailGroup}>
                <span className={styles.label}>{lang.numberOfPassengers}</span>
                <span className={styles.detailText}>{tripData.numberOfPassengers}</span>
              </div>
              <div className={styles.detailGroup}>
                <span className={styles.label}>{lang.startingLocation}</span>
                <span className={styles.detailText}>{tripData.startLocation}</span>
              </div>
              {tripData.rentType !== 'Hourly' && (
                <div className={styles.detailGroup}>
                  <span className={styles.label}>{lang.endingLocation}</span>
                  <span className={styles.detailText}>{tripData.endLocation || 'N/A'}</span>
                </div>
              )}
              <div className={styles.detailGroup}>
                <span className={styles.label}>{lang.startDateTime}</span>
                <span className={styles.detailText}>{tripData.startDateTime}</span>
              </div>
              {tripData.rentType === 'Round Trip' && (
                <div className={styles.detailGroup}>
                  <span className={styles.label}>{lang.returnDateTime}</span>
                  <span className={styles.detailText}>{tripData.returnDateTime || 'N/A'}</span>
                </div>
              )}
              {tripData.rentType === 'Hourly' && (
                <div className={styles.detailGroup}>
                  <span className={styles.label}>{lang.tripDuration}</span>
                  <span className={styles.detailText}>
                    {isBangla ? `${tripData.tripDuration} ঘণ্টা` : `${tripData.tripDuration} hours`}
                  </span>
                </div>
              )}
              <div className={styles.detailGroup}>
                <span className={styles.label}>{lang.favouredVehicle}</span>
                <span className={styles.detailText}>{tripData.favouredVehicle}</span>
              </div>
              <div className={styles.detailGroup}>
                <span className={styles.label}>{lang.createDate}</span>
                <span className={styles.detailText}>{tripData.created_at}</span>
              </div>
              <div className={styles.detailGroup}>
                <span className={styles.label}>{lang.finalFare}</span>
                <span className={styles.detailText}>{finalFare ? `${finalFare} ৳` : 'N/A'}</span>
              </div>
              <button className={styles.primaryButton} onClick={() => navigate('/home')}>
                {lang.backToHome}
              </button>
            </div>
          </div>
        </div>
      </div>
      <FooterWhite isBangla={isBangla} />
    </div>
  );
};

export default SelectedChalok;
