import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import AddIcon from "@mui/icons-material/Add";
import { Loader, Search, CustomButton } from "components/Utilities";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { TableRow, Alert, TableCell, Checkbox, Button, Grid, Typography } from "@mui/material";

import { Link } from "react-router-dom";
import Filter from "components/Forms/Filters";
import { isSelected } from "helpers/isSelected";
import { useTheme } from "@mui/material/styles";
import { dateMoment } from "components/Utilities/Time";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { getEmailList } from "components/graphQL/useQuery";
import { emailHeader } from "components/Utilities/tableHeaders";
import DownloadSharpIcon from "@mui/icons-material/DownloadSharp";
import { onGenderValueChange } from "helpers/filterHelperFunctions";
import { EnhancedTable, NoData, EmptyTable } from "components/layouts";
import { emailPageDefaultFilterValues, roleFilterBy } from "helpers/mockData";

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
  const [fetchEmails, { loading, error, data, refetch, variables }] = useLazyQuery(getEmailList);
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    fetchEmails();
  }, [fetchEmails]);

  useEffect(() => {
    if (data) {
      setEmails(data.getEmailList.data);
    }
  }, [data]);
  const { selectedRows, page } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();
  const [response] = useState("");
  const [searchMail, setSearchMail] = useState("");

  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
    disabled: theme.palette.common.black,
  };

  useEffect(() => {
    setSelectedMenu(6);
    setSelectedSubMenu(0);
    //   eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu]);

  const [filterValues, setFilterValues] = React.useState(emailPageDefaultFilterValues);

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
            <Filter
              onHandleChange={(e) =>
                onGenderValueChange(
                  e,
                  "role",
                  filterValues,
                  setFilterValues,
                  fetchEmails,
                  variables,
                  refetch,
                )
              }
              options={roleFilterBy}
              name="role"
              placeholder="All roles"
              value={filterValues.role}
            />
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

        {loading ? (
          <Loader />
        ) : emails && emails.length > 0 ? (
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
