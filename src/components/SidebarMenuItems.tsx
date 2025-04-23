// src/components/Sidebar.tsx

import { List, ListItemButton, ListItemIcon, ListItemText,} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import HistoryIcon from "@mui/icons-material/History";
import { useNavigate } from "react-router-dom";



const SidebarMenuItems = () => {
  const navigate = useNavigate();

  const MenuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Uusi merkintä", icon: <NoteAddIcon />, path: "/new-entry" },
    { text: "Tehtävät", icon: <AssignmentIcon />, path: "/tasks" },
    { text: "Teemat", icon: <CalendarTodayIcon />, path: "/theme" },
    { text: "Historia", icon: <HistoryIcon />, path: "/history" },
  ];

  return (
    <>
    <List dense>
      {MenuItems.map((item, index) => (
        <ListItemButton key={index} onClick={() => navigate(item.path)}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text}/>
        </ListItemButton>
      ))}
    </List>
    
    </>
  );
};

export default SidebarMenuItems;

