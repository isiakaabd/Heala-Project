import * as React from "react";
import Avatar from "@mui/material/Avatar";
import displayPhoto from "assets/images/avatar.png";
import Styled from "styled-components";

export const columns = [
  {
    field: "entryDate",
    headerName: "Entry Date",
    headerClassName: "entryHeader",
    headerAlign: "center",
    flex: 0.1,
    cellClassName: "entryDate",
    type: "number",
    minWidth: 60,
    sortable: false,
  },

  {
    field: "fullname",
    headerName: "Name",
    headerClassName: "entryHeader",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    cellClassName: "name",
    headerAlign: "left",
    flex: 0.13,
    minWidth: 100,
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
    // headerClassName: "categoryHeader",
    type: "number",
    minWidth: 100,
    flex: 0.06,
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
    renderCell: (params) => (
      <Div>
        <a> {params.getValue(params.id, "email") || ""}</a>
      </Div>
    ),
  },
];

export const columns2 = [
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
    renderCell: (params) => (
      <span style={{ display: "flex", alignItems: "center" }}>
        <Avatar alt="Display avatar" src={displayPhoto} style={{ marginRight: "1rem" }} />
        {params.getValue(params.id, "firstName") || ""}

        {params.getValue(params.id, "lastName") || ""}
      </span>
    ),
  },
  {
    field: "medical",
    headerName: "Medical ID",
    headerAlign: "center",
    cellClassName: "medical",
    headerClassName: "medical",
    type: "number",
    minWidth: 120,
    flex: 0.08,
    sortable: false,
  },

  {
    field: " ",
    headerName: " ",
    headerClassName: "entryHeader",
    headerAlign: "center",
    cellClassName: "email",
    selectable: false,
    flex: 0.15,
    minWidth: 100,
    renderCell: (params) => (
      <Div2>
        <a href="/view">
          View HCP &nbsp;&nbsp;
          <svg
            width="6"
            height="8"
            viewBox="0 0 6 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.726562 7.06L3.7799 4L0.726562 0.94L1.66656 0L5.66656 4L1.66656 8L0.726562 7.06Z"
              fill="#757886"
            />
          </svg>
        </a>
      </Div2>
    ),
  },
];
export const Referralcolumns = [
  {
    field: "entryDate",
    headerName: "Entry Date",
    headerClassName: "entryHeader",
    headerAlign: "center",
    flex: 0.09,
    cellClassName: "entryDate",
    type: "number",
    minWidth: 60,
    maxWidth: 150,
    sortable: false,
  },
  {
    field: "time",
    headerName: "Time",
    headerClassName: "referralTime",
    headerAlign: "center",
    flex: 0.077,
    cellClassName: "referralTime",
    type: "number",
    minWidth: 50,
    sortable: false,
  },

  {
    field: "HCP Name",
    headerName: "HCP Name",
    headerClassName: "entryHeader",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    cellClassName: "name",
    headerAlign: "center",
    flex: 0.13,
    minWidth: 160,
    renderCell: (params) => (
      <span style={{ display: "flex", alignItems: "center" }}>
        <Avatar alt="Display avatar" src={displayPhoto} style={{ marginRight: "1rem" }} />
        {params.getValue(params.id, "firstName") || ""}

        {params.getValue(params.id, "lastName") || ""}
      </span>
    ),
  },
  {
    field: "specialization",
    headerName: "Specialization",
    headerAlign: "left",
    cellClassName: "CellSpecialization",
    headerClassName: "specialization",
    type: "number",
    minWidth: 50,
    flex: 0.11,
    sortable: false,
  },
  {
    field: "fullname",
    headerName: "Patient's Name",
    headerClassName: "headerPatientName",
    sortable: false,
    cellClassName: "PatientName",
    headerAlign: "center",
    flex: 0.15,
    minWidth: 200,
    renderCell: (params) => (
      <span style={{ display: "flex", alignItems: "center" }}>
        <Avatar alt="Display avatar" src={displayPhoto} style={{ marginRight: "1rem" }} />
        {params.getValue(params.id, "firstName") || ""}
        {params.getValue(params.id, "lastName") || ""}
      </span>
    ),
  },

  {
    field: "Status ",
    headerName: " Status",
    headerClassName: "status",
    headerAlign: "left",
    cellClassName: "cellStatus",
    selectable: false,
    flex: 0.06,
    minWidth: 70,
    renderCell: (params) => (
      <ReferralDiv>
        <Div2>
          <a href="">Active</a>
        </Div2>
      </ReferralDiv>
    ),
  },
  {
    field: "referral",
    headerName: " ",
    headerClassName: "entryHeader",
    headerAlign: "left",
    cellClassName: "refferalHeader",
    selectable: false,
    flex: 0.1,
    minWidth: 100,
    renderCell: (params) => (
      <Div2>
        <small>View referral</small>
      </Div2>
    ),
  },
];
export const Subscriptioncolumns = [
  {
    field: "planName",
    headerName: "Name of plan",
    headerClassName: "planName",
    headerAlign: "headerPlanName",
    flex: 0.1,
    cellClassName: "cellPlanName",
    type: "number",
    minWidth: 60,
    sortable: false,
    checkboxSelection: false,
  },
  {
    field: "amount",
    headerName: "Amount",
    headerClassName: "headerAmount",
    headerAlign: "center",
    flex: 0.086,
    cellClassName: "cellAmount",
    type: "number",
    minWidth: 50,
    sortable: false,
    selectable: false,
  },

  {
    field: "Description",
    headerName: "Description",
    headerClassName: "description",
    sortable: false,
    cellClassName: "cellDescription",
    headerAlign: "center",
    flex: 0.15,
    minWidth: 200,
    renderCell: (params) => (
      <span
        style={{
          fontSize: "1.4rem",
          whiteSpace: "normal",
          wordWrap: "break-word",
          lineHeight: "2.1rem",
        }}
      >
        {params.getValue(params.id, "description") || ""}
      </span>
    ),
  },
  {
    field: "editPlan",
    headerName: " ",
    headerClassName: "headerEditPlan",
    headerAlign: "left",
    cellClassName: "cellEditPlan",
    selectable: false,
    flex: 0.1,
    minWidth: 100,
    renderCell: (params) => (
      <SubscriptionDiv>
        <Div>
          <a>
            {" "}
            Edit plan
            <svg
              style={{ marginLeft: ".7rem" }}
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.586 1.58599C10.7705 1.39497 10.9912 1.24261 11.2352 1.13779C11.4792 1.03297 11.7416 0.977801 12.0072 0.975494C12.2728 0.973186 12.5361 1.02379 12.7819 1.12435C13.0277 1.22491 13.251 1.37342 13.4388 1.5612C13.6266 1.74899 13.7751 1.97229 13.8756 2.21809C13.9762 2.46388 14.0268 2.72724 14.0245 2.9928C14.0222 3.25836 13.967 3.5208 13.8622 3.7648C13.7574 4.00881 13.605 4.2295 13.414 4.41399L12.621 5.20699L9.793 2.37899L10.586 1.58599ZM8.379 3.79299L0 12.172L0 15H2.828L11.208 6.62099L8.378 3.79299H8.379Z"
                fill="#3EA584"
              />
            </svg>
          </a>
        </Div>
      </SubscriptionDiv>
    ),
  },
  {
    field: "",
    headerName: "",
    headerClassName: "headerdeletePlan",
    headerAlign: "left",
    cellClassName: "cellDeletePlan",
    selectable: false,
    flex: 0.1,
    minWidth: 100,
    renderCell: (params) => (
      <SubscriptionDelete>
        <Div2 style={{ display: "flex", alignItems: "center" }}>
          <a>Delete plan </a>
          <svg
            style={{ marginLeft: ".4rem" }}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9 2C8.81434 2.0001 8.63237 2.05188 8.47447 2.14955C8.31658 2.24722 8.18899 2.38692 8.106 2.553L7.382 4H4C3.73478 4 3.48043 4.10536 3.29289 4.29289C3.10536 4.48043 3 4.73478 3 5C3 5.26522 3.10536 5.51957 3.29289 5.70711C3.48043 5.89464 3.73478 6 4 6L4 16C4 16.5304 4.21071 17.0391 4.58579 17.4142C4.96086 17.7893 5.46957 18 6 18H14C14.5304 18 15.0391 17.7893 15.4142 17.4142C15.7893 17.0391 16 16.5304 16 16V6C16.2652 6 16.5196 5.89464 16.7071 5.70711C16.8946 5.51957 17 5.26522 17 5C17 4.73478 16.8946 4.48043 16.7071 4.29289C16.5196 4.10536 16.2652 4 16 4H12.618L11.894 2.553C11.811 2.38692 11.6834 2.24722 11.5255 2.14955C11.3676 2.05188 11.1857 2.0001 11 2H9ZM7 8C7 7.73478 7.10536 7.48043 7.29289 7.29289C7.48043 7.10536 7.73478 7 8 7C8.26522 7 8.51957 7.10536 8.70711 7.29289C8.89464 7.48043 9 7.73478 9 8V14C9 14.2652 8.89464 14.5196 8.70711 14.7071C8.51957 14.8946 8.26522 15 8 15C7.73478 15 7.48043 14.8946 7.29289 14.7071C7.10536 14.5196 7 14.2652 7 14L7 8ZM12 7C11.7348 7 11.4804 7.10536 11.2929 7.29289C11.1054 7.48043 11 7.73478 11 8V14C11 14.2652 11.1054 14.5196 11.2929 14.7071C11.4804 14.8946 11.7348 15 12 15C12.2652 15 12.5196 14.8946 12.7071 14.7071C12.8946 14.5196 13 14.2652 13 14V8C13 7.73478 12.8946 7.48043 12.7071 7.29289C12.5196 7.10536 12.2652 7 12 7Z"
              fill="#ED3237"
            />
          </svg>
        </Div2>
      </SubscriptionDelete>
    ),
  },
];
export const FinanceColumns = [
  {
    field: "entryDate",
    headerName: "Entry Date",
    headerClassName: "financeEntryHeader",
    headerAlign: "center",
    flex: 0.1,
    cellClassName: "entryDate",
    type: "number",
    minWidth: 60,
    sortable: false,
  },
  {
    field: "time",
    headerName: "Time",
    headerClassName: "referralTime",
    headerAlign: "center",
    flex: 0.1,
    cellClassName: "referralTime",
    type: "number",
    minWidth: 50,
    sortable: false,
  },
  {
    field: "fullname",
    headerName: "Patient's Name",
    headerClassName: "headerPatientName",
    sortable: false,
    cellClassName: "PatientName",
    headerAlign: "left",
    flex: 0.15,
    type: "string",
    minWidth: 150,
    renderCell: (params) => (
      <span style={{ display: "flex", alignItems: "center" }}>
        <Avatar alt="Display avatar" src={displayPhoto} style={{ marginRight: "1rem" }} />
        {params.getValue(params.id, "firstName") || ""}
        {params.getValue(params.id, "lastName") || ""}
      </span>
    ),
  },
  {
    field: "planName",
    headerName: "Subscription plan",
    headerClassName: "planName",
    headerAlign: "headerPlanName",
    flex: 0.1,
    cellClassName: "cellPlanName",
    type: "number",
    minWidth: 60,
    sortable: false,
    checkboxSelection: false,
  },
  {
    field: "amount",
    headerName: "Amount",
    headerClassName: "headerAmount",
    headerAlign: "center",
    flex: 0.086,
    cellClassName: "cellAmount",
    type: "string",
    minWidth: 50,
    sortable: false,
    selectable: false,
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
    time: "10:00AM",
    medical: 123445,
    amount: "₦ 10,000",
    specialization: "Dentistry",
    planName: "Plan 1",
    description: "This is the decription regarding this particular plan",
  },
  {
    id: 2,
    lastName: "Lannister",
    entryDate: "july 17,2021",
    firstName: "Cersei",
    category: "User",
    planName: "Plan 1",
    amount: "₦ 10,000",
    medical: 123445,
    email: "sule@gmail.com",
    description: "This is the decription regarding this particular plan",
    time: "10:00AM",
    specialization: "Dentistry",
  },
  {
    id: 3,
    lastName: "Lannister",
    entryDate: "july 17,2021",
    firstName: "Jaime",
    planName: "Plan 1",
    category: "HCP",
    amount: "₦ 10,000",
    medical: 123445,
    email: "sule@gmail.com",
    time: "10:00AM",
    specialization: "Dentistry",
    description: "This is the decription regarding this particular plan",
  },
  {
    id: 4,
    lastName: "Stark",
    entryDate: "july 17,2021",
    firstName: "Arya",
    category: "HCP",
    amount: "₦ 10,000",
    email: "sule@gmail.com",
    time: "10:00AM",
    planName: "Plan 1",
    medical: 123445,
    specialization: "Dentistry",
    description: "This is the decription regarding this particular plan",
  },
  {
    id: 5,
    lastName: "Targaryen",
    entryDate: "july 17,2021",
    firstName: "Daenerys",
    category: "HSP",
    medical: 123445,
    amount: "₦ 10,000",
    planName: "Plan 1",
    email: "sule@gmail.com",
    time: "10:00AM",
    specialization: "Dentistry",
    description: "This is the decription regarding this particular plan",
  },
  {
    id: 6,
    lastName: "Melisandre",
    entryDate: "july 17,2021",
    firstName: null,
    medical: 123445,
    category: "User",
    amount: "₦ 10,000",
    email: "sule@gmail.com",
    time: "10:00AM",
    planName: "Plan 1",
    specialization: "Dentistry",
    description: "This is the decription regarding this particular plan",
  },
  {
    id: 7,
    lastName: "Clifford",
    entryDate: "july 17,2021",
    medical: 123445,
    firstName: "Ferrara",
    category: "HCP",
    planName: "Plan 1",
    amount: "₦ 10,000",
    email: "sule@gmail.com",
    time: "10:00AM",
    specialization: "Dentistry",
    description: "This is the decription regarding this particular plan",
  },
  {
    id: 9,
    lastName: "Roxie",
    entryDate: "july 17,2021",
    firstName: "Harvey",
    category: "HCP",
    medical: 123445,
    planName: "Plan 1",
    amount: "₦ 10,000",
    email: "sule@gmail.com",
    time: "10:00AM",
    specialization: "Dentistry",
    description: "This is the decription regarding this particular plan",
  },
];
const ReferralDiv = Styled.div`
& div{
  width: 6.2rem !important;
  padding:0;
  margin-right:0 !important;
  padding-left: 1rem !important;
  background:#ECF6F3;
  a{
  width: 4.2rem!important;
  font-size:1.4rem;
  color:#49AA8B;
  line-Height:2.1rem;
  height:2.2rem;
  }
}`;

