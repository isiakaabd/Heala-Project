import React, { useEffect } from "react";
import CustomButton from "components/Utilities/CustomButton";
import { Formik, Form } from "formik";
import FormikControl from "components/validation/FormikControl";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { useMutation, useQuery } from "@apollo/client";
import { getUserTypes, getUserType } from "components/graphQL/useQuery";
import { createUserType, editUserType } from "components/graphQL/Mutation";
import * as Yup from "yup";
import { useTheme } from "@mui/material/styles";

export const UserTypeModal = ({
  handleDialogClose,
  type,
  setAlert,
  editId,
  singleData,
  setSingleData,
  initialValues,
}) => {
  const theme = useTheme();
  const [createType] = useMutation(createUserType, {
    refetchQueries: [{ query: getUserTypes }],
  });
  const [editType] = useMutation(editUserType, {
    refetchQueries: [{ query: getUserTypes }],
  });

  const single = useQuery(getUserType, {
    variables: {
      id: editId,
    },
  });

  useEffect(() => {
    if (single.data) {
      setSingleData({
        name: single.data.getUserType.name,
        image: single.data.getUserType.icon,
        id: single.data.getUserType._id,
      });
    }
  }, [single.data, setSingleData]);
  //   const [updatePlan] = useMutation(UPDATE_PLAN);

  //   const single = useQuery(getSinglePlan, {
  //     variables: {
  //       id: editId,
  //     },
  //   });
  const validationSchema = Yup.object({
    name: Yup.string("Enter your Name").required("Name is required"),
    image: Yup.string("Upload a single Image").required("Image is required"),
  });

  const onSubmit = async (values, onSubmitProps) => {
    const { name, image } = values;
    if (type == "add") {
      try {
        await createType({ variables: { name, icon: image } });
      } catch (err) {
        console.log(err);
      }
    }
    if (type === "edit") {
      const { name, image, id } = values;
      await editType({
        variables: {
          id,
          name,
          icon: image,
        },
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
      initialValues={type === "edit" ? singleData : initialValues}
      enableReinitialize
      onSubmit={onSubmit}
      validateOnBlur={false}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnMount={false}
    >
      {({ isSubmitting, dirty, isValid, setFieldValue }) => {
        return (
          <Form style={{ marginTop: "3rem" }}>
            <Grid item container direction="column" gap={1}>
              <Grid item container rowSpacing={3}>
                <Grid item container>
                  <FormikControl
                    control="input"
                    name="name"
                    label="Name of UserType"
                    placeholder="Enter UserType Name"
                  />
                </Grid>
                <Grid item md display="flex" alignItems="center">
                  <Grid item container md>
                    <FormikControl
                      control="file"
                      name="image"
                      label="Upload Your Logo"
                      setFieldValue={setFieldValue}
                    />
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <CustomButton
                    title={type === "edit" ? "Save UserTypes" : "Add UserTypes"}
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

UserTypeModal.propTypes = {
  handleDialogClose: PropTypes.func.isRequired,
  setAlert: PropTypes.func,
  editId: PropTypes.string,
  type: PropTypes.string.isRequired,
  edit: PropTypes.bool,
  initialValues: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  validationSchema: PropTypes.object,
  singleData: PropTypes.object,
  setSingleData: PropTypes.func,
};
