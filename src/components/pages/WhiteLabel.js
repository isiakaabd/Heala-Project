import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import { ReactComponent as Administrator } from "assets/images/administrator.svg";
import { ReactComponent as ConsulationIcon } from "assets/images/consultation.svg";
import { Card } from "components/Utilities";
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

const WhiteLabel = () => {
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
            to="/label/provider"
            style={{ textDecoration: "none" }}
            /* onClick={() => setSelectedSubMenu(13)} */
          >
            <Card alt="providers " title="Providers" background={theme.palette.common.lightGreen}>
              <Administrator fill={theme.palette.common.green} />
            </Card>
          </Link>
        </Grid>

        {/* 2 */}

        <Grid item className={classes.parentGrid} style={{ marginLeft: "2em" }} lg md={12} sm={12}>
          <Link
            to="/label/types"
            style={{ textDecoration: "none" }}
            /* onClick={() => setSelectedSubMenu(13)} */
          >
            <Card alt="User Types" title="User Types" background={theme.palette.common.lightRed}>
              <ConsulationIcon fill={theme.palette.common.red} />
            </Card>
          </Link>
        </Grid>
      </Grid>
    </>
  );
};

WhiteLabel.propTypes = {
  selectedMenu: PropTypes.number,
  setSelectedMenu: PropTypes.func,
  /* selectedSubMenu: PropTypes.number,
  setSelectedSubMenu: PropTypes.func, */
};
export default WhiteLabel;
