import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Grid, Typography, Divider, Chip, Avatar } from "@mui/material";
import displayPhoto from "assets/images/avatar.svg";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import CustomButton from "components/Utilities/CustomButton";
import PreviousButton from "components/Utilities/PreviousButton";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { getConsult } from "components/graphQL/useQuery";
import { dateMoment } from "components/Utilities/Time";
import NoData from "components/layouts/NoData";
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
      // marginRight: "2rem",
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

const CaseNotes = ({
  selectedMenu,
  selectedSubMenu,
  setSelectedMenu,
  selectedScopedMenu,
  setSelectedSubMenu,
  selectedPatientMenu,
  setSelectedPatientMenu,
  setSelectedScopedMenu,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const { patientId, rowId } = useParams();
  useEffect(() => {
    setSelectedMenu(1);
    setSelectedSubMenu(2);
    setSelectedPatientMenu(5);
    setSelectedScopedMenu(1);
    // eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu, selectedPatientMenu, selectedScopedMenu]);
  const [caseNoteState, setCaseNoteState] = useState([]);

  const { loading, data, error } = useQuery(getConsult, {
    variables: {
      id: rowId,
    },
  });

  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
    disabled: theme.palette.common.black,
  };
  console.log(caseNoteState);

  useEffect(() => {
    if (data) {
      setCaseNoteState(data.getConsultation);
    }
  }, [data, rowId]);

  if (error) return <NoData error={error.message} />;

  if (loading) return <Loader />;

  const { diagnosis } = caseNoteState;
  return (
    <Grid container direction="column" gap={2}>
      <Grid item>
        <PreviousButton
          path={`/patients/${patientId}/consultations`}
          onClick={() => setSelectedPatientMenu(0)}
        />
      </Grid>
      <Grid item>
        <Typography variant="h2">Consultation Details</Typography>
      </Grid>
      {caseNotes.map((casenote) => (
        <Grid
          item
          container
          direction="column"
          key={casenote.id}
          className={classes.parentGridWrapper}
        >
          <Grid
            item
            container
            style={{ padding: "2rem 3rem" }}
            alignItems="center"
            justifyContent="space-between"
            sx={{ flexWrap: "nowrap" }}
          >
            <Grid item container gap={2}>
              <Grid item>
                <Typography variant="body1" className={classes.title}>
                  Consultation Date:
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">{dateMoment(caseNoteState.createdAt)}</Typography>
              </Grid>
            </Grid>
            <Grid item container gap={2}>
              <Grid item>
                <Typography variant="body1" className={classes.title}>
                  Referral ID:
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">31234</Typography>
              </Grid>
            </Grid>
            <Grid item container gap={2}>
              <Grid item>
                <Typography variant="body1" className={classes.title}>
                  Consultation ID:
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">31234</Typography>
              </Grid>
            </Grid>
            <Grid item container gap={2}>
              <Grid item>
                <Typography variant="body1" className={classes.title}>
                  Status:
                </Typography>
              </Grid>
              <Grid item>
                <Chip
                  variant="contained"
                  label={diagnosis ? diagnosis.severity : "Pending"}
                  className={classes.infoBadge}
                />
              </Grid>
            </Grid>
          </Grid>
          <Divider color={theme.palette.common.lighterGrey} />
          <Grid
            item
            container
            style={{ padding: "2rem 3rem" }}
            alignItems="center"
            justifyContent="space-between"
            sx={{ flexWrap: "nowrap" }}
          >
            <Grid item container gap={1}>
              <Grid item>
                <Typography variant="body1" className={classes.title}>
                  Doctor:
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
                <Typography variant="body1">Funsho Williams</Typography>
              </Grid>
            </Grid>
            <Grid item container gap={2}>
              <Grid item>
                <Typography variant="body1" className={classes.title}>
                  Contact:
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">Chat</Typography>
              </Grid>
            </Grid>
            <Grid item container gap={2}>
              <Grid item>
                <Typography variant="body1" className={classes.title}>
                  Type:
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">Instant</Typography>
              </Grid>
            </Grid>
            <Grid item container gap={2}>
              <Grid item>
                <Typography variant="body1" className={classes.title}>
                  Owner:
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">Dependant</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Divider color={theme.palette.common.lighterGrey} />

          <Grid
            item
            container
            style={{ padding: "2rem 3rem" }}
            alignItems="center"
            justifyContent="space-between"
            sx={{ flexWrap: "nowrap" }}
          >
            <Grid item container gap={2}>
              <Grid item>
                <Typography variant="body1" className={classes.title}>
                  Symptoms:
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">Cough</Typography>
              </Grid>
            </Grid>
            <Grid item container gap={2}>
              <Grid item>
                <Typography variant="body1" className={classes.title}>
                  Severity:
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">Mild</Typography>
              </Grid>
            </Grid>
            <Grid item container gap={2}>
              <Grid item>
                <Typography variant="body1" className={classes.title}>
                  First Notice:
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">Last Week</Typography>
              </Grid>
            </Grid>
            <Grid item container gap={2}>
              <Grid item>
                <Typography variant="body1" className={classes.title}>
                  Discomfort:
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">6/20</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Divider color={theme.palette.common.lighterGrey} />
          <Grid
            item
            container
            style={{ padding: "2rem 3rem" }}
            alignItems="center"
            justifyContent="space-between"
            sx={{ flexWrap: "nowrap" }}
          >
            <Grid item container direction="column" gap={3}>
              <Grid item>
                <Typography variant="body1" className={classes.title}>
                  Description:
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" style={{ lineHeight: 1.85 }}>
                  note
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Divider color={theme.palette.common.lighterGrey} />
          <Grid
            item
            container
            style={{ padding: "2rem 3rem" }}
            alignItems="center"
            justifyContent="space-between"
            sx={{ flexWrap: "nowrap" }}
          >
            <Grid item container direction="column" gap={2}>
              <Grid item>
                <Typography variant="body1" className={classes.title}>
                  Doctors Note:
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" style={{ lineHeight: 1.85 }}>
                  This is doctor note
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Divider color={theme.palette.common.lighterGrey} />
          <Grid
            item
            container
            style={{ padding: "4rem 3rem" }}
            alignItems="center"
            justifyContent="flex-end"
          >
            <Grid item container sx={{ width: "20%" }}>
              <CustomButton title="View Prescription" width="100%" type={buttonType} />
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
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
