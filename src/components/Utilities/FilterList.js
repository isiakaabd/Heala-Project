import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { IoOptions } from "react-icons/io5";

const FilterList = ({ width, title, ...rest }) => {
  const useStyles = makeStyles((theme) => ({
    button: {
      "&.MuiButton-root": {
        ...theme.typography.btn,
        backgroundColor: "#fff",
        color: theme.palette.common.dark,

        "&:hover": {
          backgroundColor: "#fafafa",
        },

        "&:active": {
          backgroundColor: "#f7f7f7",
          boxShadow: "none",
        },
      },
    },

    iconWrapper: {
      display: "block",
      paddingTop: "0.6rem",
      paddingLeft: "0.5rem",
    },

    icon: {
      transform: "rotate(270deg)",
      marginTop: "-.2rem",
    },

    paper: {
      width: width,
      top: "17.3rem !important",
    },

    menuItem: {
      "&.MuiMenuItem-root": {
        justifyContent: "center",
      },
    },
  }));

  const classes = useStyles();

  return (
    <>
      <Button
        variant="contained"
        disableRipple
        endIcon={<IoOptions size={20} className={classes.icon} />}
        className={classes.button}
        {...rest}
      >
        {title}
      </Button>
    </>
  );
};

FilterList.propTypes = {
  width: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default FilterList;
