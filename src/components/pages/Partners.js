import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import FormikControl from "components/validation/FormikControl";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { Button, Checkbox, TableCell, Avatar, TableRow, Grid, Typography } from "@mui/material";

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
  trucateProfileLink,
} from "helpers/filterHelperFunctions";
import DeletePartner from "components/modals/DeleteOrDisable";
import { partnersHeadCells } from "components/Utilities/tableHeaders";
import { EnhancedTable, NoData, EmptyTable } from "components/layouts";
import { addPartner, addPartnerCategory } from "components/graphQL/Mutation";
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
import Copy from "components/Copy";
import Filter from "components/Forms/Filters";

const Partners = () => {
  const theme = useTheme();
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
  const [fetchPartners, { loading, error, refetch, variables }] = useLazyQuery(getPartners, {
    notifyOnNetworkStatusChange: true,
  });

  const specializations = [
    { key: "Diagnostics", value: "Diagnostics" },
    { key: "Pharmacy", value: "Pharmacy" },
    { key: "Hospital", value: "Hospital" },
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
    image: null,
    provider: "",
  };

  const initialValues2 = {
    category: "",
  };

  const setTableData = async (response, errMsg) => {
    console.log("entered");
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
          }),
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
    let { name, email, specialization, provider, image } = values;
    name = name.trim();

    try {
      await addPartners({
        variables: {
          name,
          email,
          category: specialization,
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

  /* const onChange = async (e) => {
    setSearchPartner(e);
    if (e == "") {
      refetch();
    } else refetch({ dociId: `DOCI-${e.toUpperCase()}` });
  }; */

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
    displayAlert("error", `Something went wrong while filtering. Try again.`);
    setFilterValue(defaultVal);

    deleteVar(variables);

    const res = refetch();
    await setTableData(res, "couldn't filter table.");
  };

  if (error || categoryData.error) return <NoData error={error || categoryData.error} />;
  return (
    <Grid container direction="column" gap={{ sm: 4, xs: 2 }} flexWrap="nowrap" height="100%">
      <Grid item container gap={2} direction={{ md: "row", sm: "row", xs: "column" }}>
        {/* <Grid item flex={{ sm: 2, xs: 2, md: 2 }}>
          <Search
            value={searchPartner}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Type to search Partner..."
            height="5rem"
          />
        </Grid> */}
        <Grid
          item
          container
          justifyContent="space-between"
          alignItems="center"
          flex={{ sm: 1, xs: 1, md: 1 }}
        >
          <Grid item>
            <Filter
              label="By Category"
              onHandleChange={(e) => onFilterCategoryChange(e?.target?.value)}
              onClickClearBtn={() => onFilterCategoryChange("")}
              options={categoryFilterOptions}
              name="category"
              placeholder="None"
              value={partnerFilterValues.category}
              hasClearBtn={true}
              disable={loading}
            />
          </Grid>

          <Grid item>
            <CustomButton
              endIcon={<PersonAddAlt1Icon />}
              title="Add  Partner"
              type={darkButtonType}
              onClick={() => setOpenAddPartner(true)}
            />
          </Grid>
        </Grid>
      </Grid>
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
              });
              await setTableData(res, "Failed to change table limit.");
            }}
            dataPageInfo={pageInfo}
            handlePagination={async (page) => {
              const res = handlePageChange(fetchPartners, page, pageInfo, {});
              await setTableData(res, "Failed to change page.");
            }}
          >
            {partner.map((row, index) => {
              const isItemSelected = isSelected(row.id, selectedRows);

              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row._id}
                  selected={isItemSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      onClick={() => handleSelectedRows(row.id, selectedRows, setSelectedRows)}
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
                          alt={`Display Photo of ${row.name}`}
                          src={row.logoImageUrl}
                          sx={{ width: 24, height: 24 }}
                        />
                      </span>
                      <span style={{ fontSize: "1.25rem" }}>{row.name}</span>
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
                    {row.category}
                  </TableCell>
                  <TableCell
                    align="left"
                    className={classes.tableCell}
                    style={{
                      color: theme.palette.common.grey,
                      maxWidth: "20rem",
                    }}
                  >
                    {row?.profileUrl ? (
                      <Typography
                        style={{
                          color: theme.palette.common.grey,
                          maxWidth: "20rem",
                        }}
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        {trucateProfileLink(row?.profileUrl)}
                        <div style={{ marginLeft: "1rem" }}>
                          <Copy name="Profile Link" text={row?.profileUrl} />
                        </div>
                      </Typography>
                    ) : (
                      "No Link"
                    )}
                  </TableCell>
                  <TableCell align="center" className={classes.tableCell}>
                    {isDeleting[row._id] ? (
                      <Loader />
                    ) : (
                      <Button
                        variant="contained"
                        disableRipple
                        className={`${classes.tableBtn} ${classes.redBtn}`}
                        endIcon={<DeleteIcon color="error" />}
                        onClick={() => {
                          setPartnerToDelete(row?._id || "");
                          setOpenDeletePartner(true);
                        }}
                      >
                        Delete partner
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </EnhancedTable>
        </Grid>
      ) : (
        <EmptyTable headCells={partnersHeadCells} paginationLabel="Doctors per page" />
      )}
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
                <Grid item container spacing={2} style={{ marginBottom: "10rem" }}>
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
            return (
              <Form style={{ marginTop: "3rem" }}>
                <Grid container direction="column" gap={4}>
                  <Grid item container>
                    <Grid item container direction="column" gap={1}>
                      <Grid item container>
                        <Grid item container>
                          <FormikControl
                            control="input"
                            label="Name"
                            id="name"
                            name="name"
                            placeholder="Enter Partner name"
                          />
                        </Grid>
                      </Grid>
                      <Grid item container>
                        <Grid item container>
                          <FormikControl
                            control="input"
                            label="Email"
                            id="name"
                            name="email"
                            placeholder="Enter Email"
                          />
                        </Grid>
                      </Grid>

                      <Grid item container>
                        <Grid item container>
                          <FormikControl
                            control="select"
                            options={
                              [
                                { key: "Diagnostics", value: "diagnostics" },
                                { key: "Pharmacy", value: "pharmacy" },
                                { key: "Hospital", value: "hospital" },
                              ] || ""
                            }
                            name="specialization"
                            label="Category"
                            placeholder="Category"
                          />
                        </Grid>
                      </Grid>
                      {values.specialization === "hospital" ? (
                        <Grid item container>
                          <Grid item container>
                            <FormikControl
                              control="select"
                              options={dropDown || ""}
                              name="provider"
                              label="Provider"
                              id="provider"
                              placeholder="select Provider"
                            />
                          </Grid>
                        </Grid>
                      ) : null}
                      <Grid item container direction="column" gap={2}>
                        <Grid item container>
                          <Grid container spacing={2}>
                            <Grid item md>
                              <FormikControl
                                control="file"
                                name="image"
                                label="Company Logo"
                                setFieldValue={setFieldValue}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
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
            isDeleting,
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

export default Partners;
