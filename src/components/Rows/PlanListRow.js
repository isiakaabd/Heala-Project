import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/styles";
import { makeStyles } from "@mui/styles";
import { Loader } from "components/Utilities";
import { formatNumber } from "components/Utilities/Time";
import { EditDelBtn } from "components/Buttons/EditDelBtn";
import { Checkbox, TableCell, TableRow } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  FormLabel: {
    "&.MuiFormLabel-root": {
      ...theme.typography.FormLabel,
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
      maxWidth: "15rem",

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
        marginTop: "-.2rem",
      },
    },
  },
  btn: {
    "&.MuiButton-root": {
      ...theme.typography.btn,
      width: "100%",
    },
  },
  closeIcon: {
    "&.MuiSvgIcon-root": {
      fontSize: "2rem ",
      cursor: "pointer",

      "&:hover": {
        color: theme.palette.common.red,
      },
    },
  },
  tableBtn: {
    "&.MuiButton-root": {
      ...theme.typography.btn,
      height: "3rem",
      fontSize: "1.25rem",
      borderRadius: "2rem",
      boxShadow: "none",
      width: "12rem",

      "&:hover": {
        "& .MuiButton-endIcon>*:nth-of-type(1)": {
          color: "#fff",
        },
      },

      "&:active": {
        boxShadow: "none",
      },

      "& .MuiButton-endIcon>*:nth-of-type(1)": {
        fontSize: "1.5rem",
      },
    },
  },

  redBtn: {
    "&.MuiButton-root": {
      background: theme.palette.common.lightRed,
      color: theme.palette.common.red,

      "&:hover": {
        background: theme.palette.error.light,
        color: "#fff",
      },
    },
  },

  greenBtn: {
    "&.MuiButton-root": {
      background: theme.palette.common.lightGreen,
      color: theme.palette.common.green,

      "&:hover": {
        background: theme.palette.success.light,
        color: "#fff",
      },
    },
  },
  tableCell: {
    "&.MuiTableCell-root": {
      fontSize: "1.25rem",
    },
  },

  badge: {
    "&.MuiChip-root": {
      fontSize: "1.6rem !important",
      height: "3rem",
      borderRadius: "1.3rem",
    },
    modal: {
      background: "red !important",
      "& > * ": {
        padding: "2rem 1rem",
      },
    },
    ".MuiGrid-root": {
      background: "red",
    },
  },
}));

export const PlanListRow = ({
  plan,
  isItemSelected,
  handleSelectedRows,
  selectedRows,
  setSelectedRows,
  labelId,
  handleDeleteOpenDialog,
  handleEditOpenDialog,
  deleting,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const { _id, name, amount, duration, description } = plan;
  return (
    <TableRow
      hover
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={_id}
      selected={isItemSelected}
      sx={{ cursor: "pointer" }}
      onClick={() => handleEditOpenDialog()}
    >
      <TableCell
        id={labelId}
        scope="row"
        align="left"
        className={classes.tableCell}
        style={{ color: theme.palette.common.black }}
      >
        {name}
      </TableCell>
      <TableCell
        id={labelId}
        scope="row"
        align="left"
        className={classes.tableCell}
        style={{ color: theme.palette.common.red }}
      >
        {formatNumber(amount)}
      </TableCell>

      <TableCell
        align="left"
        className={classes.tableCell}
        style={{
          color: theme.palette.common.black,
          maxWidth: "20rem",
        }}
      >
        {description}
      </TableCell>
      <TableCell
        align="left"
        className={classes.tableCell}
        style={{
          color: theme.palette.common.black,
          maxWidth: "20rem",
        }}
      >
        {duration}
      </TableCell>

      <TableCell align="left" className={classes.tableCell}>
        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          {deleting ? (
            <Loader />
          ) : (
            <EditDelBtn
              type="delete"
              text="Delete plan"
              onHandleClick={() => handleDeleteOpenDialog()}
            />
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

PlanListRow.propTypes = {
  plan: PropTypes.object,
  isItemSelected: PropTypes.bool,
  handleSelectedRows: PropTypes.func,
  selectedRows: PropTypes.array,
  setSelectedRows: PropTypes.func,
  labelId: PropTypes.string,
  handleDeleteOpenDialog: PropTypes.func,
  handleEditOpenDialog: PropTypes.func,
  deleting: PropTypes.bool,
};
