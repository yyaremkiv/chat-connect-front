import { useSelector } from "react-redux";
import {
  Box,
  TextField,
  useTheme,
  Button,
  FormHelperText,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import { FormConfig } from "configs/Form.config";
import { Notify } from "notiflix/build/notiflix-notify-aio";

export const ModalCommentEdit = ({
  postId,
  commentId,
  handleClose,
  handleUpdatePost,
}) => {
  const { palette } = useTheme();
  const { posts } = useSelector((state) => state.posts);
  const post = posts.find((post) => post._id === postId);
  const comment = post?.comments?.find((comment) => comment.id === commentId);

  const handleSubmitPost = (values, { resetForm }) => {
    if (values.text === comment?.text)
      return Notify.warning("Make changes first");

    handleUpdatePost(values.text);
    handleClose();
    resetForm();
    Notify.success("Your changes have been submitted");
  };

  return (
    <Formik
      onSubmit={handleSubmitPost}
      initialValues={{ text: comment?.text }}
      validationSchema={FormConfig.commentSchema}
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
            Update this comment:
          </Typography>
          <Box>
            <TextField
              multiline
              placeholder="Change Your Comment"
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
                visibility: touched.text && errors.text ? "visible" : "hidden",
                height: "0.3rem",
              }}
            >
              {errors.text}
            </FormHelperText>
          </Box>
          <Button
            variant="text"
            type="submit"
            sx={{
              m: "0 auto",
              p: "0.5rem 3rem",
              width: "fit-content",
              fontSize: "1rem",
              backgroundColor: palette.neutral.light,
            }}
          >
            Update Comment
          </Button>
        </form>
      )}
    </Formik>
  );
};
