import * as React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { ReactComponent as Circular } from "assets/images/circular.svg";

export const CircularProgressBar = ({ value, color }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress size="14rem" variant="determinate" value={value} color={color} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Circular />
      </Box>
    </Box>
  );
};

CircularProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};
