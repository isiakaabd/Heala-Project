import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: "capitalize",
    fontFamily: "Circular Std",
    fontSize: "1.6rem",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "2.4rem",
    letterSpacing: "0px",
    textAlign: "left",
    height: "100%",
  },
}));

const IconLabelButtons = ({
  placeholder,
  width,
  backgroundColor,
  type,
  border,
  height,
  endIcon,
}) => {
  const classes = useStyles();
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        width,
        // height: "100%",
      }}
    >
      <Button
        sx={{ width, backgroundColor, borderRadius: border, height }}
        variant="contained"
        className={classes.button}
        endIcon={endIcon}
      >
        {placeholder}
      </Button>
    </Stack>
  );
};

IconLabelButtons.propTypes = {
  width: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  border: PropTypes.string,
  height: PropTypes.string,
  endIcon: PropTypes.node,
};

export default IconLabelButtons;
