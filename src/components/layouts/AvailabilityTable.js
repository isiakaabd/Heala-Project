import React, { useState, useEffect } from "react";
import { TableRow, Grid, Typography, TableCell, Avatar, Chip } from "@mui/material";
import EnhancedTable from "./EnhancedTable";
import { availabilityHeadCells } from "components/Utilities/tableHeaders";
// import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import displayPhoto from "assets/images/avatar.svg";
import { hours } from "components/Utilities/Time";
import { EmptyTable } from "components/layouts";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  tableCell: {
    "&.MuiTableCell-root": {
      fontSize: "1.25rem",
    },
  },
  button: {
    "&.MuiButton-root": {
      ...theme.typography.rowBtn,
      paddingTop: ".5rem",
      paddingBottom: ".5rem",
      background: theme.palette.common.lightGrey,
      color: theme.palette.primary.dark,

      "&:hover": {
        background: "#ccc",
      },

      "&:active": {
        background: theme.palette.primary.light,
        color: "#fff",
      },

      "& .MuiButton-endIcon>*:nth-of-type(1)": {
        fontSize: "1.2rem",
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
  const [avaliablity, setAvaliablity] = useState([]);
  useEffect(() => {
    setAvaliablity(data);
  }, [data]);

  const classes = useStyles();
  const theme = useTheme();

  // const { page, rowsPerPage } = useSelector((state) => state.tables);

  return (
    <Grid item container direction="column" height="100%" rowGap={2}>
      <Grid item>
        <Typography variant="h4">Availability Table</Typography>
      </Grid>
      {avaliablity && avaliablity.length > 0 ? (
        <Grid
          item
          container
          direction="column"
          overflow="hidden"
          maxWidth={{ md: "100%", sm: "100%", xs: "100%" }}
        >
          <EnhancedTable
            title="Availability Calendar"
            headCells={availabilityHeadCells}
            rows={avaliablity}
            paginationLabel="List per page"
            hasCheckbox={false}
            hasPagination={false}
          >
            {avaliablity.map((row, index) => {
              const { _id, doctorData, times, day } = row;
              const labelId = `enhanced-table-checkbox-${index}`;
              const rowdata = doctorData && (
                <TableRow hover tabIndex={-1} key={_id}>
                  <TableCell
                    id={labelId}
                    scope="row"
                    align="left"
                    className={classes.tableCell}
                    style={{ color: theme.palette.common.grey }}
                  >
                    {doctorData ? doctorData?.dociId : "no doctor"}
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
                          src={doctorData ? doctorData.picture : displayPhoto}
                          sx={{ width: 24, height: 24 }}
                        />
                      </span>
                      <span style={{ fontSize: "1.25rem" }}>
                        {doctorData
                          ? `${doctorData?.firstName} ${doctorData?.lastName}`
                          : "no name"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell align="left" className={classes.tableCell}>
                    {day && day}
                  </TableCell>
                  <TableCell align="left" className={classes.tableCell}>
                    <Grid container gap={1}>
                      {times &&
                        times.map((time) => {
                          return (
                            <Chip
                              key={index}
                              label={`${hours(time.start)} - ${hours(time.stop)} `}
                              className={classes.badge}
                              style={{
                                background: theme.palette.common.lightGreen,
                                color: theme.palette.common.green,
                              }}
                            />
                          );
                        })}
                    </Grid>
                  </TableCell>
                </TableRow>
              );
              return rowdata;
            })}
          </EnhancedTable>
        </Grid>
      ) : (
        <EmptyTable headCells={availabilityHeadCells} paginationLabel="Availability  per page" />
      )}
    </Grid>
  );
};
AvailabilityTable.propTypes = {
  data: PropTypes.object,
};

export default AvailabilityTable;
