import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import FormikControl from "components/validation/FormikControl";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import {
  Checkbox,
  TableCell,
  Avatar,
  TableRow,
  Button,
  Grid,
  Typography,
} from "@mui/material";

import useAlert from "hooks/useAlert";
import { isSelected } from "helpers/isSelected";
import { categoryFilterOptions, defaultPageInfo } from "helpers/mockData";
import { useStyles } from "styles/partnersPageStyles";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import {
  changeTableLimit,
  deleteItem,
  deleteVar,
  filterData,
  handlePageChange,
  banks,
} from "helpers/filterHelperFunctions";
import DeletePartner from "components/modals/DeleteOrDisable";
import { partnersHeadCells } from "components/Utilities/tableHeaders";
import { EnhancedTable, NoData, EmptyTable } from "components/layouts";
import {
  addPartner,
  addPartnerCategory,
  regeneratePartnerProfileUrl,
} from "components/graphQL/Mutation";
import {
  getPartners,
  getSingleProvider,
  getProviders,
  DELETE_PARTNER,
} from "components/graphQL/useQuery";
import { CustomButton, Loader, Modals } from "components/Utilities";
import {
  addNewPartnerValidationSchema,
  addPartnerValidationSchema,
  filterPartnersValidationSchema,
} from "helpers/validationSchemas";
import Filter from "components/Forms/Filters";
import { PageInfo } from "components/graphQL/fragment";
import TableLayout from "components/layouts/TableLayout";
import { useParams } from "react-router-dom";
import { EditDelBtn } from "components/Buttons/EditDelBtn";

const AddPartner = ({ open, handleClose, category, CategoryValue, id }) => {
  const theme = useTheme();
  const onSubmit = () => {};
  const { data: da, loading: load } = useQuery(getProviders);
  // const initialValues = {};
  const categoryOptions = [
    { key: "Diagnostics", value: "diagnostics" },
    { key: "Pharmacy", value: "pharmacy" },
    { key: "Hospital", value: "hospital" },
  ];
  const classificationOptions = [
    { key: "Primary Healthcare", value: "Primary Healthcare" },
    { key: "Secondary Healthcare", value: "Secondary Healthcare" },
  ];

  const specializationOptions = [
    { key: "Dental Care", value: "Dental Care" },
    { key: "Eye Clinic", value: "Eye Clinic" },
    { key: "Skin Care", value: "Skin Care" },
    { key: "Mental Care", value: "Mental Care" },
  ];

  const initialValues = {
    name: "",
    email: "",
    specialization: "",
    category: "",
    account: "",
    address: "",
    phone: "",
    classification: "",
    bank: "",
    image: null,
  };

  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
    disabled: theme.palette.common.black,
  };

  //   const onSubmit = (values) => {
  //     console.log(values);
  //   };

  // const onSubmit2 = async (values, onSubmitProps) => {
  //   const { category } = values;

  //   try {
  //     const addCatRes = await addPartnerCat({
  //       variables: {
  //         name: category,
  //       },
  //     });

  //     if (addCatRes?.addPartner?.partner) {
  //       setAddPartnerCategory(false);
  //       onSubmitProps.resetForm();
  //       const res = refetch();
  //       setTableData(res, "Couldn't fetch partners.");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const { enqueueSnackbar } = useSnackbar();
  const { displayAlert } = useAlert();
  const [addPartners] = useMutation(addPartner);
  const onSubmit1 = async (values, onSubmitProps) => {
    console.log(values);
    let { name, email, phone, category, bank, specialization, image, account } =
      values;
    name = name.trim();

    try {
      await addPartners({
        variables: {
          name,
          email,
          category,
          specialization,
          account,
          phone,
          bank,
          logoImageUrl: image,
          providerId: id,
        },
        refetchQueries: [
          {
            query: getPartners,
            variables: {
              providerId: id,
            },
          },
        ],
      });
      displayAlert("success", "Partner added successfully");
      onSubmitProps.resetForm();
      handleClose();
    } catch (err) {
      console.log(err, "err");
      displayAlert("error", err);
    }
  };
  return (
    <Modals
      isOpen={open}
      title="Add Partner"
      rowSpacing={5}
      handleClose={handleClose}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit1}
        validationSchema={addNewPartnerValidationSchema}
        validateOnChange={false}
        validateOnMount={false}
        validateOnBlur={false}
      >
        {({ isSubmitting, isValid, dirty, values, errors, setFieldValue }) => {
          const { classification, category: cat } = values;
          return (
            <Form style={{ marginTop: "1rem" }}>
              <Grid container direction="column" gap={1.5}>
                <Grid item container>
                  <Grid item container flexWrap="nowrap" gap={2}>
                    <Grid item xs={6}>
                      <FormikControl
                        control="input"
                        label="Name"
                        id="name"
                        name="name"
                        placeholder="Enter Partner name"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormikControl
                        control="input"
                        label="Email"
                        id="name"
                        name="email"
                        placeholder="Enter Email"
                      />
                    </Grid>
                  </Grid>
                  <Grid item container flexWrap="nowrap" gap={2}>
                    <Grid item xs={6}>
                      <FormikControl
                        control="input"
                        label=" Account Number"
                        id="account"
                        name="account"
                        placeholder="Enter Account Number"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormikControl
                        control="input"
                        label="Phone Number"
                        id="phone"
                        name="phone"
                        placeholder="Enter Phone Number"
                      />
                    </Grid>
                  </Grid>

                  <Grid item container flexWrap="nowrap" gap={2}>
                    <Grid item xs={6}>
                      <FormikControl
                        control="select"
                        options={banks}
                        name="bank"
                        label="Bank"
                        placeholder="Select Bank"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormikControl
                        control="select"
                        options={categoryOptions}
                        name="category"
                        label="Category"
                        placeholder="Category"
                      />
                    </Grid>
                  </Grid>

                  <Grid item container flexWrap="nowrap" gap={2}>
                    <Grid item xs={6}>
                      <FormikControl
                        control="file"
                        name="image"
                        label="Company Logo"
                        setFieldValue={setFieldValue}
                      />
                    </Grid>
                    {cat === "hospital" && (
                      <Grid item xs={6}>
                        <FormikControl
                          control="select"
                          options={classificationOptions}
                          name="classification"
                          label="Classification"
                          id="classification"
                          placeholder="select classification"
                        />
                      </Grid>
                    )}
                  </Grid>
                  <Grid item container>
                    {classification === "Secondary Healthcare" && (
                      <Grid item xs={6}>
                        <FormikControl
                          control="select"
                          options={specializationOptions}
                          name="specialization"
                          label="Specialization"
                          id="specialization"
                          placeholder="Select Specialization"
                        />
                      </Grid>
                    )}
                  </Grid>
                  <Grid item container>
                    <FormikControl
                      control="textarea"
                      name="address"
                      minRows={3}
                      label="Address"
                      placeholder="Enter address"
                    />
                  </Grid>
                </Grid>
                <Grid item container sx={{ mt: 1 }}>
                  <CustomButton
                    title="Add Partner"
                    width="100%"
                    type={buttonType}
                    isSubmitting={isSubmitting}
                    disabled={!(dirty || isValid)}
                  />
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </Modals>
  );
};

export default AddPartner;
