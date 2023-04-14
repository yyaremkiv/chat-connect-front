import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DropzoneUpload } from "components/DropzoneUpload";
import { ImageOutlined } from "@mui/icons-material";
import { Formik } from "formik";
import * as Yup from "yup";
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
import { FormHelperText } from "@mui/material";

const initialValues = { text: "" };

const validationSchema = Yup.object().shape({
  text: Yup.string()
    .required("This field is required")
    .matches(/^(?!\s)(?!.*\s$)/, "Text cannot start or end with spaces.")
    .min(6, "Post must be at least 6 characters long.")
    .max(200, "Post cannot be longer than 200 characters."),
});

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
        initialValues={initialValues}
        validationSchema={validationSchema}
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
