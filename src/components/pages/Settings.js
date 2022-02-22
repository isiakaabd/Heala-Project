import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import { ReactComponent as Administrator } from "assets/images/administrator.svg";
import { ReactComponent as ConsulationIcon } from "assets/images/consultation.svg";
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

const Settings = ({ setSelectedSubMenu }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        className={classes.containerGrid}
        columnGap={4}
        rowSpacing={4}
      >
        <Grid item className={classes.parentGrid} style={{ marginRight: "2em" }} lg md={12} sm={12}>
          <Link
            to="/settings/administrator"
            style={{ textDecoration: "none" }}
            onClick={() => setSelectedSubMenu(12)}
          >
            <Card
              alt="A administrator icon used as a representation for the administrator "
              title="Administrator"
              background={theme.palette.common.lightGreen}
            >
              <Administrator fill={theme.palette.common.green} />
            </Card>
          </Link>
        </Grid>

        {/* 2 */}

        <Grid item className={classes.parentGrid} style={{ marginLeft: "2em" }} lg md={12} sm={12}>
          <Link
            to="/settings/management"
            style={{ textDecoration: "none" }}
            onClick={() => setSelectedSubMenu(12)}
          >
            <Card
              alt="An icon used as a representation for making consultation with the doctor"
              title="Role Management"
              background={theme.palette.common.lightRed}
            >
              <ConsulationIcon fill={theme.palette.common.red} />
            </Card>
          </Link>
        </Grid>
      </Grid>
      {/* 3 */}
      <Grid
        container
        justifyContent="space-between"
        className={classes.containerGrid}
        rowSpacing={4}
        columnGap={4}
      >
        <Grid item className={classes.parentGrid} style={{ marginRight: "2em" }} lg md={12} sm={12}>
          <Link
            to="/settings/permissions"
            style={{ textDecoration: "none" }}
            onClick={() => setSelectedSubMenu(12)}
          >
            <Card
              alt="An icon used as a permission for making consultation with the doctor"
              title="Permissions"
              background={theme.palette.common.lightRed}
            >
              <ConsulationIcon fill={theme.palette.common.red} />
            </Card>
          </Link>
        </Grid>
        {/* 4 */}
        <Grid item className={classes.parentGrid} style={{ marginLeft: "2em" }} lg md={12} sm={12}>
          <Link
            to="/settings/list-management"
            style={{ textDecoration: "none" }}
            onClick={() => setSelectedSubMenu(12)}
          >
            <Card
              alt="list management Icon"
              title="List management"
              background={theme.palette.common.lightRed}
            >
              <ConsulationIcon fill={theme.palette.common.red} />
            </Card>
          </Link>
        </Grid>
      </Grid>
    </>
  );
};

Settings.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
};

export default Settings;
