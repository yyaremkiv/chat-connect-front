import { Box, useMediaQuery } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Navbar } from "components/Navbar/Navbar";
import { useDispatch } from "react-redux";
import { refreshUser } from "redux/auth/authOperations";
import { getUserData } from "redux/user/userOperations";
import { WidgetGeneral } from "components/WidgetGeneral/WidgetGeneral";
import { WidgetUser } from "components/WidgetUser/WidgetUser";
import { WidgetFriendList } from "components/WidgetFriendList/WidgetFriendList";

export const PageProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user.data);
  const { userId } = useParams();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  useEffect(() => {
    dispatch(refreshUser());
    dispatch(getUserData(userId));
  }, [dispatch, userId]);

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <WidgetUser userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <WidgetFriendList userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "0"}
        >
          <WidgetGeneral />
        </Box>
      </Box>
    </Box>
  );
};
