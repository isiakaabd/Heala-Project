import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@mui/styles";
import { IoOptions } from "react-icons/io5";

const useStyles = makeStyles((theme) => ({
  button: {
    "&.css-1zf5oc-MuiButtonBase-root-MuiButton-root": {
      fontSize: "1.5rem",
      textTransform: "none",
      height: "5rem",
      display: "flex",
      alignItems: "center",
      backgroundColor: "#fff",
      color: theme.palette.common.dark,
      borderRadius: 7,
      boxShadow: "0px 0px 4px -1px rgba(71,64,71,0.63)",

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
  },

  paper: {
    width: "15.2rem",
    top: "17.3rem !important",
  },
}));

const FilterList = ({ onClick, open, anchorEl, setAnchorEl }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <Button variant="contained" disableRipple onClick={onClick} className={classes.button}>
        <span>Filter Patients</span>
        <span className={classes.iconWrapper}>
          <IoOptions size={20} className={classes.icon} />
        </span>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        classes={{ paper: classes.paper }}
        className={classes.menu}
      >
        <MenuItem onClick={() => setAnchorEl(null)}>Name</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>Age</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>Date</MenuItem>
      </Menu>
    </Fragment>
  );
};

FilterList.propTypes = {
  onClick: PropTypes.func.isRequired,
  open: PropTypes.bool,
  anchorEl: PropTypes.object,
  setAnchorEl: PropTypes.func.isRequired,
};

export default FilterList;
