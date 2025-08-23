import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMapMarkerAlt,
  faPhone,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faYoutube,
  faTwitter,
  faLinkedin,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import styles from "./HeaderWhite.module.css";

const handleLogout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("isSignedIn");
  window.location.href = "/"; // or navigate("/") if using useNavigate()
};

class HeaderWhite extends Component {
  getUserName() {
    const userData = localStorage.getItem("user");
    console.log(userData);
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
    const { isMobileMenuOpen, toggleMobileMenu } = this.props;
    const userName = this.getUserName();
    const isSignedIn = localStorage.getItem("isSignedIn") === "true";
    return (
      <header className={styles.header}>
        <div className={styles.topBar}>
          <div className={styles.container}>
            <div className={styles.topBarRow}>
              <div className={styles.topBarLeft}>

                {/* <ul className={styles.topBarMenu}>
                  <li>
                    <a href="mailto:holotechlimited@gmail.com?Subject=Flower%20greetings%20to%20you">
                      <FontAwesomeIcon icon={faEnvelope} /> holotechlimited@gmail.com
                    </a>
                  </li>
                  <li>
                    <Link to="/locations">
                      <FontAwesomeIcon icon={faMapMarkerAlt} /> 2nd floor, 52/1, dhanmondi 3/A, Dhaka
                    </Link>
                  </li>
                </ul> */}

              </div>
              <div className={styles.topBarRight}>
                <ul className={styles.topBarMenu}>
                  <li>
                    <ul className={styles.socialMedia}>
                      <li>
                        <a
                          href="https://www.facebook.com/HoloAppTech"
                          title="Facebook"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FontAwesomeIcon icon={faFacebookF} />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.instagram.com/holoapptech/"
                          title="Instagram"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.instagramLink}
                        >
                          <FontAwesomeIcon icon={faInstagram} />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.youtube.com/@holotechltd.3919"
                          title="Youtube"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FontAwesomeIcon icon={faYoutube} />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://twitter.com/HoloLtd"
                          title="Twitter"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FontAwesomeIcon icon={faTwitter} />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.linkedin.com/company/holoapptech"
                          title="LinkedIn"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.tiktok.com/@holotechltd"
                          title="Tiktok"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FontAwesomeIcon icon={faTiktok} />
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.middleBar}>
          <div className={styles.container}>
            <div className={styles.middleRow}>
              <div className={styles.logoWrap}>
                <div className={styles.logo}>
                  <Link to="/">
                    <img
                      src="/img/Holo-Logo-Black.png"
                      alt="Logo"
                      width="192"
                      height="52"
                    />
                  </Link>
                </div>
                <div className={styles.support}>
                  <div className={styles.supportIcon}>
                    <FontAwesomeIcon icon={faPhone} />
                  </div>
                  <div className={styles.supportInfo}>
                    <h6>Get Support</h6>
                    <h4>
                      <a href="tel:09638-991110">09638-991110</a>
                    </h4>
                  </div>
                </div>
              </div>
              <div className={styles.menuColumn}>
                <nav>
                  <ul className={styles.mainMenu}>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="#">About</Link>
                      <ul>
                        <li>
                          <Link to="/about">About Us</Link>
                        </li>
                        <li>
                          <Link to="/locations">Location</Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link to="#">Services</Link>
                      <ul>
                        <li>
                          <Link to="/service">Apps</Link>
                        </li>
                        <li>
                          <Link to="/products">Serives</Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link to="#">News</Link>
                      <ul>
                        <li>
                          <Link to="/news">News</Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link to="/offers">Offers</Link>
                    </li>
                    <li>
                      <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                      <Link to="#">FAQ</Link>
                      <ul>
                        <li>
                          <Link to="/FAQ">FAQ</Link>
                        </li>
                        <li>
                          <Link to="/instructions">Instructions</Link>
                        </li>
                      </ul>
                    </li>
                      <li>
                        {/* Sign In Button in Main Menu */}
                        <Link to={isSignedIn ? "#" : "/signin"} className={styles.signInButton}>
                          {userName || "Sign In"}
                        </Link>
                        {userName && (
    <ul>
      <li>
        <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', marginLeft: '10px' }}>
          Logout
        </button>
      </li>
    </ul>
  )}
                      </li>                    
                  </ul>
                </nav>
              </div>
              <div className={styles.headerOptions}>
                <div className={styles.mobileMenuToggle}>
                  <button
                    onClick={toggleMobileMenu}
                    className={styles.toggleButton}
                  >
                    <FontAwesomeIcon icon={faBars} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default HeaderWhite;