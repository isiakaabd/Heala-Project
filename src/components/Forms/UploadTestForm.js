import React from "react";
import t from "prop-types";
import { Formik, Form } from "formik";
import { useSnackbar } from "notistack";
import { useTheme } from "@mui/material/styles";
import { Alert, Grid, Typography } from "@mui/material";

import DragAndDrop from "./DragAndDrop";
import { useMutation } from "@apollo/client";
import { CustomButton } from "components/Utilities";
import { uploadTests } from "components/graphQL/Mutation";
import { uploadTestFileValidation } from "helpers/validationSchemas";
import {
  handleError,
  showErrorMsg,
  showSuccessMsg,
  uploadImage,
} from "../../helpers/filterHelperFunctions";

export const UploadTestForm = ({ onSuccess }) => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const [uploadTestFile] = useMutation(uploadTests);
  const [, setProgress] = React.useState(0);

  const addTestIntialValues = {
    testFile: null,
  };

  const onSubmit = async (values) => {
    const throwError = () =>
      showErrorMsg(
        enqueueSnackbar,
        "Something went wrong while uploading file."
      );
    try {
      const { testFile: file } = values;
      const fileUrl = await uploadImage(file, setProgress);

      if (typeof fileUrl !== "string") {
        throwError();
        return;
      }

      const { data } = await uploadTestFile({
        variables: {
          fileUrl: fileUrl,
        },
      });

      if (!data) {
        throwError();
        return;
      }

      const testAdded = data?.uploadDiagnosticLabTests?.result?.totalInserted;
      showSuccessMsg(
        enqueueSnackbar,
        Typography,
        `${testAdded && testAdded} Tests Added.`
      );
      onSuccess();
    } catch (error) {
      console.log("Error from onSubmit Test JSON file", error);
      handleError(error, enqueueSnackbar);
    }
  };

  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
  };

  return (
    <Formik
      initialValues={addTestIntialValues}
      onSubmit={onSubmit}
      validationSchema={uploadTestFileValidation}
      validateOnChange={false}
      validateOnMount={false}
      validateOnBlur={false}
    >
      {({ isSubmitting, dirty, isValid, setFieldValue, setErrors }) => {
        return (
          <Form style={{ marginTop: "1rem" }}>
            <Alert severity="warning" sx={{ margin: "1rem 0rem" }}>
              <strong>CAUTION - </strong> Uploading a new test JSON file will
              overwrite the current file.
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
                  disabled={!dirty || !isValid || isSubmitting}
                />
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

UploadTestForm.propTypes = {
  onSuccess: t.func.isRequired,
};
