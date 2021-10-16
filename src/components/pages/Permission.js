import React, { useState, useEffect } from "react";
import FormLabel from "@mui/material/FormLabel";
import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Modals from "components/Utilities/Modal";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import AddIcon from "@mui/icons-material/Add";
import EnhancedTable from "components/layouts/EnhancedTable";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import { rows } from "components/Utilities/DataHeader";
import { PermissionHeader } from "components/Utilities/tableHeaders";
import Chip from "@mui/material/Chip";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { isSelected } from "helpers/isSelected";
import CustomButton from "components/Utilities/CustomButton";
import FormSelect from "components/Utilities/FormSelect";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { PermissionModal } from "components/modals/PermissionModal";
import PreviousButton from "components/Utilities/PreviousButton";
import DeleteOrDisable from "components/modals/DeleteOrDisable";

const useStyles = makeStyles((theme) => ({
  flexContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    margin: "auto",
    width: "100%",
    paddingBottom: "2rem ",
  },
  button: {
    "&.MuiButton-root": {
      ...theme.typography.btn,
      width: "100%",
    },
  },
  FormLabel: {
    "&.MuiFormLabel-root": {
      ...theme.typography.FormLabel,
    },
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
}));

const referralOptions = ["Hello", "World", "Goodbye", "World"];

const Permission = ({ selectedMenu, selectedSubMenu, setSelectedSubMenu }) => {
  const checkbox = {
    create: true,
    update: true,
    Delete: false,
    read: false,
  };
  const checkbox1 = {
    create: false,
    update: true,
    Delete: false,
    read: false,
  };
  const classes = useStyles();
  const theme = useTheme();

  const { rowsPerPage, selectedRows, page } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();
  const [referral, setReferral] = useState("");
  const [deleteModal, setdeleteModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const handleDialogOpen = () => setIsOpen(true);
  const handleDeleteOpenDialog = () => {
    setdeleteModal(true);
  };
  const handleEditOpenDialog = () => {
    setIsEdit(true);
  };
  const handleEditCloseDialog = () => {
    setIsEdit(false);
  };

  const handleDialogClose = () => setIsOpen(false);

  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
  };
  useEffect(() => {
    setSelectedSubMenu(0);
    // eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu]);

  return (
    <>
      <Grid container direction="column">
        <Grid item>
          <PreviousButton path="/settings" onClick={() => setSelectedSubMenu(0)} />
        </Grid>
        <Grid item sm container className={classes.flexContainer}>
          <Grid item>
            <Typography variant="h1" color=" #2D2F39">
              Permission management
            </Typography>
          </Grid>

          <Grid item>
            <CustomButton
              endIcon={<AddIcon />}
              title="Add New Permission"
              type={buttonType}
              onClick={handleDialogOpen}
            />
          </Grid>
        </Grid>
        {/* The Search and Filter ends here */}
        <Grid item container>
          <EnhancedTable
            headCells={PermissionHeader}
            rows={rows}
            page={page}
            paginationLabel="email per page"
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
                      <Grid item xs={6}>
                        <Chip label={row.permission[0]} className={classes.badge} />
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell id={labelId} scope="row" align="center" className={classes.tableCell}>
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
                      {row.data.map((per) => {
                        return (
                          <Grid item xs={6} key={per}>
                            <Chip label={per} className={classes.badge} />
                          </Grid>
                        );
                      })}
                    </Grid>
                  </TableCell>

                  <TableCell align="left" className={classes.tableCell}>
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
                        onClick={handleEditOpenDialog}
                        className={`${classes.tableBtn} ${classes.greenBtn}`}
                        endIcon={<EditIcon color="success" />}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        disableRipple
                        onClick={handleDeleteOpenDialog}
                        className={`${classes.tableBtn} ${classes.redBtn}`}
                        to="/view"
                        endIcon={<DeleteIcon color="error" />}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </EnhancedTable>
        </Grid>
      </Grid>

      <Modals isOpen={isOpen} title="Filter" rowSpacing={5} handleClose={handleDialogClose}>
        <>
          <Grid item container direction="column">
            <Grid item container spacing={2}>
              <Grid item xs={6} marginBottom={4}>
                <Grid container direction="column" gap={1}>
                  <FormLabel component="legend" className={classes.FormLabel}>
                    Name
                  </FormLabel>
                  <FormControl fullWidth>
                    <FormSelect
                      options={referralOptions}
                      value={referral}
                      onChange={(event) => setReferral(event.target.value)}
                      placeholderText="Select Name"
                    />
                  </FormControl>
                </Grid>
              </Grid>
              {/* second grid */}
              <Grid item xs={6}>
                <Grid container gap={1} direction="column">
                  <FormLabel component="legend" className={classes.FormLabel}>
                    Date
                  </FormLabel>
                  <FormControl fullWidth>
                    <FormSelect
                      options={referralOptions}
                      value={referral}
                      onChange={(event) => setReferral(event.target.value)}
                      placeholderText="Choose Date"
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            {/* <Grid item container xs={6} direction="column"> */}
            <Grid item container spacing={2}>
              <Grid item container gap={1} xs={6}>
                <FormLabel component="legend" className={classes.FormLabel}>
                  Category
                </FormLabel>
                <FormControl fullWidth style={{ height: "3rem" }}>
                  <FormSelect
                    options={referralOptions}
                    value={referral}
                    onChange={(event) => setReferral(event.target.value)}
                    placeholderText="Save Category"
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container xs={12} marginTop={20}>
            <Button
              variant="contained"
              onClick={handleDialogClose}
              to="/view"
              type="submit"
              className={classes.button}
            >
              Apply Filter
            </Button>
          </Grid>
        </>
      </Modals>

      {/* // modal */}

      <Modals isOpen={isOpen} title="Add new permission" handleClose={handleDialogClose}>
        <PermissionModal handleDialogClose={handleDialogClose} type="add" checkbox={checkbox} />
      </Modals>

      {/* edit modala */}
      <Modals isOpen={isEdit} title="Edit permission" handleClose={handleEditCloseDialog}>
        <PermissionModal
          handleDialogClose={handleEditCloseDialog}
          type="edit"
          checkbox={checkbox1}
        />
      </Modals>
      {/* delete modal */}
      <DeleteOrDisable
        open={deleteModal}
        setOpen={setdeleteModal}
        title="Delete Permission"
        confirmationMsg="delete permission"
        btnValue="Delete"
      />
    </>
  );
};
export default Permission;
Permission.propTypes = {
  selectedMenu: PropTypes.number,
  selectedSubMenu: PropTypes.number,
  setSelectedMenu: PropTypes.func,
  setSelectedSubMenu: PropTypes.func,
  setSelectedHcpMenu: PropTypes.func,
};
