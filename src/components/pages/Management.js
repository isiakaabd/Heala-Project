import React, { useState, useEffect } from "react";
import { Grid, TableRow, TableCell, Checkbox, Chip } from "@mui/material";
import {
  Loader,
  /* Search,  */ CustomButton,
  Modals,
} from "components/Utilities";
import { NoData, EmptyTable, EnhancedTable } from "components/layouts";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { roleHeader } from "components/Utilities/tableHeaders";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { isSelected } from "helpers/isSelected";
import AddIcon from "@mui/icons-material/Add";
import { DeleteOrDisable, RoleModal } from "components/modals";
import { useMutation, useLazyQuery } from "@apollo/client";
import { getRoles } from "components/graphQL/useQuery";
import { deleteRole } from "components/graphQL/Mutation";
import { useHistory } from "react-router-dom";
import {
  changeTableLimit,
  /* fetchMoreData, */ handlePageChange,
} from "helpers/filterHelperFunctions";
import { defaultPageInfo } from "helpers/mockData";
import TableLayout from "components/layouts/TableLayout";
import { EditDelBtn } from "components/Buttons/EditDelBtn";

const useStyles = makeStyles((theme) => ({
  searchGrid: {
    "&.MuiGrid-root": {
      flex: 1,
      marginRight: "5rem",
    },
  },
  "&.makeStyles-tableHeaderCell-27.MuiTableCell-root": {
    background: "red !important",
    textAlign: "center",
  },
  button: {
    "&.MuiButton-root": {
      background: "#fff",
      color: theme.palette.common.grey,
      textTransform: "none",
      borderRadius: "2rem",
      display: "flex",
      width: "100%",
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
      width: "100% !important",
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
      width: "100%",

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
      color: "rgb(0 0 0)",
      fontWeight: 400,
      fontSize: "1.25rem",
    },
  },

  badge: {
    "&.MuiChip-root": {
      fontWeight: 400,
      fontSize: "1.25rem",
      height: "3rem",
      borderRadius: "1.3rem",
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
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [pageInfo, setPageInfo] = useState(defaultPageInfo);
  const [deleteRoles] = useMutation(deleteRole);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);
  /* const [searchMail, setSearchMail] = useState(""); */
  // const [edit, setEdit] = useState(false);
  const [id, setId] = useState(false);

  const handleDialogOpen = () => {
    setIsOpen(true);
  };
  const handleDialogClose = () => {
    setIsOpen(false);
  };
  const handleDeleteOpenDialog = (id) => {
    setdeleteModal(true);
    setId(id);
  };
  const { selectedRows } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();

  const onConfirm = async () => {
    deleteRoles({ variables: { id }, refetchQueries: [{ query: getRoles }] });
  };

  const [rolesManagements, setRolesManagements] = useState([]);
  const [fetchRoles, { loading, data, error /* refetch */ }] =
    useLazyQuery(getRoles);

  useEffect(() => {
    fetchRoles({
      variables: { first: pageInfo?.limit },
      notifyOnNetworkStatusChange: true,
    });
  }, [fetchRoles, pageInfo]);

  /* const onChange = async (e) => {
    setSearchMail(e);
    if (e == "") {
      refetch();
    } else refetch({ name: e });
  }; */
  useEffect(() => {
    if (data) {
      setRolesManagements(data.getRoles.role);
      setPageInfo(data.getRoles.pageInfo);
    }
  }, [data, rolesManagements]);
  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
  };
  const checkbox = {
    "permission 1": true,
    "permission 2": true,
    "permission 3": false,
    "permission 4": true,
  };

  if (loading) return <Loader />;
  if (error) return <NoData error={error} />;
  return (
    <>
      <Grid container direction="column" gap={2}>
        <>
          <Grid
            item
            container
            direction={{ xs: "column", sm: "row" }}
            gap={{ md: 4, sm: 4, xs: 2 }}
            justifyContent="flex-end"
          >
            <Grid item>
              <CustomButton
                endIcon={<AddIcon />}
                title="Add new role"
                type={buttonType}
                onClick={handleDialogOpen}
              />
            </Grid>
          </Grid>
          <TableLayout>
            {rolesManagements.length > 0 ? (
              <Grid item container>
                <EnhancedTable
                  headCells={roleHeader}
                  rows={rolesManagements}
                  paginationLabel="subscription per page"
                  hasCheckbox={true}
                  changeLimit={async (e) => {
                    await changeTableLimit(fetchRoles, { first: e });
                  }}
                  dataPageInfo={pageInfo}
                  handlePagination={async (page) => {
                    await handlePageChange(fetchRoles, page, pageInfo, {});
                  }}
                >
                  {rolesManagements.map((row, index) => {
                    const isItemSelected = isSelected(row._id, selectedRows);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    let newData;
                    if (row.permissions) {
                      const data = [
                        ...new Set(row.permissions.map((i) => i.split(":")[0])),
                      ];
                      const dataLength = data.length - 5;
                      newData = [
                        ...data.slice(0, 5),
                        dataLength ? `+${dataLength}` : null,
                      ].filter((i) => i !== null);
                    }
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
                            onClick={() =>
                              handleSelectedRows(
                                row.id,
                                selectedRows,
                                setSelectedRows
                              )
                            }
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
                          align="left"
                          className={classes.tableCell}
                        >
                          {row.name}
                        </TableCell>
                        <TableCell
                          id={labelId}
                          scope="row"
                          align="center"
                          className={classes.tableCell}
                        >
                          <Grid
                            container
                            justifyContent="flex-start"
                            gap={1}
                            alignItems="center"
                          >
                            {newData &&
                              newData.map((i) => {
                                return (
                                  <Chip
                                    label={i}
                                    key={i}
                                    className={classes.badge}
                                  />
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
                              justifyContent: "space-between",
                              minWidth: "25rem",
                              gap: "1rem",
                            }}
                          >
                            <EditDelBtn
                              onHandleClick={() => {
                                history.push(`/settings/management/${row._id}`);
                              }}
                              type="edit"
                              text="Edit role"
                            />
                            <EditDelBtn
                              onHandleClick={() => {
                                handleDeleteOpenDialog(row._id);
                              }}
                              type="delete"
                              text="Delete role"
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </EnhancedTable>
              </Grid>
            ) : (
              <EmptyTable
                headCells={roleHeader}
                paginationLabel="Admin  per page"
              />
            )}
          </TableLayout>
        </>
      </Grid>
      {/* // modal */}
      <Modals
        isOpen={isOpen}
        title="Add new role"
        handleClose={handleDialogClose}
      >
        <RoleModal
          handleDialogClose={handleDialogClose}
          type="add"
          checkbox={checkbox}
        />
      </Modals>

      {/* Edit */}
      {/* <Modals isOpen={edit} title="Edit role" handleClose={handleEditDialogCloses}>
        <RoleModal handleDialogClose={handleEditDialogCloses} type="edit" checkbox={checkbox1} />
      </Modals> */}
      {/* delete modal */}
      <DeleteOrDisable
        open={deleteModal}
        setOpen={setdeleteModal}
        title="Delete Role"
        onConfirm={onConfirm}
        confirmationMsg="delete role"
        btnValue="Delete"
      />
    </>
  );
};

export default Management;
