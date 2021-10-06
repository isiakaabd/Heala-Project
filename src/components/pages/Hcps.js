import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import Search from "components/Utilities/Search";
import FilterList from "components/Utilities/FilterList";
import CustomButton from "components/Utilities/CustomButton";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import EnhancedTable from "components/layouts/EnhancedTable";
import { hcpsHeadCells } from "components/Utilities/tableHeaders";
import { hcpsRows } from "components/Utilities/tableData";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import displayPhoto from "assets/images/avatar.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { isSelected } from "helpers/isSelected";

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
      padding: "0.5rem",
      maxWidth: "7rem",
      fontSize: ".85rem",

      "&:hover": {
        background: "#fcfcfc",
      },

      "&:active": {
        background: "#fafafa",
      },

      "& .MuiButton-endIcon>*:nth-of-type(1)": {
        fontSize: "0.85rem",
      },

      "& .MuiButton-endIcon": {
        marginLeft: ".2rem",
        marginTop: "-.2rem",
      },
    },
  },
  badge: {
    "&.MuiChip-root": {
      fontSize: "1.25rem !important",
      height: "2.7rem",
      borderRadius: "1.3rem",
    },
  },
}));

const options = [
  { id: 0, value: "Name" },
  { id: 1, value: "consultations" },
];

const Hcps = () => {
  const classes = useStyles();
  const theme = useTheme();

  const buttonType = {
    background: theme.palette.success.main,
    hover: theme.palette.success.light,
    active: theme.palette.success.dark,
  };

  const [searchHcp, setSearchHcp] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { rowsPerPage, selectedRows, page } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();

  return (
    <Grid container direction="column">
      <Grid item container>
        <Grid item className={classes.searchGrid}>
          <Search
            value={searchHcp}
            onChange={(e) => setSearchHcp(e.target.value)}
            placeholder="Type to search HCPs..."
            height="5rem"
          />
        </Grid>
        <Grid item className={classes.filterBtnGrid}>
          <FilterList
            onClick={(event) => setAnchorEl(event.currentTarget)}
            open={open}
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            title="Filter HCPs"
            options={options}
          />
        </Grid>
        <Grid item>
          <CustomButton endIcon={<AddIcon />} title="Add HCP" type={buttonType} />
        </Grid>
      </Grid>
      <Grid item container style={{ marginTop: "5rem" }}>
        <EnhancedTable
          headCells={hcpsHeadCells}
          rows={hcpsRows}
          page={page}
          paginationLabel="Patients per page"
          hasCheckbox={true}
        >
          {hcpsRows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {
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
                    style={{ color: theme.palette.common.grey, minWidth: "10rem" }}
                  >
                    {row.id}
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
                        <Avatar
                          alt={`Display Photo of ${row.name}`}
                          src={displayPhoto}
                          sx={{ width: 24, height: 24 }}
                        />
                      </span>
                      <span style={{ fontSize: "1.25rem" }}>{row.name}</span>
                    </div>
                  </TableCell>
                  <TableCell
                    align="center"
                    className={classes.tableCell}
                    style={{ color: theme.palette.common.grey }}
                  >
                    {row.specialization}
                  </TableCell>
                  <TableCell align="center" className={classes.tableCell}>
                    {row.consultation}
                  </TableCell>
                  <TableCell
                    align="center"
                    className={classes.tableCell}
                    style={{ color: theme.palette.common.grey }}
                  >
                    {row.hospital}
                  </TableCell>
                  <TableCell align="center" className={classes.tableCell}>
                    <Chip
                      label={row.status}
                      className={classes.badge}
                      style={{
                        background:
                          row.status === "Active"
                            ? theme.palette.common.lightGreen
                            : theme.palette.common.lightRed,
                        color:
                          row.status === "Active"
                            ? theme.palette.common.green
                            : theme.palette.common.red,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      className={classes.button}
                      component={Link}
                      to={`hcps/${row.id}`}
                      endIcon={<ArrowForwardIosIcon />}
                    >
                      View Profile
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
        </EnhancedTable>
      </Grid>
    </Grid>
  );
};

export default Hcps;
