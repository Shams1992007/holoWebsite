import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./HeaderBlack.module.css";

class HeaderBlack extends Component {
  render() {
    const { isMobileMenuOpen, toggleMobileMenu } = this.props;
    return (
      <header className={styles.header}>
        <div className={styles.headerMiddle}>
          <div className={styles.headerRow}>
            <div className={styles.siteLogoWrap}>
              <div className={styles.siteLogo}>
                <Link to="/">
                  <img
                    src="/img/Holo-Logo-white.png"
                    alt="Logo"
                    width={150}
                    height={40}
                  />
                </Link>
              </div>
              <div className={styles.getSupport}>
                <div className={styles.getSupportIcon}>
                  <i className="icon-call" />
                </div>
                <div className={styles.getSupportInfo}>
                  <h6>Get Support</h6>
                  <h4>
                    <a href="tel:09638-991110">09638-991110</a>
                  </h4>
                </div>
              </div>
            </div>
            <div
              className={`${styles.headerMenuColumn} ${
                isMobileMenuOpen ? styles.active : ""
              }`}
            >
              <nav>
                <div className={styles.mainMenu}>
                  {isMobileMenuOpen && (
                    <button
                      onClick={toggleMobileMenu}
                      className={styles.closeButton}
                    >
                      Close
                    </button>
                  )}
                  <ul>
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
                  </ul>
                </div>
              </nav>
            </div>
            <div className={styles.mobileMenuToggle}>
              <button onClick={toggleMobileMenu} className={styles.toggleButton}>
                <svg
                  viewBox="0 0 800 600"
                  className={`${styles.hamburger} ${isMobileMenuOpen ? styles.open : ""}`}
                >
                  <path
                    d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,420 C440,340 300,200 300,200"
                    id="top"
                  />
                  <path d="M300,320 L540,320" id="middle" />
                  <path
                    d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,410 C440,330 300,190 300,190"
                    id="bottom"
                    transform="translate(480, 320) scale(1, -1) translate(-480, -318)"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default HeaderBlack;