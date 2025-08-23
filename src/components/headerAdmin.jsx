import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./headerAdmin.css";

const HeaderAdmin = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isFaqDropdownOpen, setIsFaqDropdownOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleAboutDropdown = () => setIsAboutDropdownOpen(!isAboutDropdownOpen);
  const toggleFaqDropdown = () => setIsFaqDropdownOpen(!isFaqDropdownOpen);

  return (
    <header className="header-admin">
      <div className="header-container">
        <div className="header-flex">
          {/* Logo and Support */}
          <div className="logo-support">
            <Link to="/" className="logo-link">
              <img
                src="img/Holo-Logo-white.png"
                alt="Holo Logo"
                width={192}
                height={52}
                className="logo-img"
              />
            </Link>
            <div className="support-info">
              <span className="support-text">Get Support</span>
              <a href="tel:09638-991110" className="support-phone">
                09638-991110
              </a>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="main-nav" aria-label="Main navigation">
            <Link to="/userListAdmin" className="nav-link">
              User List
            </Link>
            <Link to="/ride-requests" className="nav-link">
              Ride Requests
            </Link>
            <Link to="/rental-requests" className="nav-link">
              Rental Requests
            </Link>
            <Link to="/signin" className="nav-link">
              Logout
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="mobile-menu-toggle">
            <button
              onClick={toggleMobileMenu}
              className="mobile-menu-button"
              aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="mobile-menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            <Link to="/" className="mobile-nav-link" onClick={toggleMobileMenu}>
              Home
            </Link>
            <div className="mobile-dropdown">
              <button
                onClick={toggleAboutDropdown}
                className="mobile-dropdown-toggle"
                aria-expanded={isAboutDropdownOpen}
                aria-haspopup="true"
              >
                About
                <svg
                  className={`dropdown-icon ${isAboutDropdownOpen ? "rotate" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isAboutDropdownOpen && (
                <div className="mobile-dropdown-menu">
                  <Link
                    to="/about"
                    className="mobile-dropdown-item"
                    onClick={toggleMobileMenu}
                  >
                    About Us
                  </Link>
                  <Link
                    to="/locations"
                    className="mobile-dropdown-item"
                    onClick={toggleMobileMenu}
                  >
                    Location
                  </Link>
                </div>
              )}
            </div>
            <Link to="/news" className="mobile-nav-link" onClick={toggleMobileMenu}>
              News
            </Link>
            <Link to="/offers" className="mobile-nav-link" onClick={toggleMobileMenu}>
              Offers
            </Link>
            <Link to="/contact" className="mobile-nav-link" onClick={toggleMobileMenu}>
              Contact
            </Link>
            <div className="mobile-dropdown">
              <button
                onClick={toggleFaqDropdown}
                className="mobile-dropdown-toggle"
                aria-expanded={isFaqDropdownOpen}
                aria-haspopup="true"
              >
                FAQ
                <svg
                  className={`dropdown-icon ${isFaqDropdownOpen ? "rotate" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isFaqDropdownOpen && (
                <div className="mobile-dropdown-menu">
                  <Link
                    to="/FAQ"
                    className="mobile-dropdown-item"
                    onClick={toggleMobileMenu}
                  >
                    FAQ
                  </Link>
                  <Link
                    to="/instructions"
                    className="mobile-dropdown-item"
                    onClick={toggleMobileMenu}
                  >
                    Instructions
                  </Link>
                </div>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default HeaderAdmin;