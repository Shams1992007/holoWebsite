import React, { Component } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HeaderWhite from "../components/headerwhite";
import MobileNav from "../components/mobilenav";
import FooterWhite from "../components/footerwhite";
import styles from "./Privacy.module.css";
import commonStyles from "./Common.module.css";

class Privacy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobileMenuOpen: false,
    };
    this.menuRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleOutsideClick);
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
        <div className={styles.utilizeOverlay} />

        {/* BREADCRUMB AREA START */}
        <div className="ltn__utilize-overlay" />
        <div className={commonStyles.breadcrumbArea}>
          <div className={commonStyles.breadcrumbInner}>
            <div className={commonStyles.sectionTitleArea}>
              <h6 className={commonStyles.sectionSubtitle}>Welcome to Holo</h6>
              <h1 className={commonStyles.sectionTitle}>Privacy Policy</h1>
            </div>
            <div className={commonStyles.breadcrumbList}>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
        </div>
        {/* BREADCRUMB AREA END */}

        {/* PAGE DETAILS AREA START */}
        <div className={styles.pageDetailsArea}>
          <Container>
            <Row>
              <Col className={styles.btnWrapper}>
                <Link to="/privacyBangla" className={styles.themeBtn}>
                  বাংলা
                </Link>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <div className={styles.policyContent}>
                  <strong>Last updated: December 26, 2024</strong>
                  <ol>
                    <li>
                      <strong>INTRODUCTION</strong>
                      <div>
                        This privacy policy describes how the holoapp.tech website and related
                        mobile applications “Holo” and “Holo Chalok” (the “Site”, “we” or “us”)
                        established this System to link up users who need to go somewhere
                        (“Customers”) with individuals who will provide the ride-sharing
                        service (“Drivers”). Please read below to learn more about our
                        information practices. By using this Site or apps, you agree to
                        these practices.
                      </div>
                    </li>
                    <li>
                      <strong>Information Collection System</strong>
                      <div>
                        You have to provide us with personal information like your name,
                        contact no, mailing address and email id, our app will also fetch
                        your location information in order to give you the best service.
                        Like many other websites, we may record information that your web
                        browser routinely shares, such as your browser type, browser language,
                        software and hardware attributes, the date and time of your visit,
                        the web page from which you came, your Internet Protocol address and
                        the geographic location associated with that address, the pages on
                        this Site that you visit and the time you spent on those pages. This
                        will generally be anonymous data that we collect on an aggregate
                        basis. We may also use Google Analytics or a similar service to
                        gather statistical information about the visitors to this Site and
                        how they use the Site. This, also, is done on an anonymous basis.
                        We will not try to associate anonymous data with your personally
                        identifiable data.
                      </div>
                    </li>
                    <li>
                      <strong>Personal Information</strong>
                      <div>
                        If you want to use our service or contact a Holo Tech Ltd. member, you
                        must create an account on our apps. To establish your account, we will
                        ask for personally identifiable information that can be used to contact
                        or identify you, which may include your name, phone number, and e-mail
                        address. We may also collect demographic information about you and
                        allow you to submit additional information that will be part of your
                        Holo Tech Ltd. profile. <br />
                        Other than basic information that we need to establish your account, it
                        will be up to you to decide how much information to share as part of
                        your profile. We encourage you to think carefully about the information
                        that you share and we recommend that you guard your identity and your
                        sensitive information. Of course, you can review and revise your
                        profile at any time. <br />
                        From time to time, we may run contests or promotions and ask for a
                        postal mailing address and other personal information relating to the
                        contest or promotion. It will always be your choice whether to provide
                        your personal information in order to participate in these events.
                      </div>
                    </li>
                    <li>
                      <strong>Payment Information</strong>
                      <div>
                        We have multiple payment systems, but if you are a Customer, you have to
                        pay the fare to the driver directly, whatever the method you both
                        agree to use. And if you are a registered driver, you can pay us
                        through the integrated payment system in the app.
                      </div>
                    </li>
                    <li>
                      <strong>Uses of collected Information</strong>
                      <div>
                        We will generally use the information that we collect to provide our services, to monitor
                        and analyze visitor activity on our website, promote and support our services, and develop
                        a knowledge base regarding our website and apps users. As detailed below, certain
                        information that you provide may be available to visitors to the app, and some information
                        will be shared between Customers and Holo Employees and/or Drivers.
                      </div>
                    </li>
                    <li>
                      <strong>Registered Holo Tech Ltd. Users</strong>
                      <div>
                        When you register on our Site or App, you will create a user name and
                        profile. Your user name and profile will be accessible by the users of
                        our apps. With your prior permission, we may also share information
                        about your use of the service on third party sites. <br />
                        If you post a job as a Customer, we may publish the address of the
                        pickup and destination locations on the app, viewable by all Holo
                        Tech Ltd. Teams or Drivers. For example, if you choose to post a job
                        to the app for a specific Driver, we will publish the address of the
                        pickup and destination locations on the App, viewable to that specific
                        Driver.
                      </div>
                    </li>
                    <li>
                      <strong>Contact Information</strong>
                      <div>
                        When you provide us with your contact information, we will use that
                        information to communicate with you about your use of our service. We
                        will also share your contact information with the Drivers so that you
                        may contact each other about the transaction.
                      </div>
                    </li>
                    <li>
                      <strong>Testimonials</strong>
                      <div>
                        We may allow you to submit testimonials about your experience with our
                        apps. If you provide a testimonial, we may post it on this website
                        along with your name. If you want your testimonial removed, please
                        contact us at holotechlimited@gmail.com.
                      </div>
                    </li>
                    <li>
                      <strong>Ratings And Reviews</strong>
                      <div>
                        If you are a Customer, you will be able to rate and review a Driver
                        and vice versa. If you choose to submit a rating, this will be
                        aggregated with other ratings and available to other registered
                        users of the apps. If you submit a review, your review along with
                        your username will be posted for everyone to see.
                      </div>
                    </li>
                    <li>
                      <strong>Anonymous Data</strong>
                      <div>
                        We use the anonymous data that we collect on an aggregate basis to
                        gain a better understanding of the users of our apps and to improve
                        our service quality. We reserve the right to license or sell this
                        aggregated information to third parties for industry analysis,
                        demographic profiling and other purposes, but this information will
                        not contain your individually identifiable personal information.
                      </div>
                    </li>
                    <li>
                      <strong>Referrals</strong>
                      <div>
                        We may provide you with the opportunity to refer a potential customer
                        to our Holo Tech Ltd. services and earn a commission on the referral.
                      </div>
                    </li>
                    <li>
                      <strong>Information Shared With Our Business Partners</strong>
                      <div>
                        We may use business partners to help us design and operate our apps
                        and provide services to support the apps. We may also hire a company
                        to run certain applications, provide data storage and processing
                        services, or help us analyze our data. These business partners may
                        have access to the personal information that we keep, but only so
                        that they may perform these tasks on our behalf. We do not allow
                        these business partners to make any independent commercial use of
                        the individually identifiable information that we store, to share
                        such data with third parties or from making the data publicly
                        available. Please keep in mind, however, that if you establish a
                        separate relationship with one of these business partners, the
                        information you provide directly to that organization will be subject
                        to its terms of use and its privacy practices. <br />
                        We may also provide your personal information to our business partners
                        or other trusted entities for the purpose of providing you with
                        information on goods or services we believe will be of interest to
                        you. You can, at any time, opt out of receiving such communications.
                        Third party vendors, including Google, use cookies to serve ads based
                        on a user’s prior visits to Holo Tech Ltd.. You can disable these
                        specific cookies that track prior visits for the sake of follow-up
                        advertising by opting out at http://www.google.com/privacy_ads.html.
                      </div>
                    </li>
                    <li>
                      <strong>Law Enforcement And Legal Actions</strong>
                      <div>
                        We may release your information without prior notice when we believe
                        it is appropriate to prevent fraud or to prevent or stop activity
                        that we know or suspect may be illegal, unethical or legally
                        actionable; to comply with law or to cooperate with law enforcement
                        activity or other governmental request; to respond to subpoenas,
                        court orders or administrative agency requests for information; to
                        enforce our policies; to protect the rights, property and safety of
                        our business and of others; or when otherwise required by law. If
                        there is a sale or merger of the company, division or business unit
                        that operates this Site and apps, we may also transfer the information
                        we have collected in connection with such sale or merger. <br />
                        We will use the information we collect to continuously improve our
                        business and our website development. Your comments and suggestions
                        are always appreciated. Please contact us at holotechlimited@gmail.com
                        if you have any comments or suggestions.
                      </div>
                    </li>
                    <li>
                      <strong>Third Party Websites</strong>
                      <div>
                        This Site and apps may contain links to other websites operated by
                        companies that are not affiliated with us. Also, you may have come to
                        this website from a website that is not operated by us. We are not
                        responsible for the operation of these other sites or the information
                        that they collect from their visitors. If you would like to know how
                        another site collects and uses your information, please review its
                        privacy policy.
                      </div>
                    </li>
                    <li>
                      <strong>Information Alteration</strong>
                      <div>
                        The information you provide us is not permanent. You may review,
                        update, correct or delete the personal information in your profile
                        at any time. If you would like us to remove your information from our
                        records, please contact us at holotechlimited@gmail.com. We will
                        attempt to accommodate your request if we do not have a legal
                        obligation to retain the record.
                      </div>
                    </li>
                    <li>
                      <strong>Information of the Devices</strong>
                      <div>
                        When you use your mobile device to access our service or visit our
                        site or apps for interaction and information, we may receive
                        information about your mobile device, including the hardware models,
                        device IP address, SDK versions, operating systems and versions,
                        software, preferred language and country site, internet browser,
                        unique device identifiers, advertising identifiers, serial numbers
                        and mobile network information. <br />
                        We and our service providers and third parties we collaborate with,
                        including ad networks, may use cross-device/cross-context tracking.
                        For example, you might use multiple browsers on a single device, or
                        use various devices (such as desktops, smartphones, and tablets),
                        which can result in you having multiple accounts or profiles across
                        these various contexts and devices. Cross-device/cross-context
                        technology may be used to connect these various accounts or profiles
                        and the corresponding data from the different contexts and devices.
                        Device information i.e. the devices you use (mobile phones, computers,
                        tablets, etc.) to access our services such as the hardware models,
                        operation system information, software information and version, file
                        names, language preferences, IP address cookie information,
                        advertising identifiers, browser version, device settings, and mobile
                        network information. We may recognize your devices to provide you with
                        personalized experiences and advertising across the services you use.
                      </div>
                    </li>
                    <li>
                      <strong>Data Protection</strong>
                      <div>
                        If you have registered on this Site or apps, you should be sure to
                        protect your user ID and password to prevent others from being able
                        to access the Site or apps in your name. You should also be on guard
                        for “phishing” scams and similar types of identity theft schemes. We
                        do not and will not, at any time, request your credit card information,
                        your account ID, login password, or national identification numbers
                        in a non-secure or unsolicited e-mail or telephone communication. <br />
                        If there is a breach of security involving your personal data that
                        requires notification, you agree that we may notify you about the
                        breach via email or by a conspicuous posting on this Site or apps.
                        We will make the notification without unreasonable delay, consistent
                        with the legitimate needs of law enforcement and any measures
                        necessary to determine the scope of the breach and restore the
                        reasonable integrity of the data system. <br />
                        If you have any questions about security on our website or apps,
                        you can contact us at holotechlimited@gmail.com.
                      </div>
                    </li>
                    <li>
                      <strong>Data Integrity</strong>
                      <div>
                        We use the information that we collect about you only for the purposes
                        for which it is collected and consistent with this policy. We keep
                        information provided to us for as long as we believe necessary for
                        our business purposes and as permitted by applicable law.
                      </div>
                    </li>
                    <li>
                      <strong>Changes To This Policy</strong>
                      <div>
                        Our business and the laws that regulate us change from time to time,
                        and we reserve the right to change this policy. If we do change this
                        policy, we will post the revised version on this Site. If we propose
                        to change our policy in a way that would permit us to make additional
                        uses of information that we had previously collected about you, we
                        will provide you with a meaningful way to opt out of those additional
                        uses.
                      </div>
                    </li>
                    <li>
                      <strong>Data Subject To Bangladesh Law</strong>
                      <div>
                        Holo Tech Ltd. is located and operates its website and apps in Dhaka,
                        Bangladesh. Depending on where you live, the information that you
                        provide and that this Site or apps collect may be stored on servers
                        that are outside of your country or other governmental jurisdiction,
                        and the privacy laws that apply may not be as protective as those in
                        your home jurisdiction. If you are located outside Bangladesh and
                        choose to provide information to us, Bangladesh transfers personal
                        information to other countries and processes it there. By using this
                        website, you consent to this transfer and processing of data.
                      </div>
                    </li>
                    <li>
                      <strong>Children Policy</strong>
                      <div>
                        While our Site is available for all to come visit, you must be an
                        adult to register on our website or apps and use our services. We
                        will not knowingly collect information about children under the age
                        of 18. If you are a parent who believes that we have collected
                        information about a child under age 18, please contact us at
                        holotechlimited@gmail.com with your child’s name and address, and we
                        will be happy to delete the information we have about your child
                        from our records in accordance with childrens act 2013.
                      </div>
                    </li>
                    <li>
                      <strong>This Policy Is An Agreement</strong>
                      <div>
                        When you visit this Site or apps, you are accepting the practices
                        described in this Privacy Policy.
                      </div>
                    </li>
                    <li>
                      <strong>Our Contact</strong>
                      <div>
                        Please contact us at holotechlimited@gmail.com and let us know if
                        you have any questions or comments about our policies or practices.
                      </div>
                    </li>
                  </ol>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        {/* PAGE DETAILS AREA END */}

        <FooterWhite />
      </>
    );
  }
}

export default Privacy;