import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import EditIcon from "components/Icons/EditIcon";
import DeleteIcon from "components/Icons/deleteIcon";

const useStyles = makeStyles(() => ({
  button: {
    "&.MuiButton-root": {
      display: "flex",
      minWidth: "30px",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F8F8F8",
      color: (stylesProps) => stylesProps.color,
      whiteSpace: "nowrap",
      borderRadius: (stylesProps) => stylesProps.borderRadius,
      padding: (stylesProps) => stylesProps.padding,

      "&:hover": {
        color: "#ffffff",
        backgroundColor: (stylesProps) => stylesProps.hoverBg,
      },
    },
  },
}));

export const EditDelBtn = ({
  onHandleClick,
  type,
  text,
  iconOnly,
  ...props
}) => {
  const theme = useTheme();
  const padding = iconOnly ? "8px 10px" : "8px 15px";
  const borderRadius = iconOnly ? "8px" : "8px";
  const color =
    type === "edit" ? theme.palette.common.blue : theme.palette.common.black;
  const hoverBg =
    type === "edit" ? theme.palette.common.blue : theme.palette.common.danger;
  const stylesProps = { color, hoverBg, padding, borderRadius };
  const classes = useStyles(stylesProps);

  return (
    <>
      {iconOnly ? (
        <Button
          {...props}
          onClick={(e) => {
            e.stopPropagation();
            onHandleClick();
          }}
          className={`${classes.button}`}
        >
          {type === "edit" ? (
            <EditIcon sx={{ height: "16px", width: "16px" }} />
          ) : (
            <DeleteIcon />
          )}
        </Button>
      ) : (
        <Button
          {...props}
          onClick={(e) => {
            e.stopPropagation();
            onHandleClick();
          }}
          className={`${classes.button}`}
          endIcon={
            type === "edit" ? (
              <EditIcon sx={{ height: "16px", width: "16px" }} />
            ) : (
              <DeleteIcon />
            )
          }
        >
          {text}
        </Button>
      )}
    </>
  );
};

EditDelBtn.propTypes = {
  onHandleClick: PropTypes.func,
  type: PropTypes.oneOf(["edit", "delete"]).isRequired,
  text: PropTypes.string,
  iconOnly: PropTypes.bool,
};
