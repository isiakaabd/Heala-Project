import React from "react";
import { Field, ErrorMessage } from "formik";
import { TextError } from "components/Utilities/TextError";
import { FormLabel, FormControl, Box, FormGroup, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import { CheckboxWithLabel } from "formik-mui";

const useStyles = makeStyles((theme) => ({
  label: {
    ...theme.typography.FormLabel,
  },
  checkboxContainer: {
    "&.MuiBox-root": {
      display: "flex",
      justifyContent: "left",
      width: "100%",
      padding: "2rem 0",
      // border: "1px solid #E0E0E0",
      borderRadius: ".4rem",
      // "&:active": {
      //   border: "2px solid black",
      // },
    },
  },
}));
const Checkboxs = ({ name, options, formlabel }) => {
  const classes = useStyles();
  return (
    <Grid container gap={1}>
      <Grid item>
        <FormLabel component="legend" className={classes.label}>
          {formlabel}
        </FormLabel>
      </Grid>
      <Box className={classes.checkboxContainer}>
        <FormControl component="fieldset">
          <FormGroup className={classes.FormGroup} sx={{ flexDirection: "initial" }}>
            {options.map((opt) => (
              <Field
                type="checkbox"
                component={CheckboxWithLabel}
                name={name}
                key={opt.value}
                value={opt.value}
                Label={{ label: opt.label }}
              />
            ))}
          </FormGroup>
        </FormControl>
      </Box>
      <ErrorMessage name={name} component={TextError} />
    </Grid>
  );
};
export default Checkboxs;
Checkboxs.propTypes = {
  name: PropTypes.string,
  formlabel: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
};
