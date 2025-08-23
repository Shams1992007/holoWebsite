import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMapMarkerAlt,
  faPhone,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faYoutube,
  faTwitter,
  faLinkedin,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import styles from "./MobileNav.module.css";

const handleLogout = () => {
  localStorage.removeItem("user");
  window.location.href = "/";
};

class MobileNav extends Component {
  getUserName() {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const { name } = JSON.parse(userData);
        return name || "User";
      } catch {
        return null;
      }
    }
    return null;
  }

  render() {
    const { isOpen, toggleMenu } = this.props;
    const userName = this.getUserName();

    return (
      <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ''}`}>
        <div className={styles.menuInner}>
          {/* Header Section */}
          <div className={styles.menuHead}>
            <div className={styles.logoWrapper}>
              <Link to="/" onClick={toggleMenu}>
                <img
                  src="/img/Holo-Logo-Black.png"
                  alt="Logo"
                  className={styles.logo}
                />
              </Link>
            </div>
            <button className={styles.closeButton} onClick={toggleMenu}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>


          {/* Main Menu */}
          <div className={styles.menu}>
            <ul>
              <li>
                <Link to="/" onClick={toggleMenu}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="#" onClick={toggleMenu}>
                  About
                </Link>
                <ul>
                  <li>
                    <Link to="/about" onClick={toggleMenu}>
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/locations" onClick={toggleMenu}>
                      Location
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="#" onClick={toggleMenu}>
                  Services
                </Link>
                <ul>
                  <li>
                    <Link to="/service" onClick={toggleMenu}>
                      Apps
                    </Link>
                  </li>
                  <li>
                    <Link to="/products" onClick={toggleMenu}>
                      Services
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="#" onClick={toggleMenu}>
                  News
                </Link>
                <ul>
                  <li>
                    <Link to="/news" onClick={toggleMenu}>
                      News
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/offers" onClick={toggleMenu}>
                  Offers
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={toggleMenu}>
                  Contact
                </Link>
              </li>
              <li>
                <Link to="#" onClick={toggleMenu}>
                  FAQ
                </Link>
                <ul>
                  <li>
                    <Link to="/FAQ" onClick={toggleMenu}>
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link to="/instructions" onClick={toggleMenu}>
                      Instructions
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to={userName ? "#" : "/signin"} className={styles.signInButton} onClick={toggleMenu}>
                  {userName || "Sign In"}
                </Link>
                {userName && (
                  <ul>
                    <li>
                      <button
                        onClick={() => {
                          handleLogout();
                          toggleMenu();
                        }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', marginLeft: '10px' }}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default MobileNav;