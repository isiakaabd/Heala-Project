import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import EnhancedTable from "components/layouts/EnhancedTable";
import { medicationsHeadCells } from "components/Utilities/tableHeaders";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { isSelected } from "helpers/isSelected";
import { handleSelectedRows } from "helpers/selectedRows";
import { medicationsRows } from "components/Utilities/tableData";
import PreviousButton from "components/Utilities/PreviousButton";
import displayPhoto from "assets/images/avatar.png";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { getMedication } from "components/graphQL/useQuery";

const useStyles = makeStyles((theme) => ({
  tableCell: {
    "&.MuiTableCell-root": {
      fontSize: "1.25rem",
    },
  },
}));

const Medications = (props) => {
  const {
    selectedMenu,
    selectedSubMenu,
    selectedPatientMenu,
    setSelectedMenu,
    setSelectedSubMenu,
    setSelectedPatientMenu,
  } = props;
  const classes = useStyles();
  const theme = useTheme();

  const { patientId } = useParams();

  const { page, rowsPerPage, selectedRows } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();
  const { loading, data } = useQuery(getMedication, {
    variables: {
      id: patientId,
    },
  });

  console.log(data);

  useEffect(() => {
    setSelectedMenu(1);
    setSelectedSubMenu(2);
    setSelectedPatientMenu(6);

    // eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu, selectedPatientMenu]);
  if (loading) return <div>Loading</div>;
  return (
    <Grid container direction="column">
      <Grid item style={{ marginBottom: "3rem" }}>
        <PreviousButton path={`/patients/${patientId}`} onClick={() => setSelectedPatientMenu(0)} />
      </Grid>
      <Grid item style={{ marginBottom: "5rem" }}>
        <Typography variant="h2">Medications</Typography>
      </Grid>
      <Grid item container>
        <EnhancedTable
          headCells={medicationsHeadCells}
          rows={medicationsRows}
          page={page}
          paginationLabel="List per page"
          hasCheckbox={true}
        >
          {medicationsRows
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
                    align="center"
                    className={classes.tableCell}
                    style={{ color: theme.palette.common.grey }}
                  >
                    {row.date}
                  </TableCell>
                  <TableCell
                    align="center"
                    className={classes.tableCell}
                    style={{ maxWidth: "20rem" }}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell
                    align="center"
                    className={classes.tableCell}
                    style={{ maxWidth: "20rem" }}
                  >
                    {row.prescription}
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
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span style={{ marginRight: "1rem" }}>
                        <Avatar
                          alt={`Display Photo of ${row.caregiver}`}
                          src={displayPhoto}
                          sx={{ width: 24, height: 24 }}
                        />
                      </span>
                      <span style={{ fontSize: "1.25rem" }}>{row.caregiver}</span>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
        </EnhancedTable>
      </Grid>
    </Grid>
  );
};

Medications.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  selectedPatientMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
  setSelectedPatientMenu: PropTypes.func.isRequired,
};

export default Medications;
