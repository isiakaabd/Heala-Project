import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PreviousButton from "components/Utilities/PreviousButton";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  searchGrid: {
    "&.css-13i4rnv-MuiGrid-root": {
      flex: 1,
      marginRight: "5rem",
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
      maxWidth: "13rem",

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

const ViewReferral = ({ selectedMenu, selectedSubMenu, setSelectedMenu, setSelectedSubMenu }) => {
  const classes = useStyles();

  useEffect(() => {
    setSelectedMenu(9);
    setSelectedSubMenu(10);

    // eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu]);
  return (
    <Grid container direction="column">
      <Grid item style={{ marginBottom: "3rem" }}>
        <PreviousButton path="/referrals" onClick={() => setSelectedSubMenu(0)} />
      </Grid>
      <Grid item container style={{ paddingBottom: "5rem" }}>
        <Typography variant="h2" className={classes.heading}>
          Referral View
        </Typography>
        {/* <Grid item className={classes.searchGrid}>
          <Search
            value={searchMail}
            onChange={(e) => setSearchMail(e.target.value)}
            placeholder="Enter your email here..."
            height="5rem"
          />
        </Grid> */}
        {/* <Grid item>
          <FilterList
            onClick={(event) => setAnchorEl(event.currentTarget)}
            open={open}
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            title="Filter by"
            options={options}
          />
        </Grid> */}
      </Grid>
      {/* The Search and Filter ends here */}
      {/* <Grid item container>
        <EnhancedTable
          headCells={viewRefferalHeader}
          rows={rows}
          page={page}
          paginationLabel="referral per page"
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

                <TableCell align="center" className={classes.tableCell}>
                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <span style={{ marginRight: "1rem" }}>
                      <Avatar alt="Remy Sharp" src={displayPhoto} sx={{ width: 24, height: 24 }} />
                    </span>
                    <span style={{ fontSize: "1.25rem" }}>
                      {" "}
                      {row.firstName} {row.lastName}
                    </span>
                  </div>
                </TableCell>
                <TableCell
                  align="center"
                  className={classes.tableCell}
                  style={{ color: theme.palette.common.red }}
                >
                  {row.specialization}
                </TableCell>
                <TableCell
                  id={labelId}
                  scope="row"
                  align="center"
                  className={classes.tableCell}
                  color="secondary"
                  style={{ color: theme.palette.common.grey }}
                >
                  {row.availableTime}
                </TableCell>
                <TableCell>
                  <Chip
                    label="send referral request"
                    className={classes.badge}
                    style={{
                      background:
                        row.status === "active"
                          ? theme.palette.common.lightGreen
                          : theme.palette.common.lightRed,
                      color:
                        row.status === "active"
                          ? theme.palette.common.green
                          : theme.palette.common.red,
                      border: "none",
                    }}
                    variant="outlined"
                  />
                </TableCell>

                <TableCell>
                  <Button
                    variant="contained"
                    className={classes.button}
                    to="/view"
                    endIcon={<ArrowForwardIosIcon />}
                  >
                    View HCP profile
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </EnhancedTable>
      </Grid> */}
    </Grid>
  );
};

ViewReferral.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
};

export default ViewReferral;
