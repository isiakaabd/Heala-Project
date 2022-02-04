import React, { useState, useEffect } from "react";
import Loader from "components/Utilities/Loader";
import CustomButton from "components/Utilities/CustomButton";
import FormikControl from "components/validation/FormikControl";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Modals from "components/Utilities/Modal";
import PropTypes from "prop-types";
import { TableRow, Grid, Checkbox, TableCell, Avatar, Button } from "@mui/material";
import { dateMoment } from "components/Utilities/Time";
import Search from "components/Utilities/Search";
import FilterList from "components/Utilities/FilterList";
import EnhancedTable from "components/layouts/EnhancedTable";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { referralHeader } from "components/Utilities/tableHeaders";
import displayPhoto from "assets/images/avatar.svg";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { isSelected } from "helpers/isSelected";
import { useQuery } from "@apollo/client";
import { getRefferals } from "components/graphQL/useQuery";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import NoData from "components/layouts/NoData";

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
      padding: "1rem",
      width: "10rem",

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
}));

const ReferralTab = ({ setSelectedSubMenu, setSelectedHcpMenu }) => {
  const handleDialogOpen = () => setIsOpen(true);
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
    disabled: theme.palette.common.black,
  };
  const handleDialogClose = () => setIsOpen(false);
  const classes = useStyles();
  const initialValues = {
    specialization: "",
    patient: "",
    // category: "",
    doctor: "",
  };
  const specializations = [
    { key: "Dentist", value: "dentist" },
    { key: "Pediatry", value: "Pediatry" },
    { key: "Optometry", value: "Optometry" },
    { key: "Pathology", value: "Pathology" },
  ];
  const validationSchema = Yup.object({
    doctor: Yup.string("Enter Doctor ID"),
    patient: Yup.string("Enter Patient ID"),
    category: Yup.string("Select category"),
    specialization: Yup.string("Select specialization"),
  });

  const onSubmit = async (values) => {
    const { doctor, patient, specialization } = values;
    try {
      await refer.refetch({
        doctor,
        patient,
        // category,
        specialization,
      });
    } catch (err) {
      console.log(err);
    }
    handleDialogClose();
  };

  const { rowsPerPage, selectedRows, page } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();
  const [searchMail, setSearchMail] = useState("");
  const refer = useQuery(getRefferals);
  const [referral, setReferral] = useState([]);

  useEffect(() => {
    if (refer.data) {
      setReferral(refer.data.getReferrals.referral);
    }
  }, [referral, refer.data]);

  if (refer.loading) return <Loader />;
  if (refer.error) return <NoData error={refer.error.message} />;

  return (
    <>
      <Grid container direction="column" height="100%">
        {referral.length > 0 ? (
          <>
            <Grid item container>
              <Grid item className={classes.searchGrid}>
                <Search
                  value={searchMail}
                  onChange={(e) => setSearchMail(e.target.value)}
                  placeholder="Type to search referrals..."
                  height="5rem"
                />
              </Grid>
              <Grid item>
                <FilterList onClick={handleDialogOpen} title="Filter by" />
              </Grid>
            </Grid>
            {/* The Search and Filter ends here */}
            <Grid item container style={{ marginTop: "5rem" }}>
              <EnhancedTable
                headCells={referralHeader}
                rows={referral}
                page={page}
                paginationLabel="referral per page"
                hasCheckbox={true}
              >
                {referral
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
                        key={row._id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            onClick={() =>
                              handleSelectedRows(row.id, selectedRows, setSelectedRows)
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
                          style={{ color: theme.palette.common.black }}
                        >
                          {dateMoment(row.createdAt)}
                        </TableCell>
                        <TableCell
                          id={labelId}
                          scope="row"
                          align="left"
                          className={classes.tableCell}
                          style={{ color: theme.palette.common.black }}
                        >
                          {/* {new Date(row.updatedAt)} */}
                          {row.referralId ? row.referralId : "No Value"}
                        </TableCell>
                        <TableCell align="left" className={classes.tableCell}>
                          <div
                            style={{
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <span style={{ marginRight: "1rem" }}>
                              <Avatar
                                alt="Remy Sharp"
                                src={displayPhoto}
                                sx={{ width: 24, height: 24 }}
                              />
                            </span>
                            <span style={{ fontSize: "1.25rem" }}>{row.doctor}</span>
                          </div>
                        </TableCell>
                        <TableCell
                          align="left"
                          className={classes.tableCell}
                          style={{ color: theme.palette.common.black }}
                        >
                          {row.patient}
                        </TableCell>
                        <TableCell
                          align="left"
                          className={classes.tableCell}
                          style={{ color: theme.palette.common.black }}
                        >
                          {row.type}
                        </TableCell>
                        <TableCell
                          align="left"
                          className={classes.tableCell}
                          style={{ color: theme.palette.common.black }}
                        >
                          {row.type == "hcp" ? row.specialization : row.testType}
                        </TableCell>

                        <TableCell align="left" className={classes.tableCell}>
                          <Button
                            variant="contained"
                            className={classes.button}
                            component={Link}
                            to={`referrals/${row._id}`}
                            endIcon={<ArrowForwardIosIcon />}
                            onClick={() => {
                              setSelectedSubMenu(10);
                            }}
                          >
                            View Referral
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </EnhancedTable>
            </Grid>
          </>
        ) : (
          <NoData />
        )}
      </Grid>
      <Modals isOpen={isOpen} title="Filter" rowSpacing={5} handleClose={handleDialogClose}>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnMount
          validateOnBlur
        >
          {({ isSubmitting, isValid, dirty }) => {
            return (
              <Form style={{ marginTop: "3rem" }}>
                <Grid item container direction="column">
                  <Grid item>
                    <Grid container spacing={2}>
                      <Grid item md>
                        <FormikControl
                          control="select"
                          options={specializations}
                          name="specialization"
                          label="Specialization"
                          placeholder="Select Specialization"
                        />
                      </Grid>
                      <Grid item md>
                        <FormikControl
                          control="input"
                          name="patient"
                          label="Patient ID"
                          placeholder="Enter Patient ID"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item style={{ marginBottom: "18rem", marginTop: "3rem" }}>
                    <Grid container spacing={2}>
                      <Grid item md>
                        <FormikControl
                          control="input"
                          name="doctor"
                          label="Doctor ID"
                          placeholder="Enter Doctor ID"
                        />
                      </Grid>
                      <Grid item md>
                        {/* <FormikControl
                          control="input"
                          name="doctor"
                          label="Doctor ID"
                          placeholder="Enter Doctor ID"
                        /> */}
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

ReferralTab.propTypes = {
  setSelectedSubMenu: PropTypes.func,
  setSelectedHcpMenu: PropTypes.func,
};

export default ReferralTab;
