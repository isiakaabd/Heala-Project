import React, { useState } from "react";
import { Grid } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import Search from "components/Utilities/Search";
import Chip from "@mui/material/Chip";
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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Modals from "components/Utilities/Modal";
import { RoleModal } from "components/modals/RoleModal";
import PreviousButton from "components/Utilities/PreviousButton";
import DeleteOrDisable from "components/modals/DeleteOrDisable";

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
  redBtn: {
    "&.MuiButton-root": {
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
  const [deleteModal, setdeleteModal] = useState(false);
  const [searchMail, setSearchMail] = useState("");
  const [edit, setEdit] = useState(false);
  const handleDialogOpen = () => {
    setIsOpen(true);
  };
  const handleDialogClose = () => {
    setIsOpen(false);
  };
  const handleDeleteOpenDialog = () => {
    setdeleteModal(true);
  };
  const { rowsPerPage, selectedRows, page } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();

  const handleEditDialogOpens = () => {
    setEdit(true);
  };
  const handleEditDialogCloses = () => {
    setEdit(false);
  };
  const buttonType = {
    background: theme.palette.error.main,
    hover: theme.palette.error.light,
    active: theme.palette.error.dark,
  };

  return (
    <>
      <Grid container direction="column" rowSpacing={1}>
        <Grid item>
          <PreviousButton path="/settings" />
        </Grid>
        <Grid item container style={{ paddingBottom: "3rem" }}>
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
                        className={`${classes.tableBtn} ${classes.greenBtn}`}
                        onClick={handleEditDialogOpens}
                        endIcon={<EditIcon color="success" />}
                      >
                        Edit role
                      </Button>
                      <Button
                        variant="contained"
                        disableRipple
                        className={`${classes.tableBtn} ${classes.redBtn}`}
                        onClick={handleDeleteOpenDialog}
                        endIcon={<DeleteIcon color="error" />}
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
      <Modals isOpen={isOpen} title="Add new role" handleClose={handleDialogClose}>
        <RoleModal handleDialogClose={handleDialogClose} type="add" />
      </Modals>

      {/* Edit */}
      <Modals isOpen={edit} title="Edit role" handleClose={handleEditDialogCloses}>
        <RoleModal handleDialogClose={handleEditDialogCloses} type="edit" />
      </Modals>
      {/* delete modal */}
      <DeleteOrDisable
        open={deleteModal}
        setOpen={setdeleteModal}
        title="Delete Role"
        confirmationMsg="delete role"
        btnValue="Delete"
      />
    </>
  );
};

export default Management;
