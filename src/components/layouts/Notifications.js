import React from "react";
import PropTypes from "prop-types";
import { Menu, MenuItem, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

const useStyles = makeStyles((theme) => ({
  menu: {
    maxHeight: "35rem !important",

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
const Notifications = ({ anchorEl, setAnchorEl }) => {
  const arr = Array(0);
  const classes = useStyles();
  const theme = useTheme();
  console.log(anchorEl);
  const open = Boolean(anchorEl);
  console.log(open);
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
            {arr.length > 0 ? "Notifications" : "No Notification"}
          </Typography>
        </Grid>
        <Grid item>
          <CloseIcon className={classes.icon} onClick={() => setAnchorEl(null)} />
        </Grid>
      </Grid>
      {arr.length > 0
        ? Array(10)
            .fill()
            .map((val, i) => (
              <MenuItem
                key={i}
                onClick={() => setAnchorEl(null)}
                className={classes.menuItem}
                disableRipple
              >
                <Typography variant="body2">
                  Raphael Igbinedion{" "}
                  <span style={{ color: theme.palette.common.grey }}>
                    accepted your referral request
                  </span>
                </Typography>
                <Typography variant="body2" color="secondary">
                  Just now
                </Typography>
              </MenuItem>
            ))
        : null}
    </Menu>
  );
};

Notifications.propTypes = {
  anchorEl: PropTypes.object,
  setAnchorEl: PropTypes.func.isRequired,
};

export default Notifications;
