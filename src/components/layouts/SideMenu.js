import React, { useEffect } from "react";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { menus } from "helpers/asideMenus";
import { makeStyles } from "@mui/styles";
import logo from "assets/images/logo.png";
import { Link } from "react-router-dom";
import { HiLogout } from "react-icons/hi";

const useStyles = makeStyles((theme) => ({
  aside: {
    width: "34rem",
    background: "#fff",
    paddingLeft: "2.5em",
    paddingRight: "2.5em",
    paddingTop: "5em",
    height: "100vh",
    boxShadow: "5px -5px 7px #eee",
    position: "fixed",
    overflowY: "hidden",
    zIndex: theme.zIndex.appBar + 1,

    "&:hover": {
      overflowY: "scroll",
    },

    "& .css-jau5dn-MuiButtonBase-root-MuiListItemButton-root": {
      marginBottom: "2em",

      "&:hover": {
        background: theme.palette.common.lightRed,

        "& .css-1jxdcj3-MuiSvgIcon-root": {
          color: theme.palette.common.red,
        },

        "& .css-14aspbj-MuiTypography-root": {
          color: theme.palette.common.red,
        },

        "& .message-icon": {
          color: theme.palette.common.red,
        },
      },
    },

    "& .css-cveggr-MuiListItemIcon-root": {
      minWidth: 50,
    },

    "& .css-1jxdcj3-MuiSvgIcon-root": {
      fontSize: "2rem",

      "&:hover": {
        color: theme.palette.common.red,
      },
    },

    "& .css-14aspbj-MuiTypography-root": {
      fontSize: "1.45rem",
    },

    "& .css-jau5dn-MuiButtonBase-root-MuiListItemButton-root.Mui-selected": {
      backgroundColor: theme.palette.common.lightRed,
      color: theme.palette.common.red,
      borderRadius: ".5rem",

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

    "&::-webkit-scrollbar": {
      width: ".85rem",
    },

    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 1rem rgba(0, 0, 0, 0.2)",
    },

    "&::-webkit-scrollbar-thumb": {
      borderRadius: ".5rem",
      background: theme.palette.common.lightGrey,
    },
  },
  logoWrapper: {
    paddingTop: "3em",
    paddingBottom: "5em",
    paddingLeft: "7em",
  },
  logout: {
    "&.css-jau5dn-MuiButtonBase-root-MuiListItemButton-root": {
      marginTop: "2.5rem",

      "& .css-cveggr-MuiListItemIcon-root": {
        color: theme.palette.common.red,
      },

      "& .css-14aspbj-MuiTypography-root": {
        color: theme.palette.common.red,
      },
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
              {React.createElement(
                menu.icon,
                menu.id === 5 ? { size: 20, className: "message-icon" } : {},
              )}
            </ListItemIcon>

            <ListItemText>{menu.title}</ListItemText>
          </ListItemButton>
        ))}
        <ListItemButton
          disableRipple
          onClick={() => setSelectedMenu(12)}
          classes={{ root: classes.logout }}
          // component={Link}
        >
          <ListItemIcon>
            <HiLogout size={20} />
          </ListItemIcon>

          <ListItemText>Logout</ListItemText>
        </ListItemButton>
      </List>
    </aside>
  );
};

SideMenu.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
};

export default SideMenu;
