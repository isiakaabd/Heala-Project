import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import EnhancedTable from "components/layouts/EnhancedTable";
import { prescriptionsHeadCells } from "components/Utilities/tableHeaders";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { isSelected } from "helpers/isSelected";
import { handleSelectedRows } from "helpers/selectedRows";
import { prescriptionsRows } from "components/Utilities/tableData";
import PreviousButton from "components/Utilities/PreviousButton";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  tableCell: {
    "&.MuiTableCell-root": {
      fontSize: "1.25rem",
    },
  },
}));

const Prescriptions = ({ selectedMenu, selectedSubMenu, setSelectedMenu, setSelectedSubMenu }) => {
  const classes = useStyles();
  const theme = useTheme();

  const { patientId } = useParams();

  const { page, rowsPerPage, selectedRows } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();

  useEffect(() => {
    setSelectedMenu(1);
    setSelectedSubMenu(2);
    // eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu]);

  return (
    <Grid container direction="column">
      <Grid item style={{ marginBottom: "3rem" }}>
        <PreviousButton path={`/patients/${patientId}`} />
      </Grid>
      <Grid item style={{ marginBottom: "5rem" }}>
        <Typography variant="h2">Prescriptions</Typography>
      </Grid>
      <Grid item container>
        <EnhancedTable
          headCells={prescriptionsHeadCells}
          rows={prescriptionsRows}
          page={page}
          paginationLabel="List per page"
          hasCheckbox={true}
        >
          {prescriptionsRows
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
                    {row.details}
                  </TableCell>
                  <TableCell align="center" className={classes.tableCell}>
                    {row.dosage}
                  </TableCell>
                </TableRow>
              );
            })}
        </EnhancedTable>
      </Grid>
    </Grid>
  );
};

Prescriptions.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
};

export default Prescriptions;
