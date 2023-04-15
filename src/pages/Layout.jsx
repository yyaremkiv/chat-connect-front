import { Outlet } from "react-router-dom";
import { Navbar } from "components/Navbar/Navbar";
import { Box } from "@mui/material";

export const Layout = () => {
  return (
    <Box>
      <Navbar />
      <Outlet />
    </Box>
  );
};
