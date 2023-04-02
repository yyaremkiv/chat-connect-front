import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserFriends } from "redux/user/userOperations";
import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";

export const WidgetFriendList = ({ user }) => {
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.user.friends.data);
  const { userId } = useParams();
  const { palette } = useTheme();

  const currentUser = user ? user : userId;

  useEffect(() => {
    if (currentUser) dispatch(getUserFriends(currentUser));
  }, [dispatch, currentUser]);

  return (
    <WidgetWrapper>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="1.5rem"
      >
        <Typography color={palette.neutral.dark} variant="h5" fontWeight="500">
          Friend List
        </Typography>
        <Typography
          color={palette.neutral.medium}
        >{`${friends.length} friends`}</Typography>
      </Box>

      <Box display="flex" flexDirection="column" gap="0.75rem">
        {friends.length
          ? friends.map((friend) => (
              <Box
                key={friend.friendId._id}
                display="flex"
                flexDirection="column"
                gap="1.5rem"
              >
                <Friend friend={friend.friendId} showList={true} />
              </Box>
            ))
          : null}
      </Box>
    </WidgetWrapper>
  );
};
