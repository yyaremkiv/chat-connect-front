import { useState } from "react";
import { useSelector } from "react-redux";
import { Typography, useTheme, Box } from "@mui/material";
import { FormLogin } from "components/FormLogin/FormLogin";
import { FormRegister } from "components/FormRegister/FormRegister";
import { FormConfig } from "./Form.config";

export const FormContainer = () => {
  const [pageType, setPageType] = useState(FormConfig.typePage.login);
  const isErrorAuth = useSelector((state) => state.auth.error);
  const { palette } = useTheme();

  return (
    <Box>
      {pageType === FormConfig.typePage.login ? (
        <FormLogin />
      ) : (
        <FormRegister />
      )}

      <Box>
        <Typography
          onClick={() => {
            setPageType(
              pageType === FormConfig.typePage.login
                ? FormConfig.typePage.register
                : FormConfig.typePage.login
            );
          }}
          sx={{
            marginBottom: "0.25rem",
            textDecoration: "underline",
            color: palette.primary.main,
            "&:hover": {
              cursor: "pointer",
              color: palette.primary.light,
            },
          }}
        >
          {pageType === FormConfig.typePage.login
            ? "Don't have an account? Sign Up here."
            : "Already have an account? Login here."}
        </Typography>
        {isErrorAuth && (
          <Typography sx={{ textAlign: "right", color: "red" }}>
            {isErrorAuth}
          </Typography>
        )}
      </Box>
    </Box>
  );
};
