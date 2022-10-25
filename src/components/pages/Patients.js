import React, { useState, useEffect } from "react";
import { useLazyQuery, NetworkStatus } from "@apollo/client";
import { Grid } from "@mui/material";
import useAlert from "hooks/useAlert";
import { Loader } from "components/Utilities";
import { useStyles } from "styles/patientsPageStyles";
import CompoundSearch from "components/Forms/CompoundSearch";
import { NoData, EmptyTable, EnhancedTable } from "components/layouts";
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

import TableLayout from "components/layouts/TableLayout";
import { getSearchPlaceholder } from "helpers/func";
import PatientsRow from "components/Rows/PatientsRow";

const Patients = () => {
  const classes = useStyles();
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
      },
    })
      .then(({ data }) => {
        if (data) {
          setPageInfo(data?.profiles?.pageInfo || []);
          setProfiles(data?.profiles?.data || defaultPageInfo);
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
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
        // eslint-disable-next-line no-console
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
              hasCheckbox={false}
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
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <PatientsRow
                    key={index}
                    patientData={row}
                    labelId={labelId}
                  />
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
