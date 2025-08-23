import React, { Component } from "react";
import { Link } from "react-router-dom";
import HeaderWhite from "../components/headerwhite";
import FooterWhite from "../components/footerwhite";
import MobileNav from "../components/mobilenav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import Accordion from "react-bootstrap/Accordion";
import loadjs from "loadjs";
import styles from "./Faq.module.css";
import commonStyles from "./Common.module.css";

class Faq extends Component {
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
              <h1 className={commonStyles.sectionTitle}>Frequently Asked Question</h1>
            </div>
            <div className={commonStyles.breadcrumbList}>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>Frequently Asked Question</li>
              </ul>
            </div>
          </div>
        </div>
        {/* BREADCRUMB AREA END */}
        {/* FAQ AREA START */}
        <div className={styles.faqArea}>
          <div className={styles.container}>
            <div className={styles.row}>
              <div className={styles.colLg12}>
                <div className={styles.faqInner}>
                  <h2 className={styles.faqTitle}>FAQ</h2>

                  <Accordion>
  <Accordion.Item eventKey="0">
    <Accordion.Header>
      How to request a ride? <br />
      কীভাবে রাইড রিকোয়েস্ট করবেন?
    </Accordion.Header>
    <Accordion.Body>
      <div className={styles.videoImg}>
        <img
          src="img/Holo-Logo-Icon.png"
          height="120"
          width="120"
          alt="video popup bg image"
        />
        <a
          className="ltn__video-icon-2 ltn__video-icon-2-small ltn__video-icon-2-border----"
          href="https://www.youtube.com/embed/LjCzPp-MK48?autoplay=1&showinfo=0"
          data-rel="lightcase:myCollection"
        >
          <i className="fa fa-play" />
        </a>
      </div>
      <p>
        You have to download the app from Google Play Store, sign up using your mobile number, and log in to the app to use it. You can search for a ride from the app in two modes: regular and quick rides.
        <br />
        আপনাকে গুগল প্লে স্টোর থেকে অ্যাপটি ডাউনলোড করতে হবে, মোবাইল নম্বর দিয়ে সাইন আপ করতে হবে এবং অ্যাপে লগ ইন করতে হবে। আপনি অ্যাপ থেকে দুটি মোডে রাইড খুঁজতে পারবেন: নিয়মিত এবং দ্রুত রাইড।
      </p>
    </Accordion.Body>
  </Accordion.Item>
  <br/>
  <br/>
  <Accordion.Item eventKey="1">
    <Accordion.Header>
      What is the cancellation fee? <br />
      ক্যান্সেলেশন ফি আছে কি না?
    </Accordion.Header>
    <Accordion.Body>
      <p>
        There is no cancellation fee, but we need to know the cause of the cancellation so that we can solve the problem and provide better service for the user next time. If you cancel, please let us know.
        <br />
        কোনও বাতিলকরণ ফি নেই, তবে আমাদের বাতিলের কারণ জানতে হবে যাতে আমরা সমস্যাটি সমাধান করতে পারি এবং ভবিষ্যতে আরও ভাল পরিষেবা দিতে পারি। আপনি বাতিল করলে, আমাদের জানান।
      </p>
    </Accordion.Body>
  </Accordion.Item>

  <Accordion.Item eventKey="2">
    <Accordion.Header>
      What to do if the map takes time to load or the nearest Holo zone is empty? <br />
      ম্যাপ লোড হতে দেরি হলে বা নিকটস্থ হোলো জোন খালি থাকলে কী করবেন?
    </Accordion.Header>
    <Accordion.Body>
      <p>
        Refresh the map using the refresh button on the nearest Holo zone field. If the map or Holo zone still doesn’t load, please restart the app and try again.
        <br />
        নিকটস্থ হোলো জোন ফিল্ডের রিফ্রেশ বাটন ব্যবহার করে ম্যাপ রিফ্রেশ করুন। ম্যাপ বা হোলো জোন এখনও লোড না হলে, অ্যাপটি রিস্টার্ট করে আবার চেষ্টা করুন।
      </p>
    </Accordion.Body>
  </Accordion.Item>

