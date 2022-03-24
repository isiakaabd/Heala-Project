import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import jwtDecode from "jwt-decode";
import { LOGOUT_USER } from "components/graphQL/Mutation";
import Loader from "components/Utilities/Loader";
import { muiTheme } from "components/muiTheme";
import { useMutation } from "@apollo/client";
import { useActions } from "components/hooks/useActions";
import Header from "components/layouts/Header";
import SideMenu from "components/layouts/SideMenu";
import Routes from "components/routes/Routes";
import ScrollToView from "components/ScrollToView";
import Login from "components/pages/Login";
import { setAccessToken } from "./accessToken";
import { useSelector } from "react-redux";

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
  const { logout } = useActions();
  const [logout_user] = useMutation(LOGOUT_USER);

  const [selectedMenu, setSelectedMenu] = useState(0);
  const [state, setstate] = useState(true);
  console.log(state);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   setAccessToken(token);
  //   setstate(false);
  // }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setSelectedMenu(13);
      logout();
      return;
    }
    (async () => {
      if (token && state) {
        const { exp } = jwtDecode(token);
        setstate(false);
        alert(2);
        if (Date.now() >= exp * 1000) {
          await logout_user();
          console.log(111);
          setSelectedMenu(13);
          logout();
        } else {
          console.log(222);
          console.log(state);

          setAccessToken(token);
        }
      }
    })();
  }, [logout_user, state]);

  /* The selected SubMenu handles the visibility of the menu's sub. 0 is set as a buffer. so if you want to reset the submenu, just pass in 0 to the setSelectedSubMenu function. 1 is for the dashboard submenu, 2 for Patients and serially like that to the last menu items */
  const [selectedSubMenu, setSelectedSubMenu] = useState(0);
  const [selectedPatientMenu, setSelectedPatientMenu] = useState(0);
  const [selectedManagementMenu, setSelectedManagementMenu] = useState(0);
  const [selectedHcpMenu, setSelectedHcpMenu] = useState(0);
  const [selectedAppointmentMenu, setSelectedAppointmentMenu] = useState(0);
  const [waitingListMenu, setWaitingListMenu] = useState(0);
  const [selectedScopedMenu, setSelectedScopedMenu] = useState(0);
  const [chatMediaActive, setChatMediaActive] = useState(false);

  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <ThemeProvider theme={muiTheme}>
      <Router>
        <div className="container">
          {!isAuthenticated && (
            <Route path={["/login", "/"]} render={(props) => <Login {...props} />} />
          )}
          {isAuthenticated && !chatMediaActive && state && <Loader color="success" />}
          {isAuthenticated && !chatMediaActive && !state && (
            <>
              <Header
                selectedMenu={selectedMenu}
                selectedSubMenu={selectedSubMenu}
                selectedPatientMenu={selectedPatientMenu}
                selectedManagementMenu={selectedManagementMenu}
                selectedHcpMenu={selectedHcpMenu}
                selectedAppointmentMenu={selectedAppointmentMenu}
                waitingListMenu={waitingListMenu}
                selectedScopedMenu={selectedScopedMenu}
              />

              <ScrollToView>
                <main
                  style={{
                    display: isAuthenticated ? "flex" : chatMediaActive ? "block" : "none",
                  }}
                >
                  <SideMenu
                    selectedMenu={selectedMenu}
                    setSelectedMenu={setSelectedMenu}
                    setSelectedSubMenu={setSelectedSubMenu}
                    setSelectedManagementMenu={setSelectedManagementMenu}
                    setWaitingListMenu={setWaitingListMenu}
                    setSelectedAppointmentMenu={setSelectedAppointmentMenu}
                  />

                  <section style={!chatMediaActive ? sectionStyles : { width: "100%" }}>
                    <Routes
                      setSelectedMenu={setSelectedMenu}
                      selectedMenu={selectedMenu}
                      selectedSubMenu={selectedSubMenu}
                      setSelectedSubMenu={setSelectedSubMenu}
                      selectedPatientMenu={selectedPatientMenu}
                      setSelectedPatientMenu={setSelectedPatientMenu}
                      setSelectedManagementMenu={setSelectedManagementMenu}
                      selectedHcpMenu={selectedHcpMenu}
                      setSelectedHcpMenu={setSelectedHcpMenu}
                      selectedAppointmentMenu={selectedAppointmentMenu}
                      setSelectedAppointmentMenu={setSelectedAppointmentMenu}
                      waitingListMenu={waitingListMenu}
                      setWaitingListMenu={setWaitingListMenu}
                      chatMediaActive={chatMediaActive}
                      setChatMediaActive={setChatMediaActive}
                      selectedScopedMenu={selectedScopedMenu}
                      setSelectedScopedMenu={setSelectedScopedMenu}
                    />
                  </section>
                </main>
              </ScrollToView>
            </>
          )}
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
