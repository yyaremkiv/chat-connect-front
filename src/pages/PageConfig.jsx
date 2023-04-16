import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DropzoneUpload } from "components/DropzoneUpload";
import { Formik } from "formik";
import WidgetWrapper from "components/WidgetWrapper";
import { FormConfig } from "configs/Form.config";
import { formatDate } from "helper/dateFunction.ts";
import { LocationOnOutlined, WorkOutlineOutlined } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Typography,
  Divider,
  useTheme,
  TextField,
  IconButton,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import UserImage from "components/UserImage";
import cloudConfig from "configs/cloudConfig";
import CircularProgress from "@mui/material/CircularProgress";
import UserOperations from "redux/user/userOperations";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

function compareObjects(obj1, obj2) {
  for (const key in obj1) {
    if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
  }
  return true;
}

export const PageConfig = () => {
  const [image, setImage] = useState(null);
  const authUser = useSelector((state) => state.auth.user);
  const user = useSelector((state) => state.user.user.data);
  const isLoading = useSelector((state) => state.user.isLoading);
  const dispatch = useDispatch();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { palette } = useTheme();

  useEffect(() => {
    if (authUser._id) dispatch(UserOperations.getUser(authUser._id));
  }, [dispatch, authUser._id]);

  const handleChangeAvatar = () => {
    const formData = new FormData();
    if (image) formData.append("picture", image);

    dispatch(UserOperations.changeAvatarUser(formData));
    setImage(null);
  };

  const handleFormSubmit = async (values) => {
    const compare = compareObjects(values, user);
    if (!compare) {
      dispatch(UserOperations.updateUser(values));
    }
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: isNonMobileScreens ? "repeat(4, 1fr)" : "1fr",
        gap: "1.5rem",
        p: "1.5rem 0",
      }}
    >
      <WidgetWrapper gridColumn={isNonMobileScreens ? "2/4" : "1"}>
        <Typography variant="h5">
          General information about the account:
        </Typography>
        <Divider sx={{ my: "0.5rem" }} />

        {user.createdAt && user.updatedAt && !isLoading && (
          <Box>
            <Typography fontWeight="bold">
              Profil created:{" "}
              <span style={{ fontWeight: 400, color: palette.neutral.main }}>
                {formatDate(user.createdAt)}
              </span>
            </Typography>
            <Typography fontWeight="bold">
              Profil updated:{" "}
              <span style={{ fontWeight: 400, color: palette.neutral.main }}>
                {formatDate(user.updatedAt)}
              </span>
            </Typography>
          </Box>
        )}
      </WidgetWrapper>

      <WidgetWrapper gridColumn={isNonMobileScreens ? "2/4" : "1"}>
        <Typography variant="h5">Choose a profile image:</Typography>
        <Divider sx={{ my: "0.5rem" }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            mt: "0.75rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Box sx={{ width: "140px", height: "140px" }}>
              <UserImage image={user.picturePath} size="140px" />
            </Box>

            {user.picturePath !== cloudConfig.publicImagePathDefault ? (
              <Tooltip title="Delete the current Avatar" placement="top">
                <span disabled={isLoading}>
                  <IconButton onClick={handleChangeAvatar} disabled={isLoading}>
                    {isLoading ? (
                      <CircularProgress size={24} />
                    ) : (
                      <DeleteIcon size="large" />
                    )}
                  </IconButton>
                </span>
              </Tooltip>
            ) : null}
          </Box>

          {!isLoading ? (
            <DropzoneUpload
              image={image}
              setImage={setImage}
              handleSend={handleChangeAvatar}
            />
          ) : null}

          {image ? (
            <Tooltip title="Save selected photo" placement="top">
              <IconButton onClick={handleChangeAvatar}>
                {isLoading ? <CircularProgress /> : <SaveIcon />}
              </IconButton>
            </Tooltip>
          ) : null}
        </Box>
      </WidgetWrapper>

      <WidgetWrapper gridColumn={isNonMobileScreens ? "2/4" : "1"}>
        <Typography variant="h5">Basic profile data:</Typography>
        <Divider sx={{ my: "0.5rem" }} />
        {user._id ? (
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={user}
            validationSchema={FormConfig.updateSchema}
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
                <Box>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      alignItems: "center",
                      gap: "0.5rem",
                      mb: "1rem",
                    }}
                  >
                    <Typography gridColumn="1/2">First Name:</Typography>
                    <TextField
                      size="small"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.firstName}
                      name="firstName"
                      error={Boolean(touched.firstName && errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                      sx={{ gridColumn: "2/5" }}
                    />

                    <Typography gridColumn="1/2">Last Name:</Typography>
                    <TextField
                      size="small"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lastName}
                      name="lastName"
                      error={Boolean(touched.lastName && errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                      sx={{ gridColumn: "2/5" }}
                    />

                    <Typography gridColumn="1/2">Email:</Typography>
                    <TextField
                      size="small"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      name="email"
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                      sx={{ gridColumn: "2/5" }}
                    />

                    <Divider sx={{ gridColumn: "1/5", margin: "0.5rem 0" }} />

                    <Box gridColumn="1/2">
                      <Box display="flex" alignItems="center" gap="1rem">
                        <LocationOnOutlined
                          fontSize="large"
                          sx={{ color: palette.neutral.main }}
                        />
                        <Typography color={palette.neutral.main}>
                          Location:
                        </Typography>
                      </Box>
                    </Box>

                    <TextField
                      size="small"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.location}
                      name="location"
                      error={Boolean(touched.location && errors.location)}
                      helperText={touched.location && errors.location}
                      sx={{ gridColumn: "2/5" }}
                    />

                    <Box gridColumn="1/2">
                      <Box display="flex" alignItems="center" gap="1rem">
                        <WorkOutlineOutlined
                          fontSize="large"
                          sx={{ color: palette.neutral.main }}
                        />
                        <Typography color={palette.neutral.main}>
                          Occupation:
                        </Typography>
                      </Box>
                    </Box>

                    <TextField
                      size="small"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.occupation}
                      name="occupation"
                      error={Boolean(touched.occupation && errors.occupation)}
                      helperText={touched.occupation && errors.occupation}
                      sx={{ gridColumn: "2/5" }}
                    />

                    <Divider sx={{ gridColumn: "1/5", margin: "0.5rem 0" }} />

                    <Box>
                      <Typography
                        fontSize="1rem"
                        color={palette.neutral.main}
                        fontWeight="500"
                      >
                        Social Profiles
                      </Typography>
                    </Box>

                    <Box gridColumn="1/2">
                      <Box display="flex" alignItems="center" gap="1rem">
                        <img src="../assets/twitter.png" alt="twitter" />
                        <Typography
                          color={palette.neutral.main}
                          fontWeight="500"
                        >
                          Twitter
                        </Typography>
                      </Box>
                    </Box>

                    <TextField
                      size="small"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.twitter}
                      name="twitter"
                      error={Boolean(touched.twitter && errors.twitter)}
                      helperText={touched.twitter && errors.twitter}
                      sx={{ gridColumn: "2/5" }}
                    />

                    <Box gridColumn="1/2">
                      <Box display="flex" alignItems="center" gap="1rem">
                        <img src="../assets/linkedin.png" alt="linkedin" />
                        <Typography
                          color={palette.neutral.main}
                          fontWeight="500"
                        >
                          Linkedin
                        </Typography>
                      </Box>
                    </Box>

                    <TextField
                      size="small"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.linkendin}
                      name="linkendin"
                      error={Boolean(touched.linkedin && errors.linkedin)}
                      helperText={touched.linkedin && errors.linkedin}
                      sx={{ gridColumn: "2/5" }}
                    />

                    <Box gridColumn="2/4" mt="1rem">
                      <LoadingButton
                        type="submit"
                        color="primary"
                        variant="contained"
                        loadingPosition="start"
                        loading={isLoading}
                        startIcon={<SaveIcon />}
                        fullWidth
                      >
                        <span>Update Profile</span>
                      </LoadingButton>
                    </Box>
                  </Box>
                </Box>
              </form>
            )}
          </Formik>
        ) : null}
      </WidgetWrapper>
    </Box>
  );
};
