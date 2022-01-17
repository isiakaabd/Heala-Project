import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useQuery } from "@apollo/client";
import { getConsultation } from "components/graphQL/useQuery";
import { dateMoment } from "components/Utilities/Time";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import displayPhoto from "assets/images/avatar.svg";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { ReactComponent as CalendarIcon } from "assets/images/calendar.svg";
import { ReactComponent as TimerIcon } from "assets/images/timer.svg";
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

const caseNotes = [
  {
    id: 0,
    date: "7 July, 2021",
    time: "3:30 PM",
    illness: "Headache",
    severity: "Moderate",
    photo: displayPhoto,
    caregiver: "Raphael Igbenedion",
    treatment:
      "The treatment for the illness should be written here. The treatment for the illness should be written here. The treatment for the illness should be written here. The treatment for the illness should be written here. The treatment for the illness should be written here. The treatment for the illness should be written here. The treatment for the illness should be written here. The treatment for the illness should be written here.",
  },
  // {
  //   id: 1,
  //   date: "8 July, 2021",
  //   time: "4:30 PM",
  //   illness: "Stomachache",
  //   severity: "Moderate",
  //   photo: displayPhoto,
  //   caregiver: "Jane Doe",
  //   treatment:
  //     "The treatment for the illness should be written here. The treatment for the illness should be written here. The treatment for the illness should be written here. The treatment for the illness should be written here. The treatment for the illness should be written here. The treatment for the illness should be written here. The treatment for the illness should be written here. The treatment for the illness should be written here.",
  // },
  // {
  //   id: 2,
  //   date: "9 July, 2021",
  //   time: "5:30 PM",
  //   illness: "Toothache",
  //   severity: "Severe",
  //   photo: displayPhoto,
  //   caregiver: "John Doe",
  //   treatment:
  //     "The treatment for the illness should be written here. The treatment for the illness should be written here. The treatment for the illness should be written here. The treatment for the illness should be written here. The treatment for the illness should be written here. The treatment for the illness should be written here. The treatment for the illness should be written here. The treatment for the illness should be written here.",
  // },
];

const HcpCaseNotes = (props) => {
  const {
    selectedMenu,
    selectedSubMenu,
    setSelectedMenu,
    selectedHcpMenu,
    selectedScopedMenu,
    setSelectedSubMenu,
    setSelectedHcpMenu,
    setSelectedScopedMenu,
  } = props;
  const classes = useStyles();
  const theme = useTheme();

  const { hcpId, rowId } = useParams();

  console.log(rowId);
  const [consult, setConsult] = useState([]);
  useEffect(() => {
    setSelectedMenu(2);
    setSelectedSubMenu(3);
    setSelectedHcpMenu(6);
    setSelectedScopedMenu(2);
    // eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu, selectedHcpMenu, selectedScopedMenu]);

  const consultations = useQuery(getConsultation, {
    variables: {
      id: rowId,
    },
  });
  useEffect(() => {
    if (consultations.data) {
      setConsult(consultations.data.getConsultation);
    }
  }, [consultations.data, rowId]);
  if (consult && consult.treatment) {
    return (
      <Grid container direction="column" style={{ paddingBottom: "5rem" }}>
        <Grid item style={{ marginBottom: "3rem" }}>
          <PreviousButton
            path={`/hcps/${hcpId}/consultations`}
            onClick={() => setSelectedHcpMenu(6)}
          />
        </Grid>
        <Grid item style={{ marginBottom: "3rem" }}>
          <Typography variant="h2">Case Note</Typography>
        </Grid>
        {caseNotes.map((casenote) => (
          <Grid
            item
            container
            direction="column"
            key={casenote.id}
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
                      <Typography variant="body1">{dateMoment(consult.date)}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container alignItems="center">
                    <Grid item style={{ marginRight: "1.5rem" }}>
                      <TimerIcon fill={theme.palette.common.red} />
                    </Grid>
                    <Grid item>
                      <Typography variant="body1">{consult.time}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Divider color={theme.palette.common.lighterGrey} />
            <Grid item style={{ padding: "4rem 5rem" }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Grid container>
                    <Grid item>
                      <Typography variant="body1" className={classes.title}>
                        Name of illness:{" "}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body1" color={theme.palette.common.red}>
                        {consult.ailment}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container alignItems="center">
                    <Grid item>
                      <Typography variant="body1" className={classes.title}>
                        Severity:{" "}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Chip
                        variant="contained"
                        label={consult.severity}
                        className={classes.infoBadge}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container alignItems="center">
                    <Grid item>
                      <Typography variant="body1" className={classes.title}>
                        Patient:{" "}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Avatar
                        alt="Display Photo of Caregiver"
                        src={casenote.photo}
                        sx={{ width: 30, height: 30, marginRight: "1rem" }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant="body1">
                        {consult.caregiver ? consult.caregiver : "No Caregiver"}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Divider color={theme.palette.common.lighterGrey} />
            <Grid item style={{ padding: "4rem 5rem" }}>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="body1">Treatment</Typography>
                </Grid>
                <Grid item container gap={3}>
                  <Grid item>
                    {Object.keys(consult.treatment).map((i) => (
                      <Typography variant="body2" key={i}>
                        {i}
                      </Typography>
                    ))}
                  </Grid>
                  <Grid item>
                    {Object.values(consult.treatment).map((i) => (
                      <Typography variant="body2" key={i}>
                        {i}
                      </Typography>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    );
  } else {
    return null;
  }
};

HcpCaseNotes.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  selectedHcpMenu: PropTypes.number.isRequired,
  selectedScopedMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
  setSelectedHcpMenu: PropTypes.func.isRequired,
  setSelectedScopedMenu: PropTypes.func.isRequired,
};

export default HcpCaseNotes;
