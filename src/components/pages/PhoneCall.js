import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import CallEndIcon from "@mui/icons-material/CallEnd";
import { BsMic } from "react-icons/bs";
import avatar from "assets/images/avatar-big.png";

const useStyles = makeStyles((theme) => ({
  parentGrid: {
    height: "100vh",
    background: "#eaedf5",
  },

  avatarCircleLG: {
    position: "relative",
    borderRadius: "50%",
    background: "rgba(0, 0, 0, 0.04)",
    width: "25rem",
    height: "25rem",
  },

  avatarCircleSM: {
    width: "20rem",
    height: "20rem",
    background: "rgba(0, 0, 0, 0.04)",
    borderRadius: "50%",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },

  avatar: {
    "&.MuiAvatar-root": {
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      height: "15rem",
      width: "15rem",
    },
  },
  icon: {
    "&.MuiSvgIcon-root": {
      fontSize: "3rem",
    },
  },
  endCallButton: {
    "&.MuiIconButton-root": {
      padding: "1.5rem",
      background: theme.palette.common.red,

      "&:hover": {
        background: theme.palette.error.light,
      },

      "&:active": {
        background: theme.palette.error.dark,
      },
    },
  },
  iconButton: {
    "&.MuiIconButton-root": {
      background: "#fff",
    },
  },
  dot: {
    width: ".5rem",
    height: ".5rem",
    background: theme.palette.common.red,
    borderRadius: "50%",
  },
}));
const PhoneCall = ({ chatMediaActive, setChatMediaActive, history }) => {
  const classes = useStyles();

  const { patientId, hcpId } = useParams();
  const { pathname } = useLocation();

  useEffect(() => {
    setChatMediaActive(true);

    // eslint-disable-next-line
  }, [chatMediaActive]);

  const renderPath = () => {
    if (pathname.split("/")[1] === "patients") {
      return `/patients/${patientId}/profile`;
    } else if (pathname.split("/")[1] === "hcps") {
      return `/hcps/${hcpId}/profile`;
    } else {
      return `/dashboard`;
    }
  };

  const handleCallEnded = () => {
    setTimeout(() => {
      setChatMediaActive(false);
    }, 3000);
  };

  if (!chatMediaActive) history.push(renderPath());

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-evenly"
      alignItems="center"
      className={classes.parentGrid}
    >
      <Grid item>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <div className={classes.dot} />
          </Grid>
          <Grid item>
            <Typography variant="body1" color="error">
              05 minutes remaining
            </Typography>
          </Grid>
          <Grid item>
            <div className={classes.dot} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item container justifyContent="center" style={{ marginBottom: "2em" }}>
        <div className={classes.avatarCircleLG}>
          <div className={classes.avatarCircleMD}>
            <div className={classes.avatarCircleSM}>
              <Avatar alt="Recipient portrait" src={avatar} className={classes.avatar} />
            </div>
          </div>
        </div>
      </Grid>
      <Grid item>
        <Grid container direction="column" justifyContent="center">
          <Grid item marginBottom={1}>
            <Typography variant="body2" align="center" style={{ fontSize: "1rem" }}>
              In Call
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" align="center">
              Dr. Diane Kruger
            </Typography>
          </Grid>
          <Grid item marginBottom={3}>
            <Typography variant="body2" align="center" style={{ fontSize: "1.15rem" }}>
              15:49
            </Typography>
          </Grid>
          <Grid item>
            <Grid container alignItems="center" justifyContent="center" spacing={3}>
              <Grid item>
                <IconButton className={classes.iconButton}>
                  <VideocamOutlinedIcon className={classes.icon} />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton className={classes.endCallButton} onClick={handleCallEnded}>
                  <CallEndIcon className={classes.icon} style={{ color: "#fff" }} />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton className={classes.iconButton}>
                  <BsMic size="2.5rem" />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
PhoneCall.propTypes = {
  chatMediaActive: PropTypes.bool.isRequired,
  setChatMediaActive: PropTypes.func.isRequired,
  history: PropTypes.object,
};

export default PhoneCall;
