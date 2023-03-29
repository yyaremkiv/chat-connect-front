import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "components/Navbar/Navbar";
import { WidgetUser } from "components/WidgetUser/WidgetUser";
import { WidgetNewPost } from "components/WidgetNewPost/WidgetNewPost";
import { WidgetPosts } from "components/WidgetPosts/WidgetPosts";
import { WidgetAdvert } from "components/WidgetAdvert/WidgetAdvert";
import { WidgetFriendList } from "components/WidgetFriendList/WidgetFriendList";
import { Box, useMediaQuery } from "@mui/material";
import { refreshUser } from "redux/auth/authOperations";

export const PageHome = () => {
  const dispatch = useDispatch();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const user = useSelector((state) => state.auth.user);
  const isLogged = useSelector((state) => state.auth.isLogged);

  useEffect(() => {
    if (isLogged) {
      dispatch(refreshUser());
    }
  }, [dispatch, isLogged]);

  return (
    <Box>
      {user._id && <Navbar />}
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          {user._id && (
            <Box sx={{ gap: "40px" }}>
              <WidgetUser userId={user._id} picturePath={user.picturePath} />
            </Box>
          )}
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <WidgetNewPost picturePath={user.picturePath} />
          {user._id && <WidgetPosts userId={user._id} />}
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <WidgetAdvert />
            <Box m="2rem 0" />
            {user._id && <WidgetFriendList userId={user._id} />}
          </Box>
        )}
      </Box>
    </Box>
  );
};
