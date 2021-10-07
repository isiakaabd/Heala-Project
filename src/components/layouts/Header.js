import React, { Fragment } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import { makeStyles } from "@mui/styles";
import HeaderContents from "components/layouts/HeaderContents";

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

const Header = ({ selectedMenu, selectedSubMenu, selectedPatientMenu, selectedHcpMenu }) => {
  const classes = useStyles();
  return (
    <Fragment>
      <AppBar position="fixed" className={classes.appBar} classes={{ root: classes.appBar }}>
        <HeaderContents
          selectedMenu={selectedMenu}
          selectedSubMenu={selectedSubMenu}
          selectedPatientMenu={selectedPatientMenu}
          selectedHcpMenu={selectedHcpMenu}
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
};

export default Header;
