import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Typography, Grid, TableRow, TableCell, Checkbox } from "@mui/material";
import EnhancedTable from "components/layouts/EnhancedTable";
import NoData from "components/layouts/NoData";
import { dateMoment } from "components/Utilities/Time";
import { prescriptionsHeadCells } from "components/Utilities/tableHeaders";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { isSelected } from "helpers/isSelected";
import { handleSelectedRows } from "helpers/selectedRows";
import PreviousButton from "components/Utilities/PreviousButton";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { getConsultations } from "components/graphQL/useQuery";
import Loader from "components/Utilities/Loader";

const useStyles = makeStyles((theme) => ({
  tableCell: {
    "&.MuiTableCell-root": {
      fontSize: "1.25rem",
    },
  },
}));

const Prescriptions = (props) => {
  const {
    selectedMenu,
    selectedSubMenu,
    setSelectedMenu,
    setSelectedSubMenu,
    selectedPatientMenu,
    setSelectedPatientMenu,
  } = props;
  const classes = useStyles();
  const theme = useTheme();

  const { patientId } = useParams();

  const { page, rowsPerPage, selectedRows } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();

  useEffect(() => {
    setSelectedMenu(1);
    setSelectedSubMenu(2);
    setSelectedPatientMenu(3);
    // eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu, selectedPatientMenu]);

  const { loading, error, data } = useQuery(getConsultations, {
    variables: {
      id: patientId,
      orderBy: "-createdAt",
    },
  });

  const [consultations, setConsultations] = useState([]);
  useEffect(() => {
    if (data && data.getConsultations.data) {
      setConsultations(data.getConsultations.data);
    }
  }, [data, consultations]);

  if (loading) return <Loader />;
  if (error) return <NoData error={error.message} />;
  return (
    <Grid container direction="column" flexWrap="nowrap" height="100%" gap={2}>
      <Grid item>
        <PreviousButton path={`/patients/${patientId}`} onClick={() => setSelectedPatientMenu(0)} />
      </Grid>
      <Grid item>
        <Typography variant="h2">Prescriptions</Typography>
      </Grid>
      {consultations.length > 0 ? (
        <Grid item container height="100%">
          <EnhancedTable
            headCells={prescriptionsHeadCells}
            rows={consultations}
            page={page}
            paginationLabel="List per page"
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
                    <TableCell
                      align="left"
                      className={classes.tableCell}
                      style={{ color: theme.palette.common.grey }}
                    >
                      {dateMoment(row.updatedAt)}
                    </TableCell>
                    <TableCell
                      align="left"
                      className={classes.tableCell}
                      style={{ maxWidth: "20rem" }}
                    >
                      {row.description ? row.description : "No Value"}
                    </TableCell>
                    <TableCell align="left" className={classes.tableCell}>
                      {row.treatment.dosage}
                    </TableCell>
                  </TableRow>
                );
              })}
          </EnhancedTable>
        </Grid>
      ) : (
        <NoData />
      )}
    </Grid>
  );
};

Prescriptions.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  selectedPatientMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
  setSelectedPatientMenu: PropTypes.func.isRequired,
};

export default Prescriptions;
