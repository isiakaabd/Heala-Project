import React from "react";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import stat1 from "assets/images/dashboard-stat1.png";
import stat2 from "assets/images/dashboard-stat2.png";
import stat3 from "assets/images/dashboard-stat3.png";
import stat4 from "assets/images/dashboard-stat4.png";

const useStyles = makeStyles((theme) => ({
  chartGrid: {
    paddingBottom: "5rem",
  },
  image: {
    maxWidth: "40rem",
  },
}));
const DashboardCharts = () => {
  const classes = useStyles();

  return (
    <Grid container justifyContent="space-between" className={classes.chartGrid}>
      <Grid item lg>
        <Grid container direction="column">
          <Grid item>
            <img src={stat2} alt="Stat" className={classes.image} />
          </Grid>
          <Grid item>
            <img src={stat3} alt="Stat" className={classes.image} />
          </Grid>
          <Grid item>
            <img src={stat4} alt="Stat" className={classes.image} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg>
        <img src={stat1} alt="Stat" className={classes.image} />
      </Grid>
    </Grid>
  );
};

export default DashboardCharts;
