import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DropzoneUpload } from "components/DropzoneUpload";
import { ImageOutlined } from "@mui/icons-material";
import { Formik } from "formik";
import { FormHelperText } from "@mui/material";
import { FormConfig } from "configs/Form.config";
import {
  Box,
  Divider,
  Typography,
  TextField,
  useTheme,
  Button,
  CircularProgress,
} from "@mui/material";
import PostsOperation from "redux/posts/postsOperations";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import PostAddIcon from "@mui/icons-material/PostAdd";

export const WidgetNewPost = ({ page, limit, sort }) => {
  const [image, setImage] = useState(null);
  const [isImage, setIsImage] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user.data);
  const isLoading = useSelector((state) => state.posts.isLoading);
  const { palette } = useTheme();

  const handleSubmitPost = (values, { resetForm }) => {
    const formData = new FormData();
    formData.append("userId", user._id);
    formData.append("description", values.text);
    if (image) formData.append("picture", image);

    dispatch(PostsOperation.createPost({ page, limit, sort, formData }));
    setImage(null);
    setIsImage(false);
    resetForm();
  };

  return (
    <WidgetWrapper>
      <Formik
        onSubmit={handleSubmitPost}
        initialValues={{ text: "" }}
        validationSchema={FormConfig.postSchema}
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
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography sx={{ textAlign: "right" }}>
              Hello, Add New Post
            </Typography>
            <FlexBetween sx={{ display: "flex", gap: "1rem" }}>
              <UserImage image={user.picturePath} size="65px" />
              <Box sx={{ mb: "1rem", width: "100%" }}>
                <TextField
                  multiline
                  placeholder="What's on your mind..."
                  name="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.text}
                  error={Boolean(touched.text && errors.text)}
                  disabled={isLoading}
                  sx={{
                    mt: "0.7rem",
                    width: "100%",
                    backgroundColor: palette.neutral.light,
                  }}
                />
                <FormHelperText
                  error={Boolean(touched.text && errors.text)}
                  sx={{
                    visibility:
                      touched.text && errors.text ? "visible" : "hidden",
                    height: "0.3rem",
                  }}
                >
                  {errors.text}
                </FormHelperText>
              </Box>
            </FlexBetween>

            {isImage && <DropzoneUpload image={image} setImage={setImage} />}

            <Divider sx={{ m: "0.75rem 0" }} />

            <FlexBetween>
              <Button
                variant="text"
                onClick={() => setIsImage(!isImage)}
                disabled={isLoading}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.8rem",
                  color: palette.neutral.main,
                }}
              >
                <ImageOutlined />
                IMAGE
              </Button>

              <Button
                variant="text"
                type="submit"
                disabled={isLoading}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.8rem",
                  color: palette.neutral.main,
                }}
              >
                {isLoading ? (
                  <CircularProgress size={20} sx={{ color: "inherit" }} />
                ) : (
                  <PostAddIcon sx={{ color: palette.neutral.main }} />
                )}
                ADD POST
              </Button>
            </FlexBetween>
          </form>
        )}
      </Formik>
    </WidgetWrapper>
  );
};
