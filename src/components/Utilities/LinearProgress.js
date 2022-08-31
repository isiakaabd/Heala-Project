import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { LinearProgress, Typography, Box } from "@mui/material";

const LinearProgressWithLabel = (props) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
};
LinearProgressWithLabel.propTypes = {
  value: PropTypes.number,
};

const LinearWithValueLabel = ({ progres }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress((progres) => (progres >= 100 ? 0 : progres + 0));
  }, [progress]);

  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
};
export default LinearWithValueLabel;
LinearWithValueLabel.propTypes = {
  progres: PropTypes.number,
};
