import React, { useEffect, useState } from "react";
import { EmptyTable, NoData } from "components/layouts";
import { Grid } from "@mui/material";
import { useStyles } from "styles/hmoPageStyles";
import TableLayout from "components/layouts/TableLayout";
import CompoundSearch from "components/Forms/CompoundSearch";
import EnhancedTable from "components/layouts/EnhancedTable";
import { hospitalTableHeadCells20 } from "components/Utilities/tableHeaders";
import { defaultPageInfo } from "helpers/mockData";
import HospitalRow from "components/Rows/HospitalRow";
import { useLazyQuery } from "@apollo/client";
import { getProviders } from "components/graphQL/useQuery";
import { getDynamicSearchPlaceholder } from "helpers/func";
import { Loader } from "components/Utilities";
import {
  changeTableLimit,
  handlePageChange,
} from "helpers/filterHelperFunctions";
import useAlert from "hooks/useAlert";

const HospitalsTable = () => {
  const classes = useStyles();
  const { displayAlert } = useAlert();
  const [hospitals, setHospitals] = useState([]);
  const [pageInfo, setPageInfo] = useState(defaultPageInfo);
  const [fetchHospitals, { loading, error, variables }] = useLazyQuery(
    getProviders,
    {
      variables: { userTypeId: "61ed2354e6091400135e3d94" },
    }
  );

  useEffect(() => {
    fetchHospitals()
      .then(({ data }) => {
        if (data) {
          setHospitals(data?.getProviders?.provider || []);
          setPageInfo(data?.getProviders?.pageInfo || defaultPageInfo);
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  }, [fetchHospitals]);

  const setTableData = async (response, errMsg) => {
    response
      .then(({ data }) => {
        setHospitals(data?.getProviders?.provider || []);
        setPageInfo(data?.getProviders?.pageInfo || defaultPageInfo);
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
        search={
          <CompoundSearch
            queryParams={{
              fetchData: fetchHospitals,
              variables,
              loading,
              newVariables: { provider: "61db6f8968b248001aec4fcb" },
            }}
            setPageInfo={(data) =>
              setPageInfo(data?.getProviders?.pageInfo || {})
            }
            searchState={{
              value: "",
              filterBy: "name",
            }}
            setProfiles={(data) =>
              setHospitals(data?.getProviders?.provider || [])
            }
            getSearchPlaceholder={(filterBy) =>
              getDynamicSearchPlaceholder(filterBy, {
                name: "Search by name",
              })
            }
            filterOptions={[{ key: "By name", value: "name" }]}
          />
        }
      >
        {loading ? (
          <Loader />
        ) : hospitals.length > 0 ? (
          /* ================= HMO TABLE ================= */
          <Grid
            container
            item
            direction="column"
            overflow="hidden"
            maxWidth={{ md: "100%", sm: "100%", xs: "100%" }}
          >
            <EnhancedTable
              headCells={hospitalTableHeadCells20}
              rows={hospitals}
              paginationLabel="Hospitals per page"
              hasCheckbox={false}
              changeLimit={async (e) => {
                const res = changeTableLimit(fetchHospitals, {
                  first: e,
                });
                await setTableData(res, "Failed to change table limit.");
              }}
              dataPageInfo={pageInfo}
              handlePagination={async (page) => {
                const res = handlePageChange(
                  fetchHospitals,
                  page,
                  pageInfo,
                  {}
                );
                await setTableData(res, "Failed to change page.");
              }}
            >
              {hospitals.map((row, index) => {
                return <HospitalRow key={index} index={index} rowData={row} />;
              })}
            </EnhancedTable>
          </Grid>
        ) : (
          <EmptyTable
            headCells={hospitalTableHeadCells20}
            paginationLabel="Hospitals per page"
          />
        )}
      </TableLayout>
    </Grid>
  );
};

export default HospitalsTable;
