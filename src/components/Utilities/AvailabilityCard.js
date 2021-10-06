import React from "react";
import { PropTypes } from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    background: "#fff",
    borderRadius: "2rem",
    boxShadow: "0px 0px 5px -1px rgba(0,0,0,0.1)",
  },
}));

const AvailabilityCard = ({ day, time }) => {
  const classes = useStyles();
  return (
    <Grid container direction="column" className={classes.cardGrid}>
      <Grid item style={{ padding: "3rem 10rem" }}>
        <Grid container>
          <Grid item style={{ marginRight: "4rem" }}>
            <Typography variant="body1">Day: </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">{day}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Divider />
      <Grid item style={{ padding: "3rem 10rem" }}>
        <Grid container>
          <Grid item style={{ marginRight: "4rem" }}>
            <Typography variant="body1">Time: </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">{time}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
AvailabilityCard.propTypes = {
  day: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export default AvailabilityCard;
