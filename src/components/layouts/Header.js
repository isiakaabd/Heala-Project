import React from "react";
import PropTypes from "prop-types";
import { AppBar, Grid, Toolbar, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { makeStyles } from "@mui/styles";
import HeaderContents from "../layouts/HeaderContents";

const useStyles = makeStyles((theme) => ({
  appBar: {
    "&.MuiToolbar-root": {
      display: "flex",
      justifyContent: "space-around",
      padding: "0px",
      paddingInline: "min(2.5rem,4vw)",
    },
  },
  toolbarMargin: {
    ...theme.mixins.toolbar,
  },
}));

const Header = (props) => {
  const {
    selectedMenu,
    selectedSubMenu,
    selectedPatientMenu,
    selectedManagementMenu,
    selectedHcpMenu,
    waitingListMenu,
    selectedAppointmentMenu,
    selectedScopedMenu,
    doctorView,
    handleDrawerToggle,
    drawerWidth,
  } = props;

  const classes = useStyles();

  return (
    <AppBar
      position="fixed"
      padding="1rem"
      //
      sx={{
        width: { sm: `calc(100% - (${drawerWidth}px + 5em))` },
        ml: { sm: `${drawerWidth}px` },
      }}
      // classes={{ root: classes.appBar }}
    >
      <Toolbar className={classes.appBar}>
        <Grid item marginInline={2.5}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ color: "white", fontSize: "3rem", background: "black", display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Grid>

        <HeaderContents
          selectedMenu={selectedMenu}
          selectedSubMenu={selectedSubMenu}
          selectedPatientMenu={selectedPatientMenu}
          selectedManagementMenu={selectedManagementMenu}
          selectedHcpMenu={selectedHcpMenu}
          waitingListMenu={waitingListMenu}
          selectedAppointmentMenu={selectedAppointmentMenu}
          selectedScopedMenu={selectedScopedMenu}
          doctorView={doctorView}
          drawerWidth={drawerWidth}
          handleDrawerToggle={handleDrawerToggle}
        />
      </Toolbar>
    </AppBar>
  );
};

{
  /* <AppBar position="fixed">
  <Toolbar>
    <IconButton
      color="inherit"
      aria-label="open drawer"
      edge="start"
      onClick={handleDrawerToggle}
      sx={{ mr: 2, display: { sm: "none" } }}
    >
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" noWrap component="div">
      Responsive drawer
    </Typography>
  </Toolbar>
</AppBar>; */
}

Header.propTypes = {
  selectedMenu: PropTypes.number,
  selectedSubMenu: PropTypes.number,
  selectedPatientMenu: PropTypes.number,
  selectedHcpMenu: PropTypes.number,
  waitingListMenu: PropTypes.number,
  selectedAppointmentMenu: PropTypes.number,
  selectedScopedMenu: PropTypes.number,
  selectedManagementMenu: PropTypes.number,
  doctorView: PropTypes.number,
  drawerWidth: PropTypes.number,
  handleDrawerToggle: PropTypes.func,
};

export default Header;
