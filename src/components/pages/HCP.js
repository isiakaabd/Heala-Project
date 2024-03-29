import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import { useTheme } from "@mui/material/styles";
import { Grid, Chip, TableRow, TableCell } from "@mui/material";
import useAlert from "hooks/useAlert";
import Filter from "components/Forms/Filters";
import { isSelected } from "helpers/isSelected";
import { Loader } from "components/Utilities";
import { dateMoment } from "components/Utilities/Time";
import { getVerification } from "components/graphQL/useQuery";
import { HCPHeader } from "components/Utilities/tableHeaders";
import { useStyles } from "../../styles/docVerificationPageStyles";
import { EnhancedTable, NoData, EmptyTable } from "components/layouts";
import {
  docVerifyStatusFilterBy,
  specializationOptions,
} from "helpers/mockData";
import {
  changeTableLimit,
  deleteVar,
  filterData,
  handlePageChange,
} from "helpers/filterHelperFunctions";
import TableLayout from "components/layouts/TableLayout";

const HCP = () => {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const { displayAlert } = useAlert();
  const [pageInfo, setPageInfo] = useState({
    page: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
    limit: 10,
    totalDocs: 0,
  });

  const [statusFilterValue, setStatusFilterValue] = useState("");
  const [s, setS] = useState("");
  const [fetchVerifications, { loading, data, error, variables, refetch }] =
    useLazyQuery(getVerification);

  useEffect(() => {
    fetchVerifications({
      variables: {
        first: pageInfo.limit,
      },
      notifyOnNetworkStatusChange: true,
    });
  }, [fetchVerifications, pageInfo]);

  const { selectedRows } = useSelector((state) => state.tables);

  const [respondData, setRespondData] = useState([]); //setRespondData

  useEffect(() => {
    try {
      if (data) {
        setRespondData(data.getVerifications.verification);
        setPageInfo(data.getVerifications.pageInfo);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }, [data]);

  const onFilterStatusChange = async (value) => {
    try {
      deleteVar(variables);
      setStatusFilterValue(value);
      const filterVariables = { status: value };

      filterData(filterVariables, {
        fetchData: fetchVerifications,
        refetch: refetch,
        variables: variables,
      })
        .then((data) => {
          setRespondData(data.getVerifications.verification || []);
          setPageInfo(data.getVerifications.pageInfo || {});
        })
        .catch(() => {
          refresh(setStatusFilterValue, "");
        });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      refresh(setStatusFilterValue, "");
    }
  };
  const onFilterStatusChanges = async (value) => {
    try {
      deleteVar(variables);
      setS(value);
      const filterVariables = { specialization: value };

      filterData(filterVariables, {
        fetchData: fetchVerifications,
        refetch: refetch,
        variables: variables,
      })
        .then((data) => {
          setRespondData(data.getVerifications.verification || []);
          setPageInfo(data.getVerifications.pageInfo || {});
        })
        .catch(() => {
          refresh(setS, "");
        });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      refresh(setS, "");
    }
  };

  const refresh = async (setFilterValue, defaultVal) => {
    displayAlert("error", "Something went wrong while filtering. Try again.");
    setFilterValue(defaultVal);

    deleteVar(variables);

    refetch()
      .then(({ data }) => {
        setRespondData(data.getVerifications.verification || []);
        setPageInfo(data.getVerifications.pageInfo || {});
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
        displayAlert("error", "Failed to get patients data, Try again");
      });
  };

  if (loading) return <Loader />;
  if (error) return <NoData error={error} />;

  return (
    <>
      <Grid
        container
        direction="column"
        gap={2}
        flexWrap="nowrap"
        height="100%"
      >
        <Grid item container>
          <Grid
            item
            direction={{ sm: "row", xs: "column" }}
            gap={{ md: 4, sm: 4, xs: 2 }}
            container
          ></Grid>
        </Grid>
        <TableLayout
          filters={
            <Grid container item gap={4} justifyContent="space-between">
              <Filter
                onHandleChange={(e) => onFilterStatusChange(e?.target?.value)}
                onClickClearBtn={() => onFilterStatusChange("")}
                options={[
                  { key: "Status", value: "" },
                  ...docVerifyStatusFilterBy,
                ]}
                name="status"
                // placeholder="By status"
                value={statusFilterValue}
                hasClearBtn={true}
              />
              <Filter
                onHandleChange={(e) => onFilterStatusChanges(e?.target?.value)}
                onClickClearBtn={() => onFilterStatusChanges("")}
                options={[
                  { key: "Specialization", value: "" },
                  ...specializationOptions,
                ]}
                name="specialization"
                // placeholder="Specialization"
                value={s}
                hasClearBtn={true}
              />
            </Grid>
          }
        >
          {respondData.length > 0 ? (
            <Grid container item height="100%" direction="column">
              <EnhancedTable
                headCells={HCPHeader}
                rows={respondData}
                paginationLabel="verification per page"
                hasCheckbox={false}
                changeLimit={async (e) => {
                  changeTableLimit(fetchVerifications, { first: e });
                }}
                dataPageInfo={pageInfo}
                handlePagination={async (page) => {
                  handlePageChange(fetchVerifications, page, pageInfo, {});
                }}
              >
                {respondData.map((row, index) => {
                  const { createdAt, status, qualification, doctorData, _id } =
                    row;
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
                        history.push(`/verification/view/${_id}`);
                      }}
                    >
                      <TableCell
                        id={labelId}
                        scope="row"
                        align="left"
                        className={classes.tableCell}
                      >
                        {dateMoment(createdAt)}
                      </TableCell>

                      <TableCell align="left" className={classes.tableCell}>
                        <div
                          style={{
                            height: "100%",
                            display: "flex",
                            alignItems: "left",
                          }}
                        >
                          {/* <span style={{ marginRight: "1rem" }}>
                              <Avatar
                                alt={`image of ${
                                  doctorData && doctorData.firstName
                                }`}
                                src={
                                  doctorData ? doctorData.picture : displayPhoto
                                }
                                sx={{ width: 24, height: 24 }}
                              />
                            </span> */}
                          <span style={{ fontSize: "1.25rem" }}>
                            {doctorData?.firstName}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell
                        id={labelId}
                        scope="row"
                        align="left"
                        className={classes.tableCell}
                      >
                        {doctorData?.lastName}
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell}>
                        {doctorData?.specialization}
                      </TableCell>
                      <TableCell
                        align="left"
                        className={classes.tableCell}
                        style={{ color: theme.palette.common.red }}
                      >
                        <Chip
                          label={status ? "Verified" : "Not Verified"}
                          className={classes.badge}
                          style={{
                            background:
                              status === true
                                ? theme.palette.common.lightGreen
                                : theme.palette.common.lightRed,
                            color:
                              status === true
                                ? theme.palette.common.green
                                : theme.palette.common.red,
                          }}
                        />
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell}>
                        {dateMoment(qualification?.year)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </EnhancedTable>
            </Grid>
          ) : (
            <EmptyTable
              headCells={HCPHeader}
              paginationLabel="Verification  per page"
            />
          )}
        </TableLayout>
      </Grid>
    </>
  );
};

export default HCP;
