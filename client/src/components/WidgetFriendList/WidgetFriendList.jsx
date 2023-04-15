import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, useTheme } from "@mui/material";
import Loader from "components/Loader";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import UserOperations from "redux/user/userOperations";

export const WidgetFriendList = ({ authUser }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const friends = useSelector((state) => state.user.friends.data);
  const authUserFriends = useSelector((state) => state.user.friends.authUser);
  const isLoading = useSelector((state) => state.user.friends.isLoading);
  const error = useSelector((state) => state.user.friends.error);
  const { userId } = useParams();
  const { palette } = useTheme();

  const currentUser = authUser ? user._id : userId;
  const currentList = authUser ? authUserFriends : friends;

  useEffect(() => {
    if (currentUser) dispatch(UserOperations.getUserFriends(currentUser));
  }, [dispatch, currentUser]);

  return (
    <WidgetWrapper>
      {isLoading && <Loader />}
      {currentList && !isLoading && !error ? (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: "1.5rem",
            }}
          >
            <Typography
              color={palette.neutral.dark}
              variant="h5"
              fontWeight="500"
            >
              Friend List
            </Typography>
            <Typography
              color={palette.neutral.medium}
            >{`${currentList.length} friends`}</Typography>
          </Box>

          <Box display="flex" flexDirection="column" gap="0.75rem">
            {currentList.length
              ? currentList.map((friend) => (
                  <Box
                    key={friend.friendId._id}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1.5rem",
                    }}
                  >
                    <Friend friend={friend.friendId} showList={true} />
                  </Box>
                ))
              : null}
          </Box>
        </>
      ) : (
        <Box>
          {error && (
            <Typography variant="body1" color="error">
              Loading error. Please try again later.
            </Typography>
          )}
        </Box>
      )}
    </WidgetWrapper>
  );
};
