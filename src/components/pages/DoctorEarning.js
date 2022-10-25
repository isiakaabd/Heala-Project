import React, { useEffect, useState } from "react";
import { Grid, TableRow, TableCell } from "@mui/material";
import { timeMoment, dateMoment } from "components/Utilities/Time";
import { Loader } from "components/Utilities";
import { useLazyQuery } from "@apollo/client";
import { getMyEarnings } from "components/graphQL/useQuery";
import { EnhancedTable, NoData, EmptyTable } from "components/layouts";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { payoutHeaders } from "components/Utilities/tableHeaders";
import useAlert from "hooks/useAlert";
import { useSelector } from "react-redux";
import { isSelected } from "helpers/isSelected";
import { useHistory, useParams } from "react-router-dom";
import { defaultPageInfo } from "helpers/mockData";
import {
  changeTableLimit,
  fetchMoreData,
  handlePageChange,
} from "helpers/filterHelperFunctions";
import TableLayout from "components/layouts/TableLayout";

const useStyles = makeStyles((theme) => ({
  iconWrapper: {
    width: 20,
    height: 20,
    borderRadius: "50%",
    display: "grid",
    placeContent: "center",
    marginLeft: "1rem",
    background: theme.palette.common.lightGreen,
  },

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

  tableCell: {
    "&.MuiTableCell-root": {
      color: "rgb(0 0 0)",
      fontWeight: 400,
      fontSize: "1.25rem",
    },
  },

  badge: {
    "&.MuiChip-root": {
      fontSize: "1.6rem !important",
      height: "3rem",
      borderRadius: "1.3rem",
    },
  },
}));

const DoctorEarning = () => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const { hcpId } = useParams();
  const { displayAlert } = useAlert();
  const { selectedRows } = useSelector((state) => state.tables);
  const [payout, setPayout] = useState([]);
  const [pageInfo, setPageInfo] = useState(defaultPageInfo);

  const [fetchPayout, { loading, error }] = useLazyQuery(getMyEarnings);

  useEffect(() => {
    try {
      fetchPayout({
        variables: { first: pageInfo?.limit, doctor: hcpId },
      }).then(({ data }) => {
        if (!data) throw Error("Couldn't fetch doctors payout data");
        setPageInfo(data?.getMyEarnings?.pageInfo);
        setPayout(data?.getMyEarnings?.data);
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, [fetchPayout, pageInfo?.limit, hcpId]);

  const setTableData = async (response, errMsg) => {
    const data = response?.data;
    try {
      if (data) {
        setPageInfo(data?.getMyEarnings?.pageInfo || defaultPageInfo);
        setPayout(data?.getMyEarnings?.data || []);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      displayAlert("error", errMsg);
    }
  };

  if (error) return <NoData error={error} />;
  if (loading) return <Loader />;
  return (
    <Grid container direction="column" rowSpacing={2}>
      <>
        <Grid
          item
          container
          justifyContent="space-between"
          style={{ paddingBottom: "3rem" }}
        >
          <Grid item container spacing={3} alignItems="center"></Grid>
        </Grid>
        <TableLayout>
          {payout.length > 0 ? (
            <Grid item container>
              <EnhancedTable
                headCells={payoutHeaders}
                rows={payout}
                paginationLabel="Earning per page"
                hasCheckbox={false}
                changeLimit={async (e) => {
                  const res = await changeTableLimit(fetchPayout, {
                    first: e,
                    doctor: hcpId,
                  });
                  await setTableData(res, "Failed to change table limit.");
                }}
                dataPageInfo={pageInfo}
                handlePagination={async (page) => {
                  const res = await handlePageChange(
                    fetchPayout,
                    page,
                    pageInfo,
                    { doctor: hcpId }
                  );
                  await setTableData(res, "Failed to change table page.");
                }}
                fetchData={fetchPayout}
                handleChangePage={fetchMoreData}
              >
                {payout.map((row, index) => {
                  const {
                    balance,
                    createdAt,
                    _id,
                    doctorData,
                    consultationData,
                  } = row;
                  const isItemSelected = isSelected(_id, selectedRows);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const rowId = consultationData._id;

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
                        history.push(`/hcps/${hcpId}/earnings/earn/${rowId}`);
                      }}
                    >
                      <TableCell align="left" className={classes.tableCell}>
                        {doctorData ? (
                          <div
                            style={{
                              height: "100%",
                              display: "flex",
                              alignItems: "left",
                            }}
                          >
                            <span style={{ fontSize: "1.25rem" }}>
                              {doctorData
                                ? `${doctorData?.lastName} ${doctorData?.lastName}`
                                : "No Value"}
                            </span>
                          </div>
                        ) : (
                          "No Name"
                        )}
                      </TableCell>
                      <TableCell
                        align="left"
                        className={classes.tableCell}
                        style={{ color: theme.palette.common.red }}
                      >
                        {balance}
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
              headCells={payoutHeaders}
              paginationLabel="Earnings  per page"
            />
          )}
        </TableLayout>
      </>
    </Grid>
  );
};

export default DoctorEarning;
