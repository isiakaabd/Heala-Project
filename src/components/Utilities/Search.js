import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { InputAdornment, OutlinedInput, Grid } from "@mui/material";
import SearchIcon from "components/Icons/SearchIcon";

const useStyles = makeStyles((theme) => ({
  inputCont: {
    "&.MuiOutlinedInput-root": {
      backgroundColor: "#FAFAFA",
      fontWeight: "200 !important",
      color: `${theme.palette.common.grey} !important`,
      height: ({ height }) => `${height}`,
      fontSize: "14px !important",
      borderRadius: "12px",
      border: "1px solid #E0E0E0 !important",

      "&>fieldset": {
        border: 0,
      },
    },
    /* "&.MuiTypography-root": {
      fontWeight: "200 !important",
      color: `${theme.palette.common.grey} !important`,
      minHeight: 50,
      fontSize: "14px !important",
      borderRadius: "12px",
    }, */
  },
}));
const SearchContainer = ({
  width,
  placeholder,
  height,
  placeholderWidth,
  value,
  onChange,
  ref,
  hasStartIcon = true,
  startIcon,
  onClickSearchBtn,
  ...rest
}) => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item>
        <OutlinedInput
          className={classes.inputCont}
          id="input-with-icon-adornment"
          value={value}
          onChange={onChange}
          ref={ref}
          {...rest}
          sx={{
            fontSize: "14px",
            height: height,
            border: "2px solid #E0E0E0",
            padding: "0rem 1rem",
            borderRadius: "12px",
          }}
          placeholder={placeholder}
          inputProps={{ "aria-label": placeholder }}
          startAdornment={
            <InputAdornment position="start">
              {startIcon
                ? startIcon
                : hasStartIcon && <SearchIcon style={{ fontSize: "14px" }} />}
            </InputAdornment>
          }
          endAdornment={
            <button
              style={{
                padding: "0.5rem",
                margin: "1rem 0rem",
                backgroundColor: "#2D2F39",
                border: "none",
                borderRadius: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => onClickSearchBtn()}
            >
              <SearchIcon sx={{ fontSize: "20px" }} />
            </button>
          }
        />
      </Grid>
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
  startIcon: PropTypes.node,
  onClickSearchBtn: PropTypes.func,
};

export default SearchContainer;
