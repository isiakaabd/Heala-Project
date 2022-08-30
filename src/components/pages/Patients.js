import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLazyQuery, NetworkStatus } from "@apollo/client";
import { NoData, EmptyTable } from "components/layouts";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  Button,
  Avatar,
  Chip,
  Checkbox,
  TableCell,
  TableRow,
  Grid,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useAlert from "hooks/useAlert";
import { isSelected } from "helpers/isSelected";
import displayPhoto from "assets/images/avatar.svg";
import { Loader } from "components/Utilities";
import { useStyles } from "styles/patientsPageStyles";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import CompoundSearch from "components/Forms/CompoundSearch";
import { EnhancedTable } from "components/layouts";
import PatientFilters from "components/Forms/Filters/PatientFilters";
import { patientsHeadCells } from "components/Utilities/tableHeaders";
import { defaultPageInfo, searchOptions } from "../../helpers/mockData";
import {
  getPatients,
  getPatientsByPlan,
  getPatientsByStatus,
} from "components/graphQL/useQuery";
import {
  changeTableLimit,
  handlePageChange,
} from "helpers/filterHelperFunctions";
import TableLayout from "components/layouts/TableLayout";
import { getSearchPlaceholder } from "helpers/func";

const Patients = () => {
  const theme = useTheme();
  const classes = useStyles();
  const { displayAlert } = useAlert();
  const { setSelectedRows } = useActions();
  const [profiles, setProfiles] = useState([]);
  const { selectedRows } = useSelector((state) => state.tables);
  const [fetchPatient, { loading, refetch, error, variables, networkStatus }] =
    useLazyQuery(getPatients);
  const [
    fetchPatientByStatus,
    {
      loading: byStatusLoading,
      variables: byStatusVaribles,
      refetch: byStatusRefetch,
    },
  ] = useLazyQuery(getPatientsByStatus);
  const [
    fetchPatientByPlan,
    {
      loading: byPlanLoading,
      variables: byPlanVaribles,
      refetch: byPlanRefetch,
    },
  ] = useLazyQuery(getPatientsByPlan);

  const [pageInfo, setPageInfo] = useState({
    page: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
    limit: 10,
    totalDocs: 0,
  });

  useEffect(() => {
    fetchPatient({
      variables: {
        first: pageInfo.limit,
      },
    })
      .then(({ data }) => {
        if (data) {
          setPageInfo(data?.profiles?.pageInfo || []);
          setProfiles(data?.profiles?.data || defaultPageInfo);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setTableData = async (response, errMsg) => {
    response
      .then(({ data }) => {
        setPageInfo(data?.profiles?.pageInfo || defaultPageInfo);
        setProfiles(data?.profiles?.data || []);
      })
      .catch((error) => {
        console.error(error);
        displayAlert("error", errMsg);
      });
  };

  if (error) return <NoData error={error} />;

  return (
    <Grid item flex={1} container direction="column" rowGap={2}>
      <Grid
        item
        container
        spacing={2}
        className={classes.searchFilterContainer}
      >
        <Grid item container flexWrap="wrap" spacing={4}></Grid>
      </Grid>
      <TableLayout
        filters={
          <PatientFilters
            setProfiles={setProfiles}
            setPageInfo={setPageInfo}
            queryParams={{
              patientsParams: { fetchPatient, loading, refetch, variables },
              patientsByStatusParams: {
                byStatusLoading,
                byStatusVaribles,
                byStatusRefetch,
                fetchPatientByStatus,
              },
              patientsByPlanParams: {
                byPlanLoading,
                byPlanVaribles,
                byPlanRefetch,
                fetchPatientByPlan,
              },
            }}
          />
        }
        search={
          <CompoundSearch
            queryParams={{
              fetchData: fetchPatient,
              variables,
              loading,
              newVariables: {},
            }}
            setPageInfo={(data) => setPageInfo(data?.profiles?.pageInfo || {})}
            setProfiles={(data) => setProfiles(data?.profiles?.data || [])}
            getSearchPlaceholder={(filterBy) => getSearchPlaceholder(filterBy)}
            filterOptions={searchOptions}
          />
        }
      >
        {loading || byStatusLoading || byPlanLoading ? (
          <Loader />
        ) : networkStatus === NetworkStatus.refetch ? (
          <Loader />
        ) : profiles.length > 0 ? (
          /* ================= PATIENTS TABLE ================= */
          <Grid
            container
            item
            direction="column"
            overflow="hidden"
            maxWidth={{ md: "100%", sm: "100%", xs: "100%" }}
          >
            <EnhancedTable
              headCells={patientsHeadCells}
              rows={profiles}
              paginationLabel="Patients per page"
              hasCheckbox={true}
              changeLimit={async (e) => {
                const res = changeTableLimit(fetchPatient, {
                  first: e,
                });
                await setTableData(res, "Failed to change table limit.");
              }}
              dataPageInfo={pageInfo}
              handlePagination={async (page) => {
                const res = handlePageChange(fetchPatient, page, pageInfo, {});
                await setTableData(res, "Failed to change page.");
              }}
            >
              {profiles.map((row, index) => {
                const {
                  dociId,
                  firstName,
                  lastName,
                  plan,
                  provider,
                  image,
                  consultations,
                  _id,
                  status,
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
                      id={labelId}
                      scope="row"
                      align="left"
                      className={classes.tableCell}
                      style={{
                        color: theme.palette.common.grey,
                        textAlign: "left",
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
                            src={image ? image : displayPhoto}
                            sx={{ width: 24, height: 24 }}
                          />
                        </span>
                        <span
                          style={{ fontSize: "1.25rem" }}
                        >{`${firstName} ${lastName}`}</span>
                      </div>
                    </TableCell>
                    <TableCell align="left" className={classes.tableCell}>
                      {plan ? plan : "No Plan"}
                    </TableCell>
                    <TableCell align="left" className={classes.tableCell}>
                      {provider ? provider : "No Provider"}
                    </TableCell>
                    <TableCell align="left" className={classes.tableCell}>
                      {consultations ? consultations : 0}
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
                    <TableCell>
                      <Button
                        variant="contained"
                        className={classes.button}
                        component={Link}
                        to={`patients/${_id}`}
                        endIcon={<ArrowForwardIosIcon />}
                      >
                        View Profile
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </EnhancedTable>
          </Grid>
        ) : (
          <EmptyTable
            headCells={patientsHeadCells}
            paginationLabel="Patients per page"
          />
        )}
      </TableLayout>
    </Grid>
  );
};

export default Patients;
