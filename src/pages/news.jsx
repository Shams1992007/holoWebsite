import React, { Component } from "react";
import { Link } from "react-router-dom";
import HeaderWhite from "../components/headerwhite";
import FooterWhite from "../components/footerwhite";
import MobileNav from "../components/mobilenav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons"; // Added faCalendar
import {
  faFacebookF,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import styles from "./News.module.css";
import commonStyles from "./Common.module.css";

class News extends Component {
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

  componentDidMount() {
    document.addEventListener("mousedown", this.handleOutsideClick);
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
        <div className="ltn__utilize-overlay" />
        <div className={commonStyles.breadcrumbArea}>
          <div className={commonStyles.breadcrumbInner}>
            <div className={commonStyles.sectionTitleArea}>
              <h6 className={commonStyles.sectionSubtitle}>Welcome to Holo</h6>
              <h1 className={commonStyles.sectionTitle}>News Details</h1>
            </div>
            <div className={commonStyles.breadcrumbList}>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>News Details</li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.pageDetailsArea}>
          <div className={styles.container}>
            <div className={styles.row}>
              <div className={styles.colLg8}>
                <div className={styles.blogDetailsWrap}>
                  <div className={styles.blogDetailsInner}>
                    <div className={styles.blogMeta}>
                      <ul>
                        <li className={styles.blogCategory}>
                          <Link to="#">Service</Link>
                        </li>
                      </ul>
                    </div>
                    <h2 className={styles.blogTitle}>The Journey of Holo</h2>
                    <div className={styles.blogMeta}>
                      <ul>
                        <li className={styles.blogAuthor}>
                          <Link to="/">
                            <img src="/img/Holo-Logo-Icon.png" alt="Author" />
                            By: Admin
                          </Link>
                        </li>
                        <li className={styles.blogDate}>
                          <FontAwesomeIcon icon={faCalendar} /> {/* Fixed icon */}
                          January, 2022
                        </li>
                      </ul>
                    </div>
                    <p>
                      Ride sharing is a relatively new, yet very popular concept
                      in Bangladesh. Holo is one of the newest edition in the
                      ride sharing industry of the country. The concept of Holo
                      started forming in order to solve the existing problems of
                      the ride sharing industry of Bangladesh. The aim of this
                      company is to find out and eliminate the biggest issue in
                      this industry in Bangladesh - drop of rides in digital
                      platforms.
                    </p>
                    <p>
                      The concept of ride sharing in digital platforms is not
                      something new in the world, yet the conventional method
                      that has been established in a lot of western countries
                      has not always been proven effective in Bangladesh due to
                      cultural differences. Hence, the concept of Holo came,
                      which was customized keeping the cultural and social norms
                      of people in mind. Holo intends to provide service in such
                      a manner that both the riders and the users become
                      satisfied with their experiences.
                    </p>
                    <div className={styles.logoContainer}>
                      <img
                        src="/img/Holo-Logo-Black.png"
                        alt="XHOLO Logo"
                        className={styles.logoImage}
                      />
                    </div>
                    <h2>We Care for Your Needs</h2>
                    <p>
                      Commuting to workplaces and educational institutions is a
                      daily necessity, yet the number of offline (without app)
                      rides are skyrocketing, even when it has been prohibited
                      by the authority. What is the reason for this loss of
                      profit of this industry then?
                    </p>
                    <hr />
                    <blockquote className={styles.blogQuote}>
                      <h6 className={styles.secondaryColor}>
                        bdnews24.com, Published: 28 Oct 2021 08:49 PM BdST
                      </h6>
                      "BRTA threatens legal action against ride-sharing without
                      app."
                    </blockquote>
                    <p>
                      Holo has been designed and customized not only keeping
                      what the users want in mind, but also providing maximum
                      flexibility and affordability to the riders who are
                      planning to share their rides.
                    </p>
                    <div className={styles.listItemWithIcon}>
                      <ul>
                        <li>Affordable and easy payment methods.</li>
                        <li>Simpler user experience.</li>
                        <li>No delay in sending and receiving payments.</li>
                        <li>
                          Ensuring your chalok won't be forced to go somewhere he
                          doesn’t want to go.
                        </li>
                      </ul>
                      <h4>Try Our App</h4>
                      <p>
                        Download the app from Google Play Store and try it for
                        free!
                      </p>
                    </div>
                    <div className={styles.blogTagsSocialMedia}>
                      <div className={styles.tagcloudWidget}>
                        <h4>Related Tags</h4>
                        <ul>
                          <li>
                            <Link to="#">Popular</Link>
                          </li>
                          <li>
                            <Link to="#">Service</Link>
                          </li>
                          <li>
                            <Link to="#">Rideshare</Link>
                          </li>
                        </ul>
                      </div>
                      <div className={styles.socialMedia}>
                        <h4>Social Share</h4>
                        <ul>
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
                            >
                              <FontAwesomeIcon icon={faInstagram} />
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
                        </ul>
                      </div>
                    </div>
                    <hr />
                  </div>
                </div>
              </div>
              <div className={styles.colLg4}>
                <aside className={styles.sidebarArea}>
                  <div className={styles.authorWidget}>
                    <h4 className={styles.widgetTitle}>About Us</h4>
                    <div className={styles.authorWidgetInner}>
                      <img
                        src="/img/Holo-Logo-Icon.png"
                        alt="Holo Logo"
                        className={styles.authorLogo}
                      />
                      <p>
                        Holo is a technology-based ride-sharing service
                        providing company. It has been established in 2022 and
                        providing service since then.
                      </p>
                    </div>
                  </div>
                  <div className={styles.socialMediaWidget}>
                    <h4 className={styles.widgetTitle}>Never Miss News</h4>
                    <div className={styles.socialMedia2}>
                      <ul>
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
                          >
                            <FontAwesomeIcon icon={faInstagram} />
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
                      </ul>
                    </div>
                  </div>
                  <div className={styles.bannerWidget}>
                    <img
                      src="/img/safety.jpg"
                      alt="Safety Tips"
                      className={styles.bannerImage}
                    />
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
        <FooterWhite />
      </>
    );
  }
}

export default News;