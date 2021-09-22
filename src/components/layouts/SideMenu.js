import React, { useEffect } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { menus } from "helpers/asideMenus";
import { makeStyles } from "@mui/styles";
import logo from "assets/images/logo.png";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  aside: {
    width: "34rem",
    background: "#fff",
    paddingLeft: "1.5em",
    paddingRight: "1.5em",
    paddingTop: "5em",
    height: "100vh",
    position: "fixed",
    overflowY: "scroll",
    overflowX: "hidden",
    zIndex: theme.zIndex.appBar + 1,

    "& .css-jau5dn-MuiButtonBase-root-MuiListItemButton-root": {
      marginBottom: "2em",
    },

    "& .css-cveggr-MuiListItemIcon-root": {
      minWidth: 50,
    },

    "& .css-1jxdcj3-MuiSvgIcon-root": {
      fontSize: "2rem",
    },

    "& .css-14aspbj-MuiTypography-root": {
      fontSize: "1.45rem",
    },

    "& .css-jau5dn-MuiButtonBase-root-MuiListItemButton-root.Mui-selected": {
      backgroundColor: theme.palette.common.lightRed,
      color: theme.palette.common.red,

      "&:hover": {
        backgroundColor: theme.palette.common.lightRed,
      },

      "& .MuiListItemIcon-root": {
        color: theme.palette.common.red,
      },

      "& .css-14aspbj-MuiTypography-root": {
        color: theme.palette.common.red,
      },
    },
  },
  logoWrapper: {
    paddingTop: "5em",
    paddingBottom: "5em",
    paddingLeft: "7em",
  },
  selectedTab: {
    "&.Mui-selected": {
      background: "yellow",
    },
  },
}));

const SideMenu = ({ selectedMenu, setSelectedMenu }) => {
  const classes = useStyles();

  useEffect(() => {
    [...menus].filter((menu) => {
      switch (window.location.pathname) {
        case menu.path:
          if (menu.id !== selectedMenu) {
            setSelectedMenu(menu.id);
          }
          break;
        default:
          break;
      }
    });
  });

  return (
    <aside className={classes.aside}>
      <div className={classes.logoWrapper}>
        <img src={logo} alt="logo" />
      </div>
      <List>
        {menus.map((menu) => (
          <ListItemButton
            disableRipple
            key={menu.id}
            onClick={() => setSelectedMenu(menu.id)}
            selected={selectedMenu === menu.id}
            component={Link}
            to={menu.path}
          >
            <ListItemIcon>
              {React.createElement(menu.icon, menu.id === 5 ? { size: 20 } : {})}
            </ListItemIcon>

            <ListItemText>{menu.title}</ListItemText>
          </ListItemButton>
        ))}
      </List>
    </aside>
  );
};

SideMenu.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
};

export default SideMenu;
