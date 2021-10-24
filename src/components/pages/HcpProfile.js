import React, { useLayoutEffect } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { makeStyles } from "@mui/styles";
import PreviousButton from "components/Utilities/PreviousButton";
import DisplayProfile from "components/Utilities/DisplayProfile";
import displayPhoto from "assets/images/avatar.png";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { IoCopy } from "react-icons/io5";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  gridsWrapper: {
    background: "#fff",
    borderRadius: "1rem",
    padding: "4rem",
    boxShadow: "0px 0px 5px -1px rgba(0,0,0,0.2)",
  },

  badge: {
    "&.MuiChip-root": {
      fontSize: "1.3rem",
      //   height: "2.7rem",
      background: theme.palette.common.lightGreen,
      color: theme.palette.common.green,
      borderRadius: "1.5rem",
    },
  },

  cardGrid: {
    background: "#fff",
    borderRadius: "1rem",
    padding: "4rem 5rem",
    height: "16.1rem",
    boxShadow: "0px 0px 5px -1px rgba(0,0,0,0.2)",
  },

  infoBadge: {
    "&.MuiChip-root": {
      fontSize: "1.25rem",
      borderRadius: "1.5rem",
      color: theme.palette.common.green,
    },
  },

  link: {
    display: "flex",
    alignItems: "center",
    fontSize: "1.25rem",
    color: theme.palette.common.green,
    border: `1px solid ${theme.palette.common.lightGrey}`,
    padding: ".75rem",
    borderRadius: "1.5rem",
    textDecoration: "none",
  },

  linkIcon: {
    "&.MuiSvgIcon-root": {
      fontSize: "1.25rem",
      color: theme.palette.common.green,
      marginLeft: "1.2rem",
    },
  },

  locationIcon: {
    "&.MuiSvgIcon-root": {
      fontSize: "2rem",
    },
  },

  buttonsGridWrapper: {
    marginTop: "5rem !important",
    height: "16.1rem",
  },
}));

const HcpProfile = (props) => {
  const {
    selectedMenu,
    setSelectedMenu,
    selectedSubMenu,
    chatMediaActive,
    setSelectedSubMenu,
    selectedHcpMenu,
    setSelectedHcpMenu,
    setChatMediaActive,
  } = props;
  const classes = useStyles();

  const { hcpId } = useParams();

  useLayoutEffect(() => {
    setSelectedMenu(2);
    setSelectedSubMenu(3);
    setSelectedHcpMenu(1);
    setChatMediaActive(false);

    // eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu, selectedHcpMenu, chatMediaActive]);

  return (
    <Grid container direction="column" style={{ paddingBottom: "10rem" }}>
      <Grid item style={{ marginBottom: "3rem" }}>
        <PreviousButton path={`/hcps/${hcpId}`} onClick={() => setSelectedHcpMenu(0)} />
      </Grid>
      {/* Display photo and profile name grid */}
      <Grid item>
        <DisplayProfile
          fullName="Raphael Igbinedion"
          displayPhoto={displayPhoto}
          medicalTitle="Medical ID"
          statusId={132467}
          specialization="Dentistry"
          chatPath={`/hcps/${hcpId}/profile/chat`}
          callPath={`/hcps/${hcpId}/profile/call`}
          videoPath={`/hcps/${hcpId}/profile/video`}
          setChatMediaActive={setChatMediaActive}
        />
      </Grid>
      {/* PERSONAL INFO SECTION */}
      <Grid item container justifyContent="space-between" style={{ paddingTop: "5rem" }}>
        {/* GENDER GRID */}
        <Grid item md className={classes.cardGrid} style={{ marginRight: "2rem" }}>
          <Grid
            container
            direction="column"
            style={{ height: "100%" }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h4">Gender</Typography>
            </Grid>
            <Grid item>
              <Chip variant="outlined" label="Male" className={classes.infoBadge} />
            </Grid>
          </Grid>
        </Grid>
        {/* DATE OF BIRTH GRID */}
        <Grid item md className={classes.cardGrid} style={{ marginLeft: "2rem" }}>
          <Grid
            container
            direction="column"
            style={{ height: "100%" }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h4">Date of Birth</Typography>
            </Grid>
            <Grid item>
              <Chip variant="outlined" label="7/11/1995" className={classes.infoBadge} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container justifyContent="space-between" style={{ paddingTop: "5rem" }}>
        {/* EMAIL ADDRESS GRID */}
        <Grid item md className={classes.cardGrid} style={{ marginRight: "2rem" }}>
          <Grid
            container
            direction="column"
            style={{ height: "100%" }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h4">Email Address</Typography>
            </Grid>
            <Grid item>
              <a href="mailto:raphaeligbinedion@yahoo.com" className={classes.link}>
                <span>raphaeligbinedion@yahoo.com</span>
                <ArrowForwardIosIcon className={classes.linkIcon} />
              </a>
            </Grid>
          </Grid>
        </Grid>
        {/* PhONE NUMBER GRID */}
        <Grid item md className={classes.cardGrid} style={{ marginLeft: "2rem" }}>
          <Grid
            container
            direction="column"
            style={{ height: "100%" }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h4">Phone Number</Typography>
            </Grid>
            <Grid item>
              <a href="tel:+2347086937133" className={classes.link}>
                <span>08123456789</span>
                <IoCopy className={classes.linkIcon} size={12.5} style={{ marginLeft: "1.2rem" }} />
              </a>
              {/* <Chip variant="outlined" label="08123456789" className={classes.infoBadge} /> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container justifyContent="space-between" style={{ paddingTop: "5rem" }}>
        {/* HOSPITAL GRID */}
        <Grid item md className={classes.cardGrid} style={{ marginRight: "2rem" }}>
          <Grid
            container
            direction="column"
            style={{ height: "100%" }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h4">Hospital</Typography>
            </Grid>
            <Grid item>
              <a href="mailto:raphaeligbinedion@yahoo.com" className={classes.link}>
                <span>Federal Teaching Hospital, Abakaliki</span>
                <LocationOnIcon className={`${classes.linkIcon} ${classes.locationIcon}`} />
              </a>
            </Grid>
          </Grid>
        </Grid>
        {/* PLACEHOLDER GRID */}
        <Grid
          item
          md
          className={classes.cardGrid}
          style={{ marginLeft: "2rem", visibility: "hidden" }}
        >
          <Grid
            container
            direction="column"
            style={{ height: "100%" }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h4">Phone Number</Typography>
            </Grid>
            <Grid item>
              <a href="tel:+2347086937133" className={classes.link}>
                <span>08123456789</span>
                <IoCopy className={classes.linkIcon} size={12.5} style={{ marginLeft: "1.2rem" }} />
              </a>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

HcpProfile.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  selectedHcpMenu: PropTypes.number.isRequired,
  chatMediaActive: PropTypes.bool.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
  setSelectedHcpMenu: PropTypes.func.isRequired,
  setChatMediaActive: PropTypes.func.isRequired,
};

export default HcpProfile;
