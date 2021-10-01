import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  gridWrapper: {
    ...theme.typography.cardGridWrapper,
  },

  iconWrapper: {
    ...theme.typography.cardIconWrapper,
  },
}));

const Card = ({ img, alt, title, background, children, header = "h2" }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="space-between"
      className={classes.gridWrapper}
    >
      <Grid item className={`${classes.iconWrapper} ${classes.lightGreen}`} style={{ background }}>
        {/* <img src={img} alt={alt} /> */}
        {children}
      </Grid>
      <Grid item>
        <Typography variant={header}>{title}</Typography>
      </Grid>
    </Grid>
  );
};

Card.propTypes = {
  img: PropTypes.string,
  alt: PropTypes.string,
  title: PropTypes.string,
  background: PropTypes.string,
  header: PropTypes.string,
  children: PropTypes.node,
};

export default Card;
