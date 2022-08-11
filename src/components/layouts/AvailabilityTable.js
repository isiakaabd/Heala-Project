import React, { useState, useEffect, useCallback } from "react";
import {
  TableRow,
  Grid,
  Typography,
  TableCell,
  Avatar,
  Chip,
  Button,
  Checkbox,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useSelector } from "react-redux";
import { handleSelectedRows } from "helpers/selectedRows";
import { changeTableLimit, handlePageChange } from "helpers/filterHelperFunctions";
import EnhancedTable from "components/layouts/EnhancedTable";
import { Modals, Loader } from "components/Utilities";
import { isSelected } from "helpers/isSelected";
import { availabilityHeadCells } from "components/Utilities/tableHeaders";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import displayPhoto from "assets/images/avatar.svg";
import { hours } from "components/Utilities/Time";
import { EmptyTable } from "components/layouts";
import { useActions } from "components/hooks/useActions";
import PropTypes from "prop-types";
import { useLazyQuery } from "@apollo/client";
import { defaultPageInfo } from "helpers/mockData";
import { getAvailabilities, getDoctorAvailabilityForDate } from "components/graphQL/useQuery";
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

const AvailabilityTable = ({ data }) => {
  const [pageInfo, setPageInfo] = useState({
    page: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
    limit: 10,
    totalDocs: 0,
  });
  const [modal, setModal] = useState(false);
  const [fetchAvailabilities, { loading: load }] = useLazyQuery(getAvailabilities);
  const [fetchDay, { loading, data: dt }] = useLazyQuery(getDoctorAvailabilityForDate);
  const [avail, setAvail] = useState("");
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
  useEffect(() => {
    fetchAvailabilities({
      variables: {
        first: 5,
      },
    });
  }, [fetchAvailabilities]);

  useEffect(() => {
    fetchAvailabilities({
      variables: {
        first: 5,
      },
    }).then(({ data }) => {
      if (data) {
        setPageInfo(data?.getAvailabilities?.pageInfo || []);
        setAvailabilities(data?.getAvailabilities?.availability || defaultPageInfo);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { selectedRows } = useSelector((state) => state.tables);

  const { setSelectedRows } = useActions();
  const [availabilities, setAvailabilities] = useState([]);

  const setTableData = async (response, errMsg) => {
    response
      .then(({ data }) => {
        setPageInfo(data?.getAvailabilities?.pageInfo || []);
        setAvailabilities(data?.getAvailabilities?.availability || defaultPageInfo);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const classes = useStyles();
  const theme = useTheme();
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
  if (load) return <Loader />;
  const { day, available, times } = avail;
  return (
    <>
      <Grid item container direction="column" height="100%" rowGap={2}>
        <Grid item>
          <Typography variant="h4">Availability Table</Typography>
        </Grid>
        {availabilities?.length > 0 ? (
          <Grid
            item
            container
            direction="column"
            overflow="hidden"
            maxWidth={{ md: "100%", sm: "100%", xs: "100%" }}
          >
            <EnhancedTable
              headCells={availabilityHeadCells}
              rows={availabilities}
              paginationLabel="Availabilities per page"
              hasCheckbox={true}
              changeLimit={async (e) => {
                const res = changeTableLimit(fetchAvailabilities, {
                  first: e,
                });

                await setTableData(res, "Failed to change table limit.");
              }}
              dataPageInfo={pageInfo}
              handlePagination={async (page) => {
                const res = handlePageChange(fetchAvailabilities, page, pageInfo);
                await setTableData(res, "Failed to change page.");
              }}
            >
              {availabilities?.map((row, index) => {
                const { _id, picture, firstName, lastName, dociId, day, times, doctor } = row;
                const labelId = `enhanced-table-checkbox-${index}`;
                const isItemSelected = isSelected(_id, selectedRows);

                return (
                  <TableRow hover tabIndex={-1} key={_id}>
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
                      style={{ color: theme.palette.common.grey }}
                    >
                      {dociId ? dociId?.split("-")[1] : "No Value"}
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
                        <span style={{ marginRight: "1rem" }}>
                          <Avatar
                            alt="Remy Sharp"
                            src={picture ? picture : displayPhoto}
                            sx={{ width: 24, height: 24 }}
                          />
                        </span>
                        <span style={{ fontSize: "1.25rem" }}>
                          {firstName ? `${firstName} ${lastName}` : "no name"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell align="left" className={classes.tableCell}>
                      {day ? day : "No Value"}
                    </TableCell>
                    <TableCell align="left" className={classes.tableCell}>
                      <Grid container gap={1}>
                        {times
                          ? times?.map((time, ind) => {
                              const { start, stop } = time;
                              return (
                                <Chip
                                  key={ind}
                                  label={`${hours(start)} - ${hours(stop)} `}
                                  className={classes.badge}
                                  style={{
                                    // background: !!available
                                    //   ? theme.palette.common.lightGreen
                                    //   :
                                    background: theme.palette.common.lightRed,
                                    color:
                                      // !!available
                                      //   ? theme.palette.common.green
                                      //   :
                                      theme.palette.common.red,
                                    // textDecoration: !!available
                                    //   ? ""
                                    //   : "line-through",
                                  }}
                                />
                              );
                            })
                          : "No Time"}
                      </Grid>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        className={classes.button}
                        // component={Link}
                        onClick={() => handleCheckDay(day, doctor)}
                        endIcon={<ArrowForwardIosIcon />}
                      >
                        View Time
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </EnhancedTable>
          </Grid>
        ) : (
          <EmptyTable headCells={availabilityHeadCells} paginationLabel="Availability  per page" />
        )}
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
              background: available ? theme.palette.common.green : theme.palette.common.red,
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
AvailabilityTable.propTypes = {
  data: PropTypes.object,
};

export default AvailabilityTable;
