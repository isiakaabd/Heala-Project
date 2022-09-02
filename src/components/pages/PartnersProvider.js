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
import { useParams } from "react-router-dom";
import TableLayout from "components/layouts/TableLayout";
import isFirstDayOfMonth from "date-fns/isFirstDayOfMonth/index";

const PartnersProvider = () => {
  const theme = useTheme();
  const { id } = useParams();
  const classes = useStyles();
  const { displayAlert } = useAlert();
  /* const [setCategoryDatas] = useState([]); */
  const { setSelectedRows } = useActions();
  const { enqueueSnackbar } = useSnackbar();
  const [partner, setPartners] = useState([]);
  const [dropDown, setDropDown] = useState([]);
  const [addPartners] = useMutation(addPartner);
  const categoryData = useQuery(getSingleProvider);
  const [delete_partner] = useLazyQuery(DELETE_PARTNER);
  /*   const [searchPartner, setSearchPartner] = useState(""); */
  const [isDeleting, setIsDeleting] = useState({});
  const [addPartnerCat] = useMutation(addPartnerCategory);
  const { data: da, loading: load } = useQuery(getProviders);
  const [pageInfo, setPageInfo] = useState(defaultPageInfo);
  const [openAddPartner, setOpenAddPartner] = useState(false);
  const [openFilterPartner, setOpenFilterPartner] = useState(false);
  const [openDeletePartner, setOpenDeletePartner] = useState(false);
  const [partnerToDelete, setPartnerToDelete] = useState(null);
  const [partnerFilterValues, setPartnerFilterValues] = useState({
    category: "",
  });
  const { selectedRows /* page */ } = useSelector((state) => state.tables);
  const [openAddPartnerCategory, setAddPartnerCategory] = useState(false);
  const [fetchPartners, { loading, error, refetch, variables }] =
    useLazyQuery(getPartners);
  const [regenerate, { data: daa }] = useMutation(regeneratePartnerProfileUrl);

  const specializations = [
    { key: "Diagnostics", value: "Diagnostics" },
    { key: "Pharmacy", value: "Pharmacy" },
    { key: "Hospital", value: "Hospital" },
  ];
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
  const specializations5 = [
    { key: "Diagnostics", value: "Diagnostics" },
    { key: "Pharmacy", value: "Pharmacy" },
    { key: "Hospital", value: "Hospital" },
  ];

  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
    disabled: theme.palette.common.black,
  };

  const darkButtonType = {
    background: theme.palette.primary.main,
    hover: theme.palette.primary.light,
    active: theme.palette.primary.dark,
  };
  const initialValues = {
    Name: "",
    date: "",
    category: "",
  };

  const initialValues1 = {
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
    provider: "",
  };

  const initialValues2 = {
    category: "",
  };

  const setTableData = async (response, errMsg) => {
    response
      .then((res) => {
        const { data } = res;
        if (data) {
          setPartners(data?.getPartners?.data || []);
          setPageInfo(data?.getPartners?.pageInfo || defaultPageInfo);
        }
        if (!data) {
          setPartners(res?.getPartners?.data || []);
          setPageInfo(res?.getPartners?.pageInfo || defaultPageInfo);
        }
      })
      .catch((error) => {
        console.error(error);
        displayAlert("error", errMsg);
      });
  };

  const fetchPartnersData = async () => {
    const res = fetchPartners({
      variables: {
        first: pageInfo.limit,
        provider: id,
      },
    });
    setTableData(res, "Couldn't fetch Partners data");
  };

  useEffect(() => {
    fetchPartnersData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (da) {
      const datas = da.getProviders.provider;
      setDropDown(
        datas &&
          datas.map((i) => {
            return { key: i.name, value: i._id };
          })
      );
    }
  }, [da]);

  useEffect(() => {
    (partner || []).map((p) => {
      const newIsDeleting = isDeleting;
      setIsDeleting({ [p._id]: false, ...newIsDeleting });
      return null;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partner]);

  const onSubmit = (values) => {
    console.log(values);
  };

  const onSubmit2 = async (values, onSubmitProps) => {
    const { category } = values;

    try {
      const addCatRes = await addPartnerCat({
        variables: {
          name: category,
        },
      });

      if (addCatRes?.addPartner?.partner) {
        setAddPartnerCategory(false);
        onSubmitProps.resetForm();
        const res = refetch();
        setTableData(res, "Couldn't fetch partners.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit1 = async (values, onSubmitProps) => {
    console.log(values);
    let {
      name,
      email,
      category,
      phone,
      bank,
      specialization,
      provider,
      image,
      account,
    } = values;
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
          providerId: provider,
        },
        refetchQueries: [{ query: getPartners }],
      });
      enqueueSnackbar("Partner added successfully", {
        variant: "success",
      });
      onSubmitProps.resetForm();
      setOpenAddPartner(false);
    } catch (err) {
      console.log(err, "err");
      enqueueSnackbar("Email is already taken", {
        variant: "error",
      });
    }
  };

  const onFilterCategoryChange = async (value) => {
    try {
      deleteVar(variables);
      setPartnerFilterValues({ ...partnerFilterValues, category: value });
      const filterVariables = { category: value };

      const res = filterData(filterVariables, {
        fetchData: fetchPartners,
        refetch: refetch,
        variables: variables,
      });
      await setTableData(res, "couldn't filter table.");
    } catch (error) {
      console.error(error);
      refresh(setPartnerFilterValues, "");
    }
  };

  const refresh = async (setFilterValue, defaultVal) => {
    displayAlert("error", "Something went wrong while filtering. Try again.");
    setFilterValue(defaultVal);

    deleteVar(variables);

    const res = refetch();
    await setTableData(res, "couldn't filter table.");
  };
  const [newProfileUrl, setNewProfileUrl] = useState("");

  useEffect(() => {
    setNewProfileUrl(daa?.regeneratePartnerProfileUrl?.partner?.profileUrl);
  }, [daa]);
  const [Id, setId] = useState("");
  const handleGenerateLink = async (id) => {
    setId(id);
    await regenerate({
      variables: {
        id,
      },
      refetchQueries: [
        {
          query: getPartners,
          variables: {
            variables: pageInfo.page,
            limit: PageInfo.limit,
            provider: id,
          },
        },
      ],
    });
  };

  const z = (id) => {
    let b = "";
    const m = daa?.regeneratePartnerProfileUrl?.partner?._id;
    if (id === m) {
      b = m;
    } else {
      b = "";
    }
    return b;
  };
  useEffect(() => {
    partner.map((item) => {
      if (item._id === Id) {
        return {
          ...item,
          profileUrl: newProfileUrl,
        };
      }
    });

    //eslint-disable-next-line
  }, [Id, newProfileUrl]);
  if (error || categoryData.error)
    return <NoData error={error || categoryData.error} />;
  return (
    <Grid
      container
      direction="column"
      gap={{ sm: 4, xs: 2 }}
      flexWrap="nowrap"
      height="100%"
    >
      <Grid
        item
        container
        gap={2}
        direction={{ md: "row", sm: "row", xs: "column" }}
      >
        <Grid
          item
          container
          justifyContent="flex-end"
          alignItems="center"
          flex={{ sm: 1, xs: 1, md: 1 }}
        >
          <Grid item>
            <CustomButton
              endIcon={<PersonAddAlt1Icon />}
              title="Add "
              type={darkButtonType}
              onClick={() => setOpenAddPartner(true)}
            />
          </Grid>
        </Grid>
      </Grid>
      <TableLayout
        filters={
          <Filter
            onHandleChange={(e) => onFilterCategoryChange(e?.target?.value)}
            onClickClearBtn={() => onFilterCategoryChange("")}
            options={[{ key: "Category", value: "" }, ...categoryFilterOptions]}
            name="category"
            placeholder="None"
            value={partnerFilterValues.category}
            hasClearBtn={true}
            disable={loading}
          />
        }
      >
        {load || loading ? (
          <Loader />
        ) : partner.length > 0 ? (
          <Grid item container height="100%" direction="column">
            <EnhancedTable
              headCells={partnersHeadCells}
              rows={partner}
              paginationLabel="Partner per page"
              hasCheckbox={true}
              changeLimit={async (e) => {
                const res = changeTableLimit(fetchPartners, {
                  first: e,
                  provider: id,
                });
                await setTableData(res, "Failed to change table limit.");
              }}
              dataPageInfo={pageInfo}
              handlePagination={async (page) => {
                const res = handlePageChange(fetchPartners, page, pageInfo, id);
                await setTableData(res, "Failed to change page.");
              }}
            >
              {partner.map((row, index) => {
                const isItemSelected = isSelected(row.id, selectedRows);
                const labelId = `enhanced-table-checkbox-${index}`;
                const { _id, logoImageUrl, name, email, category } = row;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={_id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        onClick={() =>
                          handleSelectedRows(_id, selectedRows, setSelectedRows)
                        }
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      align="left"
                      className={classes.tableCell}
                      style={{ maxWidth: "20rem" }}
                    >
                      <div
                        style={{
                          height: "100%",
                          display: "flex",
                          alignItems: "left",
                        }}
                      >
                        <span style={{ marginRight: "1rem" }}>
                          <Avatar
                            alt={`Display Photo of ${name}`}
                            src={logoImageUrl}
                            sx={{ width: 24, height: 24 }}
                          />
                        </span>
                        <span style={{ fontSize: "1.25rem" }}>{name}</span>
                      </div>
                    </TableCell>
                    <TableCell
                      align="left"
                      className={classes.tableCell}
                      style={{
                        color: theme.palette.common.grey,
                        maxWidth: "20rem",
                      }}
                    >
                      {email}
                    </TableCell>
                    <TableCell
                      align="left"
                      className={classes.tableCell}
                      style={{
                        color: theme.palette.common.grey,
                        maxWidth: "20rem",
                      }}
                    >
                      {category}
                    </TableCell>

                    {/* <TableCell
                      align="left"
                      className={classes.tableCell}
                      style={{
                        color: theme.palette.common.grey,
                        maxWidth: "20rem",
                      }}
                    >
                      {profileUrl || z(_id) !== "" ? (
                        <Typography
                          style={{
                            color: theme.palette.common.grey,
                            maxWidth: "20rem",
                          }}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          {trucateProfileLink(profileUrl ? profileUrl : z(_id))}
                          <div style={{ marginLeft: "1rem" }}>
                            <Copy
                              name="Profile Link"
                              text={profileUrl ? profileUrl : z(_id)}
                            />
                          </div>
                        </Typography>
                      ) : (
                        <Button
                          variant="contained"
                          disableRipple
                          className={`${classes.tableBtn} ${classes.redBtn}`}
                          onClick={() => handleGenerateLink(_id)}
                        >
                          Generate Link
                        </Button>
                      )}
                    </TableCell> 
                    <TableCell align="center" className={classes.tableCell}>
                      {isDeleting[_id] ? (
                        <Loader />
                      ) : (
                        <Button
                          variant="contained"
                          disableRipple
                          className={`${classes.tableBtn} ${classes.redBtn}`}
                          endIcon={<DeleteIcon color="error" />}
                          onClick={() => {
                            setPartnerToDelete(_id || "");
                            setOpenDeletePartner(true);
                          }}
                        >
                          Delete partner
                        </Button>
                      )}
                    </TableCell>*/}
                  </TableRow>
                );
              })}
            </EnhancedTable>
          </Grid>
        ) : (
          <EmptyTable
            headCells={partnersHeadCells}
            paginationLabel="Doctors per page"
          />
        )}
      </TableLayout>
      <Modals
        isOpen={openFilterPartner}
        title="Filter"
        rowSpacing={5}
        width={{ sm: "40vw", xs: "90vw", md: "40vw" }}
        handleClose={() => setOpenFilterPartner(false)}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validateOnBlur={false}
          validationSchema={filterPartnersValidationSchema}
          validateOnChange={false}
          validateOnMount={false}
        >
          {({ isSubmitting, isValid, dirty }) => {
            return (
              <Form style={{ marginTop: "3rem" }}>
                <Grid item container direction="column" gap={3}>
                  <Grid item marginBottom={3}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <FormikControl
                          control="input"
                          name="Name"
                          label="Name"
                          placeholder="Select name"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormikControl
                          control="select"
                          options={specializations}
                          name="date"
                          label="Date"
                          placeholder="Choose Date"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  spacing={2}
                  style={{ marginBottom: "10rem" }}
                >
                  <Grid item xs={6}>
                    <FormikControl
                      control="select"
                      options={specializations}
                      name="category"
                      label="Category"
                      placeholder="Select Category"
                    />
                  </Grid>
                  {/* Placeholder grid */}
                  <Grid item md></Grid>
                </Grid>
                <Grid item container xs={12}>
                  <CustomButton
                    title="Apply Filter"
                    width="100%"
                    type={buttonType}
                    isSubmitting={isSubmitting}
                    disabled={!(dirty || isValid)}
                  />
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Modals>

      {/* ADD NEW PARTER MODAL */}
      <Modals
        isOpen={openAddPartner}
        title="Add Partners"
        rowSpacing={5}
        handleClose={() => setOpenAddPartner(false)}
      >
        <Formik
          initialValues={initialValues1}
          onSubmit={onSubmit1}
          validationSchema={addNewPartnerValidationSchema}
          validateOnChange={false}
          validateOnMount={false}
          validateOnBlur={false}
        >
          {({ isSubmitting, isValid, dirty, values, setFieldValue }) => {
            const { classification, category } = values;
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
                          options={categoryOptions}
                          name="category"
                          label="Category"
                          placeholder="Category"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormikControl
                          control="select"
                          options={banks}
                          name="bank"
                          label="Bank"
                          placeholder="Select Bank"
                        />
                      </Grid>
                    </Grid>
                    {category === "hospital" && (
                      <Grid item container flexWrap="nowrap" gap={2}>
                        <Grid item xs={6}>
                          <FormikControl
                            control="select"
                            options={dropDown}
                            name="provider"
                            label="Provider"
                            id="provider"
                            placeholder="Select Provider"
                          />
                        </Grid>
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
                      </Grid>
                    )}
                    <Grid item container flexWrap="nowrap" gap={2}>
                      <Grid item xs={6}>
                        <FormikControl
                          control="file"
                          name="image"
                          label="Company Logo"
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
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
                    <Grid item container flexWrap="nowrap">
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

      {/* Add Partner Category */}
      <Modals
        isOpen={openAddPartnerCategory}
        title="Add Partners Category"
        rowSpacing={5}
        handleClose={() => setAddPartnerCategory(false)}
      >
        <Formik
          initialValues={initialValues2}
          onSubmit={onSubmit2}
          validationSchema={addPartnerValidationSchema}
          validateOnChange={false}
          validateOnMount={false}
          validateOnBlur={false}
        >
          {({ isSubmitting, isValid, dirty }) => {
            return (
              <Form style={{ marginTop: "3rem" }}>
                <Grid container direction="column" gap={3}>
                  <Grid item container>
                    <Grid item container direction="column" gap={1}>
                      <Grid item container>
                        <FormikControl
                          control="select"
                          options={specializations5}
                          name="category"
                          label="Category"
                          placeholder="Specialization"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item container>
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
      <DeletePartner
        open={openDeletePartner}
        setOpen={setOpenDeletePartner}
        title="Delete Partner"
        btnValue="delete"
        onConfirm={async () => {
          const res = deleteItem(
            delete_partner,
            partnerToDelete,
            setPartnerToDelete,
            refetch,
            Typography,
            enqueueSnackbar,
            setIsDeleting,
            isDeleting
          );
          setOpenDeletePartner(false);
          await setTableData(res, "Couldn't refetch Partners");
        }}
        confirmationMsg="delete partner"
        onCancel={() => {
          setPartnerToDelete(null);
        }}
      />
    </Grid>
  );
};

export default PartnersProvider;
