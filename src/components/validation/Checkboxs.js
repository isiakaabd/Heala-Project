import React, { Children } from "react";
import { ErrorMessage, Field, useField } from "formik";
import {
  Checkbox,
  FormControlLabel,
  FormLabel,
  Grid,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import { TextError } from "components/Utilities/TextError";

const useStyles = makeStyles((theme) => ({
  input: {
    ...theme.typography.input,
  },
  FormLabel: {
    "&.MuiFormLabel-root": {
      ...theme.typography.FormLabel,
    },
  },
  customCheckbox: {
    "&.MuiButtonBase-root-MuiCheckbox-root": {
      padding: "0px 4px 0px 0px",
    },
  },
}));

const Form = ({ label, ...props }) => {
  const [field] = useField(props);
  return <FormControlLabel {...field} control={<Checkbox />} label={label} />;
};
Form.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
};
const Checkboxes = (props) => {
  const { name, label, value } = props;

  return (
    <Grid item>
      <Form type="checkbox" label={label} name={name} value={value} />
    </Grid>
  );
};
export default Checkboxes;
Checkboxes.propTypes = {
  name: PropTypes.string,
  formlabel: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.array,
};

export const CustomCheckbox = ({
  children,
  label,
  checkboxTitle,
  onChange,
  ...props
}) => {
  const classes = useStyles();
  return (
    <Grid container direction="column">
      <FormLabel component="legend" className={classes.FormLabel}>
        {label}
      </FormLabel>
      <Grid container alignItems="center">
        <Checkbox
          onChange={onChange}
          className={classes.customCheckbox}
          {...props}
        />
        <Typography>{checkboxTitle}</Typography>
      </Grid>
      <Grid>{children}</Grid>
      {/* <ErrorMessage name={name} component={TextError} /> */}
    </Grid>
  );
};
CustomCheckbox.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  checkboxTitle: PropTypes.string,
  onChange: PropTypes.func,
};
