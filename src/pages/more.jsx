import React, { Component } from "react";
import { Link } from "react-router-dom";
import loadjs from "loadjs";
import HeaderWhite from "../components/headerwhite";
import FooterWhite from "../components/footerwhite";
import MobileNav from "../components/mobilenav";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Document, Page } from "@react-pdf/renderer";
import styles from "./More.module.css"; // Assuming a dedicated CSS module
import commonStyles from "./Common.module.css";

const MyDoc = () => (
  <Document>
    <Page>
      {/* My document data */}
    </Page>
  </Document>
);

class More extends Component {
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
        <div className="ltn__utilize-overlay" />
        {/* BREADCRUMB AREA START */}
        <div className={commonStyles.breadcrumbArea}>
          <div className={commonStyles.breadcrumbInner}>
            <div className={commonStyles.sectionTitleArea}>
              <h6 className={commonStyles.sectionSubtitle}>Welcome to Holo</h6>
              <h1 className={commonStyles.sectionTitle}>What We Have</h1>
            </div>
            <div className={commonStyles.breadcrumbList}>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>Our App</li>
              </ul>
            </div>
          </div>
        </div>
        {/* BREADCRUMB AREA END */}

        {/* SERVICE AREA START */}
        <div className={styles.pageDetailsArea}>
          <div className={styles.container}>
            <div className={styles.row}>
              <div className={styles.colLg12}>
                <div className={styles.sectionTitleArea}>
                  <h6 className={styles.sectionSubtitle}>Apps</h6>
                </div>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.colLg6}>
                <div className={styles.serviceItem}>
                  <div className={styles.serviceItemIcon}>
                    <i className="fas fa-user" />
                  </div>
                  <div className={styles.serviceItemBrief}>
                    <h3 className={styles.serviceTitle}>App For Jatri</h3>
                    <ul>
                      <li>
                        <span className="fas fa-check" /> Easy to use.
                      </li>
                      <li>
                        <span className="fas fa-check" /> Instant ride.
                      </li>
                      <li>
                        <span className="fas fa-check" /> Safety ensured.
                      </li>
                      <li>
                        <strong>
                          <span className={styles.appLinkLabel}>App -</span>
                          <a
                            href="https://play.google.com/store/apps/details?id=com.holoerjatri"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.appLink}
                          >
                            Jatri
                          </a>
                        </strong>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className={styles.colLg6}>
                <div className={styles.serviceItem}>
                  <div className={styles.serviceItemIcon}>
                    <i className="fas fa-motorcycle" />
                  </div>
                  <div className={styles.serviceItemBrief}>
                    <h3 className={styles.serviceTitle}>App For Chalok</h3>
                    <ul>
                      <li>
                        <span className="fas fa-check" /> Easy to use.
                      </li>
                      <li>
                        <span className="fas fa-check" /> Instant payment.
                      </li>
                      <li>
                        <span className="fas fa-check" /> No commission required.
                      </li>
                      <li>
                        <strong>
                          <span className={styles.appLinkLabel}>App -</span>
                          <a
                            href="https://play.google.com/store/apps/details?id=com.holoerchalok"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.appLink}
                          >
                            Chalok
                          </a>
                        </strong>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.colLg12}>
                <div className={styles.sidebarArea}>
                  {/* Traffic Rules Section */}
                  <div className={styles.widget}>
                    <div className={styles.sectionTitleArea}>
                      <h3 className={styles.sectionTitle}>Traffic Rules</h3>
                    </div>
                    <div className={styles.bannerWidget}>
                      <img
                        src="img/service/1-69bf349b73.jpeg"
                        alt="Traffic Rules 1"
                        className={styles.bannerImage}
                      />
                      <img
                        src="img/service/23.jpeg"
                        alt="Traffic Rules 2"
                        className={styles.bannerImage}
                      />
                    </div>
                  </div>
                  {/* Covid-19 Section */}
                  <div className={styles.widget}>
                    <div className={styles.sectionTitleArea}>
                      <h3 className={styles.sectionTitle}>Covid-19</h3>
                    </div>
                    <div className={styles.bannerWidget}>
                      <img
                        src="img/service/corona.jpeg"
                        alt="Covid-19"
                        className={styles.bannerImage}
                      />
                    </div>
                  </div>
                  {/* Ride Sharing Service Guideline Section */}
                  <div className={styles.widget}>
                    <div className={styles.sectionTitleArea}>
                      <h3 className={styles.sectionTitle}>
                        Ride Sharing Service Guideline 2017 (Gazette)
                      </h3>
                    </div>
                    <div className={styles.bannerWidget}>
                      <a
                        href="img/service/Ride Sharing Service Guideline 2017 (Gazette).pdf"
                        download="Ride Sharing Service Guideline 2017 (Gazette).pdf"
                      >
                        <img
                          src="img/service/file.png"
                          alt="Download Guideline"
                          className={styles.downloadIcon}
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* SERVICE AREA END */}
        <FooterWhite />
      </>
    );
  }
}

export default More;