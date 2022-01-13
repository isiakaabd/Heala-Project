import React from "react";
import { Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
const NoData = ({ error }) => {
  console.log(error);

  return (
    <Grid container alignItems="center" direction="column" height="100%" justifyContent="center">
      <Grid item>
        <Typography variant="h1">{error ? error : "No Data yet"}</Typography>
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
  setSelectedHcpMenu: PropTypes.func.isRequired,
};
export default NoData;
