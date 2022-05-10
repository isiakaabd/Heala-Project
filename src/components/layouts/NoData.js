import React from "react";
import { Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
const NoData = ({ error }) => {
  return (
    <Grid
      container
      alignItems="center"
      direction="column"
      height="100%"
      width="100%"
      justifyContent="center"
    >
      <Grid item>
        {error ? <Typography variant="h1">Something went Wrong...</Typography> : null}
      </Grid>
      <Grid item>
        <Typography variant="h1">No Data Yet</Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2">
          {!error ? "we have not computed data for this table yet" : "pls refresh page"}
        </Typography>
      </Grid>
    </Grid>
  );
};
NoData.propTypes = {
  error: PropTypes.string,
};
export default NoData;
