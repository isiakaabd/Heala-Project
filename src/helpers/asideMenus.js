import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import GroupsIcon from "@mui/icons-material/Groups";
import { BsChatDotsFill } from "react-icons/bs";
import PaymentsIcon from "@mui/icons-material/Payments";
import EmailIcon from "@mui/icons-material/Email";
import VerifiedIcon from "@mui/icons-material/Verified";
import LoopIcon from "@mui/icons-material/Loop";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import SettingsIcon from "@mui/icons-material/Settings";

export const menus = [
  { id: 0, title: "Dashboard", icon: DashboardIcon, path: "/dashboard" },
  { id: 1, title: "Patients", icon: GroupIcon, path: "/patients" },
  { id: 2, title: "Doctors", icon: PersonAddAlt1Icon, path: "/hcps" },
  { id: 3, title: "Partners", icon: GroupsIcon, path: "/partners" },
  { id: 5, title: "Messages", icon: BsChatDotsFill, path: "/messages" },
  { id: 6, title: "Emails", icon: EmailIcon, path: "/email" },
  { id: 7, title: "Doctor Verification", icon: VerifiedIcon, path: "/verification" },
  { id: 12, title: "White Label", icon: LoopIcon, path: "/label" },
  { id: 8, title: "Finance", icon: PaymentsIcon, path: "/finance" },
  { id: 9, title: "Referrals", icon: LoopIcon, path: "/referrals" },
  { id: 10, title: "Subscription", icon: SubscriptionsIcon, path: "/plans" },
  { id: 11, title: "Settings", icon: SettingsIcon, path: "/settings" },
];
