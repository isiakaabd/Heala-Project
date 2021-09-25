import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { muiTheme } from "components/muiTheme";
import Header from "components/layouts/Header";
import SideMenu from "components/layouts/SideMenu";

const sectionStyles = {
  paddingLeft: "37rem",
  paddingRight: "3rem",
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
                  render={() => (
                    <h3 style={{ fontSize: "3rem" }}>
                      Dashboard In publishing and graphic design, Lorem ipsum is a placeholder text
                      commonly used to demonstrate the visual form of a document or a typeface
                      without relying on meaningful content. Lorem ipsum may be used as a
                      placeholder before final copy is available.
                    </h3>
                  )}
                />
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
