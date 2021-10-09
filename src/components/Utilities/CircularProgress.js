import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import { ReactComponent as Circular } from "assets/images/circular.svg";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const CircularProgressBar = ({
  value,
  color,
  height,
  trailColor,
  width,
  strokeLinecap,
  strokeWidth,
}) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
      <Grid sx={{ height, width }}>
        <CircularProgressbarWithChildren
          value={value}
          strokeWidth={strokeWidth ? strokeWidth : 4}
          styles={buildStyles({
            pathColor: color,
            trailColor: trailColor,
            strokeLinecap: strokeLinecap ? strokeLinecap : "butt",
          })}
        />
      </Grid>
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
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  trailColor: PropTypes.string.isRequired,
  strokeLinecap: PropTypes.string,
  strokeWidth: PropTypes.number,
};
