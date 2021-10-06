import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import CustomButton from "components/Utilities/CustomButton";
import Avatar from "@mui/material/Avatar";
import displayPhoto from "assets/images/avatar.png";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { ReactComponent as CalendarIcon } from "assets/images/calendar.svg";
import { ReactComponent as TimerIcon } from "assets/images/timer.svg";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PreviousButton from "components/Utilities/PreviousButton";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  parentGridWrapper: {
    background: "#fff",
    borderRadius: "1rem",
    boxShadow: "0px 0px 5px -1px rgba(0,0,0,0.1)",

    "&:not(:last-of-type)": {
      marginBottom: "5rem",
    },
  },

  infoBadge: {
    "&.MuiChip-root": {
      fontSize: "1.5rem",
      borderRadius: "1.5rem",
      background: theme.palette.common.lightGreen,
      color: theme.palette.common.green,
    },
  },

  title: {
    "&.MuiTypography-root": {
      color: theme.palette.common.grey,
      marginRight: "2rem",
    },
  },
}));

const HcpAppointments = ({ selectedMenu, setSelectedMenu }) => {
  const classes = useStyles();
  const theme = useTheme();

  const { hcpId } = useParams();

  const greenButton = {
    background: theme.palette.common.lightGreen,
    hover: theme.palette.success.light,
    active: theme.palette.success.dark,
  };

  const redButton = {
    background: theme.palette.common.lightRed,
    hover: theme.palette.error.light,
    active: theme.palette.error.dark,
  };

  const appointments = [
    {
      id: 0,
      date: "7 July, 2021",
      time: "3:30 PM",
      patientName: "Raphael Igbenedion",
      photo: displayPhoto,
      details:
        "The meeting is based on the appointment with the patient. The meeting is based on the appointment with the patient. The meeting is based on the appointment with the patient. ",
    },
    {
      id: 1,
      date: "8 July, 2021",
      time: "4:30 PM",
      patientName: "Raphael Igbenedion",
      photo: displayPhoto,
      details:
        "The meeting is based on the appointment with the patient. The meeting is based on the appointment with the patient. The meeting is based on the appointment with the patient. ",
    },
    {
      id: 2,
      date: "9 July, 2021",
      time: "5:30 PM",
      patientName: "Raphael Igbenedion",
      photo: displayPhoto,
      details:
        "The meeting is based on the appointment with the patient. The meeting is based on the appointment with the patient. The meeting is based on the appointment with the patient. ",
    },
  ];

  useEffect(() => {
    setSelectedMenu(2);

    // eslint-disable-next-line
  }, [selectedMenu]);

  return (
    <Grid container direction="column" style={{ paddingBottom: "5rem" }}>
      <Grid item style={{ marginBottom: "3rem" }}>
        <PreviousButton path={`/patients/${hcpId}`} />
      </Grid>
      <Grid item style={{ marginBottom: "3rem" }}>
        <Typography variant="h2">HCP Appointments</Typography>
      </Grid>
      {appointments.map((appointment) => (
        <Grid
          item
          container
          direction="column"
          key={appointment.id}
          className={classes.parentGridWrapper}
        >
          <Grid item style={{ maxWidth: "40rem", padding: "4rem 5rem" }}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="body1" className={classes.title}>
                  Date:{" "}
                </Typography>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item style={{ marginRight: "1.5rem" }}>
                    <CalendarIcon fill={theme.palette.common.lightGrey} height={14} width={10} />
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">{appointment.date}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item style={{ marginRight: "1.5rem" }}>
                    <TimerIcon fill={theme.palette.common.red} />
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">{appointment.time}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider color={theme.palette.common.lighterGrey} />
          <Grid item style={{ padding: "2rem 5rem" }}>
            <Grid container alignItems="center">
              <Grid item>
                <Typography variant="body1" className={classes.title}>
                  Patient:
                </Typography>
              </Grid>
              <Grid item style={{ marginRight: "2rem" }}>
                <Avatar src={displayPhoto} alt="Display Photo of the patient" />
              </Grid>
              <Grid item>
                <Typography variant="body1">{appointment.patientName}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Divider color={theme.palette.common.lighterGrey} />
          <Grid item style={{ padding: "3rem 5rem" }}>
            <Grid container direction="column">
              <Grid item style={{ marginBottom: "1rem" }}>
                <Typography variant="body1" className={classes.title}>
                  Meeting Details
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">{appointment.details}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Divider color={theme.palette.common.lighterGrey} />
          <Grid item>
            <Grid container justifyContent="flex-end" style={{ padding: "2rem 5rem" }}>
              <Grid item style={{ marginRight: "3rem" }}>
                <CustomButton
                  title="Reschedule"
                  type={greenButton}
                  height="3.5rem"
                  textColorOnHover="#fff"
                  textColor={theme.palette.common.green}
                  endIcon={<AssignmentIcon color="success" />}
                  borderRadius="3rem"
                />
              </Grid>
              <Grid item>
                <CustomButton
                  title="Cancel"
                  type={redButton}
                  height="3.5rem"
                  textColorOnHover="#fff"
                  textColor={theme.palette.common.red}
                  endIcon={<AssignmentIcon color="error" />}
                  borderRadius="3rem"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

HcpAppointments.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
};

export default HcpAppointments;
