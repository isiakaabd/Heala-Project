import React from "react";
import Grid from "@mui/material/Grid";
import calendar from "assets/images/calendar.svg";
import { ReactComponent as ConsultationIcon } from "assets/images/consultation.svg";
import { ReactComponent as CalendarIcon } from "assets/images/calendar.svg";
import Card from "components/Utilities/Card";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";

const useStyles = makeStyles((theme) => ({
  containerGrid: {
    paddingTop: "7em",
  },

  parentGrid: {
    "&.MuiGrid-item": {
      ...theme.typography.cardParentGrid,
      width: "30rem",

      "&:hover": {
        background: "#fcfcfc",
      },

      "&:active": {
        background: "#fafafa",
      },
    },
  },

  gridWrapper: {
    ...theme.typography.cardGridWrapper,
  },

  iconWrapper: {
    ...theme.typography.cardIconWrapper,
  },
}));

const Appointments = () => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Grid container justifyContent="space-between" className={classes.containerGrid}>
      <Grid item className={classes.parentGrid} style={{ marginRight: "2em" }} lg md={6} sm={12}>
        <Card
          alt="A calendar icon used as a representation for the waiting list"
          img={calendar}
          title="Waiting List"
          background={theme.palette.common.lightGreen}
        >
          <CalendarIcon />
        </Card>
      </Grid>
      <Grid item className={classes.parentGrid} style={{ marginLeft: "2em" }} lg md={6} sm={12}>
        <Card
          alt="An icon used as a representation for making consultation with the doctor"
          title="Consultation"
          background={theme.palette.common.lightRed}
        >
          <ConsultationIcon fill={theme.palette.common.red} />
        </Card>
      </Grid>
    </Grid>
  );
};

export default Appointments;
