import React, { Component } from "react";
import { Link } from "react-router-dom";
import MobileNav from "../components/mobilenav";
import HeaderWhite from "../components/headerwhite";
import FooterWhite from "../components/footerwhite";
import styles from "./Service.module.css";
import commonStyles from "./Common.module.css";
import zoneData from "../zone.json";

class Service extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobileMenuOpen: false,
      search: "",
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

  handleChange = (e) => {
    this.setState({
      search: e.target.value,
    });
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleOutsideClick);
  }

  render() {
    const { isMobileMenuOpen, search } = this.state;
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
              <h1 className={commonStyles.sectionTitle}>Service Area</h1>
            </div>
            <div className={commonStyles.breadcrumbList}>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>Service Area</li>
              </ul>
            </div>
          </div>
        </div>
        {/* BREADCRUMB AREA END */}
        {/* SERVICE AREA START */}
        <div className={styles.serviceArea}>
          <div className={styles.serviceRow}>
            <div className={styles.serviceInfoWrap}>
              <div className={styles.sectionTitleArea}>
                <h6 className={styles.sectionSubtitle}>Service Area</h6>
                <h1 className={styles.sectionTitle}>
                  Find Our Services Near You
                  <span>.</span>
                </h1>
                <p>Search for ride-sharing services available in your area.</p>
              </div>
              <input
                type="text"
                placeholder="Search Your Area"
                onChange={this.handleChange}
                className={styles.searchInput}
              />
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Region</th>
                      <th>Area</th>
                    </tr>
                  </thead>
                  <tbody>
                    {zoneData
                      .filter((val) => {
                        if (search === "") {
                          return val;
                        } else if (
                          Object.values(val.fields.area_en)
                            .join("")
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        ) {
                          return val;
                        }
                        return null;
                      })
                      .map((val) => (
                        <tr key={val.pk}>
                          <td>{Object.values(val.fields.region)}</td>
                          <td>{Object.values(val.fields.area_en)}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className={styles.btnWrapper}>
                <Link to="/about" className={styles.themeBtn}>
                  ABOUT US
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.callToActionArea}>
          <div className={styles.callToActionInner}>
            <h2>Explore Holo Services</h2>
          </div>
        </div>
        {/* SERVICE AREA END */}
        <FooterWhite />
      </>
    );
  }
}

export default Service;