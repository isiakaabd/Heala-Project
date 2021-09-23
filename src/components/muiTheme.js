import { createTheme } from "@mui/material/styles";

const dark = "#4F4F4F";
const grey = "#757886";
const red = "#ED3237";
const lightRed = "#FEF8F7";
const lightGrey = "#CCCCCC";
const green = "#3EA584";

export const muiTheme = createTheme({
  palette: {
    common: {
      dark,
      grey,
      red,
      lightRed,
      lightGrey,
      green,
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
      padding: ".5em 1.5em",
      borderRadius: "50px",
      textTransform: "none",
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
