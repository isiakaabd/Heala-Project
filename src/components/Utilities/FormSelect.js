import React from "react";
import PropTypes from "prop-types";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const FormSelect = ({ value, onChange, placeholderText, options, ...rest }) => {
  const theme = useTheme();

  return (
    <FormControl sx={{ width: "100%" }}>
      <Select
        value={value}
        onChange={onChange}
        displayEmpty
        inputProps={{ "aria-label": "Select Referral Type" }}
        IconComponent={KeyboardArrowDownIcon}
      >
        <MenuItem value="">
          <em style={{ color: theme.palette.common.lightGrey, fontSize: "1.25rem" }}>
            {placeholderText}
          </em>
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
