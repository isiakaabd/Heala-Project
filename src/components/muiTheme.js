import { createTheme } from "@mui/material/styles";

const dark = "#4F4F4F";
const grey = "#757886";
const red = "#ED3237";
const lightRed = "#FEF8F7";
const lightGrey = "#CCCCCC";
const lighterGrey = "F2F2F2";
const green = "#3EA584";
const lightGreen = "#ECF6F3";
const gold = "rgb(243, 173, 83)";
const black = "#2D2F39";

export const muiTheme = createTheme({
  palette: {
    common: {
      dark,
      grey,
      red,
      green,
      lightRed,
      lightGrey,
      lighterGrey,
      lightGreen,
      gold,
      black,
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
    warning: {
      main: gold,
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
      fontSize: "2.25rem",
      fontWeight: 500,
    },
    h4: {
      fontSize: "1.85rem",
    },
    h5: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },

    body1: {
      fontSize: "1.6rem",
      fontWeight: 300,
      color: dark,
    },
    body2: {
      fontSize: "1.3rem",
      fontWeight: 300,
      lineHeight: 1.7,
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
    FormLabel: {
      color: grey,
      fontSize: "1.6rem",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "#fff",
          boxShadow: "-1px 0px 10px -2px rgba(0,0,0,0.15)",
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
