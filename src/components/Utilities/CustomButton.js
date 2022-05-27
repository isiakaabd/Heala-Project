import React from "react";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import Loader from "components/Utilities/Loader";

const CustomButton = ({
  title,
  endIcon,
  width,
  height,
  textColorOnHover,
  borderRadius,
  textColor,
  path,
  role,
  fontSize,
  type: { background, hover, active, disabled },
  isSubmitting,
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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "clamp(1.2rem,2vw, 1.3rem)",
        // fontSize ? fontSize : undefined,

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
          color: textColor,
        },

        "&:disabled": {
          backgroundColor: disabled,
          color: textColor,
          boxShadow: "none",
          cursor: "no-drop",
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
    <Button
      variant="contained"
      LinkComponent={Link}
      to={path ? path : ""}
      type={role ? "button" : "submit"}
      endIcon={endIcon}
      className={classes.button}
      {...rest}
    >
      {!isSubmitting && title} {isSubmitting && <Loader size={35} color="info" />}
    </Button>
  );
};

CustomButton.defaultProps = {
  width: "auto",
  textColor: "#fff",
};

CustomButton.propTypes = {
  endIcon: PropTypes.node,
  title: PropTypes.string,
  type: PropTypes.object,
  textColor: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  borderRadius: PropTypes.string,
  fontSize: PropTypes.string,
  textColorOnHover: PropTypes.string,
  path: PropTypes.string,
  isSubmitting: PropTypes.bool,
  role: PropTypes.bool,
};

export default CustomButton;
