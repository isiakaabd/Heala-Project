import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import PropTypes from "prop-types";
import { InputAdornment, OutlinedInput, Grid } from "@mui/material";
// import { makeStyles } from "@mui/styles";
const SearchContainer = ({
  width,
  placeholder,
  height,
  placeholderWidth,
  value,
  onChange,
  ref,
  hasStartIcon = true,
  ...rest
}) => {
  return (
    <Grid container>
      <OutlinedInput
        id="input-with-icon-adornment"
        value={value}
        onChange={onChange}
        ref={ref}
        {...rest}
        sx={{
          display: "flex",
          alignItems: "center",
          height,
          width: "100%",
          fontSize: "16px",
          placeholderWidth,
          background: "white",
          borderRadius: 2,
        }}
        placeholder={placeholder}
        inputProps={{ "aria-label": placeholder }}
        startAdornment={
          hasStartIcon && (
            <InputAdornment position="start">
              <SearchIcon style={{ fontSize: "3rem" }} />
            </InputAdornment>
          )
        }
        autoFocus
      />
    </Grid>
  );
};
SearchContainer.propTypes = {
  width: PropTypes.string,
  ref: PropTypes.string,
  placeholder: PropTypes.string,
  height: PropTypes.string,
  placeholderWidth: PropTypes.string,
  value: PropTypes.string,
  hasStartIcon: PropTypes.bool,
  onChange: PropTypes.func,
};

export default SearchContainer;
