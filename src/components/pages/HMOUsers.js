import React, { useState, useEffect } from "react";
import { useLazyQuery, NetworkStatus } from "@apollo/client";
import { NoData, EmptyTable } from "components/layouts";
import { Grid } from "@mui/material";
import useAlert from "hooks/useAlert";
import { Loader } from "components/Utilities";
import { useStyles } from "styles/patientsPageStyles";
import CompoundSearch from "components/Forms/CompoundSearch";
import { EnhancedTable } from "components/layouts";
import PatientFilters from "components/Forms/Filters/PatientFilters";
import { patientsHeadCells } from "components/Utilities/tableHeaders";
import { defaultPageInfo, searchOptions } from "helpers/mockData";
import {
  getPatients,
  getPatientsByPlan,
  getPatientsByStatus,
} from "components/graphQL/useQuery";
import {
  changeTableLimit,
  handlePageChange,
} from "helpers/filterHelperFunctions";
import { useParams, Link, NavLink, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { isSelected } from "helpers/isSelected";
import TableLayout from "components/layouts/TableLayout";
import { getSearchPlaceholder } from "helpers/func";

import PropTypes from "prop-types";

import { useHistory } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { Checkbox, Chip, TableCell, TableRow } from "@mui/material";

const HMOUsers = () => {
  const classes = useStyles();
  const { id, ids } = useParams();
  const history = useHistory();
  const theme = useTheme();
  const { setSelectedRows } = useActions();
  const { selectedRows } = useSelector((state) => state.tables);
  // const navigate = useNavigate();
  console.log(ids);
  const { displayAlert } = useAlert();
  const [profiles, setProfiles] = useState([]);
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
        provider: ids,
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

  // if (error) return <NoData error={error} />;

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
              newVariables: { provider: ids },
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
                  provider: ids,
                });
                await setTableData(res, "Failed to change table limit.");
              }}
              dataPageInfo={pageInfo}
              handlePagination={async (page) => {
                const res = handlePageChange(fetchPatient, page, pageInfo, {
                  provider: ids,
                });
                await setTableData(res, "Failed to change page.");
              }}
            >
              {profiles.map((row, index) => {
                const {
                  _id,
                  dociId,
                  firstName,
                  lastName,
                  plan,
                  provider,
                  consultations,
                  status,
                } = row;
                const labelId = `enhanced-table-checkbox-${index}`;
                const isItemSelected = isSelected(_id, selectedRows);

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={_id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                    // onClick={(e) => {
                    //   <Redirect
                    //     to={{
                    //       pathname: `/patients/${_id}`,
                    //       state: { from: `/user-type/heala/${id}/${_id}` },
                    //     }}
                    //   />;
                    // }}
                  >
                    <TableCell padding="checkbox">
                      <NavLink
                        to={`/user-type/hmo/${id}/${_id}`}
                        clasName={classes.link}
                        style={{ textDecoration: "none" }}
                      >
                        <Checkbox
                          onClick={() =>
                            handleSelectedRows(
                              _id,
                              selectedRows,
                              setSelectedRows
                            )
                          }
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </NavLink>
                    </TableCell>
                    {/* </NavLink> */}

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
                      <NavLink
                        to={`/patients/${_id}`}
                        clasName={classes.link}
                        style={{ textDecoration: "none" }}
                      >
                        {dociId?.split("-")[1]}
                      </NavLink>
                    </TableCell>
                    <TableCell align="left" className={classes.tableCell}>
                      <NavLink
                        to={`/patients/${_id}`}
                        clasName={classes.link}
                        style={{ textDecoration: "none" }}
                      >
                        <div
                          style={{
                            height: "100%",
                            display: "flex",
                            alignItems: "left",
                          }}
                        >
                          <span style={{ fontSize: "1.25rem" }}>{`${
                            firstName && firstName
                          } ${lastName && lastName}`}</span>
                        </div>
                      </NavLink>
                    </TableCell>
                    <TableCell align="left" className={classes.tableCell}>
                      <NavLink
                        to={`/patients/${_id}`}
                        clasName={classes.link}
                        style={{ textDecoration: "none" }}
                      >
                        {plan ? plan : "No Plan"}
                      </NavLink>
                    </TableCell>
                    <TableCell align="left" className={classes.tableCell}>
                      <NavLink
                        to={`/patients/${_id}`}
                        clasName={classes.link}
                        style={{ textDecoration: "none", textColor: "red" }}
                      >
                        {provider ? provider : "No Provider"}
                      </NavLink>
                    </TableCell>
                    <TableCell align="left" className={classes.tableCell}>
                      <NavLink
                        to={`/patients/${_id}`}
                        clasName={classes.link}
                        style={{ textDecoration: "none", textColor: "inherit" }}
                      >
                        {consultations ? consultations : 0}
                      </NavLink>
                    </TableCell>
                    <TableCell align="left" className={classes.tableCell}>
                      <NavLink
                        to={`/patients/${_id}`}
                        clasName={classes.link}
                        style={{ textDecoration: "none", textColor: "inherit" }}
                      >
                        <Chip
                          label={
                            status && status === "Active"
                              ? "Active"
                              : "Inactive"
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
                      </NavLink>
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

export default HMOUsers;
