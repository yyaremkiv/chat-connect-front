import { useNavigate } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import UserImage from "components/UserImage";

export const ItemUser = ({
  user: {
    _id: userId,
    firstName,
    lastName,
    picturePath,
    location,
    occupation,
    friends,
    posts,
  },
}) => {
  const navigate = useNavigate();
  const { palette } = useTheme();

  const handleClick = () => {
    navigate(`/profile/${userId}`);
    navigate(0);
  };

  return (
    <Box display="flex" gap="0.75rem">
      <UserImage image={picturePath} size="55px" />
      <Box onClick={handleClick}>
        <Box display="flex" justifyContent="space-between">
          <Typography
            color={palette.neutral.main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.dark,
                cursor: "pointer",
              },
            }}
          >
            {`${firstName} ${lastName}`}
          </Typography>

          <Box>
            <Typography color={palette.neutral.medium} fontSize="0.75rem">
              Total Friends: {friends}
            </Typography>
            <Typography color={palette.neutral.medium} fontSize="0.75rem">
              Total Posts: {posts}
            </Typography>
          </Box>
        </Box>

        <Typography color={palette.neutral.medium} fontSize="0.75rem">
          Location: {location}
        </Typography>
        <Typography color={palette.neutral.medium} fontSize="0.75rem">
          {occupation}
        </Typography>
      </Box>
    </Box>
  );
};
