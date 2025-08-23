import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HeaderWhite from '../../components/headerwhite';
import MobileNav from '../../components/mobilenav';
import FooterWhite from '../../components/footerwhite';
import styles from './RequestDetails.module.css';

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
    offeredFares: 'Offered Fares',
    requestDetails: 'Request Details',
    rentalRequestID: 'Rental Request ID:',
    createDate: 'Create Date:',
    cancelRequest: 'Cancel Request',
    noRequestFound: 'No rental request found',
    goBack: 'Go Back',
    details: 'Details',
    name: 'Name:',
    contact: 'Contact:',
    call: 'Call',
    vehicleType: 'Vehicle Type:',
    registrationNumber: 'Registration Number:',
    modelName: 'Model Name:',
    engineCapacity: 'Engine Capacity:',
    color: 'Color:',
    modelYear: 'Model Year:',
    offeredFare: 'Offered Fare:',
    selectChalok: 'Select Chalok',
    selectFleet: 'Select Fleet',
    close: 'Close',
    finalFare: 'Final Fare:',
    enterFare: 'Enter fare',
    warning: 'Please put fare after you have talked to the chalok/fleet and both agreed.',
    confirmSelection: 'Confirm Selection',
    confirmMessage: (fare) => `Are you sure you want to select this chalok/fleet for ${fare} BDT?`,
    sendRequest: 'Send Request',
    invalidFare: 'Please enter a valid fare',
    failedRequest: 'Failed to send request. Please try again.',
    retry: 'Retry',
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
    offeredFares: 'প্রদত্ত ভাড়া',
    requestDetails: 'অনুরোধের বিস্তারিত',
    rentalRequestID: 'ভাড়ার অনুরোধ আইডি:',
    createDate: 'তৈরির তারিখ:',
    cancelRequest: 'বাতিল করুন',
    noRequestFound: 'কোনো অনুরোধ পাওয়া যায়নি',
    goBack: 'ফিরে যান',
    details: 'বিস্তারিত',
    name: 'নাম:',
    contact: 'যোগাযোগ:',
    call: 'কল করুন',
    vehicleType: 'যানের ধরন:',
    registrationNumber: 'রেজিস্ট্রেশন নম্বর:',
    modelName: 'মডেল নাম:',
    engineCapacity: 'ইঞ্জিন ক্যাপাসিটি:',
    color: 'রঙ:',
    modelYear: 'মডেল বছর:',
    offeredFare: 'প্রদত্ত ভাড়া:',
    selectChalok: 'চালক নির্বাচন করুন',
    selectFleet: 'ফ্লিট নির্বাচন করুন',
    close: 'বন্ধ করুন',
    finalFare: 'চূড়ান্ত ভাড়া:',
    enterFare: 'ভাড়া লিখুন',
    warning: 'চালক/ফ্লিটের সাথে কথা বলার পর এবং উভয়ের সম্মতিতে ভাড়া নির্ধারণ করুন।',
    confirmSelection: 'নিশ্চিত করুন',
    confirmMessage: (fare) => `আপনি কি ${fare} টাকায় এই চালক/ফ্লিটকে নির্বাচন করতে চান?`,
    sendRequest: 'অনুরোধ পাঠান',
    invalidFare: 'বৈধ ভাড়া লিখুন',
    failedRequest: 'অনুরোধ পাঠাতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।',
    retry: 'পুনরায় চেষ্টা করুন',
  },
};

