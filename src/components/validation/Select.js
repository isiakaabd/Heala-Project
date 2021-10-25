import React from "react";
import { Field, ErrorMessage } from "formik";
import { TextError } from "components/Utilities/TextError";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import PropTypes from "prop-types";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import { makeStyles } from "@mui/styles";

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
const Selects = (props) => {
  const classes = useStyles();
  const { name, label, options, ...rest } = props;

  console.log(name);

  return (
    <FormControl fullWidth>
      <FormLabel className={classes.FormLabel}>{label}</FormLabel>
      <Field id={name} name={name} type="select" as={Select} className={classes.input} {...rest}>
        {options.map((option) => {
          return (
            <MenuItem key={option.key} value={option.value}>
              {option.key}
            </MenuItem>
          );
        })}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </FormControl>
  );
};

Selects.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
};

export default Selects;
