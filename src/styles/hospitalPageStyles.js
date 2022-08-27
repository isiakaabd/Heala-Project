import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  viewBtn: {
    "&.MuiButton-root": {
      backgroundColor: "#F8F8F8",
      color: "#3E5EA9",
      fontSize: "11px",
      borderRadius: "8px",
      textTransform: "none",
      padding: "8px 15px",
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
      fontSize: "1.25rem",
      textAlign: "left",
      padding: "16px",
    },
  },
}));
