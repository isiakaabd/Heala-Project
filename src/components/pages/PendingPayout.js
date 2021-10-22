import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import EnhancedTable from "components/layouts/EnhancedTable";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { rows } from "components/Utilities/DataHeader";
import { pendingHeader } from "components/Utilities/tableHeaders";
import Avatar from "@mui/material/Avatar";
import displayPhoto from "assets/images/avatar.png";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import CustomButton from "components/Utilities/CustomButton";
import { isSelected } from "helpers/isSelected";
import Chip from "@mui/material/Chip";
import PreviousButton from "components/Utilities/PreviousButton";

const useStyles = makeStyles((theme) => ({
  searchGrid: {
    "&.css-13i4rnv-MuiGrid-root": {
      flex: 1,
      marginRight: "5rem",
    },
  },
  iconWrapper: {
    width: 20,
    height: 20,
    borderRadius: "50%",
    display: "grid",
    placeContent: "center",
    marginLeft: "1rem",
    background: theme.palette.common.lightRed,
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

const PendingPayout = ({ selectedMenu, selectedSubMenu, setSelectedMenu, setSelectedSubMenu }) => {
  const classes = useStyles();
  const theme = useTheme();
  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
  };

  const { rowsPerPage, selectedRows, page } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();

  useEffect(() => {
    setSelectedMenu(8);
    setSelectedSubMenu(9);

    // eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu]);

  return (
    <Grid container direction="column" rowSpacing={2}>
      <Grid item>
        <PreviousButton path="/finance" onClick={() => setSelectedSubMenu(0)} />
      </Grid>

      <Grid item container justifyContent="space-between" style={{ paddingBottom: "3rem" }}>
        <Grid item>
          <Grid item container alignItems="center">
            <Typography noWrap variant="h1" component="div" color="#2D2F39">
              Pending Payout
            </Typography>
            <Grid item className={classes.iconWrapper} marginLeft="1rem">
              <TrendingUpIcon color="error" className={classes.cardIcon} />
            </Grid>
          </Grid>
        </Grid>

        {/* <Grid item>
          <CustomButton
            endIcon={<TrendingUpIcon />}
            title="Process Payout"
            type={buttonType}
            // onClick={handleAdminOpen}
          />
        </Grid> */}
      </Grid>

      {/* The Search and Filter ends here */}
      <Grid item container>
        <EnhancedTable
          headCells={pendingHeader}
          rows={rows}
          page={page}
          paginationLabel="payout per page"
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
                  {row.medical}
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
                  style={{ color: theme.palette.common.red }}
                >
                  {row.amount}
                </TableCell>
                <TableCell
                  align="center"
                  className={classes.tableCell}
                  style={{ color: theme.palette.common.red }}
                >
                  {row.account}
                </TableCell>
                <TableCell
                  align="center"
                  className={classes.tableCell}
                  style={{ color: theme.palette.common.green }}
                >
                  {row.bank}
                </TableCell>
              </TableRow>
            );
          })}
        </EnhancedTable>
      </Grid>
    </Grid>
  );
};

PendingPayout.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
};

export default PendingPayout;
