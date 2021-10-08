import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import CustomButton from "components/Utilities/CustomButton";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PaymentsIcon from "@mui/icons-material/Payments";
import Card from "components/Utilities/Card";
import { makeStyles } from "@mui/styles";
import displayPhoto from "assets/images/avatar.png";
import { ReactComponent as ConsultationIcon } from "assets/images/consultation.svg";
import { ReactComponent as UserIcon } from "assets/images/user.svg";
import { ReactComponent as CalendarIcon } from "assets/images/calendar.svg";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";

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
    "&.MuiSvgIcon-root": {
      fontSize: "4rem",
    },
  },
}));
const SingleHCP = (props) => {
  const {
    selectedMenu,
    setSelectedMenu,
    selectedSubMenu,
    setSelectedSubMenu,
    selectedHcpMenu,
    setSelectedHcpMenu,
  } = props;
  const classes = useStyles();
  const theme = useTheme();

  const { hcpId } = useParams();

  const cards1 = [
    {
      id: 1,
      title: "HCP Profile",
      background: theme.palette.common.lightRed,
      path: "profile",
      icon: UserIcon,
      fill: theme.palette.common.red,
    },
    {
      id: 2,
      title: "Appointments",
      background: theme.palette.common.lightGreen,
      path: "appointments",
      icon: CalendarIcon,
      fill: theme.palette.common.green,
    },
    {
      id: 3,
      title: "Availability",
      background: theme.palette.common.lightRed,
      path: "availability",
      icon: ConsultationIcon,
      fill: theme.palette.common.red,
    },
  ];

  const cards2 = [
    {
      id: 4,
      title: "Earnings",
      background: theme.palette.common.lightGreen,
      path: "earnings",
      icon: PaymentsIcon,
      fill: theme.palette.common.green,
    },
    {
      id: 5,
      title: "Patients",
      background: theme.palette.common.lightRed,
      path: "patients",
      icon: UserIcon,
      fill: theme.palette.common.red,
    },
  ];

  const trasparentButton = {
    background: "transparent",
    hover: "#fafafa",
    active: "#f4f4f4",
  };

  useEffect(() => {
    setSelectedMenu(2);
    setSelectedSubMenu(3);
    setSelectedHcpMenu(0);

    // eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu, selectedHcpMenu]);

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
            <Grid item>
              <CustomButton
                endIcon={<PersonRemoveIcon />}
                title="Disable HCP"
                type={trasparentButton}
                textColor={theme.palette.common.red}
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
            component={Link}
            to={`/hcps/${hcpId}/${card.path}`}
            onClick={() => setSelectedHcpMenu(card.id)}
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
            to={`/hcps/${hcpId}/${card.path}`}
            onClick={() => setSelectedHcpMenu(card.id)}
          >
            <Card title={card.title} background={card.background} header="h4">
              {React.createElement(card.icon, {
                fill: card.fill,
                color: card.id === 4 ? "success" : undefined,
                style: { fontSize: "4rem" },
              })}
            </Card>
          </Grid>
        ))}
        {/* This grid is used as a placeholder to aid the uniformity of the alignment with the grid above */}
        <Grid item className={classes.parentGrid} style={{ visibility: "hidden" }}></Grid>
      </Grid>
    </Grid>
  );
};

SingleHCP.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  selectedHcpMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
  setSelectedHcpMenu: PropTypes.func.isRequired,
};

export default SingleHCP;
