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
        {error ? (
          <Typography variant="h1" sx={{ fontWeight: "500" }}>
            Something went wrong...
          </Typography>
        ) : null}
      </Grid>
      <Grid item>
        <Typography variant="h1" sx={{ fontWeight: "500" }}>
          No results found
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2" sx={{ fontWeight: "400" }}>
          {!error
            ? "There are no records to display for this table"
            : "pls refresh page"}
        </Typography>
      </Grid>
    </Grid>
  );
};
NoData.propTypes = {
  error: PropTypes.string,
};
export default NoData;
