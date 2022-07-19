import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import { useTheme } from "@mui/material/styles";
import { Grid, Button, Avatar, Chip, TableRow, TableCell, Checkbox } from "@mui/material";
import useAlert from "hooks/useAlert";
import Filter from "components/Forms/Filters";
import { isSelected } from "helpers/isSelected";
import displayPhoto from "assets/images/avatar.svg";
import { Loader } from "components/Utilities";
import { dateMoment } from "components/Utilities/Time";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { getVerification } from "components/graphQL/useQuery";
import { HCPHeader } from "components/Utilities/tableHeaders";
import { useStyles } from "../../styles/docVerificationPageStyles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { EnhancedTable, NoData, EmptyTable } from "components/layouts";
import { docVerifyStatusFilterBy } from "helpers/mockData";
import {
  changeTableLimit,
  deleteVar,
  filterData,
  handlePageChange,
} from "helpers/filterHelperFunctions";

const HCP = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { displayAlert } = useAlert();
  const [pageInfo, setPageInfo] = useState({
    page: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
    limit: 10,
    totalDocs: 0,
  });

  const [statusFilterValue, setStatusFilterValue] = useState("");
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

  /* const [response, setResponse] = useState(""); */

  const { selectedRows } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();
  /*   const [searchMail, setSearchMail] = useState(""); */

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

  const onFilterStatusChange = async (value) => {
    try {
      deleteVar(variables);
      setStatusFilterValue(value);
      const filterVariables = { status: value };

      filterData(filterVariables, {
        fetchData: fetchVerifications,
        refetch: refetch,
        variables: variables,
      })
        .then((data) => {
          setRespondData(data.getVerifications.verification || []);
          setPageInfo(data.getVerifications.pageInfo || {});
        })
        .catch(() => {
          refresh(setStatusFilterValue, "");
        });
    } catch (error) {
      console.error(error);
      refresh(setStatusFilterValue, "");
    }
  };

  const refresh = async (setFilterValue, defaultVal) => {
    displayAlert("error", `Something went wrong while filtering. Try again.`);
    setFilterValue(defaultVal);

    deleteVar(variables);

    refetch()
      .then(({ data }) => {
        setRespondData(data.getVerifications.verification || []);
        setPageInfo(data.getVerifications.pageInfo || {});
      })
      .catch((error) => {
        console.error(error);
        displayAlert("error", `Failed to get patients data, Try again`);
      });
  };

  if (loading) return <Loader />;
  if (error) return <NoData error={error} />;

  return (
    <>
      <Grid container direction="column" gap={2} flexWrap="nowrap" height="100%">
        <Grid item container>
          {/* {response ? (
            <Grid
              item
              width={300}
              margin="0 auto"
              justifyContent="left"
              alignItems="center"
            >
              <Alert severity="success">
                <Typography variant="h1">{response}</Typography>
              </Alert>
            </Grid>
          ) : null} */}
          <Grid
            item
            direction={{ sm: "row", xs: "column" }}
            gap={{ md: 4, sm: 4, xs: 2 }}
            container
          >
            {/* <Grid item flex={1}>
              <Search
                value={searchMail}
                onChange={(e) => setSearchMail(e.target.value)}
                placeholder="Type to search Doctors..."
                height="5rem"
              />
            </Grid> */}
            <Grid item>
              <Filter
                onHandleChange={(e) => onFilterStatusChange(e?.target?.value)}
                onClickClearBtn={() => onFilterStatusChange("")}
                options={docVerifyStatusFilterBy}
                name="status"
                placeholder="By status"
                value={statusFilterValue}
                hasClearBtn={true}
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
              hasCheckbox={true}
              changeLimit={async (e) => {
                changeTableLimit(fetchVerifications, { first: e });
              }}
              dataPageInfo={pageInfo}
              handlePagination={async (page) => {
                handlePageChange(fetchVerifications, page, pageInfo, {});
              }}
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
                          style={{
                            whiteSpace: "nowrap",
                            padding: "5% 50%",
                            marginLeft: "-10%",
                          }}
                          component={Link}
                          endIcon={<ArrowForwardIosIcon />}
                          to={`/verification/view/${_id}`}
                        >
                          View Verification{" "}
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

export default HCP;
