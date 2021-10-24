import React from "react";
import { Field, ErrorMessage } from "formik";
import { TextError } from "components/Utilities/TextError";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";

const useStyles = makeStyles((theme) => ({
  input: {
    ...theme.typography.input,
  },
  FormLabel: {
    "&.MuiFormLabel-root": {
      ...theme.typography.FormLabel,
    },
  },
}));

const Input = (props) => {
  const { label, name, ...rest } = props;
  const classes = useStyles();
  return (
    <Grid container direction="column" gap={1}>
      <FormLabel component="legend" className={classes.FormLabel}>
        {label}
      </FormLabel>
      <Field id={name} name={name} {...rest} className={classes.input} />
      <ErrorMessage name={name} component={TextError} />
    </Grid>
  );
};
Input.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Input;
