import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Grid, Alert } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import Search from "components/Utilities/Search";
import EnhancedTable from "components/layouts/EnhancedTable";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { subscriptionHeader } from "components/Utilities/tableHeaders";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { isSelected } from "helpers/isSelected";
import CustomButton from "components/Utilities/CustomButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Modals from "components/Utilities/Modal";
import { SubscriptionModal } from "components/modals/SubscriptionModal";
import DeleteOrDisable from "components/modals/DeleteOrDisable";
import { useQuery } from "@apollo/client";
import { getPlans } from "components/graphQL/useQuery";
import { useMutation } from "@apollo/client";
import { DELETE_PLAN } from "components/graphQL/Mutation";

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
    "&.MuiFormLabel-root": {
      ...theme.typography.FormLabel,
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
      maxWidth: "15rem",

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
  btn: {
    "&.MuiButton-root": {
      ...theme.typography.btn,
      width: "100%",
    },
  },
  closeIcon: {
    "&.MuiSvgIcon-root": {
      fontSize: "2rem ",
      cursor: "pointer",

      "&:hover": {
        color: theme.palette.common.red,
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
      width: "12rem",

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
    modal: {
      background: "red !important",
      "& > * ": {
        padding: "2rem 1rem",
      },
    },
    ".MuiGrid-root": {
      background: "red",
    },
  },
}));

const Subscription = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [alert, setAlert] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [deletePlan] = useMutation(DELETE_PLAN);
  const [id, setId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [edit, setEdit] = useState(false);
  const [singleData, setSingleData] = useState("");
  const [deleteModal, setdeleteModal] = useState(false);
  const handleDialogOpen = () => {
    setIsOpen(true);
  };
  const handleEditCloseDialog = () => {
    setEdit(false);
  };
  const handleDeleteOpenDialog = (id) => {
    setId(id);
    setdeleteModal(true);
  };
  const handleEditOpenDialog = (id) => {
    setEdit(true);
    setEditId(id);
    console.log(id);
  };
  const handleDialogClose = async () => {
    setIsOpen(false);
    setEditId(null);
  };
  const onConfirm = async () => {
    try {
      const { message } = await deletePlan({ variables: { id } });
      setAlert({
        message: message,
        type: "success",
      });
    } catch (error) {
      setAlert({
        message: error.message,
        type: "danger",
      });
      console.log(error.message);
    }
  };
  const { rowsPerPage, selectedRows, page } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();

  const [searchMail, setSearchMail] = useState("");

  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
  };
  const [plan, setPlan] = useState([]);
  const { loading, data } = useQuery(getPlans);

  useEffect(() => {
    if (data && data.getPlans.plan) {
      setPlan(data.getPlans.plan);
    }
  }, [data]);

  if (loading) return <div>Loading</div>;

  const initialValues = {
    name: "",
    amount: "",
    description: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string("Enter your Name").required("Name is required"),
    amount: Yup.string("Enter your Amount").required("Amount is required"),
    description: Yup.string("Enter Description").required("Description is required"),
  });
  return (
    <>
      <Grid container direction="column" gap={2}>
        {alert && Object.keys(alert).length > 0 && (
          <Alert
            variant="filled"
            severity={alert.type}
            sx={{ justifyContent: "center", width: "70%", margin: "0 auto" }}
          >
            {alert.message}
          </Alert>
        )}

        <Grid item container>
          <Grid item className={classes.searchGrid}>
            <Search
              value={searchMail}
              onChange={(e) => setSearchMail(e.target.value)}
              placeholder="Type to search plans..."
              height="5rem"
            />
          </Grid>

          <Grid item className={classes.filterBtnGrid}>
            <CustomButton
              endIcon={<AddIcon />}
              title="Create new plan"
              type={buttonType}
              onClick={handleDialogOpen}
            />
          </Grid>
        </Grid>
        {/* The Search and Filter ends here */}

        <Grid item container style={{ marginTop: "5rem" }}>
          <EnhancedTable
            headCells={subscriptionHeader}
            rows={plan}
            page={page}
            paginationLabel="subscription per page"
            hasCheckbox={true}
          >
            {plan &&
              plan.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
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
                      {row.name}
                    </TableCell>
                    <TableCell
                      id={labelId}
                      scope="row"
                      align="left"
                      className={classes.tableCell}
                      style={{ color: theme.palette.common.red }}
                    >
                      {row.amount}
                    </TableCell>

                    <TableCell
                      align="center"
                      className={classes.tableCell}
                      style={{ color: theme.palette.common.black, maxWidth: "20rem" }}
                    >
                      {row.description}
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
                          onClick={() => handleEditOpenDialog(row._id)}
                          className={`${classes.tableBtn} ${classes.greenBtn}`}
                          endIcon={<EditIcon color="success" />}
                        >
                          Edit plan
                        </Button>
                        <Button
                          variant="contained"
                          disableRipple
                          onClick={() => handleDeleteOpenDialog(row._id)}
                          className={`${classes.tableBtn} ${classes.redBtn}`}
                          to="/view"
                          endIcon={<DeleteIcon color="error" />}
                        >
                          Delete plan
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
      <Modals
        isOpen={isOpen}
        title="Create new plan"
        rowSpacing={5}
        handleClose={handleDialogClose}
      >
        <SubscriptionModal
          handleDialogClose={handleDialogClose}
          type="add"
          setAlert={setAlert}
          initialValues={initialValues}
          validationSchema={validationSchema}
        />
      </Modals>

      {/* edit Modal */}
      <Modals isOpen={edit} title="Edit plan" rowSpacing={5} handleClose={handleEditCloseDialog}>
        <SubscriptionModal
          handleDialogClose={handleEditCloseDialog}
          type="edit"
          editId={editId}
          setAlert={setAlert}
          initialValues={singleData}
          validationSchema={validationSchema}
          setSingleData={setSingleData}
        />
      </Modals>

      {/* delete modal */}
      <DeleteOrDisable
        open={deleteModal}
        setOpen={setdeleteModal}
        title="Delete Plan"
        onConfirm={onConfirm}
        confirmationMsg="delete plan"
        btnValue="Delete"
      />
    </>
  );
};

export default Subscription;
