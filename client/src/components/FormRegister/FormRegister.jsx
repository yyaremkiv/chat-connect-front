import { useState } from "react";
import { Box, TextField, Typography, useTheme } from "@mui/material";
import { FormHelperText } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Dropzone from "react-dropzone";
import FlexBetween from "../FlexBetween";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export const FormRegister = ({
  props: { values, errors, touched, handleBlur, handleChange, handleSetImage },
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { palette } = useTheme();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <TextField
        label="First Name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.firstName}
        name="firstName"
        error={Boolean(touched.firstName || errors.firstName)}
        helperText={errors.firstName}
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        label="Last Name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.lastName}
        name="lastName"
        error={Boolean(touched.lastName || errors.lastName)}
        helperText={errors.lastName}
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        label="Location"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.location}
        name="location"
        error={Boolean(touched.location || errors.location)}
        helperText={errors.location}
        sx={{ gridColumn: "span 4" }}
      />
      <TextField
        label="Occupation"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.occupation}
        name="occupation"
        error={Boolean(touched.occupation || errors.occupation)}
        helperText={errors.occupation}
        sx={{ gridColumn: "span 4" }}
      />

      {/* Donwload photo - start */}
      <Box
        gridColumn="span 4"
        border={`1px solid ${palette.neutral.medium}`}
        borderRadius="5px"
        p="1rem"
      >
        <Dropzone
          acceptedFiles=".jpg,.jpeg,.png"
          multiple={false}
          onDrop={(acceptedFiles) => handleSetImage(acceptedFiles[0])}
        >
          {({ getRootProps, getInputProps }) => (
            <Box
              {...getRootProps()}
              border={`2px dashed ${
                Boolean(touched.picture || errors.picture)
                  ? "red"
                  : palette.primary.main
              }`}
              p="1rem"
              sx={{ "&:hover": { cursor: "pointer" } }}
            >
              <input {...getInputProps()} />
              {!values.picture ? (
                <p>Add Picture Here</p>
              ) : (
                <FlexBetween>
                  <Typography>{values.picture.name}</Typography>
                  <EditOutlinedIcon />
                </FlexBetween>
              )}
            </Box>
          )}
        </Dropzone>
        <FormHelperText
          error={Boolean(touched.picture || errors.picture)}
          sx={{
            visibility:
              touched.picture || errors.picture ? "visible" : "hidden",
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
        error={Boolean(touched.email) && Boolean(errors.email)}
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
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
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
    </>
  );
};
