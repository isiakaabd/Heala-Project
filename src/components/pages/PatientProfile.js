import React, { useState } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { makeStyles } from "@mui/styles";
import CustomButton from "components/Utilities/CustomButton";
import PreviousButton from "components/Utilities/PreviousButton";
import DisplayProfile from "components/Utilities/DisplayProfile";
import displayPhoto from "assets/images/avatar.png";
import { useTheme } from "@mui/material/styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { IoCopy } from "react-icons/io5";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ReferPatient from "components/modals/ReferPatient";
import DisablePatient from "components/modals/DeleteOrDisable";
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

  buttonsGridWrapper: {
    marginTop: "5rem !important",
    height: "16.1rem",
  },
}));

const PatientProfile = ({ setChatMediaActive }) => {
  const classes = useStyles();
  const theme = useTheme();

  const { patientId } = useParams();

  const [openReferPatient, setOpenReferPatient] = useState(false);
  const [openDisablePatient, setOpenDisablePatient] = useState(false);

  const greenButton = {
    background: theme.palette.success.main,
    hover: theme.palette.success.light,
    active: theme.palette.success.dark,
  };

  const trasparentButton = {
    background: "transparent",
    hover: "#fafafa",
    active: "#f4f4f4",
  };

  return (
    <Grid container direction="column" style={{ paddingBottom: "10rem" }}>
      <Grid item style={{ marginBottom: "3rem" }}>
        <PreviousButton path={`/patients/${patientId}`} />
      </Grid>
      {/* Display photo and profile name grid */}
      <Grid item>
        <DisplayProfile
          fullName="Raphael Igbinedion"
          displayPhoto={displayPhoto}
          medicalTitle="User ID"
          statusId={132467}
          status="Active"
          path={`/patients/${patientId}/profile/chat`}
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
      <Grid
        item
        container
        justifyContent="center"
        alignItems="center"
        className={`${classes.gridsWrapper} ${classes.buttonsGridWrapper}`}
      >
        <Grid item style={{ marginRight: "2rem" }}>
          <CustomButton
            endIcon={<PersonRemoveIcon />}
            title="Disable Patient"
            type={trasparentButton}
            textColor={theme.palette.common.red}
            onClick={() => setOpenDisablePatient(true)}
          />
        </Grid>
        <Grid item style={{ marginLeft: "2rem" }}>
          <CustomButton
            endIcon={<TrendingUpIcon />}
            title="Refer Patient"
            type={greenButton}
            onClick={() => setOpenReferPatient(true)}
          />
        </Grid>
        <ReferPatient open={openReferPatient} setOpen={setOpenReferPatient} />
        <DisablePatient
          open={openDisablePatient}
          setOpen={setOpenDisablePatient}
          title="Delete Partner"
          btnValue="disable"
          confirmationMsg="disable Patient"
        />
      </Grid>
    </Grid>
  );
};

PatientProfile.propTypes = {
  setChatMediaActive: PropTypes.func.isRequired,
};

export default PatientProfile;
