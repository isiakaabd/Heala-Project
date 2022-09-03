import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import LabelIcon from "components/Icons/LabelIcon";
import {
  List,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Grid,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import logo from "assets/images/logo.svg";
import { setSideNav } from "helpers/func";
import { useMutation } from "@apollo/client";
import { Link, useLocation } from "react-router-dom";
import { useActions } from "components/hooks/useActions";
import { LOGOUT_USER } from "components/graphQL/Mutation";
import DeleteOrDisable from "components/modals/DeleteOrDisable";
import LogoutIcon from "components/Icons/LogoutIcon";
import { firstMenu, menus, subMenu } from "helpers/asideMenus";
import HMOIcon from "components/Icons/HMOIcon";

const SideMenu = (props) => {
  const { drawerWidth } = props;
  const location = useLocation();
  const { logout } = useActions();
  const [Logout, setLogout] = useState(false);
  const [logout_user] = useMutation(LOGOUT_USER);
  const [selectedMenu, setSelectedMenu] = React.useState(0);

  const useStyles = makeStyles((theme) => ({
    aside: {
      /* width: `${drawerWidth}`, */
      width: "300px",
      background: "#fff",
      paddingLeft: "2em",
      paddingRight: "2em",
      paddingTop: "1em",
      minHeight: "100vh",
      height: "100%",
      position: "fixed",
      overflowY: "hidden",
      zIndex: theme.zIndex.appBar + 1,

      "&:hover": {
        overflowY: "scroll",
      },

      "& .MuiListItemButton-root": {
        display: "flex",
        borderRadius: "10px",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "0.5em",
        padding: "10px 14px",

        "&:hover": {
          background: theme.palette.common.lightBlue,

          "& .MuiSvgIcon-root": {
            stroke: "#3E5EA9",
            fill: "transparent",
          },

          "& .MuiTypography-root": {
            color: theme.palette.common.blue,
          },

          "& .message-icon": {
            color: theme.palette.common.blue,
          },
        },
      },

      "& .MuiListItemIcon-root": {
        display: "flex",
        alignItems: "center",
        minWidth: 22,
      },

      "& .MuiSvgIcon-root": {
        fontSize: "2rem",
        stroke: "#8D9091",
        fill: "transparent",

        "&:hover": {
          /* color: "#3E5EA9", */
          stroke: "#3E5EA9",
          fill: "transparent",
        },
      },

      "& .MuiTypography-root": {
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "14px",
        lineHeight: "20px",
        color: "#474951",
      },

      "& .MuiListItemButton-root.Mui-selected": {
        backgroundColor: theme.palette.common.lightBlue,
        color: theme.palette.common.blue,

        "& .MuiSvgIcon-root": {
          stroke: "#3E5EA9",
          fill: "transparent",
        },

        "&:hover": {
          backgroundColor: theme.palette.common.lightRed,
        },

        "& .MuiListItemIcon-root": {
          color: theme.palette.common.red,
        },

        "& .MuiTypography-root": {
          color: theme.palette.common.red,
          fontWeight: 500,
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
      paddingTop: "0.2rem",
      paddingBottom: "0.5em",
      paddingLeft: "1em",
    },
    logout: {
      "&.MuiListItemButton-root": {
        marginTop: "5rem",

        "& .MuiTypography-root": {
          color: "#ED3237 !important",
        },
      },
    },
  }));
  const classes = useStyles();

  const handleLogout = async () => {
    try {
      await logout_user({
        variables: {
          user: localStorage.getItem("user_id"),
        },
      });
      logout();
      setSelectedMenu(13);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    setSideNav(menus, location?.pathname, setSelectedMenu);
  }, [location?.pathname]);
  const [open, setOpen] = useState(true);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <Grid
        className={classes.aside}
        sx={{ borderRight: "1px solid rgba(229, 229, 229, 0.5)" }}
      >
        <div className={classes.logoWrapper}>
          <img src={logo} alt="logo" />
        </div>
        <List>
          {menus.map((menu) => {
            const { icon } = menu;

            return (
              <ListItemButton
                disableRipple
                key={menu.id}
                onClick={() => setSelectedMenu(menu.id)}
                selected={selectedMenu === menu.id}
                component={Link}
                to={menu.path}
              >
                <ListItemIcon sx={{ marginRight: "15px" }}>{icon}</ListItemIcon>

                <ListItemText>{menu.title}</ListItemText>
              </ListItemButton>
            );
          })}
          {/* <ListItemButton onClick={handleClick}>
            <ListItemIcon
              sx={{ marginRight: "15px", height: "30px", width: "30px" }}
            >
              <LabelIcon sx={{ height: "25px", width: "25px" }} />
            </ListItemIcon>
            <ListItemText primary="Provider Services" sx={{ pr: 1 }} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ p: 0 }}>
              {subMenu.map((menu) => {
                const { id, path } = menu;
                return (
                  <ListItemButton
                    disableRipple
                    key={menu.id}
                    onClick={() => setSelectedMenu(id)}
                    selected={selectedMenu === id}
                    component={Link}
                    to={path}
                    sx={{ marginLeft: "45px" }}
                  >
                    {/* <ListItemIcon>{icon}</ListItemIcon> 

                    <ListItemText>{menu.title}</ListItemText>
                  </ListItemButton>
                );
              })}
            </List>
          </Collapse> */}
          {/* {firstMenu.map((menu) => {
            const { icon, id, path, title } = menu;

            return (
              <ListItemButton
                disableRipple
                key={menu.id}
                style={{ display: id === 3 ? "none" : "" }}
                onClick={() => setSelectedMenu(menu.id)}
                selected={selectedMenu === menu.id}
                component={Link}
                to={path}
              >
                <ListItemIcon
                  sx={{ marginRight: "15px", height: "30px", width: "30px" }}
                >
                  {icon}
                </ListItemIcon>

                <ListItemText>{title}</ListItemText>
              </ListItemButton>
            );
          })} */}

          <ListItemButton
            disableRipple
            classes={{ root: classes.logout }}
            onClick={() => setLogout(true)}
          >
            <ListItemIcon sx={{ marginRight: "15px" }}>
              <LogoutIcon />
            </ListItemIcon>

            <ListItemText>Logout</ListItemText>
          </ListItemButton>
        </List>
      </Grid>
      <DeleteOrDisable
        open={Logout}
        setOpen={setLogout}
        title="Logout"
        confirmationMsg="logout"
        btnValue="Logout"
        type="logout"
        onConfirm={handleLogout}
      />
    </>
  );
};

SideMenu.propTypes = {
  drawerWidth: PropTypes.number,
  handleDrawerToggle: PropTypes.func,
};

export default SideMenu;
