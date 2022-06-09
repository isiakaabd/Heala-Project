import React, { useState, useEffect } from "react";
import { TableRow, Grid, Checkbox, TableCell, Avatar, Button } from "@mui/material";
import { dateMoment } from "components/Utilities/Time";
import { Loader, Search } from "components/Utilities";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { referralHeader } from "components/Utilities/tableHeaders";
import displayPhoto from "assets/images/avatar.svg";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { isSelected } from "helpers/isSelected";
import { useLazyQuery } from "@apollo/client";
import { getRefferals } from "components/graphQL/useQuery";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import { NoData, EmptyTable, EnhancedTable } from "components/layouts";
import Filter from "components/Forms/Filters";
import {
  changeTableLimit,
  fetchMoreData,
  onFilterValueChange,
} from "helpers/filterHelperFunctions";
import {
  defaultPageInfo,
  referralFilterBy,
  referralPageDefaultFilterValues,
} from "helpers/mockData";

const useStyles = makeStyles((theme) => ({
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

const ReferralTab = () => {
  const classes = useStyles();
  const [pageInfo, setPageInfo] = useState(defaultPageInfo);
  const theme = useTheme();

  const onChange = async (e) => {
    setSearchMail(e);
    if (e == "") {
      refetch();
    } else refetch({ id: e });
  };

  const { selectedRows } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();
  const [searchMail, setSearchMail] = useState("");
  const [fetchRefferals, { loading, error, data, refetch, variables }] = useLazyQuery(getRefferals);
  const [referral, setReferral] = useState([]);

  useEffect(() => {
    fetchRefferals({
      variables: {
        first: pageInfo.limit,
      },
      notifyOnNetworkStatusChange: true,
    });
  }, [fetchRefferals, pageInfo]);

  useEffect(() => {
    if (data) {
      setReferral(data.getReferrals.referral);
      setPageInfo(data.getReferrals.pageInfo);
    }
  }, [data]);

  const [filterValues, setFilterValues] = useState(referralPageDefaultFilterValues);

  if (error) return <NoData error={error} />;

  return (
    <>
      <Grid container direction="column" height="100%" gap={2} flexWrap="nowrap">
        <Grid item direction={{ sm: "row", xs: "column" }} gap={{ sm: 4, xs: 2 }} container>
          <Grid item flex={1}>
            <Search
              value={searchMail}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Type to search referrals by ID e.g 1Ntqaazu..."
              height="5rem"
            />
          </Grid>
          <Grid item>
            <Filter
              onHandleChange={(e) =>
                onFilterValueChange(
                  e,
                  "type",
                  filterValues,
                  setFilterValues,
                  fetchRefferals,
                  variables,
                  refetch,
                )
              }
              options={referralFilterBy}
              name="status"
              placeholder="By Type"
              value={filterValues.type}
            />
          </Grid>
        </Grid>
        {loading ? (
          <Loader />
        ) : referral?.length > 0 ? (
          <Grid item container>
            <EnhancedTable
              headCells={referralHeader}
              rows={referral}
              paginationLabel="referral per page"
              handleChangePage={fetchMoreData}
              hasCheckbox={true}
              changeLimit={changeTableLimit}
              fetchData={fetchRefferals}
              dataPageInfo={pageInfo}
            >
              {referral
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const {
                    _id,
                    createdAt,
                    type,
                    specialization,
                    testType,
                    doctorData,
                    patientData,
                  } = row;
                  console.log(doctorData);
                  // const { firstName, lastName, picture } = row?.doctorData;
                  // const {
                  //   firstName: patientName,
                  //   lastName: lastName,
                  //   picture: picture,
                  // } = patientData;
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
                        {/* {new Date(updatedAt)} */}
                        {_id ? _id : "No Value"}
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
                              alt={`image of ${
                                doctorData?.firstName
                                  ? doctorData.firstName
                                  : "placeholder Display Image"
                              }`}
                              src={doctorData?.picture ? doctorData?.picture : displayPhoto}
                              sx={{ width: 24, height: 24 }}
                            />
                          </span>
                          <span style={{ fontSize: "1.25rem" }}>
                            {doctorData?.firstName
                              ? `${doctorData?.firstName} ${doctorData?.lastName}`
                              : "No Doctor"}
                          </span>
                        </div>
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
                              alt={`image of ${
                                patientData?.firstName
                                  ? patientData?.firstName
                                  : "placeholder Display Image"
                              }`}
                              src={patientData?.picture ? patientData?.picture : displayPhoto}
                              sx={{ width: 24, height: 24 }}
                            />
                          </span>
                          <span style={{ fontSize: "1.25rem" }}>
                            {patientData?.firstName
                              ? `${patientData?.firstName} ${patientData?.lastName}`
                              : "No Patient"}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell
                        align="left"
                        className={classes.tableCell}
                        style={{ color: theme.palette.common.black }}
                      >
                        {type}
                      </TableCell>
                      <TableCell
                        align="left"
                        className={classes.tableCell}
                        style={{ color: theme.palette.common.black }}
                      >
                        {type == "hcp" ? specialization : testType}
                      </TableCell>

                      <TableCell align="left" className={classes.tableCell}>
                        <Button
                          variant="contained"
                          className={classes.button}
                          component={Link}
                          to={`referrals/${_id}`}
                          endIcon={<ArrowForwardIosIcon />}
                          /* onClick={() => {
                            setSelectedSubMenu(10);
                          }} */
                        >
                          View Referral
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </EnhancedTable>
          </Grid>
        ) : (
          <EmptyTable headCells={referralHeader} paginationLabel="Referral  per page" />
        )}
      </Grid>
    </>
  );
};

export default ReferralTab;
