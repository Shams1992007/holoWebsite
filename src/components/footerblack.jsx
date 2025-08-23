import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./FooterBlack.module.css";

class FooterBlack extends Component {
  render() {
    return (
      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div className={styles.footerRow}>
            <div className={styles.footerWidget}>
              <div className={styles.timelineWidget}>
                <h6 className={styles.secondaryColor}>Meet Us</h6>
                <h4 className={styles.footerTitle}>Visit Us On...</h4>
                <ul className={styles.timelineList}>
                  <li>
                    Sunday <span>11:00AM - 9:00PM</span>
                  </li>
                  <li>
                    Monday <span>11:00AM - 9:00PM</span>
                  </li>
                  <li>
                    Tuesday <span>11:00AM - 4:00PM</span>
                  </li>
                  <li>
                    Wednesday <span>11:00AM - 9:00PM</span>
                  </li>
                  <li>
                    Thursday <span>11:00AM - 9:00PM</span>
                  </li>
                  <li>
                    Friday <span>11:00AM - 9:00PM</span>
                  </li>
                  <li>
                    Saturday <span>11:00AM - 9:00PM</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.footerWidget}>
              <h4 className={styles.footerTitle}>Services.</h4>
              <div className={styles.footerMenu}>
                <ul>
                  <li>
                    <Link to="/service">User App</Link>
                  </li>
                  <li>
                    <Link to="/service">Rider App</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.footerWidget}>
              <h4 className={styles.footerTitle}>News Feeds.</h4>
              <div className={styles.blogItem}>
                <div className={styles.blogMeta}>
                  <ul>
                    <li className={styles.blogDate}>
                      <i className="far fa-envelope" /> January, 2020
                    </li>
                  </ul>
                </div>
                <h4 className={styles.blogTitle}>
                  <Link to="/news">The Journey of Holo</Link>
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.copyrightArea}>
          <div className={styles.copyrightRow}>
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
              <div className={styles.getSupportInfo}>
                <h6>Copyright & Design By</h6>
                <h4>
                  Holo - <span className="current-year" />
                </h4>
              </div>
            </div>
            <div className={styles.copyrightMenu}>
              <ul>
                <li>
                  <Link to="/terms">Terms & Conditions</Link>
                </li>
                <li>
                  <Link to="/privacyEnglish">Privacy Policy</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default FooterBlack;