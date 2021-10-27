import React, { useState, useEffect } from "react";
import Modals from "components/Utilities/Modal";
import FormSelect from "components/Utilities/FormSelect";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import CustomButton from "components/Utilities/CustomButton";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Search from "components/Utilities/Search";
import FilterList from "components/Utilities/FilterList";
import EnhancedTable from "components/layouts/EnhancedTable";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
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
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormInput from "components/Utilities/FormInput";

const useStyles = makeStyles((theme) => ({
  searchGrid: {
    "&.MuiGrid-root": {
      flex: 1,
      marginRight: "5rem",
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
  const checkbox = {
    "role 1": true,
    "role 2": true,
    "role 3": false,
    "role 4": false,
  };
  const referralOptions = ["Hello", "World", "Goodbye", "World"];
  const { rowsPerPage, selectedRows, page } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();
  const options = [
    { id: 0, value: "Name" },
    { id: 1, value: "Plan" },
    { id: 2, value: "Consultation" },
  ];
  const [searchMail, setSearchMail] = useState("");
  const [referral, setReferral] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const handleDialogOpen = () => setIsOpen(true);
  const handleAdminOpen = () => setIsAdmin(true);
  const handleAdminClose = () => setIsAdmin(false);
  const handleDialogClose = () => setIsOpen(false);

  useEffect(() => {
    setSelectedMenu(11);
    setSelectedSubMenu(12);

    // eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu]);
  const [admin, setAdmin] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    ...checkbox,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };
  const handleCheckBoxChange = (e) => {
    const { name, checked } = e.target;
    setAdmin({ ...admin, [name]: checked });
  };
  const { firstName, lastName, email, password } = admin;
  const { create, update, Delete, read } = admin;

  return (
    <>
      <Grid container direction="column" rowSpacing={1}>
        <Grid item>
          <PreviousButton path="/settings" />
        </Grid>
        <Grid item container style={{ paddingBottom: "3rem" }}>
          <Grid item className={classes.searchGrid}>
            <Search
              value={searchMail}
              onChange={(e) => setSearchMail(e.target.value)}
              placeholder="Type to search referrals..."
              height="5rem"
            />
          </Grid>
          <Grid item>
            <FilterList onClick={handleDialogOpen} title="Filter Administrator" options={options} />
          </Grid>
          <Grid item sx={{ marginLeft: "5rem" }}>
            <CustomButton
              endIcon={<AddIcon />}
              title="Add Admin"
              type={buttonType}
              onClick={handleAdminOpen}
            />
          </Grid>
        </Grid>
        {/* The Search and Filter ends here */}
        <Grid item container>
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
                <>
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

                  <Modals
                    isOpen={isOpen}
                    title="Filter"
                    rowSpacing={5}
                    handleClose={handleDialogClose}
                  >
                    <Grid item container direction="column">
                      <Grid item container spacing={2}>
                        <Grid item xs={6} marginBottom={4}>
                          <Grid container direction="column" gap={1}>
                            <FormLabel component="legend" className={classes.FormLabel}>
                              Admin Name
                            </FormLabel>
                            <FormControl fullWidth>
                              <FormSelect
                                options={referralOptions}
                                value={referral}
                                onChange={(event) => setReferral(event.target.value)}
                                placeholderText="Select Name"
                              />
                            </FormControl>
                          </Grid>
                        </Grid>
                        {/* second grid */}
                        <Grid item xs={6}>
                          <Grid container gap={1} direction="column">
                            <FormLabel component="legend" className={classes.FormLabel}>
                              Role
                            </FormLabel>
                            <FormControl fullWidth>
                              <FormSelect
                                options={referralOptions}
                                value={referral}
                                onChange={(event) => setReferral(event.target.value)}
                                placeholderText="Select Role"
                              />
                            </FormControl>
                          </Grid>
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
                  </Modals>
                </>
              );
            })}
          </EnhancedTable>
        </Grid>
      </Grid>
      <Modals
        isOpen={isAdmin}
        title="Add Admin"
        rowSpacing={5}
        height="90vh"
        handleClose={handleAdminClose}
      >
        <Grid item container direction="column">
          <Grid item>
            <Grid container spacing={2}>
              <Grid item md>
                <FormInput
                  label="First Name"
                  labelId="firstName"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={handleChange}
                  placeholder="Enter first name"
                />
              </Grid>
              <Grid item md>
                <FormInput
                  label="Last Name"
                  labelId="lastName"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={handleChange}
                  placeholder="Enter last name"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ margin: "3rem 0" }}>
            <Grid container spacing={2}>
              <Grid item md>
                <FormInput
                  type="email"
                  label="Email"
                  labelId="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="Enter email"
                />
              </Grid>
              <Grid item md>
                <FormInput
                  label="Password"
                  labelId="password"
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid item container xs={12}>
              <Grid item container direction="column" gap={1}>
                <label htmlFor="permission" className={classes.FormLabel}>
                  Role
                </label>

                <FormControl style={{ width: "100%" }}>
                  <Box sx={{ display: "flex" }} className={classes.checkboxContainer}>
                    <FormControl required component="fieldset" sx={{ m: 3 }} variant="standard">
                      <FormGroup>
                        <Grid container>
                          <FormControlLabel
                            control={
                              <Checkbox
                                className={classes.checkbox}
                                checked={create}
                                onChange={handleCheckBoxChange}
                                name="role 1"
                              />
                            }
                            label="role 1"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                className={classes.checkbox}
                                checked={Delete}
                                onChange={handleCheckBoxChange}
                                name="role 2"
                              />
                            }
                            label="role 2"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                className={classes.checkbox}
                                checked={update}
                                onChange={handleCheckBoxChange}
                                name="role 3"
                              />
                            }
                            label="role 3"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                className={classes.checkbox}
                                checked={read}
                                onChange={handleCheckBoxChange}
                                name="role 4"
                              />
                            }
                            label="role 4"
                          />
                        </Grid>
                      </FormGroup>
                    </FormControl>
                  </Box>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item container xs={12}>
          <Button
            variant="contained"
            onClick={handleAdminClose}
            type="submit"
            className={classes.btn}
            disableRipple
          >
            Add Admin
          </Button>
        </Grid>
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
