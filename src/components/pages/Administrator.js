import React, { useState, useEffect } from "react";
import Modals from "components/Utilities/Modal";
import FormSelect from "components/Utilities/FormSelect";
import FormLabel from "@mui/material/FormLabel";
import PropTypes from "prop-types";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Search from "components/Utilities/Search";
import FilterList from "components/Utilities/FilterList";
import EnhancedTable from "components/layouts/EnhancedTable";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { rows } from "components/Utilities/DataHeader";
import { adminHeader } from "components/Utilities/tableHeaders";
import Avatar from "@mui/material/Avatar";
import displayPhoto from "assets/images/avatar.png";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { isSelected } from "helpers/isSelected";
import EditIcon from "@mui/icons-material/Edit";
import PreviousButton from "components/Utilities/PreviousButton";

const useStyles = makeStyles((theme) => ({
  searchGrid: {
    "&.css-13i4rnv-MuiGrid-root": {
      flex: 1,
      marginRight: "5rem",
    },
  },
  FormLabel: {
    "&.MuiFormLabel-root": {
      ...theme.typography.FormLabel,
    },
  },
  btn: {
    "&.MuiButton-root": {
      ...theme.typography.btn,
      width: "100%",
    },
  },
  button: {
    "&.css-1zf5oc-MuiButtonBase-root-MuiButton-root": {
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

      "& .css-9tj150-MuiButton-endIcon>*:nth-of-type(1)": {
        fontSize: "1.2rem",
      },

      "& .css-9tj150-MuiButton-endIcon": {
        marginLeft: ".3rem",
        marginTop: "-.2rem",
      },
    },
  },
  redBtn: {
    "&.css-1zf5oc-MuiButtonBase-root-MuiButton-root": {
      background: theme.palette.common.lightRed,
      color: theme.palette.common.red,

      "&:hover": {
        background: theme.palette.error.light,
        color: "#fff",
      },
    },
  },
  greenBtn: {
    "&.css-1zf5oc-MuiButtonBase-root-MuiButton-root": {
      background: theme.palette.common.lightGreen,
      color: theme.palette.common.green,

      "&:hover": {
        background: theme.palette.success.light,
        color: "#fff",
      },
    },
  },

  tableCell: {
    "&.css-1jilxo7-MuiTableCell-root": {
      fontSize: "1.25rem",
    },
  },

  badge: {
    "&.css-1eelh6y-MuiChip-root": {
      fontSize: "1.6rem !important",
      height: "3rem",
      borderRadius: "1.3rem",
    },
  },
}));

const options = [
  { id: 0, value: "Name" },
  { id: 1, value: "Plan" },
  { id: 2, value: "Consultation" },
];
const Administrator = ({ selectedMenu, selectedSubMenu, setSelectedMenu, setSelectedSubMenu }) => {
  const classes = useStyles();
  const theme = useTheme();
  const referralOptions = ["Hello", "World", "Goodbye", "World"];
  const { rowsPerPage, selectedRows, page } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();

  const [searchMail, setSearchMail] = useState("");
  const [referral, setReferral] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const handleDialogOpen = () => setIsOpen(true);
  const handleDialogClose = () => setIsOpen(false);

  useEffect(() => {
    setSelectedMenu(11);
    setSelectedSubMenu(12);

    // eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu]);

  return (
    <Grid container direction="column" rowSpacing={1}>
      <Grid item>
        <PreviousButton path="/settings" />
      </Grid>
      <Grid item container style={{ paddingBottom: "3rem" }}>
        <Grid item className={classes.searchGrid}>
          <Search
            value={searchMail}
            onChange={(e) => setSearchMail(e.target.value)}
            placeholder="Type to search referrals..."
            height="5rem"
          />
        </Grid>
        <Grid item>
          <FilterList onClick={handleDialogOpen} title="Filter Administrator" options={options} />
        </Grid>
      </Grid>
      {/* The Search and Filter ends here */}
      <Grid item container>
        <EnhancedTable
          headCells={adminHeader}
          rows={rows}
          page={page}
          paginationLabel="admin per page"
          hasCheckbox={true}
        >
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
            const isItemSelected = isSelected(row.id, selectedRows);

            const labelId = `enhanced-table-checkbox-${index}`;

            return (
              <>
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
                    <div
                      style={{
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "left",
                        paddingLeft: "5rem",
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
                    id={labelId}
                    scope="row"
                    align="left"
                    className={classes.tableCell}
                    style={{ color: theme.palette.common.black }}
                  >
                    {row.category}
                  </TableCell>

                  <TableCell align="left" className={classes.tableCell}>
                    <div
                      style={{
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                      }}
                    >
                      <Button
                        variant="contained"
                        disableRipple
                        className={`${classes.button} ${classes.greenBtn}`}
                        endIcon={<EditIcon style={{ color: theme.palette.common.green }} />}
                      >
                        Edit plan
                      </Button>
                      <Button
                        variant="contained"
                        disableRipple
                        className={classes.button}
                        to="/view"
                        endIcon={<ArrowForwardIosIcon />}
                      >
                        view admin
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>

                <Modals
                  isOpen={isOpen}
                  title="Filter"
                  rowSpacing={5}
                  handleClose={handleDialogClose}
                >
                  <>
                    <Grid item container direction="column">
                      <Grid item container spacing={2}>
                        <Grid item xs={6} marginBottom={4}>
                          <Grid container direction="column" gap={1}>
                            <FormLabel component="legend" className={classes.FormLabel}>
                              Admin Name
                            </FormLabel>
                            <FormControl fullWidth>
                              <FormSelect
                                options={referralOptions}
                                value={referral}
                                onChange={(event) => setReferral(event.target.value)}
                                placeholderText="Select Name"
                              />
                            </FormControl>
                          </Grid>
                        </Grid>
                        {/* second grid */}
                        <Grid item xs={6}>
                          <Grid container gap={1} direction="column">
                            <FormLabel component="legend" className={classes.FormLabel}>
                              Role
                            </FormLabel>
                            <FormControl fullWidth>
                              <FormSelect
                                options={referralOptions}
                                value={referral}
                                onChange={(event) => setReferral(event.target.value)}
                                placeholderText="Select Role"
                              />
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item container xs={12} marginTop={30}>
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
          })}
        </EnhancedTable>
      </Grid>
    </Grid>
  );
};
Administrator.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
};

export default Administrator;
