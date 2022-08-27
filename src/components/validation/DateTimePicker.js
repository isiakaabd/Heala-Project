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
import DesktopDateTimePicker from "@mui/lab/DesktopDateTimePicker";
const useStyles = makeStyles((theme) => ({
  FormLabel: {
    "&.MuiFormLabel-root": {
      ...theme.typography.FormLabel,
    },
  },
}));

const Dates = ({ name, value, setFieldValue, onBlur }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDateTimePicker
        name={name}
        onChange={(value) => setFieldValue(name, value)}
        value={value}
        onBlur={onBlur}
        onError={(err) => console.log(err)}
        renderInput={(params) => (
          <TextField {...params} sx={{ padding: "-12px" }} />
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

const DateTimePicker = (props) => {
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

DateTimePicker.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array,
  placeholder: PropTypes.string,
};

export default DateTimePicker;
