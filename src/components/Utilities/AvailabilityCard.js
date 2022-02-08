import React from "react";
import { PropTypes } from "prop-types";
import { Grid, Typography, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { hours } from "components/Utilities/Time";
const useStyles = makeStyles((theme) => ({
  cardGrid: {
    background: "#fff",
    borderRadius: "2rem",
    boxShadow: "0px 0px 5px -1px rgba(0,0,0,0.1)",
  },
}));

const AvailabilityCard = ({ availability }) => {
  const classes = useStyles();

  return (
    <Grid container direction="column" className={classes.cardGrid}>
      <Grid item style={{ padding: "2rem" }}>
        <Grid container justifyContent="center" gap={2}>
          <Grid item>
            <Typography variant="body1">Day:</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">{availability.dates[0].day} </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Divider />
      <Grid item style={{ padding: "2rem" }}>
        <Grid item container justifyContent="center">
          <Grid item>
            <Typography variant="body1">Time: </Typography>
          </Grid>
          <Grid container>
            {availability.dates[0].times.map((time, index) => {
              return (
                <>
                  <Grid
                    container
                    diection="column"
                    gap={2}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Grid item>
                      <Grid item container gap={2}>
                        <Grid item>
                          <Typography variant="body1">{`${hours(time.start)}`}</Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="body1">-</Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="body1">{`${hours(time.start)}`} </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Divider />
                  </Grid>
                </>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
AvailabilityCard.propTypes = {
  day: PropTypes.string,
  time: PropTypes.string,
  availability: PropTypes.string,
};

export default AvailabilityCard;
