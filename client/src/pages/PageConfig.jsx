import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import {
  updateUser,
  deleteAvatar,
  changeAvatar,
} from "redux/auth/authOperations";
import { FormConfig } from "configs/Form.config";
import { Navbar } from "components/Navbar/Navbar";
import { formatDate } from "helper/dateFunction.ts";
import {
  LocationOnOutlined,
  WorkOutlineOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  Divider,
  useTheme,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { useMediaQuery } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import WidgetWrapper from "components/WidgetWrapper";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import SaveIcon from "@mui/icons-material/Save";

export const PageConfig = () => {
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { palette } = useTheme();

  const handleFormSubmit = (values) => {
    dispatch(updateUser(values));
  };

  const handleChangeAvatar = () => {
    const formData = new FormData();
    if (image) {
      formData.append("picture", image);
      dispatch(changeAvatar(formData));
    }
  };

  return (
    <Box>
      <Navbar />
      <Box
        display="grid"
        gridTemplateColumns={isNonMobileScreens ? "repeat(4, 1fr)" : "1fr"}
        mt="2rem"
      >
        <WidgetWrapper gridColumn={isNonMobileScreens ? "2/4" : "1"}>
          <Box>
            <Typography fontWeight="bold">
              {"Profil create:  "}
              <span style={{ fontWeight: "400", color: palette.neutral.main }}>
                {formatDate(user.createdAt)}
              </span>
            </Typography>
            <Typography fontWeight="bold">
              {"Profil updated: "}
              <span style={{ fontWeight: "400", color: palette.neutral.main }}>
                {formatDate(user.updatedAt)}
              </span>
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            gap="1rem"
            alignItems="center"
            mt="0.75rem"
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1.5rem",
              }}
            >
              <UserImage image={user.picturePath} size="80px" />
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap="0.25rem"
              >
                <Typography style={{ whiteSpace: "nowrap" }}>
                  Delete avatar
                </Typography>
                <IconButton onClick={() => dispatch(deleteAvatar())}>
                  <DeleteIcon size="large" />
                </IconButton>
              </Box>
            </Box>

            {/* Donwloads photo - start */}
            <Box>
              <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
              >
                {({ getRootProps, getInputProps }) => (
                  <FlexBetween display="flex" gap="1.5rem">
                    <Box
                      {...getRootProps()}
                      border={`2px dashed ${palette.primary.main}`}
                      borderRadius="0.5rem"
                      p="0 1rem"
                      width="100%"
                      sx={{ "&:hover": { cursor: "pointer" } }}
                    >
                      <input {...getInputProps()} />
                      {!image ? (
                        <p>Add or change your avatar here</p>
                      ) : (
                        <FlexBetween>
                          <Typography>{image.name}</Typography>
                          <IconButton>
                            <EditOutlined />
                          </IconButton>
                        </FlexBetween>
                      )}
                    </Box>
                    <Box>
                      {!image ? null : (
                        <FlexBetween display="flex" gap="0.5rem">
                          <IconButton onClick={handleChangeAvatar}>
                            <SaveIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => setImage(null)}
                            sx={{ marginLeft: "1rem" }}
                          >
                            <DeleteOutlined />
                          </IconButton>
                        </FlexBetween>
                      )}
                    </Box>
                  </FlexBetween>
                )}
              </Dropzone>
            </Box>
          </Box>

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
                  <WidgetWrapper>
                    <Box
                      display="grid"
                      gridTemplateColumns="repeat(4, 1fr)"
                      alignItems="center"
                      gap="0.5rem"
                      mb="1rem"
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
                        value={values.linkedin}
                        name="linkedin"
                        error={Boolean(touched.linkedin && errors.linkedin)}
                        helperText={touched.linkedin && errors.linkedin}
                        sx={{ gridColumn: "2/5" }}
                      />

                      <Box gridColumn="2/4" mt="1rem">
                        <Button
                          type="submit"
                          fullWidth
                          sx={{
                            backgroundColor: palette.neutral.light,
                            color: palette.textColor.primary,
                          }}
                        >
                          Update values
                        </Button>
                      </Box>
                    </Box>
                  </WidgetWrapper>
                </Box>
              </form>
            )}
          </Formik>
        </WidgetWrapper>
      </Box>
    </Box>
  );
};
