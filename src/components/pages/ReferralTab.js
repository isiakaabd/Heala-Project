import React, { useState } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import Search from "components/Utilities/Search";
import FilterList from "components/Utilities/FilterList";
import EnhancedTable from "components/layouts/EnhancedTable";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { rows } from "components/Utilities/DataHeader";
import { referralHeader } from "components/Utilities/tableHeaders";
import Avatar from "@mui/material/Avatar";
import displayPhoto from "assets/images/avatar.png";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { isSelected } from "helpers/isSelected";
import Chip from "@mui/material/Chip";

const useStyles = makeStyles((theme) => ({
  searchGrid: {
    "&.MuiGrid-root": {
      flex: 1,
      marginRight: "5rem",
    },
  },
  filterBtnGrid: {
    "&.MuiGrid-root": {
      marginRight: "3rem",
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
      width: "10rem",

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

  tableCell: {
    "&.MuiTableCell-root": {
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

const ReferralTab = ({ setSelectedSubMenu }) => {
  const classes = useStyles();
  const theme = useTheme();

  const { rowsPerPage, selectedRows, page } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();

  const [searchMail, setSearchMail] = useState("");

  return (
    <Grid container direction="column">
      <Grid item container>
        <Grid item className={classes.searchGrid}>
          <Search
            value={searchMail}
            onChange={(e) => setSearchMail(e.target.value)}
            placeholder="Type to search referrals..."
            height="5rem"
          />
        </Grid>
        <Grid item>
          <FilterList onClick={() => console.log("Clicked")} title="Filter by" />
        </Grid>
      </Grid>
      {/* The Search and Filter ends here */}
      <Grid item container style={{ marginTop: "5rem" }}>
        <EnhancedTable
          headCells={referralHeader}
          rows={rows}
          page={page}
          paginationLabel="referral per page"
          hasCheckbox={true}
        >
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
            const isItemSelected = isSelected(row.id, selectedRows);

            const labelId = `enhanced-table-checkbox-${index}`;

            return (
              <TableRow
                hover
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row.id}
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
                  align="center"
                  className={classes.tableCell}
                  style={{ color: theme.palette.common.black }}
                >
                  {row.entryDate}
                </TableCell>
                <TableCell
                  id={labelId}
                  scope="row"
                  align="left"
                  className={classes.tableCell}
                  style={{ color: theme.palette.common.black }}
                >
                  {row.time}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ marginRight: "1rem" }}>
                      <Avatar alt="Remy Sharp" src={displayPhoto} sx={{ width: 24, height: 24 }} />
                    </span>
                    <span style={{ fontSize: "1.25rem" }}>
                      {row.firstName} {row.lastName}
                    </span>
                  </div>
                </TableCell>
                <TableCell
                  align="center"
                  className={classes.tableCell}
                  style={{ color: theme.palette.common.black }}
                >
                  {row.specialization}
                </TableCell>
                <TableCell align="left" className={classes.tableCell}>
                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ marginRight: "1rem" }}>
                      <Avatar alt="Remy Sharp" src={displayPhoto} sx={{ width: 24, height: 24 }} />
                    </span>
                    <span style={{ fontSize: "1.25rem" }}>
                      {row.firstName} {row.lastName}
                    </span>
                  </div>
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  <Chip
                    label={row.status}
                    className={classes.badge}
                    style={{
                      background:
                        row.status === "active"
                          ? theme.palette.common.lightGreen
                          : theme.palette.common.lightRed,
                      color:
                        row.status === "active"
                          ? theme.palette.common.green
                          : theme.palette.common.red,
                    }}
                  />
                </TableCell>
                {/* <TableCell>
                  <Button
                    variant="contained"
                    className={classes.button}
                    component={Link}
                    to={`/referrals/${row.id}`}
                    endIcon={<ArrowForwardIosIcon />}
                    onClick={() => setSelectedSubMenu(10)}
                  >
                    View referral
                  </Button>
                </TableCell> */}
              </TableRow>
            );
          })}
        </EnhancedTable>
      </Grid>
    </Grid>
  );
};

ReferralTab.propTypes = {
  setSelectedSubMenu: PropTypes.func.isRequired,
};

export default ReferralTab;
