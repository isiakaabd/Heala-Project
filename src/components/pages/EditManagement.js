import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { isSelected } from "helpers/isSelected";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Formik, Form } from "formik";
import FormikControl from "components/validation/FormikControl";
import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { EnhancedTable, NoData } from "components/layouts";
import { editManagement } from "components/Utilities/tableHeaders";
import { PreviousButton, CustomButton, Loader, Modals } from "components/Utilities";
import { editRole } from "components/graphQL/Mutation";
import { getRoles, getRole } from "components/graphQL/useQuery";
import { useMutation, useQuery } from "@apollo/client";
import { TableRow, TableCell, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { arrangeItems } from "../../helpers/func";

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
const EditManagement = () => {
  let history = useHistory();
  const { editId } = useParams();
  const [last, setLast] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const handleDialogOpen = () => setIsOpen(true);
  const [role, setRole] = useState([]);
  const [state, setState] = useState({
    description: "",
    name: "",
  });
  const { data, loading, error } = useQuery(getRole, {
    variables: { id: editId },
  });
  console.log(role);
  useEffect(() => {
    if (data) {
      const { name, description, permissions } = data.getRole;
      setState({
        name,
        description,
      });
      console.log(permissions);
      setLast(permissions);
      setRole(permissions === null ? [] : arrangeItems(permissions)); //h);  arrangeItems(
    }
  }, [data]);
  const handleDialogClose = () => setIsOpen(false);
  const initialValues1 = {
    name: "",
    value: "",
  };

  const onSubmit1 = (values, onSubmitProps) => {
    const { name, value } = values;

    const z = role.filter((i) => i.name === name);
    const index = role.findIndex((object) => object.name === z[0].name);
    const j = role[index];
    j.value = [value, ...j.value];

    setRole(role);
    setLast([`${name}:${value}`, ...last]);
    onSubmitProps.resetForm();
  };

  const [editRoles] = useMutation(editRole, {
    refetchQueries: [{ query: getRoles }],
  });
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

  const theme = useTheme();
  const classes = useStyles();
  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
  };
  const { selectedRows } = useSelector((state) => state.tables);
  const { name, description } = state;

  const initialValues = {
    permissions: last,
    name,
    description,
  };

  if (loading) return <Loader />;
  if (error) return <NoData error={error} />;
  return (
    <>
      <Grid container direction="column" rowSpacing={2}>
        <Grid item>
          <PreviousButton path="/settings/management" /* onClick={() => setSelectedSubMenu(0)} */ />
        </Grid>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          // validationSchema={validationSchema}
          validateOnChange={false}
          validateOnMount={false}
          validateOnBlur={false}
          enableReinitialize
        >
          {({ isSubmitting, values }) => {
            return (
              <>
                <Form>
                  <Grid
                    item
                    container
                    flexWrap="nowrap"
                    alignItems="center"
                    style={{ paddingBottom: "3rem" }}
                  >
                    <Grid item container alignItems="center">
                      <Typography noWrap variant="h1" component="div" color="#2D2F39">
                        User Permissions
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      container
                      gap={2}
                      justifyContent="end"
                      alignItems="center"
                      justifySelf="flex-end"
                    >
                      <Grid item>
                        <CustomButton
                          endIcon={<AddIcon />}
                          title="Add New Permission"
                          type={buttonType}
                          role
                          onClick={handleDialogOpen}
                        />
                      </Grid>
                      <Grid item>
                        <CustomButton
                          title="Save Permission"
                          type={buttonType}
                          isSubmitting={isSubmitting}
                          maxWidth="100%"
                          className={classes.btn}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item container>
                    <EnhancedTable
                      headCells={editManagement}
                      rows={role}
                      type="editRole"
                      hasCheckbox={false}
                    >
                      {role.map((row, index) => {
                        const isItemSelected = isSelected(index, selectedRows);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={index}
                            selected={isItemSelected}
                          >
                            <TableCell role="checkbox" sx={{ padding: "0 5rem" }}></TableCell>
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
                              //  className={classes.tableCell}
                              style={{
                                color: theme.palette.common.black,
                                display: "flex",
                              }}
                            >
                              {row.value.map((i, index) => {
                                return (
                                  <FormikControl
                                    control="check"
                                    name="permissions"
                                    label={i}
                                    key={index}
                                    value={`${row.name}:${i}`}
                                  />
                                );
                              })}
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
        </Formik>
      </Grid>
      <Modals isOpen={isOpen} title="Add New Role" rowSpacing={5} handleClose={handleDialogClose}>
        <Formik
          initialValues={initialValues1}
          onSubmit={onSubmit1}
          validateOnChange={false}
          validateOnMount={false}
          validateOnBlur={false}
        >
          {({ isSubmitting, dirty, isValid }) => {
            return (
              <Form style={{ marginTop: "3rem" }}>
                <Grid item container gap={4} direction="column">
                  <Grid item container spacing={2}>
                    <FormikControl
                      control="input"
                      name="name"
                      label="Name"
                      placeholder="Enter Plan Name"
                    />
                  </Grid>

                  <Grid item container spacing={2}>
                    <FormikControl
                      control="input"
                      name="value"
                      label="Value"
                      placeholder="Enter Value"
                    />
                  </Grid>
                </Grid>
                <Grid item container xs={12} marginTop={20}>
                  <CustomButton title="Add New Role" width="100%" type={buttonType} />
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Modals>
    </>
  );
};

EditManagement.propTypes = {
  handleDialogClose: PropTypes.func,
  selectedMenu: PropTypes.number,
  setSelectedMenu: PropTypes.func,
  /* selectedSubMenu: PropTypes.number,
  setSelectedSubMenu: PropTypes.func, */
};

export default EditManagement;
