import React from "react";
import { useTheme } from "@mui/styles";
import { makeStyles } from "@mui/styles";
import { Loader } from "components/Utilities";
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

export const HMOPlanRow = ({
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
  const { _id, name, duration, description } = plan;
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
        style={{ color: theme.palette.common.black }}
      >
        {name}
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
          {/* <div style={{ marginRight: "1rem" }}>
            <EditDelBtn
              type="edit"
              text="Edit plan"
              onHandleClick={() => handleEditOpenDialog()}
            />
          </div> */}
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
