import React from "react";
import PropTypes from "prop-types";
import { Grid, Box } from "@mui/material";
import { ReactComponent as Circular } from "assets/images/circular.svg";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CircularProgressBar = ({
  value,
  color,
  height,
  trailColor,
  width,
  strokeLinecap,
  strokeWidth,
}) => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
      }}
    >
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
export default CircularProgressBar;
CircularProgressBar.propTypes = {
  value: PropTypes.number,
  color: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  trailColor: PropTypes.string,
  strokeLinecap: PropTypes.string,
  strokeWidth: PropTypes.number,
};
