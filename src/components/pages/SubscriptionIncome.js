import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  TableCell,
  TableRow,
  Checkbox,
  Avatar,
} from "@mui/material";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import {
  timeMoment,
  dateMoment,
  formatNumber,
} from "components/Utilities/Time";
import { EnhancedTable, NoData, EmptyTable } from "components/layouts";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { financeHeader2 } from "components/Utilities/tableHeaders";
import displayPhoto from "assets/images/avatar.svg";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { isSelected } from "helpers/isSelected";
import { Loader } from "components/Utilities";
import { useLazyQuery } from "@apollo/client";
import { getSubscriptionsIncome } from "components/graphQL/useQuery";
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
  iconWrapper: {
    width: 20,
    height: 20,
    borderRadius: "50%",
    display: "grid",
    placeContent: "center",
    background: theme.palette.common.lightGreen,
  },

  tableCell: {
    "&.css-1jilxo7-MuiTableCell-root": {
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

const SubscriptionIncome = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { selectedRows } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();
  const [pageInfo, setPageInfo] = useState(defaultPageInfo);
  const [subIncome, setSubIncome] = useState([]);
  const [fetchSubIncome, { loading, data, error }] = useLazyQuery(
    getSubscriptionsIncome
  );

  useEffect(() => {
    fetchSubIncome({
      variables: {
        first: pageInfo.limit,
      },
      notifyOnNetworkStatusChange: true,
    });
  }, [fetchSubIncome, pageInfo]);

  useEffect(() => {
    if (data) {
      setSubIncome(data.getEarningStats.subscriptionIncomeData.data);
      setPageInfo(data.getEarningStats.subscriptionIncomeData.PageInfo);
    }
  }, [setSubIncome, data]);

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
        <Grid item container gap={1} alignItems="center">
          <Grid item flex={1}>
            <Typography noWrap variant="h1" component="div" color="#2D2F39">
              Subscription Earnings table
            </Typography>
          </Grid>
          <Grid item className={classes.iconWrapper}>
            <TrendingDownIcon color="success" className={classes.cardIcon} />
          </Grid>
        </Grid>
        <TableLayout>
          {subIncome.length > 0 ? (
            <Grid item container>
              <EnhancedTable
                headCells={financeHeader2}
                rows={subIncome}
                paginationLabel="finance per page"
                hasCheckbox={true}
                changeLimit={async (e) => {
                  await changeTableLimit(fetchSubIncome, { first: e });
                }}
                dataPageInfo={pageInfo}
                handlePagination={async (page) => {
                  await handlePageChange(fetchSubIncome, page, pageInfo, {});
                }}
              >
                {subIncome.map((row, index) => {
                  const { createdAt, amount, patientData, providerId, planId } =
                    row;
                  const { firstName, image, lastName } = patientData || {};
                  const isItemSelected = isSelected(row._id, selectedRows);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onClick={() =>
                            handleSelectedRows(
                              row.id,
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
                      </TableCell>
                      <TableCell
                        align="left"
                        className={classes.tableCell}
                        style={{ color: theme.palette.common.red }}
                      >
                        {formatNumber(amount.toFixed(2))}
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell}>
                        {patientData && patientData !== {} ? (
                          <div
                            style={{
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <span style={{ marginRight: "1rem" }}>
                              <Avatar
                                alt={firstName ? firstName : "image"}
                                src={patientData ? image : displayPhoto}
                                sx={{ width: 24, height: 24 }}
                              />
                            </span>
                            <span style={{ fontSize: "1.25rem" }}>
                              {patientData &&
                                `${firstName && firstName} ${
                                  lastName && lastName
                                }`}
                            </span>
                          </div>
                        ) : (
                          "No name"
                        )}
                      </TableCell>
                      <TableCell
                        align="left"
                        className={classes.tableCell}
                        style={{ color: theme.palette.common.red }}
                      >
                        {planId}
                      </TableCell>
                      <TableCell
                        align="left"
                        className={classes.tableCell}
                        style={{ color: theme.palette.common.red }}
                      >
                        {providerId}
                      </TableCell>

                      <TableCell
                        id={labelId}
                        scope="row"
                        align="left"
                        className={classes.tableCell}
                        style={{ color: theme.palette.common.black }}
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
              headCells={financeHeader2}
              paginationLabel="Finance  per page"
            />
          )}
        </TableLayout>
      </>
    </Grid>
  );
};

export default SubscriptionIncome;
