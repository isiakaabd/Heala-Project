import React, { useState, useEffect, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import { NoData } from "components/layouts";
import { makeStyles } from "@mui/styles";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { doctor } from "components/graphQL/useQuery";
import { Loader, DisplayProfile, ProfileCard } from "components/Utilities";
import { dateMoment } from "components/Utilities/Time";

const useStyles = makeStyles((theme) => ({
  gridsWrapper: {
    background: "#fff",
    borderRadius: "1rem",
    padding: "1rem",
    boxShadow: "0px 0px 5px -1px rgba(0,0,0,0.2)",
  },

  badge: {
    "&.MuiChip-root": {
      fontSize: "1.3rem !important",
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

  linkIcon: {
    "&.MuiSvgIcon-root": {
      fontSize: "1.25rem",
      color: theme.palette.common.green,
      marginLeft: "1.2rem",
    },
  },
  link: {
    textDecoration: "none",
    color: theme.palette.common.green,
    cursor: "pointer",
  },

  buttonsGridWrapper: {
    height: "16.1rem",
  },
}));

const HcpProfile = (props) => {
  const { selectedMenu, setSelectedMenu, chatMediaActive, setChatMediaActive } = props;
  const classes = useStyles();

  const { hcpId } = useParams();

  const [doctorProfile, setDoctorProfile] = useState("");

  const { loading, error, data } = useQuery(doctor, {
    variables: {
      id: hcpId,
    },
  });

  useEffect(() => {
    if (data) {
      setDoctorProfile(data.doctorProfile);
    }
  }, [data, hcpId]);

  useLayoutEffect(() => {
    setSelectedMenu(2);
    setChatMediaActive(false);

    // eslint-disable-next-line
  }, [selectedMenu, chatMediaActive]);

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
    <Grid container direction="column" gap={4}>
      {/* Display photo and profile name grid */}
      <Grid item>
        <DisplayProfile
          fullName={`${firstName} ${lastName}`}
          displayPhoto={picture}
          medicalTitle="Medical ID"
          statusId={dociId?.split("-")[1]}
          specialization={specialization ? specialization : "Not assigned"}
          chatPath={`/hcps/${hcpId}/profile/chat`}
          setChatMediaActive={setChatMediaActive}
          selectedMenu={selectedMenu}
          type="doctor"
        />
      </Grid>
      {/* PERSONAL INFO SECTION */}
      <Grid item container spacing={4} justifyContent="space-between">
        <Grid item container md={6} sm={6} xs={12}>
          <ProfileCard text="Gender" value={gender} />
        </Grid>
        <Grid item container md={6} sm={6} xs={12}>
          <ProfileCard text="Date Of Birth" value={dob ? dateMoment(dob) : "DOB not Provided"} />
        </Grid>

        <Grid item container md={6} sm={6} xs={12} mx="auto">
          <ProfileCard
            text="Email Address"
            value={
              email ? (
                <a href={`mailto:${email}`} className={classes.link}>
                  {email}
                </a>
              ) : (
                "NO Email Provided"
              )
            }
          />
        </Grid>
        <Grid item container md={6} sm={6} xs={12}>
          <ProfileCard
            text="Phone Number"
            value={
              phoneNumber ? (
                <a href={`tel:+234${phoneNumber}`} className={classes.link}>
                  {phoneNumber}
                </a>
              ) : (
                "No Phone Number"
              )
            }
          />
        </Grid>
        <Grid item container md={12} sm={12} xs={12}>
          <ProfileCard
            text="Hospital"
            value={
              hospital ? (
                <a href={email} className={classes.link}>
                  <span>{hospital}</span>
                  <LocationOnIcon className={`${classes.linkIcon} ${classes.locationIcon}`} />
                </a>
              ) : (
                "No Hospital attached"
              )
            }
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

HcpProfile.propTypes = {
  selectedMenu: PropTypes.number,
  setSelectedMenu: PropTypes.func,
  chatMediaActive: PropTypes.bool,
  setChatMediaActive: PropTypes.func,
};

export default HcpProfile;
