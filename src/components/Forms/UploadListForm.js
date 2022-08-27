import React from "react";
import t from "prop-types";
import { Formik, Form } from "formik";
import { Alert, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import DragAndDrop from "./DragAndDrop";
import { CustomButton } from "components/Utilities";
import { uploadFileValidationSchema } from "helpers/validationSchemas";

export const UploadListForm = ({ onSubmit, valSchema }) => {
  const theme = useTheme();
  const validationSchema = valSchema ? valSchema : uploadFileValidationSchema;

  const addTestIntialValues = {
    testFile: null,
  };

  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
  };

  return (
    <Formik
      initialValues={addTestIntialValues}
      onSubmit={(values) => onSubmit(values)}
      validationSchema={validationSchema}
      validateOnChange={true}
      validateOnMount={false}
      validateOnBlur={true}
    >
      {({ isSubmitting, dirty, isValid, setFieldValue, setErrors }) => {
        return (
          <Form style={{ marginTop: "1rem" }}>
            <Alert severity="warning" sx={{ margin: "1rem 0rem" }}>
              <strong>CAUTION - </strong> Uploading a new file may overwrite the
              current file.
            </Alert>
            <Grid container direction="column" space={2}>
              <Grid item>
                <DragAndDrop
                  name="testFile"
                  maxFiles={1}
                  hasPreview={false}
                  uploadFunc={(file) => {
                    setErrors({});
                    setFieldValue("testFile", file);
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

UploadListForm.propTypes = {
  onSubmit: t.func.isRequired,
  valSchema: t.object,
};
