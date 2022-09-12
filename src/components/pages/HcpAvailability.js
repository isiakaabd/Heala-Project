import { Modals, Loader } from "components/Utilities";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { EmptyTable } from "components/layouts";
import { useTheme } from "@mui/material/styles";
import { handleSelectedRows } from "helpers/selectedRows";
import { isSelected } from "helpers/isSelected";
import { useLazyQuery } from "@apollo/client";

import { NoData } from "components/layouts";
import React, { useState, useEffect, useCallback } from "react";
import { useActions } from "components/hooks/useActions";
import {
  TableRow,
  Grid,
  Typography,
  TableCell,
  Card,
  Chip,
  Checkbox,
} from "@mui/material";
import {
  getDoctorAvailabilityForDate,
  getAvailabilities,
} from "components/graphQL/useQuery";
import { hours, days, today } from "components/Utilities/Time";
import { CustomSelect } from "components/validation/Select";
import {
  changeTableLimit,
  handlePageChange,
} from "helpers/filterHelperFunctions";
import EnhancedTable from "components/layouts/EnhancedTable";
import { availabilityHeadCells10 } from "components/Utilities/tableHeaders";
import { makeStyles } from "@mui/styles";
import { defaultPageInfo } from "helpers/mockData";

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

const HcpAvailability = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [pageInfo, setPageInfo] = useState({
    page: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
    limit: 10,
    totalDocs: 0,
  });

  const [availabilities, setAvailabilities] = useState([]);
  const { hcpId } = useParams();

  const [fetchDay, { data: dt, loading: load2 }] = useLazyQuery(
    getDoctorAvailabilityForDate
  );
  const [fetchAvailabilities, { data, error, loading }] =
    useLazyQuery(getAvailabilities);

  // useEffect(() => {
  //   fetchAvailabilities({
  //     variables: {
  //       first: pageInfo.limit,
  //       id: hcpId,
  //       day: today(),
  //     },
  //   });

  //   if (data) {
  //     console.log(data);
  //     setPageInfo(data?.getAvailabilities?.pageInfo || []);
  //     setAvailabilities(
  //       data?.getAvailabilities?.availability || defaultPageInfo
  //     );
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [data]);

  const [select, setSelect] = useState(today());
  const [modal, setModal] = useState(false);
  const [avail, setAvail] = useState("");

  const setTableData = async (response, errMsg) => {
    if (response?.data) {
      setPageInfo(response?.data?.getAvailabilities?.pageInfo || []);
      setAvailabilities(
        response?.data?.getAvailabilities?.availability || defaultPageInfo
      );
    } else {
      console.error(errMsg);
    }
  };
  const [loadings, setLoading] = useState(false);

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
  const { selectedRows } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();
  const handleSelectChange = async (e) => {
    const { value } = e.target;

    setLoading(true);
    await fetchAvailabilities({
      variables: {
        first: 5,
        day: value,
        id: hcpId,
      },
    });
    setLoading(false);
    setSelect(value);
  };

  useEffect(() => {
    if (data) {
      setPageInfo(data?.getAvailabilities?.pageInfo || []);
      setAvailabilities(
        data?.getAvailabilities?.availability || defaultPageInfo
      );
    }
  }, [select, data]);

  const { day, available, times } = avail;

  if (loading || loadings) return <Loader />;
  if (error) return <NoData error={error} />;
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
          }}
        >
          <Grid item container alignItems="center" gap={2}>
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
                Doctor Availabilities
              </Typography>
            </Grid>
            <Grid item>
              <CustomSelect
                value={select}
                onChange={handleSelectChange}
                options={days}
                name="select"
              />
            </Grid>
            {/* <Grid item>
              <CustomSelect
                value={form}
                onChange={onChange}
                options={dropDown}
                name="availability-dropdown"
              />
            </Grid> */}
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
                headCells={availabilityHeadCells10}
                rows={availabilities}
                paginationLabel="Availabilities per page"
                hasCheckbox={true}
                changeLimit={async (e) => {
                  const res = await changeTableLimit(fetchAvailabilities, {
                    first: e,
                    day: select,
                    id: hcpId,
                  });

                  await setTableData(res, "Failed to change table limit.");
                }}
                dataPageInfo={pageInfo}
                handlePagination={async (page) => {
                  const res = handlePageChange(
                    fetchAvailabilities,
                    page,
                    pageInfo,
                    {
                      day: select,
                      id: hcpId,
                    }
                  );
                  await setTableData(res, "Failed to change page.");
                }}
              >
                {availabilities?.map((row, index) => {
                  const { _id, day, times, doctor } = row;
                  const startTime = hours(times[0].start);
                  const endTime = hours(times[times.length - 1].stop);

                  const labelId = `enhanced-table-checkbox-${index}`;
                  const isItemSelected = isSelected(_id, selectedRows);

                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={_id}
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleCheckDay(day, doctor)}
                    >
                      <TableCell padding="checkbox">
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
                      </TableCell>
                      {/* <TableCell
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
                          </span> 
                          <span style={{ fontSize: "1.25rem" }}>
                            {doctorData?.firstName
                              ? `${doctorData?.firstName} ${doctorData?.lastName}`
                              : "no name"}
                          </span>
                        </div>
                      </TableCell> */}
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
                })}
              </EnhancedTable>
            </Grid>
          ) : (
            <EmptyTable
              headCells={availabilityHeadCells10}
              paginationLabel="Availability  per page"
            />
          )}
        </Card>
      </Grid>
      <Modals
        isOpen={modal}
        title="Doctor Availability Time"
        rowSpacing={5}
        width="10vw"
        handleClose={() => setModal(false)}
      >
        {load2 && <Loader />}
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

export default HcpAvailability;
