import React, { useEffect, useState } from "react";
import { Grid, Checkbox, TableCell, TableRow, Typography } from "@mui/material";
import { EnhancedTable, EmptyTable, NoData } from "components/layouts";
import { medicationsHeadCells } from "components/Utilities/tableHeaders";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { isSelected } from "helpers/isSelected";
import { handleSelectedRows } from "helpers/selectedRows";
import { Loader } from "components/Utilities";
import { useParams } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { myMedic } from "components/graphQL/useQuery";
import { dateMoment } from "components/Utilities/Time";
import { changeTableLimit, fetchMoreData } from "helpers/filterHelperFunctions";

const useStyles = makeStyles((theme) => ({
  tableCell: {
    "&.MuiTableCell-root": {
      fontSize: "1.25rem",
    },
  },
}));

const Medications = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [pageInfo, setPageInfo] = useState([]);
  const { patientId } = useParams();

  const { selectedRows } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();
  const [medications, setMedications] = useState([]);

  const [fetchMedications, { loading, error, data }] = useLazyQuery(myMedic);

  useEffect(() => {
    fetchMedications({
      variables: {
        id: patientId,
        orderBy: "-createdAt",
      },
      notifyOnNetworkStatusChange: true,
    });
  }, [fetchMedications, patientId]);

  useEffect(() => {
    if (data) {
      setMedications(data.getMedications.medication);
      setPageInfo(data.getMedications.pageInfo);
    }
  }, [data]);

  if (loading) return <Loader />;
  if (error) return <NoData error={error} />;

  return (
    <Grid container direction="column" gap={2} flexWrap="nowrap" height="100%">
      <Grid item container height="100%" direction="column" gap={2}>
        <Grid item>
          <Typography variant="h2">Medications</Typography>
        </Grid>
        {medications.length > 0 ? (
          <Grid item container height="100%" direction="column">
            <EnhancedTable
              headCells={medicationsHeadCells}
              rows={medications}
              paginationLabel="Medication per page"
              handleChangePage={fetchMoreData}
              hasCheckbox={true}
              changeLimit={changeTableLimit}
              fetchData={fetchMedications}
              dataPageInfo={pageInfo}
            >
              {medications
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
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
                        {dateMoment(row.createdAt)}
                      </TableCell>
                      <TableCell
                        align="left"
                        className={classes.tableCell}
                        style={{ maxWidth: "20rem" }}
                      >
                        {row.name}
                      </TableCell>
                      <TableCell
                        align="left"
                        className={classes.tableCell}
                        style={{ maxWidth: "20rem" }}
                      >
                        {row.dosage ? row.dosage : "No Value"}
                      </TableCell>
                      <TableCell
                        align="left"
                        className={classes.tableCell}
                        style={{ maxWidth: "20rem" }}
                      >
                        {row.interval ? row.interval : "No Value"}
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
                            justifyContent: "left",
                          }}
                        >
                          <span style={{ fontSize: "1.25rem" }}>{row.doctor}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </EnhancedTable>
          </Grid>
        ) : (
          <EmptyTable headCells={medicationsHeadCells} paginationLabel="Medications per page" />
        )}
      </Grid>
    </Grid>
  );
};

export default Medications;
