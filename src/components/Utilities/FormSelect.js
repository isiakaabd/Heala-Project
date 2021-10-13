import React from "react";
import PropTypes from "prop-types";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const useStyles = makeStyles((theme) => ({
  select: {
    "&.MuiSelect-select": {
      padding: "50px !important",
    },
    typo: {
      ...theme.palette.common.lighterGrey,
      fontSize: "1.25rem",
    },
  },
}));
const FormSelect = ({ value, onChange, placeholderText, options, ...rest }) => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <FormControl sx={{ minWidth: 120 }}>
      <Select
        value={value}
        onChange={onChange}
        displayEmpty
        style={{ minHeight: 60 }}
        inputProps={{ "aria-label": "Select Referral Type" }}
        IconComponent={KeyboardArrowDownIcon}
        className={classes.select}
      >
        <MenuItem value="">
          <Typography>{placeholderText}</Typography>
        </MenuItem>
        {options.map((option, index) => (
          <MenuItem key={index} value={option} style={{ fontSize: "1.25rem" }}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

FormSelect.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholderText: PropTypes.string,
};

export default FormSelect;
