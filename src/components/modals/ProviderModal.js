import React, { useEffect, useState } from "react";
import { CustomButton } from "components/Utilities";
import { Formik, Form } from "formik";
import FormikControl from "components/validation/FormikControl";
import * as Yup from "yup";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { addProvider, editprovider } from "components/graphQL/Mutation";
import { getProviders, getCategory, getUserTypes } from "components/graphQL/useQuery";
import { useMutation, useQuery } from "@apollo/client";
import { useTheme } from "@mui/material/styles";

const ProviderModal = ({
  handleDialogClose,
  type,
  setSingleData,
  initialValues,
  editId,
  singleData,
}) => {
  const theme = useTheme();
  const [createProvider] = useMutation(addProvider);
  const [editProvider] = useMutation(editprovider);

  const single = useQuery(getCategory, {
    variables: {
      id: editId,
    },
  });
  const [dropDown, setDropDown] = useState([]);
  const userType = useQuery(getUserTypes);
  useEffect(() => {
    if (userType.data) {
      const data = userType.data.getUserTypes.userType;
      setDropDown(
        data &&
          data.map((i) => {
            return { key: i.name, value: i._id, id: i._id };
          }),
      );
    }
  }, [userType.data]);

  useEffect(() => {
    if (single.data) {
      setSingleData({
        name: single.data.getProvider.name,
        type: single.data.getProvider.userTypeId,
        image: single.data.getProvider.icon,
        id: single.data.getProvider._id,
        iconAlt: single.data.getProvider.iconAlt,
      });
    }
  }, [single.data, setSingleData]);

  const validationSchema = Yup.object({
    name: Yup.string("Enter your Name").trim().required("Name is required"),
    type: Yup.string("Select your type").required("Type is required"),
    image: Yup.string("Upload a single Image").required("Image is required"),
    iconAlt: Yup.string("Upload an alternate Image").required("Alt. image is required"),
  });

  // const checkbox1 = [{ key: "61ca1a53cebadf0584e38723", value: "61ca1a53cebadf0584e38723" }];
  const onSubmit = async (values, onSubmitProps) => {
    console.log(values);
    if (type === "add") {
      const { name, type, image, iconAlt } = values;
      await createProvider({
        variables: {
          name,
          icon: image,
          iconAlt,
          userTypeId: type,
        },
        refetchQueries: [{ query: getProviders }],
      });
    }
    if (type === "edit") {
      const { name, type, image, id, iconAlt } = values;
      await editProvider({
        variables: {
          id,
          name,
          icon: image,
          iconAlt,
          userTypeId: type,
        },
        refetchQueries: [{ query: getProviders }],
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
      onSubmit={onSubmit}
      validateOnBlur={false}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnMount={false}
      initialValues={type === "edit" ? singleData : initialValues}
      enableReinitialize
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
                    label="Name of Provider"
                    placeholder="Enter Provider Name"
                  />
                </Grid>
                <div style={{ display: "none" }} name="id" />
                <Grid item container>
                  <FormikControl
                    control="select"
                    options={dropDown}
                    placeholder="Select user types"
                    name="type"
                    label="User Types"
                  />
                </Grid>

                <Grid item container>
                  <Grid item container md>
                    <FormikControl
                      control="file"
                      name="image"
                      label="Upload Your Logo"
                      setFieldValue={setFieldValue}
                    />
                  </Grid>
                </Grid>
                <Grid item container>
                  <Grid item container md>
                    <FormikControl
                      control="file"
                      name="iconAlt"
                      label="Upload Alternate Logo"
                      setFieldValue={setFieldValue}
                    />
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <CustomButton
                    title={type === "edit" ? "Save Provider" : "Add Provider"}
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
export default ProviderModal;
ProviderModal.propTypes = {
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
