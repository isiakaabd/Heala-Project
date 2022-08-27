import React from "react";
import t from "prop-types";
import { TableCell, TableRow } from "@mui/material";

import { Loader } from "components/Utilities";
import { useStyles } from "../../styles/patientsPageStyles";
import { EditDelBtn } from "components/Buttons/EditDelBtn";

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
        <EditDelBtn
          onHandleClick={() => {
            setEditData(data);
            openEditModal();
          }}
          text="Edit"
          type="edit"
        />
      </TableCell>
      <TableCell align="center" className={classes.tableCell}>
        {isDeleting ? (
          <Loader />
        ) : (
          <EditDelBtn
            onHandleClick={() => {
              setTestIdToDelete(_id);
              openConfirmModal();
            }}
            text="Delete"
            type="delete"
          />
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
