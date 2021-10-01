import { createTheme } from "@mui/material/styles";

const dark = "#4F4F4F";
const grey = "#757886";
const red = "#ED3237";
const lightRed = "#FEF8F7";
const lightGrey = "#CCCCCC";
const green = "#3EA584";
const lightGreen = "#ECF6F3";

export const muiTheme = createTheme({
  palette: {
    common: {
      dark,
      grey,
      red,
      green,
      lightRed,
      lightGrey,
      lightGreen,
    },
    primary: {
      main: dark,
    },
    secondary: {
      main: grey,
    },
    error: {
      main: red,
    },
    info: {
      main: lightGrey,
    },
    success: {
      main: green,
    },
  },
  typography: {
    fontFamily: ['"Circular Std Medium"', "Roboto", "sans-serif", "Cocon"].join(", "),
    fontSize: 10,
    htmlFontSize: 10,
    h1: {
      fontSize: "3rem",
      color: dark,
      fontWeight: 500,
    },
    h2: {
      fontSize: "2.5rem",
      color: dark,
      fontWeight: 500,
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    h4: {
      fontSize: "1.7rem",
    },
    h5: {
      fontSize: "1.2rem",
      fontWeight: 500,
    },

    body1: {
      fontSize: "1.2rem",
      fontWeight: 300,
      color: dark,
    },
    body2: {
      fontSize: "1rem",
      fontWeight: 300,
    },
    btn: {
      fontSize: "1.5rem",
      textTransform: "none",
      height: "5rem",
      borderRadius: 10,
      boxShadow: "0px 0px 4px -1px rgba(71,64,71,0.63)",
    },

    rowBtn: {
      textTransform: "none",
      borderRadius: "2rem",
      padding: "1rem",
      maxWidth: "10rem",
    },

    cardIconWrapper: {
      width: 86,
      height: 84,
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    cardGridWrapper: {
      height: "100%",
      padding: "5rem 3rem",
      borderRadius: 10,
      boxShadow: "-1px 0px 10px -2px rgba(0,0,0,0.15)",
    },

    cardParentGrid: {
      background: "#fff",
      borderRadius: 10,
      height: "25.8rem",
      cursor: "pointer",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "#fff",
          boxShadow: "none",
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          top: "-.9rem",
        },
      },
    },
  },
});
