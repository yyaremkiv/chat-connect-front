import { useState } from "react";
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
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone";

import { updateUser } from "redux/auth/authOperations";

import { FormConfig } from "components/FormContainer/Form.config";
import { Formik } from "formik";

import { Navbar } from "components/Navbar/Navbar";
import UserImage from "components/UserImage";

import { formatDate } from "helper/dateFunction";

export const PageConfig = () => {
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();
  const { palette } = useTheme();
  const main = palette.neutral.main;

  const user = useSelector((state) => state.auth.user);

  const handleFormSubmit = (values, onSubmitProps) => {
    const formData = new FormData();

    for (let value in values) {
      formData.append(value, values[value]);
    }
    if (image) {
      formData.append("picture", image);
    }

    dispatch(updateUser(formData));
  };

  const handleSetImage = (image) => {
    setImage(image);
  };

  return (
    <Box>
      <Navbar />
      <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" mt="2rem">
        <WidgetWrapper gridColumn="2/4">
          <Box>
            <Typography mb="0.25rem">
              Profil create: {formatDate(user.createdAt)}
            </Typography>
            <Typography mb="1rem">
              Profil updated: {formatDate(user.updatedAt)}
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            gap="1rem"
            alignItems="center"
          >
            <UserImage image={user.picturePath} size="80px" />

            {/* Donwloads photo - start */}
            <Box
              border={`1px solid ${palette.neutral.medium}`}
              borderRadius="0.5rem"
              p="0.75rem"
              width="100%"
            >
              <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                onDrop={(acceptedFiles) => handleSetImage(acceptedFiles[0])}
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
            </Box>
            {/* Donwloads photo - end */}
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
                    {/* General information - start */}
                    <Box
                      display="flex"
                      flexDirection="column"
                      gap="1rem"
                      mb="1rem"
                    >
                      <Box display="flex" alignItems="center" gap="1rem">
                        <Typography>First Name:</Typography>
                        <TextField
                          size="small"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.firstName}
                          name="firstName"
                          error={Boolean(touched.firstName || errors.firstName)}
                          helperText={errors.firstName}
                          sx={{ gridColumn: "span 2" }}
                        />
                      </Box>

                      <Box display="flex" alignItems="center" gap="1rem">
                        <Typography>Last Name:</Typography>
                        <TextField
                          size="small"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.lastName}
                          name="firstName"
                          error={Boolean(touched.lastName || errors.lastName)}
                          helperText={errors.lastName}
                          sx={{ gridColumn: "span 2" }}
                        />
                      </Box>

                      <Box display="flex" alignItems="center" gap="1rem">
                        <Typography>Email:</Typography>
                        <TextField
                          size="small"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.email}
                          name="firstName"
                          error={Boolean(touched.email || errors.email)}
                          helperText={errors.email}
                          sx={{ gridColumn: "span 2" }}
                        />
                      </Box>
                    </Box>
                    {/* General information - end */}

                    <Divider />

                    <Box
                      display="flex"
                      flexDirection="column"
                      gap="1rem"
                      m="1rem 0"
                    >
                      <Box display="flex" alignItems="center" gap="1rem">
                        <LocationOnOutlined
                          fontSize="large"
                          sx={{ color: main }}
                        />
                        <Typography color={main}>Location:</Typography>
                        <TextField
                          size="small"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.location}
                          name="location"
                          error={Boolean(touched.location || errors.location)}
                          helperText={errors.location}
                          sx={{ gridColumn: "span 4" }}
                        />
                      </Box>
                      <Box display="flex" alignItems="center" gap="1rem">
                        <WorkOutlineOutlined
                          fontSize="large"
                          sx={{ color: main }}
                        />
                        <Typography color={main}>Occupation:</Typography>
                        <TextField
                          size="small"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.occupation}
                          name="occupation"
                          error={Boolean(
                            touched.occupation || errors.occupation
                          )}
                          helperText={errors.occupation}
                          sx={{ gridColumn: "span 4" }}
                        />
                      </Box>
                    </Box>

                    <Divider />

                    {/* FOURTH ROW */}
                    <Box p="1rem 0">
                      <Typography
                        fontSize="1rem"
                        color={main}
                        fontWeight="500"
                        mb="1rem"
                      >
                        Social Profiles
                      </Typography>

                      <FlexBetween gap="1rem" mb="0.5rem">
                        <FlexBetween gap="1rem">
                          <img src="../assets/twitter.png" alt="twitter" />
                          <Box display="flex" alignItems="center" gap="1rem">
                            <Typography color={main} fontWeight="500">
                              Twitter
                            </Typography>
                            <TextField
                              size="small"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.twitter}
                              name="twitter"
                              error={Boolean(touched.twitter || errors.twitter)}
                              helperText={errors.twitter}
                              sx={{ gridColumn: "span 2" }}
                            />
                          </Box>
                        </FlexBetween>
                      </FlexBetween>

                      <FlexBetween gap="1rem">
                        <FlexBetween gap="1rem">
                          <img src="../assets/linkedin.png" alt="linkedin" />
                          <Box display="flex" alignItems="center" gap="1rem">
                            <Typography color={main} fontWeight="500">
                              Linkedin
                            </Typography>
                            <TextField
                              size="small"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.linkedin}
                              name="linkedin"
                              error={Boolean(
                                touched.linkedin || errors.linkedin
                              )}
                              helperText={errors.linkedin}
                              sx={{ gridColumn: "span 2" }}
                            />
                          </Box>
                        </FlexBetween>
                      </FlexBetween>
                    </Box>
                    <Box display="flex" justifyContent="center">
                      <Button type="submit">Update values</Button>
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
