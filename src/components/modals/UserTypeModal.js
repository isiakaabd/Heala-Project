import React from "react";
import CustomButton from "components/Utilities/CustomButton";
import { Formik, Form } from "formik";
import FormikControl from "components/validation/FormikControl";
import { Grid, Button, Input } from "@mui/material";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import * as Yup from "yup";
import { useTheme } from "@mui/material/styles";
const useStyles = makeStyles((theme) => ({
  uploadBtn: {
    "&.MuiButton-root": {
      ...theme.typography.btn,
      background: "#f2f2f2",
      boxShadow: "none",
      color: theme.palette.common.black,
      textAlign: "left",

      "&:hover": {
        background: "#f2f3f3",
        boxShadow: "none",
      },

      "&:active": {
        boxShadow: "none",
      },
    },
  },
}));
export const UserTypeModal = ({
  handleDialogClose,
  type,
  setAlert,
  editId,
  setSingleData,
  initialValues,
}) => {
  const theme = useTheme();
  //   const [createPlan] = useMutation(CREATE_PLAN, {
  //     refetchQueries: [{ query: getPlans }],
  //   });
  //   const [updatePlan] = useMutation(UPDATE_PLAN);

  //   const single = useQuery(getSinglePlan, {
  //     variables: {
  //       id: editId,
  //     },
  //   });
  const classes = useStyles();
  const validationSchema = Yup.object({
    name: Yup.string("Enter your Name").required("Name is required"),
    type: Yup.string("Select your type").required("Type is required"),
  });
  const checkbox1 = [
    { key: "create", value: "create" },
    { key: "update", value: "update" },
    { key: "read", value: "read" },
    { key: "delete", value: "delete" },
  ];
  const onSubmit = async (values, onSubmitProps) => {
    console.log(values);
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
      {({ isSubmitting, dirty, isValid }) => {
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
                <Grid item container>
                  <FormikControl
                    control="input"
                    placeholder="Enter your Description"
                    name="description"
                    label="Description"
                  />
                </Grid>
                <Grid item md display="flex" alignItems="center">
                  <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justifyContent="flex-start"
                    gap={1}
                  >
                    <label htmlFor="contained-button-file">
                      <Input
                        accept="image/*"
                        id="contained-button-file"
                        multiple
                        type="file"
                        name="image"
                        style={{ display: "none" }}
                      />
                      <Button variant="contained" component="span" className={classes.uploadBtn}>
                        Upload Photo
                      </Button>
                    </label>
                  </Grid>
                </Grid>

                <Grid item xs={12} marginTop={10}>
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

UserTypeModal.propTypes = {
  handleDialogClose: PropTypes.func.isRequired,
  setAlert: PropTypes.func,
  editId: PropTypes.string,
  type: PropTypes.string.isRequired,
  edit: PropTypes.bool,
  initialValues: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  validationSchema: PropTypes.object,
  setSingleData: PropTypes.func,
};
