import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DropzoneUpload } from "components/DropzoneUpload";
import { Formik } from "formik";
import { FormConfig } from "configs/Form.config";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import {
  Box,
  Typography,
  TextField,
  useTheme,
  Button,
  FormHelperText,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import PostsOperations from "redux/posts/postsOperations";

export const ModalPostEdit = ({ postId, handleClose }) => {
  const [image, setImage] = useState(null);
  const [deleteCurrentPhoto, setDeleteCurrentPhoto] = useState(false);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const currentPost = posts.filter((post) => post._id === postId);
  const { palette } = useTheme();

  const handleSubmitPost = (values, { resetForm }) => {
    if (
      values.text === currentPost[0].description &&
      !image &&
      !deleteCurrentPhoto
    )
      return Notify.warning("Make changes first");

    const formData = new FormData();
    formData.append("postId", postId);
    formData.append("textPost", values.text);
    formData.append("deletePhoto", deleteCurrentPhoto);
    if (image) formData.append("picture", image);

    dispatch(PostsOperations.updatePost(formData));
    setDeleteCurrentPhoto(false);
    handleClose();
    resetForm();
    Notify.success("Your changes have been submitted");
  };

  const handleCheckboxChange = (event) =>
    setDeleteCurrentPhoto(event.target.checked);

  return (
    <Box>
      <Formik
        onSubmit={handleSubmitPost}
        initialValues={{ text: currentPost[0].description }}
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
              gap: "1rem",
            }}
          >
            <Typography
              sx={{
                fontSize: "1rem",
                fontWeight: 500,
                textAlign: "center",
              }}
            >
              Edit your post:
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              {currentPost[0].picturePath ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.5rem",
                    width: "100%",
                  }}
                >
                  <img
                    width="10%"
                    height="auto"
                    alt="post"
                    style={{
                      borderRadius: "0.5rem",
                      backgroundColor: "rgba(0, 0, 0, 0.9)",
                    }}
                    src={currentPost[0].picturePath}
                  />
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={deleteCurrentPhoto}
                          onChange={handleCheckboxChange}
                        />
                      }
                      label="Delete current photo"
                    />
                  </FormGroup>
                </Box>
              ) : null}
            </Box>

            <DropzoneUpload image={image} setImage={setImage} />

            <Box sx={{ width: "100%" }}>
              <TextField
                multiline
                placeholder="What's on your mind..."
                name="text"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.text}
                error={Boolean(touched.text && errors.text)}
                sx={{
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                variant="text"
                type="submit"
                sx={{
                  p: "0.5rem 3rem",
                  fontSize: "1rem",
                  backgroundColor: palette.neutral.light,
                }}
              >
                Update Post
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};
