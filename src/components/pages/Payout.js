import React, { useEffect, useState } from "react";
import { NoData, EmptyTable } from "components/layouts";
import { Grid, Typography, Chip, Checkbox, TableRow, TableCell } from "@mui/material";
import { timeMoment, dateMoment } from "components/Utilities/Time";
import { Loader } from "components/Utilities";
import { useLazyQuery } from "@apollo/client";
import { getPayoutData } from "components/graphQL/useQuery";
import { EnhancedTable } from "components/layouts";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { payoutHeader } from "components/Utilities/tableHeaders";
import useAlert from "../../hooks/useAlert";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { isSelected } from "helpers/isSelected";
import Filter from "components/Forms/Filters";
import { defaultPageInfo, payoutFilterBy } from "helpers/mockData";
import {
  changeTableLimit,
  deleteVar,
  fetchMoreData,
  filterData,
  handlePageChange,
} from "helpers/filterHelperFunctions";

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
    "&.css-1jilxo7-MuiTableCell-root": {
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

const Payout = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { displayAlert } = useAlert();
  const { selectedRows } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();
  const [payout, setPayout] = useState([]);
  const [pageInfo, setPageInfo] = useState(defaultPageInfo);

  const [statusFilterValue, setStatusFilterValue] = useState("");
  const [fetchPayout, { loading, error, refetch, variables }] = useLazyQuery(getPayoutData);

  useEffect(() => {
    try {
      fetchPayout({ variables: { first: pageInfo?.limit } }).then(({ data }) => {
        if (!data) throw Error("Couldn't fetch doctors payout data");
        setPageInfo(data?.getEarningStats?.payoutData?.PageInfo);
        setPayout(data?.getEarningStats?.payoutData?.data);
      });
    } catch (error) {
      console.error(error);
    }
  }, [fetchPayout, pageInfo?.limit]);

  const onFilterStatusChange = async (value) => {
    try {
      deleteVar(variables);
      setStatusFilterValue(value);
      const filterVariables = { status: value };

      filterData(filterVariables, {
        fetchData: fetchPayout,
        refetch: refetch,
        variables: variables,
      })
        .then((data) => {
          setPayout(data?.getEarningStats?.payoutData?.data || []);
          setPageInfo(data?.getEarningStats?.payoutData?.PageInfo || {});
        })
        .catch(() => {
          refresh(setStatusFilterValue, "");
        });
    } catch (error) {
      console.error(error);
      refresh(setStatusFilterValue, "");
    }
  };

  const refresh = async (setFilterValue, defaultVal) => {
    displayAlert("error", `Something went wrong while filtering. Try again.`);
    setFilterValue(defaultVal);

    deleteVar(variables);

    refetch()
      .then(({ data }) => {
        setPayout(data?.getEarningStats?.payoutData?.data || []);
        setPageInfo(data?.getEarningStats?.payoutData?.PageInfo || {});
      })
      .catch((error) => {
        console.error(error);
        displayAlert("error", `Failed to get patients data, Try again`);
      });
  };

  const setTableData = async (response, errMsg) => {
    response
      .then(({ data }) => {
        setPageInfo(data?.getEarningStats?.payoutData?.PageInfo);
        setPayout(data?.getEarningStats?.payoutData?.data);
      })
      .catch((error) => {
        console.error(error);
        displayAlert("error", errMsg);
      });
  };

  if (error) return <NoData error={error} />;

  return (
    <Grid container direction="column" rowSpacing={2}>
      <>
        <Grid item container justifyContent="space-between" style={{ paddingBottom: "3rem" }}>
          <Grid item container spacing={3} alignItems="center">
            <Grid item flex={1}>
              <Typography noWrap variant="h1" color="#2D2F39">
                Doctors Payout Table
              </Typography>
            </Grid>
            <Grid item>
              <Filter
                onHandleChange={(e) => onFilterStatusChange(e?.target?.value)}
                onClickClearBtn={() => onFilterStatusChange("")}
                options={payoutFilterBy}
                name="status"
                placeholder="None"
                value={statusFilterValue}
                hasClearBtn={true}
              />
            </Grid>
          </Grid>
        </Grid>
        {loading ? (
          <Loader />
        ) : payout.length > 0 ? (
          <Grid item container>
            <EnhancedTable
              headCells={payoutHeader}
              rows={payout}
              paginationLabel="payout per page"
              hasCheckbox={true}
              changeLimit={async (e) => {
                const res = await changeTableLimit(fetchPayout, { first: e });
                await setTableData(res, "Failed to change table limit.");
              }}
              dataPageInfo={pageInfo}
              handlePagination={async (page) => {
                const res = await handlePageChange(fetchPayout, page, pageInfo, {});
                await setTableData(res, "Failed to change table page.");
              }}
              fetchData={fetchPayout}
              handleChangePage={fetchMoreData}
            >
              {payout.map((row, index) => {
                const { amount, createdAt, status, _id } = row;
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
                      style={{ color: theme.palette.common.black }}
                    >
                      {dateMoment(createdAt)}
                    </TableCell>
                    <TableCell
                      id={labelId}
                      scope="row"
                      align="left"
                      className={classes.tableCell}
                      style={{ color: theme.palette.common.black }}
                    >
                      {timeMoment(createdAt)}
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
          <EmptyTable headCells={payoutHeader} paginationLabel="Payout  per page" />
        )}
      </>
    </Grid>
  );
};

export default Payout;
