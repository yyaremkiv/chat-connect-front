import { useSelector } from "react-redux";
import { Navbar } from "components/Navbar/Navbar";
import { WidgetUser } from "components/WidgetUser/WidgetUser";
import { WidgetGeneral } from "components/WidgetGeneral/WidgetGeneral";
import { WidgetAdvert } from "components/WidgetAdvert/WidgetAdvert";
import { WidgetFriendList } from "components/WidgetFriendList/WidgetFriendList";
import { Box, useMediaQuery } from "@mui/material";

export const PageHome = () => {
  const user = useSelector((state) => state.auth.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  console.log("user", user._id);

  return (
    <>
      {user._id && (
        <Box>
          <Navbar />
          <Box
            display="flex"
            flexDirection={isNonMobileScreens ? "row" : "column"}
            gap="1.5rem"
            padding="1.5rem 5%"
          >
            <Box flexBasis={isNonMobileScreens ? "25%" : "100%"}>
              <WidgetUser />
            </Box>

            <Box flexBasis={isNonMobileScreens ? "45%" : "100%"}>
              <WidgetGeneral controlCategory={true} addNewPost={true} />
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
