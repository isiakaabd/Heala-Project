import React, { useState, useEffect, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import { Chip, Grid, Typography } from "@mui/material";
import { NoData } from "components/layouts";
import { makeStyles } from "@mui/styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { IoCopy } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { doctor } from "components/graphQL/useQuery";
import { Loader, PreviousButton, DisplayProfile } from "components/Utilities";
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
    width: "100%",
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

  const { loading, error, data } = useQuery(doctor, {
    variables: {
      id: hcpId,
    },
  });
  console.log(data);

  useEffect(() => {
    if (data) {
      setDoctorProfile(data.doctorProfile);
    }
  }, [data, hcpId]);

  useLayoutEffect(() => {
    setSelectedMenu(2);
    setSelectedSubMenu(3);
    setSelectedHcpMenu(1);
    setChatMediaActive(false);

    // eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu, selectedHcpMenu, chatMediaActive]);
  console.log(data);
  if (loading) return <Loader />;
  if (error) return <NoData error={error} />;
  const {
    dociId,
    picture,
    firstName,
    lastName,
    specialization,
    email,
    hospital,
    phoneNumber,
    gender,
    dob,
  } = doctorProfile;
  return (
    <Grid container direction="column" gap={3} width="100%">
      <Grid item>
        <PreviousButton path={`/hcps/${hcpId}`} onClick={() => setSelectedHcpMenu(0)} />
      </Grid>
      {/* Display photo and profile name grid */}
      <Grid item container>
        <DisplayProfile
          fullName={`${firstName} ${lastName}`}
          displayPhoto={picture}
          medicalTitle="Medical ID"
          statusId={dociId && dociId.split("-")[1]}
          specialization={specialization ? specialization : "Not assigned"}
          chatPath={`/hcps/${hcpId}/profile/chat`}
          setChatMediaActive={setChatMediaActive}
          setSelectedSubMenu={setSelectedSubMenu}
          selectedMenu={selectedMenu}
          type="doctor"
        />
      </Grid>
      {/* PERSONAL INFO SECTION */}
      <Grid item container justifyContent="space-between" gap={5} sx={{ width: "100%" }}>
        {/* GENDER GRID */}
        <Grid item md className={classes.cardGrid}>
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
              <Chip variant="outlined" label={gender} className={classes.infoBadge} />
            </Grid>
          </Grid>
        </Grid>
        {/* DATE OF BIRTH GRID */}
        <Grid item md className={classes.cardGrid}>
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
                label={dob ? dateMoment(dob) : <span>DOB not Provided</span>}
                className={classes.infoBadge}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container justifyContent="space-between" gap={5}>
        {/* EMAIL ADDRESS GRID */}
        <Grid item md className={classes.cardGrid}>
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
              {email ? (
                <a href={`mailto:${email}`} className={classes.link}>
                  <span>{email}</span>
                  <ArrowForwardIosIcon className={classes.linkIcon} />
                </a>
              ) : (
                <span className={classes.link}>No Email Address</span>
              )}
            </Grid>
          </Grid>
        </Grid>
        {/* PhONE NUMBER GRID */}
        <Grid item md className={classes.cardGrid}>
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
              {phoneNumber ? (
                <a href={phoneNumber} className={classes.link}>
                  <span>{phoneNumber} </span>
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
      <Grid item container justifyContent="space-between">
        {/* HOSPITAL GRID */}
        <Grid item md className={classes.cardGrid}>
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
              {hospital ? (
                <a href={email} className={classes.link}>
                  <span>{hospital}</span>
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
  selectedMenu: PropTypes.number,
  selectedSubMenu: PropTypes.number,
  selectedHcpMenu: PropTypes.number,
  chatMediaActive: PropTypes.bool,
  setSelectedMenu: PropTypes.func,
  setSelectedSubMenu: PropTypes.func,
  setSelectedHcpMenu: PropTypes.func,
  setChatMediaActive: PropTypes.func,
};

export default HcpProfile;
