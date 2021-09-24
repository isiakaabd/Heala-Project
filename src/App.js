import React, { useState } from "react";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { muiTheme } from "components/muiTheme";
import Header from "components/layouts/Header";
import SideMenu from "components/layouts/SideMenu";
import DashboardHome from "pages/DashboardHome";

const sectionStyles = {
  paddingLeft: "37rem",
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
                <Route
                  path="/"
                  // render={() => <h3 style={{ fontSize: "3rem" }}>Dashboard</h3>}
                 >
                   <DashboardHome />
                </Route>
                <Route
                  path="/patients"
                  render={() => <h3 style={{ fontSize: "3rem" }}>Patients</h3>}
                />
                <Route path="/hcps" render={() => <h3 style={{ fontSize: "3rem" }}>HCPS</h3>} />
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
                <Route path="/email" render={() => <h3 style={{ fontSize: "3rem" }}>Email</h3>} />
                <Route
                  path="/verification"
                  render={() => <h3 style={{ fontSize: "3rem" }}>HCP Verification</h3>}
                />
                <Route
                  path="/finance"
                  render={() => <h3 style={{ fontSize: "3rem" }}>Finance</h3>}
                />
                <Route
                  path="/referrals"
                  render={() => <h3 style={{ fontSize: "3rem" }}>Referrals</h3>}
                />
                <Route
                  path="/subscription"
                  render={() => <h3 style={{ fontSize: "3rem" }}>Subscription Plans</h3>}
                />
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
