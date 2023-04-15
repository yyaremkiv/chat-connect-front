import { useSelector } from "react-redux";
import { WidgetUser } from "components/WidgetUser/WidgetUser";
import { WidgetPosts } from "components/WidgetPosts/WidgetPosts";
import { WidgetFriendList } from "components/WidgetFriendList/WidgetFriendList";
import { Box, useMediaQuery } from "@mui/material";

export const PageProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <Box>
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
            <WidgetPosts addNewPost={false} />
          </Box>
        </Box>
      )}
    </Box>
  );
};
