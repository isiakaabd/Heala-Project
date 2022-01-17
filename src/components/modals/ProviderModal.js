import React from "react";
import CustomButton from "components/Utilities/CustomButton";
import { Formik, Form } from "formik";
import FormikControl from "components/validation/FormikControl";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { addProvider } from "components/graphQL/Mutation";
import { getProviders } from "components/graphQL/useQuery";
// import { getSinglePlan } from "components/graphQL/useQuery";
import { useMutation } from "@apollo/client";
import * as Yup from "yup";
import { useTheme } from "@mui/material/styles";

export const ProviderModal = ({
  handleDialogClose,
  type,
  setAlert,
  editId,
  setSingleData,
  initialValues,
}) => {
  const theme = useTheme();
  const [createProvider] = useMutation(addProvider, { refetchQueries: [{ query: getProviders }] });
  //   const [updatePlan] = useMutation(UPDATE_PLAN);

  //   const single = useQuery(getSinglePlan, {
  //     variables: {
  //       id: editId,
  //     },
  //   });
  const validationSchema = Yup.object({
    name: Yup.string("Enter your Name").required("Name is required"),
    type: Yup.string("Select your type").required("Type is required"),
    image: Yup.string("Upload a single Image").required("Image is required"),
  });
  const checkbox1 = [{ key: "61ca1a53cebadf0584e38723", value: "61ca1a53cebadf0584e38723" }];
  const onSubmit = async (values, onSubmitProps) => {
    if (type === "add") {
      const { name, type, image } = values;
      await createProvider({
        variables: {
          name,
          icon: image,
          userTypeId: type,
        },
      });
    }
    onSubmitProps.resetForm();
    handleDialogClose();
  };
  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
    disabled: theme.palette.common.black,
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnMount
    >
      {({ isSubmitting, dirty, isValid, setFieldValue }) => {
        return (
          <Form style={{ marginTop: "3rem" }}>
            <Grid item container direction="column" gap={1}>
              <Grid item container rowSpacing={3}>
                <Grid item container>
                  <FormikControl
                    control="input"
                    name="name"
                    label="Name of plan"
                    placeholder="Enter Plan Name"
                  />
                </Grid>
                <Grid item container>
                  <FormikControl
                    control="select"
                    options={checkbox1}
                    placeholder="Select user types"
                    name="type"
                    label="User Types"
                  />
                </Grid>

                <Grid item md display="flex" alignItems="center">
                  <Grid item container md>
                    <FormikControl
                      control="file"
                      name="image"
                      label="Upload Your Logo"
                      setFieldValue={setFieldValue}
                    />
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <CustomButton
                    title={type === "edit" ? "Save Provider" : "Add Provider"}
                    width="100%"
                    isSubmitting={isSubmitting}
                    disabled={!(dirty || isValid)}
                    type={buttonType}
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

ProviderModal.propTypes = {
  handleDialogClose: PropTypes.func.isRequired,
  setAlert: PropTypes.func,
  editId: PropTypes.string,
  type: PropTypes.string.isRequired,
  edit: PropTypes.bool,
  initialValues: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  validationSchema: PropTypes.object,
  setSingleData: PropTypes.func,
};
