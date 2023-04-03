import { useSelector } from "react-redux";
import { Navbar } from "components/Navbar/Navbar";
import { WidgetUser } from "components/WidgetUser/WidgetUser";
import { WidgetFriendList } from "components/WidgetFriendList/WidgetFriendList";
import { WidgetGeneral } from "components/WidgetGeneral/WidgetGeneral";
import { Box, useMediaQuery } from "@mui/material";

export const PageProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <Box>
      <Navbar />
      {user._id && (
        <Box
          display="flex"
          flexDirection={isNonMobileScreens ? "row" : "column"}
          justifyContent="center"
          gap="1.5rem"
          padding="1.5rem 5%"
        >
          <Box display="flex" flexDirection="column" gap="1.5rem">
            <WidgetUser />
            <WidgetFriendList />
          </Box>

          <Box flexBasis={isNonMobileScreens ? "50%" : "100%"}>
            <WidgetGeneral controlCategory={false} />
          </Box>
        </Box>
      )}
    </Box>
  );
};
