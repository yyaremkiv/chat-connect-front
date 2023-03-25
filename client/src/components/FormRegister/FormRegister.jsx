import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormConfig } from "components/FormContainer/Form.config";
import { Formik } from "formik";
import { registerUser } from "redux/auth/authOperations";
import { Box, TextField, Typography, useTheme } from "@mui/material";
import { FormHelperText } from "@mui/material";
import Dropzone from "react-dropzone";
import FlexBetween from "../FlexBetween";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import { EditOutlined, DeleteOutlined } from "@mui/icons-material";

export const FormRegister = () => {
  const [image, setImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const dispatch = useDispatch();
  const { palette } = useTheme();

  const handleFormSubmit = (values) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    if (image) {
      formData.append("picture", image);
    }
    dispatch(registerUser(formData));
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={FormConfig.initialValuesRegister}
      validationSchema={FormConfig.registerSchema}
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
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <TextField
            label="First Name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.firstName}
            name="firstName"
            error={Boolean(touched.firstName && errors.firstName)}
            helperText={touched.firstName && errors.firstName}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            label="Last Name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.lastName}
            name="lastName"
            error={Boolean(touched.lastName && errors.lastName)}
            helperText={touched.lastName && errors.lastName}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            label="Location"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.location}
            name="location"
            error={Boolean(touched.location && errors.location)}
            helperText={touched.location && errors.location}
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            label="Occupation"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.occupation}
            name="occupation"
            error={Boolean(touched.occupation && errors.occupation)}
            helperText={touched.occupation && errors.occupation}
            sx={{ gridColumn: "span 4" }}
          />

          {/* Donwload photo - start */}
          <Box
            border={`1px solid ${palette.neutral.medium}`}
            borderRadius="0.5rem"
            p="0.75rem"
          >
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
            >
              {({ getRootProps, getInputProps }) => (
                <FlexBetween>
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    borderRadius="0.5rem"
                    p="0.25rem 1rem"
                    width="100%"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {!image ? (
                      <p>Add Image Here</p>
                    ) : (
                      <FlexBetween>
                        <Typography>{image.name}</Typography>
                        <IconButton>
                          <EditOutlined />
                        </IconButton>
                      </FlexBetween>
                    )}
                  </Box>
                  {image && (
                    <IconButton
                      onClick={() => setImage(null)}
                      sx={{ marginLeft: "1rem" }}
                    >
                      <DeleteOutlined />
                    </IconButton>
                  )}
                </FlexBetween>
              )}
            </Dropzone>
            <FormHelperText
              error={Boolean(touched.picture && errors.picture)}
              sx={{
                visibility:
                  touched.picture && errors.picture ? "visible" : "hidden",
              }}
            >
              {errors.picture}
            </FormHelperText>
          </Box>
          {/* Donwload photo - end */}

          <TextField
            label="Email"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
            name="email"
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
            sx={{ gridColumn: "span 4" }}
          />

          {/* Password - start */}
          <FormControl sx={{ gridColumn: "span 4" }} variant="outlined">
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
              }}
            >
              {errors.password}
            </FormHelperText>
          </FormControl>
          {/* Password - end */}

          <Box gridColumn="2/4">
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
              REGISTER
            </LoadingButton>
          </Box>
        </form>
      )}
    </Formik>
  );
};
