import React, { Fragment } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import { makeStyles } from "@mui/styles";
import HeaderContents from "../layouts/HeaderContents";

const useStyles = makeStyles((theme) => ({
  appBar: {
    paddingLeft: "35rem",
    paddingTop: "2em",
    paddingBottom: "2em",
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
    selectedHcpMenu,
    waitingListMenu,
    selectedAppointmentMenu,
    selectedScopedMenu,
  } = props;

  const classes = useStyles();

  return (
    <Fragment>
      <AppBar position="fixed" className={classes.appBar} classes={{ root: classes.appBar }}>
        <HeaderContents
          selectedMenu={selectedMenu}
          selectedSubMenu={selectedSubMenu}
          selectedPatientMenu={selectedPatientMenu}
          selectedHcpMenu={selectedHcpMenu}
          waitingListMenu={waitingListMenu}
          selectedAppointmentMenu={selectedAppointmentMenu}
          selectedScopedMenu={selectedScopedMenu}
        />
      </AppBar>
    </Fragment>
  );
};

Header.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  selectedPatientMenu: PropTypes.number.isRequired,
  selectedHcpMenu: PropTypes.number.isRequired,
  waitingListMenu: PropTypes.number.isRequired,
  selectedAppointmentMenu: PropTypes.number.isRequired,
  selectedScopedMenu: PropTypes.number.isRequired,
};

export default Header;
