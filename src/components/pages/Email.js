import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import NoData from "components/layouts/NoData";
import Loader from "components/Utilities/Loader";
import FormikControl from "components/validation/FormikControl";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { dateMoment } from "components/Utilities/Time";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Modals from "components/Utilities/Modal";
import { useQuery } from "@apollo/client";
import { getEmailList } from "components/graphQL/useQuery";
import { TableRow, Alert, TableCell, Checkbox, Button, Grid, Typography } from "@mui/material";
import DownloadSharpIcon from "@mui/icons-material/DownloadSharp";
import Search from "components/Utilities/Search";
import FilterList from "components/Utilities/FilterList";
import { EnhancedTable, EmptyTable } from "components/layouts";
import { emailHeader } from "components/Utilities/tableHeaders";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { isSelected } from "helpers/isSelected";
import CustomButton from "components/Utilities/CustomButton";
import AddIcon from "@mui/icons-material/Add";

const genderType = [
  { key: "Male", value: "Male" },
  { key: "Female", value: "Female" },
  { key: "Prefer not to say", value: "Prefer not to say" },
];
const plans = [
  { key: "Plan 1", value: "Plan 1" },
  { key: "Plan 2", value: "Plan 2" },
  { key: "Plan 3", value: "Plan 3" },
  { key: "Plan 4", value: "Plan 4" },
];
const plans1 = [
  { key: "Plan 1", value: "Plan 1" },
  { key: "Plan 2", value: "Plan 2" },
  { key: "Plan 3", value: "Plan 3" },
  { key: "Plan 4", value: "Plan 4" },
];

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
  chip: {
    "&.MuiChip-root": {
      fontSize: "1.25rem",
      height: "3rem",
      borderRadius: "1.3rem",
      background: theme.palette.common.white,
      color: theme.palette.common.green,
      "& .MuiChip-deleteIcon": {
        color: "inherit",
        fontSize: "inherit",
      },
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
      maxWidth: "7rem",
      fontSize: ".85rem",

      "&:hover": {
        background: "#fcfcfc",
      },

      "&:active": {
        background: "#fafafa",
      },

      "& .MuiButton-endIcon>*:nth-of-type(1)": {
        fontSize: "0.85rem",
      },

      "& .MuiButton-endIcon": {
        marginLeft: ".2rem",
        marginTop: "-.2rem",
      },
    },
  },
  btn: {
    "&.MuiButton-root": {
      ...theme.typography.btn,
      width: "100%",
    },
  },
  FormLabel: {
    "&.MuiFormLabel-root": {
      ...theme.typography.FormLabel,
    },
  },

  tableCell: {
    "&.MuiTableCell-root": {
      fontSize: "1.25rem",
    },
  },
}));

