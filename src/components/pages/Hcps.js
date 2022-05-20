import React, { useState, useCallback, useEffect } from "react";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMutation, useLazyQuery } from "@apollo/client";
import { Grid, TableRow, TableCell, Button, Checkbox, Chip, Avatar } from "@mui/material";
import { debounce } from "lodash";
import Filter from "../Forms/Filters/index";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import { isSelected } from "helpers/isSelected";
import displayPhoto from "assets/images/avatar.svg";
import { useActions } from "components/hooks/useActions";
import { timeConverter } from "components/Utilities/Time";
import { handleSelectedRows } from "helpers/selectedRows";
import { useStyles } from "../../styles/doctorsPageStyles";
import FormikControl from "components/validation/FormikControl";
import { getDoctorsProfile } from "components/graphQL/useQuery";
import { hcpsHeadCells } from "components/Utilities/tableHeaders";
import { createDOctorProfile } from "components/graphQL/Mutation";
import { ClearFiltersBtn } from "components/Buttons/ClearFiltersBtn";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { NoData, EmptyTable, EnhancedTable } from "components/layouts";
import { addDoctorValidationSchema } from "../../helpers/validationSchemas";
import { Search, Loader, Modals, CustomButton } from "components/Utilities";
import {
  changeTableLimit,
  fetchMoreData,
  onFilterValueChange,
  resetFilters,
} from "../../helpers/filterHelperFunctions";
import {
  addDocInitialValues,
  cadreFilterBy,
  defaultPageInfo,
  docCadreOptions,
  docSpecializationsOptions,
  doctorsPageDefaultFilterValues,
  genderType,
  providerFilterBy,
  specializationFilterBy,
  statusFilterBy,
} from "../../helpers/mockData";

