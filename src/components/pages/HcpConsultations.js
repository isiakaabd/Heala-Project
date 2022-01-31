import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { getDocConsult } from "components/graphQL/useQuery";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import FilterList from "components/Utilities/FilterList";
import EnhancedTable from "components/layouts/EnhancedTable";
import Avatar from "@mui/material/Avatar";
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

  const { hcpId } = useParams();

  const { page, rowsPerPage, selectedRows } = useSelector((state) => state.tables);

  const { setSelectedRows } = useActions();
  const [consultations, setConsultations] = useState([]);
  const { loading, data, error } = useQuery(getDocConsult, {
    variables: {
      id: hcpId,
      orderBy: "-createdAt",
    },
  });

  useEffect(() => {
    if (data && data.getConsultations.data) {
      setConsultations(data.getConsultations.data);
    }
  }, [data, hcpId]);

  useEffect(() => {
    setSelectedMenu(2);
    setSelectedSubMenu(3);
    setSelectedHcpMenu(6);
    setSelectedScopedMenu(0);
    // eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu, selectedHcpMenu, selectedScopedMenu]);

  if (error) return <NoData error={error.message} />;
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
              page={page}
              paginationLabel="Patients per page"
              hasCheckbox={true}
            >
              {consultations
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
                      key={row._id}
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

                      <TableCell align="left" className={classes.tableCell}>
                        {dateMoment(row.createdAt)}
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
                              alt={`Display Photo of ${row.name}`}
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
                        style={{ color: theme.palette.common.grey, maxWidth: "20rem" }}
                      >
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
                        style={{ color: theme.palette.common.grey, maxWidth: "20rem" }}
                      >
                        {row.description}
                      </TableCell>
                      <TableCell
                        align="left"
                        className={classes.tableCell}
                        style={{ color: theme.palette.common.grey, maxWidth: "20rem" }}
                      >
                        {row.type ? row.type : "No Value"}
                      </TableCell>
                      <TableCell align="left">
                        <Button
                          variant="contained"
                          className={classes.button}
                          component={Link}
                          to={`/hcps/${hcpId}/consultations/case-notes/${row._id}`}
                          endIcon={<ArrowForwardIosIcon />}
                          onClick={() => {
                            setSelectedSubMenu(2);
                            setSelectedHcpMenu(0);
                            setSelectedScopedMenu(2);
                          }}
                        >
                          View Case Note
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
