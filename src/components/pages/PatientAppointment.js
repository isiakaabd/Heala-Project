import React, { useState, useEffect } from "react";
import Modals from "components/Utilities/Modal";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormInput from "components/Utilities/FormInput";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import FilterList from "components/Utilities/FilterList";
import EnhancedTable from "components/layouts/EnhancedTable";
import Avatar from "@mui/material/Avatar";
import DeleteOrDisable from "components/modals/DeleteOrDisable";
import { consultationsHeadCells as appointmentsHeadCells } from "components/Utilities/tableHeaders";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { isSelected } from "helpers/isSelected";
import { handleSelectedRows } from "helpers/selectedRows";
import displayPhoto from "assets/images/avatar.png";
import { consultationsRows } from "components/Utilities/tableData";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PreviousButton from "components/Utilities/PreviousButton";
import { useParams } from "react-router-dom";
import FormSelect from "components/Utilities/FormSelect";
import useFormInput from "components/hooks/useFormInput";

const useStyles = makeStyles((theme) => ({
  tableCell: {
    "&.css-1jilxo7-MuiTableCell-root": {
      fontSize: "1.25rem",
    },
  },
  btn: {
    "&.MuiButton-root": {
      ...theme.typography.btn,
      width: "100%",
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
}));

const filterOptions = [
  { id: 0, value: "Name" },
  { id: 1, value: "Date" },
  { id: 2, value: "Description" },
];

const PatientAppointment = (props) => {
  const {
    selectedMenu,
    selectedSubMenu,
    setSelectedMenu,
    setSelectedSubMenu,
    selectedPatientMenu,
    setSelectedPatientMenu,
  } = props;
  const [deleteModal, setdeleteModal] = useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const [isPatient, setIsPatient] = useState(false);
  const handlePatientOpen = () => setIsPatient(true);
  const handlePatientClose = () => setIsPatient(false);
  const { patientId } = useParams();

  const { page, rowsPerPage, selectedRows } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();
  const handleDeleteOpenDialog = () => {
    setdeleteModal(true);
  };
  useEffect(() => {
    setSelectedMenu(1);
    setSelectedSubMenu(2);
    setSelectedPatientMenu(2);
    // eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu, selectedPatientMenu]);
  const options = [
    { id: 0, value: "Name" },
    { id: 1, value: "Plan" },
    { id: 2, value: "Consultation" },
  ];

  const [formInput, handleFormInput] = useFormInput({
    date: "",
    plan: "",
    gender: "",
    status: "",
  });
  const dates = ["Hello", "World", "Goodbye", "World"];

  const { date, plan, gender, status } = formInput;
  return (
    <>
      <Grid container direction="column">
        <Grid item style={{ marginBottom: "3rem" }}>
          <PreviousButton
            path={`/patients/${patientId}`}
            onClick={() => setSelectedPatientMenu(0)}
          />
        </Grid>
        <Grid
          item
          container
          justifyContent="space-between"
          alignItems="center"
          style={{ paddingBottom: "5rem" }}
        >
          <Grid item>
            <Typography variant="h2">Appointments</Typography>
          </Grid>
          <Grid item>
            <FilterList
              onClick={handlePatientOpen}
              options={filterOptions}
              title="Filter Appointments"
              width="18.7rem"
            />
          </Grid>
        </Grid>
        <Grid item container>
          <EnhancedTable
            headCells={appointmentsHeadCells}
            rows={consultationsRows}
            page={page}
            paginationLabel="Patients per page"
            hasCheckbox={true}
          >
            {consultationsRows
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
                      align="left"
                      className={classes.tableCell}
                      style={{ maxWidth: "20rem" }}
                    >
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
                    <TableCell align="center" className={classes.tableCell}>
                      {row.date}
                    </TableCell>
                    <TableCell
                      align="center"
                      className={classes.tableCell}
                      style={{ color: theme.palette.common.grey, maxWidth: "20rem" }}
                    >
                      {row.description}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      <Button
                        variant="contained"
                        disableRipple
                        className={`${classes.tableBtn} ${classes.greenBtn}`}
                        endIcon={<AssignmentIcon color="success" />}
                      >
                        Reschedule
                      </Button>
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      <Button
                        variant="contained"
                        disableRipple
                        onClick={handleDeleteOpenDialog}
                        className={`${classes.tableBtn} ${classes.redBtn}`}
                        endIcon={<DeleteIcon color="error" />}
                      >
                        Cancel
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </EnhancedTable>
        </Grid>
      </Grid>

      <Modals
        isOpen={isPatient}
        title="Filter"
        rowSpacing={5}
        height="90vh"
        handleClose={handlePatientClose}
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
                  <FormControl fullWidth>
                    <FormSelect
                      sx={{ height: "5rem" }}
                      name="Date"
                      options={dates}
                      value={date}
                      placeholderText="Choose Date"
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item md>
                <Grid container direction="column">
                  <Grid item>
                    <FormLabel component="legend" className={classes.FormLabel}>
                      Plan
                    </FormLabel>
                  </Grid>
                  <FormControl fullWidth>
                    <FormSelect
                      sx={{ height: "5rem" }}
                      name="plan"
                      options={dates}
                      value={plan}
                      placeholderText="Select Plan"
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ margin: "3rem 0" }}>
            <Grid container spacing={2}>
              <Grid item md>
                <Grid container direction="column">
                  <Grid item>
                    <FormLabel component="legend" className={classes.FormLabel}>
                      Gender
                    </FormLabel>
                  </Grid>
                  <FormControl fullWidth>
                    <FormSelect
                      sx={{ height: "5rem" }}
                      name="Gender"
                      options={dates}
                      value={gender}
                      placeholderText="Choose Gender"
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item md>
                <Grid container direction="column">
                  <Grid item>
                    <FormLabel component="legend" className={classes.FormLabel}>
                      Status
                    </FormLabel>
                  </Grid>
                  <FormControl fullWidth>
                    <FormSelect
                      sx={{ height: "5rem" }}
                      name="Status"
                      options={dates}
                      value={gender}
                      placeholderText="Select status"
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item container xs={12}>
          <Button
            variant="contained"
            onClick={handlePatientClose}
            type="submit"
            className={classes.btn}
            disableRipple
          >
            Apply Filter
          </Button>
        </Grid>
      </Modals>
      {/* delete modal */}
      <DeleteOrDisable
        open={deleteModal}
        setOpen={setdeleteModal}
        title="Cancel Consultation"
        confirmationMsg="cancel appointment"
        btnValue="cancel"
      />
    </>
  );
};

PatientAppointment.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  selectedPatientMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
  setSelectedPatientMenu: PropTypes.func.isRequired,
};

export default PatientAppointment;
