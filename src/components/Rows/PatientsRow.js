import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { isSelected } from "helpers/isSelected";
import { useTheme } from "@mui/material/styles";
import { useStyles } from "styles/patientsPageStyles";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { Checkbox, Chip, TableCell, TableRow } from "@mui/material";

const PatientsRow = ({ patientData, labelId }) => {
  const history = useHistory();
  const theme = useTheme();
  const classes = useStyles();
  const { setSelectedRows } = useActions();
  const {
    _id,
    dociId,
    firstName,
    lastName,
    plan,
    provider,
    consultations,
    status,
  } = patientData;
  const { selectedRows } = useSelector((state) => state.tables);
  const isItemSelected = isSelected(_id, selectedRows);

  return (
    <TableRow
      hover
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={_id}
      selected={isItemSelected}
      sx={{ cursor: "pointer" }}
      onClick={(e) => {
        e.stopPropagation();
        history.push(`patients/${_id}`);
      }}
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
      <TableCell
        id={labelId}
        scope="row"
        align="left"
        className={classes.tableCell}
        style={{
          color: theme.palette.common.grey,
          textAlign: "left",
        }}
      >
        {dociId?.split("-")[1]}
      </TableCell>
      <TableCell align="left" className={classes.tableCell}>
        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "left",
          }}
        >
          <span style={{ fontSize: "1.25rem" }}>{`${firstName && firstName} ${
            lastName && lastName
          }`}</span>
        </div>
      </TableCell>
      <TableCell align="left" className={classes.tableCell}>
        {plan ? plan : "No Plan"}
      </TableCell>
      <TableCell align="left" className={classes.tableCell}>
        {provider ? provider : "No Provider"}
      </TableCell>
      <TableCell align="left" className={classes.tableCell}>
        {consultations ? consultations : 0}
      </TableCell>
      <TableCell align="left" className={classes.tableCell}>
        <Chip
          label={status && status === "Active" ? "Active" : "Inactive"}
          className={classes.badge}
          style={{
            background:
              status === "Active"
                ? theme.palette.common.lightGreen
                : theme.palette.common.lightRed,
            color:
              status === "Active"
                ? theme.palette.common.green
                : theme.palette.common.red,
          }}
        />
      </TableCell>
    </TableRow>
  );
};

PatientsRow.propTypes = {
  patientData: PropTypes.object.isRequired,
  labelId: PropTypes.string,
};

export default PatientsRow;
