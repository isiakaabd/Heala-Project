import React from "react";
import PropTypes from "prop-types";
import { Link, useParams, useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { HiOutlineLogout } from "react-icons/hi";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import avatar from "assets/images/photo1.png";
import IconButton from "@mui/material/IconButton";
import CallIcon from "@mui/icons-material/Call";
import VideocamIcon from "@mui/icons-material/Videocam";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const useStyles = makeStyles((theme) => ({
  chatHeaderParent: {
    padding: "0 5rem 0 56.6rem",
    height: "10rem",
    background: "#fff",
    position: "fixed",
    left: 0,
    top: 0,
    width: "100%",
  },
  chatHeader: {
    height: "100%",
  },
  iconButton: {
    "&.MuiIconButton-root": {
      background: theme.palette.common.lightGreen,
    },
  },
  chatIcon: {
    "&.MuiSvgIcon-root": {
      fontSize: "3rem",
      fill: theme.palette.common.green,
    },
  },
  menu: {
    borderRadius: "1rem !important",
    width: "25rem",
    top: "11rem !important",

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
      padding: "3rem 3.5rem",
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  },
}));
const ChatInterfaceHeading = ({ setChatMediaActive }) => {
  const classes = useStyles();
  const theme = useTheme();

  const { patientId, hcpId } = useParams();
  const { pathname } = useLocation();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setChatMediaActive(false);
  };

  const renderPath = () => {
    if (pathname.split("/")[1] === "patients") {
      return `/patients/${patientId}/profile`;
    } else if (pathname.split("/")[1] === "hcps") {
      return `/hcps/${hcpId}/profile`;
    } else {
      return `/dashboard`;
    }
  };

  return (
    <Grid item className={classes.chatHeaderParent}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        className={classes.chatHeader}
      >
        <Grid item>
          <Grid container alignItems="center">
            <Grid item style={{ marginRight: "2rem" }}>
              <Avatar src={avatar} alt="Avatar" style={{ width: 70, height: 70 }} />
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="h4" gutterBottom>
                    Dr. Halima
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="body2"
                    style={{ color: theme.palette.common.green, fontWeight: 400 }}
                  >
                    Online now
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <IconButton className={classes.iconButton}>
                <CallIcon className={classes.chatIcon} />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton className={classes.iconButton}>
                <VideocamIcon className={classes.chatIcon} />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton className={classes.iconButton} onClick={handleClick}>
                <MoreVertIcon className={classes.chatIcon} />
              </IconButton>
              <Menu
                id="Select option"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "Select option",
                }}
                classes={{ paper: classes.menu }}
              >
                <MenuItem
                  onClick={handleClose}
                  disableRipple
                  component={Link}
                  to={renderPath}
                  className={classes.menuItem}
                >
                  <HiOutlineLogout size="3rem" />
                  End Consultation
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

ChatInterfaceHeading.propTypes = {
  setChatMediaActive: PropTypes.func.isRequired,
};

export default ChatInterfaceHeading;
