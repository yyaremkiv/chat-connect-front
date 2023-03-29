import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getFriends } from "redux/posts/postsOperations";
import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { getFriends } from "redux/user/userOperations";

export const WidgetFriendList = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const friends = useSelector((state) => state.user.friends.data);
  console.log("this is friends array", friends);

  useEffect(() => {
    dispatch(getFriends(userId));
  }, [dispatch, userId]);

  console.log(friends);

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
        {friends.map(
          ({
            friendId: { _id: id, picturePath, occupation, firstName, lastName },
          }) => (
            <Friend
              key={id}
              friendId={id}
              name={`${firstName} ${lastName}`}
              subtitle={occupation}
              userPicturePath={picturePath}
              showFriendList={true}
            />
          )
        )}
      </Box>
    </WidgetWrapper>
  );
};
