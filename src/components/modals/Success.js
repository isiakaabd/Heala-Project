import React from "react";
import PropTypes from "prop-types";
import { Typography, Grid } from "@mui/material";
import { Modals, CustomButton } from "components/Utilities";
import { useTheme } from "@mui/material/styles";
import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";
import CancelIcon from "@mui/icons-material/Cancel";

const Success = ({
  open,
  handleDialogClose,
  title,
  confirmationMsg,
  btnValue,
  onConfirm,
  onCancel,
  type,
  ...rest
}) => {
  const theme = useTheme();

  const disableButton = {
    background: theme.palette.primary.main,
    hover: theme.palette.primary.light,
    active: theme.palette.primary.dark,
  };

  return (
    <Modals
      isOpen={open}
      title=""
      isClose
      rowSpacing={5}
      handleClose={handleDialogClose}
    >
      <Grid item container direction="column" rowSpacing={5} marginTop={2}>
        <Grid item container justifyContent="center">
          {type !== "fail" ? (
            <CheckCircleSharpIcon sx={{ fontSize: "15rem", color: "green" }} />
          ) : (
            <CancelIcon sx={{ fontSize: "15rem", color: "red" }} />
          )}
        </Grid>
        <Grid item container justifyContent="center">
          <Typography variant="h2">{title}</Typography>
        </Grid>
        <Grid item container justifyContent="center">
          <Typography variant="body1">{confirmationMsg}</Typography>
        </Grid>
        <Grid item container marginTop={4}>
          <CustomButton
            title={btnValue}
            type={disableButton}
            width="100%"
            onClick={handleDialogClose}
          />
        </Grid>
      </Grid>
    </Modals>
  );
};

Success.propTypes = {
  open: PropTypes.bool,
  handleDialogClose: PropTypes.func,
  title: PropTypes.string,
  confirmationMsg: PropTypes.string,
  btnValue: PropTypes.string,
  type: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Success;
