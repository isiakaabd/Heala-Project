import React from "react";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { Grid, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Formik, Form } from "formik";
import FormikControl from "components/validation/FormikControl";

const useStyles = makeStyles((theme) => ({
  headerGridWrapper: {
    padding: "1.5rem 2rem",
    background: "rgb(251, 251, 251)",
    borderRadius: "1rem",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottom: `1px solid ${theme.palette.common.lightGrey}`,
  },

  closeIcon: {
    "&.MuiSvgIcon-root": {
      fontSize: "2rem",
      cursor: "pointer",

      "&:hover": {
        color: theme.palette.common.red,
      },
    },
  },
  searchFilterBtn: {
    "&.MuiButton-root": {
      ...theme.typography.btn,
      background: theme.palette.common.black,
      // color: theme.palette.common.grey,
      width: "100%",
    },
  },
}));

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
  const onSubmit = async (values, onSubmitProps) => {
    console.log(values);
    onSubmitProps.resetForm();
    handleDialogClose();
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
                <Grid item xs={12} marginTop={10}>
                  <Button
                    variant="contained"
                    type="submit"
                    className={classes.searchFilterBtn}
                    disabled={formik.isSubmitting || !(formik.dirty && formik.isValid)}
                  >
                    Search available HCP
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

ReferPatient.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  handleDialogClose: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
};

export default ReferPatient;
