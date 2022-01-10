import React from "react";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import FormikControl from "components/validation/FormikControl";
import CustomButton from "components/Utilities/CustomButton";
import { useTheme } from "@mui/material/styles";

const Filter = (props) => {
  const checkbox2 = [
    { key: "create", value: "create" },
    { key: "update", value: "update" },
    { key: "read", value: "read" },
    { key: "delete", value: "delete" },
  ];
  const checkbox5 = [
    { key: "create", value: "create" },
    { key: "update", value: "update" },
    { key: "read", value: "read" },
    { key: "delete", value: "delete" },
  ];
  const checkbox4 = [
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

  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
    disabled: "#F7F7FF",
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnMount
    >
      {({ isSubmitting, dirty, isValid }) => {
        return (
          <Form style={{ marginTop: "3rem" }}>
            <Grid container direction="column" gap={3} marginBottom={4}>
              <Grid item container spacing={2}>
                <Grid item xs={6}>
                  <FormikControl
                    control="select"
                    options={options}
                    name={type === "hcp" ? "Name" : "Enter Value"}
                    placeholder="Select Name"
                    label="Name"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormikControl
                    control="select"
                    options={checkbox2}
                    name={type === "hcp" ? "Date" : "Enter Value"}
                    placeholder="Choose Date"
                    label={type === "hcp" ? "Choose Date" : "Enter Value"}
                  />
                </Grid>
              </Grid>

              <Grid item container spacing={2}>
                <Grid item xs={6}>
                  <FormikControl
                    control="select"
                    placeholder="Select Status"
                    name="Status"
                    label={type === "hcp" ? "Select Status" : "Enter Value"}
                    options={checkbox4}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormikControl
                    control="select"
                    placeholder="Select Category"
                    name={type === "hcp" ? "Specialization" : "Enter Value"}
                    label={type === "hcp" ? "Select Category" : "Enter Value"}
                    options={checkbox5}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} marginTop={24}>
                <CustomButton
                  title={type === "hcp" ? "Save changes" : "Add Permission"}
                  width="100%"
                  type={buttonType}
                  isSubmitting={isSubmitting}
                  disabled={!(dirty || isValid)}
                />
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
