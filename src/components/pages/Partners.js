import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import NoData from "components/layouts/NoData";
import * as Yup from "yup";
import FormikControl from "components/validation/FormikControl";
import { makeStyles } from "@mui/styles";
import Modals from "components/Utilities/Modal";
import Search from "components/Utilities/Search";
import FilterList from "components/Utilities/FilterList";
import CustomButton from "components/Utilities/CustomButton";
import DeletePartner from "components/modals/DeleteOrDisable";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";
import EnhancedTable from "components/layouts/EnhancedTable";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { isSelected } from "helpers/isSelected";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useQuery, useMutation } from "@apollo/client";
import { getPartners } from "components/graphQL/useQuery";
import { addPartner /*addPartnerCategory*/ } from "components/graphQL/Mutation";
// import { timeConverter } from "components/Utilities/Time";
import { partnersHeadCells } from "components/Utilities/tableHeaders";
import Loader from "components/Utilities/Loader";

import { Button, Checkbox, TableCell, Avatar, TableRow, Grid } from "@mui/material";
const useStyles = makeStyles((theme) => ({
  searchGrid: {
    "&.MuiGrid-root": {
      flex: 1,
      marginRight: "5rem",
    },
  },
  actionBtnGrid: {
    "&.MuiGrid-root": {
      marginRight: "1.5rem",
    },
  },
  button: {
    "&.MuiButton-root": {
      background: "#fff",
      color: theme.palette.common.grey,
      textTransform: "none",
      borderRadius: "2rem",
      display: "flex",
      alignItems: "center",
      padding: "0.5rem",
      maxWidth: "7rem",
      fontSize: ".85rem",

      "&:hover": {
        background: "#fcfcfc",
      },

      "&:active": {
        background: "#fafafa",
      },

      "& .MuiButton-endIcon>*:nth-of-type(1)": {
        fontSize: "0.85rem",
      },

      "& .MuiButton-endIcon": {
        marginLeft: ".2rem",
        marginTop: "-.2rem",
      },
    },
  },
  badge: {
    "&.MuiChip-root": {
      fontSize: "1.25rem !important",
      height: "2.7rem",
      borderRadius: "1.3rem",
    },
  },
  tableBtn: {
    "&.MuiButton-root": {
      ...theme.typography.btn,
      height: "3rem",
      fontSize: "1.25rem",
      borderRadius: "2rem",
      boxShadow: "none",

      "&:hover": {
        "& .MuiButton-endIcon>*:nth-of-type(1)": {
          color: "#fff",
        },
      },

      "&:active": {
        boxShadow: "none",
      },

      "& .MuiButton-endIcon>*:nth-of-type(1)": {
        fontSize: "1.5rem",
      },
    },
  },

  redBtn: {
    "&.MuiButton-root": {
      background: theme.palette.common.lightRed,
      color: theme.palette.common.red,

      "&:hover": {
        background: theme.palette.error.light,
        color: "#fff",
      },
    },
  },
  FormLabel: {
    "&.MuiFormLabel-root": {
      ...theme.typography.FormLabel,
    },
  },
  searchFilterBtn: {
    "&.MuiButton-root": {
      ...theme.typography.btn,
      background: theme.palette.common.black,
      width: "100%",
    },
  },
  uploadBtn: {
    "&.MuiButton-root": {
      ...theme.typography.btn,
      background: "#f2f2f2",
      boxShadow: "none",
      color: theme.palette.common.black,

      "&:hover": {
        background: "#f2f3f3",
        boxShadow: "none",
      },

      "&:active": {
        boxShadow: "none",
      },
    },
  },
}));

