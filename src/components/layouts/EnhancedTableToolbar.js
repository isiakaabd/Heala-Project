import React from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  delete: {
    color: theme.palette.common.red,
  },
}));

const EnhancedTableToolbar = ({ numSelected, title }) => {
  const classes = useStyles();

  return (
    <Toolbar
      //   className={classes.tableToolbar}
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        minHeight: "4.8rem !important",
        background: "rgb(245, 245, 245)",
        display: title || numSelected > 0 ? "flex" : "none",
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: "1 1 100%" }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: "1 1 100%" }} variant="h6" id="tableTitle" component="div">
          {title}
        </Typography>
      )}

      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon className={classes.delete} />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  title: PropTypes.string,
};

export default EnhancedTableToolbar;
