import React from "react";
import { Field, ErrorMessage } from "formik";
import { TextError } from "components/Utilities/TextError";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { makeStyles } from "@mui/styles";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

const useStyles = makeStyles((theme) => ({
  FormLabel: {
    "&.MuiFormLabel-root": {
      ...theme.typography.FormLabel,
    },
  },

  dateInput: {
    "&>.MuiOutlinedInput-root": {
      border: "none",
    },
  },
}));

const Dates = ({ name, value, setFieldValue, onBlur, startDate, endDate }) => {
  const classes = useStyles();
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        className={classes.dateInput}
        name={name}
        onChange={(value) => setFieldValue(name, value)}
        value={value}
        onBlur={onBlur}
        minDate={startDate}
        maxDate={endDate}
        onError={(err) => console.log(err)}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              padding: "-12px",
              border: "2px solid #E0E0E0",
              borderRadius: "12px",
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};

Dates.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  setFieldValue: PropTypes.func,
  children: PropTypes.node,
  name: PropTypes.string,
  onBlur: PropTypes.func,
};

const DateComponent = (props) => {
  const { name, label, ...rest } = props;
  const classes = useStyles();
  return (
    <Grid container direction="column" gap={1}>
      <FormLabel className={classes.FormLabel}>{label}</FormLabel>
      <Field name={name} as={Dates} label={label} {...rest} />
      <ErrorMessage name={name} component={TextError} />
    </Grid>
  );
};

DateComponent.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array,
  placeholder: PropTypes.string,
};

export default DateComponent;
