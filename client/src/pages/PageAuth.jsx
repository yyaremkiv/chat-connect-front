import { useDispatch } from "react-redux";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { FormContainer } from "components/FormContainer/FormContainer";
import { DarkMode, LightMode } from "@mui/icons-material";
import { setModeTheme } from "redux/theme/themeSlice";

export const PageAuth = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const dispatch = useDispatch();
  const { palette } = useTheme();

  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="2rem" color="primary">
          Chat
          <Typography
            component="span"
            sx={{
              color: palette.neutral.dark,
              fontWeight: "bold",
              fontSize: "2rem",
            }}
          >
            Connect
          </Typography>
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={palette.background.alt}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb="0.5rem"
        >
          <Typography fontWeight="500" variant="h5">
            Welcome to ChatConnect, a social network!
          </Typography>

          <IconButton onClick={() => dispatch(setModeTheme())}>
            {palette.mode === "dark" ? (
              <DarkMode
                sx={{ color: palette.neutral.dark, fontSize: "1.5rem" }}
              />
            ) : (
              <LightMode
                sx={{ color: palette.neutral.dark, fontSize: "1.5rem" }}
              />
            )}
          </IconButton>
        </Box>
        <FormContainer />
      </Box>
    </Box>
  );
};
