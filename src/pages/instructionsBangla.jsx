import Accordion from "react-bootstrap/Accordion";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import FooterBlack from "../components/footerblack";
import HeaderBlack from "../components/headerblack";
import MobileNav from "../components/mobilenav";
import loadjs from "loadjs";
import splashScreenRider from "../instructions/images/riderSignUp/Rider Front page.jpg";
import signUp1Rider from "../instructions/images/riderSignUp/5.Rider sign up 1 ban.jpg";
import signUp2Rider from "../instructions/images/riderSignUp/6.Rider sign up 2 ban.jpg";
import riderLogIn from "../instructions/images/riderSignUp/4.Rider log in ban.jpg";
import riderCompleteButton from "../instructions/images/riderSignUp/8.Rider complete profile ban.jpg";
import riderComplete1 from "../instructions/images/riderSignUp/Rider complete 1 ban.jpg";
import riderComplete2 from "../instructions/images/riderSignUp/Rider complete 2 ban.jpg";
import riderComplete3 from "../instructions/images/riderSignUp/Rider complete 3 ban.jpg";
import riderComplete4 from "../instructions/images/riderSignUp/Rider complete 4 ban.jpg";
import riderComplete5 from "../instructions/images/riderSignUp/Rider complete 5 ban.jpg";
import riderWaitingApproval from "../instructions/images/riderSignUp/20.Rider waiting approval ban.jpg";
import riderEditDashboard from "../instructions/images/riderSignUp/21.Rider edit photo button ban.jpg";
import riderLandingPage from "../instructions/images/riderOnline/1.Landing page ban.jpg";
import riderSetRoute from "../instructions/images/riderOnline/3.Set route ban.jpg";
import riderLocationNotFound from "../instructions/images/riderOnline/5.Not found ban.jpg";
import riderAddDestination from "../instructions/images/riderOnline/7. Add first destination ban.jpg";
import riderSetDestination from "../instructions/images/riderOnline/10. Set first destination price ban.jpg";
import riderset2ndDestination from "../instructions/images/riderOnline/11. Set 2nd destination ban.jpg";
import riderLandingPageWithRoute from "../instructions/images/riderOnline/14. Landing page with route ban.jpg";
import riderSeeRoute from "../instructions/images/riderOnline/15. See route ban.jpg";
import riderGetNotification from "../instructions/images/rideRider/2. get ride notifications ban.jpg";
import riderAcceptRide from "../instructions/images/rideRider/3. accept ride ban.jpg";
import riderRidePage from "../instructions/images/rideRider/6. ride page ban.jpg";
import riderReceipt from "../instructions/images/rideRider/7. receipt ban.jpg";
import ins2_3 from "../instructions/images/image45.jpg";
import ins2_4 from "../instructions/images/image6.jpg";
import ins2_5 from "../instructions/images/image8.jpg";
import ins2_6 from "../instructions/images/image39.jpg";
import ins2_7 from "../instructions/images/image1.jpg";
import ins2_13 from "../instructions/images/image42.jpg";
import ins2_14 from "../instructions/images/image35.jpg";

class InstructionsBangla extends Component {
  componentDidMount() {
    loadjs("./js/plugins.js");
    loadjs("./js/main.js");
  }

