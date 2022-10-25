import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { partnersHeadCells2 } from "components/Utilities/tableHeaders";
import CompoundSearch from "components/Forms/CompoundSearch";
import { Formik, Form } from "formik";
import FormikControl from "components/validation/FormikControl";
import * as Yup from "yup";
import { getSearchPlaceholder } from "helpers/func";
import { Grid, TableRow, Avatar, Typography, TableCell } from "@mui/material";
import { CustomButton, Loader, Modals } from "components/Utilities";
import { EnhancedTable, EmptyTable, NoData } from "components/layouts";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { isSelected } from "helpers/isSelected";
import { UserTypeModal } from "components/modals/UserTypeModal";
import { useMutation, useLazyQuery } from "@apollo/client";
import DeleteOrDisable from "components/modals/DeleteOrDisable";
import { getUserTypes } from "components/graphQL/useQuery";
import { deleteUserType } from "components/graphQL/Mutation";
import { defaultPageInfo, searchOptions } from "helpers/mockData";
import {
  changeTableLimit,
  handlePageChange,
} from "helpers/filterHelperFunctions";
import TableLayout from "components/layouts/TableLayout";
import { Link } from "react-router-dom";
import { EditDelBtn } from "components/Buttons/EditDelBtn";
const useStyles = makeStyles((theme) => ({
  FormLabel: {
    fontSize: "1.6rem",
    color: theme.palette.common.dark,
  },
  link: {
    textDecoration: "none",
  },
  title: {
    fontSize: "clamp(1rem, 2vw, 1.2rem)",
    color: theme.palette.common.red,
    "&:hover": {
      textDecoration: "underline",
    },
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
      color: "rgb(0 0 0)",
      fontWeight: 400,
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

const UserTypes = () => {
  const classes = useStyles();
  const theme = useTheme();
  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
    disabled: theme.palette.common.black,
  };
  const [deleteUser] = useMutation(deleteUserType);

  const onConfirm = async () => {
    try {
      await deleteUser({
        variables: { id },
        refetchQueries: [{ query: getUserTypes }],
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error.message);
    }
  };

  const [pageInfo, setPageInfo] = useState(defaultPageInfo);
  const [id] = useState(null);
  const [deleteModal, setdeleteModal] = useState(false);
  const [singleData, setSingleData] = useState();
  const [fetchUserTypes, { loading, data, error, variables }] =
    useLazyQuery(getUserTypes);
  useEffect(() => {
    fetchUserTypes({
      variables: {
        first: pageInfo?.limit,
      },
    });
  }, [fetchUserTypes, pageInfo]);

  const [userType, setUsertypes] = useState([]);

  useEffect(() => {
    if (data) {
      setPageInfo(data.getUserTypes.pageInfo);
      setUsertypes(data.getUserTypes.userType);
    }
  }, [data]);
  const { selectedRows } = useSelector((state) => state.tables);
  const initialValues = {
    name: "",
    type: "",
    description: "",
  };

  const [isOpens, setIsOpens] = useState(false);
  const handleDialogCloses = () => setIsOpens(false);
  const [editId, setEditId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleEditCloseDialog = () => {
    setEdit(false);
  };
  const [setAlert] = useState(null);
  const initialValues1 = {
    name: "",
    userTypeId: "",
  };
  const onSubmit1 = async () => {
    // const { name, userTypeId } = values;
    // await provider.refetch({
    //   name,
    //   userTypeId,
    // });
    handleDialogCloses();
  };
  const validationSchema1 = Yup.object({
    name: Yup.string("Enter your hospital"),
    userTypeId: Yup.string("ENter your userTypeId"),
  });
  const [edit, setEdit] = useState(false);
  const handleDialogClose = async () => {
    setIsOpen(false);
    setEditId(null);
    setSingleData();
  };
  const handleEditOpenDialog = (id) => {
    setEdit(true);
    setEditId(id);
  };
  if (loading) return <Loader />;
  if (error) return <NoData error={error} />;
  return (
    <>
      <Grid
        container
        direction="column"
        gap={2}
        flexWrap="nowrap"
        height="100%"
      >
        <Grid
          item
          gap={{ sm: 4, xs: 2 }}
          container
          direction={{ sm: "row", xs: "column" }}
        >
          <Grid
            item
            flex={{ sm: 1, xs: 1 }}
            container
            alignItems="center"
            flexWrap="nowrap"
            gap={1}
            justifyContent="space-between"
          >
            <Grid item></Grid>
            {/* <Grid item>
              <CustomButton
                endIcon={<AddIcon />}
                onClick={handleDialogOpens1}
                title="Add new User Types"
                type={buttonType}
              />
            </Grid> */}
          </Grid>
        </Grid>
        <TableLayout
          search={
            <CompoundSearch
              queryParams={{
                fetchData: fetchUserTypes,
                variables,
                loading,
                newVariables: {},
              }}
              setPageInfo={(data) =>
                setPageInfo(data?.profiles?.pageInfo || {})
              }
              setProfiles={(data) => setUsertypes(data?.profiles?.data || [])}
              getSearchPlaceholder={(filterBy) =>
                getSearchPlaceholder(filterBy)
              }
              filterOptions={searchOptions}
            />
          }
        >
          {userType.length > 0 ? (
            <Grid item container height="100%" direction="column">
              <EnhancedTable
                headCells={partnersHeadCells2}
                rows={userType}
                paginationLabel="Provider Services per page"
                hasCheckbox={false}
                changeLimit={async (e) => {
                  changeTableLimit(fetchUserTypes, { first: e });
                }}
                dataPageInfo={pageInfo}
                handlePagination={async (page) => {
                  await handlePageChange(fetchUserTypes, page, pageInfo, {});
                }}
              >
                {userType.map((row) => {
                  const { _id, icon, name, providerCount } = row;
                  const isItemSelected = isSelected(_id, selectedRows);

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={_id}
                      selected={isItemSelected}
                    >
                      <TableCell align="left" className={classes.tableCell}>
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
                      <TableCell align="left" className={classes.tableCell}>
                        <Link
                          to={
                            name === "Heala User"
                              ? `/user-type/heala/${_id}`
                              : name === "Hospital Enrollee"
                              ? `/user-type/hospital/${_id}`
                              : name === "HMO Enrollee"
                              ? `/user-type/hmo/${_id}`
                              : `/user-type/${_id}`
                          }
                          className={classes.link}
                        >
                          <Typography
                            variant="h3"
                            classes={{ root: classes.title }}
                          >
                            {providerCount ? providerCount : "NA"}
                          </Typography>
                        </Link>
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell}>
                        <div
                          style={{
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                          }}
                        >
                          <EditDelBtn
                            onHandleClick={() => handleEditOpenDialog(row._id)}
                            type="edit"
                            text="Edit"
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
              headCells={partnersHeadCells2}
              paginationLabel="Provider Services  per page"
            />
          )}
        </TableLayout>
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
        title="Edit User Type"
        rowSpacing={5}
        handleClose={handleEditCloseDialog}
      >
        <UserTypeModal
          handleDialogClose={handleEditCloseDialog}
          type="edit"
          editId={editId}
          setAlert={setAlert}
          initialValues={initialValues}
          setSingleData={setSingleData}
          singleData={singleData}
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
                <Grid item container direction="column" rowGap={4}>
                  <Grid item container>
                    <FormikControl
                      control="input"
                      name="name"
                      label="Hospital Name"
                      placeholder="Enter Hospital Name"
                    />
                  </Grid>

                  <Grid item container>
                    <FormikControl
                      control="input"
                      name="userTypeId"
                      label="User Type"
                      placeholder="Enter User Type"
                    />
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

export default UserTypes;
