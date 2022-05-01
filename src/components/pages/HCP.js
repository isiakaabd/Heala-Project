import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import {
  Grid,
  Alert,
  Button,
  Avatar,
  Typography,
  TableRow,
  TableCell,
  Checkbox,
} from "@mui/material";
import { Loader, Search, Modals, FilterList } from "components/Utilities";
import { EnhancedTable, NoData, EmptyTable } from "components/layouts";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import Filter from "components/modals/Filter";
import { HCPHeader } from "components/Utilities/tableHeaders";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import displayPhoto from "assets/images/avatar.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { isSelected } from "helpers/isSelected";
import { dateMoment } from "components/Utilities/Time";
import { useLazyQuery, useQuery } from "@apollo/client";
import { getVerification } from "components/graphQL/useQuery";
import { changeTableLimit, fetchMoreData } from "helpers/filterHelperFunctions";

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
  const [pageInfo, setPageInfo] = useState({
    page: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
    limit: 10,
    totalDocs: 0,
  });

  const [fetchVerifications, { loading, data, error, refetch }] =
    useLazyQuery(getVerification);

  React.useEffect(() => {
    fetchVerifications({
      variables: {
        first: pageInfo.limit,
      },
      notifyOnNetworkStatusChange: true,
    });
  }, [fetchVerifications]);

  const [response, setResponse] = useState("");
  const validationSchema = Yup.object({
    Name: Yup.string("Enter your Permission")
      .trim()
      .required("select an option"),
    Specialization: Yup.string("Enter your Permission")
      .trim()
      .required("select an option"),
    Date: Yup.string("Enter your Permission").required("select an option"),
    Status: Yup.string("Enter your Permission")
      .trim()
      .required("select an option"),
  });

  const { selectedRows } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();
  const [searchMail, setSearchMail] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleDialogOpen = () => {
    setIsOpen(true);
  };

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

  const initialValues = {
    Name: "",
    Date: "",
    Specialization: "",
    Status: "",
  };

  useEffect(() => {
    const z = setTimeout(() => {
      setResponse("");
    }, 2000);
    return () => clearTimeout(z);
  }, [response]);

  const handleDialogClose = () => {
    setIsOpen(false);
  };
  const checkbox = [
    { key: "select an option", value: "" },
    { key: "create", value: "create" },
    { key: "update", value: "update" },
    { key: "read", value: "read" },
    { key: "delete", value: "delete" },
  ];

  if (loading) return <Loader />;
  if (error) return <NoData error={error} />;

  return (
    <>
      <Grid
        container
        direction="column"
        gap={2}
        flexWrap="nowrap"
        height="100%"
      >
        <Grid item container>
          {response ? (
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
              <FilterList onClick={handleDialogOpen} title="Filter by" />
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
                  const { createdAt, qualification, doctorData, _id } = row;
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
                          onClick={() =>
                            handleSelectedRows(
                              _id,
                              selectedRows,
                              setSelectedRows
                            )
                          }
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
                              alt={`image of ${
                                doctorData && doctorData.firstName
                              }`}
                              src={
                                doctorData ? doctorData.picture : displayPhoto
                              }
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
                        {qualification && dateMoment(qualification.year)}
                      </TableCell>

                      <TableCell>
                        <Button
                          variant="contained"
                          className={classes.button}
                          component={Link}
                          to={`/verification/view/${_id}`}
                          endIcon={<ArrowForwardIosIcon />}
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
          <EmptyTable
            headCells={HCPHeader}
            paginationLabel="Verification  per page"
          />
        )}
      </Grid>
      {/* Modal */}
      <Modals
        isOpen={isOpen}
        title="Filter"
        rowSpacing={2}
        handleClose={handleDialogClose}
      >
        <Filter
          options={checkbox}
          type="hcp"
          initialValues={initialValues}
          validationSchema={validationSchema}
        />
      </Modals>
    </>
  );
};

HCP.propTypes = {
  setSelectedSubMenu: PropTypes.func.isRequired,
};

export default HCP;
