import React, { useState, useEffect, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import NoData from "components/layouts/NoData";
import { makeStyles } from "@mui/styles";
import PreviousButton from "components/Utilities/PreviousButton";
import DisplayProfile from "components/Utilities/DisplayProfile";
import displayPhoto from "assets/images/avatar.png";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { IoCopy } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { useQuery /*useMutation*/ } from "@apollo/client";
import { doctor } from "components/graphQL/useQuery";
// import { createAllery } from "components/graphQL/Mutation";
import Loader from "components/Utilities/Loader";
import { dateMoment } from "components/Utilities/Time";

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

  const [doctorProfile, setDoctorProfile] = useState("");
  // const profile = useQuery(createAllery, {
  //   variables: {
  //     id: hcpId,
  //   },
  // });

  const profile = useQuery(doctor, {
    variables: {
      id: hcpId,
    },
  });
  console.log(profile);
  useEffect(() => {
    if (profile.data) {
      setDoctorProfile(profile.data.doctorProfile);
    }
  }, [profile.data, hcpId]);

  useLayoutEffect(() => {
    setSelectedMenu(2);
    setSelectedSubMenu(3);
    setSelectedHcpMenu(1);
    setChatMediaActive(false);

    // eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu, selectedHcpMenu, chatMediaActive]);

  if (profile.loading) return <Loader />;
  if (profile.error) return <NoData error={profile.error.message} />;

  return (
    <Grid container direction="column" style={{ paddingBottom: "10rem" }}>
      <Grid item style={{ marginBottom: "3rem" }}>
        <PreviousButton path={`/hcps/${hcpId}`} onClick={() => setSelectedHcpMenu(0)} />
      </Grid>
      {/* Display photo and profile name grid */}
      <Grid item>
        <DisplayProfile
          fullName={`${doctorProfile.firstName} ${doctorProfile.lastName}`}
          displayPhoto={displayPhoto}
          medicalTitle="Medical ID"
          statusId={doctorProfile._id}
          specialization={
            doctorProfile.specialization ? doctorProfile.specialization : "Not assigned"
          }
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
              <Chip variant="outlined" label={doctorProfile.gender} className={classes.infoBadge} />
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
              <Chip
                variant="outlined"
                label={
                  doctorProfile.dob ? dateMoment(doctorProfile.dob) : <span>DOB not Provided</span>
                }
                className={classes.infoBadge}
              />
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
              {doctorProfile.email ? (
                <a href={`mailto:${doctorProfile.email}`} className={classes.link}>
                  <span>{doctorProfile.email}</span>
                  <ArrowForwardIosIcon className={classes.linkIcon} />
                </a>
              ) : (
                <span className={classes.link}>No Email Address</span>
              )}
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
              {doctorProfile.phoneNumber ? (
                <a href={doctorProfile.phoneNumber} className={classes.link}>
                  <span>{doctorProfile.phoneNumber} </span>
                  <IoCopy
                    className={classes.linkIcon}
                    size={12.5}
                    style={{ marginLeft: "1.2rem" }}
                  />
                </a>
              ) : (
                <span className={classes.link}>No Phone Number</span>
              )}
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
              {doctorProfile.hospital ? (
                <a href={doctorProfile.email} className={classes.link}>
                  <span>{doctorProfile.hospital}</span>
                  <LocationOnIcon className={`${classes.linkIcon} ${classes.locationIcon}`} />
                </a>
              ) : (
                <span className={classes.link}>No Hospital attached</span>
              )}
            </Grid>
          </Grid>
        </Grid>
        {/* PLACEHOLDER GRID */}
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
