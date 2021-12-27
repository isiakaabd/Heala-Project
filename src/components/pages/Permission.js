import React, { useState, useEffect, useCallback } from "react";
import * as Yup from "yup";
import FormLabel from "@mui/material/FormLabel";
import PropTypes from "prop-types";
import { Grid, Typography, Button, Alert, Chip } from "@mui/material";
import Modals from "components/Utilities/Modal";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import AddIcon from "@mui/icons-material/Add";
import EnhancedTable from "components/layouts/EnhancedTable";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import { PermissionHeader } from "components/Utilities/tableHeaders";
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
import { useQuery } from "@apollo/client";
import { getPermissions } from "components/graphQL/useQuery";
import { useMutation } from "@apollo/client";
import { DELETE_PERMISSION } from "components/graphQL/Mutation";
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
    "&.MuiButton-root": {
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
  const [singlePermission, setSinglePermission] = useState("");
  const checkbox = [
    { key: "create", value: "create" },
    { key: "update", value: "update" },
    { key: "read", value: "read" },
    { key: "delete", value: "delete" },
  ];

  const initialValues = {
    name: "",
    // checkbox: [],
    description: "",
  };

  const validationSchema = Yup.object({
    // checkbox: Yup.array().min(1, "Add atleast a permission"),
    name: Yup.string("Enter your Permission").required("permission is required"),
    description: Yup.string("Enter Description").required("Description is required"),
  });

  const classes = useStyles();
  const theme = useTheme();

  const { rowsPerPage, selectedRows, page } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();
  const [referral, setReferral] = useState("");
  const [deleteModal, setdeleteModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editDetails] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const handleDialogOpen = () => setIsOpen(true);
  const [alert, setAlert] = useState(null);
  const handleDeleteOpenDialog = (id) => {
    setdeleteModal(true);
    setDeleteId(id);
  };
  const handleEditOpenDialog = async (id) => {
    setEditId(id);
    setIsEdit(true);
  };

  const handleEditCloseDialog = useCallback(() => {
    setIsEdit(false);
  }, []);
  const onConfirm = async () => {
    try {
      const { data } = await deletPlan({ variables: { id: deleteId } });
      setAlert({
        message: data.deletePermission.message,
        type: "success",
      });
      setTimeout(() => {
        setAlert(null);
      }, 5000);
    } catch (error) {
      setAlert({
        message: "Plan  not successfully deleted",
        type: "danger",
      });
      setTimeout(() => {
        setAlert(null);
      }, 5000);
    }
  };
  const handleDialogClose = () => setIsOpen(false);

  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
  };

  const { loading, data } = useQuery(getPermissions);
  const [deletPlan] = useMutation(DELETE_PERMISSION);

  useEffect(() => {
    setSelectedSubMenu(0);
    // eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu]);
  const [permission, setPermission] = useState([]);

  useEffect(() => {
    if (data && data.getPermissions.permission) {
      setPermission(data.getPermissions.permission);
    }
  }, [permission, data]);

  if (loading) return <div>Loading</div>;

  return (
    <>
      {alert && Object.keys(alert).length > 0 && (
        <Alert
          variant="filled"
          severity={alert.type}
          sx={{ justifyContent: "center", width: "70%", margin: "0 auto" }}
        >
          {alert.message}
        </Alert>
      )}
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
            rows={Permission}
            page={page}
            paginationLabel="permission per page"
            hasCheckbox={true}
          >
            {permission
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
                    >
                      <Grid
                        container
                        rowSpacing={2}
                        style={{
                          maxWidth: "25rem",
                          display: "inline-flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Grid item xs={6}>
                          <Chip label={row.name} className={classes.badge} />
                        </Grid>
                      </Grid>
                    </TableCell>
                    {/* <TableCell
                      id={labelId}
                      scope="row"
                      align="center"
                      className={classes.tableCell}
                    >
                      <Grid
                        container
                        rowSpacing={2}
                        style={{
                          maxWidth: "25rem",
                          display: "inline-flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {permission.map((per) => {
                          return (
                            <Grid item xs={6} key={per._id}>
                              <Chip label={per.description} className={classes.badge} />
                            </Grid>
                          );
                        })}
                      </Grid>
                    </TableCell> */}

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
                          onClick={() => handleEditOpenDialog(row._id)}
                          className={`${classes.tableBtn} ${classes.greenBtn}`}
                          endIcon={<EditIcon color="success" />}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          disableRipple
                          onClick={() => handleDeleteOpenDialog(row._id)}
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
        <PermissionModal
          handleDialogClose={handleDialogClose}
          type="add"
          options={checkbox}
          initialValues={initialValues}
          validationSchema={validationSchema}
          setAlert={setAlert}
        />
      </Modals>

      {/* edit modala */}
      <Modals isOpen={isEdit} title="Edit permission" handleClose={handleEditCloseDialog}>
        <PermissionModal
          handleDialogClose={handleEditCloseDialog}
          type="edit"
          options={checkbox}
          initialValues={singlePermission}
          editId={editId}
          validationSchema={validationSchema}
          setAlert={setAlert}
          editDetails={editDetails}
          setSinglePermission={setSinglePermission}
        />
      </Modals>
      {/* delete modal */}
      <DeleteOrDisable
        open={deleteModal}
        setOpen={setdeleteModal}
        title="Delete Permission"
        confirmationMsg="delete permission"
        btnValue="Delete"
        onConfirm={onConfirm}
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
