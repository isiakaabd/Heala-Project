import React, { useState } from "react";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { muiTheme } from "components/muiTheme";
import Header from "components/layouts/Header";
import SideMenu from "components/layouts/SideMenu";
import ViewHCP from "components/pages/ViewHCP";
import ReferralTab from "components/pages/ReferralTab";
import Subscription from "components/pages/Subscription";
import Appointments from "components/pages/Appointments";
import Patients from "components/pages/Patients";
import Hcps from "components/pages/Hcps";
import Dashboard from "components/pages/Dashboard";
import Email from "components/pages/Email";
import Payout from "components/pages/Payout";
import HCP from "components/pages/HCP";
import Financetable from "components/pages/Financetable";
import SinglePatient from "components/pages/SinglePatient";
import PatientProfile from "components/pages/PatientProfile";
import Consultations from "components/pages/Consultations";


const sectionStyles = {
  paddingLeft: "39rem",
  paddingRight: "5rem",
  paddingTop: "12rem",
  paddingBottom: "5rem",
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
                <Route path={["/", "/dashboard"]} exact component={Dashboard} />
                <Route exact path="/patients" component={Patients} />
                <Route exact path="/patients/patientId" component={SinglePatient} />
                <Route exact path="/patients/patientId/profile" component={PatientProfile} />
                <Route exact path="/patients/patientId/consultations" component={Consultations} />
                <Route exact path="/hcps" component={Hcps} />
                <Route
                  path="/partners"
                  render={() => <h3 style={{ fontSize: "3rem" }}>Partners</h3>}
                />
                <Route path="/appointments" component={Appointments} />
                <Route
                  path="/messages"
                  render={() => <h3 style={{ fontSize: "3rem" }}>Messages</h3>}
                />
                <Route path="/email" component={Email} />
                <Route path="/payout" component={Payout} />
                <Route path="/verification" component={HCP} />
                <Route path="/finance" component={Financetable} />
                <Route path="/referrals" component={ReferralTab} />
                <Route path="/plans" component={Subscription} />
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
