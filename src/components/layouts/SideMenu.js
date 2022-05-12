import React, { useEffect, useState } from "react";
import DeleteOrDisable from "components/modals/DeleteOrDisable";
import PropTypes from "prop-types";
import { List, ListItemText, ListItemButton, ListItemIcon } from "@mui/material";
import { menus } from "helpers/asideMenus";
import { makeStyles } from "@mui/styles";
import logo from "assets/images/logo.svg";
import { Link, useLocation } from "react-router-dom";
import { HiLogout } from "react-icons/hi";
import { useActions } from "components/hooks/useActions";
import { useMutation } from "@apollo/client";
import { LOGOUT_USER } from "components/graphQL/Mutation";

const SideMenu = (props) => {
  const {
    selectedMenu,
    setSelectedMenu,
    setDoctorView,
    setSelectedSubMenu,
    setWaitingListMenu,
    drawerWidth,
    // handleDrawerToggle,
  } = props;
  const useStyles = makeStyles((theme) => ({
    aside: {
      width: `${drawerWidth}`,
      background: "#fff",
      paddingLeft: "2.5em",
      paddingRight: "2.5em",
      paddingTop: "1em",
      minHeight: "100vh",
      height: "100%",
      boxShadow: "5px -5px 7px #eee",
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
  const { logout } = useActions();
  const [logout_user] = useMutation(LOGOUT_USER);

  const classes = useStyles();
  const [Logout, setLogout] = useState(false);
  const location = useLocation();

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

  useEffect(() => {
    [...menus].filter((menu) => {
      switch (location.pathname) {
        case menu.path:
          if (menu.id !== selectedMenu) {
            setSelectedMenu(menu.id);
          }
          break;
        default:
          break;
      }
    });
    // eslint-disable-next-line
  }, [selectedMenu]);

  return (
    <>
      <aside className={classes.aside}>
        <div className={classes.logoWrapper}>
          <img src={logo} alt="logo" />
        </div>
        <List>
          {menus.map((menu) => (
            <ListItemButton
              disableRipple
              key={menu.id}
              onClick={() => {
                setSelectedMenu(menu.id);
                setSelectedSubMenu(0);
                setWaitingListMenu(0);
                setDoctorView(0);
                // handleDrawerToggle();
              }}
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
            classes={{ root: classes.logout }}
            onClick={() => setLogout(true)}
          >
            <ListItemIcon>
              <HiLogout size={20} />
            </ListItemIcon>

            <ListItemText>Logout</ListItemText>
          </ListItemButton>
        </List>
      </aside>
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
  selectedMenu: PropTypes.number,
  drawerWidth: PropTypes.number,
  setSelectedMenu: PropTypes.func,
  setSelectedSubMenu: PropTypes.func,
  setWaitingListMenu: PropTypes.func,
  setDoctorView: PropTypes.func,
  handleDrawerToggle: PropTypes.func,
};

export default SideMenu;
