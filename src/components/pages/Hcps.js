import React, { useState } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import Modals from "components/Utilities/Modal";
import FormSelect from "components/Utilities/FormSelect";
import Search from "components/Utilities/Search";
import FilterList from "components/Utilities/FilterList";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormInput from "components/Utilities/FormInput";
import CustomButton from "components/Utilities/CustomButton";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import EnhancedTable from "components/layouts/EnhancedTable";
import { hcpsHeadCells } from "components/Utilities/tableHeaders";
import { hcpsRows } from "components/Utilities/tableData";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import displayPhoto from "assets/images/avatar.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { isSelected } from "helpers/isSelected";
import useFormInput from "components/hooks/useFormInput";

const dates = ["Hello", "World", "Goodbye", "World"];
const specializations = ["Dentistry", "Pediatry", "Optometry", "Pathology"];
const hospitals = ["General Hospital, Lekki", "H-Medix", "X Lab"];
const statusType = ["Active", "Blocked"];

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
  button: {
    "&.MuiButton-root": {
      background: "#fff",
      color: theme.palette.common.grey,
      textTransform: "none",
      borderRadius: "2rem",
      display: "flex",
      alignItems: "center",
      padding: "0.5rem",
      maxWidth: "12rem",
      fontSize: "1rem",

      "&:hover": {
        background: "#fcfcfc",
      },

      "&:active": {
        background: "#fafafa",
      },

      "& .MuiButton-endIcon>*:nth-of-type(1)": {
        fontSize: ".85rem",
      },

      "& .MuiButton-endIcon": {
        marginLeft: ".2rem",
        marginTop: "-.2rem",
      },
    },
  },
  badge: {
    "&.MuiChip-root": {
      fontSize: "1.25rem !important",
      height: "2.7rem",
      borderRadius: "1.3rem",
    },
  },

  searchFilterBtn: {
    "&.MuiButton-root": {
      ...theme.typography.btn,
      background: theme.palette.common.black,
      width: "100%",
    },
  },
  uploadBtn: {
    "&.MuiButton-root": {
      ...theme.typography.btn,
      background: "#f2f2f2",
      boxShadow: "none",
      color: theme.palette.common.black,

      "&:hover": {
        background: "#f2f3f3",
        boxShadow: "none",
      },

      "&:active": {
        boxShadow: "none",
      },
    },
  },
}));

