import React from "react";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";

const CustomButton = ({ title, endIcon, type: { main, light, dark } }) => {
  const useStyles = makeStyles((theme) => ({
    button: {
      "&.css-1zf5oc-MuiButtonBase-root-MuiButton-root": {
        ...theme.typography.btn,
        backgroundColor: main,
        color: "#fff",

        "&:hover": {
          backgroundColor: light,
        },

        "&:active": {
          backgroundColor: dark,
          boxShadow: "none",
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
};

export default CustomButton;
