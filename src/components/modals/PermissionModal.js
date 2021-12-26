import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { Formik, Form } from "formik";
import { CREATE_PERMISSION, UPDATE_PERMISSION } from "components/graphQL/Mutation";
import { useMutation } from "@apollo/client";
import FormikControl from "components/validation/FormikControl";
import { useQuery } from "@apollo/client";
import { getSinglePermissions } from "components/graphQL/useQuery";

const useStyles = makeStyles((theme) => ({
  btn: {
    "&.MuiButton-root": {
      ...theme.typography.btn,
      background: theme.palette.common.black,
      width: "100%",
    },
  },
  checkboxContainer: {
    "&.MuiBox-root": {
      padding: "2rem 0",
      border: "1px solid #E0E0E0",
      borderRadius: ".4rem",
      "&:active": {
        border: "2px solid black",
      },
    },
  },
  checkbox: {
    "& .MuiSvgIcon-root": {
      fontSize: 28,
    },
    "&.Mui-checked": {
      color: "green !important",
    },
  },
  FormLabel: {
    "&.MuiFormLabel-root": {
      ...theme.typography.FormLabel,
    },
  },
}));

export const PermissionModal = ({
  options,
  type,
  handleDialogClose,
  initialValues,
  validationSchema,
  setAlert,
  editId,
  setSinglePermission,
}) => {
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
        const { data } = await updatePermission({ variables: { id: editId, description, name } });
        console.log(data);
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

  const classes = useStyles();

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
                {/* <Grid item container>
                  <FormikControl
                    control="checkbox"
                    name="checkbox"
                    options={options}
                    label="Permission"
                  />
                </Grid> */}
                <Grid item xs={12} marginTop={10}>
                  <Button
                    variant="contained"
                    type="submit"
                    // onClick={handleDialogClose}
                    className={classes.btn}
                    // disabled={formik.isSubmitting || !(formik.dirty && formik.isValid)}
                  >
                    {type === "edit" ? "Save changes" : "Add Permission"}
                  </Button>
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
