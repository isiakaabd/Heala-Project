import React, { useState } from "react";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { muiTheme } from "components/muiTheme";
import Header from "components/layouts/Header";
import SideMenu from "components/layouts/SideMenu";
import DashboardHome from "components/pages/DashboardHome";
import Mail from "./components/pages/Mail";
import HCPVerification from "components/pages/HCPVerification";
import ViewHCP from "components/pages/ViewHCP";
import Referral from "components/pages/Referral";
import SubscriptionPlans from "components/pages/SubscriptionPlans";
import Finance from "components/pages/Finance";
import Appointments from "components/pages/Appointments";
import Patients from "components/pages/Patients";

const sectionStyles = {
  paddingLeft: "39rem",
  paddingRight: "5rem",
  paddingTop: "12rem",
  paddingBottom: "5rem",
  // marginBottom: "5rem",
  minHeight: "100vh",
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
                <Route path={["/", "/dashboard"]} exact component={DashboardHome} />

                <Route path="/patients" component={Patients} />
                <Route path="/hcps" />
                <Route
                  path="/partners"
                  render={() => <h3 style={{ fontSize: "3rem" }}>Partners</h3>}
                />
                <Route path="/appointments" component={Appointments} />
                <Route
                  path="/messages"
                  render={() => <h3 style={{ fontSize: "3rem" }}>Messages</h3>}
                />
                <Route path="/email" component={Mail} />
                <Route path="/verification" component={HCPVerification} />
                <Route path="/finance" component={Finance} />
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
