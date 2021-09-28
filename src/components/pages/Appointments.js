import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import calendar from "assets/images/calendar.svg";
import consultation from "assets/images/consultation.svg";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  containerGrid: {
    paddingTop: "7em",
  },

  parentGrid: {
    "&.MuiGrid-item": {
      background: "#fff",
      borderRadius: 10,
      height: "25.8rem",
      cursor: "pointer",

      "&:hover": {
        background: "#fcfcfc",
      },

      "&:active": {
        background: "#fafafa",
      },
    },
  },

  gridWrapper: {
    height: "100%",
    padding: "5rem 0",
    borderRadius: 10,
    boxShadow: "-1px 0px 10px -2px rgba(0,0,0,0.15)",
  },

  iconWrapper: {
    width: 86,
    height: 84,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  lightGreen: {
    background: theme.palette.common.lightGreen,
  },

  lightRed: {
    background: theme.palette.common.lightRed,
  },
}));

const Appointments = () => {
  const classes = useStyles();
  return (
    <Grid container justifyContent="space-between" className={classes.containerGrid}>
      <Grid item className={classes.parentGrid} style={{ marginRight: "2em" }} lg md={6} sm={12}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="space-between"
          className={classes.gridWrapper}
        >
          <Grid item className={`${classes.iconWrapper} ${classes.lightGreen}`}>
            <img
              src={calendar}
              alt="A calendar icon used as a representation for the waiting list"
            />
          </Grid>
          <Grid item>
            <Typography variant="h2">Waiting list</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.parentGrid} style={{ marginLeft: "2em" }} lg md={6} sm={12}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="space-between"
          className={classes.gridWrapper}
        >
          <Grid item className={`${classes.iconWrapper} ${classes.lightRed}`}>
            <img
              src={consultation}
              alt="An icon used as a representation for making consultation with the doctor"
            />
          </Grid>
          <Grid item>
            <Typography variant="h2">Consultation</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Appointments;
