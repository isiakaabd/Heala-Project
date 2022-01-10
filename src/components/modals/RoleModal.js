import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import CustomButton from "components/Utilities/CustomButton";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import FormikControl from "components/validation/FormikControl";
import { useTheme } from "@mui/material/styles";

export const RoleModal = ({ handleDialogClose, type, checkbox }) => {
  const theme = useTheme();
  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
    disabled: "#F7F7FF",
  };
  const optionss = [
    {
      label: "permission 1",
      value: "permission 1",
    },
    {
      label: "permission 2",
      value: "permission 2",
    },
    {
      label: "permission 3",
      value: "permission 3",
    },
  ];

  const initialValues = {
    name: "",
    checkbox: [],
  };

  const validationSchema = Yup.object({
    checkbox: Yup.array().min(1, "Add atleast a permission"),
    name: Yup.string("Enter your Name").required("Name is required"),
  });
  const onSubmit = (values) => {
    console.log(values);
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
            <Grid item container direction="column">
              <Grid item container>
                <Grid item container marginBottom={4}>
                  <Grid container direction="column" gap={1}>
                    <FormikControl
                      control="input"
                      name="name"
                      label=" Name of role"
                      placeholder="Enter Plan Name"
                    />
                  </Grid>
                </Grid>

                <Grid item container xs={12}>
                  <Grid item container direction="column" gap={1}>
                    <FormikControl
                      control="checkbox"
                      formlabel="Role"
                      name="checkbox"
                      options={optionss}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} marginTop={10}>
                <CustomButton
                  title={type === "edit" ? "Save changes" : "Add Role"}
                  width="100%"
                  isSubmitting={isSubmitting}
                  type={buttonType}
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

RoleModal.propTypes = {
  handleDialogClose: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  checkbox: PropTypes.object.isRequired,
};
