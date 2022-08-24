import React, { useEffect, useState } from "react";
import { NoData, EmptyTable } from "components/layouts";
import { Grid, Typography, Checkbox, TableRow, TableCell } from "@mui/material";
import { timeMoment, dateMoment } from "components/Utilities/Time";
import { Loader } from "components/Utilities";
import { useLazyQuery } from "@apollo/client";
import { getMyEarnings } from "components/graphQL/useQuery";
import { EnhancedTable } from "components/layouts";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { payoutHeaders } from "components/Utilities/tableHeaders";
import useAlert from "hooks/useAlert";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { isSelected } from "helpers/isSelected";
// import Filter from "components/Forms/Filters";
import { useParams } from "react-router-dom";
import { defaultPageInfo } from "helpers/mockData";
import { changeTableLimit, fetchMoreData, handlePageChange } from "helpers/filterHelperFunctions";

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

const DoctorEarning = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { hcpId } = useParams();
  const { displayAlert } = useAlert();
  const { selectedRows } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();
  const [payout, setPayout] = useState([]);
  const [pageInfo, setPageInfo] = useState(defaultPageInfo);

  // const [statusFilterValue, setStatusFilterValue] = useState("");
  const [fetchPayout, { loading, error }] = useLazyQuery(getMyEarnings);
  // refetch, variables
  useEffect(() => {
    try {
      fetchPayout({ variables: { first: pageInfo?.limit, doctor: hcpId } }).then(({ data }) => {
        if (!data) throw Error("Couldn't fetch doctors payout data");
        setPageInfo(data?.getMyEarnings?.pageInfo);
        setPayout(data?.getMyEarnings?.data);
      });
    } catch (error) {
      console.error(error);
    }
  }, [fetchPayout, pageInfo?.limit, hcpId]);

  // const onFilterStatusChange = async (value) => {
  //   try {
  //     deleteVar(variables);
  //     setStatusFilterValue(value);
  //     const filterVariables = { status: value };

  //     filterData(filterVariables, {
  //       fetchData: fetchPayout,
  //       refetch: refetch,
  //       variables: variables,
  //     })
  //       .then((data) => {
  //         setPayout(data?.getMyEarnings?.data || []);
  //         setPageInfo(data?.getMyEarnings?.pageInfo || {});
  //       })
  //       .catch(() => {
  //         refresh(setStatusFilterValue, "");
  //       });
  //   } catch (error) {
  //     console.error(error);
  //     refresh(setStatusFilterValue, "");
  //   }
  // };

  // const refresh = async (setFilterValue, defaultVal) => {
  //   displayAlert("error", `Something went wrong while filtering. Try again.`);
  //   setFilterValue(defaultVal);
  //   deleteVar(variables);
  //   refetch()
  //     .then(({ data }) => {
  //       setPayout(data?.getMyEarnings?.data || []);
  //       setPageInfo(data?.getMyEarnings?.pageInfo || {});
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       displayAlert("error", `Failed to get patients data, Try again`);
  //     });
  // };

  const setTableData = async (response, errMsg) => {
    const data = response?.data;
    try {
      if (data) {
        setPageInfo(data?.getMyEarnings?.pageInfo || defaultPageInfo);
        setPayout(data?.getMyEarnings?.data || []);
      }
    } catch (error) {
      console.error(error);
      displayAlert("error", errMsg);
    }
  };

  if (error) return <NoData error={error} />;
  if (loading) return <Loader />;
  return (
    <Grid container direction="column" rowSpacing={2}>
      <>
        <Grid item container justifyContent="space-between" style={{ paddingBottom: "3rem" }}>
          <Grid item container spacing={3} alignItems="center">
            <Grid item flex={1}>
              <Typography noWrap variant="h1" color="#2D2F39">
                Doctors Earnings Table
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {payout.length > 0 ? (
          <Grid item container>
            <EnhancedTable
              headCells={payoutHeaders}
              rows={payout}
              paginationLabel="Earning per page"
              hasCheckbox={true}
              changeLimit={async (e) => {
                const res = await changeTableLimit(fetchPayout, { first: e, doctor: hcpId });
                await setTableData(res, "Failed to change table limit.");
              }}
              dataPageInfo={pageInfo}
              handlePagination={async (page) => {
                const res = await handlePageChange(fetchPayout, page, pageInfo, { doctor: hcpId });
                await setTableData(res, "Failed to change table page.");
              }}
              fetchData={fetchPayout}
              handleChangePage={fetchMoreData}
            >
              {payout.map((row, index) => {
                const { balance, createdAt, _id, doctorData } = row;
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
                    {/* <TableCell align="left" className={classes.tableCell}>
                      <Chip
                        label={status ? status : "No Value"}
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
                    </TableCell> */}
                  </TableRow>
                );
              })}
            </EnhancedTable>
          </Grid>
        ) : (
          <EmptyTable headCells={payoutHeaders} paginationLabel="Earnings  per page" />
        )}
      </>
    </Grid>
  );
};

export default DoctorEarning;
