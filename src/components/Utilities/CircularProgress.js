import * as React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import circular from "assets/images/circular.svg";
import { Avatar } from "@mui/material";

export const CircularProgressBar = (props) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress size="14rem" variant="determinate" value="80" {...props} />
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
        <Avatar src={circular} alt="progress divider" sx={{ width: "1.4rem", height: "1.1rem" }} />
      </Box>
    </Box>
  );
};

CircularProgressBar.propTypes = {
  props: PropTypes.string.isRequired,
};
