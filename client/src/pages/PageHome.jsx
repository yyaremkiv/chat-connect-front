import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navbar } from "components/Navbar/Navbar";
import { WidgetUser } from "components/WidgetUser/WidgetUser";
import { WidgetAdvert } from "components/WidgetAdvert/WidgetAdvert";
import { WidgetFriendList } from "components/WidgetFriendList/WidgetFriendList";
import { Box, useMediaQuery } from "@mui/material";

export const PageHome = () => {
  const user = useSelector((state) => state.auth.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <>
      {user._id && (
        <Box>
          <Navbar />
          <Box
            sx={{
              display: "flex",
              flexDirection: isNonMobileScreens ? "row" : "column",
              justifyContent: "center",
              gap: "1.5rem",
              maxWidth: "xl",
              m: "1.5rem auto",
              p: "0 1.5rem 1.5rem",
            }}
          >
            <Box flexBasis={isNonMobileScreens ? "25%" : "100%"}>
              <WidgetUser />
            </Box>

            <Box flexBasis={isNonMobileScreens ? "45%" : "100%"}>
              <Box sx={{ display: "flex", gap: "1rem" }}>
                <Link to="/home">All posts</Link>
                <Link to="/home/users">All users</Link>
              </Box>
              <Outlet />
            </Box>

            {isNonMobileScreens && (
              <Box
                display="flex"
                flexDirection="column"
                gap="1.5rem"
                flexBasis="30%"
              >
                <WidgetAdvert />
                <WidgetFriendList />
              </Box>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};
