import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import CallEndIcon from "@mui/icons-material/CallEnd";
import { BsMic } from "react-icons/bs";
import { makeStyles } from "@mui/styles";
import doctorImg from "assets/images/Doctor.jpg";
import patientImg from "assets/images/patient-photo.png";

const useStyles = makeStyles((theme) => ({
  parentGrid: {
    height: "100vh",
    width: "100%",
    padding: "5rem",
    overflow: "hidden",
    background: `url(${doctorImg}) no-repeat`,
    backgrondPosition: "center",
    backgroundSize: "cover",
  },

  backgroundImg: {
    height: "100%",
    width: "100%",
  },
  patientImg: {
    width: "15rem",
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
}));
const VideoCall = ({ chatMediaActive, setChatMediaActive, history }) => {
  const classes = useStyles();
  const { patientId, hcpId } = useParams();
  const { pathname } = useLocation();

  const renderPath = () => {
    if (pathname.split("/")[1] === "patients") {
      return `/patients/${patientId}/profile`;
    } else if (pathname.split("/")[1] === "hcps") {
      return `/hcps/${hcpId}/profile`;
    } else {
      return `/dashboard`;
    }
  };

  const handleVideoEnded = () => {
    setTimeout(() => {
      setChatMediaActive(false);
    }, 3000);
  };

  if (!chatMediaActive) history.push(renderPath());

  useEffect(() => {
    setChatMediaActive(true);

    // eslint-disable-next-line
  }, [chatMediaActive]);

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      className={classes.parentGrid}
    >
      <Grid item container justifyContent="flex-end">
        <img src={patientImg} alt="Patient portrait" className={classes.patientImg} />
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
                <IconButton className={classes.endCallButton} onClick={handleVideoEnded}>
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
VideoCall.propTypes = {
  chatMediaActive: PropTypes.bool.isRequired,
  setChatMediaActive: PropTypes.func.isRequired,
  history: PropTypes.object,
};

export default VideoCall;
