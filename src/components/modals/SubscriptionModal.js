import React, { useEffect } from "react";

import { Formik, Form } from "formik";
import FormikControl from "components/validation/FormikControl";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { CREATE_PLAN, UPDATE_PLAN } from "components/graphQL/Mutation";
import { getSinglePlan } from "components/graphQL/useQuery";
import { useMutation, useQuery } from "@apollo/client";

const useStyles = makeStyles((theme) => ({
  btn: {
    "&.MuiButton-root": {
      ...theme.typography.btn,
      background: theme.palette.common.black,
      width: "100%",
    },
  },

  button: {
    "&.css-1zf5oc-MuiButtonBase-root-MuiButton-root": {
      background: "#fff",
      color: theme.palette.common.grey,
      textTransform: "none",
      borderRadius: "2rem",
      display: "flex",
      alignItems: "center",
      padding: "1rem",
      maxWidth: "15rem",

      "&:hover": {
        background: "#fcfcfc",
      },

      "&:active": {
        background: "#fafafa",
      },

      "& .css-9tj150-MuiButton-endIcon>*:nth-of-type(1)": {
        fontSize: "1.2rem",
      },

      "& .css-9tj150-MuiButton-endIcon": {
        marginLeft: ".3rem",
        marginTop: "-.2rem",
      },
    },
  },
}));

export const SubscriptionModal = ({
  handleDialogClose,
  type,
  setAlert,
  editId,
  setSingleData,
  initialValues,
  validationSchema,
}) => {
  const [createPlan] = useMutation(CREATE_PLAN);
  const [updatePlan] = useMutation(UPDATE_PLAN);

  const single = useQuery(getSinglePlan, {
    variables: {
      id: editId,
    },
  });

  useEffect(() => {
    if (single.data && single.data.getPlan) {
      setSingleData({
        description: single.data.getPlan.description,
        name: single.data.getPlan.name,
        amount: single.data.getPlan.amount,
      });
    }
  }, [single.data, setSingleData]);

  const classes = useStyles();

  const onSubmit = async (values, onSubmitProps) => {
    const { name, amount, description } = values;
    if (type === "edit") {
      try {
        await updatePlan({
          variables: {
            id: editId,
            name,
            amount: Number(amount),
            description,
          },
        });
        setAlert({
          message: "Plan successfully updated",
          type: "success",
        });
        setTimeout(() => {
          setAlert(null);
        }, 5000);
      } catch (error) {
        console.log(error);
      }
    } else if (type === "add") {
      try {
        await createPlan({
          variables: {
            name,
            amount: Number(amount),
            description,
          },
        });
        setAlert({
          message: "Plan successfully created",
          type: "success",
        });
        setTimeout(() => {
          setAlert(null);
        }, 5000);
      } catch (errors) {
        setAlert({
          message: errors.message,
          type: "danger",
        });
        setTimeout(() => {
          setAlert(null);
        }, 5000);
        console.log(errors);
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
      {(formik) => {
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
                    control="input"
                    placeholder="Enter Amount"
                    name="amount"
                    label="Amount"
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

                <Grid item xs={12} marginTop={10}>
                  <Button variant="contained" type="submit" className={classes.btn}>
                    {type === "edit" ? "Save Plan" : "Add Plan"}
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

SubscriptionModal.propTypes = {
  handleDialogClose: PropTypes.func.isRequired,
  setAlert: PropTypes.func,
  editId: PropTypes.string,
  type: PropTypes.string.isRequired,
  edit: PropTypes.bool,
  initialValues: PropTypes.object,
  validationSchema: PropTypes.object,
  setSingleData: PropTypes.func,
};
