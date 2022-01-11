import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { partnersHeadCells2 } from "components/Utilities/tableHeaders";
import { pendingHeader } from "components/Utilities/tableHeaders";
import PropTypes from "prop-types";
import NoData from "components/layouts/NoData";
import { Grid, TableRow, TableCell } from "@mui/material";
import CustomButton from "components/Utilities/CustomButton";
import Checkbox from "@mui/material/Checkbox";
import Search from "components/Utilities/Search";
import FilterList from "components/Utilities/FilterList";
import EnhancedTable from "components/layouts/EnhancedTable";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { rows } from "components/Utilities/DataHeader";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { isSelected } from "helpers/isSelected";
import EditIcon from "@mui/icons-material/Edit";

import AddIcon from "@mui/icons-material/Add";

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
  FormLabel: {
    fontSize: "1.6rem",
    color: theme.palette.common.dark,
  },
  btn: {
    "&.MuiButton-root": {
      ...theme.typography.btn,
      width: "100%",
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
  redBtn: {
    "&.MuiButton-root": {
      background: theme.palette.common.lightGrey,
      color: "white",

      "&:hover": {
        background: theme.palette.common.lightGrey,
        color: "white",
      },
    },
  },
  greenBtn: {
    "&.MuiButton-root": {
      background: theme.palette.common.lightGreen,
      color: theme.palette.common.green,

      "&:hover": {
        background: theme.palette.success.light,
        color: "#fff",
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
  "&.MuiButton-root": {
    ...theme.typography.btn,
    background: theme.palette.common.black,
    width: "100%",
  },
  tableBtn: {
    "&.MuiButton-root": {
      ...theme.typography.btn,
      height: "3rem",
      fontSize: "1.25rem",
      borderRadius: "2rem",
      boxShadow: "none",

      "&:hover": {
        "& .MuiButton-endIcon>*:nth-of-type(1)": {
          color: "#fff",
        },
      },

      "&:active": {
        boxShadow: "none",
      },

      "& .MuiButton-endIcon>*:nth-of-type(1)": {
        fontSize: "1.5rem",
      },
    },
  },

  checkbox: {
    "& .MuiSvgIcon-root": {
      fontSize: 28,
    },
    "&.Mui-checked": {
      color: "green !important",
    },
  },
}));

const UserTypes = ({ selectedMenu, selectedSubMenu, setSelectedMenu, setSelectedSubMenu }) => {
  const classes = useStyles();
  const theme = useTheme();
  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
    disabled: theme.palette.common.black,
  };

  const { rowsPerPage, selectedRows, page } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();

  const [setOpenDeletePartner] = useState(false);
  //   openDeletePartner
  useEffect(() => {
    setSelectedMenu(12);
    setSelectedSubMenu(13);

    // eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu]);
  const [searchHcp, setSearchHcp] = useState("");
  return (
    <Grid container direction="column" gap={2} flexWrap="nowrap" height="100%">
      <Grid item container>
        <Grid item className={classes.searchGrid}>
          <Search
            value={searchHcp}
            placeholder="Type to search partners..."
            onChange={(e) => setSearchHcp(e.target.value)}
            height="5rem"
          />
        </Grid>
        <Grid item className={classes.filterBtnGrid}>
          <FilterList title="Filter partner" />
          {/* onClick={() => setOpenHcpFilter(true)} */}
        </Grid>
        <Grid item>
          <CustomButton endIcon={<AddIcon />} title="Add new Provider" type={buttonType} />
          {/* onClick={() => setOpenAddHcp(true)} */}
        </Grid>
      </Grid>
      <Grid item container height="100%" direction="column">
        {pendingHeader.length > 0 ? (
          <EnhancedTable
            headCells={partnersHeadCells2}
            rows={rows}
            page={page}
            paginationLabel="Patients per page"
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
                  <TableCell align="center" className={classes.tableCell}>
                    <div
                      style={{
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ marginRight: "1rem" }}>
                        <Avatar sx={{ width: 24, height: 24 }}>H</Avatar>
                      </span>
                      <span style={{ fontSize: "1.25rem" }}>
                        {row.firstName} {row.lastName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell
                    align="left"
                    className={classes.tableCell}
                    style={{ color: theme.palette.common.grey, maxWidth: "20rem" }}
                  >
                    {row.category}
                  </TableCell>
                  <TableCell align="center" className={classes.tableCell}>
                    <Button
                      variant="contained"
                      disableRipple
                      className={`${classes.tableBtn} ${classes.redBtn}`}
                      endIcon={<EditIcon color="secondary" />}
                      onClick={() => setOpenDeletePartner(true)}
                    >
                      action
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </EnhancedTable>
        ) : (
          <NoData />
        )}
      </Grid>
    </Grid>
  );
};
UserTypes.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
};

export default UserTypes;
