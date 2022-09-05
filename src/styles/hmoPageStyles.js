import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  editDelBtn: {
    "&.MuiButton-root": {
      backgroundColor: "#000000",
      color: theme.palette.common.grey,
      textTransform: "none",
      padding: 0,
      margin: 0,

      "&:hover": {
        background: "#fcfcfc",
      },

      "&:active": {
        background: "#fafafa",
      },

      "& .MuiButton-endIcon>*:nth-of-type(1)": {
        fontSize: "1.2rem",
      },

      "& .MuiButton-endIcon": {
        marginLeft: ".3rem",
        marginTop: "-.2rem",
      },
    },
  },

  tableCell: {
    "&.MuiTableCell-root": {
      color: "rgb(0 0 0)",
      fontWeight: 400,
      fontSize: "1.25rem",
      textAlign: "left",
      padding: "16px",
    },
  },
}));
