import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import EnhancedTable from "components/layouts/EnhancedTable";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { financeHeader } from "components/Utilities/tableHeaders";
import Avatar from "@mui/material/Avatar";
import displayPhoto from "assets/images/avatar.png";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { isSelected } from "helpers/isSelected";
import PreviousButton from "components/Utilities/PreviousButton";
import { useQuery } from "@apollo/client";
import { getMyEarnings } from "components/graphQL/useQuery";

const useStyles = makeStyles((theme) => ({
  searchGrid: {
    "&.css-13i4rnv-MuiGrid-root": {
      flex: 1,
      marginRight: "5rem",
    },
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

const Financetable = ({ selectedMenu, setSelectedMenu, selectedSubMenu, setSelectedSubMenu }) => {
  const classes = useStyles();
  const theme = useTheme();
  const { loading, data } = useQuery(getMyEarnings);

  const { rowsPerPage, selectedRows, page } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();
  const [earning, setEarning] = useState([]);
  useEffect(() => {
    if (data && data.getMyEarnings.data) {
      setEarning(data.getMyEarnings.data);
    }
  }, [earning, data]);
  useEffect(() => {
    setSelectedMenu(8);
    setSelectedSubMenu(9);
    // eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu]);
  if (loading) return <div>Loading</div>;
  if (earning) {
    return (
      <Grid container direction="column" rowSpacing={2}>
        <Grid item>
          <PreviousButton path="/finance" onClick={() => setSelectedSubMenu(0)} />
        </Grid>
        <Grid item container alignItems="center" columnGap={1}>
          <Typography noWrap variant="h1" component="div" color="#2D2F39">
            Earnings table
          </Typography>
          <Grid item className={classes.iconWrapper}>
            <TrendingDownIcon color="success" className={classes.cardIcon} />
          </Grid>
        </Grid>

        <Grid item container>
          <EnhancedTable
            headCells={financeHeader}
            rows={earning}
            page={page}
            paginationLabel="finance per page"
            hasCheckbox={true}
          >
            {earning
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
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
                          <Avatar
                            alt="Remy Sharp"
                            src={displayPhoto}
                            sx={{ width: 24, height: 24 }}
                          />
                        </span>
                        <span style={{ fontSize: "1.25rem" }}>
                          {row.firstName} {row.lastName}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {row.planName}
                    </TableCell>
                    <TableCell
                      align="center"
                      className={classes.tableCell}
                      style={{ color: theme.palette.common.red }}
                    >
                      {row.amount}
                    </TableCell>
                  </TableRow>
                );
              })}
          </EnhancedTable>
        </Grid>
      </Grid>
    );
  } else return null;
};

Financetable.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
};

export default Financetable;
