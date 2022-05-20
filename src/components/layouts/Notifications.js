import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Menu, MenuItem, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
// import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

const useStyles = makeStyles((theme) => ({
  menu: {
    maxHeight: "35rem !important",
    maxWidth: "70rem  !important",

    "& .MuiMenu-list": {
      paddingTop: "0 !important",
      paddingBottom: "0 !important",
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

      "&:active": {
        background: "rgba(0, 0, 0, 0.2)",
      },
    },
  },
  menuItem: {
    "&.MuiMenuItem-root": {
      display: "flex",
      flexDirection: "column",
      flexWrap: "wrap",
      alignItems: "flex-start",
    },
  },

  icon: {
    "&.MuiSvgIcon-root": {
      cursor: "pointer",

      "&:hover": {
        color: theme.palette.common.lightGrey,
      },
    },
  },
}));
const Notifications = ({ anchorEl, setAnchorEl, Notifications }) => {
  const [arr, setArr] = useState([]);
  const classes = useStyles();
  // const theme = useTheme();
  useEffect(() => {
    if (Notifications) return setArr(Notifications);
  }, [Notifications]);
  const open = Boolean(anchorEl);
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={() => setAnchorEl(null)}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
      classes={{ paper: classes.menu }}
    >
      <Grid
        container
        gap={2}
        alignItems="center"
        justifyContent="space-between"
        style={{ padding: "1rem 1.5rem 1rem" }}
      >
        <Grid item>
          <Typography variant="body1">
            {arr && arr.length > 0 ? "Notifications" : "No Notification"}
          </Typography>
        </Grid>
        <Grid item>
          <CloseIcon className={classes.icon} onClick={() => setAnchorEl(null)} />
        </Grid>
      </Grid>
      {arr.length > 0
        ? arr.map((val, i) => {
            return (
              <MenuItem
                key={i}
                // onClick={() => setAnchorEl(null)}
                className={classes.menuItem}
                disableRipple
              >
                <Typography variant="body2">{val.title}</Typography>
                <Typography variant="body2" color="secondary">
                  {val.content}
                </Typography>
              </MenuItem>
            );
          })
        : null}
    </Menu>
  );
};

Notifications.propTypes = {
  anchorEl: PropTypes.object,
  Notifications: PropTypes.array,
  setAnchorEl: PropTypes.func,
};

export default Notifications;