  <Accordion.Item eventKey="3">
    <Accordion.Header>
      What to do if the app gets hanged, takes too much time to load, or the display turns blank? <br />
      অ্যাপ হ্যাং করলে, লোড হতে বেশি সময় নিলে বা ডিসপ্লে ফাঁকা হয়ে গেলে কী করবেন?
    </Accordion.Header>
    <Accordion.Body>
      <p>
        Please restart the app, log out, log in, and try again.
        <br />
        অ্যাপটি রিস্টার্ট করুন, লগ আউট করে আবার লগ ইন করুন এবং চেষ্টা করুন।
      </p>
    </Accordion.Body>
  </Accordion.Item>

  <Accordion.Item eventKey="4">
    <Accordion.Header>
      The messenger doesn’t load, what to do? <br />
      মেসেঞ্জার লোড না হলে কী করবেন?
    </Accordion.Header>
    <Accordion.Body>
      <p>
        The Messenger and WhatsApp take time to redirect. Please wait a few seconds after pressing the button and you will be taken to Messenger/WhatsApp.
        <br />
        মেসেঞ্জার ও হোয়াটসঅ্যাপে রিডাইরেক্ট হতে কিছু সময় লাগে। বাটনে চাপ দেওয়ার পরে কিছুক্ষণ অপেক্ষা করুন, আপনাকে মেসেঞ্জার/হোয়াটসঅ্যাপে নিয়ে যাওয়া হবে।
      </p>
    </Accordion.Body>
  </Accordion.Item>

  <Accordion.Item eventKey="5">
    <Accordion.Header>
      Who will pay the tolls for roads/flyovers/tunnels? <br />
      রাস্তা/ফ্লাইওভার/টানেলের টোল কে দেবে?
    </Accordion.Header>
    <Accordion.Body>
      <p>
        Jatri will pay.
        <br />
        যাত্রী দেবে।
      </p>
    </Accordion.Body>
  </Accordion.Item>

  <Accordion.Item eventKey="6">
    <Accordion.Header>
      The referral point/chalok point doesn’t add up although the chalok put my number in reference? <br />
      চালক রেফারেন্সে আমার নাম্বার দিলেও পয়েন্ট যোগ হচ্ছে না কেন?
    </Accordion.Header>
    <Accordion.Body>
      <p>
        The chalok may have bought the package using existing chalok points. In that case, no referral points will be added. Points are given only when the package is bought with payment.
        <br />
        চালক সম্ভবত পূর্বের অর্জিত চালক পয়েন্ট ব্যবহার করে প্যাকেজ কিনেছে। সেই ক্ষেত্রে রেফারেন্স পয়েন্ট যোগ হবে না। শুধুমাত্র পেমেন্টের মাধ্যমে প্যাকেজ কেনার ক্ষেত্রে পয়েন্ট দেওয়া হয়।
      </p>
    </Accordion.Body>
  </Accordion.Item>
</Accordion>
                  
                  <div className={styles.supportSection}>
                    <h4 className={styles.supportSubtitle}>
                      If You Want to Delete Your Account, Click{" "}
                      <Link to="/delete-account">
                        <em>Here.</em>
                      </Link>
                    </h4>
                    <h2 className={styles.supportTitle}>
                      Still need help? Reach out to support 24/7:
                    </h2>
                    <div className={styles.btnWrapper}>
                      <Link to="/contact" className={styles.themeBtn}>
                        Contact Us
                      </Link>
                    </div>
                    <h3 className={styles.supportContact}>
                      <FontAwesomeIcon icon={faPhone} /> 09638-991110
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* FAQ AREA END */}
        <FooterWhite />
      </>
    );
  }
}

export default Faq;