import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { NetworkStatus, useMutation, useLazyQuery } from "@apollo/client";
import { Grid, TableRow, TableCell, Checkbox, Chip } from "@mui/material";
import useAlert from "hooks/useAlert";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import { isSelected } from "helpers/isSelected";
import { useActions } from "components/hooks/useActions";
import { timeConverter } from "components/Utilities/Time";
import { handleSelectedRows } from "helpers/selectedRows";
import { useStyles } from "../../styles/doctorsPageStyles";
import FormikControl from "components/validation/FormikControl";
import {
  getDoctorsProfile,
  getDoctorsProfileByStatus,
} from "components/graphQL/useQuery";
import { hcpsHeadCells } from "components/Utilities/tableHeaders";
import { createDOctorProfile } from "components/graphQL/Mutation";
import { NoData, EmptyTable, EnhancedTable } from "components/layouts";
import { addDoctorValidationSchema } from "helpers/validationSchemas";
import { Loader, Modals, CustomButton } from "components/Utilities";
import {
  changeTableLimit,
  handlePageChange,
} from "helpers/filterHelperFunctions";
import {
  addDocInitialValues,
  /* cadreFilterBy, */
  defaultPageInfo,
  docCadreOptions,
  docSpecializationsOptions,
  doctorsSearchOptions,
  genderType,
} from "helpers/mockData";
import CompoundSearch from "components/Forms/CompoundSearch";
import DoctorFilters from "components/Forms/Filters/DoctorsFilters";
import TableLayout from "components/layouts/TableLayout";

