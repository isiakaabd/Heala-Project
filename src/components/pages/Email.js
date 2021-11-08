import React, { useState, useEffect } from "react";
import FormLabel from "@mui/material/FormLabel";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Modals from "components/Utilities/Modal";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import DownloadSharpIcon from "@mui/icons-material/DownloadSharp";
import Search from "components/Utilities/Search";
import FilterList from "components/Utilities/FilterList";
import EnhancedTable from "components/layouts/EnhancedTable";
import { makeStyles } from "@mui/styles";
import displayPhoto from "assets/images/avatar.png";
import { useTheme } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import { rows } from "components/Utilities/DataHeader";
import { emailHeader } from "components/Utilities/tableHeaders";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { isSelected } from "helpers/isSelected";
import CustomButton from "components/Utilities/CustomButton";
import FormSelect from "components/Utilities/FormSelect";
import Alert from "@mui/material/Alert";
import { Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

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

const referralOptions = ["Hello", "World", "Goodbye", "World"];

const Email = ({ selectedMenu, selectedSubMenu, setSelectedMenu, setSelectedSubMenu }) => {
  const classes = useStyles();
  const theme = useTheme();
  const { rowsPerPage, selectedRows, page, emailData } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();
  const [searchMail, setSearchMail] = useState("");
  const [response, setResponse] = useState("");
  const [state, setstate] = useState({
    referral: "Hello",
    date: "Goodbye",
    category: "World",
  });
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
  };
  //

  const handleChange = (e) => {
    const { name, value } = e.target;
    setstate({ ...state, [name]: value });
  };
  const { referral, category, date } = state;

  useEffect(() => {
    setSelectedMenu(6);
    setSelectedSubMenu(0);
    //   eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu]);

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
        <Grid item container>
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

        {emailData && emailData.length > 0 ? (
          <Grid item container style={{ marginTop: "5rem" }}>
            <EnhancedTable
              headCells={emailHeader}
              rows={rows}
              page={page}
              paginationLabel="email per page"
              hasCheckbox={true}
            >
              {emailData
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
                      <TableCell align="center" className={classes.tableCell}>
                        <Grid container>
                          <Grid item container flex=".4" columnGap={1}>
                            {row.name.slice(0, 3).map((item) => {
                              return (
                                <Grid item key={item}>
                                  <Avatar
                                    alt={item}
                                    src={displayPhoto}
                                    sx={{ width: 24, height: 24 }}
                                  />
                                </Grid>
                              );
                            })}
                          </Grid>
                          <Grid item container flex=".6" columnGap={2}>
                            {row.name.slice(0, 3).map((item) => {
                              return (
                                <Grid key={item}>
                                  <Typography>
                                    {item.split("@").shift().toString().concat(",")}
                                  </Typography>
                                </Grid>
                              );
                            })}
                          </Grid>
                        </Grid>
                      </TableCell>

                      <TableCell
                        id={labelId}
                        scope="row"
                        align="left"
                        className={classes.tableCell}
                        style={{ color: theme.palette.common.black }}
                      >
                        {row.message}
                      </TableCell>
                      <TableCell
                        id={labelId}
                        scope="row"
                        align="center"
                        className={classes.tableCell}
                        style={{ color: theme.palette.common.black }}
                      >
                        {row.entryData}
                      </TableCell>

                      <TableCell
                        align="center"
                        className={classes.tableCell}
                        style={{ color: theme.palette.common.red }}
                      >
                        {row.plan}
                      </TableCell>
                      <TableCell align="center" className={classes.tableCell}>
                        <Chip
                          label={row.email}
                          variant="outlined"
                          className={classes.chip}
                          deleteIcon={<ArrowForwardIosIcon />}
                          onClick={() => window.open(`mailto:${row.email}`, "_blank")}
                          onDelete={() => console.log(" ")}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          className={classes.button}
                          component={Link}
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
          <Grid>
            <Typography fontSize="5rem" textAlign="center">
              No Mail
            </Typography>
          </Grid>
        )}
      </Grid>

      <Modals isOpen={isOpen} title="Filter" rowSpacing={5} handleClose={handleDialogClose}>
        <Grid item container direction="column">
          <Grid item container spacing={2}>
            <Grid item xs={6} marginBottom={4}>
              <Grid container direction="column" gap={1}>
                <FormLabel component="legend" className={classes.FormLabel}>
                  Name
                </FormLabel>
                <FormControl fullWidth>
                  <FormSelect
                    options={referralOptions}
                    value={referral}
                    name="referral"
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
                    options={referralOptions}
                    value={date}
                    name="date"
                    onChange={handleChange}
                    placeholderText="Choose Date"
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item container gap={1} xs={6}>
              <FormLabel component="legend" className={classes.FormLabel}>
                Category
              </FormLabel>
              <FormControl fullWidth style={{ height: "3rem" }}>
                <FormSelect
                  options={referralOptions}
                  value={category}
                  name="category"
                  placeholderText="Save Category"
                  onChange={handleChange}
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
