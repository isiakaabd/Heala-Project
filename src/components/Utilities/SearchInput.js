import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import PropTypes from "prop-types";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { makeStyles } from "@mui/styles";
import { Field } from "formik";

const Search = ({
  width,
  placeholder,
  height,
  placeholderWidth,
  type,
  name,
  hasStartIcon = true,
  ...rest
}) => {
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
      <Field name={name}>
        {({ field }) => {
          return (
            <OutlinedInput
              type={type}
              id="input-with-icon-adornment"
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
                hasStartIcon && (
                  <InputAdornment position="start">
                    <SearchIcon style={{ fontSize: "3rem" }} name={name} />
                  </InputAdornment>
                )
              }
              {...rest}
            />
          );
        }}
      </Field>
    </div>
  );
};
Search.propTypes = {
  width: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  height: PropTypes.string,
  placeholderWidth: PropTypes.string,
  type: PropTypes.string,
  hasStartIcon: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Search;
