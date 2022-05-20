import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Typography,
  TableRow,
  Checkbox,
  TableCell,
  Button,
} from "@mui/material";
import { NoData, EmptyTable, EnhancedTable } from "components/layouts";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { hcpPatientsHeadCells } from "components/Utilities/tableHeaders";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { isSelected } from "helpers/isSelected";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { Link, useParams } from "react-router-dom";
import { handleSelectedRows } from "helpers/selectedRows";
import { PreviousButton, Loader } from "components/Utilities";
import { getDoctorPatients } from "components/graphQL/useQuery";
import { useLazyQuery } from "@apollo/client";
import { changeTableLimit } from "helpers/filterHelperFunctions";

const useStyles = makeStyles((theme) => ({
  tableCell: {
    "&.MuiTableCell-root": {
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
      whitespace: "nowrap",
      maxWidth: "15rem",
      width: "100%",

      "&:hover": {
        background: "#fcfcfc",
      },

      "&:active": {
        background: "#fafafa",
      },

      "& .MuiButton-endIcon>*:nth-of-type(1)": {
        fontSize: "1.2rem",
      },
    },
  },
}));

const HcpPatients = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [pageInfo, setPageInfo] = useState([]);
  const {
    selectedMenu,
    setSelectedMenu,
    /* selectedSubMenu,
    selectedHcpMenu,
    setSelectedSubMenu,
    setSelectedHcpMenu, */
  } = props;

  const { hcpId } = useParams();

  const { setSelectedRows } = useActions();
  const { selectedRows } = useSelector((state) => state.tables);

  useEffect(() => {
    setSelectedMenu(2);
    /* setSelectedSubMenu(3);
    setSelectedHcpMenu(5); */

    // eslint-disable-next-line
  }, [selectedMenu /* selectedSubMenu, selectedHcpMenu */]);

  const [fetchDoctorsPatients, { loading, error, data, refetch }] =
    useLazyQuery(getDoctorPatients);

  React.useEffect(() => {
    fetchDoctorsPatients({
      variables: { id: hcpId },
      notifyOnNetworkStatusChange: true,
    });
  }, [fetchDoctorsPatients, hcpId]);

  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    if (data) {
      setProfiles(data.getDoctorPatients.data);
      setPageInfo(data.getDoctorPatients.pageInfo);
    }
  }, [data]);
  const fetchMoreFunc = (e, newPage) => {
    refetch({ page: newPage });
  };

  if (loading) return <Loader />;
  if (error) return <NoData error={error} />;
  return (
    <Grid container direction="column" gap={2} flexWrap="nowrap" height="100%">
      <Grid item>
        <PreviousButton
          path={`/hcps/${hcpId}`} /* onClick={() => setSelectedHcpMenu(0)} */
        />
      </Grid>
      <Grid item>
        <Typography variant="h2">Doctor Patients</Typography>
      </Grid>
      {profiles.length > 0 ? (
        <Grid item container direction="column" height="100%">
          <EnhancedTable
            headCells={hcpPatientsHeadCells}
            rows={profiles}
            paginationLabel="List Per Page"
            handleChangePage={fetchMoreFunc}
            hasCheckbox={true}
            changeLimit={changeTableLimit}
            fetchData={fetchDoctorsPatients}
            dataPageInfo={pageInfo}
          >
            {profiles

              // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                        onClick={() =>
                          handleSelectedRows(
                            row.id,
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
                      style={{ color: theme.palette.common.grey }}
                    >
                      {row.doctor}
                    </TableCell>
                    <TableCell align="left" className={classes.tableCell}>
                      {row.patient}
                      {/* <div
                          style={{
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            textAlign: "left",
                          }}
                        >
                          <span style={{ marginRight: "1rem" }}>
                            <Avatar
                              alt="Remy Sharp"
                              src={row.image}
                              sx={{ width: 24, height: 24 }}
                            />
                          </span>
                          <span style={{ fontSize: "1.25rem" }}>
                            {row.firstName}
                            {row.lastName}
                          </span>
                        </div> */}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        className={classes.button}
                        component={Link}
                        to={`/hcps/${hcpId}/profile`}
                        endIcon={<ArrowForwardIosIcon />}
                      >
                        View Doctor Profile
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </EnhancedTable>
        </Grid>
      ) : (
        <EmptyTable
          headCells={hcpPatientsHeadCells}
          paginationLabel="List  per page"
        />
      )}
    </Grid>
  );
};

HcpPatients.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  /* selectedSubMenu: PropTypes.number.isRequired,
  selectedHcpMenu: PropTypes.number.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
  setSelectedHcpMenu: PropTypes.func.isRequired, */
};

export default HcpPatients;
