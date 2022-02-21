import React, { useState, useEffect } from "react";
import FormikControl from "components/validation/FormikControl";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import NoData from "components/layouts/NoData";
import { Button, Avatar, Chip, Checkbox, TableCell, TableRow, Grid } from "@mui/material";
import { Modals, FilterList, Loader, Search, CustomButton } from "components/Utilities";
import EnhancedTable from "components/layouts/EnhancedTable";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { patientsHeadCells } from "components/Utilities/tableHeaders";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import displayPhoto from "assets/images/avatar.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { isSelected } from "helpers/isSelected";
import { useQuery, useLazyQuery } from "@apollo/client";
import { getPatients } from "components/graphQL/useQuery";

const genderType = [
  { key: "Male", value: "0" },
  { key: "Female", value: "1" },
];

const useStyles = makeStyles((theme) => ({
  searchGrid: {
    "&.MuiGrid-root": {
      flex: 1,
      marginRight: "5rem",
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
      fontSize: "1.25rem",
      textAlign: "left",
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
}));

const Patients = ({ setSelectedSubMenu, setSelectedPatientMenu }) => {
  const classes = useStyles();
  const theme = useTheme();
  // const inputRef = createRef();

  const initialValues = {
    name: "",
    bloodGroup: "",
    phone: "",
    gender: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string("Enter your hospital"),
    bloodGroup: Yup.string("ENter your bloodGroup"),
    gender: Yup.string("Select your gender"),
    phone: Yup.number("Enter your specialization").typeError("Enter a current Number"),
  });
  const { loading, error, data, refetch } = useQuery(getPatients, {
    notifyOnNetworkStatusChange: true,
  });
  const [fetchUser] = useLazyQuery(getPatients);
  const [profiles, setProfiles] = useState([]);
  const onSubmit = async (values) => {
    const { gender } = values;
    if (!gender) return;

    await refetch({
      gender,
    });
    handleDialogClose();
  };
  const [pageInfo, setPageInfo] = useState([]);
  useEffect(() => {
    if (data) {
      setPageInfo(data.profiles.pageInfo);
      setProfiles(data.profiles.data);
    }
  }, [data]);
  const { page, totalPages, hasNextPage, hasPrevPage, limit, totalDocs } = pageInfo;
  const [rowsPerPage, setRowsPerPage] = useState(0);
  const { selectedRows } = useSelector((state) => state.tables);

  const { setSelectedRows } = useActions();

  const [searchPatient, setSearchPatient] = useState("");
  const onChange = async (e) => {
    setSearchPatient(e);
    if (e == " ") {
      fetchUser();
    } else refetch(e === "" ? null : { dociId: `HEALA-${e.toUpperCase()}` });
  };

  const fetchMoreFunc = (e, newPage) => {
    refetch({ page: newPage });
  };

  const [isOpen, setIsOpen] = useState(false);
  const handleDialogOpen = () => setIsOpen(true);
  const handleDialogClose = () => setIsOpen(false);

  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
    disabled: theme.palette.common.black,
  };
  if (loading) return <Loader />;
  if (error) return <NoData error={error.message} />;

  return (
    <>
      <Grid container direction="column" gap={2} flexWrap="nowrap" height="100%">
        <Grid item container>
          <Grid item className={classes.searchGrid}>
            <Search
              value={searchPatient}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Type to search patients by Heala ID e.g 7NE6ELLO "
              height="5rem"
            />
          </Grid>
          <Grid item>
            <FilterList title="Filter Patients" width="15.2rem" onClick={handleDialogOpen} />
          </Grid>
        </Grid>
        {/* The Search and Filter ends here */}

        <Grid item container height="100%" direction="column">
          {profiles.length > 0 ? (
            <EnhancedTable
              headCells={patientsHeadCells}
              rows={profiles}
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
              {(rowsPerPage > 0
                ? profiles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : profiles
              ).map((row, index) => {
                const isItemSelected = isSelected(row._id, selectedRows);
                const labelId = `enhanced-table-checkbox-${index}`;
                const {
                  dociId,
                  firstName,
                  lastName,
                  plan,
                  provider,
                  image,
                  consultations,
                  _id,
                  status,
                } = row;
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
                        onClick={() => handleSelectedRows(row._id, selectedRows, setSelectedRows)}
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
                      style={{ color: theme.palette.common.grey, textAlign: "left" }}
                    >
                      {dociId && dociId.split("-")[1]}
                    </TableCell>
                    <TableCell align="left" className={classes.tableCell}>
                      <div
                        style={{
                          height: "100%",
                          display: "flex",
                          alignItems: "left",
                        }}
                      >
                        <span style={{ marginRight: "1rem" }}>
                          <Avatar
                            alt={`Display Photo of ${firstName}`}
                            src={image ? image : displayPhoto}
                            sx={{ width: 24, height: 24 }}
                          />
                        </span>
                        <span style={{ fontSize: "1.25rem" }}>{`${firstName} ${lastName}`}</span>
                      </div>
                    </TableCell>
                    <TableCell align="left" className={classes.tableCell}>
                      {plan ? plan : "No Plan"}
                    </TableCell>
                    <TableCell align="left" className={classes.tableCell}>
                      {provider ? provider : "No Provider"}
                    </TableCell>
                    <TableCell align="left" className={classes.tableCell}>
                      {consultations ? consultations : 0}
                    </TableCell>
                    <TableCell align="left" className={classes.tableCell}>
                      <Chip
                        label={status ? status : "No Status"}
                        className={classes.badge}
                        style={{
                          background:
                            status == "Active"
                              ? theme.palette.common.lightGreen
                              : theme.palette.common.lightRed,
                          color:
                            status == "Active"
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
                        to={`patients/${_id}`}
                        endIcon={<ArrowForwardIosIcon />}
                        onClick={() => {
                          setSelectedSubMenu(2);
                          setSelectedPatientMenu(0);
                        }}
                      >
                        View Profile
                      </Button>
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
                    <FormikControl
                      control="select"
                      options={genderType}
                      name="gender"
                      label="Filter by Gender"
                      placeholder="Filter by Gender"
                    />
                  </Grid>
                  <br></br>
                  <br></br>
                  <br></br>

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

Patients.propTypes = {
  setSelectedSubMenu: PropTypes.func.isRequired,
  setSelectedPatientMenu: PropTypes.func.isRequired,
};

export default Patients;
