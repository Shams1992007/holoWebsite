import React, { Component } from "react";
import { Link } from "react-router-dom";
import HeaderWhite from "../components/headerwhite";
import MobileNav from "../components/mobilenav";
import FooterWhite from "../components/footerwhite";
import styles from "./Offer.module.css";
import commonStyles from "./Common.module.css";

class Offer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "jatri", // Default to Jatri
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

  handleTabChange = (key) => {
    this.setState({ activeTab: key });
  };

  render() {
    const { activeTab, isMobileMenuOpen } = this.state;
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
        <div className={commonStyles.breadcrumbArea}>
          <div className={commonStyles.breadcrumbInner}>
            <div className={commonStyles.sectionTitleArea}>
              <h6 className={commonStyles.sectionSubtitle}>Welcome to Holo</h6>
              <h1 className={commonStyles.sectionTitle}>Offers</h1>
            </div>
            <div className={commonStyles.breadcrumbList}>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>Offers</li>
              </ul>
            </div>
          </div>
        </div>
        {/* BREADCRUMB AREA END */}

        {/* OFFER AREA START */}
        <div className={styles.offerArea}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className={styles.offerTabs}>
                  <button
                    className={`${styles.navLink} ${activeTab === "jatri" ? styles.active : ""}`}
                    onClick={() => this.handleTabChange("jatri")}
                    aria-selected={activeTab === "jatri"}
                    role="tab"
                  >
                    Jatri
                  </button>
                  <button
                    className={`${styles.navLink} ${activeTab === "chalok" ? styles.active : ""}`}
                    onClick={() => this.handleTabChange("chalok")}
                    aria-selected={activeTab === "chalok"}
                    role="tab"
                  >
                    Chalok
                  </button>
                </div>
                <div className={styles.tabContent} role="tabpanel">
                  {activeTab === "jatri" && (
                    <div>
                      <h2 className={styles.sectionTitle}>Jatri Offers and Rewards</h2>
                      <div className={styles.offerDetails}>
                        <ul>
                          <li>
                            <strong>Reward Point Offer</strong>
                            <ol>
                              <li>
                                Top Holo Points earner in the leaderboard receives BDT 1,000 weekly. The next four receive BDT 100 mobile recharge.
                              </li>
                              <li>
                                Monthly top earner gets BDT 15,000, with the next four receiving BDT 1,500.
                              </li>
                              <li>
                                Annual top earner receives BDT 150,000, with the next four getting BDT 15,000.
                              </li>
                            </ol>
                          </li>
                          <li>
                            <strong>পুরস্কার পয়েন্ট অফার</strong>
                            <div>
                              <ol>
                                <li>
                                  লিডারবোর্ডে শীর্ষ হোলো পয়েন্ট অর্জনকারী প্রতি সপ্তাহে ১,০০০ টাকা পান। পরবর্তী চারজন প্রত্যেকে ১০০ টাকার মোবাইল রিচার্জ পান।
                                </li>
                                <li>
                                  মাসিক শীর্ষ অর্জনকারী ১৫,০০০ টাকা পান, পরবর্তী চারজন ১,৫০০ টাকা পান।
                                </li>
                                <li>
                                  বার্ষিক শীর্ষ অর্জনকারী ১৫০,০০০ টাকা পান, পরবর্তী চারজন ১৫,০০০ টাকা পান।
                                </li>
                              </ol>
                            </div>
                          </li>
                          <li>
                            <strong>Reward Point Offer Rules</strong>
                            <ol>
                              <li>20 points per successful ride.</li>
                              <li>
                                Ties are broken by average daily rides, then highest fare paid.
                              </li>
                              <li>
                                Weekly leaderboard: Friday 12 AM to next Friday 12 AM, minimum 140 points.
                              </li>
                              <li>
                                Monthly leaderboard: 1st of month 12 AM to next month 1st 12 AM, minimum 640 points.
                              </li>
                              <li>
                                Annual leaderboard: Jan 1 12 AM to Jan 1 next year 12 AM, minimum 4,000 points.
                              </li>
                              <li>Holo Ltd. has final authority.</li>
                            </ol>
                          </li>
                          <li>
                            <strong>পুরস্কার পয়েন্ট অফারের নিয়ম</strong>
                            <div>
                              <ol>
                                <li>প্রতিটি সফল রাইডের জন্য ২০ পয়েন্ট।</li>
                                <li>
                                  সমতার ক্ষেত্রে গড় দৈনিক রাইড, তারপর সর্বোচ্চ ভাড়া প্রদানের ভিত্তিতে সিদ্ধান্ত নেওয়া হয়।
                                </li>
                                <li>
                                  সাপ্তাহিক লিডারবোর্ড: শুক্রবার ১২ টা থেকে পরবর্তী শুক্রবার ১২ টা, ন্যূনতম ১৪০ পয়েন্ট।
                                </li>
                                <li>
                                  মাসিক লিডারবোর্ড: মাসের ১ তারিখ ১২ টা থেকে পরবর্তী মাসের ১ তারিখ ১২ টা, ন্যূনতম ৬৪০ পয়েন্ট।
                                </li>
                                <li>
                                  বার্ষিক লিডারবোর্ড: ১ জানুয়ারি ১২ টা থেকে পরবর্তী বছরের ১ জানুয়ারি ১২ টা, ন্যূনতম ৪,০০০ পয়েন্ট।
                                </li>
                                <li>হোলো লিমিটেডের চূড়ান্ত কর্তৃত্ব রয়েছে।</li>
                              </ol>
                            </div>
                          </li>
                          <li>
                            <strong>Referral Point Offer</strong>
                            <ol>
                              <li>
                                Top referral points earner gets BDT 10,000 monthly, next four get BDT 1,000.
                              </li>
                              <li>
                                Annual top earner receives BDT 100,000, next four get BDT 10,000.
                              </li>
                            </ol>
                          </li>
                          <li>
                            <strong>রেফারেল পয়েন্ট অফার</strong>
                            <div>
                              <ol>
                                <li>
                                  শীর্ষ রেফারেল পয়েন্ট অর্জনকারী মাসিক ১০,০০০ টাকা পান, পরবর্তী চারজন ১,০০০ টাকা পান।
                                </li>
                                <li>
                                  বার্ষিক শীর্ষ অর্জনকারী ১০০,০০০ টাকা পান, পরবর্তী চারজন ১০,০০০ টাকা পান।
                                </li>
                              </ol>
                            </div>
                          </li>
                          <li>
                            <strong>Referral Point Offer Rules</strong>
                            <ol>
                              <li>
                                5 points per Jatri referral after first ride; 5% of package price for Chalok referral.
                              </li>
                              <li>
                                Ties broken by Chalok referrals, then earlier signup.
                              </li>
                              <li>
                                Monthly: 1st of month 12 AM to next month 1st 12 AM, minimum 100 points.
                              </li>
                              <li>
                                Annual: Jan 1 12 AM to Jan 1 next year 12 AM, minimum 1,500 points.
                              </li>
                              <li>Holo Ltd. has final authority.</li>
                            </ol>
                          </li>
                          <li>
                            <strong>রেফারেল পয়েন্ট অফারের নিয়ম</strong>
                            <div>
                              <ol>
                                <li>
                                  প্রথম রাইডের পর প্রতি যাত্রী রেফারেলে ৫ পয়েন্ট; চালক রেফারেলের জন্য প্যাকেজ মূল্যের ৫%।
                                </li>
                                <li>
                                  সমতার ক্ষেত্রে চালক রেফারেল, তারপর আগের সাইনআপের ভিত্তিতে সিদ্ধান্ত নেওয়া হয়।
                                </li>
                                <li>
                                  মাসিক: মাসের ১ তারিখ ১২ টা থেকে পরবর্তী মাসের ১ তারিখ ১২ টা, ন্যূনতম ১০০ পয়েন্ট।
                                </li>
                                <li>
                                  বার্ষিক: ১ জানুয়ারি ১২ টা থেকে পরবর্তী বছরের ১ জানুয়ারি ১২ টা, ন্যূনতম ১,৫০০ পয়েন্ট।
                                </li>
                                <li>হোলো লিমিটেডের চূড়ান্ত কর্তৃত্ব রয়েছে।</li>
                              </ol>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                  {activeTab === "chalok" && (
                    <div>
                      <h2 className={styles.sectionTitle}>Chalok Offers</h2>
                      <div className={styles.offerDetails}>
                        <ul>
                          <li>
                            <strong>Referral System</strong>
                            <div>
                              Chaloks earn "Chalok Points" via:
                              <ul>
                                <li>
                                  <strong>Package Referral</strong>: Refer a Chalok buying a monthly package. If they enter your phone number, you get 5% of the package value (e.g., BDT 1,500 package yields 75 points).
                                </li>
                                <li>
                                  <strong>Jatri Referral</strong>: Refer a Jatri during signup. You earn 5 points after their first ride.
                                </li>
                              </ul>
                            </div>
                          </li>
                          <li>
                            <strong>Cashout Rules</strong>
                            <div>
                              Cash out with 1,000+ points. 1 point = 1 BDT.
                            </div>
                          </li>
                          <li>
                            <strong>রেফারেল সিস্টেম</strong>
                            <div>
                              চালকরা "চালক পয়েন্ট" অর্জন করেন:
                              <ul>
                                <li>
                                  <strong>প্যাকেজ রেফারেল</strong>: মাসিক প্যাকেজ কিনলে রেফার করুন। আপনার ফোন নম্বর দিলে প্যাকেজ মূল্যের ৫% (যেমন, ১,৫০০ টাকায় ৭৫ পয়েন্ট)।
                                </li>
                                <li>
                                  <strong>যাত্রী রেফারেল</strong>: যাত্রী সাইন আপে রেফার করুন। প্রথম রাইডের পর ৫ পয়েন্ট।
                                </li>
                              </ul>
                            </div>
                          </li>
                          <li>
                            <strong>ক্যাশআউট শর্তাবলী</strong>
                            <div>
                              ১,০০০+ পয়েন্টে ক্যাশআউট। ১ পয়েন্ট = ১ টাকা।
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* OFFER AREA END */}

        <FooterWhite />
      </>
    );
  }
}

export default Offer;