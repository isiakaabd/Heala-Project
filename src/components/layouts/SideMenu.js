import React, { useState, createElement } from "react";
import PropTypes from "prop-types";
import { List, ListItemText, ListItemButton, ListItemIcon, Grid } from "@mui/material";
import { menus } from "helpers/asideMenus";
import { makeStyles } from "@mui/styles";
import logo from "assets/images/logo.svg";
import { HiLogout } from "react-icons/hi";
import { setSideNav } from "helpers/func";
import { useMutation } from "@apollo/client";
import { Link, useLocation } from "react-router-dom";
import { useActions } from "components/hooks/useActions";
import { LOGOUT_USER } from "components/graphQL/Mutation";
import DeleteOrDisable from "components/modals/DeleteOrDisable";

const SideMenu = (props) => {
  const { drawerWidth } = props;
  const location = useLocation();
  const { logout } = useActions();
  const [Logout, setLogout] = useState(false);
  const [logout_user] = useMutation(LOGOUT_USER);
  const [selectedMenu, setSelectedMenu] = React.useState(0);

  const useStyles = makeStyles((theme) => ({
    aside: {
      width: `${drawerWidth}`,
      background: "#fff",
      paddingLeft: "2.5em",
      paddingRight: "2.5em",
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
        marginBottom: "2em",

        "&:hover": {
          background: theme.palette.common.lightRed,

          "& .MuiSvgIcon-root": {
            color: theme.palette.common.red,
          },

          "& .MuiTypography-root": {
            color: theme.palette.common.red,
          },

          "& .message-icon": {
            color: theme.palette.common.red,
          },
        },
      },

      "& .MuiListItemIcon-root": {
        minWidth: 50,
      },

      "& .MuiSvgIcon-root": {
        fontSize: "2rem",

        "&:hover": {
          color: theme.palette.common.red,
        },
      },

      "& .MuiTypography-root": {
        fontSize: "1.45rem",
      },

      "& .MuiListItemButton-root.Mui-selected": {
        backgroundColor: theme.palette.common.lightRed,
        color: theme.palette.common.red,
        borderRadius: ".5rem",

        "&:hover": {
          backgroundColor: theme.palette.common.lightRed,
        },

        "& .MuiListItemIcon-root": {
          color: theme.palette.common.red,
        },

        "& .MuiTypography-root": {
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
      paddingBottom: "2em",
      paddingLeft: "1em",
    },
    logout: {
      "&.MuiListItemButton-root": {
        marginTop: "2.5rem",

        "& .MuiListItemIcon-root": {
          color: theme.palette.common.red,
        },

        "& .MuiTypography-root": {
          color: theme.palette.common.red,
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
      console.log(err.message);
    }
  };

  React.useEffect(() => {
    setSideNav(menus, location?.pathname, setSelectedMenu);
  }, [location?.pathname]);

  return (
    <>
      <Grid className={classes.aside} boxShadow={{ sm: "5px -5px 7px #eee", xs: "none" }}>
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
                {createElement(
                  menu.icon,
                  menu.id === 5 ? { size: 20, className: "message-icon" } : {},
                )}
              </ListItemIcon>

              <ListItemText>{menu.title}</ListItemText>
            </ListItemButton>
          ))}
          <ListItemButton
            disableRipple
            classes={{ root: classes.logout }}
            onClick={() => setLogout(true)}
          >
            <ListItemIcon>
              <HiLogout size={20} />
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
