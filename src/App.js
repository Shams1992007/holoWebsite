import React, { Component } from "react";
import "./App.css";
import "./components/styles.css";
import Home from "./pages/home";
import About from "./pages/about";
import News from "./pages/news";
import Contact from "./pages/contact";
import { HashRouter as Router, Route, Switch } from "react-router-dom";  // Change this line
import Map from "./pages/map";
import Terms from "./pages/terms";
import TermsBangla from "./pages/termsBangla";
import Service from "./pages/service";
import Offer from "./pages/offer";
import More from "./pages/more";
import Faq from "./pages/faq";
import Instructions from "./pages/instructions";
import InstructionsBangla from "./pages/instructionsBangla";
import Privacy from "./pages/privacy";
import PrivacyBangla from "./pages/privacyBangla";
import Delete from "./pages/delete";
import Users from "./pages/users";
import UserListAdmin from "./pages/userListAdmin";
import UserListAdminBrta from "./pages/userListAdminBrta";
import CompletedRideAdmin from "./pages/completedRidesAdmin";
import OngoingRideAdmin from "./pages/ongoingRideAdmin";
import SignInBrta from "./pages/signInBrta";
import AlertAdmin from "./pages/alertAdmin";
import ComplainAdmin from "./pages/complainAdmin";

class App extends Component {
  render() {
    return (
      <div className="body-wrapper">
        <Router>  {/* Updated from BrowserRouter to HashRouter */}
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/news">
              <News />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="/FAQ">
              <Faq />
            </Route>
            <Route path="/instructions">
              <Instructions />
            </Route>
            <Route path="/instructionsBangla">
              <InstructionsBangla />
            </Route>
            <Route path="/locations">
              <Map />
            </Route>
            <Route path="/terms">
              <Terms />
            </Route>
            <Route path="/termsBangla">
              <TermsBangla />
            </Route>
            <Route path="/privacyEnglish">
              <Privacy />
            </Route>
            <Route path="/privacyBangla">
              <PrivacyBangla />
            </Route>
            <Route path="/offers">
              <Offer />
            </Route>
            <Route path="/service-area">
              <Service />
            </Route>
            <Route path="/service">
              <More />
            </Route>
            <Route path="/delete-account">
              <Delete />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/userListAdmin">
              <UserListAdmin />
            </Route>
            <Route path="/userListAdminBrta">
              <UserListAdminBrta />
            </Route>
            <Route path="/completedRideAdmin">
              <CompletedRideAdmin />
            </Route>
            <Route path="/ongoingRideAdmin">
              <OngoingRideAdmin />
            </Route>
            <Route path="/signInBrta">
              <SignInBrta />
            </Route>
            <Route path="/alertAdmin">
              <AlertAdmin />
            </Route>
            <Route path="/complainAdmin">
              <ComplainAdmin />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
