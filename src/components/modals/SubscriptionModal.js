import React, { useEffect, useState } from "react";
import { CustomButton } from "components/Utilities";
import { Formik, Form } from "formik";
import FormikControl from "components/validation/FormikControl";
import { formatNumber } from "components/Utilities/Time";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { CREATE_PLAN, UPDATE_PLAN } from "components/graphQL/Mutation";
import { getSinglePlan, getPlans, getUsertypess } from "components/graphQL/useQuery";
import { useMutation, useQuery } from "@apollo/client";
import * as Yup from "yup";
import { useTheme } from "@mui/material/styles";

export const SubscriptionModal = ({
  handleDialogClose,
  type,
  setAlert,
  editId,
  setSingleData,
  initialValues,
  singleData,
}) => {
  const theme = useTheme();
  const [createPlan] = useMutation(CREATE_PLAN, {
    refetchQueries: [{ query: getPlans }],
  });
  const [updatePlan] = useMutation(UPDATE_PLAN, {
    refetchQueries: [{ query: getPlans }],
  });

  const single = useQuery(getSinglePlan, {
    variables: {
      id: editId,
    },
  });
  const validationSchema = Yup.object({
    name: Yup.string("Enter your Name").trim().required("Name is required"),
    amount: Yup.number("Enter your Amount")
      .typeError(" Enter a valid amount")
      .min(0, "Min value is  1")
      .required("Amount is required"),
    description: Yup.string("Enter Description").trim().required("Description is required"),
    provider: Yup.string("Enter Provider").trim().required("Provider is required"),
    duration: Yup.string("Enter Duration").trim().required("Duration is required"),
  });

  useEffect(() => {
    if (single.data && single.data.getPlan) {
      setSingleData({
        description: single.data.getPlan.description,
        name: single.data.getPlan.name,
        amount: formatNumber(Number(single.data.getPlan.amount)),
        duration: single.data.getPlan.duration,
        provider: single.data.getPlan.provider,
      });
    }
  }, [single.data, setSingleData]);
  const [dropDown, setDropDown] = useState([]);

  const { data } = useQuery(getUsertypess, {
    variables: {
      userTypeId: "61ed2354e6091400135e3d94",
    },
  });
  useEffect(() => {
    if (data) {
      const datas = data.getUserTypeProviders.provider;
      setDropDown(
        datas &&
          datas.map((i) => {
            return { key: i.name, value: i._id };
          }),
      );
    }
  }, [data]);

  const onSubmit = async (values, onSubmitProps) => {
    const { name, amount, description, duration, provider } = values;

    if (type === "edit") {
      try {
        await updatePlan({
          variables: {
            id: editId,
            name,
            amount: Number(amount),
            description,
            duration,
            provider,
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
            duration,
            provider,
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

  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
    disabled: theme.palette.common.black,
  };
  return (
    <Formik
      onSubmit={onSubmit}
      validateOnBlur={false}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnMount={false}
      initialValues={type === "edit" ? singleData : initialValues}
      enableReinitialize
    >
      {({ isSubmitting, dirty, values, isValid }) => {
        return (
          <Form style={{ marginTop: "3rem" }}>
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
                    name="amount"
                    // value={values.amount !== "" ? formatNumber(values.amount) : values.amount}
                    // value={values.amount}
                    placeholder="Enter Amount"
                    // onChange={() => handlechange(setFieldValue, values)} //
                    label="Amount"
                  />
                </Grid>
                <Grid item container>
                  <FormikControl
                    control="input"
                    placeholder="Enter Duration"
                    name="duration"
                    label="Duration"
                  />
                </Grid>
                <Grid item container>
                  <FormikControl
                    control="select"
                    placeholder="Enter Provider"
                    name="provider"
                    options={dropDown}
                    label="Provider"
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

                <Grid item xs={12}>
                  <CustomButton
                    title={type === "edit" ? "Save Plan" : "Add Plan"}
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

SubscriptionModal.propTypes = {
  handleDialogClose: PropTypes.func,
  setAlert: PropTypes.func,
  editId: PropTypes.string,
  type: PropTypes.string,
  edit: PropTypes.bool,
  initialValues: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  validationSchema: PropTypes.object,
  singleData: PropTypes.object,
  setSingleData: PropTypes.func,
};
