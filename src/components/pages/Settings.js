import React from "react";
import { Grid } from "@mui/material";
import { ReactComponent as Administrator } from "assets/images/administrator.svg";
import { ReactComponent as ConsulationIcon } from "assets/images/consultation.svg";
import { Card } from "components/Utilities";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  parentGrid: {
    textDecoration: "none",
    color: theme.palette.primary.main,

    "& > .MuiGrid-root.MuiGrid-container": {
      backgroundColor: "#ffffff",
    },
  },
}));

const Settings = () => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <Grid
      container
      alignItems="space-between"
      gap="5rem"
      paddingY="2rem"
      justifyContent={{ sm: "center", md: "center" }}
    >
      {/* 1 */}
      <Grid item container md={5} sm={5} xs={12}>
        <Grid
          item
          container
          flexDirection="column"
          to="/settings/administrator"
          component={Link}
          className={classes.parentGrid}
        >
          <Card
            alt="A administrator icon used as a representation for the administrator "
            title="Administrator"
            background={theme.palette.common.lightGreen}
          >
            <Administrator fill={theme.palette.common.green} />
          </Card>
        </Grid>
      </Grid>
      {/* 2 */}
      <Grid item container md={5} sm={5} xs={12}>
        <Grid
          item
          container
          flexDirection="column"
          component={Link}
          to="/settings/management"
          className={classes.parentGrid}
        >
          <Card
            alt="An icon used as a representation for making consultation with the doctor"
            title="Role Management"
            background={theme.palette.common.lightRed}
          >
            <ConsulationIcon fill={theme.palette.common.red} />
          </Card>
        </Grid>
      </Grid>
      {/* 3 */}
      <Grid item container md={5} sm={5} xs={12}>
        <Grid
          item
          container
          flexDirection="column"
          component={Link}
          to="/settings/permissions"
          className={classes.parentGrid}
        >
          <Card
            alt="An icon used as a permission for making consultation with the doctor"
            title="Permissions"
            background={theme.palette.common.lightRed}
          >
            <ConsulationIcon fill={theme.palette.common.red} />
          </Card>
        </Grid>
      </Grid>
      {/* 4 */}
      <Grid item container md={5} sm={5} xs={12}>
        <Grid
          item
          container
          flexDirection="column"
          component={Link}
          to="/settings/list-management"
          className={classes.parentGrid}
        >
          <Card
            alt="list management Icon"
            title="List management"
            background={theme.palette.common.lightRed}
          >
            <ConsulationIcon fill={theme.palette.common.red} />
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Settings;
