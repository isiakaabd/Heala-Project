import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import CustomButton from "components/Utilities/CustomButton";
import PreviousButton from "components/Utilities/PreviousButton";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Card from "components/Utilities/Card";
import DisablePatient from "components/modals/DeleteOrDisable";
import { makeStyles } from "@mui/styles";
import displayPhoto from "assets/images/avatar.png";
import { ReactComponent as ConsultationIcon } from "assets/images/consultation.svg";
import { ReactComponent as UserIcon } from "assets/images/user.svg";
import { ReactComponent as PrescriptionIcon } from "assets/images/prescription.svg";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import ReferPatient from "components/modals/ReferPatient";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    paddingBottom: "20rem",
  },

  gridsWrapper: {
    background: "#fff",
    borderRadius: "2rem",
    padding: "4rem",
  },

  parentGrid: {
    textDecoration: "none",
    width: "24.7rem",
    color: theme.palette.primary.main,
    "&.MuiGrid-item": {
      ...theme.typography.cardParentGrid,
      minWidth: "20rem",

      "&:hover": {
        background: "#fcfcfc",
      },

      "&:active": {
        background: "#fafafa",
      },
    },
  },

  icon: {
    "&.css-1o5jd4y-MuiSvgIcon-root": {
      fontSize: "4rem",
    },
  },
}));
const SinglePatient = (props) => {
  const {
    selectedMenu,
    selectedSubMenu,
    selectedPatientMenu,
    setSelectedMenu,
    setSelectedSubMenu,
    setSelectedPatientMenu,
  } = props;
  const classes = useStyles();
  const theme = useTheme();

  const { patientId } = useParams();

  const cards1 = [
    {
      id: 1,
      title: "Patient Profile",
      background: theme.palette.common.lightRed,
      path: "profile",
      icon: UserIcon,
      fill: theme.palette.common.red,
    },
    {
      id: 2,
      title: "Consultations",
      background: theme.palette.common.lightGreen,
      path: "consultations",
      icon: ConsultationIcon,
      fill: theme.palette.common.green,
    },
    {
      id: 3,
      title: "Prescriptions",
      background: theme.palette.common.lightRed,
      path: "prescriptions",
      icon: PrescriptionIcon,
      fill: theme.palette.common.red,
    },
  ];

  const cards2 = [
    {
      id: 4,
      title: "Medical Records",
      background: theme.palette.common.lightGreen,
      path: "records",
      icon: AssignmentIcon,
      fill: theme.palette.common.green,
    },
    {
      id: 5,
      title: "Case notes",
      background: theme.palette.common.lightRed,
      path: "case-notes",
      icon: UserIcon,
      fill: theme.palette.common.red,
    },
    {
      id: 6,
      title: "Medications",
      background: theme.palette.common.lightGreen,
      path: "medications",
      icon: UserIcon,
      fill: theme.palette.common.green,
    },
  ];

  const trasparentButton = {
    background: "transparent",
    hover: "#fafafa",
    active: "#f4f4f4",
  };

  const greenButton = {
    background: theme.palette.success.main,
    hover: theme.palette.success.light,
    active: theme.palette.success.dark,
  };

  const [openDisablePatient, setOpenDisablePatient] = useState(false);
  const [openReferPatient, setOpenReferPatient] = useState(false);

  useEffect(() => {
    setSelectedMenu(1);
    setSelectedSubMenu(2);
    setSelectedPatientMenu(0);

    // eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu, selectedPatientMenu]);

  return (
    <Grid container direction="column" className={classes.gridContainer}>
      <Grid item style={{ marginBottom: "3rem" }}>
        <PreviousButton path={`/patients`} onClick={() => setSelectedSubMenu(0)} />
      </Grid>
      <Grid item container justifyContent="space-between" className={classes.gridsWrapper}>
        {/* Display photo and profile name grid */}
        <Grid item>
          <Grid container alignItems="center">
            <Grid item style={{ marginRight: "2rem" }}>
              <Avatar alt={`Display Photo`} src={displayPhoto} sx={{ width: 50, height: 50 }} />
            </Grid>
            <Grid item>
              <Typography variant="h2">Raphael Igbenedion</Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* Action Buttons grid */}
        <Grid item>
          <Grid container alignItems="center">
            <Grid item style={{ marginRight: "2rem" }}>
              <CustomButton
                endIcon={<PersonRemoveIcon />}
                title="Disable Patient"
                type={trasparentButton}
                textColor={theme.palette.common.red}
                onClick={() => setOpenDisablePatient(true)}
              />
            </Grid>
            <Grid item>
              <CustomButton
                endIcon={<TrendingUpIcon />}
                title="Refer Patient"
                type={greenButton}
                onClick={() => setOpenReferPatient(true)}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* TOP CARDS SECTION */}
      <Grid item container style={{ paddingTop: "5rem" }} justifyContent="space-evenly">
        {cards1.map((card) => (
          <Grid
            key={card.id}
            item
            className={classes.parentGrid}
            // style={{ margin: card.id === 1 ? "0 2rem" : undefined }}
            component={Link}
            to={`/patients/${patientId}/${card.path}`}
            onClick={() => setSelectedPatientMenu(card.id)}
          >
            <Card title={card.title} background={card.background} header="h4">
              {React.createElement(card.icon, { fill: card.fill })}
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* BOTTOM CARDS SECTION */}
      <Grid item container justifyContent="space-evenly" style={{ paddingTop: "5rem" }}>
        {cards2.map((card) => (
          <Grid
            key={card.id}
            item
            className={classes.parentGrid}
            component={Link}
            to={`/patients/${patientId}/${card.path}`}
            onClick={() => setSelectedPatientMenu(card.id)}
          >
            <Card title={card.title} background={card.background} header="h4">
              {React.createElement(card.icon, {
                fill: card.fill,
                color: "success",
                style: { fontSize: "4rem" },
              })}
            </Card>
          </Grid>
        ))}
      </Grid>
      <DisablePatient
        open={openDisablePatient}
        setOpen={setOpenDisablePatient}
        title="Delete Partner"
        btnValue="disable"
        confirmationMsg="disable Patient"
      />
      <ReferPatient open={openReferPatient} setOpen={setOpenReferPatient} />
    </Grid>
  );
};

SinglePatient.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  selectedPatientMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
  setSelectedPatientMenu: PropTypes.func.isRequired,
};

export default SinglePatient;
