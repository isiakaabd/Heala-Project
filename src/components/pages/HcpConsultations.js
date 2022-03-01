import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { getDocConsult } from "components/graphQL/useQuery";
import FilterList from "components/Utilities/FilterList";
import EnhancedTable from "components/layouts/EnhancedTable";
import { Avatar, Typography, TableRow, Button, TableCell, Checkbox, Grid } from "@mui/material";
import { consultationsHeadCells } from "components/Utilities/tableHeaders";
import { useSelector } from "react-redux";
import NoData from "components/layouts/NoData";
import { useActions } from "components/hooks/useActions";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { isSelected } from "helpers/isSelected";
import { handleSelectedRows } from "helpers/selectedRows";
import displayPhoto from "assets/images/avatar.svg";
import { consultationsRows } from "components/Utilities/tableData";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PreviousButton from "components/Utilities/PreviousButton";
import { useParams } from "react-router-dom";
import Loader from "components/Utilities/Loader";
import { dateMoment } from "components/Utilities/Time";

const useStyles = makeStyles((theme) => ({
  tableCell: {
    "&.css-1jilxo7-MuiTableCell-root": {
      fontSize: "1.25rem",
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
      maxWidth: "12rem",

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
      },
    },
  },
}));

const filterOptions = [
  { id: 0, value: "Name" },
  { id: 1, value: "Date" },
  { id: 2, value: "Description" },
];

const HcpConsultations = (props) => {
  const {
    selectedMenu,
    selectedSubMenu,
    selectedHcpMenu,
    selectedScopedMenu,
    setSelectedMenu,
    setSelectedSubMenu,
    setSelectedHcpMenu,
    setSelectedScopedMenu,
  } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [pageInfo, setPageInfo] = useState([]);
  const { hcpId } = useParams();
  const { selectedRows } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();
  const [consultations, setConsultations] = useState([]);

  const { loading, data, error, refetch } = useQuery(getDocConsult, {
    variables: {
      id: hcpId,
      orderBy: "-createdAt",
    },
    notifyOnNetworkStatusChange:true
  });

  useEffect(() => {
    if (data && data.getConsultations.data) {
      setConsultations(data.getConsultations.data);
      setPageInfo(data.getConsultations.pageInfo);
    }
  }, [data, hcpId]);
  const fetchMoreFunc = (e, newPage) => {
    refetch({ page: newPage });
  };

  useEffect(() => {
    setSelectedMenu(2);
    setSelectedSubMenu(3);
    setSelectedHcpMenu(6);
    setSelectedScopedMenu(0);
    // eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu, selectedHcpMenu, selectedScopedMenu]);
  const { page, totalPages, hasNextPage, hasPrevPage, limit, totalDocs } = pageInfo;
  const [rowsPerPage, setRowsPerPage] = useState(0);

  if (error) return <NoData error={error} />;
  if (loading) return <Loader />;
  return (
    <Grid container direction="column" height="100%" gap={2}>
      <Grid item>
        <PreviousButton path={`/hcps/${hcpId}`} onClick={() => setSelectedHcpMenu(0)} />
      </Grid>
      {consultations.length > 0 ? (
        <>
          <Grid item container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h2">Consultations</Typography>
            </Grid>
            <Grid item>
              <FilterList options={filterOptions} title="Filter consultations" width="18.7rem" />
            </Grid>
          </Grid>
          <Grid item container>
            <EnhancedTable
              headCells={consultationsHeadCells}
              rows={consultationsRows}
              paginationLabel="Patients per page"
              page={page}
              limit={limit}
              totalPages={totalPages}
              totalDocs={totalDocs}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              hasNextPage={hasNextPage}
              hasPrevPage={hasPrevPage}
              handleChangePage={fetchMoreFunc}
              hasCheckbox={true}
            >
              {consultations
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  // eslint-disable-next-line
                  const {
                    _id,
                    createdAt,
                    symptoms,
                    status,
                    type,
                    description,
                    patientData,

                    // eslint-disable-next-line
                  } = row;
                  const isItemSelected = isSelected(row._id, selectedRows);
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

                      <TableCell align="left" className={classes.tableCell}>
                        {dateMoment(createdAt)}
                      </TableCell>
                      <TableCell
                        align="left"
                        className={classes.tableCell}
                        style={{ maxWidth: "20rem" }}
                      >
                        <div
                          style={{
                            height: "100%",
                            display: "flex",
                            alignItems: "left",
                          }}
                        >
                          <span style={{ marginRight: "1rem" }}>
                            <Avatar
                              alt={`Display Photo of ${patientData.firstName}`}
                              src={patientData.picture ? patientData.picture : displayPhoto}
                              sx={{ width: 24, height: 24 }}
                            />
                          </span>
                          <span
                            style={{ fontSize: "1.25rem" }}
                          >{`${patientData.firstName} ${patientData.lastName}`}</span>
                        </div>
                      </TableCell>
                      <TableCell
                        align="left"
                        className={classes.tableCell}
                        style={{ color: theme.palette.common.grey, maxWidth: "20rem" }}
                      >
                        <Grid container gap={1}>
                          {symptoms
                            ? symptoms.map((i) => {
                                return <p key={i.name}>{i.name}</p>;
                              })
                            : "No Value"}
                        </Grid>
                      </TableCell>
                      <TableCell
                        align="left"
                        className={classes.tableCell}
                        style={{ color: theme.palette.common.grey, maxWidth: "20rem" }}
                      >
                        {description}
                      </TableCell>
                      <TableCell
                        align="left"
                        className={classes.tableCell}
                        style={{ color: theme.palette.common.grey, maxWidth: "20rem" }}
                      >
                        {type ? type : "No Value"}
                      </TableCell>
                      <TableCell
                        align="left"
                        className={classes.tableCell}
                        style={{ color: theme.palette.common.grey, maxWidth: "20rem" }}
                      >
                        {status ? status : "No Value"}
                      </TableCell>
                      <TableCell align="left">
                        <Button
                          variant="contained"
                          className={classes.button}
                          component={Link}
                          to={`/hcps/${hcpId}/consultations/case-notes/${_id}`}
                          endIcon={<ArrowForwardIosIcon />}
                          onClick={() => {
                            setSelectedSubMenu(2);
                            setSelectedHcpMenu(0);
                            setSelectedScopedMenu(2);
                          }}
                        >
                          View Details
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

HcpConsultations.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  selectedHcpMenu: PropTypes.number.isRequired,
  selectedScopedMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
  setSelectedHcpMenu: PropTypes.func.isRequired,
  setSelectedScopedMenu: PropTypes.func.isRequired,
};

export default HcpConsultations;
