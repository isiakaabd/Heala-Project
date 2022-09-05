import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "components/validation/FormikControl";
import {
  Loader,
  /* Button, */
  Modals,
  CustomButton,
} from "components/Utilities";
import { useTheme } from "@mui/material/styles";
import { Grid, Checkbox, TableRow, TableCell } from "@mui/material";
import { signup } from "components/graphQL/Mutation";
import { EnhancedTable, NoData, EmptyTable } from "components/layouts";
import { makeStyles } from "@mui/styles";
import { adminHeader } from "components/Utilities/tableHeaders";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { isSelected } from "helpers/isSelected";
import AddIcon from "@mui/icons-material/Add";
import { useMutation, useLazyQuery } from "@apollo/client";
import { findAdmin } from "components/graphQL/useQuery";
import { defaultPageInfo } from "helpers/mockData";
import { changeTableLimit } from "helpers/filterHelperFunctions";
import TableLayout from "components/layouts/TableLayout";
//
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

  checkboxContainer: {
    "&.MuiBox-root": {
      padding: "2rem 0",
      border: "1px solid #E0E0E0",
      borderRadius: ".4rem",
      "&:active": {
        border: "2px solid black",
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

const Administrator = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [addAdminUser] = useMutation(signup);
  const [pageInfo, setPageInfo] = useState(defaultPageInfo);
  const [fetchAdmins, { loading, data, error, refetch }] =
    useLazyQuery(findAdmin);

  useEffect(() => {
    fetchAdmins({
      variables: {
        first: pageInfo?.limit,
      },
      notifyOnNetworkStatusChange: true,
    });
  }, [fetchAdmins, pageInfo]);

  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
    disabled: theme.palette.common.black,
  };
  /*   const onChange = async (e) => {
    setSearchMail(e);
    if (e == "") {
      refetch();
    } else refetch({ role: e });
  }; */
  const specializations = [
    { key: "Doctor", value: "doctor" },
    { key: "Super-admin", value: "super-admin" },
  ];
  const { selectedRows } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();

  const initialValues = {
    email: "",
    role: "",
  };
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    if (data) {
      setAdmins(data.accounts.data);
      setPageInfo(data.accounts.pageInfo);
    }
  }, [data]);

  const validationSchema = Yup.object({
    email: Yup.string().email("Enter a valid email").trim(),
    role: Yup.string("Select your role"),
  });
  const onSubmit = async (values) => {
    const { email, role } = values;
    await refetch({
      email,
      role,
    });
    handleDialogClose();
  };
  const initialValues1 = {
    email: "",
    password: "",
  };

  const validationSchema1 = Yup.object({
    password: Yup.string()
      .required("password is required")
      .min(8, "Password is too short - should be 8 chars minimum."),
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
  });
  const onSubmit1 = async (values, onSubmitProps) => {
    const { email, password } = values;
    try {
      await addAdminUser({
        variables: {
          email,
          password,
          role: "admin",
          authType: "normal",
        },
        refetchQueries: [{ query: findAdmin }],
      });
    } catch (err) {
      console.log(err);
    }
    handleAdminClose();
    onSubmitProps.resetForm();
  };

  /*   const [searchMail, setSearchMail] = useState(""); */
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const handleAdminClose = () => setIsAdmin(false);
  /*   const handleDialogOpen = () => setIsOpen(true); */
  const handleAdminOpen = () => setIsAdmin(true);
  const handleDialogClose = () => setIsOpen(false);

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
          container
          flex={{ md: 1, sm: 1, xs: 1 }}
          justifyContent="space-between"
        >
          <Grid
            item
            container
            flex={{ md: 1, sm: 1, xs: 1 }}
            justifyContent="space-between"
          >
            <Grid item></Grid>
            <Grid item>
              <CustomButton
                endIcon={<AddIcon />}
                title="Add Admin"
                type={buttonType}
                onClick={handleAdminOpen}
              />
            </Grid>
          </Grid>
        </Grid>
        <TableLayout>
          {admins.length > 0 ? (
            <Grid item container height="100%" direction="column">
              <EnhancedTable
                headCells={adminHeader}
                rows={admins}
                paginationLabel="admin per page"
                hasCheckbox={true}
                changeLimit={changeTableLimit}
                fetchData={fetchAdmins}
                dataPageInfo={pageInfo}
              >
                {admins.map((row, index) => {
                  const { _id, email, role } = row;
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

                      <TableCell align="left" className={classes.tableCell}>
                        {email}
                      </TableCell>
                      <TableCell
                        id={labelId}
                        scope="row"
                        align="left"
                        className={classes.tableCell}
                        style={{ color: theme.palette.common.black }}
                      >
                        {role}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </EnhancedTable>
            </Grid>
          ) : (
            <EmptyTable
              headCells={adminHeader}
              paginationLabel="Admin  per page"
            />
          )}
        </TableLayout>
      </Grid>
      <Modals
        isOpen={isOpen}
        title="Filter"
        rowSpacing={5}
        handleClose={handleDialogClose}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validateOnBlur={false}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnMount={false}
        >
          {({ isSubmitting, isValid, dirty }) => {
            return (
              <Form style={{ marginTop: "3rem" }}>
                <Grid item container gap={4}>
                  <Grid item container direction="column">
                    <Grid item container spacing={2}>
                      <Grid item xs={6}>
                        <FormikControl
                          control="input"
                          name="email"
                          label="Admin Email"
                          placeholder="Enter Admin Email"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormikControl
                          control="select"
                          name="role"
                          label="Role"
                          options={specializations}
                          placeholder="Select Role"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item container xs={12}>
                    <CustomButton
                      title="Apply Filter"
                      width="100%"
                      isSubmitting={isSubmitting}
                      disabled={!(dirty || isValid)}
                      type={buttonType}
                    />
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Modals>

      <Modals
        isOpen={isAdmin}
        title="Add Admin"
        rowSpacing={5}
        height="auto"
        handleClose={handleAdminClose}
      >
        <Formik
          initialValues={initialValues1}
          onSubmit={onSubmit1}
          validationSchema={validationSchema1}
          validateOnChange={false}
          validateOnMount={false}
          validateOnBlur={false}
        >
          {({ isValid, isSubmitting, dirty }) => {
            return (
              <Form style={{ marginTop: "3rem" }}>
                <Grid item container direction="column" gap={2}>
                  <Grid item>
                    <FormikControl
                      control="input"
                      label="Email"
                      id="email"
                      placeholder="Enter email"
                      name="email"
                    />
                  </Grid>
                  <Grid item>
                    <FormikControl
                      control="input"
                      label="Password"
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Enter Password"
                    />
                  </Grid>

                  <Grid item container xs={12} marginTop={5}>
                    <CustomButton
                      title="Add Admin"
                      width="100%"
                      isSubmitting={isSubmitting}
                      disabled={!(dirty || isValid)}
                      type={buttonType}
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

export default Administrator;
