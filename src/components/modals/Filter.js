import React from "react";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import CustomButton from "components/Utilities/CustomButton";
import { Formik, Form } from "formik";
import FormikControl from "components/validation/FormikControl";
import { useTheme } from "@mui/material/styles";
const useStyles = makeStyles((theme) => ({
  btn: {
    "&.MuiButton-root": {
      ...theme.typography.btn,
      background: theme.palette.common.black,
      width: "100%",
    },
  },
}));
const Filter = (props) => {
  const classes = useStyles();
  const checkbox2 = [
    { key: "select an option", value: " " },
    { key: "create", value: "create" },
    { key: "update", value: "update" },
    { key: "read", value: "read" },
    { key: "delete", value: "delete" },
  ];
  const checkbox5 = [
    { key: "select an option", value: " " },
    { key: "create", value: "create" },
    { key: "update", value: "update" },
    { key: "read", value: "read" },
    { key: "delete", value: "delete" },
  ];
  const checkbox4 = [
    { key: "select an option", value: " " },
    { key: "create", value: "create" },
    { key: "update", value: "update" },
    { key: "read", value: "read" },
    { key: "delete", value: "delete" },
  ];
  const { options, validationSchema, initialValues, type } = props;

  const theme = useTheme();
  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(false);
    console.log(values);
    onSubmitProps.resetForm();
  };

  const greenButton = {
    background: theme.palette.primary.main,
    hover: theme.palette.primary.light,
    active: theme.palette.primary.dark,
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnMount
    >
      {(formik) => {
        return (
          <Form style={{ marginTop: "3rem" }}>
            <Grid container direction="column" gap={3} marginBottom={4}>
              <Grid item container spacing={2}>
                <Grid item xs={6}>
                  <FormikControl
                    control="select"
                    name={type === "hcp" ? "Name" : "Enter Value"}
                    placeholder="Select Name"
                    label="Name"
                    options={options}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormikControl
                    control="select"
                    placeholder="Choose Date"
                    name={type === "hcp" ? "Date" : "Enter Value"}
                    label={type === "hcp" ? "Choose Date" : "Enter Value"}
                    options={checkbox2}
                  />
                </Grid>
              </Grid>

              <Grid item container spacing={2}>
                <Grid item xs={6}>
                  <FormikControl
                    control="select"
                    placeholder="jj"
                    name="Status"
                    label={type === "hcp" ? "Select Category" : "Enter Value"}
                    options={checkbox4}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormikControl
                    control="select"
                    placeholder="hhh"
                    name={type === "hcp" ? "Specialization" : "Enter Value"}
                    label={type === "hcp" ? "Select Category" : "Enter Value"}
                    options={checkbox5}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} marginTop={24}>
                <CustomButton
                  variant="contained"
                  title="Send Mail"
                  type={greenButton}
                  // onClick={handleDialogClose}
                  className={classes.btn}
                  disabled={formik.isSubmitting || !(formik.dirty && formik.isValid)}
                >
                  {type === "hcp" ? "Save changes" : "Add Permission"}
                </CustomButton>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

Filter.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  options: PropTypes.array.isRequired,
  initialValues: PropTypes.object.isRequired,
  validationSchema: PropTypes.object.isRequired,
};
export default Filter;