const Hcps = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [profiles, setProfiles] = useState("");
  const [pageInfo, setPageInfo] = useState(defaultPageInfo);
  // const [searchHcp, setSearchHcp] = useState("");
  const [openAddHcp, setOpenAddHcp] = useState(false);
  const [createDoc] = useMutation(createDOctorProfile);
  const { selectedRows } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();
  const [filterValues, setFilterValues] = useState(doctorsPageDefaultFilterValues);

  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
  };

  const [fetchDoctors, { data, error, loading, refetch, variables }] =
    useLazyQuery(getDoctorsProfile);

  //eslint-disable-next-line
  const debouncer = useCallback(debounce(fetchDoctors, 3000), []);

  useEffect(() => {
    fetchDoctors({
      variables: {
        first: pageInfo.limit,
      },
    });
  }, [fetchDoctors, pageInfo]);

  useEffect(() => {
    if (data) {
      setProfiles(data.doctorProfiles.profile);
      setPageInfo(data.doctorProfiles.pageInfo);
    }
  }, [data]);

  const onSubmit = async (values) => {
    const {
      createdAt,
      updatedAt,
      firstName,
      lastName,
      gender,
      phone,
      email,
      hospital,
      dociId,
      specialization,
      dob,
      cadre,
      image,
    } = values;
    const correctDOB = timeConverter(dob);
    await createDoc({
      variables: {
        dociId,
        createdAt,
        updatedAt,
        firstName,
        lastName,
        gender,
        phoneNumber: phone,
        email,
        hospital,
        specialization,
        dob: correctDOB,
        cadre,
        image,
        providerId: "61db6f8968b248001aec4fcb",
      },
      refetchQueries: [{ query: getDoctorsProfile }],
    });
    setOpenAddHcp(false);
  };

  if (error) return <NoData error={error} />;
  return (
    <Grid container direction="column" gap={2} flexWrap="nowrap" height="100%">
      <Grid item container>
        <Grid item className={classes.searchGrid}>
          <Search
            onChange={(e) => {
              let value = e.target.value;

              if (value !== "") {
                return debouncer({
                  variables: { dociId: `HEALA-${value.toUpperCase()}` },
                });
              }
            }}
            // debouncer
            // onChange={(e) => onChange(e.target.value)}
            placeholder="Type to search Doctors by Heala ID e.g AJV9WVIP6M"
            height="5rem"
          />
        </Grid>
        <Grid item>
          <CustomButton
            endIcon={<AddIcon />}
            title="Add Doctor"
            type={buttonType}
            onClick={() => setOpenAddHcp(true)}
          />
        </Grid>
      </Grid>
      {/* ========= FILTERS =========== */}
      <Grid container gap={2} flexWrap="wrap" className={classes.searchFilterContainer}>
        {/* FILTER BY GENDER */}
        <Grid item>
          <Filter
            onHandleChange={(e) =>
              onFilterValueChange(
                e,
                "gender",
                filterValues,
                setFilterValues,
                fetchDoctors,
                variables,
                refetch,
              )
            }
            options={genderType}
            name="gender"
            placeholder="By gender"
            value={filterValues.gender}
          />
        </Grid>
        {/* ========= FILTER BY SPECIALIZATION =========== */}
        <Grid item>
          <Filter
            onHandleChange={(e) =>
              onFilterValueChange(
                e,
                "specialization",
                filterValues,
                setFilterValues,
                fetchDoctors,
                variables,
                refetch,
              )
            }
            options={specializationFilterBy}
            name="status"
            placeholder="By Specialization"
            value={filterValues.specialization}
          />
        </Grid>

        {/* FILTER BY CADRE */}
        <Grid item>
          <Filter
            onHandleChange={(e) =>
              onFilterValueChange(
                e,
                "cadre",
                filterValues,
                setFilterValues,
                fetchDoctors,
                variables,
                refetch,
              )
            }
            options={cadreFilterBy}
            name="status"
            placeholder="By Cadre"
            value={filterValues.provider}
          />
        </Grid>

        {/* FILTER BY STATUS */}
        <Grid item>
          <Filter
            onHandleChange={(e) => console.log(e)}
            options={statusFilterBy}
            name="status"
            placeholder="By status"
            value={filterValues.status}
            disable={true}
          />
        </Grid>
        {/* FILTER BY PROVIDER */}
        <Grid item>
          <Filter
            onHandleChange={(e) => console.log(e)}
            options={providerFilterBy}
            name="status"
            placeholder="By provider"
            value={filterValues.provider}
            disable={true}
          />
        </Grid>
        <Grid item>
          <ClearFiltersBtn
            title="Clear filters"
            onHandleClick={() =>
              resetFilters(setFilterValues, doctorsPageDefaultFilterValues, variables, fetchDoctors)
            }
          />
        </Grid>
      </Grid>
      {loading ? (
        <Loader />
      ) : profiles.length > 0 ? (
        <Grid item container height="100%" direction="column">
          <EnhancedTable
            headCells={hcpsHeadCells}
            rows={profiles}
            paginationLabel="Doctors per page"
            handleChangePage={fetchMoreData}
            hasCheckbox={true}
            changeLimit={changeTableLimit}
            fetchData={fetchDoctors}
            dataPageInfo={pageInfo}
          >
            {profiles
              // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const {
                  _id,
                  dociId,
                  firstName,
                  hospital,
                  status,
                  specialization,
                  consultations,
                  picture,
                  lastName,
                } = row;
                const isItemSelected = isSelected(_id, selectedRows);
                const labelId = `enhanced-table-checkbox-${index}`;
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
                        onClick={() => handleSelectedRows(_id, selectedRows, setSelectedRows)}
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
                      align="left"
                      className={classes.tableCell}
                      style={{
                        color: theme.palette.common.grey,
                        minWidth: "10rem",
                      }}
                    >
                      {dociId && dociId.split("-")[1]}
                    </TableCell>
                    <TableCell align="left" className={classes.tableCell}>
                      <div
                        style={{
                          height: "100%",
                          display: "flex",
                          alignItems: "left",
                        }}
                      >
                        <span style={{ marginRight: "1rem" }}>
                          <Avatar
                            alt={`Display Photo of ${firstName}`}
                            src={picture ? picture : displayPhoto}
                            sx={{ width: 24, height: 24 }}
                          />
                        </span>
                        <span style={{ fontSize: "1.25rem" }}>
                          {firstName} {lastName}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell
                      align="left"
                      className={classes.tableCell}
                      style={{ color: theme.palette.common.grey }}
                    >
                      {specialization}
                    </TableCell>
                    <TableCell align="left" className={classes.tableCell}>
                      {consultations ? consultations : 0}
                    </TableCell>
                    <TableCell
                      align="left"
                      className={classes.tableCell}
                      style={{ color: theme.palette.common.grey }}
                    >
                      {hospital ? hospital : "No Hospital"}
                    </TableCell>
                    <TableCell align="left" className={classes.tableCell}>
                      <Chip
                        label={status ? status : "No Status"}
                        className={classes.badge}
                        style={{
                          background:
                            status === "Active"
                              ? theme.palette.common.lightGreen
                              : theme.palette.common.lightRed,
                          color:
                            status === "Active"
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
                        to={`hcps/${_id}`}
                        endIcon={<ArrowForwardIosIcon />}
                        /* onClick={() => {
                          setSelectedSubMenu(3);
                          setSelectedHcpMenu(0);
                        }} */
                      >
                        View Doctor
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </EnhancedTable>
        </Grid>
      ) : (
        <EmptyTable headCells={hcpsHeadCells} paginationLabel="Doctors per page" />
      )}
      {/* ADD Doctor MODAL */}
      <Modals
        isOpen={openAddHcp}
        title="Add Doctor"
        rowSpacing={5}
        height="auto"
        handleClose={() => setOpenAddHcp(false)}
      >
        <Formik
          initialValues={addDocInitialValues}
          onSubmit={onSubmit}
          validationSchema={addDoctorValidationSchema}
          validateOnChange={false}
          validateOnMount={false}
          validateOnBlur={false}
        >
          {({ isSubmitting, dirty, isValid, setFieldValue, setValues }) => {
            return (
              <Form style={{ marginTop: "1rem" }}>
                <Grid container direction="column" gap={2}>
                  <Grid item container direction="column" gap={1}>
                    <Grid item container>
                      <Grid container spacing={2}>
                        <Grid item md>
                          <FormikControl
                            control="input"
                            label="First Name"
                            id="firstName"
                            name="firstName"
                            placeholder="Enter first name"
                          />
                        </Grid>
                        <Grid item md>
                          <FormikControl
                            control="input"
                            label="Last Name"
                            id="lastName"
                            name="lastName"
                            placeholder="Enter last name"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item container direction="column" gap={2}>
                      <Grid item container>
                        <Grid container spacing={2}>
                          <Grid item md>
                            <FormikControl
                              control="date"
                              name="dob"
                              label="DOB"
                              setFieldValue={setFieldValue}
                              setValues={setValues}
                            />
                          </Grid>
                          <Grid item md>
                            <Grid container direction="column">
                              <FormikControl
                                control="select"
                                options={docSpecializationsOptions}
                                name="specialization"
                                label="Specialization"
                                placeholder="Specialization"
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item container direction="column" gap={2}>
                    <Grid item container>
                      <Grid container spacing={2}>
                        <Grid item md>
                          <FormikControl
                            control="select"
                            label="Gender"
                            id="gender"
                            name="gender"
                            options={genderType}
                            placeholder="Gender"
                          />
                        </Grid>
                        <Grid item md>
                          <FormikControl
                            control="input"
                            label="Phone Number"
                            id="phone"
                            name="phone"
                            placeholder="Enter last Phone number"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item container direction="column" gap={2}>
                      <Grid item container>
                        <Grid container spacing={2}>
                          <Grid item md>
                            <FormikControl
                              control="input"
                              label="Hospital"
                              id="hospital"
                              name="hospital"
                              placeholder="Enter hospital Name"
                            />
                          </Grid>
                          <Grid item md>
                            <Grid container direction="column">
                              <FormikControl
                                control="select"
                                options={docCadreOptions}
                                name="cadre"
                                label="Cadre"
                                placeholder="Select Cadre"
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item container spacing={2} alignItems="center">
                    <Grid item container md>
                      <FormikControl
                        control="file"
                        name="image"
                        label="Profile Pics"
                        setFieldValue={setFieldValue}
                      />
                    </Grid>
                    <Grid item md>
                      <FormikControl
                        control="input"
                        label="Heala-ID"
                        id="dociId"
                        name="dociId"
                        placeholder="Enter Heala ID"
                      />
                    </Grid>
                  </Grid>
                  <Grid item container>
                    <CustomButton
                      title="Add Doctor"
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
    </Grid>
  );
};

Hcps.propTypes = {
  /*  setSelectedSubMenu: PropTypes.func,
  setSelectedHcpMenu: PropTypes.func, */
};

export default Hcps;
