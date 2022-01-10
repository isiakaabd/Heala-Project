import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import CustomButton from "components/Utilities/CustomButton";
import { Formik, Form } from "formik";
import FormikControl from "components/validation/FormikControl";
import { CREATE_PERMISSION, UPDATE_PERMISSION } from "components/graphQL/Mutation";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { getSinglePermissions } from "components/graphQL/useQuery";

export const PermissionModal = ({
  type,
  initialValues,
  validationSchema,
  setAlert,
  handleDialogClose,
  editId,
  setSinglePermission,
}) => {
  const theme = useTheme();
  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
    disabled: theme.palette.common.black,
  };
  const [createPermission] = useMutation(CREATE_PERMISSION);
  const [updatePermission] = useMutation(UPDATE_PERMISSION);

  const { data } = useQuery(getSinglePermissions, {
    variables: {
      id: editId,
    },
  });

  useEffect(() => {
    if (data && data.getPermission) {
      setSinglePermission({
        description: data.getPermission.description,
        name: data.getPermission.name,
      });
    }
  }, [data, setSinglePermission]);

  const onSubmit = async (values, onSubmitProps) => {
    const { description, name } = values;
    if (type === "add") {
      try {
        const { data } = await createPermission({ variables: { description, name } });
        console.log(data);
        setAlert({
          message: "Permission successfully created",
          type: "success",
        });
        setTimeout(() => {
          setAlert(null);
        }, 5000);
      } catch (error) {
        console.log(error);
        setAlert({
          message: "Permission  not successfully created",
          type: "danger",
        });
        setTimeout(() => {
          setAlert(null);
        }, 5000);
      }
    } else if (type === "edit") {
      try {
        await updatePermission({ variables: { id: editId, description, name } });
        setAlert({
          message: "Permission successfully updated",
          type: "success",
        });
        setTimeout(() => {
          setAlert(null);
        }, 5000);
      } catch (error) {
        console.log(error);
        setAlert({
          message: "Permission  not successfully updated",
          type: "danger",
        });
        setTimeout(() => {
          setAlert(null);
        }, 5000);
      }
    }

    handleDialogClose();

    onSubmitProps.resetForm();
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
              <Grid item container rowSpacing={3}>
                <Grid item container>
                  <FormikControl
                    control="input"
                    name="name"
                    label="Name of Permission"
                    placeholder="Enter Permission Name"
                  />
                </Grid>
                <Grid item container>
                  <FormikControl
                    control="input"
                    name="description"
                    label="Description"
                    placeholder="Enter Description"
                  />
                </Grid>

                <Grid item xs={12} marginTop={10}>
                  <CustomButton
                    title={type === "edit" ? "Save changes" : "Add Permission"}
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
PermissionModal.propTypes = {
  handleDialogClose: PropTypes.func.isRequired,
  setSinglePermission: PropTypes.func,
  setAlert: PropTypes.func,
  type: PropTypes.string.isRequired,
  editId: PropTypes.string,
  options: PropTypes.array.isRequired,
  initialValues: PropTypes.object.isRequired,
  validationSchema: PropTypes.object.isRequired,
};
