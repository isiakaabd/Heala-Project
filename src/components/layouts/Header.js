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

const Header = ({ selectedMenu, selectedSubMenu }) => {
  const classes = useStyles();
  return (
    <Fragment>
      <AppBar position="fixed" className={classes.appBar} classes={{ root: classes.appBar }}>
        <HeaderContents selectedMenu={selectedMenu} selectedSubMenu={selectedSubMenu} />
      </AppBar>
    </Fragment>
  );
};

Header.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
};

export default Header;
