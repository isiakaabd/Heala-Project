import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import { useTheme } from "@mui/material/styles";
import {
  Grid,
  Alert,
  Button,
  Avatar,
  Chip,
  Typography,
  TableRow,
  TableCell,
  Checkbox,
} from "@mui/material";

import Filter from "components/Forms/Filters";
import { isSelected } from "helpers/isSelected";
import displayPhoto from "assets/images/avatar.svg";
import { Loader, Search } from "components/Utilities";
import { dateMoment } from "components/Utilities/Time";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { getVerification } from "components/graphQL/useQuery";
import { HCPHeader } from "components/Utilities/tableHeaders";
import { useStyles } from "../../styles/docVerificationPageStyles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { EnhancedTable, NoData, EmptyTable } from "components/layouts";
import { docVerifyPageDefaultFilterValues, docVerifyStatusFilterBy } from "helpers/mockData";
import {
  changeTableLimit,
  fetchMoreData,
  onFilterValueChange,
} from "helpers/filterHelperFunctions";

const HCP = ({ setSelectedSubMenu }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [pageInfo, setPageInfo] = useState({
    page: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
    limit: 10,
    totalDocs: 0,
  });

  const [fetchVerifications, { loading, data, error, variables, refetch }] =
    useLazyQuery(getVerification);

  useEffect(() => {
    fetchVerifications({
      variables: {
        first: pageInfo.limit,
      },
      notifyOnNetworkStatusChange: true,
    });
  }, [fetchVerifications, pageInfo]);

  const [response, setResponse] = useState("");
  const [filterValues, setFilterValues] = useState(docVerifyPageDefaultFilterValues);

  const { selectedRows } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();
  const [searchMail, setSearchMail] = useState("");

  const [respondData, setRespondData] = useState([]); //setRespondData

  useEffect(() => {
    try {
      if (data) {
        setRespondData(data.getVerifications.verification);
        setPageInfo(data.getVerifications.pageInfo);
      }
    } catch (err) {
      console.log(err);
    }
  }, [data]);

  useEffect(() => {
    const z = setTimeout(() => {
      setResponse("");
    }, 2000);
    return () => clearTimeout(z);
  }, [response]);

  if (loading) return <Loader />;
  if (error) return <NoData error={error} />;

  return (
    <>
      <Grid container direction="column" gap={2} flexWrap="nowrap" height="100%">
        <Grid item container>
          {response ? (
            <Grid item width={300} margin="0 auto" justifyContent="left" alignItems="center">
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
                placeholder="Type to search Doctors..."
                height="5rem"
              />
            </Grid>
            <Grid item>
              <Filter
                onHandleChange={(e) =>
                  onFilterValueChange(
                    e,
                    "status",
                    filterValues,
                    setFilterValues,
                    fetchVerifications,
                    variables,
                    refetch,
                  )
                }
                options={docVerifyStatusFilterBy}
                name="status"
                placeholder="By status"
                value={filterValues.status}
              />
            </Grid>
          </Grid>
        </Grid>
        {respondData.length > 0 ? (
          <Grid container item height="100%" direction="column">
            <EnhancedTable
              headCells={HCPHeader}
              rows={respondData}
              paginationLabel="verification per page"
              handleChangePage={fetchMoreData}
              hasCheckbox={true}
              changeLimit={changeTableLimit}
              fetchData={fetchVerifications}
              dataPageInfo={pageInfo}
            >
              {respondData
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const { createdAt, status, qualification, doctorData, _id } = row;
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

                      <TableCell align="left" className={classes.tableCell}>
                        <div
                          style={{
                            height: "100%",
                            display: "flex",
                            alignItems: "left",
                          }}
                        >
                          <span style={{ marginRight: "1rem" }}>
                            <Avatar
                              alt={`image of ${doctorData && doctorData.firstName}`}
                              src={doctorData ? doctorData.picture : displayPhoto}
                              sx={{ width: 24, height: 24 }}
                            />
                          </span>
                          <span style={{ fontSize: "1.25rem" }}>
                            {doctorData && doctorData.firstName}
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
                        {doctorData && doctorData.lastName}
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell}>
                        {qualification && qualification.degree}
                      </TableCell>
                      <TableCell
                        align="left"
                        className={classes.tableCell}
                        style={{ color: theme.palette.common.red }}
                      >
                        <Chip
                          label={status ? "Verified" : "Not Verified"}
                          className={classes.badge}
                          style={{
                            background:
                              status === true
                                ? theme.palette.common.lightGreen
                                : theme.palette.common.lightRed,
                            color:
                              status === true
                                ? theme.palette.common.green
                                : theme.palette.common.red,
                          }}
                        />
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell}>
                        {qualification && dateMoment(qualification.year)}
                      </TableCell>

                      <TableCell>
                        <Button
                          variant="contained"
                          className={classes.button}
                          component={Link}
                          endIcon={<ArrowForwardIosIcon />}
                          to={`/verification/view/${_id}`}
                          onClick={() => setSelectedSubMenu(8)}
                        >
                          View Doctor
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </EnhancedTable>
          </Grid>
        ) : (
          <EmptyTable headCells={HCPHeader} paginationLabel="Verification  per page" />
        )}
      </Grid>
    </>
  );
};

HCP.propTypes = {
  setSelectedSubMenu: PropTypes.func.isRequired,
};

export default HCP;
