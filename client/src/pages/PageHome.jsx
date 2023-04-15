import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { WidgetUser } from "components/WidgetUser/WidgetUser";
import { WidgetAdvert } from "components/WidgetAdvert/WidgetAdvert";
import { WidgetFriendList } from "components/WidgetFriendList/WidgetFriendList";
import { Box, useMediaQuery } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export const PageHome = () => {
  const [value, setValue] = useState(0);
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  useEffect(() => {
    setValue(location.pathname === "/home/users" ? 1 : 0);
  }, [location]);

  const handleChange = (_, newValue) => setValue(newValue);

  return (
    <Box>
      {user._id && (
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "right",
                width: "100%",
                pb: "0.5rem",
              }}
            >
              <Tabs onChange={handleChange} value={value} selectionFollowsFocus>
                <Tab
                  component={Link}
                  to="/home"
                  label="All posts"
                  style={{ fontSize: "0.8rem" }}
                />
                <Tab
                  component={Link}
                  to="/home/users"
                  label="All users"
                  style={{ fontSize: "0.8rem" }}
                />
              </Tabs>
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
              <WidgetFriendList authUser={true} />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};
