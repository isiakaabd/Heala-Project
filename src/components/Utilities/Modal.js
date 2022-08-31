import React from "react";
import { Modal, Stack, Box, Typography, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";

const useStyles = makeStyles((theme) => ({
  closeIcon: {
    "&.MuiSvgIcon-root": {
      fontSize: "2rem",
      cursor: "pointer",

      "&:hover": {
        color: "red",
      },
    },
  },
}));

const Modals = ({
  isOpen,
  isClose,
  handleClose,
  width,
  title,
  color,
  children,
  rowSpacing,
  height,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height,
    bgcolor: "background.paper",
    borderRadius: "2rem",
  };

  const classes = useStyles();
  return (
    <Stack>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={style}
          width={{ sm: "40vw", xs: "90vw", md: "40vw" }}
          padding={{ sm: 4, xs: 3, md: 4 }}
        >
          <Grid
            container
            rowSpacing={rowSpacing ? rowSpacing : 4}
            className={classes.modal}
            flexDirection="column"
          >
            <Grid
              item
              container
              justifyContent="space-between"
              alignItems="center"
              flex="2"
            >
              <Grid item>
                <Typography variant="h3">{title}</Typography>
              </Grid>
              <Grid item>
                {!isClose ? (
                  <CloseIcon
                    color={color ? color : "secondary"}
                    className={classes.closeIcon}
                    onClick={handleClose}
                  />
                ) : null}
              </Grid>
            </Grid>
            {children}
          </Grid>
        </Box>
      </Modal>
    </Stack>
  );
};
Modals.propTypes = {
  isOpen: PropTypes.bool,
  isClose: PropTypes.bool,
  handleClose: PropTypes.func,
  children: PropTypes.node,
  title: PropTypes.string,
  color: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  rowSpacing: PropTypes.number,
};

Modals.defaultProps = {
  height: "auto",
};

export default Modals;
