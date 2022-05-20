import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import PropTypes from "prop-types";

const Backdrops = ({ open, handleClose }) => {
  return (
    <div>
      <Backdrop
        open={open}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        close={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Backdrops;
Backdrops.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};
