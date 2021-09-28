import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import PropTypes from "prop-types";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { makeStyles } from "@mui/styles";
const SearchContainer = ({ width, placeholder, height, placeholderWidth, value, onChange }) => {
  const useStyles = makeStyles({
    //   root: {
    //     "& .css-1u99e1o-MuiInputBase-root-MuiOutlinedInput-root": {
    //       fontSize: "1.6rem",
    //     },
    //   },
  });
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <OutlinedInput
        id="input-with-icon-adornment"
        value={value}
        onChange={onChange}
        sx={{
          display: "flex",
          alignItems: "center",
          width,
          height,
          fontSize: "16px",
          placeholderWidth,
          background: "white",
          borderRadius: 2,
        }}
        placeholder={placeholder}
        inputProps={{ "aria-label": placeholder }}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
      />
    </div>
  );
};
SearchContainer.propTypes = {
  width: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  height: PropTypes.string,
  placeholderWidth: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default SearchContainer;
