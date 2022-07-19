import { makeStyles } from "@mui/styles";
import people from "../assets/images/login-page-photo.png";
import loginBackground from "../assets/images/login-background.svg";

export const useStyles = makeStyles((theme) => ({
  gridContainer: {
    "&.MuiGrid-root": {
      minHeight: "100vh",
      display: "grid !important",
      gridTemplateColumns: "repeat(2,1fr)",
      "@media(max-width:600px)": {
        gridTemplateColumns: "1fr",
        "& >*:first-child": {
          display: "none !important",
        },
      },
    },
  },
  leftParentGrid: {
    "&.MuiGrid-root": {
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundImage: `url(${people}),
        linear-gradient(89.63deg, rgba(1, 2, 2, 0.49) 0.3%, rgba(1, 2, 2, 0) 99.66%)`,
      backgroundBlendMode: "darken",
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
      fontSize: "clamp(3rem, 3vw, 4.8rem)",
      "@media(max-width:600px)": {
        textAlign: "center",
      },
    },
  },
  logoAlign: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: "min(28rem, 40vw)",
    position: "relative",
    textAlign: "center",
  },
  rightParentGrid: {
    backgroundImage: `url(${loginBackground})`,
    // padding: "5rem 8rem",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  link: {
    textDecoration: "none",
  },
}));
