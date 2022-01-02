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
  formInput: {
    width: "100%",
    height: "100%",
    fontSize: "1.5rem",
    padding: ".5rem 1rem",
    border: "none",

    color: theme.palette.common.grey,

    "&:focus": {
      outline: "none",
    },
  },
  textArea: {
    border: "1px solid rgba(0, 0, 0, 0.03)",
    resize: "none",
    height: "100%",
    borderRadius: "0.5rem",
  },
  FormLabel: {
    "&.MuiFormLabel-root": {
      ...theme.typography.FormLabel,
    },
  },
}));

const EmptyTextarea = (props) => {
  const { name, value, onChange } = props;

  const classes = useStyles();
  return (
    <textarea
      value={value}
      onChange={onChange}
      name={name}
      //   rows={7}
      style={{ height: "100%" }}
      className={`${classes.formInput} ${classes.textArea}`}
    />
  );
};
EmptyTextarea.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  field: PropTypes.string,
  value: PropTypes.string,
};
const Textarea = (props) => {
  const { label, name, ...rest } = props;
  const classes = useStyles();

  return (
    <Grid container direction="column" gap={1} sx={{ height: "100% !important" }}>
      <FormLabel component="legend" className={classes.FormLabel}>
        {label}
      </FormLabel>
      <Field id={name} name={name} as={EmptyTextarea} {...rest} />
      <ErrorMessage name={name} component={TextError} />
    </Grid>
  );
};
Textarea.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Textarea;
