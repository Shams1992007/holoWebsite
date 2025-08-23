import React, { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form'; // Add react-hook-form
import axios from 'axios';
import Select from 'react-select';
import HeaderWhite from '../../components/headerwhite';
import MobileNav from '../../components/mobilenav';
import FooterWhite from '../../components/footerwhite';
import styles from './PassengerDetails.module.css';
import districtData from '../../components/district.json';
import subdistrictData from '../../components/subdistrict.json';
import unionData from '../../components/union.json';
import { debounce } from 'lodash';
  
const PassengerDetails = () => {    
  const navigate = useNavigate();
  const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      numberOfPassengers: '',
      startingLocation: '',
      startingDistrict: '',
      startingSubdistrict: '',
      startingUnion: '',
      endingLocation: '',
      endingDistrict: '',
      endingSubdistrict: '',
      endingUnion: '',
      exactPickupPoint: '',
      exactDestinationPoint: '',
      startDay: '',
      startMonth: '',
      startYear: '',
      startHour: '',
      startMinute: '',
      rentType: '',
      returnDay: '',
      returnMonth: '',
      returnYear: '',
      returnHour: '',
      returnMinute: '',
      tripDuration: '',
      favouredVehicle: '',
    },
  });
  const [isBangla, setIsBangla] = useState(false);
  const [startModalVisible, setStartModalVisible] = useState(false);
  const [endModalVisible, setEndModalVisible] = useState(false);
  const [availableVehicles, setAvailableVehicles] = useState([]);
  const [tempStartData, setTempStartData] = useState({
    division: '',
    district: '',
    subdistrict: '',
    union: '',
  });
  const [tempEndData, setTempEndData] = useState({
    division: '',
    district: '',
    subdistrict: '',
    union: '',
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const menuRef = useRef();

  // translations and other unchanged imports remain the same
const translations = {
    en: {
      numberOfPassengers: 'Number of Passengers',
      rentType: 'Rent Type',
      startingLocation: 'Starting Division',
      startingDistrict: 'Starting District',
      startingSubdistrict: 'Starting Subdistrict',
      exactPickupPoint: 'Exact Pickup Point',
      endingLocation: 'Ending Division',
      endingDistrict: 'Ending District',
      endingSubdistrict: 'Ending Subdistrict',
      exactDestinationPoint: 'Exact Destination Point',
      startDay: 'Start Day',
      startMonth: 'Start Month',
      startYear: 'Start Year',
      startHour: 'Start Hour',
      startMinute: 'Start Minute',
      returnDateTime: 'Return Date and Time',
      tripDuration: 'Trip Duration',
      favouredVehicle: 'Favoured Vehicle',
      error: 'Error',
      success: 'Success',
      planTrip: 'Plan Trip',
      select: 'Select',
      division: 'Division',
      district: 'District',
      subdistrict: 'Subdistrict',
      save: 'Save',
      cancel: 'Cancel',
      userIdMissing: 'User ID is missing. Please log in again.',
      fetchFailed: 'Failed to fetch vehicle data.',
    },
    bn: {
      numberOfPassengers: 'যাত্রী সংখ্যা',
      rentType: 'ভাড়ার ধরন',
      startingLocation: 'শুরুর বিভাগ',
      startingDistrict: 'শুরুর জেলা',
      startingSubdistrict: 'শুরুর উপজেলা',
      exactPickupPoint: 'সঠিক পিকআপ স্থান',
      endingLocation: 'গন্তব্য বিভাগ',
      endingDistrict: 'গন্তব্য জেলা',
      endingSubdistrict: 'গন্তব্য উপজেলা',
      exactDestinationPoint: 'সঠিক গন্তব্য',
      startDay: 'যাত্রা দিন',
      startMonth: 'যাত্রা মাস',
      startYear: 'যাত্রা বছর',
      startHour: 'যাত্রা ঘণ্টা',
      startMinute: 'যাত্রা মিনিট',
      returnDateTime: 'ফিরতি তারিখ ও সময়',
      tripDuration: 'ভাড়ার সময়কাল',
      favouredVehicle: 'পছন্দের গাড়ি',
      error: 'ত্রুটি',
      success: 'সাফল্য',
      planTrip: 'ট্রিপ প্ল্যান তৈরি করুন',
      select: 'নির্বাচন করুন',
      division: 'বিভাগ',
      district: 'জেলা',
      subdistrict: 'উপজেলা',
      save: 'সংরক্ষণ',
      cancel: 'বাতিল',
      userIdMissing: 'ব্যবহারকারীর আইডি অনুপস্থিত। দয়া করে আবার লগ ইন করুন।',
      fetchFailed: 'গাড়ির তথ্য ফেচ করতে ব্যর্থ হয়েছে।',
    },
  };

  const lang = useMemo(() => (isBangla ? translations.bn : translations.en), [isBangla]);

  // Memoized options (unchanged)
  const divisionOptions = useMemo(() => Object.keys(districtData).map(division => ({ value: division, label: division })), []);
  const days = useMemo(() => Array.from({ length: 31 }, (_, i) => ({ value: (i + 1).toString().padStart(2, '0'), label: (i + 1).toString().padStart(2, '0') })), []);
  const months = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    value: new Date(2000, i, 1).toLocaleString('en', { month: 'long' }),
    label: new Date(2000, i, 1).toLocaleString('en', { month: 'long' }),
  })), []);
  const years = useMemo(() => ['2025', '2026'].map(year => ({ value: year, label: year })), []);
  const hours = useMemo(() => Array.from({ length: 24 }, (_, i) => {
    const hour = i % 12 === 0 ? 12 : i % 12;
    const period = i < 12 ? 'AM' : 'PM';
    return { value: `${hour.toString().padStart(2, '0')} ${period}`, label: `${hour.toString().padStart(2, '0')} ${period}` };
  }), []);
  const minutes = useMemo(() => ['00', '15', '30', '45'].map(min => ({ value: min, label: min })), []);
  const rentTypeOptions = useMemo(() => [
    { value: '', label: lang.select },
    { value: 'One-Way', label: isBangla ? 'একমুখী' : 'One-Way' },
    { value: 'Round Trip', label: isBangla ? 'ফিরতি' : 'Round Trip' },
    { value: 'Hourly', label: isBangla ? 'ঘণ্টাভিত্তিক' : 'Hourly' },
  ], [lang, isBangla]);
  const passengerOptions = useMemo(() => [
    { value: '', label: lang.select },
    ...Array.from({ length: 14 }, (_, i) => ({ value: (i + 1).toString(), label: (i + 1).toString() })),
  ], [lang]);
  const vehicleOptions = useMemo(() => [
    { value: '', label: lang.select },
    ...availableVehicles
    .filter(vehicle => !['Motorcycle', 'CNG'].includes(vehicle.type))
    .map(vehicle => ({ value: vehicle.type, label: vehicle.type })),    
  ], [lang, availableVehicles]);
  const tripDurationOptions = useMemo(() => [
    { value: '', label: lang.select },
    ...Array.from({ length: 23 }, (_, i) => ({ value: (i + 1).toString(), label: (i + 1).toString() })),
  ], [lang]);

  // Watch rentType for conditional rendering
  const rentType = watch('rentType');

  // checkJatriStatus
  const checkJatriStatus = useCallback(
    debounce(async () => {
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
          }
          setLoading(false);
          return;
        }

        const user = localStorage.getItem('user');
        const userID = user ? JSON.parse(user).userID : null;
        if (!userID) {
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
        }
      } catch (error) {
        localStorage.removeItem('user');
        navigate('/signin');
      }
      setLoading(false);
    }, 2000),
    [navigate, lang, setLoading]
  );

  useEffect(() => {
    checkJatriStatus();
    return () => {
      checkJatriStatus.cancel();
    };
  }, [checkJatriStatus]);

  // fetchVehicles (unchanged)
  useEffect(() => {
    const fetchVehicles = debounce(async () => {
      try {
        const cachedVehicles = localStorage.getItem('availableVehicles');
        if (cachedVehicles) {
          setAvailableVehicles(JSON.parse(cachedVehicles));
          setLoading(false);
          return;
        }

        const user = localStorage.getItem('user');
        const userID = user ? JSON.parse(user).userID : null;
        if (!userID) {
          window.alert(`${lang.error}: ${lang.userIdMissing}`);
          navigate('/signin');
          return;
        }

        const response = await axios.post('https://api.holoapp.tech:3000/api/getAllAvailableVehicles', {}, {
          withCredentials: true,
        });
        setAvailableVehicles(response.data);
        localStorage.setItem('availableVehicles', JSON.stringify(response.data));
      } catch (error) {
        console.error('Error fetching vehicles:', error);
        if (error.response && error.response.status === 401) {
          window.alert(`${lang.error}: ${lang.userIdMissing}`);
          localStorage.removeItem('user');
          navigate('/signin');
        } else if (error.response && error.response.status === 429) {
          window.alert(`${lang.error}: Too many requests. Please try again later.`);
        } else {
          window.alert(`${lang.error}: ${lang.fetchFailed}`);
        }
        setLoading(false);
      }
    }, 500);

    fetchVehicles();
    return () => {
      fetchVehicles.cancel();
    };
  }, [navigate, isBangla]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const handleOutsideClick = useCallback((event) => {
    if (isMobileMenuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [handleOutsideClick]);

  const handleSaveStartLocation = useCallback(() => {
    setValue('startingLocation', tempStartData.division);
    setValue('startingDistrict', tempStartData.district);
    setValue('startingSubdistrict', tempStartData.subdistrict);
    setValue('startingUnion', tempStartData.union);
    setStartModalVisible(false);
  }, [tempStartData, setValue]);

  const handleSaveEndLocation = useCallback(() => {
    setValue('endingLocation', tempEndData.division);
    setValue('endingDistrict', tempEndData.district);
    setValue('endingSubdistrict', tempEndData.subdistrict);
    setValue('endingUnion', tempEndData.union);
    setEndModalVisible(false);
  }, [tempEndData, setValue]);

  const onSubmit = useCallback((data) => {
    const missingFields = [];
    if (!data.numberOfPassengers) missingFields.push(lang.numberOfPassengers);
    if (!data.rentType) missingFields.push(lang.rentType);
    if (!data.startingLocation) missingFields.push(lang.startingLocation);
    if (!data.startingDistrict) missingFields.push(lang.startingDistrict);
    if (!data.startingSubdistrict) missingFields.push(lang.startingSubdistrict);
    if (!data.exactPickupPoint) missingFields.push(lang.exactPickupPoint);
    if (data.rentType !== 'Hourly' && !data.endingLocation) missingFields.push(lang.endingLocation);
    if (data.rentType !== 'Hourly' && !data.endingDistrict) missingFields.push(lang.endingDistrict);
    if (data.rentType !== 'Hourly' && !data.endingSubdistrict) missingFields.push(lang.endingSubdistrict);
    if (data.rentType !== 'Hourly' && !data.exactDestinationPoint) missingFields.push(lang.exactDestinationPoint);
    if (!data.startDay) missingFields.push(lang.startDay);
    if (!data.startMonth) missingFields.push(lang.startMonth);
    if (!data.startYear) missingFields.push(lang.startYear);
    if (!data.startHour) missingFields.push(lang.startHour);
    if (!data.startMinute) missingFields.push(lang.startMinute);
    if (data.rentType === 'Round Trip' && (!data.returnDay || !data.returnMonth || !data.returnYear || !data.returnHour || !data.returnMinute)) {
      missingFields.push(lang.returnDateTime);
    }
    if (data.rentType === 'Hourly' && !data.tripDuration) missingFields.push(lang.tripDuration);
    if (!data.favouredVehicle) missingFields.push(lang.favouredVehicle);

    if (missingFields.length > 0) {
      window.alert(`${lang.error}: ${isBangla ? 'অনুপস্থিত ক্ষেত্র' : 'Missing fields'}: ${missingFields.join(', ')}`);
      return;
    }

    const startDateTime = `${data.startYear}-${data.startMonth}-${data.startDay} ${data.startHour}:${data.startMinute}`;
    let message = isBangla
      ? `ট্রিপ প্ল্যান সফলভাবে তৈরি হয়েছে! শুরু: ${startDateTime}`
      : `Trip plan created successfully! Start: ${startDateTime}`;

    if (data.rentType === 'Round Trip') {
      const returnDateTime = `${data.returnYear}-${data.returnMonth}-${data.returnDay} ${data.returnHour}:${data.returnMinute}`;
      message += isBangla ? `\nফিরতি: ${returnDateTime}` : `\nReturn: ${returnDateTime}`;
    } else if (data.rentType === 'Hourly') {
      message += isBangla ? `\nসময়কাল: ${data.tripDuration} ঘণ্টা` : `\nDuration: ${data.tripDuration} hours`;
    }

    window.alert(message);
    navigate('/rent-details', { state: { tripData: data } });
  }, [isBangla, lang, navigate]);

  // LocationModal (unchanged)
  const LocationModal = memo(({ visible, onClose, onSave, tempData, setTempData, isStart }) => {
    const districtsList = useMemo(() => tempData.division ? districtData[tempData.division] || [] : [], [tempData.division]);
    const subdistrictsList = useMemo(() => 
      tempData.division && tempData.district 
        ? subdistrictData[tempData.division]?.[tempData.district] || [] 
        : [], 
      [tempData.division, tempData.district]
    );
    const unionsList = useMemo(() => 
      tempData.division && tempData.district && tempData.subdistrict 
        ? unionData[tempData.division]?.[tempData.district]?.[tempData.subdistrict] || [] 
        : [], 
      [tempData.division, tempData.district, tempData.subdistrict]
    );

    const divisionOptions = useMemo(() => Object.keys(districtData).map(division => ({ value: division, label: division })), []);
    const districtOptions = useMemo(() => districtsList.map(district => ({ value: district, label: district })), [districtsList]);
    const subdistrictOptions = useMemo(() => subdistrictsList.map(subdistrict => ({ value: subdistrict, label: subdistrict })), [subdistrictsList]);
    const unionOptions = useMemo(() => unionsList.map(union => ({ value: union, label: union })), [unionsList]);

    if (!visible) return null;

    return (
      <div className={styles.modalContainer}>
        <div className={styles.modalContent}>
          <h3 className={styles.formTitle}>{isBangla ? 'অবস্থান নির্বাচন করুন' : 'Select Location'}</h3>
          <div className={styles.formGroup}>
            <label className={styles.label}>{lang.division}</label>
            <Select
              options={[{ value: '', label: lang.select }, ...divisionOptions]}
              value={divisionOptions.find(opt => opt.value === tempData.division) || { value: '', label: lang.select }}
              onChange={(selected) => setTempData(prev => ({ ...prev, division: selected.value, district: '', subdistrict: '', union: '' }))}
              classNamePrefix="react-select"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>{lang.district}</label>
            <Select
              options={[{ value: '', label: lang.select }, ...districtOptions]}
              value={districtOptions.find(opt => opt.value === tempData.district) || { value: '', label: lang.select }}
              onChange={(selected) => setTempData(prev => ({ ...prev, district: selected.value, subdistrict: '', union: '' }))}
              isDisabled={districtsList.length === 0}
              classNamePrefix="react-select"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>{lang.subdistrict}</label>
            <Select
              options={[{ value: '', label: lang.select }, ...subdistrictOptions]}
              value={subdistrictOptions.find(opt => opt.value === tempData.subdistrict) || { value: '', label: lang.select }}
              onChange={(selected) => setTempData(prev => ({ ...prev, subdistrict: selected.value, union: '' }))}
              isDisabled={subdistrictsList.length === 0}
              classNamePrefix="react-select"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>{lang.union}</label>
            <Select
              options={[{ value: '', label: lang.select }, ...unionOptions]}
              value={unionOptions.find(opt => opt.value === tempData.union) || { value: '', label: lang.select }}
              onChange={(selected) => setTempData(prev => ({ ...prev, union: selected.value }))}
              isDisabled={unionsList.length === 0}
              classNamePrefix="react-select"
            />
          </div>
          <div className={styles.modalButtons}>
            <button className={`${styles.modalButton} ${styles.saveButton}`} onClick={onSave}>
              {lang.save}
            </button>
            <button className={`${styles.modalButton} ${styles.cancelButton}`} onClick={onClose}>
              {lang.cancel}
            </button>
          </div>
        </div>
      </div>
    );
  });

  if (loading) {
    return (
      <div className={styles.pageWrapper}>
        <HeaderWhite
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
          isBangla={isBangla}
          setIsBangla={setIsBangla}
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
      <div ref={menuRef}>
        <MobileNav isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />
      </div>
      <div className={`${styles.utilizeOverlay} ${isMobileMenuOpen ? '' : styles.hidden}`} />
      <div className={styles.landingArea}>
        <div className={styles.container}>
          <h2 className={styles.formTitle}>{lang.planTrip}</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formGroup}>
              <label className={styles.label}>{lang.rentType}</label>
              <Controller
                name="rentType"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    options={rentTypeOptions}
                    value={rentTypeOptions.find(opt => opt.value === field.value) || { value: '', label: lang.select }}
                    onChange={(selected) => field.onChange(selected.value)}
                    classNamePrefix="react-select"
                    isClearable
                    menuPortalTarget={document.body}
                  />
                )}
              />
              {errors.rentType && <span className={styles.error}>{lang.rentType} is required</span>}
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>{lang.numberOfPassengers}</label>
              <Controller
                name="numberOfPassengers"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    options={passengerOptions}
                    value={passengerOptions.find(opt => opt.value === field.value) || { value: '', label: lang.select }}
                    onChange={(selected) => field.onChange(selected.value)}
                    classNamePrefix="react-select"
                    isClearable
                    menuPortalTarget={document.body}
                  />
                )}
              />
              {errors.numberOfPassengers && <span className={styles.error}>{lang.numberOfPassengers} is required</span>}
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>{isBangla ? 'শুরু করার স্থান' : 'Starting Location'}</label>
              <button
                type="button"
                className={styles.selectButton}
                onClick={() => {
                  setTempStartData({
                    division: watch('startingLocation'),
                    district: watch('startingDistrict'),
                    subdistrict: watch('startingSubdistrict'),
                    union: watch('startingUnion'),
                  });
                  setStartModalVisible(true);
                }}
              >
                {watch('startingLocation')
                  ? `${watch('startingLocation')}, ${watch('startingDistrict')}, ${watch('startingSubdistrict')}`
                  : lang.select}
              </button>
              {errors.startingLocation && <span className={styles.error}>{lang.startingLocation} is required</span>}
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>{lang.exactPickupPoint}</label>
              <Controller
                name="exactPickupPoint"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <input
                    type="text"
                    className={styles.input}
                    placeholder={isBangla ? 'রোড নম্বর, এলাকার নাম, ল্যান্ডমার্ক' : 'Road no, Area Name, Landmark'}
                    {...field}
                  />
                )}
              />
              {errors.exactPickupPoint && <span className={styles.error}>{lang.exactPickupPoint} is required</span>}
            </div>
            {rentType !== 'Hourly' && (
              <>
                <div className={styles.formGroup}>
                  <label className={styles.label}>{isBangla ? 'শেষ করার স্থান' : 'Ending Location'}</label>
                  <button
                    type="button"
                    className={styles.selectButton}
                    onClick={() => {
                      setTempEndData({
                        division: watch('endingLocation'),
                        district: watch('endingDistrict'),
                        subdistrict: watch('endingSubdistrict'),
                        union: watch('endingUnion'),
                      });
                      setEndModalVisible(true);
                    }}
                  >
                    {watch('endingLocation')
                      ? `${watch('endingLocation')}, ${watch('endingDistrict')}, ${watch('endingSubdistrict')}`
                      : lang.select}
                  </button>
                  {errors.endingLocation && <span className={styles.error}>{lang.endingLocation} is required</span>}
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>{lang.exactDestinationPoint}</label>
                  <Controller
                    name="exactDestinationPoint"
                    control={control}
                    rules={{ required: rentType !== 'Hourly' }}
                    render={({ field }) => (
                      <input
                        type="text"
                        className={styles.input}
                        placeholder={isBangla ? 'রোড নম্বর, এলাকার নাম, ল্যান্ডমার্ক' : 'Road no, Area Name, Landmark'}
                        {...field}
                      />
                    )}
                  />
                  {errors.exactDestinationPoint && <span className={styles.error}>{lang.exactDestinationPoint} is required</span>}
                </div>
              </>
            )}
            <div className={styles.formGroup}>
              <label className={styles.label}>{lang.startDay}</label>
              <div className={styles.dateContainer}>
                <Controller
                  name="startDay"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                        options={[{ value: '', label: isBangla ? 'দিন' : 'Day' }, ...days]}
                        value={days.find(opt => opt.value === field.value) || { value: '', label: isBangla ? 'দিন' : 'Day' }}
                        onChange={(selected) => field.onChange(selected?.value || '')}                      
                        classNamePrefix="react-select"
                        className={styles.dateSelect}
                        isClearable
                        menuPortalTarget={document.body}
                    />
                  )}
                />
                <Controller
                  name="startMonth"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      options={[{ value: '', label: isBangla ? 'মাস' : 'Month' }, ...months]}
                      value={months.find(opt => opt.value === field.value) || { value: '', label: isBangla ? 'মাস' : 'Month' }}
                      onChange={(selected) => field.onChange(selected.value)}
                      classNamePrefix="react-select"
                      className={styles.dateSelect}
                      isClearable
                      menuPortalTarget={document.body}
                    />
                  )}
                />
                <Controller
                  name="startYear"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      options={[{ value: '', label: isBangla ? 'বছর' : 'Year' }, ...years]}
                      value={years.find(opt => opt.value === field.value) || { value: '', label: isBangla ? 'বছর' : 'Year' }}
                      onChange={(selected) => field.onChange(selected.value)}
                      classNamePrefix="react-select"
                      className={styles.dateSelect}
                      isClearable
                      menuPortalTarget={document.body}
                    />
                  )}
                />
              </div>
              {errors.startDay && <span className={styles.error}>{lang.startDay} is required</span>}
              {errors.startMonth && <span className={styles.error}>{lang.startMonth} is required</span>}
              {errors.startYear && <span className={styles.error}>{lang.startYear} is required</span>}
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>{lang.startHour}</label>
              <div className={styles.dateContainer}>
                <Controller
                  name="startHour"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      options={[{ value: '', label: isBangla ? 'ঘণ্টা' : 'Hour' }, ...hours]}
                      value={hours.find(opt => opt.value === field.value) || { value: '', label: isBangla ? 'ঘণ্টা' : 'Hour' }}
                      onChange={(selected) => field.onChange(selected.value)}
                      classNamePrefix="react-select"
                      className={styles.timeSelect}
                      isClearable
                      menuPortalTarget={document.body}
                    />
                  )}
                />
                <Controller
                  name="startMinute"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      options={[{ value: '', label: isBangla ? 'মিনিট' : 'Minute' }, ...minutes]}
                      value={minutes.find(opt => opt.value === field.value) || { value: '', label: isBangla ? 'মিনিট' : 'Minute' }}
                      onChange={(selected) => field.onChange(selected.value)}
                      classNamePrefix="react-select"
                      className={styles.timeSelect}
                      isClearable
                      menuPortalTarget={document.body}
                    />
                  )}
                />
              </div>
              {errors.startHour && <span className={styles.error}>{lang.startHour} is required</span>}
              {errors.startMinute && <span className={styles.error}>{lang.startMinute} is required</span>}
            </div>
            {rentType === 'Round Trip' && (
              <>
                <div className={styles.formGroup}>
                  <label className={styles.label}>{lang.returnDateTime}</label>
                  <div className={styles.dateContainer}>
                    <Controller
                      name="returnDay"
                      control={control}
                      rules={{ required: rentType === 'Round Trip' }}
                      render={({ field }) => (
                        <Select
                          options={[{ value: '', label: isBangla ? 'দিন' : 'Day' }, ...days]}
                          value={days.find(opt => opt.value === field.value) || { value: '', label: isBangla ? 'দিন' : 'Day' }}
                          onChange={(selected) => field.onChange(selected.value)}
                          classNamePrefix="react-select"
                          className={styles.dateSelect}
                          isClearable
                          menuPortalTarget={document.body}
                        />
                      )}
                    />
                    <Controller
                      name="returnMonth"
                      control={control}
                      rules={{ required: rentType === 'Round Trip' }}
                      render={({ field }) => (
                        <Select
                          options={[{ value: '', label: isBangla ? 'মাস' : 'Month' }, ...months]}
                          value={months.find(opt => opt.value === field.value) || { value: '', label: isBangla ? 'মাস' : 'Month' }}
                          onChange={(selected) => field.onChange(selected.value)}
                          classNamePrefix="react-select"
                          className={styles.dateSelect}
                          isClearable
                          menuPortalTarget={document.body}
                        />
                      )}
                    />
                    <Controller
                      name="returnYear"
                      control={control}
                      rules={{ required: rentType === 'Round Trip' }}
                      render={({ field }) => (
                        <Select
                          options={[{ value: '', label: isBangla ? 'বছর' : 'Year' }, ...years]}
                          value={years.find(opt => opt.value === field.value) || { value: '', label: isBangla ? 'বছর' : 'Year' }}
                          onChange={(selected) => field.onChange(selected.value)}
                          classNamePrefix="react-select"
                          className={styles.dateSelect}
                          isClearable
                          menuPortalTarget={document.body}
                        />
                      )}
                    />
                  </div>
                  {errors.returnDay && <span className={styles.error}>{lang.returnDateTime} is required</span>}
                  {errors.returnMonth && <span className={styles.error}>{lang.returnDateTime} is required</span>}
                  {errors.returnYear && <span className={styles.error}>{lang.returnDateTime} is required</span>}
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>{isBangla ? 'ফিরতি সময়' : 'Return Time'}</label>
                  <div className={styles.dateContainer}>
                    <Controller
                      name="returnHour"
                      control={control}
                      rules={{ required: rentType === 'Round Trip' }}
                      render={({ field }) => (
                        <Select
                          options={[{ value: '', label: isBangla ? 'ঘণ্টা' : 'Hour' }, ...hours]}
                          value={hours.find(opt => opt.value === field.value) || { value: '', label: isBangla ? 'ঘণ্টা' : 'Hour' }}
                          onChange={(selected) => field.onChange(selected.value)}
                          classNamePrefix="react-select"
                          className={styles.timeSelect}
                          isClearable
                          menuPortalTarget={document.body}
                        />
                      )}
                    />
                    <Controller
                      name="returnMinute"
                      control={control}
                      rules={{ required: rentType === 'Round Trip' }}
                      render={({ field }) => (
                        <Select
                          options={[{ value: '', label: isBangla ? 'মিনিট' : 'Minute' }, ...minutes]}
                          value={minutes.find(opt => opt.value === field.value) || { value: '', label: isBangla ? 'মিনিট' : 'Minute' }}
                          onChange={(selected) => field.onChange(selected.value)}
                          classNamePrefix="react-select"
                          className={styles.timeSelect}
                          isClearable
                          menuPortalTarget={document.body}
                        />
                      )}
                    />
                  </div>
                  {errors.returnHour && <span className={styles.error}>{lang.returnDateTime} is required</span>}
                  {errors.returnMinute && <span className={styles.error}>{lang.returnDateTime} is required</span>}
                </div>
              </>
            )}
            {rentType === 'Hourly' && (
              <div className={styles.formGroup}>
                <label className={styles.label}>{isBangla ? 'ভাড়ার সময়কাল (ঘণ্টা)' : 'Trip Duration (Hours)'}</label>
                <Controller
                  name="tripDuration"
                  control={control}
                  rules={{ required: rentType === 'Hourly' }}
                  render={({ field }) => (
                    <Select
                      options={tripDurationOptions}
                      value={tripDurationOptions.find(opt => opt.value === field.value) || { value: '', label: lang.select }}
                      onChange={(selected) => field.onChange(selected.value)}
                      classNamePrefix="react-select"
                      isClearable
                      menuPortalTarget={document.body}
                    />
                  )}
                />
                {errors.tripDuration && <span className={styles.error}>{lang.tripDuration} is required</span>}
              </div>
            )}
            <div className={styles.formGroup}>
              <label className={styles.label}>{lang.favouredVehicle}</label>
              <Controller
                name="favouredVehicle"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    options={vehicleOptions}
                    value={vehicleOptions.find(opt => opt.value === field.value) || { value: '', label: lang.select }}
                    onChange={(selected) => field.onChange(selected.value)}
                    classNamePrefix="react-select"
                    isClearable
                    menuPortalTarget={document.body}
                  />
                )}
              />
              {errors.favouredVehicle && <span className={styles.error}>{lang.favouredVehicle} is required</span>}
            </div>
            <div className={styles.buttonContainer}>
              <button type="submit" className={styles.button}>
                <span className={styles.buttonText}>{lang.planTrip}</span>
              </button>
            </div>
          </form>
          <LocationModal
            visible={startModalVisible}
            onClose={() => setStartModalVisible(false)}
            onSave={handleSaveStartLocation}
            tempData={tempStartData}
            setTempData={setTempStartData}
            isStart={true}
          />
          <LocationModal
            visible={endModalVisible}
            onClose={() => setEndModalVisible(false)}
            onSave={handleSaveEndLocation}
            tempData={tempEndData}
            setTempData={setTempEndData}
            isStart={false}
          />
        </div>
      </div>
      <FooterWhite isBangla={isBangla} />
    </div>
  );
};

export default PassengerDetails;