import React from "react";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";

const CustomButton = ({
  title,
  endIcon,
  width = "auto",
  height,
  textColorOnHover,
  borderRadius,
  textColor = "#fff",
  type: { background, hover, active },
  ...rest
}) => {
  const useStyles = makeStyles((theme) => ({
    button: {
      "&.MuiButton-root": {
        ...theme.typography.btn,
        backgroundColor: background,
        color: textColor,
        width: width,
        borderRadius: borderRadius ? borderRadius : 10,
        height: height ? height : "5rem",

        "&:hover": {
          backgroundColor: hover,
          color: textColorOnHover,

          "& .MuiButton-endIcon>*:nth-of-type(1)": {
            color: textColorOnHover,
          },
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
    <Button variant="contained" endIcon={endIcon} className={classes.button} {...rest}>
      {title}
    </Button>
  );
};

CustomButton.propTypes = {
  endIcon: PropTypes.node,
  title: PropTypes.string.isRequired,
  type: PropTypes.object,
  textColor: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  borderRadius: PropTypes.string,
  textColorOnHover: PropTypes.string,
};

export default CustomButton;
