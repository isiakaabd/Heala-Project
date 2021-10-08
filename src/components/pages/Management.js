import React, { useState } from "react";
import FormLabel from "@mui/material/FormLabel";
import { Grid, Typography } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import Search from "components/Utilities/Search";
import Chip from "@mui/material/Chip";
import CheckboxesGroup from "components/Utilities/CheckBox";
import EnhancedTable from "components/layouts/EnhancedTable";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { rows } from "components/Utilities/DataHeader";
import { roleHeader } from "components/Utilities/tableHeaders";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { isSelected } from "helpers/isSelected";
import CustomButton from "components/Utilities/CustomButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Modals from "components/Utilities/Modal";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const useStyles = makeStyles((theme) => ({
  searchGrid: {
    "&.css-13i4rnv-MuiGrid-root": {
      flex: 1,
      marginRight: "5rem",
    },
  },

  "&.makeStyles-tableHeaderCell-27.MuiTableCell-root": {
    background: "red !important",
    textAlign: "center",
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
      maxWidth: "15rem",
      fontSize: "1.3rem",
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
  redBtn: {
    "&.css-1zf5oc-MuiButtonBase-root-MuiButton-root": {
      background: theme.palette.common.lightRed,
      color: theme.palette.common.red,

      "&:hover": {
        background: theme.palette.error.light,
        color: "#fff",
      },
    },
  },
  greenBtn: {
    "&.css-1zf5oc-MuiButtonBase-root-MuiButton-root": {
      background: theme.palette.common.lightGreen,
      color: theme.palette.common.green,

      "&:hover": {
        background: theme.palette.success.light,
        color: "#fff",
      },
    },
  },
  tableCell: {
    "&.css-1tykg82-MuiTableCell-root": {
      fontSize: "1.25rem",
      textAlign: "center !important",
    },
  },

  badge: {
    "&.css-1eelh6y-MuiChip-root": {
      fontSize: "1.3rem !important",
      height: "3rem",
      borderRadius: "1.3rem",
      color: "#9497A1",
      background: "#F2F2F2",
    },
    modal: {
      background: "red !important",
      "& > * ": {
        padding: "2rem 1rem",
      },
    },
    ".css-11lq3yg-MuiGrid-root": {
      background: "red",
    },
  },
}));

const Management = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleDialogOpen = () => {
    setIsOpen(true);
  };
  const handleDialogClose = () => {
    setIsOpen(false);
  };

  const { rowsPerPage, selectedRows, page } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();

  const [searchMail, setSearchMail] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpens, setIsOpens] = useState(false);
  const handleDialogOpens = () => {
    setIsOpens(true);
  };
  const handleDialogCloses = () => {
    setIsOpens(false);
  };
  const open = Boolean(anchorEl);

  const buttonType = {
    background: theme.palette.error.main,
    hover: theme.palette.error.light,
    active: theme.palette.error.dark,
  };

  return (
    <>
      <Grid container direction="column">
        <Grid item container style={{ paddingBottom: "5rem" }}>
          <Grid item className={classes.searchGrid}>
            <Search
              value={searchMail}
              onChange={(e) => setSearchMail(e.target.value)}
              placeholder="Type to search plans..."
              height="5rem"
            />
          </Grid>

          <Grid item>
            <CustomButton
              endIcon={<AddIcon />}
              title="Add new role"
              type={buttonType}
              onClick={handleDialogOpen}
            />
          </Grid>
        </Grid>
        {/* The Search and Filter ends here */}
        <Grid item container>
          <EnhancedTable
            headCells={roleHeader}
            rows={rows}
            sx={{ textAlign: "center" }}
            page={page}
            paginationLabel="subscription per page"
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
                    {row.planName}
                  </TableCell>
                  <TableCell
                    id={labelId}
                    scope="row"
                    align="center"
                    className={classes.tableCell}
                    // style={{ textAlign: "center !important" }}
                  >
                    <Grid
                      container
                      rowSpacing={2}
                      // spacing={2}
                      style={{
                        maxWidth: "25rem",
                        display: "inline-flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {row.permission.map((per) => {
                        return (
                          <Grid item xs={6} key={per}>
                            <Chip label={per} className={classes.badge} />
                          </Grid>
                        );
                      })}
                    </Grid>
                  </TableCell>

                  <TableCell align="center" className={classes.tableCell}>
                    <div
                      style={{
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                      }}
                    >
                      <Button
                        variant="contained"
                        disableRipple
                        className={`${classes.button} ${classes.greenBtn}`}
                        onClick={handleDialogOpens}
                        endIcon={
                          <EditIcon
                            style={{ color: theme.palette.common.green, fontSize: "1.8rem" }}
                          />
                        }
                      >
                        Edit role
                      </Button>
                      <Button
                        variant="contained"
                        disableRipple
                        className={`${classes.button} ${classes.redBtn}`}
                        to="/view"
                        endIcon={
                          <DeleteForeverIcon
                            style={{ color: theme.palette.common.red, fontSize: "1.8rem" }}
                          />
                        }
                      >
                        Delete role
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </EnhancedTable>
        </Grid>
      </Grid>
      {/* // modal */}
      <Modals isOpen={isOpen} handleClose={handleDialogClose}>
        <Grid container className={classes.modal} rowSpacing={3}>
          <Grid item>
            <Typography variant="h3">Add new role</Typography>
          </Grid>
          {/* <Grid item container xs={12}> */}
          <Grid item xs={12} rowSpacing={2}>
            <FormControl style={{ width: "100%" }}>
              <FormLabel component="legend" color="secondary">
                Name of Role
              </FormLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                placeholder="Enter role name"
                // label="Name of Role"
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormLabel component="legend" color="secondary">
              Permission
            </FormLabel>
            <FormControl style={{ width: "100%" }}>
              <CheckboxesGroup row={rows[0].permission} />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              // className={classes.button}
              to="/view"
              type="submit"
              color="error"
              style={{ width: "100%", padding: "1rem" }}
            >
              Add Role
            </Button>
          </Grid>
        </Grid>
      </Modals>

      {/* Edit */}
      <Modals isOpen={isOpens} handleClose={handleDialogCloses}>
        <Grid container className={classes.modal} rowSpacing={3}>
          <Grid item>
            <Typography variant="h3">Edit role</Typography>
          </Grid>
          {/* <Grid item container xs={12}> */}
          <Grid item xs={12} rowSpacing={2}>
            <FormControl style={{ width: "100%" }}>
              <FormLabel component="legend" color="secondary">
                Name of Role
              </FormLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                placeholder="Enter role name"
                // label="Name of Role"
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormLabel component="legend" color="secondary">
              Permission
            </FormLabel>
            <FormControl style={{ width: "100%" }}>
              <CheckboxesGroup row={rows[0].permission} />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              // className={classes.button}
              to="/view"
              type="submit"
              color="error"
              style={{ width: "100%", padding: "1rem" }}
            >
              Save changes
            </Button>
          </Grid>
        </Grid>
      </Modals>

      {/* edit */}
      {/* edit */}
    </>
  );
};

export default Management;
