import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import DatePicker from "@material-ui/lab/DatePicker";
import PropTypes from "prop-types";
const ResponsiveDatePickers = ({ label }) => {
  const [value, setValue] = useState({ label });
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label={label}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} helperText={params?.inputProps?.placeholder} />
          )}
        />
      </LocalizationProvider>
    </div>
  );
};
ResponsiveDatePickers.propTypes = {
  label: PropTypes.string.isRequired,
};
export default ResponsiveDatePickers;
