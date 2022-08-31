import React from "react";
import t from "prop-types";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Card } from "../Utilities";
import { useTheme } from "@mui/material/styles";

const useStyles = makeStyles((theme) => ({
  /* containerGrid: {
      paddingTop: "7em",
    }, */

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

  /*  gridWrapper: {
      ...theme.typography.cardGridWrapper,
    },
  
    iconWrapper: {
      ...theme.typography.cardIconWrapper,
    }, */
}));

export const SettingsCard = ({
  link,
  /* setSelectedSubMenu, */ title,
  icon,
}) => {
  const theme = useTheme();
  const classes = useStyles();
  return (
    <Grid
      item
      className={classes.parentGrid}
      container
      flexDirection="column"
      style={{ marginRight: "2em" }}
      lg
      md={4}
      sm={12}
    >
      <Link
        to={link} // "/settings/administrator"
        style={{ textDecoration: "none" }}
      >
        <Card
          alt="A administrator icon used as a representation for the administrator "
          title={title} // "Administrator"
          background={theme.palette.common.lightGreen}
        >
          {icon}
        </Card>
      </Link>
    </Grid>
  );
};

SettingsCard.propTypes = {
  icon: t.node,
  link: t.string,
  title: t.string,
  /* setSelectedSubMenu: t.func, */
};
