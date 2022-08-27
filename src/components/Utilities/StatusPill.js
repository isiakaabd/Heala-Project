import React from "react";
import PropTypes from "prop-types";
import { Chip } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  badge: {
    "&.MuiChip-root": {
      fontSize: "12px !important",
      height: "2.7rem",
      borderRadius: "1.3rem",
      fontWeight: 500,
    },
  },
}));

const StatusPill = ({ type, label }) => {
  const classes = useStyles();
  const bgColor =
    type === "success"
      ? "rgba(62, 165, 132, 0.1)"
      : type === "normal"
      ? "rgba(240, 240, 240, 1)"
      : type === "error"
      ? "rgba(242, 24, 24, 0.1)"
      : "";

  const textColor =
    type === "success"
      ? "#3EA584"
      : type === "normal"
      ? "#757886"
      : type === "error"
      ? "#f21818"
      : "";

  return (
    <Chip
      label={label}
      className={classes.badge}
      sx={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    />
  );
};

StatusPill.propTypes = {
  type: PropTypes.oneOf(["success", "normal", "error"]).isRequired,
  label: PropTypes.string.isRequired,
};

export default StatusPill;
