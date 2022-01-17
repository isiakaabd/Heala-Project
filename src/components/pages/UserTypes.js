import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { partnersHeadCells2 } from "components/Utilities/tableHeaders";
import PropTypes from "prop-types";
import NoData from "components/layouts/NoData";
import { Grid, TableRow, TableCell, Alert } from "@mui/material";
import CustomButton from "components/Utilities/CustomButton";
import Checkbox from "@mui/material/Checkbox";
import Search from "components/Utilities/Search";
import FilterList from "components/Utilities/FilterList";
import EnhancedTable from "components/layouts/EnhancedTable";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { isSelected } from "helpers/isSelected";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Modals from "components/Utilities/Modal";
import { UserTypeModal } from "components/modals/UserTypeModal";
import { useQuery, useMutation } from "@apollo/client";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOrDisable from "components/modals/DeleteOrDisable";
import { getUserTypes } from "components/graphQL/useQuery";
import Loader from "components/Utilities/Loader";
import { deleteUserType } from "components/graphQL/Mutation";
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
  const [deleteUser] = useMutation(deleteUserType);
  const handleDialogOpen = () => {
    setIsOpen(true);
  };
  const handleDeleteOpenDialog = (id) => {
    setId(id);
    setdeleteModal(true);
  };
  const onConfirm = async () => {
    try {
      await deleteUser({
        variables: { id },
        refetchQueries: [{ query: getUserTypes }],
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  const [id, setId] = useState(null);
  const [deleteModal, setdeleteModal] = useState(false);
  const usertype = useQuery(getUserTypes);
  const [userType, setUsertypes] = useState([]);

  useEffect(() => {
    if (usertype.data) {
      setUsertypes(usertype.data.getUserTypes.userType);
    }
  }, [usertype.data]);
  const { rowsPerPage, selectedRows, page } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();
  const initialValues = {
    name: "",
    type: "",
    description: "",
  };

  useEffect(() => {
    setSelectedMenu(12);
    setSelectedSubMenu(13);

    // eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu]);
  const [searchHcp, setSearchHcp] = useState("");
  const [editId, setEditId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleEditCloseDialog = () => {
    setEdit(false);
  };
  const [alert, setAlert] = useState(null);
  const [edit, setEdit] = useState(false);
  const handleDialogClose = async () => {
    setIsOpen(false);
    setEditId(null);
  };
  const handleEditOpenDialog = (id) => {
    setEdit(true);
    setEditId(id);
  };
  if (usertype.loading) return <Loader />;
  if (usertype.error) return <NoData error={usertype.error.message} />;
  return (
    <>
      <Grid container direction="column" gap={2} flexWrap="nowrap" height="100%">
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
              value={searchHcp}
              placeholder="Type to search partners..."
              onChange={(e) => setSearchHcp(e.target.value)}
              height="5rem"
            />
          </Grid>
          <Grid item className={classes.filterBtnGrid}>
            <FilterList title="Filter partner" />
          </Grid>
          <Grid item>
            <CustomButton
              endIcon={<AddIcon />}
              onClick={handleDialogOpen}
              title="Add new User Types"
              type={buttonType}
            />
          </Grid>
        </Grid>
        <Grid item container height="100%" direction="column">
          {userType.length > 0 ? (
            <EnhancedTable
              headCells={partnersHeadCells2}
              rows={userType}
              page={page}
              paginationLabel="Patients per page"
              hasCheckbox={true}
            >
              {userType
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
                      <TableCell align="center" className={classes.tableCell}>
                        <div
                          style={{
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <span style={{ marginRight: "1rem" }}>
                            <Avatar src={row.icon} sx={{ width: 24, height: 24 }} />
                          </span>
                          <span style={{ fontSize: "1.25rem" }}>{row.name}</span>
                        </div>
                      </TableCell>
                      <TableCell
                        align="left"
                        className={classes.tableCell}
                        style={{ color: theme.palette.common.grey, maxWidth: "20rem" }}
                      >
                        {row.category ? row.category : "No Value"}
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
                            onClick={() => handleEditOpenDialog(row._id)}
                            endIcon={<EditIcon color="success" />}
                          >
                            Edit UserType
                          </Button>
                          <Button
                            variant="contained"
                            disableRipple
                            className={`${classes.tableBtn} ${classes.redBtn}`}
                            onClick={() => handleDeleteOpenDialog(row._id)}
                            endIcon={<DeleteIcon color="error" />}
                          >
                            Delete UserType
                          </Button>
                        </div>
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
      <Modals
        isOpen={isOpen}
        title="Add new User Types"
        rowSpacing={5}
        handleClose={handleDialogClose}
      >
        <UserTypeModal
          handleDialogClose={handleDialogClose}
          type="add"
          setAlert={setAlert}
          editId={editId}
          initialValues={initialValues}
        />
      </Modals>
      {/* edit Modal */}
      <Modals
        isOpen={edit}
        title="Edit Provider"
        rowSpacing={5}
        handleClose={handleEditCloseDialog}
      >
        <UserTypeModal
          handleDialogClose={handleEditCloseDialog}
          type="edit"
          editId={editId}
          setAlert={setAlert}
          initialValues={initialValues}
          //   setSingleData={setSingleData}
        />
      </Modals>

      <DeleteOrDisable
        open={deleteModal}
        setOpen={setdeleteModal}
        title="Delete UserTypes"
        onConfirm={onConfirm}
        confirmationMsg="delete usertypes"
        btnValue="Delete"
      />
    </>
  );
};
UserTypes.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
};

export default UserTypes;
