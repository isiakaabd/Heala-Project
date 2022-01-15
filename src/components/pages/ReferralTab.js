import React, { useState, useEffect } from "react";
import Loader from "components/Utilities/Loader";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import { dateMoment, timeMoment } from "components/Utilities/Time";
import Search from "components/Utilities/Search";
import FilterList from "components/Utilities/FilterList";
import EnhancedTable from "components/layouts/EnhancedTable";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { referralHeader } from "components/Utilities/tableHeaders";
import { Avatar, Button } from "@mui/material";
import displayPhoto from "assets/images/avatar.png";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { isSelected } from "helpers/isSelected";
import { useQuery } from "@apollo/client";
import { getRefferals } from "components/graphQL/useQuery";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import NoData from "components/layouts/NoData";

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
  button: {
    "&.MuiButton-root": {
      background: "#fff",
      color: theme.palette.common.grey,
      textTransform: "none",
      borderRadius: "2rem",
      display: "flex",
      alignItems: "center",
      padding: "1rem",
      width: "10rem",

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

const ReferralTab = ({ setSelectedSubMenu }) => {
  const classes = useStyles();
  const theme = useTheme();

  const { rowsPerPage, selectedRows, page } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();
  const [referral, setReferral] = useState([]);
  const [searchMail, setSearchMail] = useState("");
  const { loading, data, error } = useQuery(getRefferals);

  useEffect(() => {
    if (data && data.getReferrals.referral) {
      setReferral(data.getReferrals.referral);
    }
  }, [referral, data]);
  if (loading) return <Loader />;
  if (error) return <NoData error={error.message} />;

  return (
    <Grid container direction="column" height="100%">
      {referral.length > 0 ? (
        <>
          <Grid item container>
            <Grid item className={classes.searchGrid}>
              <Search
                value={searchMail}
                onChange={(e) => setSearchMail(e.target.value)}
                placeholder="Type to search referrals..."
                height="5rem"
              />
            </Grid>
            <Grid item>
              <FilterList onClick={() => console.log("Clicked")} title="Filter by" />
            </Grid>
          </Grid>
          {/* The Search and Filter ends here */}
          <Grid item container style={{ marginTop: "5rem" }}>
            <EnhancedTable
              headCells={referralHeader}
              rows={referral}
              page={page}
              paginationLabel="referral per page"
              hasCheckbox={true}
            >
              {referral
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
                      <TableCell
                        id={labelId}
                        scope="row"
                        align="left"
                        className={classes.tableCell}
                        style={{ color: theme.palette.common.black }}
                      >
                        {dateMoment(row.createdAt)}
                      </TableCell>
                      <TableCell
                        id={labelId}
                        scope="row"
                        align="left"
                        className={classes.tableCell}
                        style={{ color: theme.palette.common.black }}
                      >
                        {/* {new Date(row.updatedAt)} */}
                        {timeMoment(row.updatedAt)}
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
                          <span style={{ fontSize: "1.25rem" }}>{row.patient}</span>
                        </div>
                      </TableCell>
                      <TableCell
                        align="left"
                        className={classes.tableCell}
                        style={{ color: theme.palette.common.black }}
                      >
                        {row.specialization}
                      </TableCell>
                      <TableCell
                        align="left"
                        className={classes.tableCell}
                        style={{ color: theme.palette.common.black }}
                      >
                        {row.reason}
                      </TableCell>
                      <TableCell
                        align="left"
                        className={classes.tableCell}
                        style={{ color: theme.palette.common.black }}
                      >
                        {row.note}
                      </TableCell>

                      <TableCell align="left" className={classes.tableCell}>
                        <Button
                          variant="contained"
                          className={classes.button}
                          component={Link}
                          disabled
                          // to={`hcps/${row._id}`}
                          endIcon={<ArrowForwardIosIcon />}
                          // onClick={() => {
                          //   setSelectedSubMenu(3);
                          //   setSelectedHcpMenu(0);
                          // }}
                        >
                          View Referral
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </EnhancedTable>
          </Grid>
        </>
      ) : (
        <NoData />
      )}
    </Grid>
  );
};

ReferralTab.propTypes = {
  setSelectedSubMenu: PropTypes.func.isRequired,
};

export default ReferralTab;
