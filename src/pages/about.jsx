import React, { Component } from "react";
import { Link } from "react-router-dom";
import MobileNav from "../components/mobilenav";
import styles from "./About.module.css";
import HeaderWhite from "../components/headerwhite";
import FooterWhite from "../components/footerwhite";
import commonStyles from "./Common.module.css";

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobileMenuOpen: false,
    };
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
        {/* BREADCRUMB AREA START */}
        <div className={commonStyles.breadcrumbArea}>
          <div className={commonStyles.breadcrumbInner}>
            <div className={commonStyles.sectionTitleArea}>
              <h6 className={commonStyles.sectionSubtitle}>Welcome to Holo</h6>
              <h1 className={commonStyles.sectionTitle}>About Us</h1>
            </div>
            <div className={commonStyles.breadcrumbList}>
             <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>About</li>
              </ul>
            </div>
          </div>
        </div>
        {/* BREADCRUMB AREA END */}
        {/* ABOUT US AREA START */}
        <div className={styles.aboutUsArea}>
          <div className={styles.aboutRow}>
            <div className={styles.aboutImgWrap}>
              <img src="/img/biker.jpeg" alt="About Us" />
              <div className={styles.aboutImgInfo}>
                <div className={styles.aboutImgInfoInner}>
                  <h1>
                    We value
                    <span />
                  </h1>
                  <h6>our users</h6>
                </div>
              </div>
            </div>
            <div className={styles.aboutInfoWrap}>
              <div className={styles.sectionTitleArea}>
                <h6 className={styles.sectionSubtitle}>About Us</h6>
                <h1 className={styles.sectionTitle}>
                  Your Satisfaction Is Our First & Main Priority
                  <span>.</span>
                </h1>
                <p>
                  We're trying to solve the existing cultural problems of our ride sharing industry.
                </p>
              </div>
              <p>
                Ridesharing is not a new concept not only in Bangladesh but also all over the world. It has been a very popular and convenient way of commuting in urban areas in recent years. However, it is natural that the exact same service might vary from place to place, from culture to culture. The concept of sharing vehicles only by words of mouth has been carried out in this country even before digital ride-sharing was introduced in the western world. That makes us fundamentally different from them, which results in occasional conflicts of interest in adapting the typical digital ride-sharing system. We opt to combine the benefits of the app-based digital ride-sharing systems with the practices we are familiar with for decades, hence reducing the gap between them as much as possible.
              </p>
              <p>
                Although the concept of digital ride-sharing came from sharing someone's own vehicle while commuting to their own routes for some extra monetary benefits, it has become a potential occupation for a huge number of youths in our country. Ride sharing can be a great source of income in a country like ours, where a huge number of people have to find a convenient way to commute to their workplaces and institutions every day. HOLO aims to aid these youths to take this opportunity in a more favorable way. It is not uncommon to find disagreement between the two ends of this service due to mismatched destination preferences or personal preferences of payments, and our goal is to reduce the rate of these disagreements and ensure maximum benefits for both sides.
              </p>
              <p>
                Another inspiration behind the journey of HOLO is to simplify the process for people who are not comfortable with using extremely cybernated procedures. We understand highly sophisticated digital systems might turn into overwhelming, sometimes frightening to people who have just got access to smartphones in recent years, for example, the elderly population. Despite age, gender or ethnicity, everyone has the need for commutation and we believe it is our duty to ensure the benefits of technology to every single person for this basic need. Wouldn't it be great if use an app that makes your ride-sharing experience as simple and easy as calling a rickshaw?
              </p>
              <div className={styles.btnWrapper}>
                <Link to="/service" className={styles.themeBtn}>
                  OUR SERVICES
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.callToActionArea}>
          <div className={styles.callToActionInner}>
            <h2>24/7 Availability</h2>
          </div>
        </div>
        {/* ABOUT US AREA END */}
        <FooterWhite />
      </>
    );
  }
}

export default About;