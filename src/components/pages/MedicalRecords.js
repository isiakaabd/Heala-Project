import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Grid, Typography, Chip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PreviousButton from "components/Utilities/PreviousButton";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
// import combineQuery from "graphql-combine-query";
import { calculateBMI } from "components/Utilities/bMI";
import { getProfile /*getAllergies*/ } from "components/graphQL/useQuery";
import Loader from "components/Utilities/Loader";
import NoData from "components/layouts/NoData";

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
  const [patientProfile, setPatientProfile] = useState(undefined);
  const { loading, data, error } = useQuery(getProfile, {
    variables: {
      profileId: patientId,
    },
  });
  // const { document, variables } = combineQuery("FooBarQuery")
  //   .add(getProfile, {
  //     variables: {
  //       profileId: patientId,
  //     },
  //   })
  //   .add(getAllergies);
  // console.log(variables);
  console.log(document);
  // const { data } = FooBarQuery();
  const allergies = ["Vanilla Fragrance", "Pineapple", "Eggroll"];

  useEffect(() => {
    setSelectedMenu(1);
    setSelectedSubMenu(2);
    setSelectedPatientMenu(4);

    // eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu, selectedPatientMenu]);
  useEffect(() => {
    if (data && data.profile) {
      setPatientProfile(data.profile);
      // setPatientProfile(data.profiles.data);
    }
  }, [data]);

  if (loading) return <Loader />;
  if (error) return <NoData error={error.message} />;
  if (patientProfile) {
    return (
      <Grid container direction="column" style={{ paddingBottom: "10rem" }}>
        <Grid item style={{ marginBottom: "3rem" }}>
          <PreviousButton
            path={`/patients/${patientId}`}
            onClick={() => setSelectedPatientMenu(0)}
          />
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
                <Chip
                  variant="outlined"
                  label={patientProfile.height}
                  className={classes.infoBadge}
                />
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
                <Chip
                  variant="outlined"
                  label={patientProfile.weight}
                  className={classes.infoBadge}
                />
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
                <Chip
                  variant="outlined"
                  label={patientProfile.bloodGroup}
                  className={classes.infoBadge}
                />
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
                <Chip
                  variant="outlined"
                  label={patientProfile.genotype}
                  className={classes.infoBadge}
                />
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
                <Chip
                  variant="outlined"
                  label={calculateBMI(patientProfile.height, patientProfile.weight)}
                  className={classes.infoBadge}
                />
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
                      <Chip variant="outlined" label="no value" className={classes.infoBadge} />
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
                <Chip variant="outlined" label="no value" className={classes.infoBadge} />
              </Grid>
            </Grid>
          </Grid>
          {/* EMPTY PLACEHOLDER GRID */}
          <Grid item md style={{ marginLeft: "2rem", padding: "4rem 5rem" }}></Grid>
        </Grid>
      </Grid>
    );
  } else return null;
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
