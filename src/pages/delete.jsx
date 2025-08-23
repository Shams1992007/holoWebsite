import React from "react";
import { Link } from "react-router-dom";
import loadjs from "loadjs";
import HeaderWhite from "../components/headerwhite";
import FooterWhite from "../components/footerwhite";
import MobileNav from "../components/mobilenav";
import axios from "axios";
import styles from "./Delete.module.css";
import commonStyles from "./Common.module.css";

const delete_url = "https://api.holoapp.tech/accounts/delete-account";
const login_url = "https://api.holoapp.tech/accounts/login";

class Delete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      token: '',
      showLoginModal: false,
      showDeleteModal: false,
      isMobileMenuOpen: false,
    };
    this.menuRef = React.createRef();
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    axios
      .post(login_url, { username, password })
      .then((response) => {
        console.log("token", response.data.access);
        this.setState({ token: response.data.access, showLoginModal: true });
      })
      .catch((error) => {
        console.error('Login Error:', error);
        alert('Login failed. Please check your credentials.');
      });
  };

  handleDeleteAccount = () => {
    if (this.state.token === '') {
      alert('Token is missing. Please log in and try again.');
      return;
    }

    axios
      .delete(delete_url, {
        headers: {
          Authorization: `Bearer ${this.state.token}`,
        },
      })
      .then((response) => {
        console.log("Account Deletion Response:", response.data.status);
        this.setState({ showLoginModal: false, showDeleteModal: true });
      })
      .catch((error) => {
        console.error('Account Deletion Error:', error);
        alert('Account deletion failed. Please try again later.');
      });
  };

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
    loadjs("./js/plugins.js");
    loadjs("./js/main.js");
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleOutsideClick);
  }

  render() {
    const {
      username,
      password,
      confirmPassword,
      showLoginModal,
      showDeleteModal,
      isMobileMenuOpen,
    } = this.state;

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
              <h1 className={commonStyles.sectionTitle}>Delete Account</h1>
            </div>
            <div className={commonStyles.breadcrumbList}>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>Delete Account</li>
              </ul>
            </div>
          </div>
        </div>
        {/* BREADCRUMB AREA END */}
        <div className={styles.pageDetailsArea}>
          <div className={styles.container}>
            <div className={styles.row}>
              <div className={styles.colLg12}>
                <div className={styles.sectionTitleArea}>
                  <h1 className={styles.sectionTitle}>Delete Your Account</h1>
                </div>
                <div className={styles.sectionTitleArea}>
                  <h3 className={styles.sectionSubtitle}>Procedure</h3>
                  <div className={styles.byAgree}>
                    <p>1. Enter your HOLO username number and password</p>
                    <p>2. Press the submit button</p>
                    <p className={styles.note}>
                      <strong>
                        Note: According to the Ride Sharing Regulations by the government of
                        Bangladesh, we are obligated to keep the records of your personal
                        information and ride histories. <br />
                        Your account will no longer be active once you follow these steps,
                        but the past ride records will be accessible by Holo
                        and will be handed over to the government of Bangladesh in case of any
                        emergency.
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.colLg6Offset3}>
                <div className={styles.accountLoginInner}>
                  <form
                    className={styles.formBox}
                    onSubmit={this.handleSubmit}
                  >
                    <input
                      type="text"
                      name="username"
                      value={username}
                      onChange={this.handleInputChange}
                      placeholder="Enter your HOLO username"
                      className={styles.inputField}
                    />
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={this.handleInputChange}
                      placeholder="Password*"
                      className={styles.inputField}
                    />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={this.handleInputChange}
                      placeholder="Confirm Password*"
                      className={styles.inputField}
                    />
                    <div className={styles.btnWrapper}>
                      <button
                        className={styles.submitBtn}
                        type="submit"
                      >
                        Delete
                      </button>
                    </div>
                  </form>
                  {showLoginModal && (
                    <div className={styles.modal}>
                      <div className={styles.modalContent}>
                        <span
                          className={styles.close}
                          onClick={() => this.setState({ showLoginModal: false })}
                        >
                          ×
                        </span>
                        <h2>Are you sure you want to delete your account?</h2>
                        <div className={styles.btnWrapper}>
                          <button
                            className={styles.modalBtnPrimary}
                            onClick={this.handleDeleteAccount}
                          >
                            Yes
                          </button>
                          <button
                            className={styles.modalBtnSecondary}
                            onClick={() => this.setState({ showLoginModal: false })}
                          >
                            No
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  {showDeleteModal && (
                    <div className={styles.modal}>
                      <div className={styles.modalContent}>
                        <span
                          className={styles.close}
                          onClick={() => this.setState({ showDeleteModal: false })}
                        >
                          ×
                        </span>
                        <h2>Account Deleted Successfully</h2>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <FooterWhite />
      </>
    );
  }
}

export default Delete;
