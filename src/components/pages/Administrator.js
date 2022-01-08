import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "components/validation/FormikControl";
import { useTheme } from "@mui/material/styles";
import Modals from "components/Utilities/Modal";
import PropTypes from "prop-types";
import { Grid, TableRow, TableCell } from "@mui/material";
import CustomButton from "components/Utilities/CustomButton";
import Checkbox from "@mui/material/Checkbox";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Search from "components/Utilities/Search";
import FilterList from "components/Utilities/FilterList";
import EnhancedTable from "components/layouts/EnhancedTable";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { rows } from "components/Utilities/DataHeader";
import { adminHeader } from "components/Utilities/tableHeaders";
import Avatar from "@mui/material/Avatar";
import displayPhoto from "assets/images/avatar.png";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { isSelected } from "helpers/isSelected";
import EditIcon from "@mui/icons-material/Edit";
import PreviousButton from "components/Utilities/PreviousButton";
import AddIcon from "@mui/icons-material/Add";

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
  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
  };

  const specializations = [
    { key: "Dentistry", value: "Dentistry" },
    { key: "Pediatry", value: "Pediatry" },
    { key: "Optometry", value: "Optometry" },
    { key: "Pathology", value: "Pathology" },
  ];
  const { rowsPerPage, selectedRows, page } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();

  const initialValues = {
    role: "",
    name: "",
  };
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
    role: Yup.string("Select your role").required("Role is required"),
    name: Yup.string("Enter your name").required("Name is required"),
  });
  const onSubmit = (values) => {
    console.log(values);
  };
  const initialValues1 = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    checkbox: [],
  };

  const validationSchema1 = Yup.object({
    checkbox: Yup.array().min(1, "Add atleast a permission"),
    password: Yup.string()
      .required("password is required")
      .min(8, "Password is too short - should be 8 chars minimum."),
    hospital: Yup.string("Enter your hospital").required("Hospital is required"),
    firstName: Yup.string("Enter your first Name").required("First name is required"),
    lastName: Yup.string("Enter your last Name").required("Last name is required"),
    email: Yup.string().email("Enter a valid email").required("Email is required"),
  });
  const onSubmit1 = (values) => {
    console.log(values);
  };

  const [searchMail, setSearchMail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const handleAdminClose = () => setIsAdmin(false);
  const handleDialogOpen = () => setIsOpen(true);
  const handleAdminOpen = () => setIsAdmin(true);
  const handleDialogClose = () => setIsOpen(false);

  useEffect(() => {
    setSelectedMenu(11);
    setSelectedSubMenu(12);

    // eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu]);

  return (
    <>
      <Grid container direction="column" rowSpacing={1}>
        <Grid item>
          <PreviousButton path="/settings" />
        </Grid>
        <Grid item container>
          <Grid item className={classes.searchGrid}>
            <Search
              value={searchMail}
              onChange={(e) => setSearchMail(e.target.value)}
              placeholder="Type to search referrals..."
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
        <Grid item container style={{ marginTop: "5rem" }}>
          <EnhancedTable
            headCells={adminHeader}
            rows={rows}
            page={page}
            paginationLabel="admin per page"
            hasCheckbox={true}
          >
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              const isItemSelected = isSelected(row.id, selectedRows);

              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
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
                    <Grid
                      style={{
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "left",
                        paddingLeft: "5rem",
                      }}
                    >
                      <span style={{ marginRight: "1rem" }}>
                        <Avatar
                          alt="Remy Sharp"
                          src={displayPhoto}
                          sx={{ width: 24, height: 24 }}
                        />
                      </span>
                      <span style={{ fontSize: "1.25rem" }}>
                        {row.firstName} {row.lastName}
                      </span>
                    </Grid>
                  </TableCell>
                  <TableCell
                    id={labelId}
                    scope="row"
                    align="left"
                    className={classes.tableCell}
                    style={{ color: theme.palette.common.black }}
                  >
                    {row.category}
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
                        Edit plan
                      </Button>
                      <Button
                        variant="contained"
                        disableRipple
                        className={classes.button}
                        to="/view"
                        endIcon={<ArrowForwardIosIcon />}
                      >
                        view admin
                      </Button>
                    </Grid>
                  </TableCell>
                </TableRow>
              );
            })}
            )
          </EnhancedTable>
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
          {(formik) => {
            console.log(formik);

            return (
              <Form style={{ marginTop: "3rem" }}>
                <Grid item container direction="column">
                  <Grid item container spacing={2}>
                    <Grid item xs={6} marginBottom={4}>
                      <FormikControl
                        control="input"
                        name="name"
                        label="Admin Name"
                        placeholder="Select Name"
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
                  <Button
                    variant="contained"
                    onClick={handleDialogClose}
                    to="/view"
                    type="submit"
                    className={classes.btn}
                  >
                    Apply Filter
                  </Button>
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
          {(formik) => {
            console.log(formik);

            return (
              <Form style={{ marginTop: "3rem" }}>
                <Grid item container direction="column">
                  <Grid item>
                    <Grid container spacing={2}>
                      <Grid item md>
                        <FormikControl
                          control="input"
                          labelId="firstName"
                          label="firstName"
                          id="firstName"
                          name="firstName"
                          placeholder="Enter first name"
                        />
                      </Grid>
                      <Grid item md>
                        <FormikControl
                          control="input"
                          label="Last Name"
                          labelId="lastName"
                          id="lastName"
                          name="lastName"
                          placeholder="Enter last name"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item style={{ margin: "3rem 0" }}>
                    <Grid container spacing={2}>
                      <Grid item md>
                        <FormikControl
                          control="input"
                          label="Email"
                          labelId="email"
                          id="email"
                          placeholder="Enter email"
                          name="email"
                        />
                      </Grid>
                      <Grid item md>
                        <FormikControl
                          control="input"
                          label="Password"
                          labelId="password"
                          type="password"
                          id="password"
                          name="password"
                          placeholder="Enter Password"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid item container direction="column" xs={12}>
                      <FormikControl
                        control="checkbox"
                        formlabel="Role"
                        name="checkbox"
                        options={optionss}
                      />
                    </Grid>
                  </Grid>
                  <Grid item container xs={12} marginTop={5}>
                    <Button
                      variant="contained"
                      // onClick={handleAdminClose}
                      type="submit"
                      className={classes.btn}
                      disableRipple
                    >
                      Add Admin
                    </Button>
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
