import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Grid, Typography, Divider, Chip, Avatar } from "@mui/material";
import displayPhoto from "assets/images/avatar.png";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { ReactComponent as CalendarIcon } from "assets/images/calendar.svg";
import { ReactComponent as TimerIcon } from "assets/images/timer.svg";
import PreviousButton from "components/Utilities/PreviousButton";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { findProfile, getConsultation } from "components/graphQL/useQuery";
import { dateMoment, timeMoment } from "components/Utilities/Time";
import Loader from "components/Utilities/Loader";

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
    photo: displayPhoto,
    caregiver: "Raphael Igbenedion",
  },
];

const CaseNotes = (props) => {
  const {
    selectedMenu,
    selectedSubMenu,
    setSelectedMenu,
    selectedScopedMenu,
    setSelectedSubMenu,
    selectedPatientMenu,
    setSelectedPatientMenu,
    setSelectedScopedMenu,
  } = props;
  const classes = useStyles();
  const theme = useTheme();

  const { patientId } = useParams();

  useEffect(() => {
    setSelectedMenu(1);
    setSelectedSubMenu(2);
    setSelectedPatientMenu(5);
    setSelectedScopedMenu(1);
    // eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu, selectedPatientMenu, selectedScopedMenu]);
  const [caseNoteState, setCaseNoteState] = useState([]);
  const { consultation } = useSelector((state) => state.patient);
  const [doctor, setDoctor] = useState("");
  const consultations = useQuery(getConsultation, {
    variables: {
      id: patientId,
    },
  });
  useEffect(() => {
    const x = consultation.getConsultations.data.filter((i) => i._id === patientId);
    setDoctor(x[0].doctor);
  }, [consultation.getConsultations.data, patientId]);

  const doctorProfile = useQuery(findProfile, {
    variables: {
      id: doctor,
    },
  });

  //

  useEffect(() => {
    if (consultations.data && consultations.data.getConsultation) {
      setCaseNoteState(consultations.data.getConsultation);
    }
  }, [consultations, caseNoteState.data]);

  if (consultations.loading) return <Loader />;

  if (caseNoteState && caseNoteState.treatment) {
    return (
      <Grid container direction="column" style={{ paddingBottom: "5rem" }}>
        <Grid item style={{ marginBottom: "3rem" }}>
          <PreviousButton
            path={`/patients/${patientId}/consultations`}
            onClick={() => setSelectedPatientMenu(0)}
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
                      <Typography variant="body1">{dateMoment(caseNoteState.createdAt)}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container alignItems="center">
                    <Grid item style={{ marginRight: "1.5rem" }}>
                      <TimerIcon fill={theme.palette.common.red} />
                    </Grid>
                    <Grid item>
                      <Typography variant="body1">{timeMoment(caseNoteState.createdAt)}</Typography>
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
                        Name of illness:
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body1" color={theme.palette.common.red}>
                        {caseNoteState.ailment}
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
                        label={caseNoteState.severity}
                        className={classes.infoBadge}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container alignItems="center">
                    <Grid item>
                      <Typography variant="body1" className={classes.title}>
                        Caregiver:{" "}
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
                        {doctorProfile.data
                          ? doctorProfile.data.firstName
                          : "No Care Giver assigned"}
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
                    {Object.keys(caseNoteState.treatment).map((i) => (
                      <Typography variant="body2" key={i}>
                        {i}
                      </Typography>
                    ))}
                  </Grid>
                  <Grid item>
                    {Object.values(caseNoteState.treatment).map((i) => (
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

CaseNotes.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  selectedPatientMenu: PropTypes.number.isRequired,
  selectedScopedMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
  setSelectedPatientMenu: PropTypes.func.isRequired,
  setSelectedScopedMenu: PropTypes.func.isRequired,
};

export default CaseNotes;
