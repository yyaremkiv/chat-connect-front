import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { FormConfig } from "configs/Form.config";
import { TextField } from "@mui/material";
import { FormHelperText } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import { Typography } from "@mui/material";
import AuthOperations from "redux/auth/AuthOperations.js";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";

export const FormLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const isErrorAuth = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();
  const { palette } = useTheme();

  return (
    <Box>
      <Formik
        onSubmit={(values) => dispatch(AuthOperations.login(values))}
        initialValues={FormConfig.initialValuesLogin}
        validationSchema={FormConfig.loginSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              disabled={isLoading}
              style={{ height: "60px" }}
            />

            {/* Password - start */}
            <FormControl variant="outlined">
              <InputLabel
                htmlFor="outlined-adornment-password"
                error={Boolean(touched.password && errors.password)}
              >
                Password
              </InputLabel>
              <OutlinedInput
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.password && errors.password)}
                disabled={isLoading}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((show) => !show)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText
                error={Boolean(touched.password && errors.password)}
                sx={{
                  visibility:
                    touched.password && errors.password ? "visible" : "hidden",
                  height: "12px",
                }}
              >
                {errors.password}
              </FormHelperText>
            </FormControl>

            <Box>
              <LoadingButton
                fullWidth
                variant="contained"
                loading={isLoading}
                disabled={isLoading}
                loadingPosition="center"
                type="submit"
                sx={{
                  marginTop: "0.5rem",
                  marginBottom: "1rem",
                  fontSize: "0.9rem",
                  color: palette.textColor.primary,
                }}
              >
                <span>LOGIN</span>
              </LoadingButton>
            </Box>
          </form>
        )}
      </Formik>

      <Box>
        <Link to="/register">
          <Typography
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
            "Don't have an account? Sign Up here."
          </Typography>
        </Link>
        {isErrorAuth && (
          <Typography sx={{ textAlign: "right", color: "red" }}>
            {isErrorAuth}
          </Typography>
        )}
        <Typography mt="1rem">User to test:</Typography>
        <Typography>email: phonelist@mail.com</Typography>
        <Typography>password: phonelist</Typography>
      </Box>
    </Box>
  );
};
