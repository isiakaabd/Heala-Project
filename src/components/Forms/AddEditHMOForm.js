import React from "react";
import t from "prop-types";
import { Formik, Form } from "formik";
import { Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useAlert from "hooks/useAlert";
import { useMutation } from "@apollo/client";
import { CustomButton } from "components/Utilities";
import { FormikControl } from "components/validation";
import { removeEmptyStringValues } from "helpers/func";
import { hmoValidationSchema } from "helpers/validationSchemas";
import { addProvider, editprovider } from "components/graphQL/Mutation";

const AddEditHMOForm = ({ type, initialValues, onSuccess }) => {
  const theme = useTheme();
  const { displayAlert, getErrorMsg } = useAlert();
  const [createProvider] = useMutation(addProvider);
  const [updateProvider] = useMutation(editprovider);

  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
  };

  const onCreateProvider = async (values) => {
    const variables = removeEmptyStringValues(values);
    try {
      const response = await createProvider({
        variables: variables,
      });
      if (response.data) {
        displayAlert("success", "HMO added succesfully");
        onSuccess();
      }
    } catch (error) {
      console.error(error);
      const errorMsg = getErrorMsg(error);
      displayAlert("error", errorMsg);
    }
  };

  const onUpdateProvider = async (values) => {
    const variables = removeEmptyStringValues(values);
    try {
      const response = await updateProvider({
        variables: variables,
      });
      if (response.data) {
        displayAlert("success", "HMO updated succesfully");
        onSuccess();
      }
    } catch (error) {
      console.error(error);
      const errorMsg = getErrorMsg(error);
      displayAlert("error", errorMsg);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) =>
        type === "add" ? onCreateProvider(values) : onUpdateProvider(values)
      }
      validationSchema={hmoValidationSchema}
      validateOnChange={true}
      validateOnMount={false}
      validateOnBlur={true}
    >
      {({ isSubmitting, setFieldValue, errors }) => {
        console.log(errors);
        return (
          <Form style={{ marginTop: "1rem" }}>
            <Grid container direction="column" gap={2}>
              <Grid item container direction="column" gap={1}>
                <FormikControl control="input" id="id" name="id" hidden />
              </Grid>
              <Grid item container direction="column" gap={1}>
                <FormikControl
                  control="input"
                  label="HMO Name"
                  id="name"
                  name="name"
                  placeholder="Enter HMO name"
                />
              </Grid>
              <Grid item container direction="column" gap={1}>
                <FormikControl
                  control="input"
                  type="email"
                  label="Email"
                  id="email"
                  name="email"
                  placeholder="Enter email address"
                />
              </Grid>
              {/* <Grid item container direction="column" gap={1}>
                <FormikControl
                  control="input"
                  label="Phone number"
                  id="phone_number"
                  name="phone"
                  placeholder="Enter phone number"
                />
              </Grid> */}
              {/* <Grid item container direction="column" gap={1}>
                <FormikControl
                  control="input"
                  label="Address"
                  id="address"
                  name="address"
                  placeholder="Address"
                />
              </Grid> */}

              {/* <Grid item container direction="column" gap={1}>
                <FormikControl
                  control="select"
                  options={[{ key: "Plan", value: "" }]}
                  placeholder="Select plan"
                  name="planId"
                  label="Plan"
                />
              </Grid> */}
              <Grid item container direction="column" gap={1}>
                <FormikControl
                  control="file"
                  label="Upload your logo"
                  id="logo"
                  name="icon"
                  setFieldValue={setFieldValue}
                />
              </Grid>
              <Grid item container direction="column" gap={1}>
                <FormikControl
                  control="file"
                  label="Upload your alt logo"
                  id="logo"
                  name="iconAlt"
                  setFieldValue={setFieldValue}
                />
              </Grid>
              <Grid item container sx={{ mt: 4 }}>
                <CustomButton
                  title={type === "edit" ? "Update HMO" : "Add HMO"}
                  width="100%"
                  type={buttonType}
                  isSubmitting={isSubmitting}
                  disabled={isSubmitting}
                />
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

AddEditHMOForm.propTypes = {
  onSuccess: t.func.isRequired,
  initialValues: t.object.isRequired,
  type: t.oneOf(["add", "edit"]).isRequired,
};

export default AddEditHMOForm;
