import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import * as Yup from "yup";
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

export const RoleModal = ({ handleDialogClose, type, checkbox }) => {
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

  const classes = useStyles();
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
      {(formik) => {
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
                <Button
                  variant="contained"
                  type="submit"
                  // onClick={handleDialogCloses}
                  className={classes.btn}
                >
                  {type === "edit" ? "Save changes" : "Add Role"}
                </Button>
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
