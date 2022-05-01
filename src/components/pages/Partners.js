import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import FormikControl from "components/validation/FormikControl";
import { Button, Checkbox, TableCell, Avatar, TableRow, Grid } from "@mui/material";
import { FilterList, CustomButton, Loader, Modals, Search } from "components/Utilities";
import DeletePartner from "components/modals/DeleteOrDisable";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";
import { EnhancedTable, NoData, EmptyTable } from "components/layouts";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { isSelected } from "helpers/isSelected";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useQuery, useMutation } from "@apollo/client";
import { getPartners, getSingleProvider, getUsertypess } from "components/graphQL/useQuery";
import { addPartner, addPartnerCategory } from "components/graphQL/Mutation";
import { partnersHeadCells } from "components/Utilities/tableHeaders";
import { useStyles } from "styles/partnersPageStyles";

const Partners = () => {
  const classes = useStyles();
  const [dropDown, setDropDown] = useState([]);
  const { data: da, loading: load } = useQuery(getUsertypess, {
    variables: {
      userTypeId: "61ed2354e6091400135e3d94",
    },
  });

  useEffect(() => {
    if (da) {
      const datas = da.getUserTypeProviders.provider;
      setDropDown(
        datas &&
          datas.map((i) => {
            return { key: i.name, value: i._id };
          }),
      );
    }
  }, [da]);

  const [addPartnerCat] = useMutation(addPartnerCategory);
  const theme = useTheme();

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

  const validationSchema = Yup.object({
    Name: Yup.string("Select your Name").trim().required("Name is required"),
    cadre: Yup.string("Select your Cadre").trim().required("Cadre is required"),
    date: Yup.string("Date your hospital").required("Date is required"),
    specialization: Yup.string("select your specialization")
      .trim()
      .required("specialization is required"),
  });
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
  const validationSchema2 = Yup.object({
    category: Yup.string("select your Category").trim().required("Category is required"),
  });
  const validationSchema1 = Yup.object({
    name: Yup.string("Enter your name").trim().required("name is required"),
    image: Yup.string("Upload a single Image").required("Image is required"),
    email: Yup.string().email("Enter a valid email").trim().required("Email is required"),
    provider: Yup.string("select a provider").trim(),
    specialization: Yup.string("select your Specialization").required("Specialization is required"),
  });
  const [addPartners] = useMutation(addPartner);

  const onSubmit = (values) => {
    console.log(values);
  };
  const onSubmit2 = async (values, onSubmitProps) => {
    const { category } = values;

    await addPartnerCat({
      variables: {
        name: category,
      },
    });
    setAddPartnerCategory(false);
    onSubmitProps.resetForm();
  };
  const onConfirm = async () => {
    // try {
    //   await disableUser({
    //     variables: { id: hcpId },
    //     refetchQueries: [{ query: getDoctorsProfile }],
    //   });
    //   history.push("/hcps");
    // } catch (error) {
    //   console.log(error);
    // }
    // console.log(values);
  };
  const onSubmit1 = async (values, onSubmitProps) => {
    const { name, email, specialization, provider, image } = values;
    console.log(provider);

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
    setOpenAddPartner(false);
    onSubmitProps.resetForm();
  };

  const [searchPartner, setSearchPartner] = useState("");
  const [openFilterPartner, setOpenFilterPartner] = useState(false);
  const [openAddPartner, setOpenAddPartner] = useState(false);
  const [openDeletePartner, setOpenDeletePartner] = useState(false);
  const [openAddPartnerCategory, setAddPartnerCategory] = useState(false);

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
  const [setCategoryDatas] = useState([]);
  const { loading, error, data, refetch } = useQuery(getPartners, {
    notifyOnNetworkStatusChange: true,
  });
  const categoryData = useQuery(getSingleProvider);
  const [partner, setPartners] = useState([]);
  const onChange = async (e) => {
    setSearchPartner(e);
    if (e == "") {
      refetch();
    } else refetch({ dociId: `DOCI-${e.toUpperCase()}` });
  };
  useEffect(() => {
    if (data) {
      setPartners(data.getPartners.data);
    }
    // try {
    //   if (categoryData && categoryData.data) {
    //     const value = categoryData.data.getPartnerCategories.data;
    //     setCategoryDatas(
    //       value.map((i) => {
    //         return { key: i, value: i };
    //       }),
    //     );
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  }, [data, categoryData, setCategoryDatas]);

  const { selectedRows, page } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();

  if (error || categoryData.error) return <NoData error={error || categoryData.error} />;
  if (loading || load) return <Loader />;
  return (
    <Grid container direction="column" gap={2} flexWrap="nowrap" height="100%">
      <Grid item container style={{ paddingBottom: "5rem" }}>
        <Grid item className={classes.searchGrid} gap={2}>
          <Search
            value={searchPartner}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Type to search Partner..."
            height="5rem"
          />
        </Grid>
        <Grid item className={classes.actionBtnGrid}>
          <FilterList title="Filter Patners" onClick={() => setOpenFilterPartner(true)} />
        </Grid>
        {/* <Grid item className={classes.actionBtnGrid}>
          <CustomButton
            endIcon={<PersonAddAlt1Icon />}
            title="Add  Partner Category"
            type={redButton}
            onClick={() => setAddPartnerCategory(true)}
          />
        </Grid> */}
        <Grid item>
          <CustomButton
            endIcon={<PersonAddAlt1Icon />}
            title="Add New Partner"
            type={darkButtonType}
            onClick={() => setOpenAddPartner(true)}
          />
        </Grid>
      </Grid>
      {partner.length > 0 ? (
        <Grid item container height="100%" direction="column">
          <EnhancedTable
            headCells={partnersHeadCells}
            rows={partner}
            page={page}
            type="editRole"
            paginationLabel="Partner per page"
            hasCheckbox={true}
          >
            {partner
              // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
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
                    <TableCell align="center" className={classes.tableCell}>
                      <Button
                        variant="contained"
                        disableRipple
                        className={`${classes.tableBtn} ${classes.redBtn}`}
                        endIcon={<DeleteIcon color="error" />}
                        onClick={() => setOpenDeletePartner(true)}
                      >
                        Delete partner
                      </Button>
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
        handleClose={() => setOpenFilterPartner(false)}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validateOnBlur={false}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnMount={false}
        >
          {({ isSubmitting, isValid, dirty }) => {
            return (
              <Form style={{ marginTop: "3rem" }}>
                <Grid item container direction="column" gap={3}>
                  <Grid item marginBottom={3}>
                    <Grid container spacing={2}>
                      <Grid item md>
                        <FormikControl
                          control="input"
                          name="Name"
                          label="Name"
                          placeholder="Select name"
                        />
                      </Grid>
                      <Grid item md>
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
                  <Grid item md>
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
          validationSchema={validationSchema1}
          validateOnChange={false}
          validateOnMount={false}
          validateOnBlur={false}
        >
          {({ isSubmitting, isValid, dirty, values, setFieldValue }) => {
            console.log(values);
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
                            placeholder="Enter last name"
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
                                { key: "Diagnostics", value: "Diagnostics" },
                                { key: "Pharmacy", value: "Pharmacy" },
                                { key: "Hospital", value: "Hospital" },
                              ] || ""
                            }
                            name="specialization"
                            label="Category"
                            placeholder="Category"
                          />
                        </Grid>
                      </Grid>
                      {values.specialization === "Hospital" ? (
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
          validationSchema={validationSchema2}
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
        onConfirm={onConfirm}
        confirmationMsg="delete partner"
      />
    </Grid>
  );
};

export default Partners;
