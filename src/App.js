import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import jwtDecode from "jwt-decode";
import { Login } from "components/pages";
import { Loader } from "components/Utilities";
import Routes from "components/routes/Routes";
import { muiTheme } from "components/muiTheme";
import { setAccessToken } from "./accessToken";
import ScrollToView from "components/ScrollToView";
import { Header, SideMenu } from "components/layouts";
import { useActions } from "components/hooks/useActions";
import { LOGOUT_USER } from "components/graphQL/Mutation";

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
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { logout } = useActions();
  const [logout_user] = useMutation(LOGOUT_USER);

  const [selectedMenu, setSelectedMenu] = useState(0);
  const [state, setstate] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const { exp } = jwtDecode(token);
      const time = Date.now() >= exp * 1000;
      if (token && time) {
        logout();
        logout_user();
        setstate(false);
      }
      if (!token && isAuthenticated) {
        setstate(false);
        logout_user();
        setAccessToken(token);
      }
      if (token && isAuthenticated && !time && state) {
        setstate(false);

        // logout_user();
        setAccessToken(token);
      } else if (token && isAuthenticated && !time && !state) {
        setAccessToken(token);
        setstate(false);
      }
    }
    // })();
  }, [logout_user, logout, state, isAuthenticated]);
  //eslint-disable-next-line

  /* The selected SubMenu handles the visibility of the menu's sub. 0 is set as a buffer. so if you want to reset the submenu, just pass in 0 to the setSelectedSubMenu function. 1 is for the dashboard submenu, 2 for Patients and serially like that to the last menu items */
  /*   const [selectedSubMenu, setSelectedSubMenu] = useState(0);
  const [selectedPatientMenu, setSelectedPatientMenu] = useState(0);
  const [selectedManagementMenu, setSelectedManagementMenu] = useState(0);
  const [selectedHcpMenu, setSelectedHcpMenu] = useState(0);
  const [selectedAppointmentMenu, setSelectedAppointmentMenu] = useState(0);
  const [waitingListMenu, setWaitingListMenu] = useState(0);
  const [selectedScopedMenu, setSelectedScopedMenu] = useState(0);
  const [doctorView, setDoctorView] = useState(0); */
  const [chatMediaActive, setChatMediaActive] = useState(false);

  return (
    <ThemeProvider theme={muiTheme}>
      <Router>
        <div className="container">
          {!isAuthenticated && (
            <Route
              path={["/login", "/"]}
              render={(props) => <Login {...props} />}
            />
          )}
          {isAuthenticated && !chatMediaActive && state && (
            <Loader color="success" />
          )}
          {isAuthenticated && !chatMediaActive && !state && (
            <>
              <Header
                selectedMenu={selectedMenu}
                /* selectedSubMenu={selectedSubMenu}
                selectedPatientMenu={selectedPatientMenu}
                selectedManagementMenu={selectedManagementMenu}
                selectedHcpMenu={selectedHcpMenu}
                selectedAppointmentMenu={selectedAppointmentMenu}
                waitingListMenu={waitingListMenu}
                doctorView={doctorView}
                selectedScopedMenu={selectedScopedMenu} */
              />

              <ScrollToView>
                <main
                  style={{
                    display: isAuthenticated
                      ? "flex"
                      : chatMediaActive
                      ? "block"
                      : "none",
                  }}
                >
                  <SideMenu
                    selectedMenu={selectedMenu}
                    setSelectedMenu={setSelectedMenu}
                    /* setSelectedSubMenu={setSelectedSubMenu}
                    setSelectedManagementMenu={setSelectedManagementMenu}
                    setWaitingListMenu={setWaitingListMenu}
                    setDoctorView={setDoctorView}
                    setSelectedAppointmentMenu={setSelectedAppointmentMenu} */
                  />

                  <section
                    style={!chatMediaActive ? sectionStyles : { width: "100%" }}
                  >
                    <Routes
                      setSelectedMenu={setSelectedMenu}
                      selectedMenu={selectedMenu}
                      /* selectedSubMenu={selectedSubMenu}
                      setSelectedSubMenu={setSelectedSubMenu}
                      selectedPatientMenu={selectedPatientMenu}
                      setSelectedPatientMenu={setSelectedPatientMenu}
                      setSelectedManagementMenu={setSelectedManagementMenu}
                      selectedHcpMenu={selectedHcpMenu}
                      setSelectedHcpMenu={setSelectedHcpMenu}
                      selectedAppointmentMenu={selectedAppointmentMenu}
                      setSelectedAppointmentMenu={setSelectedAppointmentMenu}
                      waitingListMenu={waitingListMenu}
                      doctorView={doctorView}
                      setDoctorView={setDoctorView}
                      setWaitingListMenu={setWaitingListMenu}
                      selectedScopedMenu={selectedScopedMenu}
                      setSelectedScopedMenu={setSelectedScopedMenu} */
                      chatMediaActive={chatMediaActive}
                      setChatMediaActive={setChatMediaActive}
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