  render() {
    return (
      <div>
        <HeaderBlack />
        <MobileNav />

        <div className="ltn__utilize-overlay" />
        {/* BREADCRUMB AREA START */}
        <div
          className="ltn__breadcrumb-area ltn__breadcrumb-area-2 ltn__breadcrumb-color-white bg-overlay-theme-black-90 bg-image"
          data-bg="img/bg/dhaka.jpeg"
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="ltn__breadcrumb-inner ltn__breadcrumb-inner-2 justify-content-between">
                  <div className="section-title-area ltn__section-title-2">
                    <h6 className="section-subtitle ltn__secondary-color">
                      Welcome to Holo
                    </h6>
                    <h1 className="section-title white-color">Instructions</h1>
                  </div>
                  <div className="ltn__breadcrumb-list">
                    <ul>
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                      <li>Instructions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* BREADCRUMB AREA END */}

        <Accordion defaultActiveKey="0" flush>
          {/*{Object.values(data).map((item, id) => {*/}
          {/*  return (*/}
          {/*    <Accordion.Item eventKey={JSON.stringify(id)}>*/}
          {/*        {Object.values(item).map((i)=>{*/}
          {/*          return <div>*/}
          {/*              <Accordion.Header>{i.i_english}</Accordion.Header>*/}
          {/*              <Accordion.Body>meow</Accordion.Body>*/}
          {/*          </div>*/}

          {/*      })}*/}

          {/*    </Accordion.Item>*/}
          {/*  );*/}
          {/*})}*/}

          <Link
                              to="/instructions"
                              className="theme-btn-1 btn btn-effect-1"
                              style= {{ marginTop: "-15%" }}
                            >
                            English
                            </Link>

                            <Accordion.Item eventKey="0">
            <Accordion.Header>কীভাবে চালক হিসেবে নিবন্ধন করবেন</Accordion.Header>
            <Accordion.Body>
              <ol>
                <li>
                  {" "}
                  অ্যাপটি খুলুন। আপনি প্রথম পৃষ্ঠায় থাকবেন। সাইন আপ পৃষ্ঠায় যেতে "Sign up" বোতামে ক্লিক করুন।
                </li>
                <div className="instructionImage">
                  <img src={splashScreenRider} alt="i21" />
                </div>
                <li>
                এটি "সাইন আপ" পৃষ্ঠা। তারকা চিহ্নিত তথ্যসমূহ দেয়া বাধ্যতামূলক। ঐচ্ছিক তথ্যগুলি বাধ্যতামূলক নয়, তবে সেগুলি আমাদের জন্য এবং আপনার জন্যও সমস্ত সুবিধা পাওয়ার জন্য 
                গুরুত্বপূর্ণ৷ আপনি যদি যানবাহন না চালান, চালানোর জন্য একজন চালক ব্যবহার করেন, তাহলে আপনাকে মালিক হিসাবে বিবেচনা করা হবে৷ নীচে তথ্যগুলির ব্যাখ্যা রয়েছে -

                  <ul>
                    <li>
                      <strong>নাম -</strong> চালকের পুরো নাম, যিনি গাড়িটি পরিচালনা করবেন।
                    </li>
                    <li>
                      <strong>ঠিকানা -</strong> ফর্ম্যাট সহ সম্পূর্ণ ঠিকানা যেমন - ফ্লোর, হাউস নং , রোড নং, এলাকা, শহর। ঠিকানাটি  গাড়ির মালিকের হওয়া উচিত।

                    </li>
                    <li>
                      <strong>ফোন নম্বর - </strong>ফরম্যাট হল - ০১xxxxxxxx.
এই নম্বরটি হোলোর জন্য আপনার পরিচয় হিসেবে ব্যবহৃত হবে। তাই খুব সতর্কতার সহিত আপনার রাইড শেয়ারিং পরিষেবার জন্য আপনি যে নম্বরটি ব্যবহার করতে চান সেটি লিখুন৷ নম্বরটি চালকের ব্যবহার করা উচিত, 
তবে সিমটি মালিকের মালিকানাধীন হওয়া উচিত, যাতে চালক পরিবর্তন হলেও অপারেশনাল নম্বরটি বজায় থাকে৷ 
 
                    </li>
                    <li>
                      <strong>ইমেইল -</strong> আপনি আপনার মেইলের মাধ্যমে বিজ্ঞপ্তি এবং অফার পাবেন, তাই এটিও গুরুত্বপূর্ণ। মেইলটি মালিকের হতে হবে।
                    </li>
                    <li>
                      <strong>জরুরী যোগাযোগ নম্বর - </strong>এটি হল সেই নম্বর যা আমরা জরুরী পরিস্থিতিতে বা আপনি যদি কোনো বিপদে পড়েন বা এরকম কিছুতে যোগাযোগ করব। 
                      তাই আপনি কোন বিপদ বা দুর্ঘটনায় পড়লে আপনার সাহায্যের জন্য যাকে সবচেয়ে বেশি বিশ্বাস করেন এমন ব্যক্তির ফোন নম্বর দিন।
যদি গাড়িটি একজন চালক দ্বারা চালিত হয়, তাহলে এই নম্বরটি মালিকের ব্যক্তিগত নম্বর হওয়া উচিত।

                    </li>
                    <li>
                      <strong>ব্যবহারকারীর সাথে সম্পর্ক - </strong> আপনি উপরে যে জরুরী যোগাযোগের নম্বর দিয়েছেন তার সাথে সম্পর্ক। চালক অপারেটিং গাড়ির ক্ষেত্রে "মালিক" রাখুন।

                    </li>
                    <li>
                      <strong>লিঙ্গ - </strong> পুরুষ, মহিলা বা অন্য
                    </li>
                    <li>
                      <strong>জন্ম তারিখ - </strong> আপনি তারিখ নির্বাচন করতে পারেন। আপনার জাতীয় পরিচয়পত্রে যে তারিখটি আছে তা লিখুন।

                    </li>
                    <li>
                      <strong>ব্লাড গ্রুপ - </strong>জরুরি পরিস্থিতিতে এটি সহায়ক হতে পারে। এই চালকের হতে হবে।

                    </li>
                    <li>
                      <strong>পাসওয়ার্ড - </strong>আপনাকে পাসওয়ার্ড রাখতে এবং মনে রাখতে হবে। 
                    </li>
                  </ul>
                  <Container>
                    <Row>
                      <Col>
                        <img src={signUp1Rider} alt="i22" />
                      </Col>
                      <Col>
                        <img src={signUp2Rider} alt="i23" />
                      </Col>
                    </Row>
                  </Container>
                </li>
                <li>
                সাইন আপ এর তথ্য জমা দেওয়ার পরে, আপনি নিচের পৃষ্ঠায় থাকবেন৷ আপনি এখানে লগ ইন করতে পারবেন৷

                  <div className="instructionImage">
                    <img src={riderLogIn} alt="i24" />
                  </div>
                </li>
                <li>
                এরপর আপনি এই পৃষ্ঠায় যাবেন. অ্যাপটি ব্যবহার করার জন্য আপনার প্রোফাইল সম্পূর্ণ করতে হবে৷ " প্রোফাইল সম্পূর্ণ করুন" বোতামটি টিপে প্রক্রিয়াটি শুরু করুন৷

                  <div className="instructionImage">
                    <img src={riderCompleteButton} alt="i25" />
                  </div>
                </li>
                <li>
                আমাদের এই তথ্যগুলো প্রয়োজন -

                  <ul>
                    <li>
                      <strong>আপনার বাহন - </strong> আপনার বাহন নির্বাচন করুন। এই মুহূর্তে আমাদের কাছে মাত্র দুটি বিকল্প আছে - মোটরসাইকেল এবং স্কুটি। তবে আমরা যত তাড়াতাড়ি 
                      সম্ভব প্রসারিত করব এবং অন্যান্য যানবাহন যুক্ত করব।

                    </li>
                    <li>
                      <strong>বাহনের রেজিস্ট্রেশন নম্বর - </strong>ফরম্যাট হল শহর/জেলা-ক্রমিক নম্বর। এটি গাড়ির নম্বর প্লেটে থাকা নম্বরটি হতে হবে। যেমন - ঢাকা মেট্রো-LA-xx-xxxx

                    </li>
                    <li>
                      <strong>বাহনের মডেল - </strong>বাহনের মডেলের নাম। ফরম্যাট হল "Name CC Color" যেমন - Bajaj Discover 125 Black

                    </li>
                    <li>
                      <strong>বাহনের মডেল বৎসর - </strong> বাহনের তৈরির বৎসর। যেমন - 2021

                    </li>
                    <li>
                      <strong>জাতীয় পরিচয়পত্রের নম্বর - </strong>আপনার জাতীয় পরিচয়পত্রের নম্বর। এটি যিনি বাহনটি চালাবেন তার জাতীয় পরিচয়পত্রের হতে হবে।

                    </li>
                    <li>
                      <strong>জাতীয় পরিচয়পত্র আপলোড করুন - </strong>চালকের জাতীয় পরিচয়পত্রের সামনের এবং পিছনের দিকের ছবি আপলোড করুন। ছবিগুলির স্ক্যানড কপি এবং 
                      স্পষ্টভাবে দৃশ্যমান হলে এটি সহায়ক হবে৷
                    </li>
                    <li>
                      <strong>ড্রাইভিং লাইসেন্স আপলোড করুন - </strong>চালকের ড্রাইভিং লাইসেন্সের সামনে এবং পিছনের দিকের ছবি আপলোড করুন। ছবিগুলি স্ক্যানড কপি এবং স্পষ্টভাবে 
                      দৃশ্যমান হলে এটি সহায়ক হবে৷  
                    </li>
                    <li>
                      <strong>প্রোফাইল ফটো আপলোড করুন - </strong>চালকের একটি পরিষ্কার এবং উপস্থাপনযোগ্য ছবি আপলোড করুন। যাতে যাত্রী প্রোফাইল ফটো দিয়ে চালককে চিনতে পারেন।

                    </li>
                    <li>
                      <strong>ইউটিলিটি বিল আপলোড করুন - </strong>Uউপরে দেওয়া ঠিকানার যেকোনো ইউটিলিটির সাম্প্রতিক বিল কপির ছবি আপলোড করুন। এটি সহায়ক হবে যদি ছবি 
                      স্ক্যান করা হয় এবং স্পষ্টভাবে দেখা যায় এবং বিলে ঠিকানাটি দেখা যায়।
                    </li>
                    <Container>
                      <Row>
                        <Col>
                          <img src={riderComplete1} alt="i26" />
                        </Col>
                        <Col>
                          <img src={riderComplete2} alt="i27" />
                        </Col>
                      </Row>
                    </Container>
                    <li>
                      <strong>রেজিস্ট্রেশনের কাগজ আপলোড করুন - </strong>বাহনের রেজিস্ট্রেশনের কাগজের ছবি আপলোড করুন। ছবিগুলি স্ক্যান কপি এবং স্পষ্টভাবে দৃশ্যমান হলে এটি সহায়ক হবে৷

                    </li>
                    <li>
                      <strong>বাহনের ফিটনেসের কাগজ আপলোড করুন (গাড়ির জন্য) - </strong>বাহনের ফিটনেসের কাগজের ছবি আপলোড করুন। ছবিগুলি স্ক্যান কপি এবং স্পষ্টভাবে দৃশ্যমান 
                      হলে এটি সহায়ক হবে৷ মোটরসাইকেলের জন্য ফিটনেস কাগজপত্রের প্রয়োজন নেই।
                    </li>
                    <li>
                      <strong>ট্যাক্স টোকেন আপলোড করুন - </strong>বাহনের ট্যাক্স টোকেনের ছবি আপলোড করুন। ছবিগুলি স্ক্যান কপি এবং স্পষ্টভাবে দৃশ্যমান হলে এটি সহায়ক হবে৷

                    </li>
                    <li>
                      <strong>বীমা কাগজ আপলোড করুন - </strong>বাহনের বীমার ছবি আপলোড করুন। ছবিগুলি স্ক্যান কপি এবং স্পষ্টভাবে দৃশ্যমান হলে এটি সহায়ক হবে৷
                    </li>
                    <li>
                      <strong>মালিকের এনআইডি আপলোড করুন - </strong>গাড়ির মালিকের এনআইডির সামনের এবং পিছনের দিকের ছবি আপলোড করুন। ছবিগুলি স্ক্যান কপি এবং 
                      স্পষ্টভাবে দৃশ্যমান হলে এটি সহায়ক হবে৷
                    </li>
                    <li>
                    আপনি যদি একজন পেশাদার চালক হন, মানে আপনি আপনার জীবিকা নির্বাহের জন্য রাইড শেয়ারিংয়ের উপর নির্ভর করেন, তাহলে "জীবিকা বা পেশা হিসেবে" চেক করুন।
অস্থায়ীভাবে রাইড শেয়ার করলে , "মাঝে মাঝে" চেক করুন।
                    </li>
                    <Container>
                      <Row>
                        <Col>
                          <img src={riderComplete3} alt="i28" />
                        </Col>
                        <Col>
                          <img src={riderComplete4} alt="i29" />
                        </Col>
                      </Row>
                    </Container>
                  </ul>
                  <ul>
                    <li>
                    যাত্রীর কাছ থেকে টাকা পেতে আপনি যে পদ্ধতি পছন্দ করেন তা ঠিক করুন। যেহেতু টাকা সরাসরি আপনার ওয়ালেটে পাঠানো হবে, আপনি যদি ডিজিটাল পেমেন্ট পদ্ধতি পছন্দ করেন তাহলে তা সুবিধাজনক হবে। 
                    তাহলে আপনি বেশি যাত্রী পেতে পারবেন এবং আরো উপার্জন করতে পারবেন।.
                    </li>
                    <li>
                    ক্যাশআউটের জন্য প্রয়োজনীয় নম্বর। আপনি ক্যাশআউট পাওয়ার জন্য নম্বর এবং পদ্ধতি লিখুন। যদি এটি বিকাশ হয় তবে শুধুমাত্র নিবন্ধিত বিকাশ নম্বরটি দিলেই হবে। 
                    তবে আপনি যদি অন্য কোনও পদ্ধতি ব্যবহার করতে চান তবে প্রয়োজনীয় ফর্ম্যাটটি হল নাম-নম্বর। যেমন - "রকেট - 0১xxxxxxxx"।

                    </li>
                    <div className="instructionImage">
                  <img src={riderComplete5} alt="i21" />
                </div>
                  </ul>
                </li>
                <li>
                এগিয়ে যাওয়ার জন্য আপনাকে "প্রোফাইল সম্পূর্ণ করুন" বোতামটি টিপতে হবে। বোতাম টেপার আগে সমস্ত তথ্য চেক করুন।

                <div className="instructionImage">
                  <img src={riderComplete5} alt="i21" />
                </div>
                </li>
                <li>
                সফলভাবে আপনার প্রোফাইল সম্পূর্ণ করার পরে, আপনি নিচের পৃষ্ঠায় থাকবেন ৷ Holo সমস্ত তথ্য পরীক্ষা করবে এবং যদি কোন সমস্যা হয়, আপনার(মালিক) সাথে যোগাযোগ করবে। 
                যদি সমস্ত তথ্য ঠিক থাকে, তাহলে আপনার আইডি যাচাই করা হবে এবং আপনি Holo এর মাধ্যমে আয় করতে পারবেন। প্রয়োজনে ফোন, মেসেঞ্জার বা What’s app-এর মাধ্যমে 
                আপনি যেকোনো উপায়ে আমাদের সাথে যোগাযোগ করতে পারেন।
 
                  <div className="instructionImage">
                    <img src={riderWaitingApproval} alt="i210" />
                  </div>
                </li>
                <li>
                আপনি যদি কোনও তথ্য পরিবর্তন করতে চান তবে আপনাকে What’s app এর মাধ্যমে তথ্য পাঠাতে হবে। এবং যদি আপনার কোন ফটো পুনরায় আপলোড করার প্রয়োজন হয়, 
                আপনি নীচের বাম দিকের বোতামে ক্লিক করে প্রোফাইল পৃষ্ঠায় যেতে পারেন।

                  <div className="instructionImage">
                    <img src={riderWaitingApproval} alt="i211" />
                  </div>
                </li>
                <li>
                আপনি যাচাইকরণের আগে যেকোনো ছবি পরিবর্তন করতে পারেন। পরিবর্তনের পৃষ্ঠায় যেতে নামের পাশের বোতাম টিপুন।
                  <div className="instructionImage">
                    <img src={riderEditDashboard} alt="i212" />
                  </div>
                </li>
                <li>
                আপনি ছবি পরিবর্তনের পৃষ্ঠায় যাবেন। আপনি আগের দেয়া কোন ছবি যদি পরিবর্তন করতে চান সেটি আপলোড করুন এবং নিচের লেখাটি "নির্বাচিত নয়" থেকে "আপলোড করা" তে পরিবর্তিত হওয়ার জন্য অপেক্ষা করুন ৷
                  <Container>
                      <Row>
                        <Col>
                          <img src={ins2_13} alt="i213" />
                        </Col>
                        <Col>
                          <img src={ins2_14} alt="i214" />
                        </Col>
                      </Row>
                    </Container>
                </li>
                <li>
                একবার আপনি "আপলোড" হয়ে গেলে, আপনি উপরের বাম কোণে তীরটিতে ক্লিক করে প্রোফাইল পৃষ্ঠায় ফিরে যেতে পারেন।
                </li>
                <li>
                এখন অনুগ্রহ করে ধৈর্য ধরে যাচাইয়ের জন্য অপেক্ষা করুন। যাচাইকরণ সম্পন্ন হওয়ার পরে, আপনি যখন অ্যাপটি খুলবেন তখন আপনি নীচের মত ল্যান্ডিং পৃষ্ঠায় থাকবেন। সেবাটি উপভোগ করুন।

                  <div className="instructionImage">
                    <img src={riderLandingPage} alt="i215" />
                  </div>
                </li>
              </ol>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
            কীভাবে রুট সেট করবেন এবং অনলাইনে যাবেন
            </Accordion.Header>
            <Accordion.Body>
            <ol>
                <li>
                  {" "}
                  অ্যাপটি খুলুন এবং লগইন করুন। আপনি ল্যান্ডিং পৃষ্ঠায় থাকবেন। রুট সেট করতে উপরের তীরটিতে ক্লিক করুন। আপনি তীরের নীচের টেক্সট দেখে রুট সেট করা আছে কিনা 
                  সেটা বুঝতে পারবেন। "সেট করতে" শব্দটি নির্দেশ করে যে আপনাকে রুট সেট করতে হবে।

                  <div className="instructionImage">
                  <img src={riderLandingPage} alt="i21" />
                </div>
                </li>
                <li>
                আপনি একটি মার্কার পাবেন যেখানে আপনার বর্তমান অবস্থান দেখানো হবে। HOLO জোন হল আপনার নিকটতম এলাকা যেখান থেকে যাত্রী পাওয়ার সম্ভাবনা সবচেয়ে বেশি।

                <div className="instructionImage">
                  <img src={riderSetRoute} alt="i21" />
                </div>
                </li>
                <li>
                যদি কোনো কারণে বর্তমান অবস্থানটি "না পাওয়া যায়" দেখানো হয়, আপনার বর্তমান অবস্থান নির্বাচন করতে পারবেন। অপশনে ক্লিক করলে একটি ড্রপডাউন তালিকা পাবেন, 
                অবস্থান সেট করতে তালিকা থেকে আপনার অবস্থান টাইপ করুন এবং নির্বাচন করুন। অনুগ্রহ করে মনে রাখবেন যে আপনাকে তালিকা থেকে অবস্থান নির্বাচন করতে হবে।  
                  <div className="instructionImage">
                    <img src={riderLocationNotFound} alt="i210" />
                  </div>
                </li>
                <li>
                গন্তব্য যোগ করার জন্য আপনাকে "পছন্দের গন্তব্য" বোতামে ক্লিক করতে হবে।

                  <div className="instructionImage">
                    <img src={riderSetRoute} alt="i211" />
                  </div>
                </li>
                <li>
                আপনি যে এলাকায় যেতে চান সেই এলাকা এবং যাওয়ার জন্য আনুমানিক ভাড়া নির্বাচন করুন। আপনি একাধিক পছন্দের গন্তব্য যোগ করতে পারেন, সর্বোচ্চ পাঁচটি পর্যন্ত গন্তব্য যোগ করা যাবে। 
                তাহলে রাইড খুঁজে পাওয়ার সম্ভাবনা বেড়ে যাবে।

                <Container>
                <Row>
                        <Col>
                          <img src={riderAddDestination} alt="i213" />
                        </Col>
                        <Col>
                          <img src={riderSetDestination} alt="i214" />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <img src={riderset2ndDestination} alt="i214" />
                        </Col>
                      </Row>
                 </Container>
                </li>
                <li>
                আপনি গন্তব্যগুলি সেট করার পরে, আপনি অনলাইনে গিয়ে চালক তালিকায় নিজেকে সেবাদান করার জন্য প্রস্তুত করতে পারেন ৷ “রাইড দিতে প্রস্তুত” বোতামে ক্লিক করুন এবং নিজেকে 
                একজন এভেইলেবল চালক হিসাবে সেট করুন।

                <div className="instructionImage">
                    <img src={riderset2ndDestination} alt="i215" />
                  </div>
                </li>
                <li>
                সফলভাবে রুট সেট করার পরে আপনি আবার ল্যান্ডিং পৃষ্ঠায় পৌছাবেন।আপনি তীরের নীচের লেখাটি থেকে স্ট্যাটাস বুঝতে পারবেন। "দেখতে" শব্দটি নির্দেশ করে যে আপনার রুট 
                সেট করা আছে এবং আপনি এভেইলেবল আছেন।আপনি চাইলে উপরের তীরটিতে ক্লিক করে রুটগুলি দেখতে পারেন। যদি রুটগুলি অবিলম্বে দেখানো না হয়, তাহলে অনুগ্রহ করে কিছুক্ষন 
                অপেক্ষা করুন, রুটগুলি লোড হতে কিছু সময় লাগতে পারে৷

                <Container>
                <Row>
                        <Col>
                          <img src={riderLandingPageWithRoute} alt="i213" />
                        </Col>
                        <Col>
                          <img src={riderSeeRoute} alt="i214" />
                        </Col>
                      </Row>
                 </Container>
                </li>
              </ol>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>
            কীভাবে অফলাইনে যাবেন
            </Accordion.Header>
            <Accordion.Body>
            <ol>
                <li>
                  {" "}
                  অ্যাপটি খুলুন, আপনি ল্যান্ডিং পৃষ্ঠায় থাকবেন। আপনি তীরের নীচের লেখাটি থেকে স্ট্যাটাস বুঝতে পারবেন। "দেখতে" শব্দটি নির্দেশ করে যে আপনার রুট সেট করা আছে এবং 
                  আপনি এভেইলেবল আছেন। রুট দেখতে তীর ক্লিক করুন

                  <div className="instructionImage">
                  <img src={riderLandingPageWithRoute} alt="i21" />
                </div>
                </li>
                <li>
                আপনাকে "এখন রাইড দিতে প্রস্তুত নই" বোতামে ক্লিক করতে হবে। আপনি রাইড নেয়ার জন্য আর এভেইলেবল থাকবেন না ।

                <div className="instructionImage">
                  <img src={riderSeeRoute} alt="i21" />
                </div>
                </li>
                <li>
                আপনি আর এভেইলেবল নেই তা নিশ্চিত করতে, তীরের নীচের লেখাটি দেখুন ৷ "সেট করতে" শব্দটি নির্দেশ করে যে আপনি এভেইলেবল নেই ।
                  <div className="instructionImage">
                    <img src={riderLandingPage} alt="i210" />
                  </div>
                </li>
              </ol>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>
            কীভাবে চালক হিসেবে রাইড দিবেন
            </Accordion.Header>
            <Accordion.Body>
            <ol>
                <li>
                  {" "}
                  অ্যাপটি খুলুন এবং লগইন করুন। আপনি ল্যান্ডিং পৃষ্ঠায় থাকবেন। রুট সেট করতে উপরের তীরটিতে ক্লিক করুন। আপনি তীরের নীচের টেক্সট দেখে রুট সেট করা আছে কিনা 
                  সেটা বুঝতে পারবেন। "সেট করতে" শব্দটি নির্দেশ করে যে আপনাকে রুট সেট করতে হবে।

                  <div className="instructionImage">
                  <img src={riderLandingPage} alt="i21" />
                </div>
                </li>
                <li>
                আপনি একটি মার্কার পাবেন যেখানে আপনার বর্তমান অবস্থান দেখানো হবে। HOLO জোন হল আপনার নিকটতম এলাকা যেখান থেকে যাত্রী পাওয়ার সম্ভাবনা সবচেয়ে বেশি।
                <div className="instructionImage">
                  <img src={riderSetRoute} alt="i21" />
                </div>
                </li>
                <li>
                যদি কোনো কারণে বর্তমান অবস্থানটি "না পাওয়া যায়" দেখানো হয়, আপনার বর্তমান অবস্থান নির্বাচন করতে পারবেন। অপশনে ক্লিক করলে একটি ড্রপডাউন তালিকা পাবেন, 
                অবস্থান সেট করতে তালিকা থেকে আপনার অবস্থান টাইপ করুন এবং নির্বাচন করুন। অনুগ্রহ করে মনে রাখবেন যে আপনাকে তালিকা থেকে অবস্থান নির্বাচন করতে হবে।

                  <div className="instructionImage">
                    <img src={riderLocationNotFound} alt="i210" />
                  </div>
                </li>
                <li>
                গন্তব্য যোগ করার জন্য আপনাকে "পছন্দের গন্তব্য" বোতামে ক্লিক করতে হবে।

                  <div className="instructionImage">
                    <img src={riderSetRoute} alt="i211" />
                  </div>
                </li>
                <li>
                আপনি যে এলাকায় যেতে চান সেই এলাকা এবং যাওয়ার জন্য আনুমানিক ভাড়া নির্বাচন করুন। আপনি একাধিক পছন্দের গন্তব্য যোগ করতে পারেন, সর্বোচ্চ পাঁচটি পর্যন্ত গন্তব্য যোগ করা যাবে। 
                তাহলে রাইড খুঁজে পাওয়ার সম্ভাবনা বেড়ে যাবে।

                <Container>
                <Row>
                        <Col>
                          <img src={riderAddDestination} alt="i213" />
                        </Col>
                        <Col>
                          <img src={riderSetDestination} alt="i214" />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <img src={riderset2ndDestination} alt="i214" />
                        </Col>
                      </Row>
                 </Container>
                </li>
                <li>
                আপনি গন্তব্যগুলি সেট করার পরে, আপনি অনলাইনে গিয়ে চালক তালিকায় নিজেকে সেবাদান করার জন্য প্রস্তুত করতে পারেন ৷ “রাইড দিতে প্রস্তুত” বোতামে ক্লিক করুন এবং নিজেকে 
                একজন এভেইলেবল চালক হিসাবে সেট করুন।

                <div className="instructionImage">
                    <img src={riderset2ndDestination} alt="i215" />
                  </div>
                </li>
                <li>
                সফলভাবে রুট সেট করার পরে আপনি আবার ল্যান্ডিং পৃষ্ঠায় পৌছাবেন।আপনি তীরের নীচের লেখাটি থেকে স্ট্যাটাস বুঝতে পারবেন। "দেখতে" শব্দটি নির্দেশ করে যে আপনার রুট সেট করা 
                আছে এবং আপনি এভেইলেবল আছেন।আপনি চাইলে উপরের তীরটিতে ক্লিক করে রুটগুলি দেখতে পারেন। যদি রুটগুলি অবিলম্বে দেখানো না হয়, তাহলে অনুগ্রহ করে কিছুক্ষন অপেক্ষা করুন, 
                রুটগুলি লোড হতে কিছু সময় লাগতে পারে৷

                <Container>
                <Row>
                        <Col>
                          <img src={riderLandingPageWithRoute} alt="i213" />
                        </Col>
                        <Col>
                          <img src={riderSeeRoute} alt="i214" />
                        </Col>
                      </Row>
                 </Container>
                </li>
                <li>
                এখন একজন যাত্রীর কলের জন্য অপেক্ষা করুন। মূল্য ঠিক করুন এবং আপনি ডানদিকে নীচে একটি নির্দেশনা পাবেন। নেটওয়ার্কিং সমস্যার কারণে আপনি সবসময় নির্দেশনা নাও পেতে পারেন, 
                তাই অনুগ্রহ করে মাঝে মাঝে নিচে ডানের নোটিফিকেশন আইকনে ক্লিক করে নোটিফিকেশনের জন্য চেক করুন।

                <div className="instructionImage">
                    <img src={riderLandingPageWithRoute} alt="i215" />
                  </div>
                </li>
                <li>
                আপনি "এক্সেপ্ট" বোতামে ক্লিক করার পরে, আপনি গ্রহণযোগ্যতা নিশ্চিত করতে নীচের ছবির মতো একটি পপ-আপ পাবেন। আপনি রাইড নিতে নিশ্চিত হলে, "হ্যাঁ" ক্লিক করুন।

                <Container>
                <Row>
                        <Col>
                          <img src={riderGetNotification} alt="i213" />
                        </Col>
                        <Col>
                          <img src={riderAcceptRide} alt="i214" />
                        </Col>
                      </Row>
                 </Container>
                </li>
                <li>
                আপনি রাইডের বিবরণ পৃষ্ঠায় থাকবেন। আপনি গন্তব্যে পৌঁছানোর পরে, রাইড শেষ করতে "রাইড শেষ" বোতামে ক্লিক করুন।

                <div className="instructionImage">
                    <img src={riderRidePage} alt="i215" />
                  </div>
                </li>
                <li>
                আপনি "রাইড শেষ" বোতামে ক্লিক করার পরে, আপনি এই পৃষ্ঠায় থাকবেন। এখানে আপনি যাত্রীকে রেটিং দিতে পারেন। আপনার যাত্রা সফলভাবে শেষ হয়েছে ।

                <div className="instructionImage">
                    <img src={riderReceipt} alt="i215" />
                  </div>
                </li>
              </ol>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <FooterBlack />
      </div>
    );
  }
}

export default InstructionsBangla;