const SubscriptionDiv = Styled.div`
& div{
  width: 10.1rem !important;
  padding: .8rem 1rem !important;
  margin-right:0 !important;
  padding-left: 1rem !important;
  border-radius: 2rem !important;
  background: #ECF6F3;
  height:3.8rem;
  
  a{
    font-weight:500;
  font-size:1.4rem;
  color: #3EA584;
  line-Height:2.1rem;
  // height:2.2rem;
  }
}
`;
const SubscriptionDelete = Styled.div`
& div{
  width: 11.8rem !important;
  padding: .8rem 1rem !important;
  border-color:#FEF8F7;
  border-radius: 2rem !important;
  background: #FEF8F7;
  height:3.8rem;


  
  a{
  font-weight:500;
  font-size:1.4rem;
  color: #ED3237;
  height:2.2rem;
  font-family: Circular Std;
  font-style: normal;
  letter-spacing: 0px;
  text-align: center;
  width:10.1rem;
  margin-right:0
  }
}
`;

const Div2 = Styled.div`
width: 11rem;
height: 3rem;
margin: auto 0;
border-radius: 2rem;
border: 1px solid #F2F2F2;
display: grid;
place-content: center;
color:#757886;
   & a{
    text-decoration:none;
    font-size: 1.4rem;
    width:6.6rem;
    height:2.2rem
    margin:0;
    line-Height:2.1rem;
    color:inherit;
    margin-right:1.25rem
   } 
   &:hover{
     cursor:pointer
   }
`;
const Div = Styled.div`
width: 17.9rem;
height: 3rem;
margin: auto 0;
border-radius: 2rem;
border: 1px solid #F2F2F2;
display: grid;
place-content: center;
   & a{
    padding: .4rem 1rem;
    
   } 
   &:hover{
     cursor:pointer
   }
`;
