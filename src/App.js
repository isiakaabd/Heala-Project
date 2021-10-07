import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { muiTheme } from "components/muiTheme";
import Header from "components/layouts/Header";
import SideMenu from "components/layouts/SideMenu";
import Routes from "components/routes/Routes";

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
  /* The selected SubMenu handles the visibility of the menu's sub. 0 is set as a buffer. so if you want to reset the submenu, just pass in 0 to the setSelectedSubMenu function. 1 is for the dashboard submenu, 2 for Patients and serially like that to the last menu items */
  const [selectedSubMenu, setSelectedSubMenu] = useState(0);
  return (
    <ThemeProvider theme={muiTheme}>
      <Router>
        <div className="container">
          <Header selectedMenu={selectedMenu} selectedSubMenu={selectedSubMenu} />
          <main style={{ display: "flex" }}>
            <SideMenu
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu}
              setSelectedSubMenu={setSelectedSubMenu}
            />
            <section style={sectionStyles}>
              <Routes
                setSelectedMenu={setSelectedMenu}
                selectedMenu={selectedMenu}
                selectedSubMenu={selectedSubMenu}
                setSelectedSubMenu={setSelectedSubMenu}
              />
            </section>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
