import React from "react";
import t from "prop-types";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";

const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: "capitalize",
    fontFamily: "Circular Std",
    fontSize: "1.6rem",
    fontStyle: "normal",
    fontWeight: 300,
    lineHeight: "2.4rem",
    letterSpacing: "0px",
    textAlign: "left",
    height: "100%",
  },

  closeBtn: {
    "&.button": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: theme.palette.common.black,
      stroke: theme.palette.common.black,
      background: "#f2f2f2",
      borderRadius: "100%",
      padding: "0.6rem 0.3rem",
      border: "none",
      cursor: "pointer",

      "&:hover": {
        color: "red",
        stroke: "red",
      },
    },
  },
}));

export const CloseBtn = ({ onHandleClick, ...props }) => {
  const classes = useStyles();
  return (
    <button
      {...props}
      onClick={() => onHandleClick()}
      className={`button ${classes.closeBtn}`}
    >
      <CloseIcon sx={{ height: "10px", weight: "10px !important" }} />
    </button>
  );
};

CloseBtn.propTypes = {
  onHandleClick: t.func,
};
