import React, { Component } from "react";
import "./App.css";
import "./components/styles.css";
import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/home";
import About from "./pages/about";
import Map from "./pages/map";
import News from "./pages/news";
import Contact from "./pages/contact";
import Faq from "./pages/faq";
import Instructions from "./pages/instructions";
// import InstructionsBangla from "./pages/instructionsBangla";
import Terms from "./pages/terms";
import TermsBangla from "./pages/termsBangla";
import Privacy from "./pages/privacy";
import PrivacyBangla from "./pages/privacyBangla";
import Offer from "./pages/offer";
import Service from "./pages/service";
import More from "./pages/more";
import Delete from "./pages/delete";
// import Users from "./pages/users";
import UserListAdmin from "./pages/userListAdmin";
import UserDetails from "./pages/UserDetails";
// import Welcome from "./pages/Welcome";
import AdminWelcome from "./pages/AdminWelcome";
import AdminSignIn from "./pages/admin/AdminSignIn";
import PhoneVerification from "./pages/PhoneVerification";
import GoogleVerification from "./pages/GoogleVerification";

import SignIn from "./pages/SignIn";
import RentalRequestsAdmin from "./pages/RentalRequestsAdmin";
import RideRequestsAdmin from "./pages/RideRequestsAdmin";
import EditPersonalInfo from "./pages/editProfile/EditPersonalInfo";
import EditChalokInfo from "./pages/editProfile/EditChalokInfo.jsx";
import EditVehicleInfo from "./pages/editProfile/EditVehicleInfo.jsx";
import Profile from "./pages/profile";
import Landing from "./pages/services/Landing";
import RentType from "./pages/services/RentType";
import PassengerDetails from "./pages/services/PassengerDetails";
import RentDetails from "./pages/services/RentDetails";
import RequestDetails from "./pages/services/RequestDetails";
import SelectedChalok from "./pages/services/SelectedChalok";
import RentalReceipt from "./pages/services/RentalReceipt";

import FleetWelcome from "./pages/fleet/FleetWelcome";
import FleetHomepage from "./pages/fleet/FleetHomepage";
import FleetRentalRequest from "./pages/fleet/FleetRentalRequest";
import FleetUserDetails from "./pages/fleet/FleetUserDetails";
/*
import UserListAdminBrta from "./pages/userListAdminBrta";
import CompletedRideAdmin from "./pages/completedRidesAdmin";
import OngoingRideAdmin from "./pages/ongoingRideAdmin";
import SignInBrta from "./pages/signInBrta";
import AlertAdmin from "./pages/alertAdmin";
import ComplainAdmin from "./pages/complainAdmin";
*/

class App extends Component {
  render() {
    return (
      <div className="body-wrapper">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/locations" element={<Map />} />
            <Route path="/news" element={<News />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/FAQ" element={<Faq />} />
            <Route path="/instructions" element={<Instructions />} />
            {/* <Route path="/instructionsBangla" element={<InstructionsBangla />} /> */}
            <Route path="/terms" element={<Terms />} />
            <Route path="/termsBangla" element={<TermsBangla />} />
            <Route path="/privacyEnglish" element={<Privacy />} />
            <Route path="/privacyBangla" element={<PrivacyBangla />} />
            <Route path="/offers" element={<Offer />} />
            <Route path="/service-area" element={<Service />} />
            <Route path="/service" element={<More />} />
            <Route path="/delete-account" element={<Delete />} />
            {/* <Route path="/users" element={<Users />} /> */}
            <Route path="/userListAdmin" element={<UserListAdmin />} />
            <Route path="/users/:userID" element={<UserDetails />} />
            {/* <Route path="/welcome" element={<Welcome />} /> */}
            <Route path="/adminWelcome" element={<AdminWelcome />} />
            <Route path="/enterHoloAdmin" element={<AdminSignIn />} />
            <Route path="/phone-verification" element={<PhoneVerification />} />
            <Route path="/google-verification" element={<GoogleVerification />} />
            <Route path="/signin" element={<SignIn />} />      
            <Route path="/rental-requests" element={<RentalRequestsAdmin />} />      
            <Route path="/ride-requests" element={<RideRequestsAdmin />} />
            <Route path="/edit-personal/:userID" element={<EditPersonalInfo />} />            
            <Route path="/edit-chalok/:userID" element={<EditChalokInfo />} />          
            <Route path="/edit-vehicle/:userID" element={<EditVehicleInfo />} />  
            <Route path="/user-profile" element={<Profile />} />  
            <Route path="/products" element={<Landing />} />  
            <Route path="/rent-type" element={<RentType />} />  
            <Route path="/passenger-details" element={<PassengerDetails />} />  
            <Route path="/rent-details" element={<RentDetails />} />              
            <Route path="/request-details" element={<RequestDetails />} />              
            <Route path="/selected-chalok" element={<SelectedChalok />} />     
            <Route path="/rental-receipt" element={<RentalReceipt />} />         

            <Route path="/fleet-signin" element={<FleetWelcome />} />              
            <Route path="/fleet-homepage" element={<FleetHomepage />} />              
            <Route path="/rental-requests-fleet" element={<FleetRentalRequest />} />      
            <Route path="/user-details-fleet/:userID" element={<FleetUserDetails />} />      
{/*            
            <Route path="/userListAdminBrta" element={<UserListAdminBrta />} />
            <Route path="/completedRideAdmin" element={<CompletedRideAdmin />} />
            <Route path="/ongoingRideAdmin" element={<OngoingRideAdmin />} />
            <Route path="/signInBrta" element={<SignInBrta />} />
            <Route path="/alertAdmin" element={<AlertAdmin />} />
            <Route path="/complainAdmin" element={<ComplainAdmin />} />
*/}            
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
