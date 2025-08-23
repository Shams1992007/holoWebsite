import React, { Component } from "react";
import { Link } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HeaderWhite from "../components/headerwhite";
import FooterWhite from "../components/footerwhite";
import MobileNav from "../components/mobilenav";
import styles from "./Instructions.module.css";
import commonStyles from "./Common.module.css";

// Import images (unchanged)
import splashScreenRider from "../instructions/images/riderSignUp/Rider Front page.jpg";
import signUp1Rider from "../instructions/images/riderSignUp/1.Rider sign up 1 eng.jpg";
import signUp2Rider from "../instructions/images/riderSignUp/2.Rider sign up 2 eng.jpg";
import riderComplete3 from "../instructions/images/riderSignUp/Rider complete 3.jpg";
import riderComplete4 from "../instructions/images/riderSignUp/Rider complete 4.jpg";
import riderComplete5 from "../instructions/images/riderSignUp/Rider Complete 5.jpg";
import riderWaitingApproval from "../instructions/images/riderSignUp/19.Rider waiting approval eng.jpg";
import riderEditDashboard from "../instructions/images/riderSignUp/22.Rider edit photo button eng.jpg";
import riderLandingPage from "../instructions/images/riderOnline/2.Landing page eng.jpg";
import riderSetRoute from "../instructions/images/riderOnline/4. Set route eng.jpg";
import riderLocationNotFound from "../instructions/images/riderOnline/6.Not found eng.jpg";
import riderAddDestination from "../instructions/images/riderOnline/8.Add first destination eng.jpg";
import riderSetDestination from "../instructions/images/riderOnline/9. Set first destination price eng.jpg";
import riderset2ndDestination from "../instructions/images/riderOnline/12. Set 2nd destination eng.jpg";
import riderLandingPageWithRoute from "../instructions/images/riderOnline/13. Landing page with route eng.jpg";
import riderSeeRoute from "../instructions/images/riderOnline/16. See route eng.jpg";
import riderGetNotification from "../instructions/images/rideRider/1. get ride notifications eng.jpg";
import riderAcceptRide from "../instructions/images/rideRider/4. accept ride eng.jpg";
import riderRidePage from "../instructions/images/rideRider/5. ride page eng.jpg";
import riderReceipt from "../instructions/images/rideRider/8. receipt eng.jpg";
import ins2_3 from "../instructions/images/image45.jpg";
import ins2_4 from "../instructions/images/image6.jpg";
import ins2_5 from "../instructions/images/image8.jpg";
import ins2_6 from "../instructions/images/image39.jpg";
import ins2_7 from "../instructions/images/image1.jpg";
import ins2_13 from "../instructions/images/image42.jpg";
import ins2_14 from "../instructions/images/image35.jpg";

