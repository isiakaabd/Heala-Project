import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { Formik, Form } from "formik";
import FormikControl from "components/validation/FormikControl";

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

export const PermissionModal = (props) => {
  const { options, initialValues, type, validationSchema, handleDialogClose } = props;
  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.resetForm();
  };

  const classes = useStyles();
  console.log(options);
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
                    control="checkbox"
                    name="checkbox"
                    options={options}
                    label="Permission"
                  />
                </Grid>
                <Grid item xs={12} marginTop={10}>
                  <Button
                    variant="contained"
                    type="submit"
                    onClick={handleDialogClose}
                    className={classes.btn}
                    disabled={formik.isSubmitting || !(formik.dirty && formik.isValid)}
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
  type: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  initialValues: PropTypes.object.isRequired,
  validationSchema: PropTypes.object.isRequired,
};