const Email = ({ selectedMenu, selectedSubMenu, setSelectedMenu, setSelectedSubMenu }) => {
  const classes = useStyles();
  const theme = useTheme();
  const { data, error, loading } = useQuery(getEmailList);
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    if (data) {
      setEmails(data.getEmailList.data);
    }
  }, [data]);
  const { selectedRows, page } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();
  const [searchMail, setSearchMail] = useState("");
  const [response, setResponse] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const handleDialogOpen = () => setIsOpen(true);
  useEffect(() => {
    const z = setTimeout(() => {
      setResponse("");
    }, 2000);
    return () => clearTimeout(z);
  }, [response]);

  const handleDialogClose = () => {
    setIsOpen(false);
  };
  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
    disabled: theme.palette.common.black,
  };
  const initialValues = {
    referral: "",
    date: "",
    category: "",
  };

  const validationSchema = Yup.object({
    category: Yup.string("Select your category").required("Category is required"),
    referral: Yup.string("Select your referral").required("Refferal is required"),
    date: Yup.string("Select date").required("Date is required"),
  });
  const onSubmit = (values) => {
    console.log(values);
  };

  useEffect(() => {
    setSelectedMenu(6);
    setSelectedSubMenu(0);
    //   eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu]);

  if (loading) return <Loader />;
  if (error) return <NoData error={error} />;

  return (
    <>
      <Grid container direction="column" height="100%" flexWrap="nowrap">
        {response ? (
          <Grid
            item
            width={300}
            margin="auto"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
          >
            <Alert severity="success">
              <Typography variant="h1">{response}</Typography>
            </Alert>
          </Grid>
        ) : null}
        <Grid item container style={{ paddingBottom: "5rem" }}>
          <Grid item className={classes.searchGrid}>
            <Search
              value={searchMail}
              onChange={(e) => setSearchMail(e.target.value)}
              placeholder="Enter your email here..."
              height="5rem"
            />
          </Grid>
          <Grid item className={classes.filterBtnGrid}>
            <FilterList onClick={handleDialogOpen} title="Filter by" />
          </Grid>
          <Grid item className={classes.filterBtnGrid}>
            <CustomButton
              endIcon={<DownloadSharpIcon />}
              title="Download Email"
              type={buttonType}
            />
          </Grid>
          <Grid item>
            <CustomButton
              endIcon={<AddIcon />}
              component={Link}
              to="/email/create-email"
              title="Add Email"
              type={buttonType}
            />
          </Grid>
        </Grid>
        {/* The Search and Filter ends here */}

        {emails && emails.length > 0 ? (
          <Grid item container direction="column" height="100%">
            <EnhancedTable
              headCells={emailHeader}
              rows={emails}
              page={page}
              paginationLabel="email per page"
              hasCheckbox={true}
            >
              {emails &&
                emails
                  // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const { _id, email, createdAt, role } = row;
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
                            onClick={() => handleSelectedRows(_id, selectedRows, setSelectedRows)}
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
                          {dateMoment(createdAt)}
                        </TableCell>
                        <TableCell
                          id={labelId}
                          scope="row"
                          align="left"
                          className={classes.tableCell}
                          style={{ color: theme.palette.common.black }}
                        >
                          {email}
                        </TableCell>

                        <TableCell
                          align="left"
                          className={classes.tableCell}
                          style={{ color: theme.palette.common.red }}
                        >
                          {role}
                        </TableCell>

                        <TableCell>
                          <Button
                            variant="contained"
                            className={classes.button}
                            component={Link}
                            disabled
                            to={`email/${index}`}
                            endIcon={<ArrowForwardIosIcon />}
                            onClick={() => setSelectedSubMenu(7)}
                          >
                            View mail
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
            </EnhancedTable>
          </Grid>
        ) : (
          <EmptyTable headCells={emailHeader} paginationLabel="Email  per page" />
        )}
      </Grid>

      <Modals isOpen={isOpen} title="Filter" rowSpacing={5} handleClose={handleDialogClose}>
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
                <Grid item container direction="column">
                  <Grid item container spacing={2}>
                    <Grid item xs={6} marginBottom={4}>
                      <FormikControl
                        control="input"
                        name="referral"
                        options={genderType}
                        label="Name"
                        placeholder="Select Name"
                      />
                    </Grid>
                    {/* second grid */}
                    <Grid item xs={6}>
                      <FormikControl
                        control="select"
                        name="date"
                        options={plans}
                        label="Date"
                        placeholder="Choose Date"
                      />
                    </Grid>
                  </Grid>
                  <Grid item container spacing={2}>
                    <Grid item container gap={1} xs={6}>
                      <FormikControl
                        control="select"
                        name="category"
                        options={plans1}
                        label="Category"
                        placeholder="Save Category"
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item container xs={12} marginTop={20}>
                  <CustomButton
                    title=" Apply Filter"
                    width="100%"
                    type={buttonType}
                    isSubmitting={isSubmitting}
                    disabled={!(dirty || isValid)}
                  />
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Modals>
    </>
  );
};

export default Email;
Email.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
};
