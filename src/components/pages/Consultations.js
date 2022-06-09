import React, { useEffect, useState } from "react";
import { dateMoment } from "components/Utilities/Time";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Grid, Typography, TableRow, TableCell, Checkbox, Button, Avatar } from "@mui/material";
import { EnhancedTable, NoData, EmptyTable } from "components/layouts";
import { consultationsHeadCells4 } from "components/Utilities/tableHeaders";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { isSelected } from "helpers/isSelected";
import { handleSelectedRows } from "helpers/selectedRows";
import displayPhoto from "assets/images/avatar.svg";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useParams } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { getConsultations } from "components/graphQL/useQuery";
import { Loader, FilterList } from "components/Utilities";
import { changeTableLimit, fetchMoreData } from "helpers/filterHelperFunctions";

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

const Consultations = (props) => {
  const { selectedMenu, setSelectedMenu } = props;
  const [pageInfo, setPageInfo] = useState({});
  const classes = useStyles();
  const theme = useTheme();
  const { patientConsultation } = useActions();
  const { selectedRows } = useSelector((state) => state.tables);
  const [consultations, setConsultations] = useState([]);
  const { setSelectedRows } = useActions();
  const { patientId } = useParams();

  const [fetchConsultations, { loading, data, error }] = useLazyQuery(getConsultations);

  useEffect(() => {
    fetchConsultations({
      variables: {
        id: patientId,
        orderBy: "-createdAt",
      },
    });
  }, [fetchConsultations, patientId]);

  useEffect(() => {
    if (data) {
      setConsultations(data.getConsultations.data);
      patientConsultation(data);
      setPageInfo(data.getConsultations.pageInfo);
    }
  }, [data, consultations, patientConsultation]);

  useEffect(() => {
    setSelectedMenu(1);

    // eslint-disable-next-line
  }, [selectedMenu]);

  if (loading) return <Loader />;
  if (error) return <NoData error={error.message} />;

  return (
    <Grid container gap={2} flexWrap="nowrap" direction="column" height="100%">
      <Grid item container flexWrap="nowrap" justifyContent="space-between" alignItems="center">
        <Grid item flex={1}>
          <Typography variant="h2">Consultations</Typography>
        </Grid>
        <Grid item>
          <FilterList options={filterOptions} title="Filter" />
        </Grid>
      </Grid>
      {consultations.length > 0 ? (
        <Grid item container direction="column" height="100%">
          <EnhancedTable
            headCells={consultationsHeadCells4}
            rows={consultations}
            paginationLabel="Patients per page"
            handleChangePage={fetchMoreData}
            hasCheckbox={true}
            changeLimit={changeTableLimit}
            fetchData={fetchConsultations}
            dataPageInfo={pageInfo}
          >
            {consultations
              // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const { doctorData } = row;
                const isItemSelected = isSelected(row._id, selectedRows);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row._id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        onClick={() => handleSelectedRows(row._id, selectedRows, setSelectedRows)}
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell align="left" className={classes.tableCell}>
                      {dateMoment(row.createdAt)}
                    </TableCell>
                    <TableCell
                      align="left"
                      className={classes.tableCell}
                      style={{ maxWidth: "25rem" }}
                    >
                      <div
                        style={{
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ marginRight: "1rem" }}>
                          <Avatar
                            alt={`Display Photo of ${doctorData.firstName}`}
                            src={doctorData.picture ? doctorData.picture : displayPhoto}
                            sx={{ width: 24, height: 24 }}
                          />
                        </span>
                        <span style={{ fontSize: "1.25rem" }}>
                          {doctorData.firstName
                            ? `${doctorData.firstName} ${doctorData.lastName}`
                            : "No Doctor"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell align="left" className={classes.tableCell}>
                      <Grid container gap={1}>
                        {row.symptoms
                          ? row.symptoms.map((i) => {
                              return <p key={i.name}>{i.name}</p>;
                            })
                          : "No Value"}
                      </Grid>
                    </TableCell>
                    <TableCell
                      align="left"
                      className={classes.tableCell}
                      style={{
                        color: theme.palette.common.grey,
                        width: "4rem",
                      }}
                    >
                      {row.contactMedium ? row.contactMedium : "No Value"}
                    </TableCell>
                    <TableCell
                      align="left"
                      className={classes.tableCell}
                      style={{
                        color: theme.palette.common.grey,
                      }}
                    >
                      {row.type ? row.type : "No Value"}
                    </TableCell>
                    <TableCell
                      align="left"
                      className={classes.tableCell}
                      style={{
                        color: theme.palette.common.grey,
                      }}
                    >
                      {row.status ? row.status : "No Value"}
                    </TableCell>
                    <TableCell align="left">
                      <Button
                        variant="contained"
                        className={classes.button}
                        component={Link}
                        to={`/patients/${patientId}/consultations/case-notes/${row._id}`}
                        endIcon={<ArrowForwardIosIcon />}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </EnhancedTable>
        </Grid>
      ) : (
        <EmptyTable headCells={consultationsHeadCells4} paginationLabel="Patients per page" />
      )}
    </Grid>
  );
};

Consultations.propTypes = {
  selectedMenu: PropTypes.number,
  setSelectedMenu: PropTypes.func,
};

export default Consultations;
