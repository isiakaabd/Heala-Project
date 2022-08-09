import React, { useState, useEffect } from "react";
import { TableRow, Grid, Typography, Checkbox, TableCell, Avatar, Chip } from "@mui/material";
import EnhancedTable from "./EnhancedTable";
import { isSelected } from "helpers/isSelected";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { availabilityHeadCells } from "components/Utilities/tableHeaders";
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
  badge1: {
    "&.MuiBadge-root": {
      color: "#232 !Important",
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
    setAvaliablity(data?.availableDoctors);
  }, [data]);

  const classes = useStyles();
  const { selectedRows } = useSelector((state) => state.tables);

  const { setSelectedRows } = useActions();
  const theme = useTheme();
  console.log(data);
  return (
    <Grid item container direction="column" height="100%" rowGap={2}>
      <Grid item>
        <Typography variant="h4">Availability Table</Typography>
      </Grid>
      {avaliablity?.length > 0 ? (
        <Grid
          item
          container
          direction="column"
          overflow="hidden"
          maxWidth={{ md: "100%", sm: "100%", xs: "100%" }}
        >
          <EnhancedTable
            headCells={availabilityHeadCells}
            rows={avaliablity}
            paginationLabel="List per page"
            title="Availability Calendar"
            hasCheckbox={true}
            hasPagination={false}
          >
            {avaliablity.map((row, index) => {
              const { _id, picture, availability, firstName, lastName, dociId } = row;
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
                        flexWrap: "nowrap",
                        alignItems: "center",
                        textAlign: "left",
                      }}
                    >
                      <span style={{ marginRight: "1rem", display: "inline-block" }}>
                        <Avatar
                          alt={`${firstName} ${lastName}`}
                          src={picture ? picture : displayPhoto}
                          sx={{ width: 24, height: 24 }}
                        />
                      </span>
                      <span
                        style={{ fontSize: "1.25rem", display: "inline-block" }}
                      >{`${firstName} ${lastName}`}</span>
                    </div>
                  </TableCell>
                  <TableCell align="left" className={classes.tableCell}>
                    {data.today ? data.today : "No Value"}
                  </TableCell>
                  <TableCell align="left" className={classes.tableCell}>
                    <Grid container alignItems="center" gap={1}>
                      {availability
                        ? availability?.times?.map((time, ind) => {
                            const { start, stop, available } = time;
                            const Bool = Boolean(available);
                            return (
                              <Chip
                                key={ind}
                                label={`${hours(start)} - ${hours(stop)} `}
                                className={classes.badge}
                                style={{
                                  background: Bool
                                    ? theme.palette.common.lightGreen
                                    : theme.palette.common.lightRed,
                                  color: Bool
                                    ? theme.palette.common.green
                                    : theme.palette.common.red,
                                  textDecoration: Bool ? "" : "line-through",
                                }}
                              />
                            );
                          })
                        : "No Time"}
                    </Grid>
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
  );
};
AvailabilityTable.propTypes = {
  data: PropTypes.object,
};

export default AvailabilityTable;
