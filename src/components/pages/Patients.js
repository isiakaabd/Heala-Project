import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import { NoData, EmptyTable } from "components/layouts";
import { Button, Avatar, Chip, Checkbox, TableCell, TableRow, Grid } from "@mui/material";

import Filter from "components/Forms/Filters";
import { useTheme } from "@mui/material/styles";
import { isSelected } from "helpers/isSelected";
import displayPhoto from "assets/images/avatar.svg";
import { Loader, Search } from "components/Utilities";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { getPatients } from "components/graphQL/useQuery";
import { useStyles } from "../../styles/patientsPageStyles";
import EnhancedTable from "components/layouts/EnhancedTable";
import { ClearFiltersBtn } from "components/Buttons/ClearFiltersBtn";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { patientsHeadCells } from "components/Utilities/tableHeaders";
import {
  genderType,
  patientsPageDefaultFilterValues,
  planFilterBy,
  providerFilterBy,
  statusFilterBy,
} from "../../helpers/mockData";
import {
  changeTableLimit,
  fetchMoreData,
  onFilterValueChange,
  resetFilters,
} from "../../helpers/filterHelperFunctions";

const Patients = ({ setSelectedSubMenu, setSelectedPatientMenu }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [profiles, setProfiles] = useState([]);
  const [filterValues, setFilterValues] = useState(patientsPageDefaultFilterValues);
  const [fetchPatient, { loading, error, data, refetch, variables }] = useLazyQuery(getPatients);

  const [pageInfo, setPageInfo] = useState({
    page: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
    limit: 10,
    totalDocs: 0,
  });

  const { selectedRows } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();
  //eslint-disable-next-line
  const debouncer = useCallback(debounce(fetchPatient, 3000), []);

  useEffect(() => {
    fetchPatient({
      variables: {
        first: pageInfo.limit,
      },
    });
  }, [fetchPatient, pageInfo]);

  useEffect(() => {
    if (data) {
      setPageInfo(data.profiles.pageInfo);
      setProfiles(data.profiles.data);
    }
  }, [data]);

  if (error) return <NoData error={error} />;

  return (
    <Grid container direction="column" gap={2} flexWrap="nowrap" height="100%">
      <Grid item container spacing={2} className={classes.searchFilterContainer}>
        {/*  ======= SEARCH INPUT(S) ==========*/}
        <Grid item className={classes.searchGrid} style={{ width: "100%" }}>
          <Search
            onChange={(e) => {
              let value = e.target.value;

              if (value !== "") {
                return debouncer({
                  variables: { dociId: `HEALA-${value.toUpperCase()}` },
                });
              }
            }}
            // onChange={debouncedChangeHandler}
            placeholder="Search by ID e.g 7NE6ELLO "
            maxHeight="5rem"
          />
        </Grid>
        {/* ========= FILTERS =========== */}
        <Grid item container spacing={2}>
          {/* FILTER BY GENDER */}
          <Grid item>
            <Filter
              onHandleChange={(e) =>
                onFilterValueChange(
                  e,
                  "gender",
                  filterValues,
                  setFilterValues,
                  fetchPatient,
                  variables,
                  refetch,
                )
              }
              options={genderType}
              name="gender"
              placeholder="By gender"
              value={filterValues.gender}
            />
          </Grid>
          {/* FILTER BY STATUS */}
          <Grid item>
            <Filter
              onHandleChange={(e) => console.log(e)}
              options={statusFilterBy}
              name="status"
              placeholder="By status"
              value={filterValues.status}
            />
          </Grid>
          {/* FILTER BY PROVIDER */}
          <Grid item>
            <Filter
              onHandleChange={(e) => console.log(e)}
              options={providerFilterBy}
              name="status"
              placeholder="By provider"
              value={filterValues.provider}
            />
          </Grid>
          {/* FILTER BY PLAN */}
          <Grid item>
            <Filter
              onHandleChange={(e) => console.log(e)}
              options={planFilterBy}
              name="status"
              placeholder="By plan"
              value={filterValues.plan}
            />
          </Grid>
          {/* ==== CLEAR FILTERS BUTTON ===== */}
          <Grid item>
            <ClearFiltersBtn
              title="Clear filters"
              onHandleClick={() => {
                resetFilters(
                  setFilterValues,
                  patientsPageDefaultFilterValues,
                  variables,
                  fetchPatient,
                );
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      {loading ? (
        <Loader />
      ) : profiles.length > 0 ? (
        /* ================= PATIENTS TABLE ================= */
        <Grid
          item
          container
          height="100%"
          // sx={{ maxWidth: "100%" }}
          direction="column"
        >
          <EnhancedTable
            headCells={patientsHeadCells}
            rows={profiles}
            paginationLabel="Patients per page"
            handleChangePage={fetchMoreData}
            hasCheckbox={true}
            changeLimit={changeTableLimit}
            fetchData={fetchPatient}
            dataPageInfo={pageInfo}
          >
            {profiles.map((row, index) => {
              const {
                dociId,
                firstName,
                lastName,
                plan,
                provider,
                image,
                consultations,
                _id,
                status,
              } = row;
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
                    style={{
                      color: theme.palette.common.grey,
                      textAlign: "left",
                    }}
                  >
                    {dociId && dociId.split("-")[1]}
                  </TableCell>
                  <TableCell align="left">
                    <div
                      style={{
                        height: "100%",
                        display: "flex",
                        // alignItems:"center",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ marginRight: "1rem" }}>
                        <Avatar
                          alt={`Display Photo of ${firstName}`}
                          src={image ? image : displayPhoto}
                          sx={{ width: 24, height: 24 }}
                        />
                      </span>
                      <span style={{ fontSize: "1.25rem" }}>{`${firstName} ${lastName}`}</span>
                    </div>
                  </TableCell>
                  <TableCell align="left">{plan ? plan : "No Plan"}</TableCell>
                  <TableCell align="left">{provider ? provider : "No Provider"}</TableCell>
                  <TableCell align="left">{consultations ? consultations : 0}</TableCell>
                  <TableCell align="left">
                    <Chip
                      label={status ? status : "No Status"}
                      className={classes.badge}
                      style={{
                        background:
                          status === "Active"
                            ? theme.palette.common.lightGreen
                            : theme.palette.common.lightRed,
                        color:
                          status === "Active"
                            ? theme.palette.common.green
                            : theme.palette.common.red,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      className={classes.button}
                      component={Link}
                      to={`patients/${_id}`}
                      endIcon={<ArrowForwardIosIcon />}
                      onClick={() => {
                        setSelectedSubMenu(2);
                        setSelectedPatientMenu(0);
                      }}
                    >
                      View Profile
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </EnhancedTable>
        </Grid>
      ) : (
        <EmptyTable headCells={patientsHeadCells} paginationLabel="Patients per page" />
      )}
    </Grid>
  );
};

Patients.propTypes = {
  setSelectedSubMenu: PropTypes.func.isRequired,
  setSelectedPatientMenu: PropTypes.func.isRequired,
};

export default Patients;
