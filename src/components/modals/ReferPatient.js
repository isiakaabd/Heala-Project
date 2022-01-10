import React from "react";
import PropTypes from "prop-types";
import CustomButton from "components/Utilities/CustomButton";
import { Grid } from "@mui/material";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import FormikControl from "components/validation/FormikControl";
import { useTheme } from "@mui/material/styles";
const checkbox2 = [
  { key: "create", value: "create" },
  { key: "update", value: "update" },
  { key: "read", value: "read" },
  { key: "delete", value: "delete" },
];
const checkbox1 = [
  { key: "create", value: "create" },
  { key: "update", value: "update" },
  { key: "read", value: "read" },
  { key: "delete", value: "delete" },
];

const validationSchema = Yup.object({
  referral: Yup.string("choose a referral").required("Referral is required"),
  textarea: Yup.string("Enter your message").required("Message is required"),
  category: Yup.string("choose a referral").required("referral is required"),
});

const ReferPatient = ({ handleDialogClose, initialValues }) => {
  const theme = useTheme();
  const onSubmit = async (values, onSubmitProps) => {
    console.log(values);
    onSubmitProps.resetForm();
    handleDialogClose();
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
            <Grid item container direction="column" gap={1}>
              <Grid item container rowSpacing={2}>
                <Grid item container>
                  <FormikControl
                    control="select"
                    name="referral"
                    options={checkbox1}
                    label="Referral Type"
                    placeholder="Select Type"
                  />
                </Grid>
                <Grid item container>
                  <FormikControl
                    control="select"
                    name="category"
                    options={checkbox2}
                    label="Refferal"
                    placeholder="Select Referral"
                  />
                </Grid>
                <Grid item container>
                  <FormikControl
                    control="textarea"
                    fLabel={false}
                    name="textarea"
                    label="Referral comment"
                  />
                </Grid>
                <Grid item xs={12} marginTop={5}>
                  <CustomButton
                    title="Search available HCP"
                    width="100%"
                    type={buttonType}
                    isSubmitting={isSubmitting}
                    disabled={!(dirty || isValid)}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

ReferPatient.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  handleDialogClose: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
};

export default ReferPatient;