class Instructions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobileMenuOpen: false,
    };
    this.menuRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleOutsideClick);
    // Removed loadjs calls; assume plugins.js and main.js are handled elsewhere or refactored
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleOutsideClick);
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
              <h1 className={commonStyles.sectionTitle}>Instructions</h1>
            </div>
            <div className={commonStyles.breadcrumbList}>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>Instructions</li>
              </ul>
            </div>
          </div>
        </div>
        {/* BREADCRUMB AREA END */}
        {/* INSTRUCTIONS AREA START */}
        <div className={styles.instructionsArea}>
          <div className={styles.instructionsRow}>
            {/* Downloadable Files */}
            <div className={styles.downloadSection}>
              <h2 className={styles.sectionTitle}>Download Instructions</h2>
              <div className={styles.downloadGrid}>
                {[
                  {
                    title: "Chalok Instruction Bangla",
                    file: "img/instructions/Chalok Instruction Bangla.pdf",
                  },
                  {
                    title: "Chalok Instruction English",
                    file: "img/instructions/Chalok Instruction English.pdf",
                  },
                  {
                    title: "Jatri Instruction Bangla",
                    file: "img/instructions/Jatri Instruction Bangla.pdf",
                  },
                  {
                    title: "Jatri Instruction English",
                    file: "img/instructions/Jatri Instruction English.pdf",
                  },
                ].map((item, index) => (
                  <div key={index} className={styles.downloadItem}>
                    <h3>{item.title}</h3>
                    <a href={item.file} download>
                      <img src="img/service/file.png" alt="Download" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
            {/* Enlistment Procedure */}
            <div className={styles.enlistmentSection}>
              <h2 className={styles.sectionTitle}>Holo Chalok Enlistment Procedure</h2>
              <div className={styles.enlistmentImages}>
                <img src="img/instructions/bangla.jpeg" alt="Bangla Instructions" />
                <img src="img/instructions/english.jpeg" alt="English Instructions" />
              </div>
              <div className={styles.videoWrapper}>
                <iframe
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/embed/wYSTa9J6fHk"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            {/* Accordion Instructions */}
{/*}            
            <div className={styles.accordionSection}>
              <h2 className={styles.sectionTitle}>Step-by-Step Guide</h2>
              <Accordion defaultActiveKey="0" flush>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>How to Sign Up as a Chalok</Accordion.Header>
                  <Accordion.Body>
                    <ol>
                      <li>
                        Open the app. Click on the “Sign up” button to go to the Sign up page.
                        <div className={styles.instructionImage}>
                          <img src={splashScreenRider} alt="Splash Screen" />
                        </div>
                      </li>
                      <li>
                        Fill in the mandatory fields on the “Sign up” page. Optional fields are important for full benefits. If you are not the rider, use a Chalok to operate, and you will be considered the owner.
                        <ul>
                          <li><strong>Name:</strong> Full name of the Chalok.</li>
                          <li><strong>Address:</strong> Full address of the owner (e.g., Floor, House no., Road no., Area, City).</li>
                          <li><strong>Phone Number:</strong> Format: 01xxxxxxxxx. Used by the Chalok, owned by the owner.</li>
                          <li><strong>Email:</strong> Owner’s email for notifications and offers.</li>
                          <li><strong>Emergency Contact Number:</strong> Trusted contact for emergencies, owner’s personal number if Chalok-operated.</li>
                          <li><strong>Relationship with User:</strong> Relation to emergency contact, use “Owner” for Chalok-operated vehicles.</li>
                          <li><strong>Gender:</strong> Male, Female, or Other.</li>
                          <li><strong>Date of Birth:</strong> As per NID.</li>
                          <li><strong>Blood Group:</strong> Chalok’s blood group for emergencies.</li>
                          <li><strong>Password:</strong> Set and memorize.</li>
                        </ul>
                        <Container>
                          <Row>
                            <Col><img src={signUp1Rider} alt="Sign Up 1" /></Col>
                            <Col><img src={ins2_3} alt="Sign Up 2" /></Col>
                          </Row>
                        </Container>
                      </li>
                      <li>
                        After submitting, log in on this page.
                        <div className={styles.instructionImage}>
                          <img src={ins2_4} alt="Login Page" />
                        </div>
                      </li>
                      <li>
                        Complete your profile by clicking “Complete your profile”.
                        <div className={styles.instructionImage}>
                          <img src={ins2_5} alt="Profile Completion" />
                        </div>
                      </li>
                      <li>
                        Provide vehicle and personal details:
                        <ul>
                          <li><strong>Your Vehicle:</strong> Select Motorcycle or Scooty.</li>
                          <li><strong>Vehicle Registration Number:</strong> Format: City/District-Serial (e.g., Dhaka Metro-LA-xx-xxxx).</li>
                          <li><strong>Vehicle Model:</strong> Format: Name CC Color (e.g., Bajaj Discover 125 Black).</li>
                          <li><strong>Vehicle Model Year:</strong> Year of manufacture (e.g., 2021).</li>
                          <li><strong>National ID Number:</strong> Chalok’s NID number.</li>
                          <li><strong>Upload National ID:</strong> Scanned front and back of Chalok’s NID.</li>
                          <li><strong>Upload Driving License:</strong> Scanned front and back of Chalok’s license.</li>
                          <li><strong>Upload Profile Photo:</strong> Clear photo of the Chalok.</li>
                          <li><strong>Upload Utility Bill:</strong> Recent bill showing owner’s address.</li>
                          <li><strong>Upload Registration Paper:</strong> Scanned vehicle registration.</li>
                          <li><strong>Upload Vehicle Fitness Paper (For Cars):</strong> Not required for motorcycles.</li>
                          <li><strong>Upload Tax Token:</strong> Scanned vehicle tax token.</li>
                          <li><strong>Upload Insurance Paper:</strong> Scanned vehicle insurance.</li>
                          <li><strong>Upload Owner’s NID:</strong> Scanned front and back of owner’s NID.</li>
                          <li><strong>Ride Format:</strong> Select “Professionally” or “Non-professionally”.</li>
                        </ul>
                        <Container>
                          <Row>
                            <Col><img src={ins2_6} alt="Vehicle Info 1" /></Col>
                            <Col><img src={ins2_7} alt="Vehicle Info 2" /></Col>
                          </Row>
                          <Row>
                            <Col><img src={riderComplete3} alt="Profile 3" /></Col>
                            <Col><img src={riderComplete4} alt="Profile 4" /></Col>
                          </Row>
                        </Container>
                        <ul>
                          <li>Select preferred payment method for Jatri payments.</li>
                          <li>Provide cashout number and method (e.g., “Rocket - 01xxxxxxxxx”).</li>
                        </ul>
                        <div className={styles.instructionImage}>
                          <img src={riderComplete5} alt="Profile Completion" />
                        </div>
                      </li>
                      <li>
                        Click “Complete Profile” to submit. Verify all details.
                        <div className={styles.instructionImage}>
                          <img src={riderComplete5} alt="Profile Submission" />
                        </div>
                      </li>
                      <li>
                        Wait for Holo to verify your profile. Contact support if needed.
                        <div className={styles.instructionImage}>
                          <img src={riderWaitingApproval} alt="Waiting Approval" />
                        </div>
                      </li>
                      <li>
                        Edit info via WhatsApp or reupload photos from the profile page.
                        <div className={styles.instructionImage}>
                          <img src={riderWaitingApproval} alt="Edit Profile" />
                        </div>
                      </li>
                      <li>
                        Edit photos before verification from the profile page.
                        <div className={styles.instructionImage}>
                          <img src={riderEditDashboard} alt="Edit Dashboard" />
                        </div>
                      </li>
                      <li>
                        Upload new photos and wait for “uploaded” confirmation.
                        <Container>
                          <Row>
                            <Col><img src={ins2_13} alt="Edit Photo 1" /></Col>
                            <Col><img src={ins2_14} alt="Edit Photo 2" /></Col>
                          </Row>
                        </Container>
                      </li>
                      <li>
                        Return to the profile page after uploading.
                      </li>
                      <li>
                        After verification, access the landing page and start earning.
                        <div className={styles.instructionImage}>
                          <img src={riderLandingPage} alt="Landing Page" />
                        </div>
                      </li>
                    </ol>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>How to Set Route and Go Online</Accordion.Header>
                  <Accordion.Body>
                    <ol>
                      <li>
                        Log in to the landing page. Click the arrow to set routes. “Set” indicates routes need setting.
                        <div className={styles.instructionImage}>
                          <img src={riderLandingPage} alt="Landing Page" />
                        </div>
                      </li>
                      <li>
                        View your current location marker. HOLO zone shows high-passenger areas.
                        <div className={styles.instructionImage}>
                          <img src={riderSetRoute} alt="Set Route" />
                        </div>
                      </li>
                      <li>
                        If location shows “not found”, select from the dropdown list.
                        <div className={styles.instructionImage}>
                          <img src={riderLocationNotFound} alt="Location Not Found" />
                        </div>
                      </li>
                      <li>
                        Click “Your Destination” to add a destination.
                        <div className={styles.instructionImage}>
                          <img src={riderSetRoute} alt="Add Destination" />
                        </div>
                      </li>
                      <li>
                        Select up to five destinations and set estimated fares.
                        <Container>
                          <Row>
                            <Col><img src={riderAddDestination} alt="Add Destination" /></Col>
                            <Col><img src={riderSetDestination} alt="Set Destination" /></Col>
                          </Row>
                          <Row>
                            <Col><img src={riderset2ndDestination} alt="Second Destination" /></Col>
                          </Row>
                        </Container>
                      </li>
                      <li>
                        Click “Go online” to become available.
                        <div className={styles.instructionImage}>
                          <img src={riderset2ndDestination} alt="Go Online" />
                        </div>
                      </li>
                      <li>
                        Return to the landing page. “See” indicates routes are set. Click the arrow to view routes.
                        <Container>
                          <Row>
                            <Col><img src={riderLandingPageWithRoute} alt="Landing Page with Route" /></Col>
                            <Col><img src={riderSeeRoute} alt="See Route" /></Col>
                          </Row>
                        </Container>
                      </li>
                    </ol>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>How to Go Offline</Accordion.Header>
                  <Accordion.Body>
                    <ol>
                      <li>
                        On the landing page, check the “see” status to confirm availability.
                        <div className={styles.instructionImage}>
                          <img src={riderLandingPageWithRoute} alt="Landing Page" />
                        </div>
                      </li>
                      <li>
                        Click “Go offline” to become unavailable.
                        <div className={styles.instructionImage}>
                          <img src={riderSeeRoute} alt="Go Offline" />
                        </div>
                      </li>
                      <li>
                        Confirm “set” status to ensure you are unavailable.
                        <div className={styles.instructionImage}>
                          <img src={riderLandingPage} alt="Landing Page Unavailable" />
                        </div>
                      </li>
                    </ol>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>How to Ride as a Chalok</Accordion.Header>
                  <Accordion.Body>
                    <ol>
                      <li>
                        Log in and set routes from the landing page.
                        <div className={styles.instructionImage}>
                          <img src={riderLandingPage} alt="Landing Page" />
                        </div>
                      </li>
                      <li>
                        View your current location marker.
                        <div className={styles.instructionImage}>
                          <img src={riderSetRoute} alt="Set Route" />
                        </div>
                      </li>
                      <li>
                        Select location from the dropdown if “not found”.
                        <div className={styles.instructionImage}>
                          <img src={riderLocationNotFound} alt="Location Not Found" />
                        </div>
                      </li>
                      <li>
                        Click “Your Destination” to add a destination.
                        <div className={styles.instructionImage}>
                          <img src={riderSetRoute} alt="Add Destination" />
                        </div>
                      </li>
                      <li>
                        Set up to five destinations and fares.
                        <Container>
                          <Row>
                            <Col><img src={riderAddDestination} alt="Add Destination" /></Col>
                            <Col><img src={riderSetDestination} alt="Set Destination" /></Col>
                          </Row>
                          <Row>
                            <Col><img src={riderset2ndDestination} alt="Second Destination" /></Col>
                          </Row>
                        </Container>
                      </li>
                      <li>
                        Go online to become available.
                        <div className={styles.instructionImage}>
                          <img src={riderset2ndDestination} alt="Go Online" />
                        </div>
                      </li>
                      <li>
                        Confirm routes are set and view them.
                        <Container>
                          <Row>
                            <Col><img src={riderLandingPageWithRoute} alt="Landing Page with Route" /></Col>
                            <Col><img src={riderSeeRoute} alt="See Route" /></Col>
                          </Row>
                        </Container>
                      </li>
                      <li>
                        Wait for user calls and check notifications.
                        <div className={styles.instructionImage}>
                          <img src={riderLandingPageWithRoute} alt="Notifications" />
                        </div>
                      </li>
                      <li>
                        Accept rides and confirm with “Yes”.
                        <Container>
                          <Row>
                            <Col><img src={riderGetNotification} alt="Notification" /></Col>
                            <Col><img src={riderAcceptRide} alt="Accept Ride" /></Col>
                          </Row>
                        </Container>
                      </li>
                      <li>
                        End the ride on the ride details page.
                        <div className={styles.instructionImage}>
                          <img src={riderRidePage} alt="Ride Page" />
                        </div>
                      </li>
                      <li>
                        View receipt and rate the user.
                        <div className={styles.instructionImage}>
                          <img src={riderReceipt} alt="Receipt" />
                        </div>
                      </li>
                    </ol>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <div className={styles.btnWrapper}>
                <Link to="/instructionsBangla" className={styles.themeBtn}>
                  বাংলা
                </Link>
              </div>
            </div>
*/}            
          </div>
        </div>
        {/* INSTRUCTIONS AREA END */}
        <FooterWhite />
      </>
    );
  }
}

export default Instructions;