import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Alert from "@mui/material/Alert";
import FormSelect from "components/Utilities/FormSelect";
import { Grid, Typography } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import Search from "components/Utilities/Search";
import FilterList from "components/Utilities/FilterList";
import EnhancedTable from "components/layouts/EnhancedTable";
import { makeStyles } from "@mui/styles";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Modals from "components/Utilities/Modal";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { rows } from "components/Utilities/DataHeader";
import { HCPHeader } from "components/Utilities/tableHeaders";
import Avatar from "@mui/material/Avatar";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import displayPhoto from "assets/images/avatar.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { isSelected } from "helpers/isSelected";

const useStyles = makeStyles((theme) => ({
  searchGrid: {
    "&.MuiGrid-root": {
      flex: 1,
      marginRight: "5rem",
    },
  },
  FormLabel: {
    "&.MuiFormLabel-root": {
      ...theme.typography.FormLabel,
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
  btn: {
    "&.MuiButton-root": {
      ...theme.typography.btn,
      width: "100%",
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

const HCP = ({ setSelectedSubMenu }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [state, setstate] = useState({
    name: "First",
    date: "Second",
    medicalID: "Third",
  });
  const [response, setResponse] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setstate({ ...state, [name]: value });
  };

  const { rowsPerPage, selectedRows, page } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();
  const [searchMail, setSearchMail] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleDialogOpen = () => {
    setIsOpen(true);
  };

  const categoryOptions = ["First", "Second", "Third"];
  const { name, medicalID, date } = state;
  useEffect(() => {
    const z = setTimeout(() => {
      setResponse("");
    }, 2000);
    return () => clearTimeout(z);
  }, [response]);

  const handleDialogClose = async () => {
    setIsOpen(false);
    await setTimeout(() => {
      setResponse("Saved");
    }, 3000);
  };

  return (
    <>
      <Grid container direction="column">
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
      </Grid>
      <Grid container direction="column">
        <Grid item container style={{ paddingBottom: "5rem" }}>
          <Grid item className={classes.searchGrid}>
            <Search
              value={searchMail}
              onChange={(e) => setSearchMail(e.target.value)}
              placeholder="Type to search HCPs..."
              height="5rem"
            />
          </Grid>
          <Grid item>
            <FilterList onClick={handleDialogOpen} title="Filter by" />
          </Grid>
        </Grid>
        {/* The Search and Filter ends here */}
        <Grid item container>
          <EnhancedTable
            headCells={HCPHeader}
            rows={rows}
            page={page}
            paginationLabel="verification per page"
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
                    align="center"
                    className={classes.tableCell}
                    style={{ color: theme.palette.common.black }}
                  >
                    {row.entryDate}
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
                      <span style={{ fontSize: "1.25rem" }}>
                        {row.firstName} {row.lastName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell
                    align="center"
                    className={classes.tableCell}
                    style={{ color: theme.palette.common.red }}
                  >
                    {row.medical}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      className={classes.button}
                      component={Link}
                      to="/verification/view"
                      endIcon={<ArrowForwardIosIcon />}
                      onClick={() => setSelectedSubMenu(8)}
                    >
                      View HCP
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </EnhancedTable>
        </Grid>
      </Grid>
      {/* Modal */}
      <Modals isOpen={isOpen} title="Filter" rowSpacing={5} handleClose={handleDialogClose}>
        <>
          <Grid item container direction="column">
            <Grid item container spacing={2}>
              <Grid item xs={6} marginBottom={4}>
                <Grid container direction="column" gap={1}>
                  <FormLabel component="legend" className={classes.FormLabel}>
                    Name
                  </FormLabel>
                  <FormControl fullWidth>
                    <FormSelect
                      options={categoryOptions}
                      value={name}
                      name="name"
                      onChange={handleChange}
                      placeholderText="Select Name"
                    />
                  </FormControl>
                </Grid>
              </Grid>
              {/* second grid */}
              <Grid item xs={6}>
                <Grid container gap={1} direction="column">
                  <FormLabel component="legend" className={classes.FormLabel}>
                    Date
                  </FormLabel>
                  <FormControl fullWidth>
                    <FormSelect
                      options={categoryOptions}
                      value={date}
                      name="date"
                      onChange={handleChange}
                      placeholderText="Choose Date"
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            {/* <Grid item container xs={6} direction="column"> */}
            <Grid item container spacing={2}>
              <Grid item container gap={1} xs={6}>
                <FormLabel component="legend" className={classes.FormLabel}>
                  Medical ID
                </FormLabel>
                <FormControl fullWidth style={{ height: "3rem" }}>
                  <FormSelect
                    options={categoryOptions}
                    value={medicalID}
                    name="medicalID"
                    onChange={handleChange}
                    placeholderText="Select Category"
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container xs={12} marginTop={20}>
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
        </>
      </Modals>
    </>
  );
};

HCP.propTypes = {
  setSelectedSubMenu: PropTypes.func.isRequired,
};

export default HCP;
