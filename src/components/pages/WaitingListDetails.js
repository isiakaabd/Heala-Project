import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Chip, Typography, Grid } from "@mui/material";
import { DisplayProfile, PreviousButton } from "components/Utilities";
import displayPhoto from "assets/images/avatar.svg";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    background: "#fff",
    borderRadius: "1rem",
    padding: "4rem 5rem",
    height: "16.1rem",
    boxShadow: "0px 0px 5px -1px rgba(0,0,0,0.2)",
  },
  infoBadge: {
    "&.css-1dl0kns-MuiChip-root": {
      fontSize: "1.25rem",
      borderRadius: "1.5rem",
      color: theme.palette.common.green,
    },
  },
}));

const WaitingListDetails = (props) => {
  const { selectedMenu, setSelectedMenu } = props;
  const classes = useStyles();

  const symptoms = ["Headache", "Sore Throat", "Fever"];

  useEffect(() => {
    setSelectedMenu(4);
    /* setSelectedSubMenu(5);
    setSelectedAppointmentMenu(1);
    setWaitingListMenu(1); */

    // eslint-disable-next-line
  }, [selectedMenu /* selectedSubMenu, waitingListMenu, selectedAppointmentMenu */]);

  return (
    <Grid container direction="column" style={{ paddingBottom: "10rem" }}>
      <Grid item style={{ marginBottom: "3rem" }}>
        <PreviousButton
          path="/appointments/waiting-list" /* onClick={() => setWaitingListMenu(0)} */
        />
      </Grid>
      <Grid item>
        <DisplayProfile
          fullName="Raphael Igbinedion"
          displayPhoto={displayPhoto}
          medicalTitle="Medical ID"
          statusId={132467}
        />
      </Grid>
      <Grid item container justifyContent="space-between" style={{ paddingTop: "5rem" }}>
        {/* SYMPTOMS GRID */}
        <Grid item md className={classes.cardGrid} style={{ marginRight: "2rem" }}>
          <Grid
            container
            direction="column"
            style={{ height: "100%" }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h4">Symptoms: </Typography>
            </Grid>

            <Grid item container justifyContent="space-evenly">
              {symptoms.map((symptom) => (
                <Grid item key={symptom}>
                  <Chip variant="outlined" label={symptom} className={classes.infoBadge} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        {/* CONSULTATION TYPE GRID */}
        <Grid item md className={classes.cardGrid} style={{ marginLeft: "2rem" }}>
          <Grid
            container
            direction="column"
            style={{ height: "100%" }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h4">Consultation Type</Typography>
            </Grid>
            <Grid item>
              <Chip variant="outlined" label="Type 1" className={classes.infoBadge} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container justifyContent="space-between" style={{ paddingTop: "5rem" }}>
        {/* SCALE OF DISCOMFORT GRID */}
        <Grid item md className={classes.cardGrid} style={{ marginRight: "2rem" }}>
          <Grid
            container
            direction="column"
            style={{ height: "100%" }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h4">Scale of discomfort: </Typography>
            </Grid>
            <Grid item>
              <Chip variant="outlined" label="Once" className={classes.infoBadge} />
            </Grid>
          </Grid>
        </Grid>
        {/* DATE OF FIRST NOTICE GRID */}
        <Grid item md className={classes.cardGrid} style={{ marginLeft: "2rem" }}>
          <Grid
            container
            direction="column"
            style={{ height: "100%" }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h4">Date of first notice</Typography>
            </Grid>
            <Grid item>
              <Chip variant="outlined" label="01-10-2021" className={classes.infoBadge} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

WaitingListDetails.propTypes = {
  selectedMenu: PropTypes.number,
  setSelectedMenu: PropTypes.func,
  /* selectedSubMenu: PropTypes.number,
  selectedAppointmentMenu: PropTypes.number,
  waitingListMenu: PropTypes.number,
  setSelectedSubMenu: PropTypes.func,
  setWaitingListMenu: PropTypes.func,
  setSelectedAppointmentMenu: PropTypes.func.isRequired, */
};

export default WaitingListDetails;
