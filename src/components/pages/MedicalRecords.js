import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { makeStyles } from "@mui/styles";
import PreviousButton from "components/Utilities/PreviousButton";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  gridsWrapper: {
    background: "#fff",
    borderRadius: "1rem",
    padding: "4rem",
    boxShadow: "0px 0px 5px -1px rgba(0,0,0,0.2)",
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
      fontSize: "1.35rem",
      borderRadius: "1.5rem",
      color: theme.palette.common.green,
    },
  },

  allergies: {
    "&.MuiGrid-root:not(:last-of-type)": {
      marginRight: "1rem",
    },
  },
}));

const MedicalRecords = (props) => {
  const {
    selectedMenu,
    selectedSubMenu,
    selectedPatientMenu,
    setSelectedMenu,
    setSelectedSubMenu,
    setSelectedPatientMenu,
  } = props;
  const classes = useStyles();
  const { patientId } = useParams();

  const allergies = ["Vanilla Fragrance", "Pineapple", "Eggroll"];

  useEffect(() => {
    setSelectedMenu(1);
    setSelectedSubMenu(2);
    setSelectedPatientMenu(4);

    // eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu, selectedPatientMenu]);

  return (
    <Grid container direction="column" style={{ paddingBottom: "10rem" }}>
      <Grid item style={{ marginBottom: "3rem" }}>
        <PreviousButton path={`/patients/${patientId}`} onClick={() => setSelectedPatientMenu(0)} />
      </Grid>
      <Grid item>
        <Typography variant="h2">Medical Records</Typography>
      </Grid>
      <Grid item container justifyContent="space-between" style={{ paddingTop: "5rem" }}>
        {/* HEIGHT GRID */}
        <Grid item md className={classes.cardGrid} style={{ marginRight: "2rem" }}>
          <Grid
            container
            direction="column"
            style={{ height: "100%" }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h4">Height</Typography>
            </Grid>
            <Grid item>
              <Chip variant="outlined" label="70cm" className={classes.infoBadge} />
            </Grid>
          </Grid>
        </Grid>
        {/* WEIGHT GRID */}
        <Grid item md className={classes.cardGrid} style={{ marginLeft: "2rem" }}>
          <Grid
            container
            direction="column"
            style={{ height: "100%" }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h4">Weight</Typography>
            </Grid>
            <Grid item>
              <Chip variant="outlined" label="75kg" className={classes.infoBadge} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container justifyContent="space-between" style={{ paddingTop: "5rem" }}>
        {/* BLOOD GROUP GRID */}
        <Grid item md className={classes.cardGrid} style={{ marginRight: "2rem" }}>
          <Grid
            container
            direction="column"
            style={{ height: "100%" }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h4">Blood Group</Typography>
            </Grid>
            <Grid item>
              <Chip variant="outlined" label="O+" className={classes.infoBadge} />
            </Grid>
          </Grid>
        </Grid>
        {/* WEIGHT GRID */}
        <Grid item md className={classes.cardGrid} style={{ marginLeft: "2rem" }}>
          <Grid
            container
            direction="column"
            style={{ height: "100%" }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h4">GenoType</Typography>
            </Grid>
            <Grid item>
              <Chip variant="outlined" label="AA" className={classes.infoBadge} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container justifyContent="space-between" style={{ paddingTop: "5rem" }}>
        {/* BMI GRID */}
        <Grid item md className={classes.cardGrid} style={{ marginRight: "2rem" }}>
          <Grid
            container
            direction="column"
            style={{ height: "100%" }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h4">BMI</Typography>
            </Grid>
            <Grid item>
              <Chip variant="outlined" label="56" className={classes.infoBadge} />
            </Grid>
          </Grid>
        </Grid>
        {/* ALLERGIES GRID */}
        <Grid item md className={classes.cardGrid} style={{ marginLeft: "2rem" }}>
          <Grid
            container
            direction="column"
            style={{ height: "100%" }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h4">Allergies</Typography>
            </Grid>
            <Grid item>
              <Grid container justifyContent="space-around">
                {allergies.map((allergy) => (
                  <Grid item key={allergy} className={classes.allergies}>
                    <Chip variant="outlined" label={allergy} className={classes.infoBadge} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container justifyContent="space-between" style={{ paddingTop: "5rem" }}>
        {/* BMI GRID */}
        <Grid item md className={classes.cardGrid} style={{ marginRight: "2rem" }}>
          <Grid
            container
            direction="column"
            style={{ height: "100%" }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h4">Lab Results</Typography>
            </Grid>
            <Grid item>
              <Chip variant="outlined" label="56" className={classes.infoBadge} />
            </Grid>
          </Grid>
        </Grid>
        {/* EMPTY PLACEHOLDER GRID */}
        <Grid item md style={{ marginLeft: "2rem", padding: "4rem 5rem" }}></Grid>
      </Grid>
    </Grid>
  );
};

MedicalRecords.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  selectedPatientMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
  setSelectedPatientMenu: PropTypes.func.isRequired,
};

export default MedicalRecords;
