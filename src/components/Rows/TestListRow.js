import React from "react";
import t from "prop-types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { TableCell, TableRow, Button } from "@mui/material";

import { Loader } from "../Utilities";
import { useStyles } from "../../styles/patientsPageStyles";

export const TestListRow = ({
  data,
  labelId,
  isDeleting,
  setEditData,
  openEditModal,
  openConfirmModal,
  setTestIdToDelete,
}) => {
  const classes = useStyles();
  const { _id, name, price, tat } = data;

  return (
    <TableRow
      hover
      role="checkbox"
      /* aria-checked={isItemSelected} */
      tabIndex={-1}
      /* selected={isItemSelected} */
    >
      <TableCell align="left" className={classes.tableCell}>
        {name && name}
      </TableCell>
      <TableCell align="left" className={classes.tableCell}>
        {price && price}
      </TableCell>
      <TableCell align="left" className={classes.tableCell}>
        {tat && tat}
      </TableCell>
      <TableCell align="center" className={classes.tableCell}>
        <Button
          variant="contained"
          disableRipple
          className={`${classes.tableBtn} ${classes.warningBtn}`}
          endIcon={<EditIcon color="error" />}
          onClick={() => {
            setEditData(data);
            openEditModal();
          }}
        >
          Edit
        </Button>
      </TableCell>
      <TableCell align="center" className={classes.tableCell}>
        {isDeleting ? (
          <Loader />
        ) : (
          <Button
            variant="contained"
            disableRipple
            className={`${classes.tableBtn} ${classes.redBtn}`}
            endIcon={<DeleteIcon color="error" />}
            onClick={() => {
              setTestIdToDelete(_id);
              openConfirmModal();
            }}
          >
            Delete
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

TestListRow.propTypes = {
  /* isItemSelected: t.bool.isRequired,
  _id: t.string.isRequired,
  handleSelectedRows: t.func,
  selectedRows: t.any,
  setSelectedRows: t.func, */
  /* testName: t.string,
  price: t.string,
  tat: t.string, */
  labelId: t.string,
  isDeleting: t.bool.isRequired,
  setEditData: t.func.isRequired,
  openEditModal: t.func.isRequired,
  openConfirmModal: t.func.isRequired,
  setTestIdToDelete: t.func.isRequired,
};
