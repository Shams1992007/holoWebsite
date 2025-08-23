import React from "react";
import { Link } from "react-router-dom";
import "./footerAdmin.css";

const FooterAdmin = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-admin">
      <div className="footer-container">
        <div className="footer-flex">
          {/* Logo and Copyright */}
          <div className="footer-logo-copyright">
            <Link to="/" className="footer-logo-link">
              <img
                src="img/Holo-Logo-white.png"
                alt="Holo Logo"
                width={192}
                height={52}
                className="footer-logo-img"
              />
            </Link>
            <div className="footer-copyright">
              <h6 className="copyright-text">Copyright & Design By</h6>
              <h4 className="copyright-info">
                Holo - {currentYear}
              </h4>
            </div>
          </div>
          {/* Navigation Links (Commented Out) */}
          <div className="footer-nav">
            {/* Uncomment if needed */}
            {/* <Link to="/terms" className="footer-nav-link">
              Terms & Conditions
            </Link>
            <Link to="/privacyEnglish" className="footer-nav-link">
              Privacy Policy
            </Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterAdmin;