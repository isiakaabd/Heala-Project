import React, { useState, useEffect } from "react";
import { Grid, TableCell, TableRow } from "@mui/material";
import { useHistory } from "react-router-dom";
import {
  timeMoment,
  dateMoment,
  formatNumber,
} from "components/Utilities/Time";
import { EnhancedTable, NoData, EmptyTable } from "components/layouts";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { payoutHeaderss1 } from "components/Utilities/tableHeaders";
import { useSelector } from "react-redux";
import { isSelected } from "helpers/isSelected";
import { Loader } from "components/Utilities";
import { useLazyQuery } from "@apollo/client";
import { getEarningData } from "components/graphQL/useQuery";
import { defaultPageInfo } from "helpers/mockData";
import {
  changeTableLimit,
  handlePageChange,
} from "helpers/filterHelperFunctions";
import TableLayout from "components/layouts/TableLayout";

const useStyles = makeStyles((theme) => ({
  button: {
    "&.css-1zf5oc-MuiButtonBase-root-MuiButton-root": {
      background: "#fff",
      color: theme.palette.common.grey,
      textTransform: "none",
      borderRadius: "2rem",
      display: "flex",
      alignItems: "center",
      padding: "1rem",
      maxWidth: "10rem",

      "&:hover": {
        background: "#fcfcfc",
      },

      "&:active": {
        background: "#fafafa",
      },

      "& .css-9tj150-MuiButton-endIcon>*:nth-of-type(1)": {
        fontSize: "1.2rem",
      },

      "& .css-9tj150-MuiButton-endIcon": {
        marginLeft: ".3rem",
        marginTop: "-.2rem",
      },
    },
  },
  buttons: {
    "&.MuiButton-root": {
      background: "#fff",
      color: theme.palette.common.grey,
      textTransform: "none",
      borderRadius: "2rem",
      display: "flex",
      alignItems: "center",
      padding: "1rem",
      maxWidth: "10rem",

      "&:hover": {
        background: "#fcfcfc",
      },

      "&:active": {
        background: "#fafafa",
      },

      "& .MuiButton-endIcon>*:nth-of-type(1)": {
        fontSize: "1.2rem",
      },

      "& .MuiButton-endIcon": {
        marginLeft: ".3rem",
        marginTop: "-.2rem",
      },
    },
  },
  iconWrapper: {
    width: 20,
    height: 20,
    borderRadius: "50%",
    display: "grid",
    placeContent: "center",
    background: theme.palette.common.lightGreen,
  },

  tableCell: {
    "&.MuiTableCell-root": {
      color: "rgb(0 0 0)",
      fontWeight: 400,
      fontSize: "1.25rem",
    },
  },

  badge: {
    "&.css-1eelh6y-MuiChip-root": {
      fontSize: "1.6rem !important",
      height: "3rem",
      borderRadius: "1.3rem",
    },
  },
}));

const Financetable = () => {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const { selectedRows } = useSelector((state) => state.tables);
  const [pageInfo, setPageInfo] = useState(defaultPageInfo);
  const [earning, setEarning] = useState([]);
  const [fetchEarningData, { loading, data, error }] =
    useLazyQuery(getEarningData);

  /*   const fetchProvider = useCallback(async (id) => {
    // const { data } = await fetch({
    //   variables: {
    //     providerId: id,
    //   },
    // });
    console.log(data);
    return id;
  }, []); */

  useEffect(() => {
    fetchEarningData({
      variables: {
        first: 10,
      },
      notifyOnNetworkStatusChange: true,
    });
  }, [fetchEarningData]);

  useEffect(() => {
    setEarning(data?.getEarningStats?.earningData?.data || []);
    setPageInfo(
      data?.getEarningStats?.earningData?.PageInfo || defaultPageInfo
    );
  }, [earning, data]);

  const setTableData = async (response, errMsg) => {
    response
      .then(({ data }) => {
        setEarning(data?.getEarningStats?.earningData?.data || []);
        setPageInfo(
          data?.getEarningStats?.earningData?.PageInfo || defaultPageInfo
        );
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
        setEarning("error", errMsg);
      });
  };

  if (loading) return <Loader />;
  if (error) return <NoData error={error} />;
  return (
    <Grid
      container
      direction="column"
      gap={2}
      height="100%"
      sx={{ margin: "3rem 0rem" }}
    >
      <>
        <TableLayout>
          {earning?.length > 0 ? (
            <Grid item container>
              <EnhancedTable
                headCells={payoutHeaderss1}
                rows={earning}
                paginationLabel="finance per page"
                hasCheckbox={false}
                changeLimit={async (e) => {
                  const res = changeTableLimit(fetchEarningData, {
                    first: e,
                  });
                  await setTableData(res, "Failed to change table limit.");
                }}
                dataPageInfo={pageInfo}
                handlePagination={async (page) => {
                  const res = handlePageChange(
                    fetchEarningData,
                    page,
                    pageInfo,
                    {}
                  );
                  await setTableData(res, "Failed to change page.");
                }}
              >
                {earning.map((row, index) => {
                  const {
                    createdAt,
                    consultationId,
                    providerId,
                    balance,
                    doctorData,
                  } = row;

                  const isItemSelected = isSelected(row._id, selectedRows);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  // const x = fetchProvider(providerId);
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        history.push(
                          `/hcps/${doctorData[0]?._id}/consultations/case-notes/${consultationId}`
                        );
                      }}
                    >
                      <TableCell
                        align="left"
                        className={classes.tableCell}
                        style={{ color: theme.palette.common.red }}
                      >
                        {doctorData && doctorData[0] !== {} ? (
                          <div
                            style={{
                              height: "100%",
                              display: "flex",
                              alignItems: "left",
                            }}
                          >
                            <span style={{ fontSize: "1.25rem" }}>{`${
                              doctorData[0] && doctorData[0]?.firstName
                            } ${doctorData[0]?.lastName}`}</span>
                          </div>
                        ) : (
                          "No Name"
                        )}
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell}>
                        {providerId}
                      </TableCell>
                      <TableCell
                        id={labelId}
                        scope="row"
                        align="left"
                        className={classes.tableCell}
                      >
                        {formatNumber(balance.toFixed(2))}
                      </TableCell>

                      <TableCell
                        id={labelId}
                        scope="row"
                        align="left"
                        className={classes.tableCell}
                      >
                        {`${dateMoment(createdAt)} - ${timeMoment(createdAt)}`}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </EnhancedTable>
            </Grid>
          ) : (
            <EmptyTable
              headCells={payoutHeaderss1}
              paginationLabel="Finance  per page"
            />
          )}
        </TableLayout>
      </>
    </Grid>
  );
};

export default Financetable;
