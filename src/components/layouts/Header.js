import React from "react";
import PropTypes from "prop-types";
import { AppBar, Grid, Toolbar, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MenuIcon from "@mui/icons-material/Menu";
import HeaderContents from "../layouts/HeaderContents";

const useStyles = makeStyles((theme) => ({
  appBar: {
    "&.MuiToolbar-root": {
      display: "flex",
      justifyContent: "space-around",
      padding: "0px",
      alignItems: "center",
      paddingInline: "min(2.5rem,4vw)",
    },
  },
  toolbarMargin: {
    ...theme.mixins.toolbar,
  },
}));

const Header = (props) => {
  const { handleDrawerToggle, drawerWidth } = props;

  const classes = useStyles();

  return (
    <AppBar
      position="fixed"
      padding="1rem"
      sx={{
        width: { md: `calc(100% - (${drawerWidth}px + 5em))` },
      }}
    >
      <Toolbar className={classes.appBar}>
        <Grid item marginInline={2.5}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              color: "white",
              fontSize: "3rem",
              background: "black",
              display: { md: "none" },
            }}
          >
            <MenuIcon />
          </IconButton>
        </Grid>
        <HeaderContents />
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  drawerWidth: PropTypes.number,
  handleDrawerToggle: PropTypes.func,
};

export default Header;
