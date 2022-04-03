import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import { CustomButton } from "components/Utilities";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import FormikControl from "components/validation/FormikControl";
import { useTheme } from "@mui/material/styles";
import { addRole } from "components/graphQL/Mutation";
import { getRoles } from "components/graphQL/useQuery";
import { useMutation } from "@apollo/client";

const RoleModal = ({ handleDialogClose, type }) => {
  const [createRole] = useMutation(addRole, {
    refetchQueries: [{ query: getRoles }],
  });
  const theme = useTheme();
  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
    disabled: theme.palette.common.black,
  };

  const initialValues = {
    name: "",
    description: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string("Enter your Name").required("Name is required"),
    description: Yup.string("Enter your description").required("Description is required"),
  });
  const onSubmit = async (values) => {
    const { name, description } = values;
    if (type === "add") {
      await createRole({
        variables: {
          name,
          editable: true,
          description,
          permissions: [],
        },
      });
    }
    handleDialogClose();
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validateOnBlur={false}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnMount={false}
      enableReinitialize
    >
      {({ isSubmitting, dirty, isValid }) => {
        return (
          <Form style={{ marginTop: "3rem" }}>
            <Grid item container direction="column">
              <Grid item container>
                <Grid item container gap={2}>
                  <Grid container direction="column" gap={2}>
                    <FormikControl
                      control="input"
                      name="name"
                      label=" Name of role"
                      placeholder="Enter Plan Name"
                    />
                  </Grid>
                  <Grid container direction="column">
                    <FormikControl
                      control="input"
                      name="description"
                      label=" Description"
                      placeholder="Enter Description"
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
export default RoleModal;
RoleModal.propTypes = {
  handleDialogClose: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  checkbox: PropTypes.object.isRequired,
};
