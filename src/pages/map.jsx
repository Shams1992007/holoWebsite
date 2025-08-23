import React, { Component } from "react";
import { Link } from "react-router-dom";
import HeaderWhite from "../components/headerwhite";
import FooterWhite from "../components/footerwhite";
import MobileNav from "../components/mobilenav";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import styles from "./Map.module.css";
import commonStyles from "./Common.module.css";
import "leaflet/dist/leaflet.css";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const position = [23.740566561527984, 90.37567758347049];

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = { isMobileMenuOpen: false };
    this.menuRef = React.createRef();
    this.mapRef = React.createRef();
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

  componentDidMount() {
    document.addEventListener("mousedown", this.handleOutsideClick);
    if (this.mapRef.current) {
      setTimeout(() => {
        this.mapRef.current.invalidateSize();
      }, 0);
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleOutsideClick);
  }

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
        <div className={commonStyles.breadcrumbArea}>
          <div className={commonStyles.breadcrumbInner}>
            <div className={commonStyles.sectionTitleArea}>
              <h6 className={commonStyles.sectionSubtitle}>Welcome to Holo</h6>
              <h1 className={commonStyles.sectionTitle}>Location</h1>
            </div>
            <div className={commonStyles.breadcrumbList}>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>Locations</li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.mapContainer}>
          <MapContainer
            center={position}
            zoom={16}
            style={{ height: "600px", width: "100%" }}
            ref={this.mapRef}
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
        <div className={styles.mapLocationsArea}>
          <div className={styles.container}>
            <div className={styles.row}>
              <div className={styles.colLg12}></div>
            </div>
          </div>
        </div>
        <FooterWhite />
      </>
    );
  }
}

export default Map;