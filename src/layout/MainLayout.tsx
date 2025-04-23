import Sidebar from "../components/Sidebar";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Topbar from "../components/Topbar";


const MainLayout = () => {
  return (
    <Box width="100%" height="100vh" sx={{ backgroundColor: 'background.default' }}>
    {/* Yläpalkki */}
    <Topbar />

    {/* Rivi: sidebar + sisältö */}
    <Box display="flex">
      <Sidebar />

    {/* Outlet-alue */}
    <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
    {/* Tätä käytetään työntämään sisältö topbarin alta */}
    <Outlet />
    </Box>
    </Box>
  </Box>
);
};


export default MainLayout;