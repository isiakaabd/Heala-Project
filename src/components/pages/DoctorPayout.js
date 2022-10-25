import React, { useEffect, useState } from "react";
import { NoData, EmptyTable, EnhancedTable } from "components/layouts";
import { Grid, Chip, TableRow, TableCell } from "@mui/material";
import { timeMoment, dateMoment } from "components/Utilities/Time";
import { Loader } from "components/Utilities";
import { useLazyQuery } from "@apollo/client";
import { getPayoutData } from "components/graphQL/useQuery";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { doctorPayoutHeader } from "components/Utilities/tableHeaders";
import useAlert from "hooks/useAlert";
import { useSelector } from "react-redux";
import { isSelected } from "helpers/isSelected";
import { useParams } from "react-router-dom";
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

const DoctorPayout = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { displayAlert } = useAlert();
  const { hcpId } = useParams();
  const [payout, setPayout] = useState([]);
  const [pageInfo, setPageInfo] = useState(defaultPageInfo);
  const { selectedRows } = useSelector((state) => state.tables);

  const [fetchPayout, { loading, error }] = useLazyQuery(getPayoutData);

  useEffect(() => {
    try {
      fetchPayout({
        variables: { first: pageInfo?.limit, doctor: hcpId },
      }).then(({ data }) => {
        if (!data) throw Error("Couldn't fetch doctors payout data");
        setPageInfo(data?.getEarningStats?.payoutData?.PageInfo);
        setPayout(data?.getEarningStats?.payoutData?.data);
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
        setPageInfo(
          data?.getEarningStats?.payoutData?.PageInfo || defaultPageInfo
        );
        setPayout(data?.getEarningStats?.payoutData?.data || []);
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
        ></Grid>
        <TableLayout>
          {payout.length > 0 ? (
            <Grid item container>
              <EnhancedTable
                headCells={doctorPayoutHeader}
                rows={payout}
                paginationLabel="payout per page"
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
                {payout?.map((row, index) => {
                  const { amount, createdAt, status, _id, doctorData } = row;
                  const data = doctorData || [];
                  const { firstName, lastName } = data[0] || {};
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
                      <TableCell
                        id={labelId}
                        scope="row"
                        align="left"
                        className={classes.tableCell}
                      >
                        {`${dateMoment(createdAt)} - ${timeMoment(createdAt)}`}
                      </TableCell>

                      <TableCell align="left" className={classes.tableCell}>
                        {row?.doctorData && row?.doctorData[0] !== {}
                          ? `${firstName && firstName} ${lastName && lastName}`
                          : "No Name"}
                      </TableCell>
                      <TableCell
                        align="left"
                        className={classes.tableCell}
                        style={{ color: theme.palette.common.red }}
                      >
                        {amount}
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell}>
                        <Chip
                          label={status}
                          className={classes.badge}
                          style={{
                            background:
                              status === "Success"
                                ? theme.palette.common.lightGreen
                                : status === "Failed"
                                ? theme.palette.common.lightGreen
                                : theme.palette.common.lightRed,
                            color:
                              status === "Success"
                                ? theme.palette.common.green
                                : status === "Failed"
                                ? theme.palette.common.danger
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
              headCells={doctorPayoutHeader}
              paginationLabel="Payout  per page"
            />
          )}
        </TableLayout>
      </>
    </Grid>
  );
};

export default DoctorPayout;
