import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";

import { PreviousButton } from "components/Utilities";
import { SettingsCard } from "components/cards/SettingsCard";
import { ReactComponent as ConsulationIcon } from "assets/images/consultation.svg";

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

const ListManagment = ({
  selectedMenu,
  setSelectedMenu,
  /* selectedSubMenu,
  setSelectedSubMenu, */
}) => {
  const theme = useTheme();
  const classes = useStyles();
  return (
    <>
      <Grid item>
        <PreviousButton path="/settings" />
      </Grid>
      <Grid
        container
        justifyContent="space-between"
        className={classes.containerGrid}
        columnGap={4}
        rowSpacing={4}
      >
        <SettingsCard
          link="/settings/list-management/tests"
          /* setSelectedSubMenu={setSelectedSubMenu} */
          title="Tests"
          icon={<ConsulationIcon fill={theme.palette.common.red} />}
        />
      </Grid>
    </>
  );
};

ListManagment.propTypes = {
  selectedMenu: PropTypes.number,
  setSelectedMenu: PropTypes.func,
  /* selectedSubMenu: PropTypes.number,
  setSelectedSubMenu: PropTypes.func, */
};

export default ListManagment;
