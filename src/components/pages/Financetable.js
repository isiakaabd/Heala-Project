import React, { useState, useEffect } from "react";
import { Grid, Typography, TableCell, TableRow, Checkbox, Avatar } from "@mui/material";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { timeMoment, dateMoment, formatNumber } from "components/Utilities/Time";
import { EnhancedTable, NoData, EmptyTable } from "components/layouts";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { financeHeader } from "components/Utilities/tableHeaders";
import displayPhoto from "assets/images/avatar.svg";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { isSelected } from "helpers/isSelected";
import { Loader } from "components/Utilities";
import { useLazyQuery } from "@apollo/client";
import { getEarningData } from "components/graphQL/useQuery";
import { defaultPageInfo } from "helpers/mockData";
import { changeTableLimit, handlePageChange } from "helpers/filterHelperFunctions";

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

const Financetable = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { selectedRows } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();
  const [pageInfo, setPageInfo] = useState(defaultPageInfo);
  const [earning, setEarning] = useState([]);
  const [fetchEarningData, { loading, data, error }] = useLazyQuery(getEarningData);

  useEffect(() => {
    fetchEarningData({
      variables: {
        first: pageInfo.limit,
      },
      notifyOnNetworkStatusChange: true,
    });
  }, [fetchEarningData, pageInfo]);

  useEffect(() => {
    if (data) {
      setEarning(data.getEarningStats.earningData.data);
      setPageInfo(data.getEarningStats.earningData.PageInfo);
    }
  }, [earning, data]);

  if (loading) return <Loader />;
  if (error) return <NoData error={error} />;
  return (
    <Grid container direction="column" gap={2} height="100%">
      <>
        <Grid item container gap={1} alignItems="center">
          <Grid item flex={1}>
            <Typography noWrap variant="h1" component="div" color="#2D2F39">
              Doctors Earnings table
            </Typography>
          </Grid>
          <Grid item className={classes.iconWrapper}>
            <TrendingDownIcon color="success" className={classes.cardIcon} />
          </Grid>
        </Grid>
        {earning.length > 0 ? (
          <Grid item container>
            <EnhancedTable
              headCells={financeHeader}
              rows={earning}
              paginationLabel="finance per page"
              hasCheckbox={true}
              changeLimit={async (e) => {
                await changeTableLimit(fetchEarningData, { first: e });
              }}
              dataPageInfo={pageInfo}
              handlePagination={async (page) => {
                await handlePageChange(fetchEarningData, page, pageInfo, {});
              }}
            >
              {earning.map((row, index) => {
                const { createdAt, balance, doctorData } = row;
                const { firstName, picture, lastName } = doctorData[0] || {};
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
                        onClick={() => handleSelectedRows(row.id, selectedRows, setSelectedRows)}
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
                    <TableCell align="left" className={classes.tableCell}>
                      {doctorData && doctorData[0] !== {} ? (
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
                              src={doctorData ? picture : displayPhoto}
                              sx={{ width: 24, height: 24 }}
                            />
                          </span>
                          <span style={{ fontSize: "1.25rem" }}>
                            {doctorData && `${firstName && firstName} ${lastName && lastName}`}
                          </span>
                        </div>
                      ) : (
                        "No name"
                      )}
                    </TableCell>
                    {/* 
                    <TableCell align="left" className={classes.tableCell}>
                      {specialization ? specialization : "No Value"}
                    </TableCell> */}
                    <TableCell
                      align="left"
                      className={classes.tableCell}
                      style={{ color: theme.palette.common.red }}
                    >
                      {formatNumber(balance.toFixed(2))}
                    </TableCell>
                  </TableRow>
                );
              })}
            </EnhancedTable>
          </Grid>
        ) : (
          <EmptyTable headCells={financeHeader} paginationLabel="Finance  per page" />
        )}
      </>
    </Grid>
  );
};

export default Financetable;
