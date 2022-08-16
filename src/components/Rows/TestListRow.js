import React from "react";
import t from "prop-types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { TableCell, TableRow, Button } from "@mui/material";

import { Loader } from "components/Utilities";
import { useStyles } from "../../styles/patientsPageStyles";

export const TestListRow = ({
  data,
  // labelId,
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
          className={` ${classes.button} ${classes.tableBtn} ${classes.warningBtn}`}
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
            className={`${classes.button} ${classes.tableBtn} ${classes.redBtn}`}
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
  data: t.object,
  labelId: t.string,
  isDeleting: t.bool,
  setEditData: t.func,
  openEditModal: t.func,
  openConfirmModal: t.func,
  setTestIdToDelete: t.func,
};
