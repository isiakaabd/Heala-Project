import React, { useState, useEffect, useCallback } from "react";
import {
  TableRow,
  Grid,
  Typography,
  TableCell,
  Card,
  Chip,
} from "@mui/material";
import { CustomSelect } from "components/validation/Select";

import {
  changeTableLimit,
  handlePageChange,
} from "helpers/filterHelperFunctions";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { defaultPageInfo } from "helpers/mockData";
import { Modals, Loader } from "components/Utilities";
import { EmptyTable, NoData } from "components/layouts";
import { useLazyQuery, useQuery } from "@apollo/client";
import EnhancedTable from "components/layouts/EnhancedTable";
import { hours, days, today } from "components/Utilities/Time";
import { availabilityHeadCells } from "components/Utilities/tableHeaders";
import {
  getAvailabilities,
  getDoctorAvailabilityForDate,
  getProviders,
  getAvailabilities1,
} from "components/graphQL/useQuery";
import useAlert from "hooks/useAlert";
const useStyles = makeStyles((theme) => ({
  tableCell: {
    "&.MuiTableCell-root": {
      fontSize: "1.25rem",
    },
  },

  button: {
    "&.MuiButton-root": {
      background: "#fff",
      color: theme.palette.common.grey,
      textTransform: "none",
      borderRadius: "2rem",
      display: "flex",
      alignItems: "center",
      padding: "1rem",
      maxWidth: "10rem",
      whiteSpace: "nowrap",

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

  badge: {
    "&.MuiChip-root": {
      fontSize: "1.2rem !important",
      height: "2.7rem",
      borderRadius: "1.3rem",
    },
  },
}));

const AvailabilityTable = () => {
  const { displayAlert } = useAlert();
  const [pageInfo, setPageInfo] = useState(defaultPageInfo);
  const { data: da } = useQuery(getProviders);

  const [availabilities, setAvailabilities] = useState([]);
  const [provider, setProvider] = useState("");
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState("");
  const [dropDown, setDropDown] = useState([]);
  const [select, setSelect] = useState(today());
  const [avail, setAvail] = useState("");

  const onChange = async (e) => {
    setProvider(e.target.value);
    setForm(e.target.value);
  };

  const classes = useStyles();
  const theme = useTheme();
  // redux
  /*   const { selectedRows } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions(); */
  //queries
  const [fetchAvailabilities, { loading: load, error }] =
    useLazyQuery(getAvailabilities);
  const [fetchAvailabilities1, { loading: load1, error: error1 }] =
    useLazyQuery(getAvailabilities1);
  const [loadings, setLoading] = useState(false);
  // providers drop down

  const [fetchDay, { loading, data: dt }] = useLazyQuery(
    getDoctorAvailabilityForDate
  );

  const setTableData = async (response, errMsg) => {
    response
      .then(({ data }) => {
        setPageInfo(data?.getAvailabilities?.pageInfo || []);
        setAvailabilities(
          data?.getAvailabilities?.availability || defaultPageInfo
        );
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
        displayAlert("error", errMsg);
      });
  };

  useEffect(() => {
    if (dt) {
      const { available, day, times } = dt?.getDoctorAvailabilityForDate;
      setAvail({
        available,
        day,
        times,
      });
    } else {
      setAvail({
        availale: false,
        day: "Not Available",
        times: [],
      });
    }
  }, [dt]);

  // providers drop down
  useEffect(() => {
    const x = {
      key: "All Stats",
      value: "",
    };
    if (da) {
      const data = da.getProviders.provider;
      const options = data?.map((i) => {
        return {
          key: i.name,
          value: i._id,
        };
      });
      setDropDown([x, ...options]);
    }
  }, [da]);

  useEffect(() => {
    if (provider === "") {
      fetchAvailabilities1({
        variables: {
          first: 5,
          day: select,
        },
      })
        .then(({ data }) => {
          if (data) {
            setPageInfo(data?.getAvailabilities?.pageInfo || []);
            setAvailabilities(
              data?.getAvailabilities?.availability || defaultPageInfo
            );
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(error);
        });
    } else {
      fetchAvailabilities({
        variables: {
          first: 5,
          providerId: provider,
          day: select,
        },
      })
        .then(({ data }) => {
          if (data) {
            setPageInfo(data?.getAvailabilities?.pageInfo || []);
            setAvailabilities(
              data?.getAvailabilities?.availability || defaultPageInfo
            );
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(error);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectChange = async (e) => {
    const { value } = e.target;
    setSelect(value);
    setLoading(true);
    const variables =
      provider && provider !== ""
        ? {
            first: 5,
            providerId: provider,
            day: value,
          }
        : {
            first: 5,
            day: value,
          };
    fetchAvailabilities({
      variables: variables,
    })
      .then(({ data }) => {
        if (data) {
          setPageInfo(data?.getAvailabilities?.pageInfo || []);
          setAvailabilities(
            data?.getAvailabilities?.availability || defaultPageInfo
          );
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
    setLoading(false);
  };

  const handleCheckDay = useCallback((day, doctor) => {
    setModal(true);
    fetchDay({
      variables: {
        day,
        doctor,
      },
    });
    //eslint-disable-next-line
  }, []);

  if (load || loadings || load1) return <Loader />;
  if (error || error1) return <NoData />;
  const { day, available, times } = avail;

  return (
    <>
      <Grid item container direction="column" height="100%">
        <Card
          variant="outlined"
          sx={{
            width: "100%",
            borderRadius: "1.5rem",
            borderColor: "transparent",
            p: 2,
            mt: 2,
          }}
        >
          <Grid item container alignItems="center" gap={2} sx={{ mb: 2 }}>
            <Grid item flex={1}>
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: "20px",
                  lineHeight: "25px",
                  letterSpacing: "-0.01em",
                  color: "#010101",
                }}
              >
                Doctor Availability
              </Typography>
            </Grid>
            <Grid item>
              <CustomSelect
                value={form}
                onChange={onChange}
                options={dropDown}
                name="availability-dropdown"
              />
            </Grid>
            <Grid item>
              <CustomSelect
                value={select}
                onChange={handleSelectChange}
                options={days}
                name="select"
              />
            </Grid>
          </Grid>
          {availabilities?.length > 0 ? (
            <Grid
              item
              container
              direction="column"
              overflow="hidden"
              sx={{ mt: 2 }}
              maxWidth={{ md: "100%", sm: "100%", xs: "100%" }}
            >
              <EnhancedTable
                headCells={availabilityHeadCells}
                rows={availabilities}
                paginationLabel="Availabilities per page"
                hasCheckbox={false}
                changeLimit={async (e) => {
                  const variables =
                    provider && provider !== ""
                      ? {
                          first: e,
                          day: select,
                          providerId: provider,
                        }
                      : {
                          first: e,
                          day: select,
                        };
                  const res = changeTableLimit(fetchAvailabilities, variables);

                  await setTableData(res, "Failed to change table limit.");
                }}
                dataPageInfo={pageInfo}
                handlePagination={async (page) => {
                  const variables =
                    provider && provider !== ""
                      ? {
                          providerId: provider,
                          day: select,
                        }
                      : {
                          day: select,
                        };
                  const res = handlePageChange(
                    fetchAvailabilities,
                    page,
                    pageInfo,
                    variables
                  );
                  await setTableData(res, "Failed to change page.");
                }}
              >
                {availabilities?.map((row, index) => {
                  const { _id, doctorData, day, times, doctor } = row;

                  const startTime = hours(times && times[0]?.start);
                  const endTime = hours(times && times[times?.length - 1].stop);

                  if (doctorData?.firstName) {
                    const labelId = `enhanced-table-checkbox-${index}`;
                    /* const isItemSelected = isSelected(_id, selectedRows); */

                    return (
                      <TableRow
                        hover
                        tabIndex={-1}
                        key={_id}
                        sx={{ cursor: "pointer" }}
                        onClick={() => handleCheckDay(day, doctor)}
                      >
                        {/* <TableCell padding="checkbox">
                          <Checkbox
                            onClick={() =>
                              handleSelectedRows(
                                _id,
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
                        </TableCell> */}
                        <TableCell
                          id={labelId}
                          scope="row"
                          align="left"
                          className={classes.tableCell}
                          style={{ color: theme.palette.common.grey }}
                        >
                          {doctorData?.dociId?.split("-")[1]}
                        </TableCell>
                        <TableCell align="left" className={classes.tableCell}>
                          <div
                            style={{
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
                              textAlign: "left",
                            }}
                          >
                            {/* <span style={{ marginRight: "1rem" }}>
                            <Avatar
                              alt={`${doctorData?.firstName} ${doctorData?.lastName}`}
                              src={picture ? picture : displayPhoto}
                              sx={{ width: 24, height: 24 }}
                            />
                          </span> */}
                            <span style={{ fontSize: "1.25rem" }}>
                              {doctorData?.firstName
                                ? `${doctorData?.firstName} ${doctorData?.lastName}`
                                : "no name"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="left" className={classes.tableCell}>
                          {day}
                        </TableCell>
                        <TableCell
                          align="left"
                          className={classes.tableCell}
                          style={{
                            color: theme.palette.common.red,
                          }}
                        >
                          <Chip
                            label={startTime}
                            className={classes.badge}
                            style={{
                              background: theme.palette.common.lightRed,
                              color: theme.palette.common.red,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          align="left"
                          className={classes.tableCell}
                          style={{
                            color: theme.palette.common.red,
                          }}
                        >
                          <Chip
                            label={endTime}
                            className={classes.badge}
                            style={{
                              background: theme.palette.common.lightRed,
                              color: theme.palette.common.red,
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  }
                })}
              </EnhancedTable>
            </Grid>
          ) : (
            <EmptyTable
              headCells={availabilityHeadCells}
              paginationLabel="Availability  per page"
            />
          )}
        </Card>
      </Grid>
      <Modals
        isOpen={modal}
        title="Available Day"
        rowSpacing={5}
        width="10vw"
        handleClose={() => setModal(false)}
      >
        {loading && <Loader />}
        <Grid item container alignItems="center" gap={2}>
          <Typography variant="h4">{day}</Typography>
          <div
            style={{
              background: available
                ? theme.palette.common.green
                : theme.palette.common.red,
              width: "20px",
              height: "20px",
              borderRadius: "50%",
            }}
          ></div>
        </Grid>
        <Grid item container gap={1}>
          {times
            ? times?.map((time, ind) => {
                const { start, stop } = time;
                return (
                  <Chip
                    key={ind}
                    label={`${hours(start)} - ${hours(stop)} `}
                    className={classes.badge}
                    style={{
                      background: theme.palette.common.lightRed,
                      color: theme.palette.common.red,
                    }}
                  />
                );
              })
            : "No Time"}
        </Grid>
      </Modals>
    </>
  );
};

export default AvailabilityTable;
