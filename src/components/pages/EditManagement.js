import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";
import Loader from "components/Utilities/Loader";
import { handleSelectedRows } from "helpers/selectedRows";
import { isSelected } from "helpers/isSelected";
import { useSelector } from "react-redux";
import NoData from "components/layouts/NoData";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import FormikControl from "components/validation/FormikControl";
import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import EnhancedTable from "components/layouts/EnhancedTable";
import { editManagement } from "components/Utilities/tableHeaders";
import PreviousButton from "components/Utilities/PreviousButton";
import CustomButton from "components/Utilities/CustomButton";
import { editRole } from "components/graphQL/Mutation";
import { getRoles, getRole } from "components/graphQL/useQuery";
import { useMutation, useQuery } from "@apollo/client";
import { useActions } from "components/hooks/useActions";
import { TableRow, TableCell, Checkbox } from "@mui/material";

const optionss = [
  { label: "get", value: "account:get" },
  { label: "get all", value: "account:get all" },
  { label: "read", value: "account:read" },
  { label: "delete", value: "account:delete" },
  { label: "create", value: "account:create" },
];
const optionss2 = [
  { label: "get", value: "illness:get" },
  { label: "get all", value: "illness:get all" },
  { label: "read", value: "illness:read" },
  { label: "delete", value: "illness:delete" },
  { label: "create", value: "illness:create" },
];
const optionss3 = [
  { label: "get", value: "family:get" },
  { label: "get all", value: "family:get all" },
  { label: "read", value: "family:read" },
  { label: "delete", value: "family:delete" },
  { label: "create", value: "family:create" },
];
const optionss4 = [
  { label: "get", value: "allergy:get" },
  { label: "get all", value: "allergy:get all" },
  { label: "read", value: "allergy:read" },
  { label: "delete", value: "allergy:delete" },
  { label: "create", value: "allergy:create" },
];
const optionss5 = [
  { label: "get", value: "consultation:get" },
  { label: "get all", value: "consultation:get all" },
  { label: "read", value: "consultation:read" },
  { label: "delete", value: "consultation:delete" },
  { label: "create", value: "consultation:create" },
];

const ro = [
  {
    name: "Account",
    value: <FormikControl control="checkbox" name="permissions" options={optionss} />,
  },
  {
    name: "Illness",
    value: <FormikControl control="checkbox" name="permissions" options={optionss2} />,
  },
  {
    name: "Family",
    value: <FormikControl control="checkbox" name="permissions" options={optionss3} />,
  },
  {
    name: "Allergy",
    value: <FormikControl control="checkbox" name="permissions" options={optionss4} />,
  },
  {
    name: "Consultations",
    value: <FormikControl control="checkbox" name="permissions" options={optionss5} />,
  },
];

const useStyles = makeStyles((theme) => ({
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

  tableCell: {
    "&.MuiTableCell-root": {
      fontSize: "1.25rem",
      gap: "4rem",
    },
  },
}));
const EditManagement = ({ setSelectedSubMenu }) => {
  let history = useHistory();
  const { editId } = useParams();
  const { setSelectedRows } = useActions();
  const [role, setRole] = useState("");
  const { data, loading, error } = useQuery(getRole, { variables: { id: editId } });
  useEffect(() => {
    if (data) {
      const { name, description, permissions } = data.getRole;
      console.log(permissions);
      setRole({
        name,
        description,
        permissions,
      });
    }
  }, [data]);
  const [editRoles] = useMutation(editRole, { refetchQueries: [{ query: getRoles }] });
  const onSubmit = async (values) => {
    const { name, description, permissions } = values;

    await editRoles({
      variables: {
        id: editId,
        name,
        description,
        permissions,
      },
    });

    history.push("/settings/management");
  };
  const validationSchema = Yup.object({
    name: Yup.string("Enter your Name").required("Name is required"),
    description: Yup.string("Enter your description").required("Description is required"),
  });
  const theme = useTheme();
  const classes = useStyles();
  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
  };
  const { selectedRows } = useSelector((state) => state.tables);

  if (loading) return <Loader />;
  if (error) return <NoData error={error.message} />;
  return (
    <Grid container direction="column" rowSpacing={2}>
      <Grid item>
        <PreviousButton path="/settings/management" onClick={() => setSelectedSubMenu(0)} />
      </Grid>
      <Formik
        initialValues={role}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnMount
        enableReinitialize
      >
        {({ isSubmitting, dirty, isValid }) => {
          return (
            <>
              <Form>
                <Grid
                  item
                  container
                  alignItems="center"
                  justifyContent="space-between"
                  style={{ paddingBottom: "3rem" }}
                >
                  <Grid item>
                    <Grid item container alignItems="center">
                      <Typography noWrap variant="h1" component="div" color="#2D2F39">
                        User Permissions
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <CustomButton
                      title="Save Permission"
                      type={buttonType}
                      isSubmitting={isSubmitting}
                      maxWidth="100%"
                      disabled={!(dirty || isValid)}
                      className={classes.btn}
                    />
                  </Grid>
                </Grid>

                <Grid item container>
                  <EnhancedTable
                    headCells={editManagement}
                    rows={ro}
                    // page={page}
                    // paginationLabel="payout per page"
                    hasCheckbox={false}
                  >
                    {ro.map((row, index) => {
                      const isItemSelected = isSelected(row.id, selectedRows);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.name}
                          selected={isItemSelected}
                        >
                          <TableCell role="checkbox" sx={{ padding: "0 5rem" }}>
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
                            {row.name}
                          </TableCell>
                          <TableCell
                            id={labelId}
                            scope="row"
                            align="left"
                            className={classes.tableCell}
                            style={{ color: theme.palette.common.black }}
                          >
                            {row.value}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </EnhancedTable>
                </Grid>
              </Form>
            </>
          );
        }}
        {/* The Search and Filter ends here */}
      </Formik>
    </Grid>
  );
};

EditManagement.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
  handleDialogClose: PropTypes.func,
};

export default EditManagement;
