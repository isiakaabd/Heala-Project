import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "components/validation/FormikControl";
import Loader from "components/Utilities/Loader";
import NoData from "components/layouts/NoData";
import { useTheme } from "@mui/material/styles";
import Modals from "components/Utilities/Modal";
import PropTypes from "prop-types";
import { Grid, TableRow, TableCell } from "@mui/material";
import CustomButton from "components/Utilities/CustomButton";
import Checkbox from "@mui/material/Checkbox";
import { signup } from "components/graphQL/Mutation";
import Search from "components/Utilities/Search";
import FilterList from "components/Utilities/FilterList";
import EnhancedTable from "components/layouts/EnhancedTable";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { adminHeader } from "components/Utilities/tableHeaders";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { isSelected } from "helpers/isSelected";
import EditIcon from "@mui/icons-material/Edit";
import PreviousButton from "components/Utilities/PreviousButton";
import AddIcon from "@mui/icons-material/Add";
import { useQuery, useMutation } from "@apollo/client";
import { findAdmin } from "components/graphQL/useQuery";
//
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

const Administrator = ({ selectedMenu, selectedSubMenu, setSelectedMenu, setSelectedSubMenu }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [addAdminUser] = useMutation(signup);
  const { loading, data, error, refetch } = useQuery(findAdmin);
  const [pageInfo, setPageInfo] = useState([]);
  const fetchMoreFunc = (e, newPage) => {
    refetch({ page: newPage });
  };

  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
    disabled: theme.palette.common.black,
  };
  const onChange = async (e) => {
    setSearchMail(e);
    if (e == "") {
      refetch();
    } else refetch({ role: e });
  };
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

  const optionss = [
    {
      label: "option 1",
      value: "option 1",
    },
    {
      label: "option 2",
      value: "option 2",
    },
    {
      label: "option 3",
      value: "three",
    },
  ];

  const validationSchema = Yup.object({
    email: Yup.string().email("Enter a valid email"),
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
    email: Yup.string().email("Enter a valid email").required("Email is required"),
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

  const [searchMail, setSearchMail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const handleAdminClose = () => setIsAdmin(false);
  const handleDialogOpen = () => setIsOpen(true);
  const handleAdminOpen = () => setIsAdmin(true);
  const handleDialogClose = () => setIsOpen(false);
  const { page, totalPages, hasNextPage, hasPrevPage, limit, totalDocs } = pageInfo;
  const [rowsPerPage, setRowsPerPage] = useState(0);

  useEffect(() => {
    setSelectedMenu(11);
    setSelectedSubMenu(12);

    // eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu]);

  if (loading) return <Loader />;
  if (error) return <NoData error={error.message} />;
  return (
    <>
      <Grid container direction="column" gap={2} flexWrap="nowrap" height="100%">
        <Grid item>
          <PreviousButton path="/settings" />
        </Grid>
        <Grid item container>
          <Grid item className={classes.searchGrid}>
            <Search
              value={searchMail}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Type to search referrals by role..."
              height="5rem"
            />
          </Grid>
          <Grid item className={classes.filterBtnGrid}>
            <FilterList
              onClick={handleDialogOpen}
              title="Filter Administrator"
              options={optionss}
            />
          </Grid>
          <Grid item>
            <CustomButton
              endIcon={<AddIcon />}
              title="Add Admin"
              type={buttonType}
              onClick={handleAdminOpen}
            />
          </Grid>
        </Grid>
        {/* The Search and Filter ends here */}
        <Grid item container height="100%" direction="column">
          {admins.length > 0 ? (
            <EnhancedTable
              headCells={adminHeader}
              rows={admins}
              paginationLabel="admin per page"
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
              {admins
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id, selectedRows);

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

                      <TableCell align="left" className={classes.tableCell}>
                        {row.email}
                      </TableCell>
                      <TableCell
                        id={labelId}
                        scope="row"
                        align="left"
                        className={classes.tableCell}
                        style={{ color: theme.palette.common.black }}
                      >
                        {row.role}
                      </TableCell>

                      <TableCell align="left" className={classes.tableCell}>
                        <Grid
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
                            className={`${classes.button} ${classes.greenBtn}`}
                            endIcon={<EditIcon style={{ color: theme.palette.common.green }} />}
                          >
                            Edit Admin
                          </Button>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  );
                })}
              )
            </EnhancedTable>
          ) : (
            <NoData />
          )}
        </Grid>
      </Grid>
      <Modals isOpen={isOpen} title="Filter" rowSpacing={5} handleClose={handleDialogClose}>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnMount
        >
          {({ isSubmitting, isValid, dirty }) => {
            return (
              <Form style={{ marginTop: "3rem" }}>
                <Grid item container direction="column">
                  <Grid item container spacing={2}>
                    <Grid item xs={6} marginBottom={4}>
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
                <Grid item container xs={12} marginTop={30}>
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

      <Modals
        isOpen={isAdmin}
        title="Add Admin"
        rowSpacing={5}
        height="90vh"
        handleClose={handleAdminClose}
      >
        <Formik
          initialValues={initialValues1}
          onSubmit={onSubmit1}
          validationSchema={validationSchema1}
          validateOnChange={false}
          validateOnMount
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
Administrator.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
};

export default Administrator;
