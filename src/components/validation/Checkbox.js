import React from "react";
import { Field, ErrorMessage } from "formik";
import { TextError } from "components/Utilities/TextError";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const useStyles = makeStyles((theme) => ({
  checkboxContainer: {
    "&.MuiBox-root": {
      padding: "2rem 0",
      border: "1px solid #E0E0E0",
      borderRadius: ".4rem",
      // "&:active": {
      //   border: "2px solid black",
      // },
    },
  },
  label: {
    ...theme.typography.FormLabel,
  },
  checkbox: {
    height: "2rem",
    width: "2rem",
    "&:checked": {
      color: "green !important",
    },
  },
}));
const Checkbox = (props) => {
  const classes = useStyles();
  const { label, name, options, ...rest } = props;
  return (
    <Grid container direction="column" gap={1}>
      <FormLabel component="legend" className={classes.checkboxContainer}>
        {label}
      </FormLabel>
      <Box className={classes.checkboxContainer}>
        <FormControl sx={{ m: 4 }} variant="standard">
          <Grid container spacing={2}>
            <Field name={name} {...rest}>
              {({ field }) => {
                return options.map((option, index) => {
                  return (
                    <Grid item key={index} display="flex" columnGap={2}>
                      <input
                        type="checkbox"
                        className={classes.checkbox}
                        {...field}
                        value={option.value}
                        checked={field.value.includes(option.value)}
                      />
                      <label htmlFor={option.value} className={classes.label}>
                        {option.key}
                      </label>
                    </Grid>
                  );
                });
              }}
            </Field>
          </Grid>
        </FormControl>
      </Box>
      <ErrorMessage name={name} component={TextError} />
    </Grid>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};
export default Checkbox;
