import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import {
  Grid,
  Modal,
  Fade,
  Typography,
  Box,
  Backdrop,
  Avatar,
  Chip,
} from "@mui/material";
import SmsIcon from "components/Icons/SmsIcon";
import CallIcon from "components/Icons/CallIcon";
import Calender2 from "components/Icons/Calender2";
import { formatDate, getInitials } from "helpers/func";
import VerifiedIcon from "components/Icons/VerifiedIcon";
import MessageAddIcon from "components/Icons/MessageAddIcon";

const useStyles = makeStyles((theme) => ({
  closeIcon: {
    "&.MuiSvgIcon-root": {
      cursor: "pointer",

      "&:hover": {
        cursor: "pointer",
        color: theme.palette.common.danger,
      },
    },
  },

  badge: {
    "&.MuiChip-root": {
      fontSize: "12px !important",
      height: "2.7rem",
      borderRadius: "1.3rem",
      fontWeight: 500,
    },
  },
}));

const PlanPill = ({ name, color, bgColor }) => {
  const classes = useStyles();

  return (
    <Chip
      label={name}
      className={classes.badge}
      icon={
        <VerifiedIcon sx={{ fontSize: "20px", color: "#F79B01 !important" }} />
      }
      sx={{
        backgroundColor: bgColor,
        color: color,
      }}
    />
  );
};

PlanPill.propTypes = {
  color: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const Info = ({ text, icon, header }) => {
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      sx={{ width: "100%", marginBottom: "2rem" }}
    >
      <Grid item>
        <Grid container alignItems="center">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "100%",
              backgroundColor: "#F8F8F8",
              padding: "0.5rem",
              marginRight: "1rem",
            }}
          >
            {icon}
          </Box>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "16.94px",
              color: "#656565",
            }}
          >
            {header}
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Typography>{text}</Typography>
      </Grid>
    </Grid>
  );
};

Info.propTypes = {
  text: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};

const EnrolleeProfileModal = ({ isOpen, setIsOpen, profileData, ...rest }) => {
  const classes = useStyles();
  const {
    photo,
    hmoId,
    noc,
    phone,
    plan,
    expiryDate,
    firstName,
    lastName,
    email,
  } = profileData;

  const padding = { sm: 2, xs: 2, md: "2rem 4rem" };

  const style = {
    height: "auto",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "1rem",
    overflowY: "auto",
    paddingBottom: "2rem",
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={() => setIsOpen(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      {...rest}
    >
      <Fade in={isOpen}>
        <Box
          sx={style}
          width={{ md: "70vw", sm: "90vw", lg: "35vw", xs: "35vw" }}
        >
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              container
              item
              justifyContent="space-between"
              alignItems="center"
              padding={padding}
              sx={{ borderBottom: "1px solid rgba(229, 229, 229, 0.5)" }}
            >
              <Grid item>
                <Typography
                  sx={{ fontSize: "16px", color: "#292D32", fontWeight: 500 }}
                >
                  Profile Details
                </Typography>
              </Grid>
              <Grid item sx={{ display: "flex", alignItems: "center" }}>
                <CloseIcon
                  color="primary"
                  fontSize="large"
                  className={classes.closeIcon}
                  onClick={() => setIsOpen(false)}
                />
              </Grid>
            </Grid>
            <Grid item sx={{ width: "100%" }}>
              <Grid
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  margin: "2rem 4rem",
                  paddingBottom: "2rem",
                  borderBottom: "1px solid rgba(229, 229, 229, 0.5)",
                }}
              >
                <Avatar
                  src={photo}
                  alt={`${firstName} ${lastName}`}
                  sx={{ width: "60px", height: "60px" }}
                >
                  <Typography fontSize={24}>
                    {getInitials(`${firstName} ${lastName}`)}
                  </Typography>
                </Avatar>
                <div style={{ margin: "1rem 0rem" }}>
                  <PlanPill
                    name={plan}
                    color="#F79B01"
                    bgColor="rgba(247, 155, 1, 0.07)"
                  />
                </div>
                <div>
                  <Typography
                    sx={{
                      fontSize: "22px",
                      fontWeight: 600,
                      color: "#2D2F39",
                      textAlign: "center",
                    }}
                  >{`${firstName} ${lastName}`}</Typography>
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontSize: "14px",
                      fontWeight: 400,
                      color: "#2D2F39",
                    }}
                  >
                    <span style={{ color: "#656565" }}>HMO ID:{"  "}</span>

                    <span style={{ fontWeight: 500 }}>
                      {"  "}
                      {`${hmoId}`}
                    </span>
                  </Typography>
                </div>
              </Grid>
            </Grid>

            <Grid item sx={{ width: "100%" }}>
              <Grid margin="0rem 4rem">
                <Info
                  icon={
                    <SmsIcon sx={{ fill: "transparent", fontSize: "20px" }} />
                  }
                  text={email}
                  header="Email"
                />
                <Info
                  icon={
                    <CallIcon sx={{ fill: "transparent", fontSize: "20px" }} />
                  }
                  text={phone}
                  header="Phone number"
                />
                <Info
                  icon={
                    <MessageAddIcon
                      sx={{ fill: "transparent", fontSize: "20px" }}
                    />
                  }
                  text={noc}
                  header="NOC"
                />
                <Info
                  icon={
                    <Calender2 sx={{ fill: "transparent", fontSize: "20px" }} />
                  }
                  text={formatDate(expiryDate, "PPP")}
                  header="Expiry date"
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
};

EnrolleeProfileModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  profileData: PropTypes.object.isRequired,
};

export default EnrolleeProfileModal;
