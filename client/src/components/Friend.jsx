import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import UserOperations from "redux/user/userOperations";

const Friend = ({
  friend: { _id: friendId, firstName, lastName, picturePath, occupation },
  dataCreated = null,
  dataUpdated = null,
  showList = false,
  hideAdmin = false,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.auth.user);
  const friends = useSelector((state) => state.user.friends.data);
  const isFriend = friends?.find((friend) => friend.friendId._id === friendId);
  const { palette } = useTheme();

  const handlePatchFriend = () => {
    dispatch(UserOperations.addRemoveUserFriend({ userId: _id, friendId }));
  };

  const handleClick = () => {
    navigate(`/profile/${friendId}`);
    navigate(0);
  };

  if (_id === friendId && hideAdmin) return null;

  return (
    <FlexBetween gap="1rem" sx={{ width: "100%" }}>
      <Box display="flex" gap="0.75rem">
        <UserImage image={picturePath} size="55px" />
        <Box onClick={handleClick}>
          <Typography
            color={palette.neutral.main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {`${firstName} ${lastName}`}
          </Typography>
          <Typography color={palette.neutral.medium} fontSize="0.75rem">
            {occupation}
          </Typography>

          {dataCreated && (
            <Typography color={palette.neutral.medium} fontSize="0.75rem">
              Posted: {dataCreated}
            </Typography>
          )}
          {dataUpdated && (
            <Typography color={palette.neutral.medium} fontSize="0.75rem">
              Last Updated: {dataUpdated}
            </Typography>
          )}
        </Box>
      </Box>

      {_id !== friendId && showList ? (
        isFriend ? (
          <IconButton
            onClick={() => handlePatchFriend()}
            sx={{ backgroundColor: palette.primary.light, p: "0.6rem" }}
          >
            <PersonRemoveOutlined sx={{ color: palette.primary.dark }} />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => handlePatchFriend()}
            sx={{ backgroundColor: palette.primary.light, p: "0.6rem" }}
          >
            <PersonAddOutlined sx={{ color: palette.primary.dark }} />
          </IconButton>
        )
      ) : null}
    </FlexBetween>
  );
};

export default Friend;
