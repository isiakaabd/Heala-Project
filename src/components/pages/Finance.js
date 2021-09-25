import React from "react";
import Grid from "@mui/material/Grid";
import DataTable from "components/Utilities/DataGrid";
import { FinanceColumns, rows } from "components/Utilities/DataHeader";
import { Box } from "@mui/system";
import { H1 } from "components/Utilities/Texts";

const Finance = () => {
  return (
    <>
      <Box component="div" sx={{ display: "flex", alignItems: "center", marginLeft: "1rem" }}>
        <H1 fontSize="3.2rem" color="#4F4F4F" style={{ marginRight: "1rem" }}>
          Earnings table
        </H1>
        <Grid sx={{ display: "inline" }}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="12" fill="#ECF6F3" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.5995 14.3999C13.3874 14.3999 13.1839 14.4842 13.0339 14.6342C12.8838 14.7843 12.7995 14.9878 12.7995 15.1999C12.7995 15.4121 12.8838 15.6156 13.0339 15.7656C13.1839 15.9156 13.3874 15.9999 13.5995 15.9999H17.5995C17.8117 15.9999 18.0152 15.9156 18.1652 15.7656C18.3153 15.6156 18.3995 15.4121 18.3995 15.1999V11.1999C18.3995 10.9878 18.3153 10.7843 18.1652 10.6342C18.0152 10.4842 17.8117 10.3999 17.5995 10.3999C17.3874 10.3999 17.1839 10.4842 17.0339 10.6342C16.8838 10.7843 16.7995 10.9878 16.7995 11.1999V13.2687L13.3651 9.83434C13.2151 9.68436 13.0117 9.60011 12.7995 9.60011C12.5874 9.60011 12.384 9.68436 12.2339 9.83434L10.3995 11.6687L6.96514 8.23434C6.81426 8.08861 6.61218 8.00797 6.40242 8.0098C6.19267 8.01162 5.99202 8.09575 5.84369 8.24408C5.69536 8.39241 5.61123 8.59306 5.60941 8.80281C5.60758 9.01257 5.68822 9.21465 5.83394 9.36553L9.83395 13.3655C9.98397 13.5155 10.1874 13.5998 10.3995 13.5998C10.6117 13.5998 10.8151 13.5155 10.9651 13.3655L12.7995 11.5311L15.6683 14.3999H13.5995Z"
              fill="#3EA584"
            />
          </svg>
        </Grid>
      </Box>

      <Grid container sx={{ height: "700px", width: "100.7rem", margin: "5.6rem 4.5rem 0 4.1rem" }}>
        <DataTable columns={FinanceColumns} rows={rows} rowHeight="70" sx={{ width: "100%" }} />
      </Grid>
    </>
  );
};

export default Finance;
