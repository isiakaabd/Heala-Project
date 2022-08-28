import { makeStyles } from "@mui/styles";
/* import loginBackground from "../assets/images/login-background.svg"; */

export const useStyles = makeStyles((theme) => ({
  gridContainer: {
    "&.MuiGrid-root": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      backgroundColor: "#f8f8f8",
      minHeight: "100vh",
      width: "100%",
    },
  },
  overlay: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  peopleBgImage: {
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    overflow: "hidden",
    backgroundPosition: "25% 50%",
  },
  heading: {
    "&.MuiTypography-root": {
      fontSize: "clamp(1em, 3.2em, 5em)",
      textAlign: "center",
      lineHeight: "28px",
      fontWeight: "500 !important",
      padding: "23px",
      color: "#333333",
    },
  },
  logoAlign: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexGrow: 0,
    paddingBottom: "2rem",
  },

  logo: {
    width: "clamp(100px, 150px, 200px)",
    position: "relative",
    textAlign: "center",
  },
  rightParentGrid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    backgroundColor: "#FCFCFC",
    borderRadius: "11px",
  },

  link: {
    textDecoration: "none",
  },
  loginBtn: {
    width: "100%",
    height: "54.62px",
    border: "none",
    fontWeight: "500 !important",
    fontSize: "1.6rem !important",
    textTransform: "initial !important",
    color: "#ffffff !important",
    lineHeight: "20px",
    background: "linear-gradient(98.44deg, #3E5EA9 1.92%, #7EEDBA 122.04%)",
    borderRadius: "7px",
    cursor: "pointer",
    "&:hover": {
      boxShadow: "0px 6.82771px 20.4831px rgba(62, 165, 132, 0.15)",
    },
  },
}));
