import React from "react";
import { Grid, Typography } from "@mui/material";
const NoData = () => {
  return (
    <Grid container alignItems="center" direction="column" height="100%" justifyContent="center">
      <Grid item>
        <Typography variant="h1">No Data yet</Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2">we have not computed data for this table yet</Typography>
      </Grid>
    </Grid>
  );
};
export default NoData;
