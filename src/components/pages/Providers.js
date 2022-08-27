import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import FormikControl from "components/validation/FormikControl";
import { partnersHeadCells2 } from "components/Utilities/tableHeaders";
import { NoData, EmptyTable } from "components/layouts";
import AddIcon from "@mui/icons-material/Add";
import {
  Grid,
  TableRow,
  TableCell,
  Checkbox,
  Alert,
  Button,
  Avatar,
} from "@mui/material";
import { CustomButton, Loader, Modals } from "components/Utilities";
import { EnhancedTable } from "components/layouts";
import { makeStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeleteOrDisable, ProviderModal } from "components/modals";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { isSelected } from "helpers/isSelected";
import EditIcon from "@mui/icons-material/Edit";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useMutation, useLazyQuery, useQuery } from "@apollo/client";
import { getProviders /**/ } from "components/graphQL/useQuery";
import { deletProvider } from "components/graphQL/Mutation";
import { defaultPageInfo } from "helpers/mockData";
import {
  changeTableLimit,
  fetchMoreData,
  handlePageChange,
} from "helpers/filterHelperFunctions";
import TableLayout from "components/layouts/TableLayout";

const useStyles = makeStyles((theme) => ({
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

const Providers = () => {
  const classes = useStyles();
  const [pageInfo, setPageInfo] = useState(defaultPageInfo);
  const [fetchProviders, { error, loading, refetch }] =
    useLazyQuery(getProviders);
  const { data: dat, error: err, loading: load } = useQuery(getProviders);

  useEffect(() => {
    fetchProviders({
      variables: {
        first: pageInfo?.limit || 10,
      },
      notifyOnNetworkStatusChange: true,
    });
    //eslint-disable-next-line
  }, [fetchProviders]);

  // const onChange = async (e) => {
  //   setSearchHcp(e);
  //   if (e == "") {
  //     refetch();
  //   } else refetch({ name: e });
  // };
  const [id, setId] = useState(null);
  const [deleteModal, setdeleteModal] = useState(false);
  const [deleteProvider] = useMutation(deletProvider);
  // const [singleProvider] = useLazyQuery(getSingleProvider);
  const handleDeleteOpenDialog = (id) => {
    setId(id);
    setdeleteModal(true);
  };
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    if (dat) {
      setProviders(dat.getProviders.provider);
      setPageInfo(dat.getProviders.pageInfo);
    }
  }, [dat]);

  const theme = useTheme();
  const handleDialogOpen = () => setIsOpen(true);

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
    image: null,
    iconAlt: null,
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

  // const [searchHcp, setSearchHcp] = useState("");
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

  /*   const handleDialogOpens1 = () => setIsOpens(true); */
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
    name: Yup.string("Enter your hospital").trim(),
    userTypeId: Yup.string("Enter your userTypeId").trim(),
  });

  const handleDialogCloses = () => setIsOpens(false);
  const handleEditOpenDialog = (id) => {
    setEdit(true);
    setEditId(id);
  };
  const [singleData, setSingleData] = useState();

  if (loading || load) return <Loader />;
  if (error || err) return <NoData error={error} />;
  return (
    <>
      <Grid
        container
        direction="column"
        gap={2}
        flexWrap="nowrap"
        height="100%"
      >
        {alert && Object.keys(alert).length > 0 && (
          <Alert
            variant="filled"
            severity={alert.type}
            sx={{ justifyContent: "center", width: "70%", margin: "0 auto" }}
          >
            {alert.message}
          </Alert>
        )}
        <Grid
          item
          gap={{ sm: 4, xs: 2 }}
          container
          direction={{ md: "row", sm: "column" }}
        >
          <Grid item container justifyContent="space-between">
            <Grid item></Grid>
            <Grid item>
              <CustomButton
                endIcon={<AddIcon />}
                title="Add new Provider"
                type={buttonType}
                onClick={handleDialogOpen}
              />
            </Grid>
          </Grid>
        </Grid>
        <TableLayout>
          {providers.length > 0 ? (
            <Grid item container height="100%" direction="column">
              <EnhancedTable
                headCells={partnersHeadCells2}
                rows={providers}
                paginationLabel="Providers per page"
                hasCheckbox={true}
                changeLimit={async (e) => {
                  await changeTableLimit(fetchProviders, { first: e });
                }}
                dataPageInfo={pageInfo}
                handlePagination={async (page) => {
                  await handlePageChange(fetchProviders, page, pageInfo, {});
                }}
              >
                {providers.map((row, index) => {
                  const { _id, name, icon } = row;
                  const isItemSelected = isSelected(_id, selectedRows);

                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={_id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onClick={() =>
                            handleSelectedRows(
                              _id,
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
                      <TableCell align="center" className={classes.tableCell}>
                        <div
                          style={{
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <span style={{ marginRight: "1rem" }}>
                            <Avatar src={icon} sx={{ width: 24, height: 24 }} />
                          </span>
                          <span style={{ fontSize: "1.25rem" }}>{name}</span>
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
                            onClick={() => handleEditOpenDialog(_id)}
                            endIcon={<EditIcon color="success" />}
                          >
                            Edit Provider
                          </Button>
                          <Button
                            variant="contained"
                            disableRipple
                            className={`${classes.tableBtn} ${classes.redBtn}`}
                            onClick={() => handleDeleteOpenDialog(_id)}
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
            </Grid>
          ) : (
            <EmptyTable
              headCells={partnersHeadCells2}
              paginationLabel="Providers  per page"
            />
          )}
        </TableLayout>
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
          setSingleData={setSingleData}
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

      <Modals
        isOpen={isOpens}
        title="Filter"
        rowSpacing={5}
        handleClose={handleDialogCloses}
      >
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
                  <Grid
                    item
                    style={{ marginBottom: "18rem", marginTop: "3rem" }}
                  >
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

export default Providers;
