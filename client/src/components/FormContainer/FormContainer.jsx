import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Typography, useTheme, Box, useMediaQuery } from "@mui/material";
import { FormLogin } from "components/FormLogin/FormLogin";
import { FormRegister } from "components/FormRegister/FormRegister";
import { Formik } from "formik";
import { loginUser } from "redux/auth/authOperations";
import { registerUser } from "redux/auth/authOperations";
import { FormConfig } from "./Form.config";
import LoadingButton from "@mui/lab/LoadingButton";

export const FormContainer = () => {
  const [pageType, setPageType] = useState(FormConfig.typePage.login);
  const [image, setImage] = useState(null);
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const isErrorAuth = useSelector((state) => state.auth.error);

  const isLoginPage = pageType === FormConfig.typePage.login;

  const handleFormSubmit = (values, onSubmitProps) => {
    if (isLoginPage) {
      dispatch(loginUser(values));
    } else {
      const formData = new FormData();

      for (let value in values) {
        formData.append(value, values[value]);
      }

      if (image) {
        formData.append("picture", image);
      }
      dispatch(registerUser(formData));
    }
  };

  const handleSetImage = (image) => {
    setImage(image);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={
        pageType === FormConfig.typePage.login
          ? FormConfig.initialValuesLogin
          : FormConfig.initialValuesRegister
      }
      validationSchema={
        pageType === FormConfig.typePage.login
          ? FormConfig.loginSchema
          : FormConfig.registerSchema
      }
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {pageType === FormConfig.typePage.login ? (
              <FormLogin
                props={{
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  isLoading,
                }}
              />
            ) : (
              <FormRegister
                props={{
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSetImage,
                  isLoading,
                }}
              />
            )}

            <Box gridColumn="2/4">
              <LoadingButton
                fullWidth
                variant="contained"
                loading={isLoading}
                disabled={isLoading}
                loadingPosition="center"
                type="submit"
                sx={{
                  marginTop: "16px",
                  marginBottom: "16px",
                }}
              >
                {pageType === "login" ? "LOGIN" : "REGISTER"}
              </LoadingButton>
            </Box>

            <Box gridColumn="1/5">
              <Typography
                onClick={() => {
                  setPageType(pageType === "login" ? "register" : "login");
                }}
                sx={{
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
        </form>
      )}
    </Formik>
  );
};
