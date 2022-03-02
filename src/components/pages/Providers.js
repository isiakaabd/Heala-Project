import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { ProviderModal } from "components/modals/ProviderModal";
import FormikControl from "components/validation/FormikControl";
import { partnersHeadCells2 } from "components/Utilities/tableHeaders";
import PropTypes from "prop-types";
import NoData from "components/layouts/NoData";
import AddIcon from "@mui/icons-material/Add";
import { Grid, TableRow, TableCell, Checkbox, Alert, Button, Avatar } from "@mui/material";
import CustomButton from "components/Utilities/CustomButton";
import Search from "components/Utilities/Search";
import FilterList from "components/Utilities/FilterList";
import EnhancedTable from "components/layouts/EnhancedTable";
import { makeStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOrDisable from "components/modals/DeleteOrDisable";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { isSelected } from "helpers/isSelected";
import EditIcon from "@mui/icons-material/Edit";
import Modals from "components/Utilities/Modal";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useQuery, useMutation /* useLazyQuery*/ } from "@apollo/client";
import { getProviders /*getSingleProvider*/ } from "components/graphQL/useQuery";
import { deletProvider } from "components/graphQL/Mutation";
import Loader from "components/Utilities/Loader";

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
  checkbox: {
    "& .MuiSvgIcon-root": {
      fontSize: 28,
    },
    "&.Mui-checked": {
      color: "green !important",
    },
  },
}));

const Providers = ({ selectedMenu, selectedSubMenu, setSelectedMenu, setSelectedSubMenu }) => {
  const classes = useStyles();
  const [pageInfo, setPageInfo] = useState([]);
  const { data, error, loading, refetch } = useQuery(getProviders, {
    notifyOnNetworkStatusChange: true,
  });

  const onChange = async (e) => {
    setSearchHcp(e);
    if (e == "") {
      refetch();
    } else refetch({ name: e });
  };
  const [id, setId] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(0);
  const [deleteModal, setdeleteModal] = useState(false);
  const [deleteProvider] = useMutation(deletProvider);
  // const [singleProvider] = useLazyQuery(getSingleProvider);
  const handleDeleteOpenDialog = (id) => {
    setId(id);
    setdeleteModal(true);
  };
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    if (data) {
      setProviders(data.getProviders.provider);
      setPageInfo(data.getProviders.pageInfo);
    }
  }, [data]);

  const theme = useTheme();
  const handleDialogOpen = () => {
    setIsOpen(true);
  };
  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
    disabled: theme.palette.common.black,
  };

  const { selectedRows } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();

  const initialValues = {
    name: "",
    type: "",
    image: "",
  };

  const onConfirm = async () => {
    try {
      await deleteProvider({
        variables: { id },
        refetchQueries: [{ query: getProviders }],
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  //   openDeletePartner
  useEffect(() => {
    setSelectedMenu(12);
    setSelectedSubMenu(13);

    // eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu]);
  const [searchHcp, setSearchHcp] = useState("");
  const [editId, setEditId] = useState(null);
  const [isOpens, setIsOpens] = useState(false);
  const handleEditCloseDialog = () => {
    setEdit(false);
  };
  const [alert, setAlert] = useState(null);
  const [edit, setEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleDialogClose = async () => {
    setIsOpen(false);
    setEditId(null);
    setSingleData();
  };

  const handleDialogOpens1 = () => setIsOpens(true);
  const initialValues1 = {
    name: "",
    userTypeId: "",
  };
  const onSubmit1 = async (values) => {
    const { name, userTypeId } = values;
    await refetch({
      name,
      userTypeId,
    });
    handleDialogCloses();
  };
  const validationSchema1 = Yup.object({
    name: Yup.string("Enter your hospital"),
    userTypeId: Yup.string("Enter your userTypeId"),
  });

  const fetchMoreFunc = (e, newPage) => {
    refetch({ page: newPage });
  };
  const handleDialogCloses = () => setIsOpens(false);
  const handleEditOpenDialog = (id) => {
    setEdit(true);
    setEditId(id);
  };
  const [singleData, setSingleData] = useState();
  const { page, totalPages, hasNextPage, hasPrevPage, limit, totalDocs } = pageInfo;
  if (loading) return <Loader />;
  if (error) return <NoData error={error} />;
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
              placeholder="Type to search Providers by Hospital name e.g Lagoon Hospital"
              onChange={(e) => onChange(e.target.value)}
              height="5rem"
            />
          </Grid>
          <Grid item className={classes.filterBtnGrid}>
            <FilterList title="Filter partner" onClick={handleDialogOpens1} />
            {/* onClick={() => setOpenHcpFilter(true)} */}
          </Grid>
          <Grid item>
            <CustomButton
              endIcon={<AddIcon />}
              title="Add new Provider"
              type={buttonType}
              onClick={handleDialogOpen}
            />
          </Grid>
        </Grid>
        <Grid item container height="100%" direction="column">
          {providers.length > 0 ? (
            <EnhancedTable
              headCells={partnersHeadCells2}
              rows={providers}
              paginationLabel="Patients per page"
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
              {providers
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                            Edit Provider
                          </Button>
                          <Button
                            variant="contained"
                            disableRipple
                            className={`${classes.tableBtn} ${classes.redBtn}`}
                            onClick={() => handleDeleteOpenDialog(row._id)}
                            endIcon={<DeleteIcon color="error" />}
                          >
                            Delete Provider
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
        title="Add new Provider"
        rowSpacing={5}
        handleClose={handleDialogClose}
      >
        <ProviderModal
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
        <ProviderModal
          handleDialogClose={handleEditCloseDialog}
          type="edit"
          editId={editId}
          setAlert={setAlert}
          initialValues={initialValues}
          singleData={singleData}
          setSingleData={setSingleData}
        />
      </Modals>

      <DeleteOrDisable
        open={deleteModal}
        setOpen={setdeleteModal}
        title="Delete Provider"
        onConfirm={onConfirm}
        confirmationMsg="delete provider"
        btnValue="Delete"
      />

      <Modals isOpen={isOpens} title="Filter" rowSpacing={5} handleClose={handleDialogCloses}>
        <Formik
          initialValues={initialValues1}
          onSubmit={onSubmit1}
          validationSchema={validationSchema1}
          validateOnChange={false}
          validateOnMount={false}
          validateOnBlur={false}
        >
          {({ isSubmitting, isValid, dirty }) => {
            return (
              <Form style={{ marginTop: "3rem" }}>
                <Grid item container direction="column">
                  <Grid item container>
                    <FormikControl
                      control="input"
                      name="name"
                      label="Hospital Name"
                      placeholder="Enter Hospital Name"
                    />
                  </Grid>
                  <Grid item style={{ marginBottom: "18rem", marginTop: "3rem" }}>
                    <Grid container>
                      <Grid item container>
                        <FormikControl
                          control="input"
                          name="userTypeId"
                          label="User Type"
                          placeholder="Enter User Type"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <CustomButton
                      title="Apply Filter"
                      width="100%"
                      type={buttonType}
                      isSubmitting={isSubmitting}
                      disabled={!(dirty || isValid)}
                    />
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Modals>
    </>
  );
};
Providers.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
};

export default Providers;