const Hcps = ({ setSelectedSubMenu, setSelectedHcpMenu }) => {
  const classes = useStyles();
  const theme = useTheme();

  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
  };

  const [searchHcp, setSearchHcp] = useState("");
  const [openHcpFilter, setOpenHcpFilter] = useState(false);
  const [openAddHcp, setOpenAddHcp] = useState(false);

  // FIltering modals select states
  const [selectedInput, handleSelectedInput] = useFormInput({
    date: "",
    specialization: "",
    hospital: "",
    status: "",
  });

  // Add new HCP modals input state
  const [formInput, handleFormInput] = useFormInput({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    specialization: "",
    hospital: "",
  });

  const { date, specialization, hospital, status } = selectedInput;
  const { firstName, lastName, email, phoneNumber, hcpSpecialization, hcpHospital } = formInput;

  const { rowsPerPage, selectedRows, page } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();

  return (
    <Grid container direction="column">
      <Grid item container>
        <Grid item className={classes.searchGrid}>
          <Search
            value={searchHcp}
            onChange={(e) => setSearchHcp(e.target.value)}
            placeholder="Type to search HCPs..."
            height="5rem"
          />
        </Grid>
        <Grid item className={classes.filterBtnGrid}>
          <FilterList onClick={() => setOpenHcpFilter(true)} title="Filter HCPs" />
        </Grid>
        <Grid item>
          <CustomButton
            endIcon={<AddIcon />}
            title="Add HCP"
            type={buttonType}
            onClick={() => setOpenAddHcp(true)}
          />
        </Grid>
      </Grid>
      <Grid item container style={{ marginTop: "5rem" }}>
        <EnhancedTable
          headCells={hcpsHeadCells}
          rows={hcpsRows}
          page={page}
          paginationLabel="Patients per page"
          hasCheckbox={true}
        >
          {hcpsRows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {
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
                  <TableCell
                    id={labelId}
                    scope="row"
                    align="center"
                    className={classes.tableCell}
                    style={{ color: theme.palette.common.grey, minWidth: "10rem" }}
                  >
                    {row.id}
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
                        <Avatar
                          alt={`Display Photo of ${row.name}`}
                          src={displayPhoto}
                          sx={{ width: 24, height: 24 }}
                        />
                      </span>
                      <span style={{ fontSize: "1.25rem" }}>{row.name}</span>
                    </div>
                  </TableCell>
                  <TableCell
                    align="center"
                    className={classes.tableCell}
                    style={{ color: theme.palette.common.grey }}
                  >
                    {row.specialization}
                  </TableCell>
                  <TableCell align="center" className={classes.tableCell}>
                    {row.consultation}
                  </TableCell>
                  <TableCell
                    align="center"
                    className={classes.tableCell}
                    style={{ color: theme.palette.common.grey }}
                  >
                    {row.hospital}
                  </TableCell>
                  <TableCell align="center" className={classes.tableCell}>
                    <Chip
                      label={row.status}
                      className={classes.badge}
                      style={{
                        background:
                          row.status === "Active"
                            ? theme.palette.common.lightGreen
                            : theme.palette.common.lightRed,
                        color:
                          row.status === "Active"
                            ? theme.palette.common.green
                            : theme.palette.common.red,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      className={classes.button}
                      component={Link}
                      to={`hcps/${row.id}`}
                      endIcon={<ArrowForwardIosIcon />}
                      onClick={() => {
                        setSelectedSubMenu(3);
                        setSelectedHcpMenu(0);
                      }}
                    >
                      View HCP
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
        </EnhancedTable>
      </Grid>
      {/* Filter Modal */}
      <Modals
        isOpen={openHcpFilter}
        title="Filter"
        rowSpacing={5}
        handleClose={() => setOpenHcpFilter(false)}
      >
        <Grid item container direction="column">
          <Grid item>
            <Grid container spacing={2}>
              <Grid item md>
                <Grid container direction="column">
                  <Grid item>
                    <FormLabel component="legend" className={classes.FormLabel}>
                      Date
                    </FormLabel>
                  </Grid>
                  <Grid item>
                    <FormControl fullWidth>
                      <FormSelect
                        name="date"
                        options={dates}
                        value={date}
                        onChange={handleSelectedInput}
                        placeholderText="Choose Date"
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md>
                <Grid container direction="column">
                  <Grid item>
                    <FormLabel component="legend" className={classes.FormLabel}>
                      Specialization
                    </FormLabel>
                  </Grid>
                  <Grid item>
                    <FormControl fullWidth>
                      <FormSelect
                        name="specialization"
                        options={specializations}
                        value={specialization}
                        onChange={handleSelectedInput}
                        placeholderText="Select Specialization"
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ marginBottom: "18rem", marginTop: "3rem" }}>
            <Grid container spacing={2}>
              <Grid item md>
                <Grid container direction="column">
                  <Grid item>
                    <FormLabel component="legend" className={classes.FormLabel}>
                      Hospital
                    </FormLabel>
                  </Grid>
                  <Grid item>
                    <FormControl fullWidth style={{ height: "3rem" }}>
                      <FormSelect
                        name="hospital"
                        options={hospitals}
                        value={hospital}
                        onChange={handleSelectedInput}
                        placeholderText="Choose hospital"
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md>
                <Grid container direction="column">
                  <Grid item>
                    <FormLabel component="legend" className={classes.FormLabel}>
                      Status
                    </FormLabel>
                  </Grid>
                  <Grid item>
                    <FormControl fullWidth style={{ height: "3rem" }}>
                      <FormSelect
                        name="status"
                        options={statusType}
                        value={status}
                        onChange={handleSelectedInput}
                        placeholderText="Select Status"
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={() => setOpenHcpFilter(false)}
              type="submit"
              className={classes.searchFilterBtn}
            >
              Apply Filter
            </Button>
          </Grid>
        </Grid>
      </Modals>
      {/* ADD HCP MODAL */}
      <Modals
        isOpen={openAddHcp}
        title="Add HCP"
        rowSpacing={5}
        height="90vh"
        handleClose={() => setOpenAddHcp(false)}
      >
        <>
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
                    onChange={handleFormInput}
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
                    onChange={handleFormInput}
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
                    onChange={handleFormInput}
                    placeholder="Enter email"
                  />
                </Grid>
                <Grid item md>
                  <FormInput
                    label="Phone Number"
                    labelId="phoneNumber"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={handleFormInput}
                    placeholder="Enter phone number"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container spacing={2}>
                <Grid item md>
                  <FormInput
                    label="Specialization"
                    labelId="hcpSpecialization"
                    id="hcpSpecialization"
                    name="hcpSpecialization"
                    value={hcpSpecialization}
                    onChange={handleFormInput}
                    placeholder="Enter specialization"
                  />
                </Grid>
                <Grid item md>
                  <FormInput
                    label="Hospital"
                    labelId="hcpHospital"
                    id="hcpHospital"
                    name="hcpHospital"
                    value={hcpHospital}
                    onChange={handleFormInput}
                    placeholder="Enter hospital"
                  />
                </Grid>
                {/* <Grid item>
                      <FormControl fullWidth>
                        <FormSelect
                          sx={{ height: "5rem" }}
                          name="specialization"
                          options={specializations}
                          value={specialization}
                          onChange={handleSelectedInput}
                          placeholderText="Select Specialization"
                        />
                      </FormControl>
                    </Grid> */}
              </Grid>
            </Grid>
          </Grid>
          <Grid item container>
            <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                style={{ display: "none" }}
              />
              <Button variant="contained" component="span" className={classes.uploadBtn}>
                Upload Photo
              </Button>
            </label>
          </Grid>

          <Grid item container xs={12}>
            <Button
              variant="contained"
              onClick={() => setOpenAddHcp(false)}
              type="submit"
              className={classes.searchFilterBtn}
              disableRipple
            >
              Add HCP
            </Button>
          </Grid>
        </>
      </Modals>
    </Grid>
  );
};

Hcps.propTypes = {
  setSelectedSubMenu: PropTypes.func.isRequired,
  setSelectedHcpMenu: PropTypes.func.isRequired,
};

export default Hcps;
