import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriends } from "redux/posts/postsOperations";
import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";

export const WidgetFriendList = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const friends = useSelector((state) => state.posts.friends.data);

  useEffect(() => {
    dispatch(getFriends(userId));
  }, [dispatch, userId]);

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
            showFriendList={true}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};
