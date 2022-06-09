import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import jwtDecode from "jwt-decode";
import { Login } from "components/pages";
import { Loader } from "components/Utilities";
import Routes from "components/routes/Routes";
import { muiTheme } from "components/muiTheme";
import { setAccessToken } from "./accessToken";
import { Box, Drawer, Toolbar, CssBaseline } from "@mui/material";
import { Header, SideMenu } from "components/layouts";
import { useActions } from "components/hooks/useActions";
import { LOGOUT_USER } from "components/graphQL/Mutation";

const App = ({ window }) => {
  const container = window !== undefined ? () => window().document.body : undefined;

  const { isAuthenticated } = useSelector((state) => state.auth);
  const { logout } = useActions();
  const [logout_user] = useMutation(LOGOUT_USER);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [state, setstate] = useState(true);
  const drawerWidth = 200;
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
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

  const [chatMediaActive, setChatMediaActive] = useState(false);

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
              <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <Header
                  selectedMenu={selectedMenu}
                  handleDrawerToggle={handleDrawerToggle}
                  drawerWidth={drawerWidth}
                />

                <Box
                  component="nav"
                  sx={{ width: { md: "300px" }, flexShrink: { md: 0 } }}
                  aria-label="sidebar_menu"
                >
                  <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                      keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                      display: { xs: "block", md: "none" },
                      "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
                    }}
                  >
                    <SideMenu
                      selectedMenu={selectedMenu}
                      setSelectedMenu={setSelectedMenu}
                      drawerWidth={drawerWidth}
                      handleDrawerToggle={handleDrawerToggle}
                    />
                  </Drawer>
                  <Drawer
                    variant="permanent"
                    sx={{
                      display: { xs: "none", md: "block" },
                      "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
                    }}
                    open
                  >
                    <SideMenu
                      selectedMenu={selectedMenu}
                      setSelectedMenu={setSelectedMenu}
                      drawerWidth={drawerWidth}
                    />
                  </Drawer>
                </Box>
                <Box
                  component="main"
                  sx={{ flex: 1, p: 3, width: { xs: `calc(100% - ${drawerWidth}px)` } }}
                >
                  <Toolbar />

                  <Routes
                    setSelectedMenu={setSelectedMenu}
                    selectedMenu={selectedMenu}
                    chatMediaActive={chatMediaActive}
                    setChatMediaActive={setChatMediaActive}
                  />
                </Box>
                {/* </ScrollToView> */}
              </Box>
            </>
          )}
        </div>
      </Router>
    </ThemeProvider>
  );
};
App.propTypes = {
  window: PropTypes.object,
};

export default App;
