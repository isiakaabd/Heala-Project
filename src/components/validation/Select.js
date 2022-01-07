import React from "react";
import { Field, ErrorMessage } from "formik";
import { TextError } from "components/Utilities/TextError";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import PropTypes from "prop-types";
import Select from "@mui/material/Select";
import { MenuItem, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  input: {
    ...theme.typography.input,
    minHeight: "5rem",
  },
  FormLabel: {
    "&.MuiFormLabel-root": {
      ...theme.typography.FormLabel,
      paddingBottom: "1rem",
    },
  },
}));

export const Formiks = ({ value, name, onChange, onBlur, children, label }) => {
  const classes = useStyles();
  return (
    <FormControl fullWidth>
      <FormLabel className={classes.FormLabel}>{label}</FormLabel>
      <Select
        name={name}
        displayEmpty
        onBlur={onBlur}
        value={value}
        className={classes.input}
        onChange={onChange}
      >
        {children}
      </Select>
    </FormControl>
  );
};

Formiks.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
};

const Selects = (props) => {
  const { name, label, options, placeholder } = props;

  return (
    <Grid container direction="column" gap={1}>
      <Field name={name} as={Formiks} label={label}>
        <MenuItem value="">{placeholder}</MenuItem>
        {options.map((option) => (
          <MenuItem key={option.key} value={option.key}>
            {option.key}
          </MenuItem>
        ))}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </Grid>
  );
};

Selects.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
};

export default Selects;
