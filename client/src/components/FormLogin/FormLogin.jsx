import { useState } from "react";
import { TextField } from "@mui/material";
import { FormHelperText } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export const FormLogin = ({
  props: { values, errors, touched, handleBlur, handleChange, isLoading },
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <TextField
        label="Email"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.email}
        name="email"
        error={Boolean(touched.email) && Boolean(errors.email)}
        helperText={touched.email && errors.email}
        sx={{ gridColumn: "span 4" }}
        disabled={isLoading}
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
          disabled={isLoading}
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
    </>
  );
};
