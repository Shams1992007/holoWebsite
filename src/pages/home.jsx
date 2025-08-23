import React from "react";
import { Link } from "react-router-dom";
import FooterWhite from "../components/footerwhite";
import HeaderWhite from "../components/headerwhite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faHandHoldingUsd,
  faRoute,
  faHandshake,
  faMoneyBillWave,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import MobileNav from "../components/mobilenav";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Home.module.css";

const rider_url = "/api/rides/public/get-public-ride-count";
const user_url = "/api/accounts/public/get-total-user-count";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      riders: null,
      users: null,
      error: null,
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
    const { riders, users, error, isMobileMenuOpen } = this.state;
    const sliderSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      autoplay: true,
      autoplaySpeed: 5000,
    };

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

        {/* Slider Section */}
        <section className={styles.sliderArea}>
          <div className={styles.container}>
            <Slider {...sliderSettings}>
              {/* Slide 1 */}
              <div className={styles.slide}>
                <div className={styles.textContent}>

                  {/* <div className={styles.playButtonWrapper}>
                    <a
                      href="https://www.youtube.com/embed/wYSTa9J6fHk"
                      className={styles.playButton}
                    >
                      <FontAwesomeIcon icon={faPlay} />
                    </a>
                  </div> */}

                  <h1 className={styles.heading}>
                    Digitizing the traditional ride-sharing practices for digital Bangladesh
                  </h1>
                  <h6 className={styles.subheading}>
                    Introducing a digital revolution that cares for the needs of both the ends alike.
                  </h6>
                  <div className={styles.buttonGroup}>
                    <Link to="/service" className={styles.primaryButton}>
                      Find The Apps
                    </Link>
                  </div>
                </div>
                <div className={styles.imageWrapper}>
                  <img src="/img/city.jpeg" alt="City" className={styles.image} />
                </div>
              </div>
              {/* Slide 2 */}
              <div className={styles.slideReverse}>
                <div className={styles.textContent}>
                  <h6 className={`${styles.subheading} ${styles.subheadingSecondary}`}>
                    Simplify Your Experience
                  </h6>
                  <h1 className={styles.heading}>
                    Download The App & SIMPLIFY Your Ride Sharing Experience
                  </h1>
                  <p className={styles.text}>
                    Click the button to get the app
                  </p>
                  <div className={styles.buttonGroup}>
                    <Link to="/service" className={styles.primaryButton}>
                      Find The Apps
                    </Link>
                  </div>
                </div>
                <div className={styles.imageWrapper}>
                  <img src="/img/city.jpeg" alt="City" className={styles.image} />
                </div>
              </div>
            </Slider>
          </div>
        </section>

        {/* Features Section */}
        <section className={styles.featureArea}>
          <div className={styles.container}>
            <div className={styles.featureGrid}>
              {/* Feature 1 */}
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <FontAwesomeIcon icon={faHandHoldingUsd} />
                </div>
                <h2 className={styles.featureTitle}>
                  <Link to="/service">No Worry about Commission</Link>
                </h2>
                <p className={styles.featureText}>
                  Buy prepaid packages to enjoy unlimited rides and find your ride partners without sharing percentages of your income from every ride. Pay once and enjoy the benefits as much as you want for the entire package. No hidden charges, no commissions, just a small and affordable service charge is required.
                </p>
              </div>
              {/* Feature 2 */}
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <FontAwesomeIcon icon={faRoute} />
                </div>
                <h2 className={styles.featureTitle}>
                  <Link to="/service">Unique Destination Matching</Link>
                </h2>
                <p className={styles.featureText}>
                  Who wants to be rejected? We certainly know how annoying that can be, therefore HOLO tries best to match you with a rider who is already willing to travel to the direction of your intended location, and hence less chance of ride rejection.
                </p>
              </div>
              {/* Feature 3 */}
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <FontAwesomeIcon icon={faHandshake} />
                </div>
                <h2 className={styles.featureTitle}>
                  <Link to="/service">Direct Payment for the Riders</Link>
                </h2>
                <p className={styles.featureText}>
                  We prioritize the need of receiving your payments instantly. That being the case, the transaction of fare is totally in between you and your ride partner, no third party is involved at all. Receive the money directly from your passenger in whichever method you prefer, cash or any of your own mobile finance accounts.
                </p>
              </div>
              {/* Feature 4 */}
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <FontAwesomeIcon icon={faMoneyBillWave} />
                </div>
                <h2 className={styles.featureTitle}>
                  <Link to="/service">Pay as You Go</Link>
                </h2>
                <p className={styles.featureText}>
                  If you are planning to try this app as your go-to motorbike ride share service providing method, you can avail yourself of the opportunity in exchange for only BDT 10 as a service charge per ride, you heard that right, no percent fee per ride is needed!
                </p>
              </div>
              {/* Feature 5 */}
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <FontAwesomeIcon icon={faRocket} />
                </div>
                <h2 className={styles.featureTitle}>
                  <Link to="/service">Instant Ride</Link>
                </h2>
                <p className={styles.featureText}>
                  Despite knowing the dangers of having no records of contract trips, this method has been mainly practiced in Bangladesh for its flexibility. For the first time in Bangladesh, HOLO is digitizing this traditional method of contract trips preserving all the necessary data of the trips. Call a biker on the road as you always do, ask them to use the app, and enjoy your trip with the full freedom of a contract ride with an additional feeling of safety and respect for the traffic laws.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section className={styles.aboutArea}>
          <div className={styles.container}>
            <div className={styles.aboutContent}>
              <div className={styles.aboutText}>
                <h6 className={styles.aboutSubheading}>About Us</h6>
                <h1 className={styles.aboutHeading}>
                  Your Satisfaction Is Our First Priority<span>.</span>
                </h1>
                <p>
                  We're trying to solve the existing cultural problems of our ride sharing industry.
                </p>
                <p>
                  A significant amount of rides get dropped due to reasons like destination disagreements. We are here to ensure a smooth journey to you where the ride won't get rejected!
                </p>
                <ul className={styles.aboutList}>
                  <li><Link to="/contact">24/7 Online Support</Link></li>
                  <li><Link to="/service">Easy To Use Apps</Link></li>
                  <li><Link to="/about">Find Ride On The Go</Link></li>
                </ul>
              </div>
              <div className={styles.aboutImageWrapper}>
                <img src="/img/Holo-Logo-Black.png" alt="Holo Logo" className={styles.aboutImage} />
              </div>
            </div>
          </div>
        </section>

        {/* Counter Section */}
{/*

        <section className={styles.counterArea}>
          <div className={styles.container}>
            {error && (
              <div className={styles.error}>
                {error}
              </div>
            )}
            <div className={styles.counterGrid}>
              <div>
                <h6 className={styles.counterSubheading}>Activity</h6>
                <h1 className={styles.counterTitle}>
                  It’s Our Journey<span>.</span>
                </h1>
              </div>
              <div>
                <h1 className={styles.counterValue}>{users || 0}</h1>
                <h6 className={styles.counterLabel}>Users</h6>
              </div>
              <div>
                <h1 className={styles.counterValue}>{riders || 0}</h1>
                <h6 className={styles.counterLabel}>Completed Rides</h6>
              </div>
            </div>
          </div>
        </section>
*/}

        {/* Partners Section */}
        <section className={styles.partnersArea}>
          <div className={styles.container}>
            <h1 className={styles.partnersHeading}>Our Partners</h1>
            <div className={styles.partnersImageWrapper}>
              <a
                href="https://www.sslwireless.com/"
                title="SSL"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/img/partners/ssl-wireless-logo.png"
                  alt="SSL Wireless Logo"
                  className={styles.partnersImage}
                />
              </a>
            </div>
          </div>
        </section>

        {/* Footer Image */}
        <div className={styles.footerImageSection}>
          <img src="/img/footer/ssl1.jpg" alt="SSL Footer" className={styles.footerImage} />
        </div>

        <FooterWhite />
      </>
    );
  }
}

export default Home;