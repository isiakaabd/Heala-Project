import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  gridWrapper: {
    ...theme.typography.cardGridWrapper,
    width: "100%",
  },

  iconWrapper: {
    ...theme.typography.cardIconWrapper,
  },
}));

const Card = ({ title, background, children, header = "h2", padding }) => {
  const classes = useStyles();
  return (
    <Grid
      item
      container
      direction="column"
      alignItems="center"
      justifyContent="space-between"
      className={classes.gridWrapper}
      rowGap={3}
    >
      <Grid item className={classes.iconWrapper} style={{ background }}>
        {children}
      </Grid>
      <Grid item>
        <Typography variant={header}>{title}</Typography>
      </Grid>
    </Grid>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  background: PropTypes.string,
  header: PropTypes.string,
  children: PropTypes.node,
  padding: PropTypes.string,
};

export default Card;
