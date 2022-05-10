import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Card } from "components/Utilities";
import { useTheme } from "@mui/material/styles";
import { ReactComponent as CalendarIcon } from "assets/images/calendar.svg";
import { ReactComponent as ConsultationIcon } from "assets/images/consultation.svg";

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
}));

const Appointments = ({ setSelectedSubMenu, setSelectedAppointmentMenu }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Grid container justifyContent="space-between" className={classes.containerGrid}>
      <Grid
        item
        className={classes.parentGrid}
        component={Link}
        to="/appointments/waiting-list"
        style={{ marginRight: "2em", textDecoration: "none" }}
        lg
        md={6}
        sm={12}
        onClick={() => {
          setSelectedSubMenu(5);
          setSelectedAppointmentMenu(1);
        }}
      >
        <Card title="Waiting List" background={theme.palette.common.lightGreen}>
          <CalendarIcon fill={theme.palette.common.green} />
        </Card>
      </Grid>
      <Grid
        item
        className={classes.parentGrid}
        component={Link}
        to="/appointments/consultation"
        style={{
          marginLeft: "2em",
          textDecoration: "none",
          visibility: "hidden",
        }}
        lg
        md={6}
        sm={12}
        onClick={() => {
          setSelectedSubMenu(5);
          setSelectedAppointmentMenu(2);
        }}
      >
        <Card title="Consultation" background={theme.palette.common.lightRed}>
          <ConsultationIcon fill={theme.palette.common.red} />
        </Card>
      </Grid>
    </Grid>
  );
};

Appointments.propTypes = {
  setSelectedSubMenu: PropTypes.func.isRequired,
  setSelectedAppointmentMenu: PropTypes.func.isRequired,
};

export default Appointments;
