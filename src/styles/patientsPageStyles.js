import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  searchFilterContainer: {
    "&.MuiGrid-root": {
      justifyContent: "space-between",
    },
  },

  button: {
    "&.MuiButton-root": {
      background: "#fff",
      color: theme.palette.common.grey,
      textTransform: "none",
      borderRadius: "2rem",
      display: "flex",
      alignItems: "center",
      padding: "1rem",
      maxWidth: "10rem",
      whiteSpace: "nowrap",

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
    },
  },

  badge: {
    "&.MuiChip-root": {
      fontSize: "1.25rem !important",
      height: "2.7rem",

      borderRadius: "1.3rem",
    },
  },
  searchFilterBtn: {
    "&.MuiButton-root": {
      ...theme.typography.btn,
      background: theme.palette.common.black,
      width: "100%",
    },
  },

  filterText: {
    "&.MuiTypography-root": {
      height: "100%",
      display: "flex",
      alignItems: "center",
    },
  },

  redBtn: {
    color: "#757886",
    backgroundColor: "#F8F8F8",

    "&:hover": {
      color: "#ffffff",
      backgroundColor: "#f21818",
    },
  },

  warningBtn: {
    color: "#757886",
    backgroundColor: "#F8F8F8",

    "&:hover": {
      color: "#ffffff",
      backgroundColor: "rgb(62, 94, 169)",
    },
  },
}));

/*   const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
    disabled: theme.palette.common.black,
  }; */