const Hcps = () => {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const { displayAlert } = useAlert();
  const [profiles, setProfiles] = useState("");
  const [pageInfo, setPageInfo] = useState(defaultPageInfo);
  const [openAddHcp, setOpenAddHcp] = useState(false);
  const [createDoc] = useMutation(createDOctorProfile);
  const { selectedRows } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();
  const [fetchDoctors, { error, loading, refetch, variables, networkStatus }] =
    useLazyQuery(getDoctorsProfile);
  const [
    fetchDoctorsByStatus,
    {
      loading: byStatusLoading,
      refetch: byStatusRefetch,
      variables: byStatusVariables,
    },
  ] = useLazyQuery(getDoctorsProfileByStatus);

  useEffect(() => {
    fetchDoctors({
      variables: {
        first: pageInfo.limit,
      },
    })
      .then(({ data }) => {
        if (data) {
          setPageInfo(data.doctorProfiles.pageInfo || []);
          setProfiles(data.doctorProfiles.profile || defaultPageInfo);
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
  };
  const getSearchPlaceholder = (filterBy) => {
    return filterBy === "id"
      ? "Search by ID e.g 7NE6ELLO"
      : filterBy === "firstName"
      ? "Search by first name e.g John"
      : filterBy === "lastName"
      ? "Search by last name e.g Doe"
      : "";
  };

  const setTableData = async (response, errMsg) => {
    response
      .then(({ data }) => {
        setPageInfo(data.doctorProfiles.pageInfo || defaultPageInfo);
        setProfiles(data.doctorProfiles.profile || []);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
        displayAlert("error", errMsg);
      });
  };

  if (error) return <NoData error={error} />;
  return (
    <Grid container direction="column" gap={2} flexWrap="nowrap" height="100%">
      <Grid
        item
        gap={{ md: 4, sm: 4, xs: 2 }}
        direction={{ sm: "row", xs: "column" }}
        container
        justifyContent="flex-end"
      >
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

      <TableLayout
        filters={
          <DoctorFilters
            setProfiles={setProfiles}
            setPageInfo={setPageInfo}
            queryParams={{
              doctorsParams: { fetchDoctors, loading, refetch, variables },
              doctorsByStatusParams: {
                byStatusLoading,
                byStatusVariables,
                byStatusRefetch,
                fetchDoctorsByStatus,
              },
            }}
          />
        }
        search={
          <CompoundSearch
            queryParams={{ fetchData: fetchDoctors, variables, loading }}
            setPageInfo={(data) =>
              setPageInfo(data.doctorProfiles.pageInfo || {})
            }
            setProfiles={(data) =>
              setProfiles(data.doctorProfiles.profile || [])
            }
            getSearchPlaceholder={(filterBy) => getSearchPlaceholder(filterBy)}
            filterOptions={doctorsSearchOptions}
          />
        }
      >
        {loading ? (
          <Loader />
        ) : byStatusLoading ? (
          <Loader />
        ) : networkStatus === NetworkStatus.refetch ? (
          <Loader />
        ) : profiles.length > 0 ? (
          <Grid item container height="100%" direction="column">
            <EnhancedTable
              headCells={hcpsHeadCells}
              rows={profiles}
              paginationLabel="Doctors per page"
              hasCheckbox={false}
              changeLimit={async (e) => {
                const res = changeTableLimit(fetchDoctors, {
                  first: e,
                });
                await setTableData(res, "Failed to change table limit");
              }}
              dataPageInfo={pageInfo}
              handlePagination={async (page) => {
                const res = handlePageChange(fetchDoctors, page, pageInfo, {});
                await setTableData(res, "Failed to change page.");
              }}
            >
              {profiles.map((row, index) => {
                const {
                  _id,
                  dociId,
                  firstName,
                  provider,
                  status,
                  specialization,
                  consultations,
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
                    sx={{ cursor: "pointer" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      history.push(`hcps/${_id}`);
                    }}
                  >
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
                      {dociId?.split("-")[1]}
                    </TableCell>
                    <TableCell align="left" className={classes.tableCell}>
                      <div
                        style={{
                          height: "100%",
                          display: "flex",
                          alignItems: "left",
                        }}
                      >
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
                      {provider ? provider : "No Provider"}
                    </TableCell>
                    <TableCell align="left" className={classes.tableCell}>
                      <Chip
                        label={
                          status && status === "Active" ? "Active" : "Inactive"
                        }
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
                  </TableRow>
                );
              })}
            </EnhancedTable>
          </Grid>
        ) : (
          <EmptyTable
            headCells={hcpsHeadCells}
            paginationLabel="Doctors per page"
          />
        )}
      </TableLayout>
      {/* ADD Doctor MODAL */}
      <Modals
        isOpen={openAddHcp}
        title="Add Doctor"
        rowSpacing={5}
        height="auto"
        width={{ sm: "50vw", xs: "90vw" }}
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
                    <Grid item container spacing={2}>
                      <Grid item container xs={6}>
                        <FormikControl
                          control="input"
                          label="First Name"
                          id="firstName"
                          name="firstName"
                          placeholder="Enter first name"
                        />
                      </Grid>
                      <Grid item container xs={6}>
                        <FormikControl
                          control="input"
                          label="Last Name"
                          id="lastName"
                          name="lastName"
                          placeholder="Enter last name"
                        />
                      </Grid>
                    </Grid>
                    <Grid item container direction="column" gap={2}>
                      <Grid item container spacing={2}>
                        <Grid item xs={6}>
                          <FormikControl
                            control="date"
                            name="dob"
                            label="DOB"
                            setFieldValue={setFieldValue}
                            setValues={setValues}
                          />
                        </Grid>
                        <Grid item xs={6}>
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
                  <Grid item container direction="column" gap={2}>
                    <Grid item container spacing={2}>
                      <Grid item xs={6}>
                        <FormikControl
                          control="select"
                          label="Gender"
                          id="gender"
                          name="gender"
                          options={genderType}
                          placeholder="Gender"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormikControl
                          control="input"
                          label="Phone Number"
                          id="phone"
                          name="phone"
                          placeholder="Enter last Phone number"
                        />
                      </Grid>
                    </Grid>

                    <Grid item container direction="column" gap={2}>
                      <Grid item container spacing={2}>
                        <Grid item xs={6}>
                          <FormikControl
                            control="input"
                            label="Hospital"
                            id="hospital"
                            name="hospital"
                            placeholder="Enter hospital Name"
                          />
                        </Grid>
                        <Grid item xs={6} marginBottom={{ xs: 1 }}>
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
                  <Grid item container spacing={2} alignItems="center">
                    <Grid item xs={6}>
                      <FormikControl
                        control="file"
                        name="image"
                        label="Profile Pics"
                        setFieldValue={setFieldValue}
                      />
                    </Grid>
                    <Grid item xs={6}>
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

export default Hcps;
