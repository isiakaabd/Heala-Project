import React from "react";
import HMOIcon from "components/Icons/HMOIcon";
import LabelIcon from "components/Icons/LabelIcon";
import DoctorsIcon from "components/Icons/DoctorsIcon";
import FinanceIcon from "components/Icons/FinanceIcon";
import PatientsIcon from "components/Icons/PatientsIcon";
import VerifiedIcon from "components/Icons/VerifiedIcon";
import TabIcon from "components/Icons/TabIcon";
import SettingsIcon from "components/Icons/SettingsIcon";
import RefferalsIcon from "components/Icons/RefferalsIcon";
import DashboardIcon from "components/Icons/DashboardIcon";
import SubscriptionIcon from "components/Icons/SubscriptionIcon";

export const menus = [
  {
    id: 0,
    title: "Dashboard",
    icon: <DashboardIcon />,
    path: "/dashboard",
  },
  {
    id: 1,
    title: "Patients",
    icon: <PatientsIcon />,
    path: "/patients",
  },
  {
    id: 2,
    title: "Doctors",
    icon: <DoctorsIcon />,
    path: "/hcps",
  },
  {
    id: 7,
    title: "Doctor Verification",
    icon: <TabIcon />,
    path: "/verification",
  },
  {
    id: 12,
    title: "Provider Services",
    icon: <LabelIcon />,
    path: "/user-type",
  },
  {
    id: 13,
    title: "HMO",
    icon: <HMOIcon />,
    path: "/hmo",
  },
  // {
  //   id: 3,
  //   title: "Partners",
  //   icon: <PartnersIcon sx={{ height: "25px", width: "25px" }} />,
  //   path: "/partners",
  // },

  {
    id: 8,
    title: "Finance",
    icon: <FinanceIcon />,
    path: "/finance",
  },
  {
    id: 9,
    title: "Referrals",
    icon: <RefferalsIcon />,
    path: "/referrals",
  },
  {
    id: 10,
    title: "Subscription Plans",
    icon: <SubscriptionIcon />,
    path: "/plans",
  },
  {
    id: 11,
    title: "Settings",
    icon: <SettingsIcon />,
    path: "/settings",
  },
];
export const firstMenu = [
  // {
  //   id: 13,
  //   title: "HMO",
  //   icon: <HMOIcon sx={{ height: "25px", width: "25px" }} />,
  //   path: "/hmo",
  // },
  // {
  //   id: 5,
  //   title: "Messages",
  //   icon: <MessagesIcon sx={{ height: "25px", width: "25px" }} />,
  //   path: "/messages",
  // },
  // {
  //   id: 6,
  //   title: "Emails",
  //   icon: <EmailIcon sx={{ height: "25px", width: "25px" }} />,
  //   path: "/email",
  // },
];

//
export const subMenu = [
  {
    id: 100,
    title: "Heala",
    // icon: <HMOIcon sx={{ height: "25px", width: "25px" }} />,
    path: "/heala",
  },
  {
    id: 1100,
    title: "Hospital",
    // icon: <HMOIcon sx={{ height: "25px", width: "25px" }} />,
    path: "/hospital",
  },
  {
    id: 111,
    title: "HMO",
    // icon: <HMOIcon sx={{ height: "25px", width: "25px" }} />,
    path: "/hmos",
  },
  {
    id: 1101,
    title: "UserTypes",
    // icon: <HMOIcon sx={{ height: "25px", width: "25px" }} />,
    path: "/user-type",
  },
];
