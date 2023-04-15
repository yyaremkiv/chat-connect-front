import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Divider, useTheme, IconButton } from "@mui/material";
import {
  ManageAccountsOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import UserImage from "../UserImage";
import FlexBetween from "../FlexBetween";
import WidgetWrapper from "../WidgetWrapper";
import Loader from "components/Loader";
import Link from "@mui/material/Link";
import UserOperations from "redux/user/userOperations";

export const WidgetUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const currentUser = useSelector((state) => state.user.user.data);
  const isLoading = useSelector((state) => state.user.user.isLoading);
  const error = useSelector((state) => state.user.user.error);
  const { userId } = useParams();
  const { palette } = useTheme();

  const activeUser = userId ? userId : user._id;

  useEffect(() => {
    dispatch(UserOperations.getUser(activeUser));
  }, [dispatch, activeUser]);

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    twitter,
    linkendin,
    picturePath,
    email,
  } = currentUser;

  return (
    <WidgetWrapper>
      {isLoading && <Loader />}
      {(user._id || currentUser._id) && !isLoading && !error ? (
        <>
          <FlexBetween sx={{ gap: "0.5rem", pb: "1rem" }}>
            <FlexBetween sx={{ gap: "1rem" }}>
              <UserImage image={picturePath} />
              <Box>
                <Typography
                  variant="h4"
                  color={palette.neutral.dark}
                  fontWeight="500"
                >
                  {firstName} {lastName}
                </Typography>
              </Box>
            </FlexBetween>

            {user._id === currentUser._id ? (
              <IconButton onClick={() => navigate("/home/config")}>
                <ManageAccountsOutlined />
              </IconButton>
            ) : null}
          </FlexBetween>

          <Divider />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              p: "0.5rem 0",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <LocationOnOutlined
                fontSize="large"
                sx={{ color: palette.neutral.main }}
              />
              <Typography color={palette.neutral.medium}>{location}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <WorkOutlineOutlined
                fontSize="large"
                sx={{ color: palette.neutral.main }}
              />
              <Typography color={palette.neutral.medium}>
                {occupation}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <MailOutlineIcon
                fontSize="large"
                sx={{ color: palette.neutral.main }}
              />
              <Typography color={palette.neutral.medium}>{email}</Typography>
            </Box>
          </Box>

          <Divider />

          <Box sx={{ p: "1rem 0" }}>
            <FlexBetween sx={{ mb: "0.5rem" }}>
              <Typography color={palette.neutral.medium}>
                Who's viewed your profile:
              </Typography>
              <Typography color={palette.neutral.main} fontWeight="500">
                {viewedProfile}
              </Typography>
            </FlexBetween>
            <FlexBetween>
              <Typography color={palette.neutral.medium}>
                Impressions of your post:
              </Typography>
              <Typography color={palette.neutral.main} fontWeight="500">
                {impressions}
              </Typography>
            </FlexBetween>
          </Box>

          <Divider />

          <Box sx={{ p: "1rem 0" }}>
            <Typography
              fontSize="1rem"
              color={palette.neutral.main}
              fontWeight="500"
              mb="1rem"
            >
              Social Profiles
            </Typography>

            <FlexBetween sx={{ gap: "1rem", mb: "0.5rem" }}>
              <FlexBetween sx={{ gap: "1rem" }}>
                <img src="../../assets/twitter.png" alt="twitter" />
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

            <FlexBetween sx={{ gap: "1rem" }}>
              <FlexBetween sx={{ gap: "1rem" }}>
                <img src="../../assets/linkedin.png" alt="linkedin" />
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
