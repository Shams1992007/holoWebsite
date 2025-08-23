import React, { Component } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HeaderWhite from "../components/headerwhite";
import MobileNav from "../components/mobilenav";
import FooterWhite from "../components/footerwhite";
import styles from "./Terms.module.css";
import commonStyles from "./Common.module.css";

class Terms extends Component {
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
        <div className={commonStyles.breadcrumbArea}>
          <div className={commonStyles.breadcrumbInner}>
            <div className={commonStyles.sectionTitleArea}>
              <h6 className={commonStyles.sectionSubtitle}>Welcome to Holo</h6>
              <h1 className={commonStyles.sectionTitle}>Terms of Service</h1>
            </div>
            <div className={commonStyles.breadcrumbList}>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>Terms of Service</li>
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
                <Link to="/termsBangla" className={styles.themeBtn}>
                  বাংলা
                </Link>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <div className={styles.termsContent}>
                  <strong>Last updated: December 26, 2024</strong>
                  <ol>
                    <li>
                      <strong>INTRODUCTION</strong>
                      <div>
                        Important – please read these terms carefully. By using this Service, you agree that you have read, understood, accepted, and agreed with the Terms and Conditions, and the conditions stated in the Driver’s Code of Conduct. You further agree to the representations made by yourself below. If you do not agree to or fall within the Terms and Conditions of the Service and wish to discontinue using the Service, please do not continue using this Application or Service. The terms and conditions stated herein (collectively, the “Terms and Conditions” or this “Agreement”) constitute a legal agreement between you and Holo Tech Ltd. (“HOLO”).
                        In order to use the Service, you must agree to the Terms and Conditions that are set out below. By using the mobile application supplied to you by HOLO (the “Application”), and downloading, installing, or using any associated software supplied by HOLO (the “Software”) of which the overall purpose is to enable the Service, you hereby expressly acknowledge and agree to be bound by the Terms and Conditions, and any future amendments and additions to these Terms and Conditions as published from time to time at the HOLO website or through the Application.
                      </div>
                    </li>
                    <li>
                      <strong>SERVICES</strong>
                      <div>
                        HOLO offers information, methods, and a platform for transportation providers, drivers, and vehicle operators to schedule, obtain, and establish contact with Passengers or Customers, but does not and does not intend to provide transportation services or act in any way as a taxi operator, transportation carrier, or provider, and has no responsibility or liability for any transportation services provided to Passengers or Customers by you.
                        HOLO reserves the right to modify, vary, or change the terms and conditions of this Agreement or its policies relating to the Service at any time as it deems fit. Such modifications, variations, or changes to the Terms and Conditions policies relating to the Service shall be effective upon the posting of an updated version at the HOLO website. You agree that it shall be your responsibility to review this Agreement regularly, whereupon the continued use of the Service after any such changes, whether or not reviewed by you, shall constitute your consent and acceptance to such changes.
                        Provided that, this ride-sharing business is operated based on a freelancing model, the riders are not employees of HOLO. Concerned individual parties, not HOLO, shall be solely responsible for any and all claims, judgments, and liabilities resulting from any accident, loss, or damage including, but not limited to, personal injuries, death, total loss, and property damages which is due to or is alleged to be a result of the passenger transport.
                      </div>
                    </li>
                    <li>
                      <strong>NOT A TRANSPORTATION PROVIDER</strong>
                      <div>
                        HOLO is a technology company that does not provide or engage in transportation services and is not a transportation provider. The Software and the Application are intended to be used for facilitating you (as a transportation provider) to offer your transportation services to your Passenger or Customer. HOLO is not responsible or liable for the acts and/or omissions with regard to any services you provided to your Passengers, and for any illegal action committed by you. You shall, at all times, not claim or cause any person to misunderstand that you are the agent, employee, or staff of HOLO, and the services provided by you are not, in any way, deemed as services of HOLO.
                      </div>
                    </li>
                    <li>
                      <strong>RIGHT TO REFUSE AND BLACKLIST</strong>
                      <div>
                        Notwithstanding anything herein written, HOLO may, at its sole and absolute discretion, blacklist you permanently or temporarily and reject your request to use the Application and/or Service or any part thereof for such reasons as it deems fit, including but not limited to receiving complaints about you from customers or employees of HOLO about your behavior or interaction with anyone whatsoever (including but not limited to Customers, HOLO’s employees, law enforcement, government authorities) or driving with a competence lower than reasonably expected or negotiating with customers, users for price, destination, etc. other than provided in the application whilst using the Service.
                      </div>
                    </li>
                    <li>
                      <strong>REPRESENTATION AND WARRANTIES</strong>
                      <div>
                        By using the Service, you expressly represent and warrant that you are legally entitled to accept and agree to the Terms and Conditions and that you are at least eighteen (18) years old. Without limiting the generality of the foregoing, the Service is not available to persons under the age of eighteen (18) or such persons that are forbidden for any reason whatsoever to enter into a contractual relationship. By using the Service, you further represent and warrant that you have the right, authority, and capacity to use the Service and to abide by the Terms and Conditions. You further confirm that all the information which you provide shall be true and accurate. Your use of the Service is for your own sole, personal use. You undertake not to authorize others to use your identity or user status, and you may not assign or otherwise transfer your user account to any other person or entity. When using the Service, you agree to comply with all applicable laws of your country. Besides, you will also be bound by applicable laws, rules, and regulations of the country of origin of HOLO where it is registered to the extent it is applicable and consistent with the laws and regulations of your local territorial jurisdiction in pursuant to the bilateral treaty, international business, and commercial laws as formulated from time to time.
                        You may only access the Service using authorized and legal means. It is your responsibility to check and ensure that you download the correct Software for your device. HOLO is not liable if you do not have a compatible handset or if you have downloaded the wrong version of the Software for your handset. HOLO reserves the right to terminate this Agreement should you be using the Service with an incompatible or unauthorized device or for purposes other than which the Application or Software is intended to be used.
                        By using the Service, you represent, warrant, undertake, and agree that:
                        <ul>
                          <li>You possess a valid driver’s license and are authorized to operate a motor vehicle and have all the appropriate licenses, approvals, and authority to provide transportation for hire to third parties in the jurisdiction in which you use the Service;</li>
                          <li>You own, or have the legal right and authority to operate, the vehicle which you intend to use when accepting passengers or customers, and such vehicle is in good operating condition and meets the industry safety standards for vehicles of its kind;</li>
                          <li>You have a valid policy of liability insurance (in industry-standard coverage amounts) for the operation of your motor vehicle/passenger vehicle and/or business insurance to cover any anticipated losses related to the operation of a taxi/passenger delivery service;</li>
                          <li>You shall forthwith provide to HOLO such information and identity documents, including but not limited to National ID Card and Driver’s Licenses, as reasonably requested by HOLO;</li>
                          <li>You shall be solely responsible for any and all claims, judgments, and liabilities resulting from any accident, loss, or damage including, but not limited to, personal injuries, death, total loss, and property damages which is due to or is alleged to be a result of the passenger transport and/or delivery service howsoever operated;</li>
                          <li>You shall obey all local laws related to the operation of passenger transport and/or delivery services and will be solely responsible for any violations of such local laws;</li>
                          <li>You will only use the Service for lawful purposes;</li>
                          <li>You will only use the Service for the purpose for which it is intended to be used;</li>
                          <li>You will not use the Application for sending or storing any unlawful material or for fraudulent purposes;</li>
                          <li>You will not use the Application and/or the Software to cause nuisance, annoyance, inconvenience, or make fake bookings;</li>
                          <li>You will not use the Service, Application, and/or Software for purposes other than obtaining the Service;</li>
                          <li>You shall not contact the Customers for purposes other than the Service;</li>
                          <li>You will not impair the proper operation of the network;</li>
                          <li>You will not try to harm the Service, Application, and/or the Software in any way whatsoever;</li>
                          <li>You will only use the Software and/or the Application for your own use and will not resell it to a third party;</li>
                          <li>You will keep secure and confidential your account password or any identification we provide you which allows access to the Service;</li>
                          <li>You will provide us with whatever proof of identity HOLO may reasonably request or require;</li>
                          <li>You agree to provide accurate, current, and complete information as required for the Service and undertake the responsibility to maintain and update your information in a timely manner to keep it accurate, current, and complete at all times during the term of the Agreement. You agree that HOLO may rely on your information as accurate, current, and complete. You acknowledge that if your information is untrue, inaccurate, not current, or incomplete in any respect, HOLO has the right but not the obligation to terminate this Agreement and your use of the Service at any time with or without notice;</li>
                          <li>You will only use an access point or data account (AP) which you are authorized to use;</li>
                          <li>You shall not employ any means to defraud HOLO or enrich yourself, through any means, whether fraudulent or otherwise, whether or not through any event, promotion, or campaign launched by HOLO to encourage new subscription or usage of the Service by new or existing passengers;</li>
                          <li>You will not use the Service or any part thereof for carrying contraband items as may be listed publicly and updated by HOLO from time to time and if, in the event that you display suspicious behavior, you will fully comply with the request of the third-party service provider, any government authority, and/or law enforcement, to inspect any bags and/or items you are carrying with you which may or may not be readily visible;</li>
                          <li>You are aware that when responding to Passengers’ or Customers’ requests for transportation services, standard telecommunication charges will apply and which shall be solely borne by you;</li>
                          <li>You shall not impair or circumvent the proper operation of the network which the Service operates on;</li>
                          <li>You agree that the Service is provided on a reasonable effort basis;</li>
                          <li>You unconditionally agree to assume full responsibility and liability for all loss or damage suffered by yourself, the Customers or Passengers, HOLO, Merchant, and/or any third party as a result of any breach of the Terms and Conditions by you.</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <strong>LICENSE GRANT & RESTRICTIONS</strong>
                      <div>
                        HOLO and its licensors, where applicable, hereby grants you a revocable, non-exclusive, non-transferable, non-assignable, personal, limited license to use the Application and/or the Software, solely for your own personal purpose, subject to the terms and conditions of this Agreement. All rights not expressly granted to you are reserved by HOLO and its licensors.
                        <br />
                        (a) You shall not:
                        <ul>
                          <li>License, sublicense, sell, resell, transfer, assign, distribute, or otherwise commercially exploit or make available to any third party the Application and/or the Software in any way;</li>
                          <li>Modify or make derivative works based on the Application and/or the Software;</li>
                          <li>Create internet “links” to the Application or “frame” or “mirror” the Software on any other server or wireless or internet-based device;</li>
                          <li>Reverse engineer or access the Software in order to (a) build a competitive product or service, (b) build a product using similar ideas, features, functions, or graphics of the Application and/or the Software, or (c) copy any ideas, features, functions, or graphics of the Application and/or the Software;</li>
                          <li>Launch an automated program or script, including, but not limited to, web spiders, web crawlers, web robots, web ants, web indexers, bots, viruses, or worms, or any program which may make multiple server requests per second, or unduly burdens or hinders the operation and/or performance of the Application and/or the Software;</li>
                          <li>Use any robot, spider, site search/retrieval application, or other manual or automatic device or process to retrieve, index, “data mine”, or in any way reproduce or circumvent the navigational structure or presentation of the Service or its contents;</li>
                          <li>Post, distribute, or reproduce in any way any copyrighted material, trademarks, or other proprietary information without obtaining the prior consent of the owner of such proprietary rights;</li>
                          <li>Remove any copyright, trademark, or other proprietary rights notices contained in the Service.</li>
                        </ul>
                        (b) You may use the Software and/or the Application only for your personal, non-commercial purposes and shall not use the Software and/or the Application to:
                        <ul>
                          <li>Send spam or otherwise duplicative or unsolicited messages;</li>
                          <li>Send or store infringing, obscene, threatening, libelous, or otherwise unlawful or tortious material, including but not limited to materials harmful to children or violation of third party privacy rights;</li>
                          <li>Send material containing software viruses, worms, Trojan horses, or other harmful computer code, files, scripts, agents, or programs;</li>
                          <li>Interfere with or disrupt the integrity or performance of the Software and/or the Application or the data contained therein;</li>
                          <li>Attempt to gain unauthorized access to the Software and/or the Application or its related systems or networks;</li>
                          <li>Impersonate any person or entity or otherwise misrepresent your affiliation with a person or entity to abstain from any conduct that could possibly damage HOLO’s reputation or amount to being disreputable.</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <strong>PAYMENT TERMS</strong>
                      <div>
                        Any fees which HOLO may charge you for the Service are due immediately and are non-refundable (“Service Fee”). This no-refund policy shall apply at all times regardless of your decision to terminate your usage, our decision to terminate or suspend your usage, disruption caused to the Service either planned, accidental, or intentional, or any reason whatsoever.
                        YOU ACKNOWLEDGE THAT THE TOTAL AMOUNT OF FARE PAID TO YOU BY THE PASSENGER OR CUSTOMER INCLUDES THE SOFTWARE USAGE FEE, WHICH YOU ARE COLLECTING ON BEHALF OF HOLO. SUCH SOFTWARE USAGE FEE MAY BE UP TO 100% OF THE FARE STIPULATED FOR THE SERVICE FOR EACH TIME THE PASSENGER OR CUSTOMER COMPLETES A RIDE, WHICH SHALL BE DETERMINED BY HOLO, AT ITS DISCRETION, FROM TIME TO TIME.
                        For prepaid packages, you will pay before you use the software. For post-paid packages, you will pay the due before buying the next package. You understand the significance of this requirement and acknowledge that you may be blacklisted for failure to comply with the aforesaid requirement and that your ability to use the Service shall be barred until due compliance is made in this regard.
                        HOLO may, at its sole discretion, make promotional offers with different features and different rates to any of the Passengers or Customers whereby these promotional offers shall accordingly be honored by you. HOLO may determine or change the Service Fee as HOLO deems in its absolute discretion as necessary or appropriate for the business.
                      </div>
                    </li>
                    <li>
                      <strong>PAYMENT BY PASSENGER</strong>
                      <div>
                        The Passenger or Customer may choose to pay for the Service by cash and, where available, by pre-purchased credits (“HOLO Credits”), provided that in the event the payment is made by HOLO Credits, HOLO shall reimburse to you the portion of the said payment that is due to you as per these Terms and Conditions.
                        Any complaints that the Passenger or Customer shall have regarding the transportation provided by you shall be taken up by the Passenger or Customer with you directly.
                        HOLO retains the right to suspend the processing of any transaction where it reasonably believes that the transaction may be fraudulent, illegal, or involves any criminal activity or where it reasonably believes the Passenger or Customer to be in breach of the Terms and Conditions between the Passenger or Customer and HOLO. In such an event, you shall not hold HOLO liable for any withholding of, delay in, suspension of, or cancellation of, any payment to you.
                        You agree that you will cooperate in relation to any criminal investigation that is required and to assist HOLO in complying with any internal investigations, instructions from the authorities, or requirements of prevailing laws or regulations for the time being in force.
                      </div>
                    </li>
                    <li>
                      <strong>TAXES</strong>
                      <div>
                        You agree that this Agreement shall be subject to all prevailing statutory taxes, duties, fees, charges, and/or costs, however denominated, as may be in force and in connection with any future taxes that may be introduced at any point of time. You further agree to use your best efforts to do everything necessary and required by the relevant laws to enable, assist, and/or defend HOLO to claim or verify any input tax credit, set off, rebate, or refund in respect of any taxes paid or payable in connection with the Services supplied under this Agreement.
                      </div>
                    </li>
                    <li>
                      <strong>CONFIDENTIALITY</strong>
                      <div>
                        You shall maintain in confidence all information and data relating to HOLO, its services, products, business affairs, marketing, and promotion plans or other operations of HOLO and its associated companies which are disclosed to you by or on behalf of HOLO (whether orally or in writing and whether before, on, or after the date of this Agreement) or which are otherwise directly or indirectly acquired by you from HOLO, or any of its affiliated companies, or created in the course of this Agreement. You shall further ensure that you only use such confidential information in order to perform the Services, and shall not, without HOLO’s prior written consent, disclose such information to any third-party nor use it for any other purpose except for providing services under this agreement. You shall only disclose such information to such officers, employees, and agents as need to know it to fulfill its obligations under this Agreement.
                        The above obligations of confidentiality shall not apply to the extent that you can show that the relevant information:
                        <ul>
                          <li>Was at the time of receipt already in the Recipient’s possession;</li>
                          <li>Is, or becomes in the future, public knowledge through no fault or omission of the Recipient;</li>
                          <li>Was received from a third-party having the right to disclose it;</li>
                          <li>Is required to be disclosed by law.</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <strong>PERSONAL DATA PROTECTION</strong>
                      <div>
                        You agree and consent to HOLO using and processing your Personal Data for the Purposes and in the manner as identified hereunder.
                        For the purposes of this Agreement, “Personal Data” means information about you, from which you are identifiable, including but not limited to your name, identification card number, birth certificate number, passport number, nationality, address, telephone number, credit or debit card details, race, gender, date of birth, email address, any information about you which you have provided to HOLO in registration forms, application forms, or any other similar forms and/or any information about you that has been or may be collected, stored, used, and processed by HOLO from time to time and includes sensitive personal data such as data relating to health, religious, or other similar beliefs.
                        The provision of your Personal Data is voluntary. However, if you do not provide HOLO your Personal Data, your request for the Application may be incomplete, and HOLO will not be able to process your Personal Data for the Purposes outlined below and may cause HOLO to be unable to allow you to use the Service.
                        HOLO may use and process your Personal Data for business and activities of HOLO which shall include, without limitation, the following (“the Purpose”):
                        <ul>
                          <li>To perform HOLO’s obligations in respect of any contract entered into with you;</li>
                          <li>To provide you with any services pursuant to the Terms and Conditions herein;</li>
                          <li>To process your participation in any events, promotions, activities, focus groups, research studies, contests, promotions, polls, surveys, or any productions and to communicate with you regarding your attendance thereto;</li>
                          <li>Process, manage, or verify your application for the Service pursuant to the Terms and Conditions herein;</li>
                          <li>To validate and/or process payments pursuant to the Terms and Conditions herein;</li>
                          <li>To develop, enhance, and provide what is required pursuant to the Terms and Conditions herein to meet your needs;</li>
                          <li>To process any refunds, rebates, and/or charges pursuant to the Terms and Conditions herein;</li>
                          <li>To facilitate or enable any checks as may be required pursuant to the Terms and Conditions herein;</li>
                          <li>To respond to questions, comments, and feedback from you;</li>
                          <li>For internal administrative purposes, such as auditing, data analysis, database records;</li>
                          <li>For purposes of detection, prevention, and prosecution of crime;</li>
                          <li>For HOLO to comply with its obligations under law;</li>
                          <li>To send you alerts, newsletters, updates, mailers, promotional materials, special privileges, festive greetings from HOLO, its partners, advertisers, and/or sponsors;</li>
                          <li>To notify and invite you to events or activities organized by HOLO, its partners, advertisers, and/or sponsors;</li>
                          <li>To share your Personal Data amongst the companies within HOLO’s group of companies comprising the subsidiaries, associate companies, and/or jointly controlled entities of the holding company of the group (“the Group”) and with HOLO’s and Group’s agents, third party providers, developers, advertisers, partners, event companies, or sponsors who may communicate with you for any reasons whatsoever.</li>
                        </ul>
                        If you do not consent to HOLO processing your Personal Data for any of the Purposes, please notify HOLO using the support contact details as provided in the Application.
                        If any of the Personal Data that you have provided to us changes, for example, if you change your email address, telephone number, payment details, or if you wish to cancel your account, please update your details by sending your request to the support contact details as provided in the Application. HOLO will, to the best of our abilities, effect such changes as requested within fourteen (14) working days of receipt of such notice of change.
                        By submitting your information, you consent to the use of that information as set out in the form of submission and in this Agreement.
                      </div>
                    </li>
                    <li>
                      <strong>THIRD PARTY INTERACTIONS</strong>
                      <div>
                        During the Service tenure, you may enter into correspondence with, provide services to, or participate in promotions of third-party providers, advertisers, or sponsors showing their goods and/or services through the Service, Software, and/or the Application. Any such activity, and any terms, conditions, warranties, or representations associated with such activity are solely between you and the applicable third-party. HOLO and its licensors shall have no liability, obligation, or responsibility for any such correspondence, purchase, transaction, or promotion between you and any such third-party. The Group does not endorse any applications or sites on the Internet that are linked through the Service, Application, and/or the Software, and in no event shall HOLO, its licensors, or the Group be responsible for any content, products, services, or other materials on or available from such sites or third-party providers. HOLO provides the Service to you pursuant to the Terms and Conditions. You recognize, however, that certain third-party providers of transportation, goods, and/or services may require your agreement to additional or different terms and conditions prior to your use of or access to such goods or services, and HOLO is not a party to and disclaims any and all responsibility and/or liability arising from such agreements between you and the third-party providers.
                      </div>
                    </li>
                    <li>
                      <strong>INDEMNIFICATION</strong>
                      <div>
                        By agreeing to this Agreement for providing the Service, you agree that you shall defend, indemnify, and hold HOLO, its licensors, and each such party’s parent organizations, subsidiaries, affiliates, officers, directors, members, employees, attorneys, and agents harmless from and against any and all claims, costs, damages, losses, liabilities, and expenses (including attorneys’ fees and costs) arising out of or in connection with:
                        <ul>
                          <li>Your violation or breach of any term of these Terms and Conditions or any applicable law or regulation, including any local laws or ordinances, whether or not referenced herein;</li>
                          <li>Your violation of any rights of any third party, including, but not limited to, passengers of your vehicle or the vehicle that you have control over, other motorists, and pedestrians, as a result of your own interaction with any third party;</li>
                          <li>Your use (or misuse) of the Application and/or Software;</li>
                          <li>Your ownership, use, or operation of a motor vehicle or passenger vehicle, including your carriage of Passengers or Customers who have procured your transportation services via the Service, or of their goods.</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <strong>DISCLAIMER OF WARRANTIES</strong>
                      <div>
                        HOLO MAKES NO REPRESENTATION, WARRANTY, OR GUARANTEE AS TO THE RELIABILITY, TIMELINESS, QUALITY, SUITABILITY, AVAILABILITY, ACCURACY, OR COMPLETENESS OF THE SERVICES, APPLICATION, AND/OR THE SOFTWARE. HOLO DOES NOT REPRESENT OR WARRANT THAT (A) THE USE OF THE SERVICE, APPLICATION, AND/OR THE SOFTWARE WILL BE SECURE, TIMELY, UNINTERRUPTED, OR ERROR-FREE OR OPERATE IN COMBINATION WITH ANY OTHER HARDWARE, SOFTWARE, SYSTEM, OR DATA, (B) THE SERVICE WILL MEET YOUR REQUIREMENTS OR EXPECTATIONS, (C) ANY STORED DATA WILL BE ACCURATE OR RELIABLE, (D) THE QUALITY OF ANY PRODUCTS, SERVICES, INFORMATION, OR OTHER MATERIALS PURCHASED OR OBTAINED BY YOU THROUGH THE APPLICATION WILL MEET YOUR REQUIREMENTS OR EXPECTATIONS, (E) ERRORS OR DEFECTS IN THE APPLICATION AND/OR THE SOFTWARE WILL BE CORRECTED, OR (F) THE APPLICATION OR THE SERVER(S) THAT MAKE THE APPLICATION AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS, OR (G) THE APPLICATION AND/OR THE SOFTWARE TRACKS YOU OR THE VEHICLE USED BY THE TRANSPORTATION PROVIDER. THE SERVICE IS PROVIDED TO YOU STRICTLY ON AN “AS IS” BASIS. ALL CONDITIONS, REPRESENTATIONS, AND WARRANTIES, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING, WITHOUT LIMITATION, ANY IMPLIED WARRANTY OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT OF THIRD PARTY RIGHTS, ARE HEREBY EXCLUDED AND DISCLAIMED TO THE HIGHEST AND MAXIMUM EXTENT.
                        HOLO MAKES NO REPRESENTATION, WARRANTY, OR GUARANTEE AS TO THE RELIABILITY, SAFETY, TIMELINESS, QUALITY, SUITABILITY, OR AVAILABILITY OF ANY SERVICES, INCLUDING BUT NOT LIMITED TO THE TRANSPORTATION SERVICES PROVIDED BY YOU TO CUSTOMERS OR PASSENGERS THROUGH THE USE OF THE SERVICE, APPLICATION, AND/OR THE SOFTWARE. YOU ACKNOWLEDGE AND AGREE THAT THE ENTIRE RISK ARISING OUT OF SUCH USE OF THE SERVICES REMAINS SOLELY AND ABSOLUTELY WITH YOU AND YOU SHALL HAVE NO RECOURSE WHATSOEVER AGAINST HOLO.
                      </div>
                    </li>
                    <li>
                     bookmark
                      <strong>INTERNET DELAYS</strong>
                      <div>
                        THE SERVICE, APPLICATION, AND/OR THE SOFTWARE MAY BE SUBJECT TO LIMITATIONS, DELAYS, AND OTHER PROBLEMS INHERENT IN THE USE OF THE INTERNET AND ELECTRONIC COMMUNICATIONS INCLUDING THE DEVICE USED BY YOU BEING FAULTY, NOT CONNECTED, OUT OF RANGE, SWITCHED OFF, OR NOT FUNCTIONING. HOLO IS NOT RESPONSIBLE FOR ANY DELAYS, DELIVERY FAILURES, DAMAGES, OR LOSSES RESULTING FROM SUCH PROBLEMS.
                      </div>
                    </li>
                    <li>
                      <strong>LIMITATION OF LIABILITY</strong>
                      <div>
                        ANY CLAIMS AGAINST HOLO BY YOU SHALL IN ANY EVENT BE LIMITED TO THE AGGREGATE AMOUNT OF ALL AMOUNTS ACTUALLY PAID BY AND/OR DUE FROM YOU IN UTILISING THE SERVICE DURING THE EVENT GIVING RISE TO SUCH CLAIMS. IN NO EVENT SHALL HOLO AND/OR ITS LICENSORS BE LIABLE TO YOU OR ANYONE FOR ANY DIRECT, INDIRECT, PUNITIVE, ECONOMIC, FUTURE SPECIAL, EXEMPLARY, INCIDENTAL, CONSEQUENTIAL, OR OTHER DAMAGES OR LOSSES OF ANY TYPE OR KIND (INCLUDING PERSONAL INJURY OF ANY KIND WHATSOEVER INCLUDING LOSS OF LIFE OR LIMBS OR SERIOUS HARM OF ANY KIND WHATSOEVER, EMOTIONAL DISTRESS, AND LOSS OF DATA, GOODS, REVENUE, PROFITS, USE, OR OTHER ECONOMIC ADVANTAGE). HOLO AND/OR ITS LICENSORS SHALL NOT BE LIABLE FOR ANY LOSS, DAMAGE, OR INJURY WHICH MAY BE INCURRED BY OR CAUSED TO YOU OR TO ANY PERSON FOR WHOM YOU HAVE BOOKED THE SERVICE FOR, INCLUDING BUT NOT LIMITED TO LOSS, DAMAGE, OR INJURY ARISING OUT OF, OR IN ANY WAY CONNECTED WITH THE SERVICE, APPLICATION, AND/OR THE SOFTWARE, INCLUDING BUT NOT LIMITED TO THE USE OR INABILITY TO USE THE SERVICE, APPLICATION, AND/OR THE SOFTWARE, ANY RELIANCE PLACED BY YOU ON THE COMPLETENESS, ACCURACY, OR EXISTENCE OF ANY ADVERTISING, OR AS A RESULT OF ANY RELATIONSHIP OR TRANSACTION BETWEEN YOU AND ANY CUSTOMER, PASSENGER, OR THIRD PARTY APPLICATION AND/OR THE SOFTWARE, EVEN IF HOLO AND/OR ITS LICENSORS HAVE BEEN PREVIOUSLY ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                        IN ANY EVENT, HOLO SHALL HAVE NO RESPONSIBILITY OR LIABILITY WHATSOEVER FOR ANY DAMAGES, INJURIES, LOSSES OF ANY KIND WHATSOEVER SUFFERED BY THE CUSTOMER OR PASSENGER, EITHER DIRECTLY OR INDIRECTLY, BECAUSE OF YOUR ACT OR OMISSION OR LACK OF CONTROL OVER THE VEHICLE OR AWARENESS OF THE ROAD OR ANY OTHER CAUSE THAT IS ATTRIBUTABLE TO YOU DURING THE COURSE OF THE SERVICE.
                        SIMILARLY, AND IN ANY EVENT, HOLO SHALL NOT BE HELD RESPONSIBLE OR LIABLE IN ANY MANNER WHATSOEVER FOR ANY DAMAGE, INJURIES, LOSSES OF ANY KIND WHATSOEVER SUFFERED BY YOU, EITHER DIRECTLY OR INDIRECTLY, BY THE ACTION OR OMISSION OF A PASSENGER OR A CUSTOMER.
                        IN NO EVENT WHATSOEVER, SHALL HOLO BE HELD RESPONSIBLE OR LIABLE, IN ANY MANNER WHATSOEVER, FOR CRIMINAL INVESTIGATION BY POLICE OR OTHER LAW ENFORCEMENT AUTHORITIES, FOR YOUR ACTIONS OR INACTIONS NOR THE ACTIONS OR INACTIONS OF A PASSENGER OR CUSTOMER INCLUDING BUT NOT LIMITED TO, FOR YOUR BREACH OF YOUR REPRESENTATIONS, WARRANTIES, AND ACKNOWLEDGEMENTS MADE THROUGHOUT THIS TERMS AND CONDITIONS AND SPECIFICALLY THOSE REPRESENTATIONS AND WARRANTIES MADE BY YOU IN PARAGRAPH 5 ABOVE.
                      </div>
                    </li>
                    <li>
                      <strong>OPTIONAL INSURANCE PREMIUM</strong>
                      <div>
                        At your sole discretion, you may opt to reap the benefits of HOLO’s good relation with insurance companies and secure an optional insurance coverage against damages to your vehicle or injuries to yourself and others, at such premium and conditions as HOLO offers from time to time. In the event that you opt for such an option, the relevant insurance premium shall be forthwith paid to HOLO by you in addition to the aforesaid Service Fees for the use of HOLO’s Software, Application, and/or Service.
                      </div>
                    </li>
                    <li>
                      <strong>NOTICE</strong>
                      <div>
                        HOLO may give notice by means of a general notice on the Application; electronic mail to your email address in the records of HOLO, or by written communication sent by Registered mail or pre-paid post to your address in the record of HOLO. Such notice shall be deemed to have been given upon the expiration of 48 hours after mailing or posting (if sent by Registered mail or pre-paid post) or 1 hour after sending (if sent by email). You may give notice to HOLO (such notice shall be deemed given when received by HOLO) by letter sent by courier or registered mail to HOLO using the contact details as provided in the Application.
                      </div>
                    </li>
                    <li>
                      <strong>ASSIGNMENT</strong>
                      <div>
                        The agreement as constituted by the terms and conditions as modified from time to time may not be assigned by you without the prior written approval of HOLO but may be assigned without your consent by HOLO. Any purported assignment by you in violation of this section shall be void.
                      </div>
                    </li>
                    <li>
                      <strong>MISCELLANEOUS</strong>
                      <div>
                        This Agreement shall be governed by the law of your own country, without regard to the choice or conflicts of law provisions of any jurisdiction, and any disputes, actions, claims, or causes of action arising out of or in connection with this Agreement or the Service shall be subject to the exclusive jurisdiction of the courts of your own country subject to the exhaustion of mandatory adherence and compliance of procedure for Arbitration provided hereinafter first. Besides, you will also be bound by applicable laws, rules, and regulations of the country of origin of HOLO where it is registered to the extent it is applicable and consistent with the laws and regulations of your local territorial jurisdiction in pursuant to the bilateral treaty, international business, and commercial laws.
                        Furthermore, in the event that the law in your own Country does not allow jurisdiction to be that of the courts of the country of origin of HOLO where it is registered, provided that where judgment of such court is unenforceable in your own country and territory, unresolved disputes shall be referred to the Bangladesh International Arbitration Centre (“BIAC”), in accordance with the Rules of the BIAC as modified or amended from time to time (the “Rules”) by a sole arbitrator appointed by the mutual agreement of the parties (the “Arbitrator”). If parties are unable to agree on an arbitrator, the Arbitrator shall be appointed by the President of BIAC in accordance with the Rules.
                        For the purpose of this agreement and the provision of Arbitration provided hereinbefore, the seat and venue of the arbitration shall be at Dhaka, in the English language, and the fees of the Arbitrator shall be borne equally by the parties, provided that the Arbitrator may require that such fees be borne in such other manner as the Arbitrator determines is required in order for this arbitration clause to be enforceable under applicable law.
                        Provided that, at the discretion of HOLO, the Arbitrator as well as the place of Arbitration can be changed for effective and prompt resolution of issues, disputes, etc. under this agreement.
                        No joint venture, partnership, employment, or agency relationship exists between you, HOLO, or any third-party provider as a result of this Agreement or use of the Service.
                        If any provision of the Agreement is held to be invalid or unenforceable, such provision shall be struck and the remaining provisions shall be enforced to the fullest extent under law. This shall, without limitation, also apply to the applicable law and jurisdiction as stipulated above.
                        The failure of HOLO to enforce any right or provision in the Agreement shall not constitute a waiver of such right or provision unless acknowledged and agreed to by HOLO in writing. The Agreement comprises the entire agreement between you and HOLO and supersedes all prior or contemporaneous negotiations or discussions, whether written or oral (if any) between the parties regarding the subject matter contained herein.
                        You hereby agree that HOLO is entitled to terminate this Agreement immediately in the event that you are found to be in breach of any of the terms stipulated in this Agreement. For the avoidance of doubt, the termination of this Agreement shall not require HOLO to compensate, reimburse, or cover any cost incurred by you, including but not limited to the credit reserved with HOLO or any other monies paid to HOLO in the course of performing your obligations under this Agreement.
                      </div>
                    </li>
                    <li>
                      <strong>OUR CONTACT</strong>
                      <div>
                        Please contact us at holotechlimited@gmail.com if you have any questions or comments about our policies or practices.
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

export default Terms;