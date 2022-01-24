import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";
import Loader from "components/Utilities/Loader";
import NoData from "components/layouts/NoData";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import FormikControl from "components/validation/FormikControl";
import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import PreviousButton from "components/Utilities/PreviousButton";
import CustomButton from "components/Utilities/CustomButton";
import { editRole } from "components/graphQL/Mutation";
import { getRoles, getRole } from "components/graphQL/useQuery";
import { useMutation, useQuery } from "@apollo/client";

const EditManagement = ({ setSelectedSubMenu }) => {
  let history = useHistory();
  const { editId } = useParams();
  const [role, setRole] = useState("");
  const { data, loading, error } = useQuery(getRole, { variables: { id: editId } });
  useEffect(() => {
    if (data) {
      const { name, description } = data.getRole;
      setRole({
        name,
        description,
        permissions: [],
      });
    }
  }, [data]);
  console.log(role);
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

  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
  };

  if (loading) return <Loader />;
  if (error) return <NoData error={error.message} />;
  return (
    <Grid container direction="column" rowSpacing={2}>
      <Grid item>
        <PreviousButton path="/settings/management" onClick={() => setSelectedSubMenu(0)} />
      </Grid>

      <Grid item container justifyContent="space-between" style={{ paddingBottom: "3rem" }}>
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
            // to="/finance/pending"
            // onClick={handleAdminOpen}
          />
        </Grid>
      </Grid>
      <Grid item container width="75%" margin="auto">
        <Formik
          initialValues={role}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnMount
          enableReinitialize
        >
          {({ isSubmitting, dirty, isValid, values }) => {
            return (
              <Form style={{ marginTop: "3rem" }}>
                <Grid item container direction="column">
                  <Grid item container>
                    <Grid item container gap={2}>
                      <Grid container direction="column" gap={2}>
                        <FormikControl
                          control="input"
                          name="name"
                          label=" Name of role"
                          placeholder="Enter Plan Name"
                        />
                      </Grid>
                      <Grid container direction="column">
                        <FormikControl
                          control="input"
                          name="description"
                          label=" Description"
                          placeholder="Enter Description"
                        />
                      </Grid>
                    </Grid>

                    <Grid item container alignItems="center" justifyContent="space-around" xs={12}>
                      <Grid item>
                        <Typography variant="h6" textAlign="left">
                          Account
                        </Typography>
                      </Grid>
                      <Grid item direction="column" gap={1}>
                        <FormikControl control="checkbox" name="permissions" options={optionss} />
                      </Grid>
                    </Grid>
                    <Grid item container alignItems="center" justifyContent="space-around" xs={12}>
                      <Grid item>
                        <Typography variant="h6" textAlign="left">
                          Illness
                        </Typography>
                      </Grid>
                      <Grid item direction="column" gap={1}>
                        <FormikControl control="checkbox" name="permissions" options={optionss2} />
                      </Grid>
                    </Grid>
                    <Grid item container alignItems="center" justifyContent="space-around" xs={12}>
                      <Grid item>
                        <Typography variant="h6" textAlign="left">
                          Family
                        </Typography>
                      </Grid>
                      <Grid item direction="column" gap={1}>
                        <FormikControl control="checkbox" name="permissions" options={optionss3} />
                      </Grid>
                    </Grid>
                    <Grid item container alignItems="center" justifyContent="space-around" xs={12}>
                      <Grid item>
                        <Typography variant="h6" textAlign="left">
                          Allergy
                        </Typography>
                      </Grid>
                      <Grid item direction="column" gap={1}>
                        <FormikControl control="checkbox" name="permissions" options={optionss4} />
                      </Grid>
                    </Grid>
                    <Grid item container alignItems="center" justifyContent="space-around" xs={12}>
                      <Grid item>
                        <Typography variant="h6" textAlign="center">
                          Consultation
                        </Typography>
                      </Grid>
                      <Grid item direction="column" gap={1}>
                        <FormikControl control="checkbox" name="permissions" options={optionss5} />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} marginTop={10}>
                    <CustomButton
                      title="Edit Role"
                      width="100%"
                      isSubmitting={isSubmitting}
                      type={buttonType}
                      disabled={!(dirty || isValid)}
                    />
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Grid>
      {/* The Search and Filter ends here */}
      {/* <Grid item container>
        <EnhancedTable
          headCells={editManagement}
          rows={rows}
          page={page}
          paginationLabel="payout per page"
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
                <TableCell
                  id={labelId}
                  scope="row"
                  align="left"
                  className={classes.tableCell}
                  style={{ color: theme.palette.common.black }}
                >
                  {row.entryDate}
                </TableCell>
                <TableCell
                  id={labelId}
                  scope="row"
                  align="left"
                  className={classes.tableCell}
                  style={{ color: theme.palette.common.black }}
                >
                  {row.medical}
                </TableCell>
              </TableRow>
            );
          })}
        </EnhancedTable>
      </Grid> */}
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
