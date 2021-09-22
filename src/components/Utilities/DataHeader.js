import * as React from "react";
import Avatar from "@mui/material/Avatar";
import displayPhoto from "assets/images/avatar.png";
export const columns = [
  {
    field: "entryDate",
    headerName: "Entry Date",
    headerClassName: "entryHeader",
    headerAlign: "center",
    flex: 0.1,
    cellClassName: "entryDate",
    type: "number",
    minWidth: 110,
    sortable: false,
  },

  {
    field: "fullname",
    headerName: "Name",
    headerClassName: "entryHeader",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    cellClassName: "name",
    headerAlign: "center",
    flex: 0.13,
    minWidth: 150,
    // valueGetter: (params) =>
    //   `${params.getValue(params.id, "firstName") || ""} ${
    //     params.getValue(params.id, "lastName") || ""
    //   }`,
    renderCell: (params) => (
      <span style={{ display: "flex", alignItems: "center" }}>
        <Avatar alt="Display avatar" src={displayPhoto} style={{ marginRight: "1rem" }} />
        {params.getValue(params.id, "firstName") || ""}

        {params.getValue(params.id, "lastName") || ""}
      </span>
    ),
  },
  {
    field: "category",
    headerName: "Category",
    headerAlign: "left",
    cellClassName: "category",
    headerClassName: "entryHeader",
    type: "number",
    minWidth: 120,
    flex: 0.08,
    sortable: false,
  },

  {
    field: "email",
    headerName: "Email",
    headerClassName: "entryHeader",
    headerAlign: "center",
    cellClassName: "email",
    flex: 0.15,
    minWidth: 100,
    description: "This column has a value getter and is not sortable.",
    // sortable: false,
    // width: 200,
  },
];

export const rows = [
  {
    id: 1,
    lastName: "Snow",
    entryDate: "july 17,2021",
    firstName: "Jon",
    category: "HCP",
    email: "sule@gmail.com",
  },
  {
    id: 2,
    lastName: "Lannister",
    entryDate: "july 17,2021",
    firstName: "Cersei",
    category: "User",
    email: "sule@gmail.com",
  },
  {
    id: 3,
    lastName: "Lannister",
    entryDate: "july 17,2021",
    firstName: "Jaime",
    category: "HCP",
    email: "sule@gmail.com",
  },
  {
    id: 4,
    lastName: "Stark",
    entryDate: "july 17,2021",
    firstName: "Arya",
    category: "HCP",
    email: "sule@gmail.com",
  },
  {
    id: 5,
    lastName: "Targaryen",
    entryDate: "july 17,2021",
    firstName: "Daenerys",
    category: null,
    email: "sule@gmail.com",
  },
  {
    id: 6,
    lastName: "Melisandre",
    entryDate: "july 17,2021",
    firstName: null,
    category: "User",
    email: "sule@gmail.com",
  },
  {
    id: 7,
    lastName: "Clifford",
    entryDate: "july 17,2021",
    firstName: "Ferrara",
    category: "HCP",
    email: "sule@gmail.com",
  },
  {
    id: 9,
    lastName: "Roxie",
    entryDate: "july 17,2021",
    firstName: "Harvey",
    category: "HCP",
    email: "sule@gmail.com",
  },
];
