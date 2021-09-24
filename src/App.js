import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { muiTheme } from "components/muiTheme";
import Header from "components/layouts/Header";
import SideMenu from "components/layouts/SideMenu";
import Mail from "./components/Mail";
import HCPVerification from "components/HCPVerification";
import ViewHCP from "components/Utilities/ViewHCP";
import Referral from "components/Referral";
import SubscriptionPlans from "components/SubscriptionPlans";

const sectionStyles = {
  paddingLeft: "36rem",
  paddingTop: "12rem",
  paddingBottom: "5rem",
  height: "100%",
  width: "100%",
  backgroundColor: "#fbfbfb",
};
const App = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  return (
    <ThemeProvider theme={muiTheme}>
      <Router>
        <div className="container">
          <Header selectedMenu={selectedMenu} />
          <main style={{ display: "flex" }}>
            <SideMenu selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
            <section style={sectionStyles}>
              <Switch>
                <Route
                  path="/dashboard"
                  render={() => <h3 style={{ fontSize: "3rem" }}>Dashboard</h3>}
                />
                <Route
                  path="/patients"
                  render={() => <h3 style={{ fontSize: "3rem" }}>Patients</h3>}
                />
                <Route path="/hcps" />
                <Route
                  path="/partners"
                  render={() => <h3 style={{ fontSize: "3rem" }}>Partners</h3>}
                />
                <Route
                  path="/appointments"
                  render={() => <h3 style={{ fontSize: "3rem" }}>Appointments</h3>}
                />
                <Route
                  path="/messages"
                  render={() => <h3 style={{ fontSize: "3rem" }}>Messages</h3>}
                />
                <Route path="/email" component={Mail} />

                <Route path="/verification" component={HCPVerification} />
                <Route
                  path="/finance"
                  render={() => <h3 style={{ fontSize: "3rem" }}>Finance</h3>}
                />
                <Route path="/referrals" component={Referral} />
                <Route path="/subscription" component={SubscriptionPlans} />
                <Route path="/view" component={ViewHCP} />
                <Route
                  path="/settings"
                  render={() => <h3 style={{ fontSize: "3rem" }}>Settings</h3>}
                />
              </Switch>
            </section>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
