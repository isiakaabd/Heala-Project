import React from "react";
import PropTypes from "prop-types";
import CustomButton from "components/Utilities/CustomButton";
import { Grid } from "@mui/material";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { requestReferral } from "components/graphQL/Mutation";
import { getRefferals } from "components/graphQL/useQuery";
import { Formik, Form } from "formik";
import FormikControl from "components/validation/FormikControl";
import { useTheme } from "@mui/material/styles";
const checkbox2 = [{ key: "dentist", value: "dentist" }];
const checkbox1 = [{ key: "hcp", value: "hcp" }];

const validationSchema = Yup.object({
  type: Yup.string("choose a referral").required("Referral is required"),
  note: Yup.string("Enter your message").trim().required("note is required"),
  reason: Yup.string("State a reason").trim().required("reason is required"),
  specialization: Yup.string("select a specialization").required(
    "specialization is required"
  ),
});

const ReferPatient = ({ handleDialogClose, initialValues, type }) => {
  const [referPatient] = useMutation(requestReferral);
  const theme = useTheme();
  const onSubmit = async (values, onSubmitProps) => {
    if (type === "refer") {
      const { reason, patient, note, type, doctor, specialization } = values;
      await referPatient({
        variables: {
          doctor: doctor,
          patient: patient,
          type: type,
          reason: reason,
          note: note,
          specialization: specialization,
        },
        refetchQueries: [{ query: getRefferals }],
      });
    }

    onSubmitProps.resetForm();
    handleDialogClose();
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
      validateOnBlur={false}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnMount={false}
    >
      {({ isSubmitting, dirty, isValid }) => {
        return (
          <Form style={{ marginTop: "3rem" }}>
            <Grid item container direction="column" gap={1}>
              <Grid item container rowSpacing={2}>
                <Grid item container>
                  <FormikControl
                    control="select"
                    name="type"
                    options={checkbox1}
                    label="Referral Type"
                    placeholder="Select Type"
                  />
                </Grid>
                <Grid item container>
                  <FormikControl
                    control="input"
                    name="reason"
                    label="Reason"
                    placeholder="State Reason"
                  />
                </Grid>
                <Grid item container>
                  <FormikControl
                    control="textarea"
                    fLabel={false}
                    name="note"
                    label="Referral comment"
                    minRows={3}
                  />
                </Grid>
                <Grid item container>
                  <FormikControl
                    control="select"
                    name="specialization"
                    label="Specialization"
                    placeholder="Select specialization"
                    options={checkbox2}
                  />
                </Grid>
                <Grid item xs={12} marginTop={5}>
                  <CustomButton
                    title="Search available HCP"
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

ReferPatient.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  handleDialogClose: PropTypes.func,
  initialValues: PropTypes.object,
  type: PropTypes.string,
};

export default ReferPatient;