const Partners = () => {
  const classes = useStyles();
  const theme = useTheme();
  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
    disabled: theme.palette.common.black,
  };
  const redButton = {
    background: theme.palette.error.light,
    hover: theme.palette.error.light,
    active: theme.palette.error.dark,
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
    Name: Yup.string("Select your Name").required("Name is required"),
    cadre: Yup.string("Select your Cadre").required("Cadre is required"),
    date: Yup.string("Date your hospital").required("Date is required"),
    specialization: Yup.string("select your specialization").required("specialization is required"),
  });
  const initialValues1 = {
    name: "",
    email: "",
    specialization: "",
    image: null,
  };
  const initialValues2 = {
    category: "",
  };
  const validationSchema2 = Yup.object({
    category: Yup.string("select your Category").required("Category is required"),
  });
  const validationSchema1 = Yup.object({
    name: Yup.string("Enter your name").required("name is required"),
    image: Yup.string("Upload a single Image")
      .typeError("Pick correct image")
      .required("Image is required"),
    email: Yup.string().email("Enter a valid email").required("Email is required"),
    specialization: Yup.string("select your Specialization").required("Specialization is required"),
  });
  const [addPartners] = useMutation(addPartner);

  const onSubmit = (values) => {
    console.log(values);
  };
  const onSubmit2 = (values) => {
    console.log(values);
  };
  const onSubmit1 = async (values) => {
    const { name, email, specialization, image } = values;
    await addPartners({
      variables: {
        name,
        email,
        category: specialization,
        image,
      },
      refetchQueries: [{ query: getPartners }],
    });
  };

  const [searchPartner, setSearchPartner] = useState("");
  const [openFilterPartner, setOpenFilterPartner] = useState(false);
  const [openAddPartner, setOpenAddPartner] = useState(false);
  const [openDeletePartner, setOpenDeletePartner] = useState(false);
  const [openAddPartnerCategory, setAddPartnerCategory] = useState(false);

  const specializations = [
    { key: "Diagnostics", value: "diagnostics" },
    { key: "Dental", value: "Dental" },
    { key: "Pediatry", value: "Pediatry" },
    { key: "Optometry", value: "Optometry" },
    { key: "Pathology", value: "Pathology" },
  ];

  const { loading, error, data } = useQuery(getPartners);
  const [partner, setPartners] = useState([]);
  useEffect(() => {
    if (data) {
      setPartners(data.getPartners.data);
    }
  }, [data]);

  const { rowsPerPage, selectedRows, page } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();

  if (error) return <NoData error={error.message} />;
  if (loading) return <Loader />;
  return (
    <Grid container direction="column" gap={2} flexWrap="nowrap" height="100%">
      <Grid item container style={{ paddingBottom: "5rem" }}>
        <Grid item className={classes.searchGrid} gap={2}>
          <Search
            value={searchPartner}
            onChange={(e) => setSearchPartner(e.target.value)}
            placeholder="Type to search Patients..."
            height="5rem"
          />
        </Grid>
        <Grid item className={classes.actionBtnGrid}>
          <FilterList title="Filter Patners" onClick={() => setOpenFilterPartner(true)} />
        </Grid>
        <Grid item className={classes.actionBtnGrid}>
          <CustomButton
            endIcon={<PersonAddAlt1Icon />}
            title="Add  Partner Category"
            type={redButton}
            onClick={() => setAddPartnerCategory(true)}
          />
        </Grid>
        <Grid item>
          <CustomButton
            endIcon={<PersonAddAlt1Icon />}
            title="Add New Partner"
            type={darkButtonType}
            onClick={() => setOpenAddPartner(true)}
          />
        </Grid>
      </Grid>
      <Grid item container height="100%" direction="column">
        {partner.length > 0 ? (
          <EnhancedTable
            headCells={partnersHeadCells}
            rows={partner}
            page={page}
            paginationLabel="Patients per page"
            hasCheckbox={true}
          >
            {partner
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                      style={{ color: theme.palette.common.grey, maxWidth: "20rem" }}
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
        ) : (
          <NoData />
        )}
      </Grid>
      <Modals
        isOpen={openFilterPartner}
        title="Filter"
        rowSpacing={5}
        handleClose={() => setOpenFilterPartner(false)}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnMount
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
          validateOnMount
        >
          {({ isSubmitting, isValid, dirty, setFieldValue, setValues, values, errors }) => {
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
                            options={specializations}
                            name="specialization"
                            label="Category"
                            placeholder="Specialization"
                          />
                        </Grid>
                      </Grid>
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
          validateOnMount
        >
          {({ isSubmitting, isValid, dirty }) => {
            return (
              <Form style={{ marginTop: "3rem" }}>
                <Grid container direction="column" gap={4}>
                  <Grid item container>
                    <Grid item container direction="column" gap={1}>
                      <Grid item container>
                        <FormikControl
                          control="select"
                          options={specializations}
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
        onConfirm={() => console.log("confirmed")}
        confirmationMsg="delete partner"
      />
    </Grid>
  );
};

export default Partners;
