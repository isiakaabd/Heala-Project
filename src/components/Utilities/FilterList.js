import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@mui/styles";
import { IoOptions } from "react-icons/io5";

const FilterList = ({ width, title, onClick }) => {
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

  const [anchorEl, setAnchorEl] = useState(null);
  // const [filter, setFilter] = useState(title);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(null);

    // console.log(event.currentTarget.dataset);
  };

  return (
    <>
      <Button
        variant="contained"
        disableRipple
        onClick={onClick}
        // #={(event) => setAnchorEl(event.currentTarget)}
        endIcon={<IoOptions size={20} className={classes.icon} />}
        className={classes.button}
      >
        {title}
      </Button>
      {/* <Menu
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
        {options.map((option) => (
          <MenuItem
            data-my-value={option.value}
            key={option.id}
            onClick={handleClick}
            className={classes.menuItem}
          >
            {option.value}
          </MenuItem>
        ))}
      </Menu> */}
    </>
  );
};

FilterList.propTypes = {
  width: PropTypes.string,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default FilterList;
