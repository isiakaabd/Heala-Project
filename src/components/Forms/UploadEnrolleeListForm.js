import React, { useEffect, useState } from "react";
import t from "prop-types";
import { Formik, Form } from "formik";
import { Alert, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import DragAndDrop from "./DragAndDrop";
import { useLazyQuery } from "@apollo/client";
import { CustomButton } from "components/Utilities";
import { FormikControl } from "components/validation";
import { getPlans } from "components/graphQL/useQuery";
import { uploadEnrolleeFileValidationSchema } from "helpers/validationSchemas";

export const UploadEnrolleeListForm = ({ onSubmit }) => {
  const theme = useTheme();
  const [fetchPlans] = useLazyQuery(getPlans);
  const [planOptions, setPlanOptions] = useState([]);

  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
  };

  const initialValues = {
    planId: "",
    file: null,
  };

  useEffect(() => {
    fetchPlans({
      variables: { type: "hmo" },
    })
      .then(({ data }) => {
        const options = (data?.getPlans?.plan || []).map((option) => {
          return { key: option?.name, value: option?._id };
        });
        setPlanOptions(options);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  }, [fetchPlans]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => onSubmit(values)}
      validationSchema={uploadEnrolleeFileValidationSchema}
      validateOnChange={true}
      validateOnMount={false}
      validateOnBlur={true}
    >
      {({ isSubmitting, setFieldValue, setErrors }) => {
        return (
          <Form style={{ marginTop: "1rem" }}>
            <Alert severity="warning" sx={{ margin: "1rem 0rem" }}>
              <strong>CAUTION - </strong> Uploading a new file may overwrite the
              current file.
            </Alert>
            <Grid container direction="column" spacing={3}>
              <Grid item container direction="column" gap={1}>
                <FormikControl
                  control="select"
                  options={[{ key: "Plan", value: "" }, ...planOptions]}
                  placeholder="Select Heala Plan"
                  name="planId"
                />
              </Grid>
              <Grid item>
                <DragAndDrop
                  name="file"
                  maxFiles={1}
                  hasPreview={false}
                  uploadFunc={(file) => {
                    setErrors({});
                    setFieldValue("file", file);
                  }}
                />
              </Grid>
              <Grid item>
                <CustomButton
                  title="Upload file"
                  width="100%"
                  type={buttonType}
                  isSubmitting={isSubmitting}
                  disabled={isSubmitting}
                />
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

UploadEnrolleeListForm.propTypes = {
  onSubmit: t.func.isRequired,
};
