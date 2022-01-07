import React from "react";
import { Grid, CircularProgress } from "@mui/material";
import PropTypes from "prop-types";
const Loader = ({ color, size }) => {
  return (
    <Grid container justifyContent="center" marginTop={3}>
      <CircularProgress size={size} color={color ? color : "secondary"} />;
    </Grid>
  );
};
Loader.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
};
export default Loader;
