import React from "react";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import Loader from "components/Utilities/Loader";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

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
  startIcon,
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
        boxShadow: "none",

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
      startIcon={startIcon}
      variant="contained"
      LinkComponent={Link}
      to={path ? path : ""}
      type={role ? "button" : "submit"}
      endIcon={endIcon}
      className={classes.button}
      {...rest}
    >
      {!isSubmitting && title}{" "}
      {isSubmitting && <Loader size={35} color="info" />}
    </Button>
  );
};

CustomButton.defaultProps = {
  width: "auto",
  textColor: "#fff",
};

CustomButton.propTypes = {
  endIcon: PropTypes.node,
  startIcon: PropTypes.node,
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

export const SearchBtn = ({ isSubmitting, handleClick }) => {
  const useStyles = makeStyles((theme) => ({
    button: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#ffffff",
      border: "none",
      backgroundColor: theme.palette.common.dark,
      borderRadius: "100%",
      padding: "0.75rem",
      cursor: "pointer",

      "&:hover": {
        backgroundColor: theme.palette.common.gray,
      },

      "&:disabled": {
        backgroundColor: theme.palette.common.disable,
        boxShadow: "none",
        cursor: "no-drop",
      },
    },
  }));

  const classes = useStyles();

  return (
    <button
      type={"submit"}
      className={classes.button}
      onClick={() => handleClick()}
    >
      {!isSubmitting && <SearchOutlinedIcon fontSize="large" />}{" "}
      {isSubmitting && <Loader size={35} color="info" />}
    </button>
  );
};

SearchBtn.propTypes = {
  isSubmitting: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
};

export default CustomButton;
