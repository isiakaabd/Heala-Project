import React from "react";
import Grid from "@mui/material/Grid";
import { ReactComponent as Administrator } from "assets/images/administrator.svg";
import { ReactComponent as CalendarIcon } from "assets/images/calendar.svg";
import Card from "components/Utilities/Card";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

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

const Settings = () => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Grid container justifyContent="space-between" className={classes.containerGrid}>
      <Grid item className={classes.parentGrid} style={{ marginRight: "2em" }} lg md={6} sm={12}>
        <Link to="/settings/administrator" style={{ textDecoration: "none" }}>
          <Card
            alt="A administrator icon used as a representation for the administrator "
            title="Administrator"
            background={theme.palette.common.lightGreen}
          >
            <Administrator fill={theme.palette.common.green} />
          </Card>
        </Link>
      </Grid>
      <Grid item className={classes.parentGrid} style={{ marginLeft: "2em" }} lg md={6} sm={12}>
        <Link to="/settings/management" style={{ textDecoration: "none" }}>
          <Card
            alt="An icon used as a representation for making consultation with the doctor"
            title="Role Management"
            background={theme.palette.common.lightRed}
          >
            <CalendarIcon fill={theme.palette.common.red} />
          </Card>
        </Link>
      </Grid>
    </Grid>
  );
};

export default Settings;