const RequestDetails = () => {
  const navigate = useNavigate();
  const [isBangla, setIsBangla] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [tripData, setTripData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFare, setSelectedFare] = useState(null);
  const [finalFareModalVisible, setFinalFareModalVisible] = useState(false);
  const [finalFare, setFinalFare] = useState('');

  const lang = translations[isBangla ? 'bn' : 'en'];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const fetchRentalRequest = async () => {
    try {
      const storedUser = localStorage.getItem('user');
      const storedUserID = storedUser ? JSON.parse(storedUser).userID : null;
      if (!storedUserID) {
        window.alert(lang.userIdMissing);
        navigate('/signin');
        return;
      }

      setLoading(true);
      const response = await axios.get(`https://api.holoapp.tech:3000/api/getRentalRequest/${storedUserID}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      console.log('API response:', response.data[0]);

      if (response.data[0].chalokID && response.data[0].chalokID.length > 0) {
        const rentRequestID = response.data[0].rentRequestID;
        const chalokIds = response.data[0].chalokID
          .filter(chalok => chalok !== null && (chalok.userID || chalok.fleetName))
          .map(chalok => chalok.userID || chalok.fleetName);

        console.log('validRentalOfferChalokDetails Input:', { rentID: rentRequestID, chalokIDs: chalokIds });

        const validChalokResponse = await axios.post(
          `https://api.holoapp.tech:3000/api/validRentalOfferChalokDetails`,
          { rentID: rentRequestID, chalokIDs: chalokIds },
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        );

        console.log('validRentalOfferChalokDetails Output:', validChalokResponse.data);

        const sortedChalok = response.data[0].chalokID
          .filter(chalok => chalok !== null && validChalokResponse.data.validChalokIDs.includes(chalok.userID || chalok.fleetName))
          .sort((a, b) => parseFloat(a.offerFare) - parseFloat(b.offerFare));

        const chalokInfoPromises = sortedChalok.map(async (chalok) => {
          const id = chalok.userID || chalok.fleetName;
          if (id.startsWith('H-')) {
            const chalokResponse = await axios.get(`https://api.holoapp.tech:3000/api/rentalVehicleDetails/${id}`, {
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: true,
            });
            console.log('Chalok Response:', chalokResponse.data);
            return { ...chalokResponse.data, offerFare: chalok.offerFare, userID: id, type: 'chalok' };
          } else {
            const fleetResponse = await axios.get(`https://api.holoapp.tech:3000/api/rentalFleetDetails/${id}`, {
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: true,
            });
            console.log('Fleet Response:', fleetResponse.data);
            return { ...fleetResponse.data, offerFare: chalok.offerFare, userID: id, type: 'fleet' };
          }
        });

        const chalokData = await Promise.all(chalokInfoPromises);
        setTripData({ ...response.data[0], chalokInfo: chalokData });
      } else {
        setTripData(response.data[0]);
      }
    } catch (error) {
      console.error('Error fetching rental request:', error.response ? error.response.data : error.message);
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

  useEffect(() => {
    fetchRentalRequest();
  }, [navigate, lang]);

  const cancelRentalRequest = async () => {
    if (window.confirm(`${lang.cancelRequest}\n${lang.confirmMessage('')}`)) {
      try {
        const storedUser = localStorage.getItem('user');
        const storedUserID = storedUser ? JSON.parse(storedUser).userID : null;
        if (!storedUserID) {
          window.alert(lang.userIdMissing);
          navigate('/signin');
          return;
        }

        const response = await axios.put(
          'https://api.holoapp.tech:3000/api/cancelRentalRequest',
          { userID: storedUserID, rentRequestID: tripData.rentRequestID },
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        );

        console.log('Cancel request response:', response.data);
        navigate('/');
      } catch (error) {
        console.error('Error canceling rental request:', error.response ? error.response.data : error.message);
        if (error.response?.status === 401) {
          localStorage.removeItem('user');
          navigate('/signin');
        } else if (error.response?.status === 429) {
          window.alert('Too many requests. Please try again later.');
        } else {
          window.alert(`${lang.error}: ${lang.failedRequest}`);
        }
      }
    }
  };

  const handleSelectChalok = async () => {
    if (!finalFare || isNaN(finalFare)) {
      window.alert(`${lang.error}: ${lang.invalidFare}`);
      return;
    }

    if (window.confirm(`${lang.confirmSelection}\n${lang.confirmMessage(finalFare)}`)) {
      try {
        const storedUser = localStorage.getItem('user');
        const storedUserID = storedUser ? JSON.parse(storedUser).userID : null;
        if (!storedUserID) {
          window.alert(lang.userIdMissing);
          navigate('/signin');
          return;
        }

        console.log('Selected Chalok:', selectedFare);
        console.log('Final Fare:', finalFare);
        console.log('Stored User ID:', storedUserID);
        console.log('Rental Request ID:', tripData.rentRequestID);

        const response = await axios.put(
          'https://api.holoapp.tech:3000/api/selectChalokRentalRequest',
          {
            rentRequestID: tripData.rentRequestID,
            finalFare: finalFare,
            chalokID: selectedFare.userID,
            jatriID: storedUserID,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        );

        console.log('Select Chalok/Fleet Response:', response.data);
        setFinalFareModalVisible(false);
        setModalVisible(false);
        navigate('/selected-chalok');
      } catch (error) {
        console.error('Error selecting chalok/fleet:', error.response ? error.response.data : error.message);
        if (error.response?.status === 401) {
          localStorage.removeItem('user');
          navigate('/signin');
        } else if (error.response?.status === 429) {
          window.alert('Too many requests. Please try again later.');
        } else {
          window.alert(`${lang.error}: ${lang.failedRequest}`);
        }
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

  if (!tripData) {
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
            <button className={styles.secondaryButton} onClick={fetchRentalRequest}>
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
            {isBangla ? 'আপনার ভাড়ার অনুরোধ' : 'Your Rental Request'}
          </h1>
          {tripData.chalokInfo && Array.isArray(tripData.chalokInfo) && tripData.chalokInfo.length > 0 && (
            <>
              <h2 className={styles.title}>{lang.offeredFares}</h2>
              <div className={styles.fareList}>
                {tripData.chalokInfo.map((chalok, index) => (
                  chalok && chalok.offerFare ? (
                    <button
                      key={index}
                      className={styles.fareButton}
                      onClick={() => {
                        setSelectedFare(chalok);
                        setModalVisible(true);
                      }}
                    >
                      {chalok.type === 'fleet' ? `${chalok.name || chalok.fleet?.name || chalok.userID || 'Fleet'} - ` : ''}
                      {chalok.offerFare} ৳
                    </button>
                  ) : null
                ))}
              </div>
            </>
          )}

          <h2 className={`${styles.title} ${styles.titleSection}`}>{lang.requestDetails}</h2>
          <div className={styles.detailsContainer}>
            <div>
              {tripData.rentRequestID && (
                <div className={styles.detailGroup}>
                  <span className={styles.label}>{lang.rentalRequestID}</span>
                  <span className={styles.detailText}>{tripData.rentRequestID}</span>
                </div>
              )}
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
              <button className={styles.dangerButton} onClick={cancelRentalRequest}>
                {lang.cancelRequest}
              </button>
            </div>
          </div>
        </div>
      </div>

      {modalVisible && (
        <div className={styles.modalContainer}>
          <div className={styles.modalContent}>
            {selectedFare && (
              <>
                {selectedFare.user?.photoUrl && selectedFare.type === 'chalok' && (
                  <img
                    src={selectedFare.user.photoUrl}
                    alt="Chalok"
                    className={styles.profileImage}
                  />
                )}
                <h3 className={styles.modalTitle}>
                  {selectedFare.type === 'fleet' ? (isBangla ? 'ফ্লিট বিস্তারিত' : 'Fleet Details') : lang.details}
                </h3>
                <div className={styles.tableContainer}>
                  <div className={styles.tableRow}>
                    <span className={styles.tableLabel}>
                      {selectedFare.type === 'fleet' ? (isBangla ? 'ফ্লিট নাম' : 'Fleet Name') : lang.name}
                    </span>
                    <span className={styles.tableDetail}>
                      {selectedFare.user?.name || selectedFare.name || selectedFare.fleet?.name || selectedFare.userID || 'N/A'}
                    </span>
                  </div>
                  <div className={styles.tableRow}>
                    <span className={styles.tableLabel}>{lang.contact}</span>
                    <button
                      className={styles.successButton}
                      onClick={() => {
                        const phoneNumber = selectedFare.user?.contact || selectedFare.contact || selectedFare.fleet?.contact;
                        if (phoneNumber) {
                          window.location.href = `tel:${phoneNumber}`;
                        } else {
                          window.alert(`${lang.error}: ${isBangla ? 'যোগাযোগ নম্বর উপলব্ধ নয়' : 'Contact number not available'}`);
                        }
                      }}
                    >
                      {lang.call}
                    </button>
                  </div>
                  {selectedFare.type === 'fleet' && (
                    <div className={styles.tableRow}>
                      <span className={styles.tableLabel}>{isBangla ? 'যানবাহনের সংখ্যা' : 'Number of Vehicles'}</span>
                      <span className={styles.tableDetail}>
                        {selectedFare.vehicle !== undefined ? selectedFare.vehicle : selectedFare.fleet?.numberOfVehicles || 'N/A'}
                      </span>
                    </div>
                  )}
                  {selectedFare.vehicles && (
                    <>
                      <div className={styles.tableRow}>
                        <span className={styles.tableLabel}>{lang.vehicleType}</span>
                        <span className={styles.tableDetail}>{selectedFare.vehicles.vehicle || 'N/A'}</span>
                      </div>
                      <div className={styles.tableRow}>
                        <span className={styles.tableLabel}>{lang.registrationNumber}</span>
                        <span className={styles.tableDetail}>{selectedFare.vehicles.registration_number || 'N/A'}</span>
                      </div>
                      <div className={styles.tableRow}>
                        <span className={styles.tableLabel}>{lang.modelName}</span>
                        <span className={styles.tableDetail}>{selectedFare.vehicles.model_name || 'N/A'}</span>
                      </div>
                      <div className={styles.tableRow}>
                        <span className={styles.tableLabel}>{lang.engineCapacity}</span>
                        <span className={styles.tableDetail}>
                          {selectedFare.vehicles.engine_capacity ? `${selectedFare.vehicles.engine_capacity} cc` : 'N/A'}
                        </span>
                      </div>
                      <div className={styles.tableRow}>
                        <span className={styles.tableLabel}>{lang.color}</span>
                        <span className={styles.tableDetail}>{selectedFare.vehicles.color || 'N/A'}</span>
                      </div>
                      <div className={styles.tableRow}>
                        <span className={styles.tableLabel}>{lang.modelYear}</span>
                        <span className={styles.tableDetail}>{selectedFare.vehicles.model_year || 'N/A'}</span>
                      </div>
                    </>
                  )}
                  <div className={styles.tableRow}>
                    <span className={styles.tableLabel}>{lang.offeredFare}</span>
                    <span className={styles.tableDetail}>{selectedFare.offerFare ? `${selectedFare.offerFare} ৳` : 'N/A'}</span>
                  </div>
                </div>
                <div className={styles.buttonGroup}>
                  <button
                    className={styles.primaryButton}
                    onClick={() => setFinalFareModalVisible(true)}
                  >
                    {selectedFare.type === 'fleet' ? lang.selectFleet : lang.selectChalok}
                  </button>
                  <button
                    className={styles.secondaryButton}
                    onClick={() => setModalVisible(false)}
                  >
                    {lang.close}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {finalFareModalVisible && (
        <div className={styles.modalContainer}>
          <div className={styles.modalContent}>
            <p className={styles.warningText}>{lang.warning}</p>
            <div className={styles.inputWrapper}>
              <label className={styles.inputLabel}>{lang.finalFare}</label>
              <input
                type="number"
                className={styles.fareInput}
                value={finalFare}
                onChange={(e) => setFinalFare(e.target.value)}
                placeholder={lang.enterFare}
              />
            </div>
            <div className={styles.buttonGroup}>
              <button
                className={styles.primaryButton}
                onClick={handleSelectChalok}
              >
                {lang.sendRequest}
              </button>
              <button
                className={styles.dangerButton}
                onClick={() => setFinalFareModalVisible(false)}
              >
                {lang.cancel}
              </button>
            </div>
          </div>
        </div>
      )}

      <FooterWhite isBangla={isBangla} />
    </div>
  );
};

export default RequestDetails;
