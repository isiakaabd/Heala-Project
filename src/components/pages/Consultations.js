import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import { useParams } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { Loader } from "components/Utilities";
import { useTheme } from "@mui/material/styles";
import { isSelected } from "helpers/isSelected";
import { dateMoment } from "components/Utilities/Time";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { getConsultations } from "components/graphQL/useQuery";
import { Grid, TableRow, TableCell, Checkbox } from "@mui/material";
import { EnhancedTable, NoData, EmptyTable } from "components/layouts";
import { consultationsHeadCells4 } from "components/Utilities/tableHeaders";
import {
  changeTableLimit,
  handlePageChange,
} from "helpers/filterHelperFunctions";
import TableLayout from "components/layouts/TableLayout";

const useStyles = makeStyles((theme) => ({
  tableCell: {
    "&.MuiTableCell-root": {
      color: "rgb(0 0 0)",
      fontWeight: 400,
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

const Consultations = () => {
  const history = useHistory();
  const [pageInfo, setPageInfo] = useState({});
  const classes = useStyles();
  const theme = useTheme();
  const { patientConsultation } = useActions();
  const { selectedRows } = useSelector((state) => state.tables);
  const [consultations, setConsultations] = useState([]);
  const { setSelectedRows } = useActions();
  const { patientId } = useParams();

  const [fetchConsultations, { loading, data, error }] =
    useLazyQuery(getConsultations);

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

  if (loading) return <Loader />;
  if (error) return <NoData error={error.message} />;

  return (
    <Grid container gap={2} flexWrap="nowrap" direction="column" height="100%">
      <Grid
        item
        container
        flexWrap="nowrap"
        justifyContent="space-between"
        alignItems="center"
        sx={{ margin: "1rem 0rem" }}
      ></Grid>
      <TableLayout>
        {consultations.length > 0 ? (
          <Grid item container direction="column" height="100%">
            <EnhancedTable
              headCells={consultationsHeadCells4}
              rows={consultations}
              paginationLabel="Patients per page"
              hasCheckbox={true}
              sx={{ cursor: "pointer" }}
              changeLimit={async (e) => {
                await changeTableLimit(fetchConsultations, {
                  first: e,
                  id: patientId,
                });
              }}
              dataPageInfo={pageInfo}
              handlePagination={async (page) => {
                await handlePageChange(fetchConsultations, page, pageInfo, {
                  id: patientId,
                });
              }}
            >
              {consultations.map((row, index) => {
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
                    sx={{ cursor: "pointer" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      history.push(
                        `/patients/${patientId}/consultations/case-notes/${row._id}`
                      );
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        onClick={() =>
                          handleSelectedRows(
                            row._id,
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
                          ? row.symptoms.map((symptom, index) => {
                              const isLast = index === row.symptoms.length - 1;
                              return (
                                <p key={symptom.name}>
                                  {isLast
                                    ? `${symptom.name}.`
                                    : `${symptom.name},`}
                                </p>
                              );
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
                  </TableRow>
                );
              })}
            </EnhancedTable>
          </Grid>
        ) : (
          <EmptyTable
            headCells={consultationsHeadCells4}
            paginationLabel="Patients per page"
          />
        )}
      </TableLayout>
    </Grid>
  );
};

export default Consultations;
