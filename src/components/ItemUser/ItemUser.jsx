import { useNavigate } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import { formatDate } from "helper/dateFunction.ts";
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
    createdAt: created,
  },
}) => {
  const navigate = useNavigate();
  const { palette } = useTheme();

  const handleClick = () => {
    navigate(`/home/profile/${userId}`);
    navigate(0);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
      <Box>
        <UserImage image={picturePath} size="75px" />
      </Box>

      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            color={palette.neutral.main}
            variant="h5"
            fontWeight="500"
            onClick={handleClick}
            sx={{
              "&:hover": {
                color: palette.primary.dark,
                cursor: "pointer",
              },
            }}
          >
            {`${firstName} ${lastName}`}
          </Typography>
          <Typography color={palette.neutral.medium} variant="h7">
            Account created: {formatDate(created).slice(0, 10)}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: "1.5rem" }}>
          <Box>
            <Typography color={palette.neutral.medium} fontSize="0.75rem">
              Location: {location}
            </Typography>
            <Typography color={palette.neutral.medium} fontSize="0.75rem">
              Occupation: {occupation}
            </Typography>
          </Box>
          <Box>
            <Typography color={palette.neutral.medium} fontSize="0.75rem">
              Total Friends: {friends}
            </Typography>
            <Typography color={palette.neutral.medium} fontSize="0.75rem">
              Total Posts: {posts}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
