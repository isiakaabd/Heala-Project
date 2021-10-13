import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import Modals from "components/Utilities/Modal";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import DownloadSharpIcon from "@mui/icons-material/DownloadSharp";
import Search from "components/Utilities/Search";
import FilterList from "components/Utilities/FilterList";
import EnhancedTable from "components/layouts/EnhancedTable";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import { rows } from "components/Utilities/DataHeader";
import { emailHeader } from "components/Utilities/tableHeaders";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import displayPhoto from "assets/images/avatar.png";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { isSelected } from "helpers/isSelected";
import CustomButton from "components/Utilities/CustomButton";
import FormSelect from "components/Utilities/FormSelect";

const useStyles = makeStyles((theme) => ({
  searchGrid: {
    "&.MuiGrid-root": {
      flex: 1,
      marginRight: "5rem",
    },
  },
  button: {
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

const referralOptions = ["Hello", "World", "Goodbye", "World"];
// const categoryOptions = ["First", "Second", "Third"];

const Email = () => {
  const classes = useStyles();
  const theme = useTheme();

  const { rowsPerPage, selectedRows, page } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();

  const [searchMail, setSearchMail] = useState("");
  const [referral, setReferral] = useState("");
  // const [category, setCategory] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const handleDialogOpen = () => setIsOpen(true);

  const handleDialogClose = () => setIsOpen(false);

  const buttonType = {
    background: theme.palette.success.main,
    hover: theme.palette.success.light,
    active: theme.palette.success.dark,
  };

  return (
    <>
      <Grid container direction="column">
        <Grid item container style={{ paddingBottom: "5rem" }}>
          <Grid item className={classes.searchGrid}>
            <Search
              value={searchMail}
              onChange={(e) => setSearchMail(e.target.value)}
              placeholder="Enter your email here..."
              height="5rem"
            />
          </Grid>
          <Grid item sx={{ marginRight: "2rem" }}>
            <FilterList onClick={handleDialogOpen} title="Filter by" />
          </Grid>
          <Grid item>
            <CustomButton
              endIcon={<DownloadSharpIcon />}
              title="Download email"
              type={buttonType}
            />
          </Grid>
        </Grid>
        {/* The Search and Filter ends here */}
        <Grid item container>
          <EnhancedTable
            headCells={emailHeader}
            rows={rows}
            page={page}
            paginationLabel="email per page"
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
                    {row.category}
                  </TableCell>
                  <TableCell align="center" className={classes.tableCell}>
                    <Chip
                      label={row.email}
                      variant="outlined"
                      className={classes.badge}
                      style={{
                        background: theme.palette.common.white,
                        color: theme.palette.common.green,
                        fontSize: "1.25rem",
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </EnhancedTable>
        </Grid>
      </Grid>

      <Modals isOpen={isOpen} title="Filter" rowSpacing={5} handleClose={handleDialogClose}>
        <>
          {/* <Grid item component="div"  container spacing={3} xs={12}> */}
          <Grid item container xs={12} spacing={2} component="div">
            <Grid item xs={6}>
              <Grid container direction="column" gap={1}>
                <FormLabel component="legend" className={classes.FormLabel}>
                  Name
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
                  Date
                </FormLabel>
                <FormControl fullWidth>
                  <FormSelect
                    options={referralOptions}
                    value={referral}
                    onChange={(event) => setReferral(event.target.value)}
                    placeholderText="Choose Date"
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container xs={12} spacing={2} marginBottom={8}>
            <Grid item xs={6}>
              <Grid container gap={1} direction="column">
                <FormLabel component="legend" className={classes.FormLabel}>
                  Category
                </FormLabel>
                <FormControl fullWidth style={{ height: "3rem" }}>
                  <FormSelect
                    options={referralOptions}
                    value={referral}
                    onChange={(event) => setReferral(event.target.value)}
                    placeholderText="Save Category"
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container xs={12}>
            <Button
              variant="contained"
              onClick={handleDialogClose}
              to="/view"
              type="submit"
              className={classes.button}
            >
              Apply Filter
            </Button>
          </Grid>
        </>
      </Modals>
    </>
  );
};

export default Email;
