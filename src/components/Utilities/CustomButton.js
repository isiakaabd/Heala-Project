import React from "react";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";

const CustomButton = ({
  title,
  endIcon,
  textColor = "#fff",
  type: { background, hover, active },
}) => {
  const useStyles = makeStyles((theme) => ({
    button: {
      "&.css-1zf5oc-MuiButtonBase-root-MuiButton-root": {
        ...theme.typography.btn,
        backgroundColor: background,
        color: textColor,

        "&:hover": {
          backgroundColor: hover,
        },

        "&:active": {
          backgroundColor: active,
          boxShadow: "none",
        },

        "& .css-9tj150-MuiButton-endIcon>*:nth-of-type(1)": {
          fontSize: "2rem",
        },

        "& .css-9tj150-MuiButton-endIcon": {
          marginLeft: ".5rem",
          marginTop: "-.2rem",
        },
      },
    },
  }));

  const classes = useStyles();

  return (
    <Button variant="contained" endIcon={endIcon} className={classes.button}>
      {title}
    </Button>
  );
};

CustomButton.propTypes = {
  endIcon: PropTypes.node,
  title: PropTypes.string.isRequired,
  type: PropTypes.string,
  textColor: PropTypes.string,
};

export default CustomButton;
