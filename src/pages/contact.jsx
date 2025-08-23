import React, { Component } from "react";
import { Link } from "react-router-dom";
import HeaderWhite from "../components/headerwhite"; // Changed from HeaderBlack
import FooterWhite from "../components/footerwhite"; // Changed from FooterBlack
import MobileNav from "../components/mobilenav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import loadjs from "loadjs";
import styles from "./Contact.module.css";
import commonStyles from "./Common.module.css";

const position = [23.740566561527984, 90.37567758347049];

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = { isMobileMenuOpen: false };
    this.menuRef = React.createRef();
  }

  toggleMobileMenu = () => {
    this.setState((prevState) => ({
      isMobileMenuOpen: !prevState.isMobileMenuOpen,
    }));
  };

  handleOutsideClick = (event) => {
    if (
      this.state.isMobileMenuOpen &&
      this.menuRef.current &&
      !this.menuRef.current.contains(event.target)
    ) {
      this.setState({ isMobileMenuOpen: false });
    }
  };

  render() {
    const { isMobileMenuOpen } = this.state;
    return (
      <>
        <HeaderWhite
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={this.toggleMobileMenu}
        />
        <div ref={this.menuRef}>
          <MobileNav
            isOpen={isMobileMenuOpen}
            toggleMenu={this.toggleMobileMenu}
          />
        </div>
        <div className="ltn__utilize-overlay" />
        <div className={commonStyles.breadcrumbArea}>
          <div className={commonStyles.breadcrumbInner}>
            <div className={commonStyles.sectionTitleArea}>
              <h6 className={commonStyles.sectionSubtitle}>Welcome to Holo</h6>
              <h1 className={commonStyles.sectionTitle}>Contact</h1>
            </div>
            <div className={commonStyles.breadcrumbList}>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.pageDetailsArea}>
          <div className={styles.container}>
            <div className={styles.row}>
              <div className={styles.colLg12}>
                <div className={styles.contactDetailsWrap}>
                  <div className={styles.contactDetailsInner}>
                    <div className={styles.contactMeta}>
                      <h2 className={styles.contactTitle}>Get in Touch</h2>
                    </div>
                    <div className={styles.contactItems}>
                      <div className={styles.contactRow}>
                        <div className={styles.contactCol}>
                          <div className={styles.contactAddressItem}>
                            <div className={styles.contactAddressIcon}>
                              <FontAwesomeIcon icon={faEnvelope} />
                            </div>
                            <h3>Email Address</h3>
                            <p>holotechlimited@gmail.com</p>
                          </div>
                        </div>
                        <div className={styles.contactCol}>
                          <div className={styles.contactAddressItem}>
                            <div className={styles.contactAddressIcon}>
                              <FontAwesomeIcon icon={faPhone} />
                            </div>
                            <h3>Phone Number</h3>
                            <p>09638-991110</p>
                          </div>
                        </div>
                        <div className={styles.contactCol}>
                          <div className={styles.contactAddressItem}>
                            <div className={styles.contactAddressIcon}>
                              <FontAwesomeIcon icon={faMapMarkerAlt} />
                            </div>
                            <h3>Office Address</h3>
                            <p>2nd floor, 52/1, Dhanmondi 3/A, Dhaka</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.mapContainer}>
                      <MapContainer
                        center={position}
                        zoom={16}
                        style={{ height: "400px", width: "100%" }}
                      >
                        <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={position}>
                          <Popup>
                            <strong>
                              2nd floor, 52/1, Dhanmondi 3/A, <br />
                              Dhaka, Bangladesh
                            </strong>
                          </Popup>
                        </Marker>
                      </MapContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FooterWhite />
      </>
    );
  }
}

export default Contact;