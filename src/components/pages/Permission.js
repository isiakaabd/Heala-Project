import React, { useState, useEffect, useCallback } from "react";
import Loader from "components/Utilities/Loader";
import CustomButton from "components/Utilities/CustomButton";
import { Formik, Form } from "formik";
import FormikControl from "components/validation/FormikControl";
import * as Yup from "yup";
import PropTypes from "prop-types";
import {
  Grid,
  Typography,
  Button,
  TableRow,
  TableCell,
  Checkbox,
  Alert,
  Chip,
} from "@mui/material";
import Modals from "components/Utilities/Modal";
import AddIcon from "@mui/icons-material/Add";
import EnhancedTable from "components/layouts/EnhancedTable";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { PermissionHeader } from "components/Utilities/tableHeaders";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { isSelected } from "helpers/isSelected";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { PermissionModal } from "components/modals/PermissionModal";
import PreviousButton from "components/Utilities/PreviousButton";
import DeleteOrDisable from "components/modals/DeleteOrDisable";
import { useQuery } from "@apollo/client";
import { getPermissions } from "components/graphQL/useQuery";
import { useMutation } from "@apollo/client";
import { DELETE_PERMISSION } from "components/graphQL/Mutation";
import NoData from "components/layouts/NoData";
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
const Permission = ({ selectedMenu, selectedSubMenu, setSelectedSubMenu, setSelectedMenu }) => {
  const [singlePermission, setSinglePermission] = useState();

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
  const initialValues1 = {
    name: "",
    date: "",
    category: "",
  };

  const validationSchema1 = Yup.object({
    name: Yup.string("Enter your Permission").required("permission is required"),
    date: Yup.string("Select Date").required("Date is required"),
    category: Yup.string("Select Category").required("Category is required"),
  });
  const onSubmit1 = (values) => {
    console.log(values);
  };

  const validationSchema = Yup.object({
    // checkbox: Yup.array().min(1, "Add atleast a permission"),
    name: Yup.string("Enter your Permission").required("permission is required"),
    description: Yup.string("Enter Description").required("Description is required"),
  });

  const classes = useStyles();
  const theme = useTheme();

  const { selectedRows } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();
  const [deleteModal, setdeleteModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const handleEditCloseDialog = useCallback(() => {
    setIsEdit(false);
    setSinglePermission("");
  }, []);
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

  const onConfirm = async () => {
    try {
      const { data } = await deletPlan({
        variables: { id: deleteId },
        refetchQueries: [{ query: getPermissions }],
      });
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
  const [pageInfo, setPageInfo] = useState([]);
  const { loading, data, error, refetch } = useQuery(getPermissions, {
    notifyOnNetworkStatusChange: true,
  });
  const fetchMoreFunc = (e, newPage) => {
    refetch({ page: newPage });
  };
  const [deletPlan] = useMutation(DELETE_PERMISSION);

  useEffect(() => {
    setSelectedMenu(11);
    setSelectedSubMenu(12);

    // eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu]);
  const [permission, setPermission] = useState([]);

  useEffect(() => {
    if (data) {
      setPermission(data.getPermissions.permission);
      setPageInfo(data.getPermissions.pageInfo);
    }
  }, [permission, data]);
  const { page, totalPages, hasNextPage, hasPrevPage, limit, totalDocs } = pageInfo;
  const [rowsPerPage, setRowsPerPage] = useState(5);
  if (loading) return <Loader />;
  if (error) return <NoData error={error} />;
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
            paginationLabel="permission per page"
            page={page}
            limit={limit}
            totalPages={totalPages}
            totalDocs={totalDocs}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
            handleChangePage={fetchMoreFunc}
            hasCheckbox={true}
          >
            {permission
              // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row._id, selectedRows);

                const labelId = `enhanced-table-checkbox-${index}`;
                const data = row.name.split(":")[0];
                const newPerm = row.description.split(":")[1];
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
                    <TableCell id={labelId} scope="row" align="left" className={classes.tableCell}>
                      <Grid
                        container
                        rowSpacing={2}
                        style={{
                          maxWidth: "25rem",
                          display: "inline-flex",
                          justifyContent: "left",
                          alignItems: "center",
                        }}
                      >
                        <Grid item xs={6}>
                          <Chip label={data} className={classes.badge} />
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell id={labelId} scope="row" align="left" className={classes.tableCell}>
                      <Grid
                        container
                        rowSpacing={2}
                        style={{
                          maxWidth: "25rem",
                          display: "inline-flex",
                          justifyContent: "left",
                          alignItems: "center",
                        }}
                      >
                        <Grid item xs={6}>
                          <Chip label={newPerm} className={classes.badge} />
                        </Grid>
                      </Grid>
                    </TableCell>

                    <TableCell align="left" className={classes.tableCell}>
                      <div
                        style={{
                          height: "100%",
                          display: "flex",
                          alignItems: "left",
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
        <Formik
          initialValues={initialValues1}
          onSubmit={onSubmit1}
          validationSchema={validationSchema1}
          validateOnChange={false}
          validateOnMount={false}
          validateOnBlur={false}
        >
          {({ isSubmitting, dirty, isValid }) => {
            return (
              <Form style={{ marginTop: "3rem" }}>
                <Grid item container direction="column">
                  <Grid item container spacing={2}>
                    <Grid item xs={6} marginBottom={4}>
                      <FormikControl
                        control="select"
                        options={referralOptions}
                        name="name"
                        label="Name"
                        placeholder="Enter Plan Name"
                      />
                    </Grid>
                    {/* second grid */}
                    <Grid item xs={6}>
                      <FormikControl
                        control="select"
                        options={referralOptions}
                        name="date"
                        label="Date"
                        placeholder="Choose Date"
                      />
                    </Grid>
                  </Grid>

                  <Grid item container spacing={2}>
                    <FormikControl
                      control="select"
                      options={referralOptions}
                      name="category"
                      label="Category"
                      placeholder="Save Category"
                    />
                  </Grid>
                </Grid>
                <Grid item container xs={12} marginTop={20}>
                  <CustomButton
                    title="Apply Filter"
                    width="100%"
                    isSubmitting={isSubmitting}
                    disabled={!(dirty || isValid)}
                    type={buttonType}
                  />
                </Grid>
              </Form>
            );
          }}
        </Formik>
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
          singlePermission={singlePermission}
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
