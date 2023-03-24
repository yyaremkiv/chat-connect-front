import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { FormContainer } from "components/FormContainer/FormContainer";

import { refreshUser } from "redux/auth/authOperations.js";
import { FormLogin } from "components/FormLogin/FormLogin";
import { FormRegister } from "components/FormRegister/FormRegister";

export const PageAuth = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          ChatConnect
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Sociopedia, the Social Media for Sociopaths!
        </Typography>
        <FormContainer />
      </Box>
    </Box>
  );
};
