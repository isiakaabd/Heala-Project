import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import NoData from "components/layouts/NoData";
import FormikControl from "components/validation/FormikControl";
import PropTypes from "prop-types";
import { Grid, TableRow, TableCell, Button, Checkbox, Input, Chip, Avatar } from "@mui/material";
import { useQuery } from "@apollo/client";
import { makeStyles } from "@mui/styles";
import Modals from "components/Utilities/Modal";
import Search from "components/Utilities/Search";
import FilterList from "components/Utilities/FilterList";
import CustomButton from "components/Utilities/CustomButton";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import EnhancedTable from "components/layouts/EnhancedTable";
import { hcpsHeadCells } from "components/Utilities/tableHeaders";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import displayPhoto from "assets/images/avatar.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { isSelected } from "helpers/isSelected";
import { getDoctorsProfile } from "components/graphQL/useQuery";

const specializations = [
  { key: "Dentistry", value: "Dentistry" },
  { key: "Pediatry", value: "Pediatry" },
  { key: "Optometry", value: "Optometry" },
  { key: "Pathology", value: "Pathology" },
];

// const statusType = ["Active", "Blocked"];

const useStyles = makeStyles((theme) => ({
  searchGrid: {
    "&.MuiGrid-root": {
      flex: 1,
      marginRight: "5rem",
    },
  },
  filterBtnGrid: {
    "&.MuiGrid-root": {
      marginRight: "3rem",
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
      maxWidth: "12rem",
      fontSize: "1rem",

      "&:hover": {
        background: "#fcfcfc",
      },

      "&:active": {
        background: "#fafafa",
      },

      "& .MuiButton-endIcon>*:nth-of-type(1)": {
        fontSize: ".85rem",
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

const Hcps = ({ setSelectedSubMenu, setSelectedHcpMenu }) => {
  const classes = useStyles();
  const theme = useTheme();

  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
    disabled: "#F7F7FF",
  };
  const [profiles, setProfiles] = useState("");
  const doctorProfile = useQuery(getDoctorsProfile);
  useEffect(() => {
    if (doctorProfile.data) {
      setProfiles(doctorProfile.data.doctorProfiles.data);
    }
  }, [doctorProfile]);

  const [searchHcp, setSearchHcp] = useState("");
  const [openHcpFilter, setOpenHcpFilter] = useState(false);
  const [openAddHcp, setOpenAddHcp] = useState(false);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    specialization: "",
    hospital: "",
    affliate: "",
    image: "",
    plan: "",
  };

  const validationSchema = Yup.object({
    affliate: Yup.string("Enter your affliate").required("Affliate is required"),
    plan: Yup.string("Select your plan").required("Hlan is required"),
    hospital: Yup.string("Enter your hospital").required("Hospital is required"),
    firstName: Yup.string("Enter your first Name").required("First name is required"),
    lastName: Yup.string("Enter your last Name").required("Last name is required"),
    specialization: Yup.string("Enter your specialization").required("Specialization is required"),
    email: Yup.string().email("Enter a valid email").required("Email is required"),
    phoneNumber: Yup.number("Enter a valid email").required("Phone Number is required"),
  });
  const onSubmit = (values) => {
    console.log(values);
  };
  const onSubmit1 = (values) => {
    console.log(values);
  };

  // FIltering modals select state
  const initialValues1 = {
    Fspecialization: "",
    Date: "",
    status: "",
    hospital: "",
  };
  const validationSchema1 = Yup.object({
    Date: Yup.string("Enter your Date").required("Date is required"),
    status: Yup.string("Select your status").required("status is required"),
    hospital: Yup.string("Enter your hospital").required("hospital is required"),
    Fspecialization: Yup.string("Enter your specialization").required("specialization is required"),
  });

  const { rowsPerPage, selectedRows, page } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();
  console.log(profiles);
  return (
    <Grid container direction="column" gap={2} flexWrap="nowrap" height="100%">
      <Grid item container>
        <Grid item className={classes.searchGrid}>
          <Search
            value={searchHcp}
            onChange={(e) => setSearchHcp(e.target.value)}
            placeholder="Type to search HCPs..."
            height="5rem"
          />
        </Grid>
        <Grid item className={classes.filterBtnGrid}>
          <FilterList onClick={() => setOpenHcpFilter(true)} title="Filter HCPs" />
        </Grid>
        <Grid item>
          <CustomButton
            endIcon={<AddIcon />}
            title="Add HCP"
            type={buttonType}
            onClick={() => setOpenAddHcp(true)}
          />
        </Grid>
      </Grid>
      <Grid item container height="100%" direction="column">
        {profiles.length > 0 ? (
          <EnhancedTable
            headCells={hcpsHeadCells}
            rows={profiles}
            page={page}
            paginationLabel="Patients per page"
            hasCheckbox={true}
          >
            {profiles
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row._id, selectedRows);
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
                      id={labelId}
                      scope="row"
                      align="center"
                      className={classes.tableCell}
                      style={{ color: theme.palette.common.grey, minWidth: "10rem" }}
                    >
                      {row.dociId}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      <div
                        style={{
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ marginRight: "1rem" }}>
                          <Avatar
                            alt={`Display Photo of ${row.name}`}
                            src={displayPhoto}
                            sx={{ width: 24, height: 24 }}
                          />
                        </span>
                        <span style={{ fontSize: "1.25rem" }}>
                          {row.firstName} {row.lastName}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell
                      align="center"
                      className={classes.tableCell}
                      style={{ color: theme.palette.common.grey }}
                    >
                      {row.specialization}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {row.consultation}
                    </TableCell>
                    <TableCell
                      align="center"
                      className={classes.tableCell}
                      style={{ color: theme.palette.common.grey }}
                    >
                      {row.hospital}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      <Chip
                        label={row.status}
                        className={classes.badge}
                        style={{
                          background:
                            row.status === "Active"
                              ? theme.palette.common.lightGreen
                              : theme.palette.common.lightRed,
                          color:
                            row.status === "Active"
                              ? theme.palette.common.green
                              : theme.palette.common.red,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        className={classes.button}
                        component={Link}
                        to={`hcps/${row.id}`}
                        endIcon={<ArrowForwardIosIcon />}
                        onClick={() => {
                          setSelectedSubMenu(3);
                          setSelectedHcpMenu(0);
                        }}
                      >
                        View HCP
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
      {/* Filter Modal */}
      <Modals
        isOpen={openHcpFilter}
        title="Filter"
        rowSpacing={5}
        handleClose={() => setOpenHcpFilter(false)}
      >
        <Formik
          initialValues={initialValues1}
          onSubmit={onSubmit1}
          validationSchema={validationSchema1}
          validateOnChange={false}
          validateOnMount
        >
          {({ isSubmitting, isValid, dirty }) => {
            return (
              <Form style={{ marginTop: "3rem" }}>
                <Grid item container direction="column" gap={1}>
                  <Grid item container rowSpacing={3}>
                    <Grid item container>
                      <FormikControl
                        control="input"
                        name="Date"
                        label="Date"
                        placeholder="Choose Date"
                      />
                    </Grid>
                    <Grid item container>
                      <FormikControl
                        control="select"
                        options={specializations}
                        name="Fspecialization"
                        label="Specialization"
                        placeholder="Select Specialization"
                      />
                    </Grid>
                    <Grid item container>
                      <FormikControl
                        control="select"
                        name="hospital"
                        options={specializations}
                        label="Hospital"
                        placeholder="Choose hospital"
                      />
                    </Grid>
                    <Grid item container>
                      <FormikControl
                        control="input"
                        name="status"
                        label="Select Status"
                        placeholder="Choose hospital"
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item marginTop={3}>
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
      {/* ADD HCP MODAL */}
      <Modals
        isOpen={openAddHcp}
        title="Add HCP"
        rowSpacing={5}
        height="90vh"
        handleClose={() => setOpenAddHcp(false)}
      >
        <>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            validateOnChange={false}
            validateOnMount
          >
            {({ isSubmitting, dirty, isValid }) => {
              return (
                <Form style={{ marginTop: "3rem" }}>
                  <Grid item container direction="column">
                    <Grid item>
                      <Grid container spacing={2}>
                        <Grid item md>
                          <FormikControl
                            control="input"
                            label="First Name"
                            labelId="firstName"
                            id="firstName"
                            name="firstName"
                            placeholder="Enter first name"
                          />
                        </Grid>
                        <Grid item md>
                          <FormikControl
                            control="input"
                            label="Last Name"
                            labelId="lastName"
                            id="lastName"
                            name="lastName"
                            placeholder="Enter last name"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item style={{ margin: "3rem 0" }}>
                      <Grid container spacing={2}>
                        <Grid item md>
                          <FormikControl
                            control="input"
                            type="email"
                            label="Email"
                            labelId="email"
                            id="email"
                            name="email"
                            placeholder="Enter email"
                          />
                        </Grid>
                        <Grid item md>
                          <FormikControl
                            control="input"
                            label="Phone Number"
                            labelId="phoneNumber"
                            id="phoneNumber"
                            name="phoneNumber"
                            placeholder="Enter phone number"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container spacing={2}>
                        <Grid item md>
                          <FormikControl
                            options={specializations}
                            control="select"
                            label="Plan"
                            name="plan"
                            placeholder="Select Plan"
                          />
                        </Grid>
                        <Grid item md>
                          <FormikControl
                            options={specializations}
                            control="select"
                            label=" Affliate"
                            labelId="Affliate"
                            name="affliate"
                            placeholder="Select Affliate"
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item style={{ margin: "3rem 0" }}>
                      <Grid container spacing={2}>
                        <Grid item md>
                          <FormikControl
                            control="input"
                            label="Specialization"
                            labelId="specialization"
                            id="specialization"
                            name="specialization"
                            placeholder="Enter specialization"
                          />
                        </Grid>
                        <Grid item md display="flex" alignItems="center">
                          <Grid
                            container
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                            gap={1}
                          >
                            <label htmlFor="contained-button-file">
                              <Input
                                accept="image/*"
                                id="contained-button-file"
                                multiple
                                type="file"
                                name="image"
                                style={{ display: "none" }}
                              />
                              <Button
                                variant="contained"
                                component="span"
                                className={classes.uploadBtn}
                              >
                                Upload Photo
                              </Button>
                            </label>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item container xs={12}>
                    <CustomButton
                      title="Add HCP"
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
        </>
      </Modals>
    </Grid>
  );
};

Hcps.propTypes = {
  setSelectedSubMenu: PropTypes.func.isRequired,
  setSelectedHcpMenu: PropTypes.func.isRequired,
};

export default Hcps;
