import React from "react";
import t from "prop-types";
import { Formik, Form } from "formik";
import { useSnackbar } from "notistack";
import { useTheme } from "@mui/material/styles";
import { Grid, Typography } from "@mui/material";

import { useMutation } from "@apollo/client";
import { CustomButton } from "components/Utilities";
import { FormikControl } from "components/validation";
import { addTest, uploadTests } from "components/graphQL/Mutation";
import { addTestValidation, uploadTestFileValidation } from "helpers/validationSchemas";
import { handleError, showSuccessMsg } from "../../helpers/filterHelperFunctions";
import DragAndDrop from "./DragAndDrop";

export const UploadTestForm = ({ onSuccess }) => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const [uploadTestFile] = useMutation(uploadTests);

  const addTestIntialValues = {
    testFile: null,
  };

  const onSubmit = async (values) => {
    console.log(values);
    try {
      const uploadRes = await uploadTestFile({
        variables: {
          fileUrl: values?.testFile,
        },
      });
      console.log("res", uploadRes);
      onSuccess();
    } catch (error) {
      console.log("couldn't upload file", error);
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
      {({ isSubmitting, dirty, isValid, setFieldValue, setValues }) => {
        return (
          <Form style={{ marginTop: "1rem" }}>
            <Grid container direction="column" space={2}>
              <Grid item>
                <DragAndDrop name="testFile" setFieldValue={setFieldValue} maxFiles={1} />
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
  onSuccess: t.func,
};
