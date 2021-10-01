import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import CustomButton from "components/Utilities/CustomButton";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Card from "components/Utilities/Card";
import { makeStyles } from "@mui/styles";
import displayPhoto from "assets/images/avatar.png";
import { ReactComponent as ConsultationIcon } from "assets/images/consultation.svg";
import { ReactComponent as UserIcon } from "assets/images/user.svg";
import { ReactComponent as PrescriptionIcon } from "assets/images/prescription.svg";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Link } from "react-router-dom";
// import consultation from "assets/images/consultation.svg";

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
const SinglePatient = () => {
  const classes = useStyles();
  const theme = useTheme();

  const cards1 = [
    {
      id: 0,
      title: "Patient Profile",
      background: theme.palette.common.lightRed,
      path: "/patients/patientId/profile",
      icon: UserIcon,
      fill: theme.palette.common.red,
    },
    {
      id: 1,
      title: "Consultations",
      background: theme.palette.common.lightGreen,
      path: "/patients/patientId/consultations",
      icon: ConsultationIcon,
      fill: theme.palette.common.green,
    },
    {
      id: 2,
      title: "Prescriptions",
      background: theme.palette.common.lightRed,
      path: "/patients/patientId/prescriptions",
      icon: PrescriptionIcon,
      fill: theme.palette.common.red,
    },
  ];

  const cards2 = [
    {
      id: 3,
      title: "Medical Records",
      background: theme.palette.common.lightGreen,
      path: "/patients/patientId/records",
      icon: AssignmentIcon,
      fill: theme.palette.common.green,
    },
    {
      id: 4,
      title: "Case notes",
      background: theme.palette.common.lightRed,
      path: "/patients/patientId/case-notes",
      icon: UserIcon,
      fill: theme.palette.common.red,
    },
    {
      id: 5,
      title: "Medications",
      background: theme.palette.common.lightGreen,
      path: "/patients/patientId/medications",
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

  return (
    <Grid container direction="column" className={classes.gridContainer}>
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
              />
            </Grid>
            <Grid item>
              <CustomButton endIcon={<TrendingUpIcon />} title="Refer Patient" type={greenButton} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* TOP CARDS SECTION */}
      <Grid item container justifyContent="space-between" style={{ paddingTop: "5rem" }}>
        {cards1.map((card) => (
          <Grid key={card.id} item className={classes.parentGrid} component={Link} to={card.path}>
            <Card title={card.title} background={card.background} header="h4">
              {React.createElement(card.icon, { fill: card.fill })}
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* BOTTOM CARDS SECTION */}
      <Grid item container justifyContent="space-between" style={{ paddingTop: "5rem" }}>
        {cards2.map((card) => (
          <Grid key={card.id} item className={classes.parentGrid} component={Link} to={card.path}>
            <Card title={card.title} background={card.background} header="h4">
              {React.createElement(card.icon, {
                fill: card.fill,
                color: card.id === 3 ? "success" : undefined,
                style: { fontSize: "4rem" },
              })}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default SinglePatient;
