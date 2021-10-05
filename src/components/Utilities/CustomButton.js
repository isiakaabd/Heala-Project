import React from "react";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";

const CustomButton = ({
  title,
  endIcon,
  onClick,
  width = "auto",
  textColor = "#fff",
  type: { background, hover, active },
  onClick,
}) => {
  const useStyles = makeStyles((theme) => ({
    button: {
      "&.MuiButton-root": {
        ...theme.typography.btn,
        backgroundColor: background,
        color: textColor,
        width: width,

        "&:hover": {
          backgroundColor: hover,
        },

        "&:active": {
          backgroundColor: active,
          boxShadow: "none",
        },

        "& .MuiButton-endIcon>*:nth-of-type(1)": {
          fontSize: "2rem",
        },

        "& .MuiButton-endIcon": {
          marginLeft: ".5rem",
          marginTop: "-.2rem",
        },
      },
    },
  }));

  const classes = useStyles();

  return (
    <Button variant="contained" endIcon={endIcon} className={classes.button} onClick={onClick}>
      {title}
    </Button>
  );
};

CustomButton.propTypes = {
  endIcon: PropTypes.node,
  title: PropTypes.string.isRequired,
  type: PropTypes.string,
  textColor: PropTypes.string,
  onClick: PropTypes.func,
<<<<<<< HEAD
=======
  width: PropTypes.string,
>>>>>>> 20ad52ece060d92b0e8aa9a4cafe55f016accc0a
};

export default CustomButton;
