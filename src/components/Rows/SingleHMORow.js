import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { formatDate } from "helpers/func";
import { Loader } from "components/Utilities";
import { useTheme } from "@mui/material/styles";
import EditIcon from "components/Icons/EditIcon";
import { useStyles } from "styles/hmoPageStyles";
import DeleteIcon from "components/Icons/deleteIcon";
import StatusPill from "components/Utilities/StatusPill";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  ClickAwayListener,
  Grid,
  Paper,
  TableCell,
  TableRow,
} from "@mui/material";

const useEditStyles = makeStyles((theme) => ({
  btn: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
  },

  options: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    position: "absolute",
    top: 28,
    right: 0,
    zIndex: 20,

    "&>button": {
      display: "flex",
      alignItems: "center",
      padding: "1rem 2rem",
      fontSize: "14px",
      fontWeight: 400,
      color: "#2D2F39",
      borderBottom: "1px solid #E5E5E5",
      textAlign: "left",
      whiteSpace: "nowrap",

      "&:hover": {
        color: "#ffffff",
      },
    },

    "&>:last-child": {
      borderBottom: "none",
    },
  },

  editBtn: {
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
  },

  delBtn: {
    borderRadius: "0px 0px 8px 8px",
    "&:hover": {
      backgroundColor: theme.palette.common.danger,
    },
  },
}));

const SingleHMORow = ({
  index,
  rowData,
  setEditData,
  isDeleting,
  setEnrolleeIdToDelete,
  openEditModal,
  openConfirmModal,
  openProfileDetailsModal,
}) => {
  const theme = useTheme();
  const classes = useStyles();
  const editClasses = useEditStyles();
  const [open, setOpen] = useState(false);

  const handleClickAway = () => {
    setOpen(false);
  };

  const {
    _id,
    hmoId,
    firstName,
    lastName,
    noc,
    plan,
    expiryDate,
    status,
    planId,
    email,
    phone,
  } = rowData;
  const editEnrolleeData = {
    id: _id,
    hmoId: hmoId || "",
    firstName: firstName || "",
    lastName: lastName || "",
    noc: noc || "",
    plan: plan || "",
    planId: planId || "",
    expiryDate: expiryDate || "",
    email: email || "",
    phone: phone || "",
  };
  const labelId = `enhanced-table-checkbox-${index}`;
  return (
    <TableRow
      hover
      role="checkbox"
      sx={{ position: "relative", cursor: "pointer" }}
      tabIndex={-1}
      key={hmoId}
      onClick={() => {
        openProfileDetailsModal();
      }}
    >
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
        {hmoId}
      </TableCell>
      <TableCell align="left" className={classes.tableCell}>
        {`${firstName && firstName} ${lastName && lastName}`}
      </TableCell>
      <TableCell align="left" className={classes.tableCell}>
        {noc ? noc : 0}
      </TableCell>
      <TableCell align="left" className={classes.tableCell}>
        {plan ? plan : "No Plan"}
      </TableCell>
      <TableCell align="left" className={classes.tableCell}>
        {expiryDate ? formatDate(expiryDate, "P") : "Nil"}
      </TableCell>
      <TableCell align="left" className={classes.tableCell}>
        <StatusPill
          type={status === true ? "success" : "normal"}
          label={status === true ? "VERIFIED" : "INACTIVE"}
        />
      </TableCell>
      <TableCell
        align="left"
        sx={{ position: "relative" }}
        className={classes.tableCell}
      >
        <Grid container>
          <ClickAwayListener
            onClickAway={() => {
              handleClickAway();
            }}
          >
            {isDeleting ? (
              <Loader />
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(!open);
                }}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  backgroundColor: "transparent",
                  border: "none",
                }}
              >
                <MoreHorizIcon fontSize="large" />
              </button>
            )}
          </ClickAwayListener>
        </Grid>
      </TableCell>
      {open ? (
        <Paper className={editClasses.options} elavation={4}>
          <button
            className={`${editClasses.btn} ${editClasses.editBtn}`}
            style={{ borderRadius: "8px 8px 0px 0px" }}
            onClick={(e) => {
              e.stopPropagation();
              openProfileDetailsModal();
            }}
          >
            View profile
          </button>
          <button
            className={`${editClasses.btn} ${editClasses.editBtn}`}
            onClick={(e) => {
              e.stopPropagation();
              setEditData(editEnrolleeData);
              openEditModal();
            }}
          >
            Edit <EditIcon sx={{ marginLeft: "0.7rem" }} />
          </button>
          <button
            className={`${editClasses.btn} ${editClasses.delBtn}`}
            onClick={(e) => {
              e.stopPropagation();
              setEnrolleeIdToDelete();
              openConfirmModal();
            }}
          >
            Delete <DeleteIcon sx={{ marginLeft: "0.7rem" }} />
          </button>
        </Paper>
      ) : null}
    </TableRow>
  );
};

SingleHMORow.propTypes = {
  index: PropTypes.number.isRequired,
  rowData: PropTypes.object.isRequired,
  openProfileDetailsModal: PropTypes.func.isRequired,
  setEditData: PropTypes.func.isRequired,
  isDeleting: PropTypes.bool.isRequired,
  setEnrolleeIdToDelete: PropTypes.func.isRequired,
  openEditModal: PropTypes.func.isRequired,
  openConfirmModal: PropTypes.func.isRequired,
};

export default SingleHMORow;
