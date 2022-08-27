import PaymentsIcon from "@mui/icons-material/Payments";
import LoopIcon from "@mui/icons-material/Loop";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardIcon from "components/Icons/DashboardIcon";
import PatientsIcon from "components/Icons/PatientsIcon";
import DoctorsIcon from "components/Icons/DoctorsIcon";
import PartnersIcon from "components/Icons/PartnersIcon";
import HMOIcon from "components/Icons/HMOIcon";
import MessagesIcon from "components/Icons/MessagesIcon";
import EmailIcon from "components/Icons/EmailIcon";
import VerifiedIcon from "components/Icons/VerifiedIcon";
import LabelIcon from "components/Icons/LabelIcon";

export const menus = [
  {
    id: 0,
    title: "Dashboard",
    icon: <DashboardIcon sx={{ height: "25px", width: "25px" }} />,
    path: "/dashboard",
  },
  {
    id: 1,
    title: "Patients",
    icon: <PatientsIcon sx={{ height: "25px", width: "25px" }} />,
    path: "/patients",
  },
  {
    id: 2,
    title: "Doctors",
    icon: <DoctorsIcon sx={{ height: "25px", width: "25px" }} />,
    path: "/hcps",
  },
  {
    id: 3,
    title: "Partners",
    icon: <PartnersIcon sx={{ height: "25px", width: "25px" }} />,
    path: "/partners",
  },
  {
    id: 13,
    title: "HMO",
    icon: <HMOIcon sx={{ height: "25px", width: "25px" }} />,
    path: "/hmo",
  },
  {
    id: 5,
    title: "Messages",
    icon: <MessagesIcon sx={{ height: "25px", width: "25px" }} />,
    path: "/messages",
  },
  {
    id: 6,
    title: "Emails",
    icon: <EmailIcon sx={{ height: "25px", width: "25px" }} />,
    path: "/email",
  },
  {
    id: 7,
    title: "Doctor Verification",
    icon: <VerifiedIcon sx={{ height: "25px", width: "25px" }} />,
    path: "/verification",
  },
  {
    id: 12,
    title: "White Label",
    icon: <LabelIcon sx={{ height: "25px", width: "25px" }} />,
    path: "/label",
  },
  {
    id: 8,
    title: "Finance",
    icon: <PaymentsIcon sx={{ height: "25px", width: "25px" }} />,
    path: "/finance",
  },
  {
    id: 9,
    title: "Referrals",
    icon: <LoopIcon sx={{ height: "25px", width: "25px" }} />,
    path: "/referrals",
  },
  {
    id: 10,
    title: "Subscription Plans",
    icon: <SubscriptionsIcon sx={{ height: "25px", width: "25px" }} />,
    path: "/plans",
  },
  {
    id: 11,
    title: "Settings",
    icon: <SettingsIcon sx={{ height: "25px", width: "25px" }} />,
    path: "/settings",
  },
];
