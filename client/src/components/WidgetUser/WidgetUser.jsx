import {
  ManageAccountsOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import Link from "@mui/material/Link";
import { Box, Typography, Divider, useTheme, IconButton } from "@mui/material";
import UserImage from "../UserImage";
import FlexBetween from "../FlexBetween";
import WidgetWrapper from "../WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserData } from "redux/user/userOperations";

export const WidgetUser = ({ userId, picturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const currentUser = useSelector((state) => state.user.user.data);
  const { palette } = useTheme();

  useEffect(() => {
    dispatch(getUserData(userId));
  }, [dispatch, userId]);

  if (!currentUser) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    twitter,
    linkendin,
  } = currentUser;

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween gap="0.5rem" pb="1.1rem">
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={palette.neutral.dark}
              fontWeight="500"
              onClick={() => navigate(`/profile/${userId}`)}
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
          </Box>
        </FlexBetween>
        {user._id === currentUser._id ? (
          <IconButton onClick={() => navigate("/config")}>
            <ManageAccountsOutlined />
          </IconButton>
        ) : null}
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined
            fontSize="large"
            sx={{ color: palette.neutral.main }}
          />
          <Typography color={palette.neutral.medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined
            fontSize="large"
            sx={{ color: palette.neutral.main }}
          />
          <Typography color={palette.neutral.medium}>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={palette.neutral.medium}>
            Who's viewed your profile
          </Typography>
          <Typography color={palette.neutral.main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={palette.neutral.medium}>
            Impressions of your post
          </Typography>
          <Typography color={palette.neutral.main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography
          fontSize="1rem"
          color={palette.neutral.main}
          fontWeight="500"
          mb="1rem"
        >
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="twitter" />
            <Box>
              <Typography color={palette.neutral.main} fontWeight="500">
                Twitter
              </Typography>
              <Link
                href={twitter}
                color={palette.neutral.medium}
                underline="hover"
              >
                {twitter}
              </Link>
            </Box>
          </FlexBetween>
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="linkedin" />
            <Box>
              <Typography color={palette.neutral.main} fontWeight="500">
                Linkedin
              </Typography>
              <Link
                href={linkendin}
                color={palette.neutral.medium}
                underline="hover"
              >
                {linkendin}
              </Link>
            </Box>
          </FlexBetween>
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};
