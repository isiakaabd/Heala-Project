import React from "react";
import t from "prop-types";
import { Formik, Form } from "formik";
import { Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import useAlert from "hooks/useAlert";
import { useMutation } from "@apollo/client";
import { CustomButton } from "components/Utilities";
import { FormikControl } from "components/validation";
import { CREATE_PLAN, UPDATE_PLAN } from "components/graphQL/Mutation";
import { addEditPlansValidationSchema } from "helpers/validationSchemas";

const CreateEditPlans = ({ type, initialValues, onSuccess }) => {
  const theme = useTheme();
  const [createPlan] = useMutation(CREATE_PLAN);
  const [updatePlan] = useMutation(UPDATE_PLAN);
  const { displayAlert, getErrorMsg, watchFunction } = useAlert();

  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
  };

  const onAddSubmit = async (values) => {
    try {
      const variables = {
        ...values,
        amount: Number(values.amount),
      };
      const createPlanRes = createPlan({
        variables: variables,
      });

      return watchFunction(
        "Plan created successfully.",
        "Couldn't create plan. Try again.",
        createPlanRes
      ).then(() => {
        onSuccess();
      });
    } catch (error) {
      console.error(error);
      const errMsg = getErrorMsg(error);
      displayAlert("error", errMsg);
    }
  };

  const onUpdateSubmit = async (values) => {
    try {
      const variables = {
        ...values,
        amount: Number(values.amount),
      };
      const updatePlanRes = updatePlan({
        variables: variables,
      });

      return watchFunction(
        "Plan updated successfully.",
        "Couldn't update plan. Try again.",
        updatePlanRes
      ).then(() => {
        onSuccess();
      });
    } catch (error) {
      console.error(error);
      const errMsg = getErrorMsg(error);
      displayAlert("error", errMsg);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) =>
        type === "edit"
          ? onUpdateSubmit({
              ...values,
            })
          : onAddSubmit({ ...values })
      }
      validationSchema={addEditPlansValidationSchema}
      validateOnChange={true}
      validateOnMount={false}
      validateOnBlur={true}
    >
      {({ isSubmitting, dirty, isValid, setFieldValue, setValues }) => {
        return (
          <Form style={{ marginTop: "1rem" }}>
            <Grid item container direction="column" gap={1}>
              <Grid item container rowSpacing={2}>
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
                    placeholder="Enter your Description"
                    name="description"
                    label="Description"
                  />
                </Grid>

                <Grid item container>
                  <FormikControl
                    control="input"
                    name="amount"
                    placeholder="Enter Amount"
                    label="Amount"
                  />
                </Grid>

                <Grid item xs={12}>
                  <CustomButton
                    title={type === "edit" ? "Save Plan" : "Add Plan"}
                    width="100%"
                    isSubmitting={isSubmitting}
                    disabled={isSubmitting}
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

CreateEditPlans.propTypes = {
  onSuccess: t.func.isRequired,
  initialValues: t.object.isRequired,
  type: t.string.isRequired,
};

export default CreateEditPlans;
